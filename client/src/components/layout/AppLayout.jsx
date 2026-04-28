import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Toaster } from "@/components/ui/sonner";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="md:pl-64 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
}
