import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  async createDocument(title: string) {
    const document = await this.getDocumentByTitle(title);

    if (document) {
      return document;
    }

    return this.prisma.document.create({
      data: {
        title,
        content: '',
      },
    });
  }

  async getDocumentByTitle(title: string) {
    return this.prisma.document.findUnique({
      where: {
        title,
      },
    });
  }

  async updateDocument(title: string, content: string) {
    const updatedDocument = await this.prisma.document.update({
      where: { title },
      data: { content },
    });

    return updatedDocument;
  }
}
