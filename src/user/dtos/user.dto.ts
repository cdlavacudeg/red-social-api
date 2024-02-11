import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  fullName?: string;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  age?: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  password?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  email?: string;
}
