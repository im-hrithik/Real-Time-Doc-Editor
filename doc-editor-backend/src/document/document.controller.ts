// src/document/document.controller.ts
import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { DocumentService } from './document.service';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  async create(@Body('title') title: string) {
    return this.documentService.createDocument(title);
  }

  @Get(':title')
  async getByTitle(@Param('title') title: string) {
    return this.documentService.getDocumentByTitle(title);
  }

  @Put(':title')
  async update(
    @Param('title') title: string,
    @Body('content') content: string,
  ) {
    return this.documentService.updateDocument(title, content);
  }
}
