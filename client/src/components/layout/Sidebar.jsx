import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, Activity, Bell, Settings, Network, LogOut } from "lucide-react";

export function SidebarContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Shipments", href: "/shipments", icon: Package },
    { name: "Analytics", href: "/analytics", icon: Activity },
    { name: "Alerts", href: "/alerts", icon: Bell },
    { name: "Builder", href: "/builder", icon: Network },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const user = (() => {
    try { return JSON.parse(localStorage.getItem("chainpulse_user")); } catch { return null; }
  })();

  const handleLogout = () => {
    localStorage.removeItem("chainpulse_user");
    navigate("/");
  };

  return (
    <div className="flex h-full flex-col bg-card px-3 py-4 w-64 border-r">
      <div className="flex items-center gap-3 px-2 mb-8 mt-2">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-md">
          <Activity className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">ChainPulse</span>
      </div>

      <div className="flex-1 space-y-1.5">
        {navigation.map((item) => {
          const isActive = location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              }`}
            >
              <item.icon className={`h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* User info + Logout */}
      <div className="mt-4 border-t pt-4">
        {user && (
          <div className="px-3 mb-3">
            <div className="text-sm font-medium truncate">{user.name}</div>
            <div className="text-xs text-muted-foreground truncate">{user.email}</div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <div className="hidden md:flex h-screen fixed left-0 top-0 z-40">
      <SidebarContent />
    </div>
  );
}
