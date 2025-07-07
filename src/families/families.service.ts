import { Injectable } from '@nestjs/common';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FamiliesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFamilyDto: CreateFamilyDto) {
    return this.prisma.family.create({
      data: {
        family: createFamilyDto.family,
      },
    });
  }

  async findAll() {
    return this.prisma.family.findMany({
      include: { members: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.family.findUnique({
      where: { id },
      include: { members: true },
    });
  }

  async update(id: string, updateFamilyDto: UpdateFamilyDto) {
    return this.prisma.family.update({
      where: { id },
      data: updateFamilyDto,
    });
  }

  async remove(id: string) {
    return this.prisma.family.delete({
      where: { id },
    });
  }
}

