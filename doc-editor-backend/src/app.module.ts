import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DocumentModule } from './document/document.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [UserModule, DocumentModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
