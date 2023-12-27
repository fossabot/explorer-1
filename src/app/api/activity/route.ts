import { NextRequest, NextResponse } from "next/server"
import urlMetadata from "url-metadata"

import { dataClient } from "@rss3/js-sdk"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id)
    return NextResponse.json({
      code: 400,
      message: "id is required",
    })
  const { data } = await dataClient().activity(id)
  const relatedUrls = Array.from(
    new Set(data.actions.flatMap((action) => action.related_urls)),
  )

  const urls: urlMetadata.Result[] = []
  if (relatedUrls.length > 0) {
    const relatedPromise = relatedUrls.map(async (item) => {
      if (item) {
        try {
          const metadata = await urlMetadata(item, {
            mode: "same-origin",
            includeResponseBody: true,
          })

          let favicon = (metadata as any)["favicons"]?.[0]?.href
          if (favicon.startsWith("/")) favicon = new URL(favicon, item).href

          const url = {
            url: item,
            title: metadata["og:title"] || metadata["title"],
            description: metadata["og:description"] || metadata["description"],
            image: metadata["og:image"] || favicon,
          }
          urls.push(url)
        } catch (e) {
          urls.push({ url: item, description: item })
          // console.log(`Server fetch related url error: ${item}, ${e}`)
        }
      }
    })

    try {
      await Promise.all(relatedPromise)
    } catch {
      // ignore
    }
  }

  if (urls.length > 0) {
    ;(data as any).urls = urls
  }

  return NextResponse.json(data)
}
