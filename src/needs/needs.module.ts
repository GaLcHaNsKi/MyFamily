import { Module } from '@nestjs/common';
import { NeedsService } from './needs.service';
import { NeedsController } from './needs.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [NeedsController],
  providers: [NeedsService, PrismaService],
})
export class NeedsModule {}
