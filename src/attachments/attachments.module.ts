import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { StoragesModule } from 'src/storages/storages.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [StoragesModule],
  controllers: [AttachmentsController],
  providers: [AttachmentsService, PrismaService],
})
export class AttachmentsModule {}
