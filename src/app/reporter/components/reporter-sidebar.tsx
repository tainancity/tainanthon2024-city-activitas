'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, ChevronUp, LayoutDashboard, User2 } from 'lucide-react';
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
    label: '',
    children: [
      {
        title: '首頁',
        url: '/reporter',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: '年度',
    children: [
      {
        title: '113',
        url: '/reporter/1',
        icon: ChevronRight,
      },
      {
        title: '112',
        url: '/reporter/1',
        icon: ChevronRight,
      },
      {
        title: '111',
        url: '/reporter/1',
        icon: ChevronRight,
      },
    ],
  },
];

type UserData = {
  email: string;
  user_metadata?: {
    system_role?: string;
  };
};

export function ReporterSidebar() {
  const router = useRouter();

  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);

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
        {items.map((item, index) => (
          <SidebarGroup key={index}>
            {item.label && <SidebarGroupLabel>{item.label}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {item.children.map((i) => (
                  <SidebarMenuItem key={i.title}>
                    <SidebarMenuButton asChild>
                      <a href={i.url}>
                        <i.icon />
                        <span>{i.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user?.email || '使用者'}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>
                    {user?.user_metadata?.system_role === 'reporter' && (
                      <span className="text-sm text-gray-500 mt-2">
                        資產管理者
                      </span>
                    )}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      localStorage.removeItem('access_token');
                      localStorage.removeItem('user');
                      router.push('/login');
                    }
                  }}
                >
                  <span>登出</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
