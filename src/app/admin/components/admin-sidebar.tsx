'use client';

import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Home,
  Briefcase,
  CheckSquare,
  Building,
  FileText,
  Atom,
  CircleDot,
  ChartSpline,
  PencilRuler,
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
    label: '',
    children: [
      {
        title: '首頁',
        url: '/admin',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: '資產管理',
    children: [
      {
        title: '閒置資產',
        url: '/admin/idle-asset-detail',
        icon: Home,
      },
      {
        title: '已活化資產',
        url: '/admin/activated-assets-detail',
        icon: CheckSquare,
      },
      {
        title: '機關年度提報',
        url: '/admin/report-asset',
        icon: Building,
      },
    ],
  },
  {
    label: '案件管理',
    children: [
      {
        title: '進行中案件',
        url: '/admin/in-progress-cases-detail',
        icon: Briefcase,
      },
      {
        title: '案件進度看板',
        url: '/admin/tasks',
        icon: CircleDot,
      },
    ],
  },
  {
    label: '需求管理',
    children: [
      {
        title: '申請資產需求',
        url: '/admin/request-asset',
        icon: FileText,
      },
    ],
  },
  {
    label: '成果管理',
    children: [
      {
        title: '活化成果圖表一覽',
        url: '/admin/generator',
        icon: ChartSpline,
      },
      {
        title: '媒合成果編輯器',
        url: '/admin/achievement-editor',
        icon: PencilRuler,
      },
    ],
  },
  {
    label: '消息管理',
    children: [
      {
        title: '最新消息編輯器',
        url: '/admin/news-editor',
        icon: PencilRuler,
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

export function AdminSidebar() {
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
                    {user?.user_metadata?.system_role === 'admin' && (
                      <span className="text-sm text-gray-500 mt-2">管理者</span>
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
