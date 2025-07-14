import { Module } from '@nestjs/common';
import { StoragesService } from './storages.service';
import { StoragesController } from './storages.controller';
import { StorageManagerService } from './storage-manager.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [StoragesController],
  providers: [StoragesService, StorageManagerService, PrismaService],
  exports: [StorageManagerService],
})
export class StoragesModule {}
