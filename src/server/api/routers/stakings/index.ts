// https://backend.dev.copilot.xyz/docs

import { createTRPCRouter } from "@/lib/trpc/server"

import { manyApi } from "./many"
import { oneApi } from "./one"

export const stakingsRouter = createTRPCRouter({
  one: oneApi,
  many: manyApi,
})
