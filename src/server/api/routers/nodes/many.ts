import { z } from "zod"

import { publicProcedure } from "@/lib/trpc/server"

import { giPool } from "../../pools"
import { NodeListResponse } from "../../types"

export const manyApi = publicProcedure
  .input(z.object({}))
  .query(async ({ input }) => {
    const result = await giPool
      .request({
        method: "GET",
        path: "/nodes",
        query: {},
      })
      .then(async (res) => {
        return res.body.json() as Promise<NodeListResponse>
      })

    return result
  })
