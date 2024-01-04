import { z } from "zod"

import { publicProcedure } from "@/lib/trpc/server"

import { eiPool } from "../../pools"
import { BridgingListResponse } from "../../types"

export const manyApi = publicProcedure
  .input(z.object({}))
  .query(async ({ input }) => {
    const result = await eiPool
      .request({
        method: "GET",
        path: "/bridgings",
        query: {},
      })
      .then(async (res) => {
        return res.body.json() as Promise<BridgingListResponse>
      })

    return result
  })
