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
import { usePathname, useRouter } from "next/navigation";
import { SidebarLogo } from "./sidebar-logo";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AreaChartIcon from "@mui/icons-material/AreaChart";
import CampaignIcon from "@mui/icons-material/Campaign";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
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
              <SpaceDashboardIcon fontSize="small" />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={pathname === "/admin/users"}
              onClick={() => router.push("/admin/users")}
            >
              <SupervisedUserCircleIcon fontSize="small" />
              <span>Users</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={pathname === "/admin/sessions"}
              onClick={() => router.push("/admin/sessions")}
            >
              <SensorOccupiedIcon fontSize="small" />
              <span>Sessions</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={pathname === "/admin/notifications"}
              onClick={() => router.push("/admin/notifications")}
            >
              <CampaignIcon fontSize="small" />
              <span>Notifications</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={pathname === "/admin/support"}
              onClick={() => router.push("/admin/support")}
            >
              <SupportAgentIcon fontSize="small" />
              <span>Support Tickets</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={pathname === "/admin/analytics"}
              onClick={() => router.push("/admin/analytics")}
            >
              <AreaChartIcon fontSize="small" />
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
