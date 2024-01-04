"use client"

import { useRouter } from "next/navigation"
import React from "react"

import { formattedNodeData } from "@/app/nodes/utils"
import HoverUserCard from "@/components/hover-user-card"
import { NODES_TABLE_HEADER_KEYS } from "@/components/nodes-table/header"
import type { Node } from "@/server/api/types"
import { Table } from "@mantine/core"

export type NodesTableProps = {
  node: Node
}

export const NodesTableRow = ({ node }: NodesTableProps) => {
  const router = useRouter()
  const goToNodeDetail = React.useCallback(
    () => router.push(`/nodes/${node.address}`),
    [router, node.address],
  )

  return (
    <Table.Tr
      onClick={goToNodeDetail}
      className="h-20 hover:bg-zinc-100 cursor-pointer transition-colors"
    >
      {NODES_TABLE_HEADER_KEYS.map((key) => {
        const displayValue = formattedNodeData(node, key)

        if (key === "address") {
          return (
            <Table.Td key={key} title={displayValue}>
              <HoverUserCard account={node.address} address={node.address} />
            </Table.Td>
          )
        } else {
          return (
            <Table.Td key={key} className="max-w-20 truncate">
              {displayValue}
            </Table.Td>
          )
        }
      })}
    </Table.Tr>
  )
}
