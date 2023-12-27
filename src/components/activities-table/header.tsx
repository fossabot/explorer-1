import Link from "next/link"

import { Table, Tooltip } from "@mantine/core"

const ActivitiesTableHeader = () => {
  return (
    <>
      <Table.Thead className="uppercase hover:bg-transparent">
        <Table.Tr>
          <Table.Th>Activity ID</Table.Th>
          <Table.Th>
            <div className="flex flex-row items-center gap-x-3">
              <span>UMS Tag</span>
              <Tooltip
                label={
                  <div className="flex max-w-xs flex-col items-start gap-y-2 font-normal normal-case text-muted-foreground">
                    <p>
                      Open Information, indexed from multiple decentralized data
                      sources, is structured into the RSS3 Unified Metadata
                      Schemas (UMS) format for interoperability.
                    </p>

                    <p className="text-xs">
                      To learn more about the UMS, please visit{" "}
                      <Link
                        className="text-primary underline"
                        target="_blank"
                        href="https://docs.rss3.io/docs/unified-metadata-schemas"
                      >
                        here
                      </Link>
                      .
                    </p>
                  </div>
                }
              >
                <i className="i-mingcute-question-line" />
              </Tooltip>
            </div>
          </Table.Th>
          <Table.Th>Time</Table.Th>
          <Table.Th>Platform</Table.Th>
          <Table.Th>Network</Table.Th>
          <Table.Th>Owner</Table.Th>
        </Table.Tr>
      </Table.Thead>
    </>
  )
}

export default ActivitiesTableHeader
