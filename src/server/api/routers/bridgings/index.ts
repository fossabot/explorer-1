import { createTRPCRouter } from "@/lib/trpc/server"

import { manyApi } from "./many"
import { oneApi } from "./one"

export const bridgingsRouter = createTRPCRouter({
  one: oneApi,
  many: manyApi,
})
