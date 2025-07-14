import { Module } from '@nestjs/common';
import { FamiliesService } from './families.service';
import { FamiliesController } from './families.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FamiliesController],
  providers: [FamiliesService, PrismaService],
})
export class FamiliesModule {}
