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
      window.open(`https://hoot.it/${value}`)
    } else {
      // TODO
      router.push(`/id/${value}`)
    }
  }

  return (
    <div className="flex w-full items-center justify-center gap-6">
      <div className="w-3/4 md:w-1/2">
        <Input
          className="w-full"
          placeholder="Search by Address, Web3 Domain, or Tx Hash..."
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          onKeyDown={(e) => {
            e.stopPropagation()
            if (e.key === "Enter") {
              handleSearch()
            }
          }}
          leftSection={<i className="i-mingcute-search-2-line" />}
          size="md"
        />
      </div>
      <Button className="w-28" onClick={handleSearch} size="md">
        Search
      </Button>
    </div>
  )
}

export default SearchBar
