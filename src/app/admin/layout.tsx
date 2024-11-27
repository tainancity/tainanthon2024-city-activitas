import { SidebarProvider } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/app/admin/components/admin-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="bg-gray-100" style={{ minWidth: 'calc(100% - 256px)' }}>
        {/*<SidebarTrigger />*/}
        {children}
      </main>
    </SidebarProvider>
  );
}
