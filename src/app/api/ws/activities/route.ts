import { NextResponse } from "next/server"

import { getMessagesFromWebSockets } from "./utils"

export const dynamic = "force-dynamic"

export async function GET() {
  const resp = await getMessagesFromWebSockets()
  return NextResponse.json(resp)
}
