import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import configuration from 'config/configuration';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dtos';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    @Inject(configuration.KEY) private configService: ConfigType<typeof configuration>,
    private jwtService: JwtService,
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

    const passwordMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Email or password invalid');
    }

    delete user.password;

    const token = await this.singToken(user.id);
    return { user, token };
  }

  async singToken(userId: number): Promise<string> {
    const payload = {
      sub: userId,
    };

    const secret = this.configService.jwt.loginSecret;

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '6h',
      secret,
    });

    return token;
  }
}
