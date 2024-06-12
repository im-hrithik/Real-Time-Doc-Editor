import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    const existingUser = await this.prisma.user.findUnique({
      where: { username: data.username },
    });

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    if (newUser) {
      return 'User Registered';
    } else {
      throw new HttpException(
        'User registration failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUserByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username: username },
    });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
