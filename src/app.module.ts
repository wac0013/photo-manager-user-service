import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './auth';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { PrismaService } from './infrastructure/db/prisma';
import { UserService } from './application/services/user.service';
import { UserController } from './infrastructure/controllers/user.controller';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repo';
import { IUserRepository } from './domain/repositories/user.repo';

@Module({
  imports: [AuthModule.forRoot({ auth })],
  controllers: [AuthController, UserController],
  providers: [
    PrismaService,
    UserService,
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class AppModule { }
