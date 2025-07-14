import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NeedsService } from './needs.service';
import { CreateNeedDto } from './dto/create-need.dto';
import { UpdateNeedDto } from './dto/update-need.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('needs')
export class NeedsController {
  constructor(private readonly needsService: NeedsService) {}

  @Post()
  async create(@Body() createNeedDto: CreateNeedDto) {
    return this.needsService.create(createNeedDto);
  }

  @Get()
  async findAll() {
    return this.needsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.needsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNeedDto: UpdateNeedDto) {
    return this.needsService.update(id, updateNeedDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.needsService.remove(id);
  }
}
