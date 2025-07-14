import { Module } from '@nestjs/common';
import { YearlyEventsService } from './yearly_events.service';
import { YearlyEventsController } from './yearly_events.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [YearlyEventsController],
  providers: [YearlyEventsService, PrismaService],
})
export class YearlyEventsModule {}
