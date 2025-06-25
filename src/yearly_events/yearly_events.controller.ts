import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { YearlyEventsService } from './yearly_events.service';
import { CreateYearlyEventDto } from './dto/create-yearly_event.dto';
import { UpdateYearlyEventDto } from './dto/update-yearly_event.dto';

@Controller('yearly-events')
export class YearlyEventsController {
  constructor(private readonly yearlyEventsService: YearlyEventsService) {}

  @Post()
  create(@Body() createYearlyEventDto: CreateYearlyEventDto) {
    return this.yearlyEventsService.create(createYearlyEventDto);
  }

  @Get()
  findAll() {
    return this.yearlyEventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.yearlyEventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateYearlyEventDto: UpdateYearlyEventDto) {
    return this.yearlyEventsService.update(+id, updateYearlyEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.yearlyEventsService.remove(+id);
  }
}
