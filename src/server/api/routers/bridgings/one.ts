import { z } from "zod"

import { publicProcedure } from "@/lib/trpc/server"

import { fetchEi } from "../../fetchers"
import { BridgingItemResponse } from "../../types"

export const oneApi = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ input }) => {
    const result = await fetchEi(`/bridgings/${input.id}`, {
      method: "GET",
    }).then((res) => {
      return res.json() as Promise<BridgingItemResponse>
    })

    return result
  })
