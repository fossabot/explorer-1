"use client"

import { Button } from "@mantine/core"

type ActivitiesHeaderProps = {
  showViewAll?: boolean
  onViewAllClick?: () => void
}
export const ActivitiesHeader = ({
  showViewAll,
  onViewAllClick,
}: ActivitiesHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <h1 className="text-2xl">Latest Open Web Activities</h1>
      {showViewAll && (
        <Button onClick={onViewAllClick}>
          <div className="flex gap-2 items-center">
            <div>View All</div>
            <div className="hidden h-2 w-[1px] origin-top-left bg-current lg:block lg:h-3"></div>
            <i className="i-mingcute-right-line" />
          </div>
        </Button>
      )}
    </div>
  )
}
