import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from './db'
import { nextCookies } from 'better-auth/next-js'
import { username } from 'better-auth/plugins/username'
import { admin as adminPlugin } from 'better-auth/plugins/admin'
import { ac, admin, user, agent } from './auth/permissions'

export const auth = betterAuth({
  trustedOrigins: ['https://policy360.vercel.app', 'http://localhost:3000'],
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
      },
      phone: {
        type: 'string',
      },
    },
  },
  database: prismaAdapter(prisma, {
    provider: 'postgresql', // or "mysql", "postgresql", ...etc
  }),
  plugins: [
    nextCookies(),
    username(),
    adminPlugin({
      ac,
      roles: {
        admin,
        agent,
        user,
      },
    }),
  ],
})
