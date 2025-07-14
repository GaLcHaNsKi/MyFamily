import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  authorId: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  participants?: string[];

  @IsDateString()
  start: Date;

  @IsInt()
  @IsOptional()
  duration?: number;

  @IsString()
  updatedById: string;

  @IsString()
  @IsOptional()
  periodic?: string;
}
