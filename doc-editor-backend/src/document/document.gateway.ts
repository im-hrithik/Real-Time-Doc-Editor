// document.gateway.ts

import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { DocumentService } from './document.service';

@WebSocketGateway({ cors: true })
export class DocumentGateway {
  @WebSocketServer() server: Server;

  constructor(private documentService: DocumentService) {}

  @SubscribeMessage('updateDocument')
  async handleUpdateDocument(
    client: any,
    data: { title: string; content: string },
  ) {
    const { title, content } = data;
    await this.documentService.updateDocument(title, content);
    const updatedDocument =
      await this.documentService.getDocumentByTitle(title);
    this.server.emit('documentUpdate', updatedDocument);
  }
}
