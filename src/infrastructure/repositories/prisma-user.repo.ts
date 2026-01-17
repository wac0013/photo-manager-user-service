import { Injectable } from '@nestjs/common';

import { PrismaService } from '../db/prisma/prisma.service';
import type { IUserRepository } from '../../domain/repositories/user.repo';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) { }

  get model() {
    return this.prisma.client.user;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.model.findUnique({ where: { id } });
    return user ? new UserEntity(user) : null;
  }
}
