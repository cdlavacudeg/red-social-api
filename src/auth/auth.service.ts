import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import configuration from 'config/configuration';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, RegisterDto } from './dtos';
import * as bcrypt from 'bcrypt';
import * as sgMail from '@sendgrid/mail';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    @Inject(configuration.KEY) private configService: ConfigType<typeof configuration>,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email or password invalid');
    }

    if (user.deletedAt) {
      throw new UnauthorizedException('User no longer has access');
    }

    const passwordMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Email or password invalid');
    }

    delete user.password;

    const token = await this.singToken(user.id);
    this.cacheManager.set(`user-${user.id}-token`, token, 0);
    return { user, token };
  }

  async register(registerDto: RegisterDto) {
    const emailInDb = await this.prisma.user.findUnique({
      where: {
        email: registerDto.email,
      },
    });

    if (emailInDb) {
      throw new BadRequestException('Email is invalid');
    }

    const user = await this.prisma.user.create({
      data: {
        fullName: registerDto.fullName,
        email: registerDto.email,
        age: registerDto.age,
        password: await bcrypt.hash(registerDto.password, 10),
      },
    });

    sgMail.setApiKey(this.configService.sendgrid.apiKey);
    const msg = {
      to: `${registerDto.email}`,
      from: this.configService.sendgrid.sender,
      subject: 'User registration Successfull',
      text: 'Congratulations, your user has been successfully created',
    };

    let email: [sgMail.ClientResponse, object] | null;
    try {
      email = await sgMail.send(msg);
    } catch (err) {
      email = null;
    }

    return { user, email };
  }

  async singToken(userId: number): Promise<string> {
    const payload = {
      sub: userId,
    };

    const secret = this.configService.jwt.loginSecret;

    const token = await this.jwtService.signAsync(payload, {
      secret,
    });

    return token;
  }

  async logout(userId: number) {
    this.cacheManager.del(`user-${userId}-token`);
    return true;
  }
}
