import { env } from "./src/env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    config.externals.push("pino-pretty", "lokijs", "encoding")
    return config
  },
  experimental: {
    optimizePackageImports: [
      "@mantine/core",
      "@mantine/hooks",
      "wagmi",
      "viem",
    ],
  },
}

export default nextConfig
