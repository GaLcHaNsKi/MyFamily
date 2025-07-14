import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNeedDto {
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
  executors?: string[];

  @IsDateString()
  @IsOptional()
  deadline?: Date;

  @IsBoolean()
  @IsOptional()
  isConfirmed?: boolean;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
