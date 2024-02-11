import { Injectable } from '@nestjs/common';
import { DeletePostDto, PostDto, QueryGetPostsDto, UpdatePostDto } from './dtos';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getPosts(queryOptions: QueryGetPostsDto) {
    return await this.prisma.post.findMany({
      where: {
        userId: queryOptions.userId,
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        content: true,
        likes: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            fullName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (queryOptions.page - 1) * queryOptions.limit,
      take: queryOptions.limit,
    });
  }

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
