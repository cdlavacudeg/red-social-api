import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OwnershipPostGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const { id } = user;

    const postId = request.body.id;

    if (!postId) {
      // Deny access if the post id is not provided
      return false;
    }

    const post = await this.prisma.post.findUnique({
      select: {
        id: true,
        userId: true,
      },
      where: {
        id: postId,
        userId: id,
      },
    });

    if (!post) {
      // Deny access if the user is not the owner of the post
      return false;
    }

    // Allow access if the user is the owner of the post
    return true;
  }
}
