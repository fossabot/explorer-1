"use client"

import moment from "moment"
import { useRouter } from "next/navigation"

import {
  ActivitiesTable,
  ActivitiesTableBody,
  ActivitiesTableHeader,
  ActivitiesTableRow,
} from "@/components/activities-table"
import { ActivitiesEmpty } from "@/components/activities/empty"
import { ActivitiesHeader } from "@/components/activities/header"
import { Alert, Card, Skeleton, Tooltip } from "@mantine/core"
import { type Activity as RActivity } from "@rss3/js-sdk"
import { useQuery } from "@tanstack/react-query"

type Activity = RActivity & {
  chain?: string
}

const Activities = () => {
  const router = useRouter()
  const { data, isFetching, isError } = useQuery<{
    list: Activity[]
    total: number
    latestUpdate: number
  }>({
    queryKey: ["GET_ACTIVITIES"],
    queryFn: () => fetch("/api/ws/activities").then((res) => res.json()),
  })

  if (isError) {
    return (
      <Alert title="Error" icon={<i className="i-mingcute-alert-line" />}>
        <i className="i-mingcute-warning-line" />
        Maybe the backend server did not bootstrap properly or has some errors.
        Please check.
      </Alert>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <div className="flex flex-row items-center justify-center space-y-0 pb-2">
            <div className="flex flex-wrap items-center gap-x-2 text-xl font-medium uppercase text-muted-foreground">
              <div>Open Web Activities</div>
              <Tooltip label="Total number of open web activities covered by RSS3 API.">
                <i className="i-mingcute-information-line" />
              </Tooltip>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            {isFetching ? (
              <Skeleton className="h-8 w-80" />
            ) : (
              <div className="text-2xl font-bold">
                {(data?.total ?? 0)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
            )}
          </div>
        </Card>

        <Card>
          <div className="flex flex-row items-center justify-center space-y-0 pb-2">
            <div className="text-xl font-medium uppercase text-muted-foreground">
              Last Indexed
            </div>
          </div>
          <div className="flex flex-row items-center justify-center">
            {isFetching ? (
              <Skeleton className="h-8 w-80" />
            ) : (
              <div className="text-2xl font-bold">
                {moment(data?.latestUpdate).fromNow()}
              </div>
            )}
          </div>
        </Card>
      </div>
      {/* Open web activities  */}
      <div>
        <ActivitiesHeader
          showViewAll
          onViewAllClick={() => {
            router.push("/all")
          }}
        />
        <ActivitiesTable className="min-w-full table-auto border-separate border-spacing-y-3">
          <ActivitiesTableHeader />
          <ActivitiesTableBody>
            {!isFetching &&
              data?.list &&
              data.list.length > 0 &&
              data.list.map((activity) => (
                <ActivitiesTableRow
                  innerRef={null}
                  key={`activities-${activity.id}`}
                  activity={activity}
                  onRowClick={(id) => {
                    router.push(`/id/${id}`)
                  }}
                />
              ))}
            {data && data.list.length === 0 && <ActivitiesEmpty />}
          </ActivitiesTableBody>
        </ActivitiesTable>
      </div>
    </div>
  )
}

export default Activities
