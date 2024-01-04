// https://env.t3.gg/docs/nextjs

import { z } from "zod"

import { createEnv } from "@t3-oss/env-nextjs"

export const env = createEnv({
  client: {
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_ENV: z.enum(["dev", "staging", "production"]).default("dev"),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID:
      process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  },
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    COINMARKETCAP_API_KEY: z.string().min(1),
  },
})
