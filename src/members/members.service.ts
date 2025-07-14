import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMemberDto: CreateMemberDto) {
    try {
      return await this.prisma.member.create({
        data: createMemberDto,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException('A member with the same unique data already exists');
      }
      throw e;
    }
  }

  async findAll() {
    return this.prisma.member.findMany({
      include: {
        user: true,
        family: true,
        dad: true,
        mom: true,
        partner: true,
      },
    });
  }

  async findOne(id: string) {
    const member = await this.prisma.member.findUnique({
      where: { id },
      include: {
        user: true,
        family: true,
        dad: true,
        mom: true,
        partner: true,
        childrenAsDad: true,
        childrenAsMom: true,
        memories: true,
        participance: true,
      },
    });

    if (!member) {
      throw new NotFoundException(`Member with ID "${id}" not found`);
    }

    return member;
  }

  async update(id: string, updateMemberDto: UpdateMemberDto) {
    try {
      return await this.prisma.member.update({
        where: { id },
        data: updateMemberDto,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(`Member with ID "${id}" not found`);
        }
        if (e.code === 'P2002') {
          throw new ConflictException(
            'A member with the same unique data already exists',
          );
        }
      }
      throw e;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.member.delete({
        where: { id },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new NotFoundException(`Member with ID "${id}" not found`);
      }
      throw e;
    }
  }
}
