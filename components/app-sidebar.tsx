'use client'

import * as React from 'react'
import { BookOpen, Bot, SquareTerminal } from 'lucide-react'

import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import Image from 'next/image'
import { role } from '@/lib/settings'

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Insurance Claims',
      url: '/insurance',
      icon: SquareTerminal,
      isActive: true,
      visible: ['admin', 'agent'],
    },
    {
      title: 'Agents',
      url: '/admin/agent-control',
      icon: Bot,
      visible: ['admin'],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      visible: ['admin'],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link href={`/${role}`}>
                <Image
                  src='/next.svg'
                  width={50}
                  height={50}
                  alt='logo'
                  className='dark:invert'
                />
                <span className='font-medium text-xl font-sans'>
                  Policy 360
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator className='w-full' />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
