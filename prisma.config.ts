import dotenv from 'dotenv'
import { defineConfig } from 'prisma/config'
dotenv.config()

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  engine: 'classic',
  datasource: {
    url: `${process.env.DATABASE_URL}`,
  },
})
