'use client'

import { type LucideIcon } from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'

export function NavMain({
  items,
  role,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    visible?: string[]
  }[]
  role: string
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Info</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          if (item.visible?.includes(role)) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title} asChild>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
