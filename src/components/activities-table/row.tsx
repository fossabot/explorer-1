"use client"

import moment from "moment"

import HoverUserCard from "@/components/hover-user-card"
import { type Activity } from "@/lib/types"
import { formatActivityId } from "@/lib/utils"
import { Badge, Table } from "@mantine/core"

type ActivitiesTableProps = {
  activity: Activity
  innerRef: React.Ref<HTMLTableRowElement> | null
  onRowClick?: (id: string) => void
  isSDK?: boolean
}
const ActivitiesTableRow = ({
  activity,
  innerRef,
  onRowClick,
  isSDK = false,
}: ActivitiesTableProps) => {
  const platform = isSDK ? activity.platform : activity.network
  const network = isSDK ? activity.network : activity.chain
  const owner = isSDK ? activity.owner ?? activity.from : activity.from
  return (
    <Table.Tr
      className="h-20 hover:bg-zinc-100 cursor-pointer transition-colors"
      onClick={() => {
        onRowClick && onRowClick(activity.id)
      }}
      ref={innerRef}
    >
      <Table.Td>{formatActivityId(activity.id)}</Table.Td>
      <Table.Td className="space-x-2 capitalize">
        {activity.tag !== "unknown" && (
          <Badge variant="secondary">{activity.tag}</Badge>
        )}
        {activity.type !== "unknown" && (
          <Badge variant="secondary">{activity.type}</Badge>
        )}
      </Table.Td>
      <Table.Td>{moment(activity.timestamp * 1000).fromNow()}</Table.Td>
      <Table.Td className="capitalize">{platform}</Table.Td>
      <Table.Td className="capitalize">{network}</Table.Td>
      <Table.Td>
        <HoverUserCard
          account={owner}
          address={owner}
          platform={activity.platform}
        />
      </Table.Td>
    </Table.Tr>
  )
}

export default ActivitiesTableRow
