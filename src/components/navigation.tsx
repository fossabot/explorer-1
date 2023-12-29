"use client"

import { motion, MotionConfig } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@mantine/core"

const Navigation = () => {
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
    <div className="h-20 flex items-center px-8 gap-10 mx-auto max-w-[100em]">
      <Image src="/logo.svg" alt="logo" width={200} height={27} />
      <div
        className="h-20 flex items-center"
        onMouseLeave={() => setHoverIndex(defaultIndex)}
      >
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
                <motion.div
                  className="bg-zinc-100 absolute left-0 right-0 top-0 bottom-0 -z-20 rounded-full"
                  layoutId="nav-hover-background"
                />
              )}
              <span className="flex items-center">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </MotionConfig>
      </div>
      <Button className="ml-auto">Connect</Button>
    </div>
  )
}

export default Navigation
