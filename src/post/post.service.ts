import { Injectable } from '@nestjs/common';
import { PostDto } from './dtos';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(userId: number, postDto: PostDto) {
    return await this.prisma.post.create({
      data: {
        title: postDto.title,
        content: postDto.content,
        userId,
        likes: 0,
      },
    });
  }
}
