import { HttpRequestError } from "viem"

import { env } from "@/env.mjs"

async function baseFetch(url: string, init?: RequestInit) {
  const res = await fetch(url, init)
  if (res.ok) {
    return res
  } else {
    const text = await res.text()
    throw new HttpRequestError({
      body: { response: text },
      details: text || res.statusText,
      headers: res.headers,
      status: res.status,
      url,
    })
  }
}

function ensureStartSlash(url: string) {
  return url.startsWith("/") ? url : "/" + url
}

export function fetchEi(url: string, init?: RequestInit) {
  url = ensureStartSlash(url)
  return baseFetch("https://gi.rss3.dev" + url, init)
}

export function fetchGi(url: string, init?: RequestInit) {
  url = ensureStartSlash(url)
  return baseFetch("https://gi.rss3.dve" + url, init)
}

export function fetchCoinmarketCap(url: string, init?: RequestInit) {
  url = ensureStartSlash(url)
  return baseFetch("https://pro-api.coinmarketcap.com" + url, {
    ...init,
    headers: {
      "X-CMC_PRO_API_KEY": env.COINMARKETCAP_API_KEY,
      ...init?.headers,
    },
  })
}
