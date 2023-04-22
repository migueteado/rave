import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventService {
  constructor(private prismaService: PrismaService) {}

  async registerEvent(args: Prisma.EventCreateInput) {
    return this.create(args);
  }

  async count(args: Prisma.EventCountArgs) {
    return this.prismaService.event.count(args);
  }

  async create(args: Prisma.EventCreateInput) {
    return this.prismaService.event.create({ data: args });
  }

  async findMany(args: Prisma.EventFindManyArgs) {
    return this.prismaService.event.findMany(args);
  }

  async findOne(args: Prisma.EventFindUniqueOrThrowArgs) {
    return this.prismaService.event.findUnique(args);
  }
}
