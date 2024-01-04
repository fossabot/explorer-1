// https://backend.dev.copilot.xyz/docs

import { createTRPCRouter } from "@/lib/trpc/server"

import { tokenPriceApi } from "./token-price"

export const thirdPartyRouter = createTRPCRouter({
  tokenPrice: tokenPriceApi,
})
