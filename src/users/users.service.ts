import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    try {
      const hashedPassword = await hash(data.password, 12);
      return await this.prisma.user.create({
        data: {
          nickname: data.nickname,
          passwordHash: hashedPassword,
        },
        select: {
          id: true,
          nickname: true,
        },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(
          'Пользователь с таким никнеймом уже существует',
        );
      }
      throw e;
    }
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        nickname: true
      }
    })
  }

  async findByNickname(nickname: string) {
    return this.prisma.user.findUnique({
      where: { nickname },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        nickname: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Пользователь с ID "${id}" не найден`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
        select: {
          id: true,
          nickname: true,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(`Пользователь с ID "${id}" не найден`);
        }
        if (e.code === 'P2002') {
          throw new ConflictException(
            'Пользователь с таким никнеймом уже существует',
          );
        }
      }
      throw e;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new NotFoundException(`Пользователь с ID "${id}" не найден`);
      }
      throw e;
    }
  }
}
