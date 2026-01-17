import 'dotenv/config';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { createExtendedPrismaClient } from './infrastructure/db/prisma/prisma.service';

const prisma = createExtendedPrismaClient();

const SIX_HOURS = 60 * 60 * 6;
const THIRTY_DAYS = 60 * 60 * 24 * 30;
const ONE_HOUR = 60 * 60;

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  // session: {
  //   expiresIn: Number(process.env.SESSION_EXPIRES_IN || SIX_HOURS),
  //   updateAge: Number(process.env.SESSION_UPDATE_AGE || THIRTY_DAYS),
  //   freshAge: 0,
  //   cookieCache: {
  //     enabled: true,
  //     maxAge: Number(process.env.SESSION_COOKIE_CACHE_MAX_AGE || ONE_HOUR),
  //   },
  // },
  //baseURL: process.env.BASE_URL as string,
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
