import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const { participants, ...rest } = createTaskDto;
      return await this.prisma.task.create({
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
        throw new ConflictException('A task with the same unique data already exists');
      }
      throw e;
    }
  }

  async findAll() {
    return this.prisma.task.findMany({
      include: {
        author: true,
        participants: true,
        updatedBy: true,
      },
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        author: true,
        participants: true,
        updatedBy: true,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const { participants, ...rest } = updateTaskDto;
      return await this.prisma.task.update({
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
          throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        if (e.code === 'P2002') {
          throw new ConflictException(
            'A task with the same unique data already exists',
          );
        }
      }
      throw e;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.task.delete({
        where: { id },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }
      throw e;
    }
  }
}
