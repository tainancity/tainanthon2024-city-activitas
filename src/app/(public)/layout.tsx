import { SidebarProvider } from '@/components/ui/sidebar';
import { PublicSidebar } from '@/app/(public)/components/public-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <PublicSidebar />
      <main className="p-4 w-screen h-screen">{children}</main>
    </SidebarProvider>
  );
}
