import { nodeDataKeyDisplayName } from "@/app/nodes/utils"
import { Node } from "@/server/api/types"
import { Table } from "@mantine/core"

export const NODES_TABLE_HEADER_KEYS: (keyof Node)[] = [
  "name",
  "description",
  "isPublicGood",
  "stakingPoolTokens",
  "operatingPoolTokens",
  "totalShares",
  "taxFraction",
  "address",
]

export const NodesTableHeader = () => {
  return (
    <>
      <Table.Thead>
        <Table.Tr className="h-16 whitespace-nowrap">
          {NODES_TABLE_HEADER_KEYS.map((key) => (
            <Table.Th key={key}>{nodeDataKeyDisplayName(key)}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
    </>
  )
}
