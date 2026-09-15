import React, { useState, useEffect } from "react"
import { useLocation, Link, useNavigate } from "react-router-dom"
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

export interface NavSubItem {
  separator?: boolean
  icon?: React.ReactNode
  variant?: "default" | "destructive"
  title: string
  url: string
  activeItem?: boolean
}

export interface NavMenuItem {
  opc: string
  title: string
  url: string
  icon?: React.ReactNode
  isActive?: boolean
  activeItem?: boolean
  items?: NavSubItem[]
}

export function NavMenu({ items }: { items: NavMenuItem[] }) {
  const { isMobile } = useSidebar()
  const location = useLocation()
  const navigate = useNavigate()

  const [openItem, setOpenItem] = useState<string | null>(null)

  // 1. Redirección automática si estamos en la raíz ("/") hacia el ítem con activeItem: true
  useEffect(() => {
    if (location.pathname === "/") {
      let targetUrl: string | null = null

      for (const item of items) {
        if (item.activeItem) {
          targetUrl = item.url
          break
        }
        const activeSub = item.items?.find((sub) => sub.activeItem)
        if (activeSub) {
          targetUrl = activeSub.url
          break
        }
      }

      if (targetUrl) {
        navigate(targetUrl, { replace: true })
      }
    }
  }, [location.pathname, items, navigate])

  // 2. Mantener abierto el Collapsible padre si una de sus sub-opciones es la ruta actual
  useEffect(() => {
    const activeParent = items.find(
      (item) => item.opc === "C" && item.items?.some((sub) => sub.url === location.pathname)
    )
    if (activeParent) {
      setOpenItem(activeParent.title)
    }
  }, [location.pathname, items])

  const handleSimpleLinkClick = () => {
    setOpenItem(null)
  }

  return (
    <SidebarGroup className="flex flex-col gap-1">
      <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
      <SidebarMenu className="flex flex-col gap-1">
        {items.map((item) => {
          const isItemActive = location.pathname === item.url
          const renderContent: Record<string, React.ReactNode> = {
            S: (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isItemActive}
                  onClick={handleSimpleLinkClick}
                >
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
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={item.items?.some(sub => location.pathname === sub.url)}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                      <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden transition-all duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <SidebarMenuSub className="mt-0.5">
                      {item.items?.map((subItem) => {
                        const isSubActive = location.pathname === subItem.url
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isSubActive}
                            >
                              <Link to={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ),
            L: (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isItemActive}
                  onClick={handleSimpleLinkClick}
                >
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