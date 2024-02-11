import { Injectable } from '@nestjs/common';
import { DeletePostDto, PostDto, UpdatePostDto } from './dtos';
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

  async updatePost(updatePostDto: UpdatePostDto) {
    return await this.prisma.post.update({
      where: {
        id: updatePostDto.id,
      },
      data: {
        title: updatePostDto.title,
        content: updatePostDto.content,
      },
    });
  }

  async deletePost(deletePostDto: DeletePostDto) {
    return await this.prisma.post.update({
      where: {
        id: deletePostDto.id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
