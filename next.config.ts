// @ts-check

/** @type {import('next').NextConfig} */
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: (config: any, { isServer }: { isServer: any }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },
}

export default nextConfig
