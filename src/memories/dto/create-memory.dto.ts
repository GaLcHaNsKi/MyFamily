import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateMemoryDto {
  @IsString()
  authorId: string;

  @IsDateString()
  addedAt: Date;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  participants?: string[];
}
