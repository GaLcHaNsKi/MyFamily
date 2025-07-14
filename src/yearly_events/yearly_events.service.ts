import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateYearlyEventDto } from './dto/create-yearly_event.dto';
import { UpdateYearlyEventDto } from './dto/update-yearly_event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class YearlyEventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createYearlyEventDto: CreateYearlyEventDto) {
    try {
      return await this.prisma.yearlyEvent.create({
        data: createYearlyEventDto,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(
          'A yearly event with the same unique data already exists',
        );
      }
      throw e;
    }
  }

  async findAll() {
    return this.prisma.yearlyEvent.findMany({
      include: {
        author: true,
      },
    });
  }

  async findOne(id: string) {
    const yearlyEvent = await this.prisma.yearlyEvent.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });

    if (!yearlyEvent) {
      throw new NotFoundException(`Yearly event with ID "${id}" not found`);
    }

    return yearlyEvent;
  }

  async update(id: string, updateYearlyEventDto: UpdateYearlyEventDto) {
    try {
      return await this.prisma.yearlyEvent.update({
        where: { id },
        data: updateYearlyEventDto,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(`Yearly event with ID "${id}" not found`);
        }
        if (e.code === 'P2002') {
          throw new ConflictException(
            'A yearly event with the same unique data already exists',
          );
        }
      }
      throw e;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.yearlyEvent.delete({
        where: { id },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new NotFoundException(`Yearly event with ID "${id}" not found`);
      }
      throw e;
    }
  }
}
