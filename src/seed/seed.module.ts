import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService, PrismaService],
  imports: [UserModule],
})
export class SeedModule {}
