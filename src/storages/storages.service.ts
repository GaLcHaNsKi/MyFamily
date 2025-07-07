import { Injectable } from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StoragesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStorageDto: CreateStorageDto) {
    return this.prisma.storage.create({
      data: {
        name: createStorageDto.name,
        baseURL: createStorageDto.baseUrl,
      },
    });
  }

  async findAll() {
    return this.prisma.storage.findMany();
  }

  async findOne(id: string) {
    return this.prisma.storage.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateStorageDto: UpdateStorageDto) {
    return this.prisma.storage.update({
      where: { id },
      data: {
        name: updateStorageDto.name,
        baseURL: updateStorageDto.baseUrl,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.storage.delete({
      where: { id },
    });
  }
}
