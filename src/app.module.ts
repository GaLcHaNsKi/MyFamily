import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MemoriesModule } from './memories/memories.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { StoragesModule } from './storages/storages.module';
import { FamiliesModule } from './families/families.module';
import { TasksModule } from './tasks/tasks.module';
import { NeedsModule } from './needs/needs.module';
import { YearlyEventsModule } from './yearly_events/yearly_events.module';
import { PrismaModule } from './prisma/prisma.module';
import { MembersModule } from './members/members.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, MemoriesModule, AttachmentsModule, StoragesModule, FamiliesModule, TasksModule, NeedsModule, YearlyEventsModule, PrismaModule, MembersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
