import { z } from "zod"

import { publicProcedure } from "@/lib/trpc/server"

import { fetchEi } from "../../fetchers"
import { BridgingListResponse } from "../../types"

export const manyApi = publicProcedure
  .input(z.object({}))
  .query(async ({ input }) => {
    const result = await fetchEi("/bridgings", {
      method: "GET",
    }).then((res) => {
      return res.json() as Promise<BridgingListResponse>
    })

    return result
  })
