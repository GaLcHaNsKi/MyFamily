import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FamiliesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFamilyDto: CreateFamilyDto) {
    try {
      return await this.prisma.family.create({
        data: {
          family: createFamilyDto.family,
        },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(
          `Family with name "${createFamilyDto.family}" already exists`,
        );
      }
      throw e;
    }
  }

  async findAll() {
    return this.prisma.family.findMany({
      include: { members: true },
    });
  }

  async findOne(id: string) {
    const family = await this.prisma.family.findUnique({
      where: { id },
      include: { members: true },
    });

    if (!family) {
      throw new NotFoundException(`Family with ID "${id}" not found`);
    }

    return family;
  }

  async update(id: string, updateFamilyDto: UpdateFamilyDto) {
    try {
      return await this.prisma.family.update({
        where: { id },
        data: updateFamilyDto,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(`Family with ID "${id}" not found`);
        }
        if (e.code === 'P2002') {
          throw new ConflictException(
            `Family with name "${updateFamilyDto.family}" already exists`,
          );
        }
      }
      throw e;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.family.delete({
        where: { id },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new NotFoundException(`Family with ID "${id}" not found`);
      }
      throw e;
    }
  }
}

