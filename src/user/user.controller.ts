import { Body, Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/decorators/getUser.decorator';
import { UpdateUserDto } from './dtos';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async getUser(@GetUser('id') userId: number) {
    return this.userService.getUser(userId);
  }

  @Put('/')
  async updateUser(@GetUser('id') userId: number, @Body() userDto: UpdateUserDto) {
    return this.userService.updateUser(userId, userDto);
  }

  @Delete('/')
  async deleteUser(@GetUser('id') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
