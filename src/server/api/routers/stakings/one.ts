import { z } from "zod"

import { publicProcedure } from "@/lib/trpc/server"

import { fetchEi } from "../../fetchers"
import { StakingItemResponse } from "../../types"

export const oneApi = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ input }) => {
    const result = await fetchEi(`/stakings/${input.id}`, {
      method: "GET",
    }).then((res) => {
      return res.json() as Promise<StakingItemResponse>
    })

    return result
  })
