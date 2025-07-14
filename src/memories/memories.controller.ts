import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MemoriesService } from './memories.service';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('memories')
export class MemoriesController {
  constructor(private readonly memoriesService: MemoriesService) {}

  @Post()
  async create(@Body() createMemoryDto: CreateMemoryDto) {
    return this.memoriesService.create(createMemoryDto);
  }

  @Get()
  async findAll() {
    return this.memoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.memoriesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMemoryDto: UpdateMemoryDto) {
    return this.memoriesService.update(id, updateMemoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.memoriesService.remove(id);
  }
}
