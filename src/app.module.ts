import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import configuration, { RedisOptions } from 'config/configuration';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    JwtModule.register({ global: true }),
    CacheModule.registerAsync(RedisOptions),
    PrismaModule,
    AuthModule,
    UserModule,
    PostModule,
  ],
  providers: [],
})
export class AppModule {}
