import { FileType } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateAttachmentDto {
  @IsString()
  memoryId: string;

  @IsString()
  storageId: string;

  @IsString()
  @IsOptional()
  extension?: string;

  @IsEnum(FileType)
  type: FileType;
}
