import { Body, Controller, Get } from '@nestjs/common';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { Session } from '@thallesp/nestjs-better-auth';
import { UserService } from 'src/application/services/user.service';
import { auth } from 'src/auth';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('me')
  async getUser(@Session() session: UserSession) {
    return this.userService.getUser(session.user.id);
  }
}
