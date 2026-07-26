import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { MainContent } from "@/components/dashboard/MainContent";
import { TopBar } from "@/components/dashboard/TopBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardPage() {
  return (
    <SidebarProvider className="h-screen flex-col">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <SidebarInset>
          <MainContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
