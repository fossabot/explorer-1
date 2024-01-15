import { formatUnits } from "viem"

import { Node } from "@/server/api/types"

const NODE_DATA_KEY_NAME_MAP: Record<keyof Node, string> = {
  address: "Address",
  name: "Name",
  description: "Description",
  endpoint: "Endpoint",
  isPublicGood: "Kind",
  taxFraction: "Tax Fraction",
  operatingPoolTokens: "Operating Pool Tokens",
  slashedTokens: "Slashed Tokens",
  totalShares: "Total Shares",
  stakingPoolTokens: "Staking Pool Tokens",
}

export function nodeDataKeyDisplayName(key: keyof Node) {
  return NODE_DATA_KEY_NAME_MAP[key]
}

export const formattedNodeData = (node: Node, key: keyof Node): string => {
  switch (key) {
    case "address":
      return node.address
    case "name":
      return node.name
    case "description":
      return node.description
    case "endpoint":
      return node.endpoint
    case "isPublicGood":
      return node.isPublicGood ? "Public Good" : "Normal"
    case "taxFraction":
      return `${node.taxFraction / 100}%`
    case "operatingPoolTokens":
      return formatUnits(BigInt(node.operatingPoolTokens), 18)
    case "slashedTokens":
      return formatUnits(BigInt(node.slashedTokens), 18)
    case "totalShares":
      return formatUnits(BigInt(node.totalShares), 18)
    case "stakingPoolTokens":
      return formatUnits(BigInt(node.stakingPoolTokens), 18)
  }
}
