import { z } from "zod"

import { publicProcedure } from "@/lib/trpc/server"

import { fetchGi } from "../../fetchers"
import { NodeListResponse } from "../../types"

export const manyApi = publicProcedure
  .input(z.object({}))
  .query(async ({ input }) => {
    const result = await fetchGi("/nodes", {
      method: "GET",
    }).then((res) => {
      return res.json() as Promise<NodeListResponse>
    })

    return result
  })
