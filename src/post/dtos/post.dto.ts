import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class QueryGetPostsDto {
  @IsInt()
  @IsOptional()
  @ApiProperty()
  userId?: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  @Min(1)
  limit: number = 10;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  @Min(1)
  page: number = 1;
}

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
