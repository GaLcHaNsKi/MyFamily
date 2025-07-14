import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorageManagerService } from 'src/storages/storage-manager.service';

@Injectable()
export class AttachmentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageManager: StorageManagerService,
  ) {}

  async create(
    createAttachmentDto: CreateAttachmentDto,
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const provider = await this.storageManager.getProvider(
      createAttachmentDto.storageId,
    );
    
    // Путь внутри хранилища, например: "familyId/memoryId"
    const filePath = `${file.fieldname}/${createAttachmentDto.memoryId}`;
    const { url, key } = await provider.upload(file, filePath);

    return this.prisma.attachment.create({
      data: {
        memoryId: createAttachmentDto.memoryId,
        storageId: createAttachmentDto.storageId,
        type: createAttachmentDto.type,
        extension: createAttachmentDto.extension,
        url: url,
        key: key,
      },
      include: {
        memory: true,
        storage: true,
      },
    });
  }

  async findAll() {
    return this.prisma.attachment.findMany({
      include: {
        memory: true,
        storage: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.attachment.findUnique({
      where: { id },
      include: {
        memory: true,
        storage: true,
      },
    });
  }

  async update(id: string, updateAttachmentDto: UpdateAttachmentDto) {
    return this.prisma.attachment.update({
      where: { id },
      data: updateAttachmentDto,
      include: {
        memory: true,
        storage: true,
      },
    });
  }

  async remove(id: string) {
    const attachment = await this.prisma.attachment.findUnique({
      where: { id },
    });

    if (attachment) {
      const provider = await this.storageManager.getProvider(attachment.storageId);
      await provider.delete(attachment.key);
    }
    
    return this.prisma.attachment.delete({
      where: { id },
    });
  }
}
