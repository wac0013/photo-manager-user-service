import 'dotenv/config';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { createExtendedPrismaClient } from './infrastructure/db/prisma/prisma.service';
import * as nodemailer from 'nodemailer';

const prisma = createExtendedPrismaClient();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: Number(process.env.SMTP_PORT || 1025),
  secure: false,
});

const SIX_HOURS = 60 * 60 * 6;

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailConfirmation: async ({ user, newEmail, url, token }) => {
        await transporter.sendMail({
          from: '"Photo Manager" <no-reply@photomanager.com>',
          to: user.email,
          subject: 'Confirmação de alteração de e-mail',
          text: `Olá ${user.name}, você solicitou a alteração de e-mail para ${newEmail}. Use o link para confirmar: ${url}`,
          html: `<p>Olá ${user.name},</p><p>Você solicitou a alteração de e-mail para <b>${newEmail}</b>.</p><p><a href="${url}">Clique aqui para confirmar a alteração</a></p>`,
        });
      },
      updateEmailWithoutVerification: false
    }
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }) => {
      await transporter.sendMail({
        from: '"Photo Manager" <no-reply@photomanager.com>',
        to: user.email,
        subject: 'Recuperação de Senha',
        text: `Olá ${user.name}, você solicitou a recuperação de senha. Use o link para criar uma nova: ${url}`,
        html: `<p>Olá ${user.name},</p><p>Você solicitou a recuperação de sua senha.</p><p><a href="${url}">Clique aqui para definir uma nova senha</a></p>`,
      });
    },
    resetPasswordTokenExpiresIn: SIX_HOURS,
  },
  emailVerification: {
    sendOnSignUp: false,
  },
  plugins: [],
  basePath: '/api/users/v1/auth',
  experimental: { joins: true },
  trustedOrigins: [process.env.ORIGIN_ALLOWED as string],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
