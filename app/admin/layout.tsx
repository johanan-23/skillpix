"use client";
import type React from "react";
import { AuthWrapper } from "./components/auth-wrapper";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { AppSidebar } from "./components/app-sidebar";
import { AdminSearch } from "./components/admin-search";
import { NotificationDropdown } from "./components/notification-dropdown";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pageName = pathname?.split("/").filter(Boolean).pop() || "Dashboard";
  return (
    <AuthWrapper>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset>
          <header className="flex mt-1 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4 w-full">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Admin</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {pageName === "admin"
                        ? "Dashboard"
                        : pageName.charAt(0).toUpperCase() + pageName.slice(1)}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              {/* Search Component */}
              <div className="flex-1 flex justify-center w-full mx-4">
                <AdminSearch />
              </div>

              <div className="flex items-center gap-2">
                <ThemeToggle className="rounded-full" />
                <NotificationDropdown />
              </div>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 rounded-xl bg-muted m-4">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthWrapper>
  );
}
