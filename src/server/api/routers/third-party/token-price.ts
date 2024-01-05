import { z } from "zod"

import { env } from "@/env.mjs"
import { publicProcedure } from "@/lib/trpc/server"

import { coinmarketcapPool } from "../../pools"

export const tokenPriceApi = publicProcedure.query(async ({ input }) => {
  const result = await coinmarketcapPool
    .request({
      method: "GET",
      path: "/v2/cryptocurrency/quotes/latest",
      query: {
        slug: "rss3,ethereum",
      },
      headers: {
        "X-CMC_PRO_API_KEY": env.COINMARKETCAP_API_KEY,
      },
    })
    .then(async (res) => {
      const json = (await res.body.json()) as {
        data: {
          [key: string]: {
            quote: {
              USD: {
                price: number
              }
            }
          }
        }
      }
      return {
        RSS3: json.data[17917].quote.USD.price,
        ETH: json.data[1027].quote.USD.price,
        SEP: 10,
      }
    })

  return result
})
