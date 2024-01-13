import clsx from "clsx"
import React from "react"
import { Chain } from "viem"

import { useRSS3Balance } from "@/hooks/useRSS3Balance"
import { Title } from "@mantine/core"

export type TokenInfoProps = {
  chain: Chain
  title: React.ReactNode
  className?: string
}

export function Tokens({ chain, className, title }: TokenInfoProps) {
  const balance = useRSS3Balance(chain.id)

  return (
    <div className={clsx(className, "bg-gray-100 p-4 rounded-md")}>
      <Title size="h3">{title}</Title>
      <div>
        <p>{balance.formatted} $RSS3</p>
      </div>
    </div>
  )
}
