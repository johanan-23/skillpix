"use client";

import * as React from "react";
import Image from "next/image";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function SidebarLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
            <Image
              src="/logo/skillpix-logo-white.svg"
              alt="Skillpix Logo"
              width={32}
              height={32}
              className="rounded-full dark:block hidden"
            />
            <Image
              src="/logo/skillpix-logo-black.svg"
              alt="Skillpix Logo"
              width={32}
              height={32}
              className="rounded-full dark:hidden block"
            />
            <p className="text-sm font-semibold">Admin Dashboard</p>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
