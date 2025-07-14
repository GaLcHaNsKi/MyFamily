import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { YearlyEventsService } from './yearly_events.service';
import { CreateYearlyEventDto } from './dto/create-yearly_event.dto';
import { UpdateYearlyEventDto } from './dto/update-yearly_event.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('yearly-events')
export class YearlyEventsController {
  constructor(private readonly yearlyEventsService: YearlyEventsService) {}

  @Post()
  async create(@Body() createYearlyEventDto: CreateYearlyEventDto) {
    return this.yearlyEventsService.create(createYearlyEventDto);
  }

  @Get()
  async findAll() {
    return this.yearlyEventsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.yearlyEventsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateYearlyEventDto: UpdateYearlyEventDto,
  ) {
    return this.yearlyEventsService.update(id, updateYearlyEventDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.yearlyEventsService.remove(id);
  }
}
