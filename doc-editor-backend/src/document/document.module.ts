import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DocumentGateway } from './document.gateway';

@Module({
  imports: [PrismaModule],
  providers: [DocumentService, DocumentGateway],
  controllers: [DocumentController],
})
export class DocumentModule {}
