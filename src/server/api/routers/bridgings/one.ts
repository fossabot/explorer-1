import { z } from "zod"

import { publicProcedure } from "@/lib/trpc/server"

import { eiPool } from "../../pools"
import { BridgingItemResponse } from "../../types"

export const oneApi = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ input }) => {
    const result = await eiPool
      .request({
        method: "GET",
        path: `/bridgings/${input.id}`,
        query: {},
      })
      .then(async (res) => {
        return res.body.json() as Promise<BridgingItemResponse>
      })

    return result
  })
