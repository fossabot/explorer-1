import { NextResponse } from "next/server"

import { getMessagesFromWebSockets } from "../utils"

export const dynamic = "force-dynamic"

export async function GET() {
  const resp = await getMessagesFromWebSockets(500)
  return NextResponse.json(resp)
}
