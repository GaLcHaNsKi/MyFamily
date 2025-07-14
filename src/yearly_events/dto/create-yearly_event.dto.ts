import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateYearlyEventDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  date: Date;

  @IsString()
  authorId: string;
}
