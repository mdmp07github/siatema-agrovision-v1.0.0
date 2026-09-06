/* import { ModeToggle } from "@/components/mode-toggle" */
/* import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb" */
import { Separator } from "@/components/ui/separator"
import {
  SidebarTrigger,
} from "@/components/basic/interfaz/sidebar"
import { Button } from "@/components/basic/componente/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Icons from "@/images/icons/icons"
import { Badge } from "@/components/basic/componente/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useNavigate } from "react-router-dom"

function LayoutHeader() {

  const o_navigate = useNavigate();

  const fun_on_click_inciar_sesion = () => {
    o_navigate('/signin')
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16 bg-muted/50">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-8"
          />
          {/* <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}
        </div>
        <div className="flex gap-2 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>MM</AvatarFallback>
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 mx-3">
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>MM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold leading-none">Mauro Miche</p>
                    <a href="https://ui.shadcn.com/docs/components" className="text-blue-400 hover:underline text-sm">@outlook.com</a>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="font-semibold leading-none">Plan: </span>
                  <Badge variant="green">
                    FREE
                  </Badge>
                </div>
              </div>

              <div className="text-sm mt-3">
                <p>Desarrollador full-stack 🎉</p>
                <ul className="ml-6 list-disc [&>li]:mt-1">
                  <li><span className="underline">Front-End:</span> React, NextJS</li>
                  <li><span className="underline">Back-End:</span> NestJs, PostgreSQL</li>
                </ul>
              </div>
              <div className="mt-3 text-sm space-y-1">
                <p>📍 Jr. Lucanas 171 José Gálvez, VMT</p>
                <p>🔗 <a href="https://ui.shadcn.com/docs/components" className="text-blue-400 hover:underline">ui.shadcn.com</a></p>
                <p>💼 Abierta a freelance y colaboraciones.</p>
              </div>
              <Separator className="my-2" />
              <div className="flex gap-2">
                <Button variant="orange" className="flex-1 flex">
                  <Icons icon="user1" />
                  <span>Perfil</span>
                </Button>
                <Button variant="blue" className="flex-1 flex">
                  <Icons icon="setting1" />
                  <span>Ajustes</span>
                </Button>
              </div>
              <Button variant="red" className="w-full mt-2" onClick={() => fun_on_click_inciar_sesion()}>
                <Icons icon="logout" />
                <span>Cerrar Sesión</span>
              </Button>
            </PopoverContent>
          </Popover>
          {/* <ModeToggle /> */}
        </div>
      </header>
    </>
  )
}

export default LayoutHeader