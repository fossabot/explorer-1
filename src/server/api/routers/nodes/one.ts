import { z } from "zod"

import { publicProcedure } from "@/lib/trpc/server"

import { giPool } from "../../pools"
import { NodeItemResponse } from "../../types"

export const oneApi = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ input }) => {
    const result = await giPool
      .request({
        method: "GET",
        path: `/nodes/${input.id}`,
        query: {},
      })
      .then(async (res) => {
        return res.body.json() as Promise<NodeItemResponse>
      })

    return result
  })
