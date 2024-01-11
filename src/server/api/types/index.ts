import { type Address } from "viem"

/* Response */

export type ListResponse<T extends unknown> = {
  data: T[]
  cursor: string
}

export type ItemResponse<T extends unknown> = {
  data: T
}

/* Commons */

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

/* Staking */

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

/* Bridging */

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
  operatingPoolTokens: string

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
  stakingPoolTokens: string

  /**
   * This is an internal variable used to allocate staking rewards for users who staked.
   *
   * It does not need to be displayed on the front end.
   *
   * There is a ratio between the number of shares and the number of chips,
   * where every `500*10**18` shares corresponds to `1` chip NFT.
   * That is, for each chip the user receives, the contract will simultaneously increase
   * the user's shares by 500 ether units.
   *
   * @example "1000000000000000000"
   */
  totalShares: string

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
  slashedTokens: string
}

export type NodeListResponse = ListResponse<Node>
export type NodeItemResponse = ItemResponse<Node>
