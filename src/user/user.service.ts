import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dtos';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    delete user.password;
    return user;
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        fullName: updateUserDto.fullName,
        age: updateUserDto.age,
        password: updateUserDto.password ? await bcrypt.hash(updateUserDto.password, 10) : undefined,
        email: updateUserDto.email,
      },
    });

    delete updatedUser.password;
    return updatedUser;
  }

  async deleteUser(userId: number) {
    const deletedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    delete deletedUser.password;

    return deletedUser;
  }
}
