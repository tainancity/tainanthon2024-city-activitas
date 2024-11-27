'use client';

import {
  LayoutDashboard,
  Home,
  Briefcase,
  ChevronUp,
  User2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const items = [
  {
    title: '首頁',
    url: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: '閒置資產',
    url: '/admin/idle-asset-detail',
    icon: Home,
  },
  {
    title: '進行中案件',
    url: '/admin/idle-asset-detail',
    icon: Briefcase,
  },
];

export function AdminSidebar() {
  const router = useRouter();

  return (
    <Sidebar>
      <SidebarHeader>
        <span className="text-xl font-black">CityActivitas</span>
        <span className="text-sm font-bold">
          臺南市政府財政稅務局
          <br />
          閒置資產管理後台
        </span>
      </SidebarHeader>
      <SidebarContent>
        {/*<SidebarGroupLabel>*/}
        {/*  CityActivitas*/}
        {/*  <br />*/}
        {/*</SidebarGroupLabel>*/}
        {/*<SidebarGroupLabel>台南市政府財稅局閒置資產管理後台</SidebarGroupLabel>*/}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/login')}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
