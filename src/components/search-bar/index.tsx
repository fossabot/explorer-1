"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button, Input } from "@mantine/core"
import { isAddress, isSupportedNS } from "@rss3/js-sdk"

const SearchBar = () => {
  const router = useRouter()

  const [value, setValue] = useState("")
  const handleSearch = () => {
    if (!value) return

    const isAccount = isSupportedNS(value) || isAddress(value)
    if (isAccount) {
      router.push(`/address/${value}`)
    } else {
      router.push(`/id/${value}`)
    }
  }

  return (
    <div className="flex w-full items-center justify-center gap-6">
      <div className={cn("relative w-3/4 md:w-1/2")}>
        <div
          className="group flex items-center rounded-[5px] border border-solid px-3 focus-within:border-primary"
          cmdk-input-wrapper=""
        >
          <i className="i-mingcute-search-2-fill" />
          <Input
            className="flex h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search by Address, Web3 Domain, or Tx Hash..."
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            onKeyDown={(e) => {
              e.stopPropagation()
              if (e.key === "Enter") {
                handleSearch()
              }
            }}
          />
        </div>
      </div>

      <Button
        className="h-8 min-h-[43px] w-28 gap-2.5 border border-solid border-primary bg-primary font-ocr-b-std text-xs uppercase text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary dark:border-primary-foreground dark:bg-primary-foreground dark:text-primary dark:hover:bg-background dark:hover:text-primary-foreground lg:h-11 lg:px-4 lg:text-[13px]"
        onClick={handleSearch}
      >
        <div className="translate-y-[0.15em]">Search</div>
      </Button>
    </div>
  )
}

export default SearchBar
