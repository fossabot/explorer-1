import Link from "next/link"

import { Popover, Table } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

const ActivitiesTableHeader = () => {
  const [opened, { close, open }] = useDisclosure(false)

  return (
    <>
      <Table.Thead>
        <Table.Tr className="h-16">
          <Table.Th>Activity ID</Table.Th>
          <Table.Th onMouseLeave={close}>
            <div className="flex flex-row items-center gap-x-3">
              <span>UMS Tag</span>
              <Popover opened={opened}>
                <Popover.Target>
                  <i onMouseEnter={open} className="i-mingcute-question-line" />
                </Popover.Target>
                <Popover.Dropdown>
                  <div className="flex max-w-xs flex-col gap-y-2 text-sm">
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
                </Popover.Dropdown>
              </Popover>
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
