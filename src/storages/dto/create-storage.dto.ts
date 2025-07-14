import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { StorageType } from '@prisma/client';

export class CreateStorageDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  baseURL?: string;

  @IsEnum(StorageType)
  type: StorageType;

  @IsObject()
  @IsOptional()
  config?: object;
}
