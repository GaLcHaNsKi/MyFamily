import { Injectable } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './dto/users.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { hash } from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        nickname: data.nickname,
        passwordHash: await hash(data.password, 12)
      },
      select: {
        id: true,
        nickname: true
      }
    })
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        nickname: true
      }
    })
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        nickname: true
      }
    })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        nickname: true
      }
    })
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    })
  }
}
