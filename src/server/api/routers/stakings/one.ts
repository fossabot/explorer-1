import { z } from "zod"

import { publicProcedure } from "@/lib/trpc/server"

import { eiPool } from "../../pools"
import { StakingItemResponse } from "../../types"

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
        path: `/stakings/${input.id}`,
        query: {},
      })
      .then(async (res) => {
        return res.body.json() as Promise<StakingItemResponse>
      })

    return result
  })
