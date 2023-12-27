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
        <Button
          variant="outline"
          className="h-8 min-h-[43px] gap-2.5 border border-solid border-primary bg-primary text-xs text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary dark:border-primary-foreground dark:bg-primary-foreground dark:text-primary dark:hover:bg-background dark:hover:text-primary-foreground lg:h-11 lg:px-4 lg:text-[13px]"
          onClick={onViewAllClick}
        >
          <div className="mr-auto translate-y-[0.15em] font-ocr-b-std font-normal uppercase lg:mr-0">
            View All
          </div>
          <div className="hidden h-2 w-[1px] origin-top-left bg-current lg:block lg:h-3"></div>
          <div className="translate-y-[0.15em] font-ocr-b-std">&gt;</div>
        </Button>
      )}
    </div>
  )
}
