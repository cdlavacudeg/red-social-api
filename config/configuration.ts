import { registerAs } from '@nestjs/config';

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
  };
});
