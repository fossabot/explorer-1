import { NextRequest, NextResponse } from "next/server"

import { Activity } from "@/lib/types"
import { dataClient } from "@rss3/js-sdk"

const sortByTimestamp = (a: Activity, b: Activity) => {
  return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const address = searchParams.get("address")
  const cursor = searchParams.get("cursor")
  if (!address)
    return NextResponse.json({
      code: 400,
      message: "address is required",
    })
  const resp = cursor
    ? await dataClient().activities(address, { cursor })
    : await dataClient().activities(address)
  return NextResponse.json({
    ...resp,
    data: resp.data.sort(sortByTimestamp),
  })
}
