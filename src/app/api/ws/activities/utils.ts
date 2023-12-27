type TSocketResponse =
  | TSocketPhaseResponse
  | TSocketMessageResponse
  | TSocketDoneResponse

type TSocketMessageResponse = {
  type: "message"
  message: {
    value: {
      payload: Record<string, unknown>
    }
    offset: number
    timestamp: number
  }
}

type TSocketPhaseResponse = {
  type: "phase"
  phase: string
}

type TSocketDoneResponse = {
  type: "done"
  elapsedMs: number
  isCancelled: boolean
  messagesConsumed: number
  bytesConsumed: number
}

const sortByOffset = (
  a: TSocketMessageResponse["message"],
  b: TSocketMessageResponse["message"],
) => {
  const aTimestamp = a["offset"]
  const bTimestamp = b["offset"]
  if (aTimestamp > bTimestamp) return -1
  if (aTimestamp < bTimestamp) return 1
  return 0
}

export const getMessagesFromWebSockets = (limit = 25) => {
  return new Promise((resolve, reject) => {
    const results: TSocketMessageResponse["message"][] = []
    const url = "wss://api.explorer.rss3.io/api/topics/sakuin.feeds/messages"

    let hasError = false
    const ws = new WebSocket(url)

    ws.onopen = function open() {
      const data = {
        topicName: "sakuin.feeds",
        partitionId: -1,
        startOffset: -1,
        startTimestamp: new Date().getTime(),
        maxResults: limit,
        filterInterpreterCode: "",
      }

      ws.send(JSON.stringify(data))
    }

    ws.onmessage = function incoming(event) {
      const resp = JSON.parse(event.data) as TSocketResponse
      if (resp.type === "message") {
        results.push(resp.message)
      } else {
        // console.log(data.toString())
      }
    }

    ws.onclose = function close() {
      if (hasError) {
        reject("websocket connection closed with error.")
      } else {
        const list = results.sort(sortByOffset)
        resolve({
          list: list.map((item) => item.value.payload),
          total: list[0].offset,
          latestUpdate: list[0].timestamp,
        })
      }
    }

    ws.onerror = function error(err) {
      hasError = true
      // console.error('WebSocket error:', err)
      reject(err)
    }
  })
}
