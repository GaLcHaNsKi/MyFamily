import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StoragesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStorageDto: CreateStorageDto) {
    try {
      return await this.prisma.storage.create({
        data: createStorageDto,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(
          'A storage with the same unique data already exists',
        );
      }
      throw e;
    }
  }

  async findAll() {
    return this.prisma.storage.findMany();
  }

  async findOne(id: string) {
    const storage = await this.prisma.storage.findUnique({
      where: { id },
    });

    if (!storage) {
      throw new NotFoundException(`Storage with ID "${id}" not found`);
    }

    return storage;
  }

  async update(id: string, updateStorageDto: UpdateStorageDto) {
    try {
      return await this.prisma.storage.update({
        where: { id },
        data: updateStorageDto,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(`Storage with ID "${id}" not found`);
        }
        if (e.code === 'P2002') {
          throw new ConflictException(
            'A storage with the same unique data already exists',
          );
        }
      }
      throw e;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.storage.delete({
        where: { id },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new NotFoundException(`Storage with ID "${id}" not found`);
      }
      throw e;
    }
  }
}
