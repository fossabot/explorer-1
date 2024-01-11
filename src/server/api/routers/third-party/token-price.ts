import { publicProcedure } from "@/lib/trpc/server"

import { fetchCoinmarketCap } from "../../fetchers"
import { querystring } from "../../fetchers/utils"

export const tokenPriceApi = publicProcedure.query(async ({ input }) => {
  const result = await fetchCoinmarketCap(
    "/v2/cryptocurrency/quotes/latest?" +
      querystring({
        slug: "rss3,ethereum",
      }),
    {
      method: "GET",
    },
  ).then(async (res) => {
    const json = (await res.json()) as {
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
