"use client"

import React from "react"

import { formattedNodeData, nodeDataKeyDisplayName } from "@/app/nodes/utils"
import { api } from "@/lib/trpc/client"
import { Node } from "@/server/api/types"
import {
  Alert,
  Anchor,
  Breadcrumbs,
  Card,
  Skeleton,
  Table,
  Title,
} from "@mantine/core"

export type NodeDetailPage = { params: { address: string } }

const KEYS: (keyof Node)[] = [
  "name",
  "description",
  "isPublicGood",
  "stakingPoolTokens",
  "operatingPoolTokens",
  "totalShares",
  "taxFraction",
  "slashedTokens",
  "address",
]

export default function NodeDetailPage({ params }: NodeDetailPage) {
  const node = api.nodes.one.useQuery({ address: params.address })
  const data = node.data?.data

  if (node.isError) {
    return (
      <Alert
        title="Error"
        color="red"
        icon={<i className="i-mingcute-alert-line" />}
      >
        {node.error?.message ??
          `Maybe the backend server did not bootstrap properly or has some errors. Please check.`}
      </Alert>
    )
  }

  return (
    <div className="mt-4 grid grid-cols-1 gap-6">
      <Breadcrumbs>
        <Anchor href="/nodes">Nodes</Anchor>
        <Anchor href={`/nodes/${params.address}`}>{params.address}</Anchor>
      </Breadcrumbs>

      <Title size="h1">Node Detail</Title>

      <Card shadow="xs" radius="lg" withBorder className="p-0">
        <Table striped>
          <Table.Tbody>
            {KEYS.map((key) => {
              return (
                <Table.Tr key={key}>
                  <Table.Td className="pl-4 py-4 text-lg">
                    {nodeDataKeyDisplayName(key)}:
                  </Table.Td>

                  <Table.Td className="pr-4 py-4">
                    {data ? (
                      renderNodeData(data, key)
                    ) : (
                      <Skeleton height="1em" width="100px" />
                    )}
                  </Table.Td>
                </Table.Tr>
              )
            })}
          </Table.Tbody>
        </Table>
      </Card>
    </div>
  )
}

function renderNodeData(node: Node, key: keyof Node) {
  if (key === "address") {
    return (
      <a
        className="text-primary-500 hover:underline"
        target="_blank"
        href={`https://hoot.it/${node.address}`}
      >
        {node.address}
      </a>
    )
  }

  return formattedNodeData(node, key)
}
