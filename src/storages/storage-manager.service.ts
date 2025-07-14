import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IStorageStrategy } from './strategies/storage.strategy';
import { StorageType } from '@prisma/client';
import { LocalStorageStrategy } from './strategies/local.strategy';
import { CloudinaryStorageStrategy } from './strategies/cloudinary.strategy';
import { z } from 'zod';

// Схемы для валидации конфигов
const LocalConfigSchema = z.object({
  baseURL: z.string().url(),
  storagePath: z.string(),
});

const CloudinaryConfigSchema = z.object({
  cloud_name: z.string(),
  api_key: z.string(),
  api_secret: z.string(),
});

@Injectable()
export class StorageManagerService {
  constructor(private readonly prisma: PrismaService) {}

  async getProvider(storageId: string): Promise<IStorageStrategy> {
    const storage = await this.prisma.storage.findUnique({
      where: { id: storageId },
    });

    if (!storage || !storage.config) {
      throw new NotFoundException('Storage or its configuration not found');
    }

    switch (storage.type) {
      case StorageType.LOCAL:
        try {
          const config = LocalConfigSchema.parse(storage.config);
          return new LocalStorageStrategy(config);
        } catch (error) {
          throw new InternalServerErrorException('Invalid local storage config');
        }

      case StorageType.CLOUDINARY:
        try {
          const config = CloudinaryConfigSchema.parse(storage.config);
          return new CloudinaryStorageStrategy(config);
        } catch (error) {
          throw new InternalServerErrorException('Invalid Cloudinary config');
        }

      case StorageType.MEGA:
      case StorageType.BACKBLAZE_B2:
      case StorageType.DROPBOX:
        throw new InternalServerErrorException(
          `${storage.type} storage is not implemented yet.`,
        );
      default:
        // Это обеспечит, что мы не забудем обработать новый тип хранилища
        const _exhaustiveCheck: never = storage.type;
        throw new InternalServerErrorException(
          `Unknown storage type: ${_exhaustiveCheck}`,
        );
    }
  }
} 