import { SidebarProvider } from '@/components/ui/sidebar';
import { ReporterSidebar } from '@/app/reporter/components/reporter-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ReporterSidebar />
      <main className="bg-gray-100" style={{ minWidth: 'calc(100% - 256px)' }}>
        {/*<SidebarTrigger />*/}
        {children}
      </main>
    </SidebarProvider>
  );
}
