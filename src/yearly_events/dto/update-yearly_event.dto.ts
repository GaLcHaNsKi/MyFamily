import { PartialType } from '@nestjs/mapped-types';
import { CreateYearlyEventDto } from './create-yearly_event.dto';

export class UpdateYearlyEventDto extends PartialType(CreateYearlyEventDto) {}
