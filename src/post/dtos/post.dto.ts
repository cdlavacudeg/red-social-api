import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;
}

export class UpdatePostDto extends PartialType(PostDto) {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}

export class DeletePostDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}
