import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Body,
  Delete,
  Param,
  Get,
  Patch,
} from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';

@UseGuards(JwtAuthGuard)
@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createAttachmentDto: CreateAttachmentDto,
  ) {
    return this.attachmentsService.create(createAttachmentDto, file);
  }

  @Get()
  async findAll() {
    return this.attachmentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.attachmentsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAttachmentDto: UpdateAttachmentDto,
  ) {
    return this.attachmentsService.update(id, updateAttachmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.attachmentsService.remove(id);
  }
}
