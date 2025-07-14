import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MemoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMemoryDto: CreateMemoryDto) {
    try {
      const { participants, ...rest } = createMemoryDto;
      return await this.prisma.memory.create({
        data: {
          ...rest,
          participants: {
            connect: participants?.map((id) => ({ id })),
          },
        },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException('A memory with the same unique data already exists');
      }
      throw e;
    }
  }

  async findAll() {
    return this.prisma.memory.findMany({
      include: {
        author: true,
        participants: true,
        attachments: true,
      },
    });
  }

  async findOne(id: string) {
    const memory = await this.prisma.memory.findUnique({
      where: { id },
      include: {
        author: true,
        participants: true,
        attachments: true,
      },
    });

    if (!memory) {
      throw new NotFoundException(`Memory with ID "${id}" not found`);
    }

    return memory;
  }

  async update(id: string, updateMemoryDto: UpdateMemoryDto) {
    try {
      const { participants, ...rest } = updateMemoryDto;
      return await this.prisma.memory.update({
        where: { id },
        data: {
          ...rest,
          participants: {
            set: participants?.map((id) => ({ id })),
          },
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(`Memory with ID "${id}" not found`);
        }
        if (e.code === 'P2002') {
          throw new ConflictException(
            'A memory with the same unique data already exists',
          );
        }
      }
      throw e;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.memory.delete({
        where: { id },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new NotFoundException(`Memory with ID "${id}" not found`);
      }
      throw e;
    }
  }
}
