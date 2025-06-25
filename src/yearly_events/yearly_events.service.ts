import { Injectable } from '@nestjs/common';
import { CreateYearlyEventDto } from './dto/create-yearly_event.dto';
import { UpdateYearlyEventDto } from './dto/update-yearly_event.dto';

@Injectable()
export class YearlyEventsService {
  create(createYearlyEventDto: CreateYearlyEventDto) {
    return 'This action adds a new yearlyEvent';
  }

  findAll() {
    return `This action returns all yearlyEvents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} yearlyEvent`;
  }

  update(id: number, updateYearlyEventDto: UpdateYearlyEventDto) {
    return `This action updates a #${id} yearlyEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} yearlyEvent`;
  }
}
