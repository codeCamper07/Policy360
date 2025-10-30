import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'

const nextConfig = {
  turbopack: (config: any, { isServer }: { isServer: any }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }
    return config
  },
}

export default nextConfig
