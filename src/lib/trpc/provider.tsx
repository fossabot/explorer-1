"use client"

import { notFound } from "next/navigation"
import { useState } from "react"
import { HttpRequestError } from "viem"

import { showNotification } from "@mantine/notifications"
import {
  QueryCache,
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client"

import { api } from "./client"
import { getUrl, transformer } from "./shared"

const MAX_RETRIES = 3
const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404]

const config: QueryClientConfig = {
  queryCache: new QueryCache({
    onError(error) {
      if (error instanceof HttpRequestError) {
        if (error.status === 404) {
          notFound()
        }
      }
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (failureCount > MAX_RETRIES) {
          return false
        }

        if (
          error instanceof HttpRequestError &&
          HTTP_STATUS_TO_NOT_RETRY.includes(error.status ?? 0)
        ) {
          return false
        }

        return true
      },

      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      staleTime: 60 * 1000,
    },
    mutations: {
      onError(error) {
        showNotification({
          color: "red",
          title: "Error",
          message: error.message,
        })
      },
    },
  },
}

export function TrpcProvider(props: {
  children: React.ReactNode
  headers: Headers
}) {
  const [queryClient] = useState(() => new QueryClient(config))

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          headers() {
            const heads = new Map(props.headers)
            heads.set("x-trpc-source", "react")
            return Object.fromEntries(heads)
          },
          url: getUrl(),
        }),
      ],
      transformer,
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
        <ReactQueryDevtools
          buttonPosition="bottom-left"
          initialIsOpen={false}
        />
      </api.Provider>
    </QueryClientProvider>
  )
}
