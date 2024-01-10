import clsx from "clsx"
import React from "react"
import { Address, Chain } from "viem"
import { useBalance } from "wagmi"

import { useToken } from "@/hooks/useToken"
import { Title } from "@mantine/core"

export type TokenInfoProps = {
  chain: Chain
  account: Address
  token: Address
}

export function Token({ chain, account, token }: TokenInfoProps) {
  const { data } = useToken({ token, account })

  if (!data) return null

  return <p></p>
}
