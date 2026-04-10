import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Calendar,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Stethoscope,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/doctor", icon: LayoutDashboard },
  { label: "My Appointments", href: "/doctor/appointments", icon: Calendar },
];

export default function DoctorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, userProfile } = useAuth();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-border">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
            <Heart className="w-4 h-4 text-accent-foreground" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-sm text-foreground">
              NOHERIA
            </span>
            <span className="text-muted-foreground text-[10px] uppercase tracking-widest">
              Doctor Panel
            </span>
          </div>
        </Link>
      </div>

      {/* Doctor Info */}
      <div className="px-4 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
            <Stethoscope className="w-4 h-4 text-accent" />
          </div>
          <div className="min-w-0">
            <p className="text-foreground text-sm font-medium truncate">
              {userProfile?.name ?? "Doctor"}
            </p>
            <p className="text-muted-foreground text-xs capitalize">
              Physician
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1" data-ocid="doctor-nav">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === "/doctor"
              ? currentPath === "/doctor"
              : currentPath.startsWith(href);
          return (
            <Link
              key={href}
              to={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth ${
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              data-ocid={`doctor-nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-border">
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-accent hover:bg-accent/10 transition-smooth"
          data-ocid="doctor-logout-btn"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 bg-card border-r border-border flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 flex"
          role="presentation"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <aside
            className="relative w-60 bg-card border-r border-border flex flex-col"
            role="presentation"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar (mobile) */}
        <header className="md:hidden h-14 bg-card border-b border-border flex items-center px-4 gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 text-muted-foreground hover:text-foreground"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-display font-semibold text-foreground text-sm">
            Doctor Panel
          </span>
        </header>

        {/* Page Content */}
        <main
          className="flex-1 overflow-y-auto bg-background p-6"
          data-ocid="doctor-content"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
