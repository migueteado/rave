import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventService {
  constructor(private prismaService: PrismaService) {}

  async registerEvent(args: Prisma.EventCreateInput) {
    return this.prismaService.event.create({ data: args });
  }
}
