import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import configuration from 'config/configuration';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(@Inject(configuration.KEY) private configService: ConfigType<typeof configuration>) {
    super({
      datasources: {
        db: {
          url: configService.prisma.databaseUrl,
        },
      },
    });
  }
}
