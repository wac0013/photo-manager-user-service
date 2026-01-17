import { Controller, All, Req, Res } from '@nestjs/common';
import { auth } from '../../auth';
import { toNodeHandler } from 'better-auth/node';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  @All('*path')
  async handleAuth(@Req() req: Request, @Res() res: Response) {
    return toNodeHandler(auth)(req, res);
  }
}
