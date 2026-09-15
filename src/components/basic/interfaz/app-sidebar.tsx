"use client"

import * as React from "react"

/* import { NavMain } from "@/components/basic/interfaz/nav-main"
import { NavProjects } from "@/components/basic/interfaz/nav-projects" */
/* import { NavUser } from "@/components/basic/interfaz/nav-user" */
import { TeamSwitcher } from "@/components/basic/interfaz/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/basic/interfaz/sidebar"
import { GalleryVerticalEndIcon, TerminalSquareIcon, FrameIcon, PieChartIcon, MapIcon, FolderIcon, ArrowRightIcon, Trash2Icon } from "lucide-react"
import { NavMenu } from "./nav-menu"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Mauro Miche",
      logo: (
        <GalleryVerticalEndIcon
        />
      ),
      plan: "Sistema",
    },
    /* {
      name: "Acme Corp.",
      logo: (
        <AudioLinesIcon
        />
      ),
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: (
        <TerminalIcon
        />
      ),
      plan: "Free",
    }, */
  ],
  navMain: [
    {
      opc: "S",
      title: "Dashboard",
      url: "/dashboard",
      icon: (
        <FrameIcon
        />
      ),
    },
    {
      opc: "C",
      title: "Opciones",
      url: "#",
      icon: (
        <TerminalSquareIcon />
      ),
      isActive: true,
      items: [
        {
          title: "GitHub",
          url: "/page-despliegue",
        },
        {
          title: "Table",
          url: "/page-table",
        },
        {
          title: "Card",
          url: "/page-card",
        },
      ],
    },
    {
      opc: "L",
      title: "Lista",
      url: "#",
      icon: (
        <PieChartIcon />
      ),
      items: [
        {
          title: "Opción 1",
          url: "#",
          icon: (
            <FolderIcon />
          ),
          variant: "default" as const
        },
        {
          title: "Opción 2",
          url: "#",
          icon: (
            <ArrowRightIcon />
          ), 
          variant: "default" as const
        },
        {
          separator: true,
          title: "Eliminar",
          url: "#",
          icon: (
            <Trash2Icon />
          ),
          variant: "destructive" as const
        },
      ],
    },
    {
      opc: "C",
      title: "Arreglos",
      url: "#",
      icon: (
        <TerminalSquareIcon />
      ),
      isActive: true,
      items: [
        {
          title: "Rama 1",
          url: "#",
        },
        {
          title: "Rama 2",
          url: "#",
        },
        {
          title: "Rama 3",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: (
        <FrameIcon
        />
      ),
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: (
        <PieChartIcon
        />
      ),
    },
    {
      name: "Travel",
      url: "#",
      icon: (
        <MapIcon
        />
      ),
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border border-b-olive-800 h-16.25 border-r-0 border-t-0 justify-center">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMenu items={data.navMain} />
        {/* <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter className="border border-b-olive-800 h-16.25 border-r-0 border-b-0 justify-center">
        {/* <NavUser user={data.user} /> */}
        <span>Footer Sidebar</span>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
