import { m, MotionConfig } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { cn } from "@/lib/utils"
import ConnectButton from "@/lib/wagmi/components/connect-button"
import { AppShell, Burger, Group } from "@mantine/core"

import { ColorSchemeSwitch } from "../color-schema-switch"

export const headerItems = [
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

export type ShellHeaderProps = {
  navbarOpened: boolean
  toggleNavbar: () => void
}

export function ShellHeader({ navbarOpened, toggleNavbar }: ShellHeaderProps) {
  const pathname = usePathname()
  const defaultIndex = headerItems.findIndex((item) => item.href === pathname)

  const [hoverIndex, setHoverIndex] = useState(defaultIndex)

  return (
    <>
      <AppShell.Header p="xl" withBorder={false}>
        <Group wrap="nowrap" h="100%" justify="space-between">
          <Image
            src="/logo.svg"
            alt="logo"
            width={200}
            height={30}
            style={{ width: 200, height: 30 }}
          />
          <Group visibleFrom="lg">
            <Group onMouseLeave={() => setHoverIndex(defaultIndex)}>
              <MotionConfig transition={{ duration: 0.15 }}>
                {headerItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 relative px-4 py-1 text-zinc-500 transition-colors duration-150",
                      hoverIndex === index
                        ? "text-zinc-700 dark:text-zinc-200"
                        : "",
                    )}
                    onMouseEnter={() => setHoverIndex(index)}
                  >
                    {hoverIndex === index && (
                      <m.div
                        className="bg-gray-light-hover absolute left-0 right-0 top-0 bottom-0 -z-20 rounded-full"
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

          <Group gap="xs">
            <ColorSchemeSwitch />
            <ConnectButton />
            <Burger
              opened={navbarOpened}
              onClick={toggleNavbar}
              hiddenFrom="lg"
              size="sm"
            />
          </Group>
        </Group>
      </AppShell.Header>
    </>
  )
}
