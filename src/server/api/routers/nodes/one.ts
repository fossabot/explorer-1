import { z } from "zod"

import { publicProcedure } from "@/lib/trpc/server"

import { fetchGi } from "../../fetchers"
import { NodeItemResponse } from "../../types"

export const oneApi = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ input }) => {
    const result = await fetchGi(`/nodes/${input.id}`, {
      method: "GET",
    }).then((res) => {
      return res.json() as Promise<NodeItemResponse>
    })

    return result
  })
