"use client";

import * as React from "react";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Activity,
  BarChart3,
  LayoutDashboard,
  Users,
  Bell,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { SidebarLogo } from "./sidebar-logo";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={pathname === "/admin"}
              onClick={() => router.push("/admin")}
            >
              <LayoutDashboard />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={pathname === "/admin/users"}
              onClick={() => router.push("/admin/users")}
            >
              <Users />
              <span>Users</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={pathname === "/admin/sessions"}
              onClick={() => router.push("/admin/sessions")}
            >
              <Activity />
              <span>Sessions</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={pathname === "/admin/notifications"}
              onClick={() => router.push("/admin/notifications")}
            >
              <Bell />
              <span>Notifications</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={pathname === "/admin/analytics"}
              onClick={() => router.push("/admin/analytics")}
            >
              <BarChart3 />
              <span>Analytics</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
