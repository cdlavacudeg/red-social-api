import { Body, Controller, Delete, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';
import { PostService } from './post.service';
import { GetUser } from 'src/auth/decorators';
import { DeletePostDto, PostDto, UpdatePostDto } from './dtos';
import { OwnershipPostGuard } from './guards';

@ApiTags('Post')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('/')
  async createPost(@GetUser('id') userId: number, @Body() postDto: PostDto) {
    return this.postService.createPost(userId, postDto);
  }

  @Put('/')
  @UseGuards(OwnershipPostGuard)
  async updatePost(@Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePost(updatePostDto);
  }

  @Delete('/')
  @UseGuards(OwnershipPostGuard)
  async deletePost(@Body() deletePostDto: DeletePostDto) {
    return this.postService.deletePost(deletePostDto);
  }
}
