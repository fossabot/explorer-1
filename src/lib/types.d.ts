import "react"

import { type Activity as RActivity } from "@rss3/js-sdk"

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
  interface ScriptHTMLAttributes {
    strategy: string
  }
}

export type Activity = RActivity & {
  chain?: string
  indexed_at?: number
  urls?: urlMetadata.Result[]
}
