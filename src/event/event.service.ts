import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventService {
  constructor(private prismaService: PrismaService) {}

  async count(args: Prisma.EventCountArgs) {
    return this.prismaService.event.count(args);
  }

  async findMany(args: Prisma.EventFindManyArgs) {
    return this.prismaService.event.findMany(args);
  }

  async findOne(args: Prisma.EventFindUniqueOrThrowArgs) {
    return this.prismaService.event.findUnique(args);
  }
}
