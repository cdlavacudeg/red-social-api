import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

export default registerAs('config', () => {
  return {
    api: {
      port: parseInt(process.env.API_PORT) || 3000,
    },
    prisma: {
      databaseUrl: process.env.DATABASE_URL,
    },
    jwt: {
      loginSecret: process.env.JWT_LOGIN_SECRET,
    },
    sendgrid: {
      apiKey: process.env.SENDGRID_API_KEY,
      sender: process.env.SENDGRID_SENDER_EMAIL,
    },
  };
});

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const store = await redisStore({
      socket: {
        host: configService.get<string>('REDIS_HOST'),
        port: parseInt(configService.get<string>('REDIS_PORT')!),
      },
      password: configService.get<string>('REDIS_PASSWORD'),
    });
    return {
      store: () => store,
    };
  },
  inject: [ConfigService],
};
