import { Pool } from "undici"

export const eiPool = new Pool("https://gi.rss3.dev/", {
  connections: 50,
})

export const giPool = new Pool("https://gi.rss3.dev/", {
  connections: 50,
})

export const coinmarketcapPool = new Pool(
  "https://pro-api.coinmarketcap.com/",
  {
    connections: 50,
  },
)
