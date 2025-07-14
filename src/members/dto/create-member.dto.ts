import { Gender } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMemberDto {
  @IsString()
  name: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsDateString()
  birthDate: Date;

  @IsString()
  familyId: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  dadId?: string;

  @IsString()
  @IsOptional()
  momId?: string;

  @IsString()
  @IsOptional()
  partnerId?: string;

  @IsBoolean()
  @IsOptional()
  isOlder?: boolean;
}
