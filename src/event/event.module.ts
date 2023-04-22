import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EventController } from './event.controller';

@Module({
  imports: [PrismaModule],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}
