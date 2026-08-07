import 'dotenv/config'
import { PrismaClient } from '../../shared/generated/prisma'
import { PrismaNeon } from '@prisma/adapter-neon'

// Use a global variable to prevent creating multiple connections in development
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaNeon({
      connectionString: process.env.DATABASE_URL!,
    }),
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
