import { createTRPCRouter } from "@/lib/trpc/server"

import { bridgingsRouter } from "./routers/bridgings"
import { nodesRouter } from "./routers/nodes"
import { stakingsRouter } from "./routers/stakings"
import { thirdPartyRouter } from "./routers/third-party"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  bridgings: bridgingsRouter,
  nodes: nodesRouter,
  stakings: stakingsRouter,
  thirdParty: thirdPartyRouter,
})
