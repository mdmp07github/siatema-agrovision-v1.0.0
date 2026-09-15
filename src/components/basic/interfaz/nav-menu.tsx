import React, { useState } from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/basic/interfaz/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"
import { Link } from "react-router-dom"

export interface NavSubItem {
  separator?: boolean
  icon?: React.ReactNode
  variant?: "default" | "destructive"
  title: string
  url: string
}

export interface NavMenuItem {
  opc: string
  title: string
  url: string
  icon?: React.ReactNode
  isActive?: boolean
  items?: NavSubItem[]
}

export function NavMenu({ items }: { items: NavMenuItem[] }) {
  const { isMobile } = useSidebar()

  /* const activeItem = items.find((item) => item.isActive && item.opc === "C")?.title */
  const [openItem, setOpenItem] = useState<string | null>(/* activeItem ||  */null)

  const handleSimpleLinkClick = () => {
    setOpenItem(null)
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const renderContent: Record<string, React.ReactNode> = {
            S: (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild onClick={handleSimpleLinkClick}>
                  <Link to={item.url}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ),
            C: (
              <Collapsible
                key={item.title}
                asChild
                open={openItem === item.title}
                onOpenChange={(isOpen) => {
                  setOpenItem(isOpen ? item.title : null)
                }}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon}
                      <span>{item.title}</span>
                      <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden transition-all duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link to={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ),
            L: (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild onClick={handleSimpleLinkClick}>
                  <Link to={item.url}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction
                      showOnHover
                      className="aria-expanded:bg-muted"
                    >
                      <MoreHorizontalIcon />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-fit"
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                  >
                    {item.items?.map((subItem) => (
                      <React.Fragment key={subItem.title}>
                        {subItem.separator && <DropdownMenuSeparator />}
                        <DropdownMenuItem variant={subItem.variant} onClick={handleSimpleLinkClick}>
                          {subItem.icon}
                          <span>{subItem.title}</span>
                        </DropdownMenuItem>
                      </React.Fragment>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ),
          }
          return (
            renderContent[item.opc] || (
              <React.Fragment key={item.title}>
                Opción por defecto
              </React.Fragment>
            )
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}