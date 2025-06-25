import { Module } from '@nestjs/common';
import { YearlyEventsService } from './yearly_events.service';
import { YearlyEventsController } from './yearly_events.controller';

@Module({
  controllers: [YearlyEventsController],
  providers: [YearlyEventsService],
})
export class YearlyEventsModule {}
