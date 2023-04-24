import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { SoftDeleteMiddleware } from './middleware/soft-delete.middleware';
import { EventMiddleware } from './middleware/event.middleware';
import { SoftDeleteReadMiddleware } from './middleware/soft-delete-read.middleware';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super();
    this.logger.log(`Prisma v${Prisma.prismaVersion.client}`);

    this.$use(SoftDeleteReadMiddleware());
    this.$use(SoftDeleteMiddleware());
    this.$use(EventMiddleware(this));
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
