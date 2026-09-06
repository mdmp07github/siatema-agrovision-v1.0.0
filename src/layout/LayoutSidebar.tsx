import { AppSidebar } from "@/components/basic/interfaz/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/basic/interfaz/sidebar"
import LayoutHeader from "./LayoutHeader"
import LayoutFooter from "./LayoutFooter"
import { Outlet } from "react-router-dom"

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0 overflow-x-hidden">
        <div className="flex flex-col h-screen">
          <LayoutHeader />
          <main className="flex-1 p-0 bg-background overflow-hidden border border-b-olive-800 border-l-0">
            <div className="bg-muted/50 w-full h-full p-4 flex flex-col overflow-hidden">
              <div className="flex flex-col justify-start items-start ml-1 mt-1 min-w-0 scroll-shadcn">
                <Outlet />
              </div>
            </div>
          </main>
          <LayoutFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}