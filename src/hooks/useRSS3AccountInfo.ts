import { isAddress, type Address } from "viem"

import { rss3Chain } from "@/lib/wagmi/config/chains"
import { useQuery } from "@tanstack/react-query"

export type RSS3AccountInfo = {
  gasUsageCount: bigint
  transactionsCount: bigint
  transactionsLink: string
  lastBalanceUpdateBlock: bigint
  lastBalanceUpdateBlockLink: string
  coinBalance: bigint
  coinSymbol: string
  isContract: boolean
}

export const RSS3_ACCOUNT_INFO_QUERY_KEY = (address: Address) => [
  "rss3",
  "account-info",
  address,
]

export function useRSS3AccountInfo(address: Address) {
  return useQuery({
    enabled: isAddress(address),
    queryKey: RSS3_ACCOUNT_INFO_QUERY_KEY(address),
    async queryFn(): Promise<RSS3AccountInfo> {
      const [counters, addressInfo] = await Promise.all([
        fetchCounters(address),
        fetchAddressInfo(address),
      ])

      return {
        gasUsageCount: BigInt(counters.gas_usage_count),
        transactionsCount: BigInt(counters.transactions_count),
        transactionsLink: `${rss3Chain.blockExplorers.default.url}/address/${address}?tab=txs`,
        lastBalanceUpdateBlock: BigInt(
          addressInfo.block_number_balance_updated_at,
        ),
        lastBalanceUpdateBlockLink: `${rss3Chain.blockExplorers.default.url}/block/${addressInfo.block_number_balance_updated_at}`,
        coinBalance: BigInt(addressInfo.coin_balance),
        coinSymbol: rss3Chain.nativeCurrency.symbol,
        isContract: addressInfo.is_contract,
      }
    },
  })
}

async function fetchCounters(address: Address): Promise<{
  gas_usage_count: string
  token_transfers_count: string
  transactions_count: string
  validations_count: string
}> {
  const res = await fetch(
    `${rss3Chain.blockExplorers.default.url}/api/v2/addresses/${address}/counters`,
  )

  return await res.json()
}

async function fetchAddressInfo(address: Address): Promise<{
  block_number_balance_updated_at: number
  coin_balance: string
  is_contract: boolean
}> {
  const res = await fetch(
    `${rss3Chain.blockExplorers.default.url}/api/v2/addresses/${address}`,
  )

  return await res.json()
}
