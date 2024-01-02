"use client"

import { m, MotionConfig } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { cn } from "@/lib/utils"
import ConnectButton from "@/lib/wagmi/components/connect-button"
import { AppShell, Group } from "@mantine/core"

export function ShellHeader() {
  const pathname = usePathname()

  const items = [
    {
      name: "Home",
      href: "/",
      icon: <i className="i-mingcute-home-1-line" />,
    },
    {
      name: "Nodes",
      href: "/nodes",
      icon: <i className="i-mingcute-cube-3d-line" />,
    },
    {
      name: "Activities",
      href: "/activities",
      icon: <i className="i-mingcute-list-search-line" />,
    },
    {
      name: "Epochs",
      href: "/epochs",
      icon: <i className="i-mingcute-history-2-line" />,
    },
    {
      name: "Bridge",
      href: "/bridge",
      icon: <i className="i-mingcute-bridge-line" />,
    },
  ]
  const defaultIndex = items.findIndex((item) => item.href === pathname)

  const [hoverIndex, setHoverIndex] = useState(defaultIndex)

  return (
    <AppShell.Header p="xl" bg="#fff">
      <Group wrap="nowrap" h="100%" justify="space-between">
        <Group>
          <img src="/logo.svg" alt="logo" width={200} height={27} />
          <Group onMouseLeave={() => setHoverIndex(defaultIndex)}>
            <MotionConfig transition={{ duration: 0.15 }}>
              {items.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 relative px-4 py-1 text-zinc-500 transition-colors duration-150",
                    hoverIndex === index ? "text-zinc-700" : "",
                  )}
                  onMouseEnter={() => setHoverIndex(index)}
                >
                  {hoverIndex === index && (
                    <m.div
                      className="bg-zinc-100 absolute left-0 right-0 top-0 bottom-0 -z-20 rounded-full"
                      layoutId="nav-hover-background"
                    />
                  )}
                  <span className="flex items-center">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </MotionConfig>
          </Group>
        </Group>
        <ConnectButton />
      </Group>
    </AppShell.Header>
  )
}
