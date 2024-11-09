import { SidebarProvider } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/app/admin/components/admin-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="p-4">
        {/*<SidebarTrigger />*/}
        {children}
      </main>
    </SidebarProvider>
  );
}
