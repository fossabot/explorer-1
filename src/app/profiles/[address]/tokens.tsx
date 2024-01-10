import clsx from "clsx"
import React from "react"
import { Address, Chain } from "viem"
import { useBalance } from "wagmi"

import { Title } from "@mantine/core"

export type TokenInfoProps = {
  chain: Chain
  address: Address
  title: React.ReactNode
  tokens: Address[]
  className?: string
}

export function Tokens({
  chain,
  address,
  tokens,
  className,
  title,
}: TokenInfoProps) {
  console.log(chain.rpcUrls.default.http[0])
  return (
    <div className={clsx(className, "bg-gray-100 p-4 rounded-md")}>
      <Title size="h3">{title}</Title>
      <div>
        <p>100 $RSS3</p>
        <p>2 $RSS3 Node X Chip</p>
        <p>5 $RSS3 Node Y Chip</p>
        <p>...</p>
      </div>
    </div>
  )
}
