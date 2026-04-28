import { Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarContent } from "./Sidebar";

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b bg-background/95 backdrop-blur px-6">
      <div className="flex items-center md:hidden">
        <Sheet>
          <SheetTrigger className="inline-flex items-center justify-center rounded-md h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
      
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-md hidden md:block group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search shipments, warehouses, or alerts..."
            className="w-full bg-secondary/50 pl-10 border-transparent focus-visible:ring-1 focus-visible:bg-background transition-all rounded-full h-10 shadow-none"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground rounded-full">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-destructive border-2 border-background" />
        </Button>
        <Avatar className="h-8 w-8 cursor-pointer ring-1 ring-border hover:ring-primary transition-all">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="Admin" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
