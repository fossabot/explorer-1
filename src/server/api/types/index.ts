import { type Address } from "viem"

/** Response */

export type ListResponse<T extends unknown> = {
  data: T[]
  cursor: string
}

export type ItemResponse<T extends unknown> = {
  data: T
}

/** Commons */

type Block = {
  hash: Address
  number: number
  /**
   * In seconds.
   *
   * To display real date: `new Date(timestamp * 1000)`
   *
   * @example 1704270865
   **/
  timestamp: number
}

type Transaction = {
  hash: Address
  index: number
  nonce: number
  status: "success" | "failure"
}

/** Staking */

export type StakeEvent = {
  /**
   * In wei.
   *
   * To display:
   *
   * ```ts
   * import { formatEther } from 'viem'
   *
   * formatEther(BigInt(value)) // "1"
   * ```
   *
   * @example "1000000000000000000"
   */
  value: string
  startTokenId: 1
  endTokenId: 4
}

export type Staking = {
  userAddress: Address
  nodeAddress: Address
  block: Block
  transaction: Transaction
  action: "stake"
  event: {
    stake: StakeEvent
  }
}

export type StakingListResponse = ListResponse<Staking>
export type StakingItemResponse = ItemResponse<Staking>

/** Bridging */

export type BridgeEvent = {
  token: {
    address: {
      layer1: Address
      layer2: Address
    }
  }
  /**
   * In wei.
   *
   * To display:
   *
   * ```ts
   * import { formatEther } from 'viem'
   *
   * formatEther(BigInt(value)) // "1"
   * ```
   *
   * @example "1000000000000000000"
   */
  value: string
  decimal: 18
}

export type Bridging = {
  sender: Address
  receiver: Address
  block: Block
  transaction: Transaction
  action: "deposit" | "withdraw"
  event: {
    bridge: BridgeEvent
  }
}

export type BridgingListResponse = ListResponse<Bridging>
export type BridgingItemResponse = ItemResponse<Bridging>

/** Node */

export type Node = {
  address: Address
  name: string
  description: string
  /** @example "https://node.rss3.dev/" */
  endpoint: string
  /**
   * The fraction of the tax.
   *
   * min: 1, max: 10000
   **/
  taxFraction: number
  isPublicGood: boolean

  stream: {
    enable: boolean
    /** @example "kafka" */
    driver: string
    /** @example "rss3.node.feeds" */
    topic: string
    /** @example "https://node.google.com:9092" */
    uri: string
  }
}

export type NodeListResponse = ListResponse<Node>
export type NodeItemResponse = ItemResponse<Node>
