import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';
import { PostService } from './post.service';
import { GetUser } from 'src/auth/decorators';
import { PostDto } from './dtos';

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
}
