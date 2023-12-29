import Image from "next/image"
import Link from "next/link"

import { Button } from "@mantine/core"

const Navigation = () => {
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

  return (
    <div className="h-20 flex items-center px-8 gap-10 mx-auto max-w-[100em]">
      <Image src="/logo.svg" alt="logo" width={200} height={27} />
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="flex items-center gap-1"
        >
          {item.icon}
          {item.name}
        </Link>
      ))}
      <Button className="ml-auto">Connect</Button>
    </div>
  )
}

export default Navigation
