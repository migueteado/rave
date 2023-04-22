import { Controller, Get, Param, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from '@prisma/client';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  async findMany(@Query() query): Promise<{ count: number; results: Event[] }> {
    const { cursor, where, orderBy } = query;
    const skip = query.skip ? Number(query.skip) : undefined;
    const take = query.take ? Number(query.take) : undefined;

    const count = await this.eventService.count({
      where,
    });
    const results = await this.eventService.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });

    return {
      count: count,
      results: results,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Event> {
    return this.eventService.findOne({ where: { id } });
  }
}
