import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNeedDto } from './dto/create-need.dto';
import { UpdateNeedDto } from './dto/update-need.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class NeedsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNeedDto: CreateNeedDto) {
    try {
      const { executors, ...rest } = createNeedDto;
      return await this.prisma.need.create({
        data: {
          ...rest,
          executors: {
            connect: executors?.map((id) => ({ id })),
          },
        },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException('A need with the same unique data already exists');
      }
      throw e;
    }
  }

  async findAll() {
    return this.prisma.need.findMany({
      include: {
        author: true,
        executors: true,
      },
    });
  }

  async findOne(id: string) {
    const need = await this.prisma.need.findUnique({
      where: { id },
      include: {
        author: true,
        executors: true,
      },
    });

    if (!need) {
      throw new NotFoundException(`Need with ID "${id}" not found`);
    }

    return need;
  }

  async update(id: string, updateNeedDto: UpdateNeedDto) {
    try {
      const { executors, ...rest } = updateNeedDto;

      if (rest.isCompleted) {
        rest.isConfirmed = true;
      }

      return await this.prisma.need.update({
        where: { id },
        data: {
          ...rest,
          executors: {
            set: executors?.map((id) => ({ id })),
          },
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(`Need with ID "${id}" not found`);
        }
        if (e.code === 'P2002') {
          throw new ConflictException(
            'A need with the same unique data already exists',
          );
        }
      }
      throw e;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.need.delete({
        where: { id },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new NotFoundException(`Need with ID "${id}" not found`);
      }
      throw e;
    }
  }
}
