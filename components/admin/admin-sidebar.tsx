"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  Settings,
  LogOut,
  Menu,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigation = [
  { name: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
  { name: "Produits", href: "/admin/products", icon: Package },
  { name: "Commandes", href: "/admin/orders", icon: ShoppingCart },
  { name: "Livraison", href: "/admin/delivery", icon: Truck },
  { name: "Paramètres", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsOpen(window.innerWidth >= 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('isAdmin');
    router.push('/admin/login');
  };


  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className={cn(
        "flex items-center h-16 px-4 border-b transition-all duration-300",
        isOpen ? "justify-between" : "justify-center"
      )}>
        {isOpen ? (
          <>
            <h1 className="text-lg font-semibold">Panneau d'administration</h1>
            <div className="flex items-center gap-2">
              {/* <ThemeToggle /> */}
              <Button
                variant="ghost"
                size="sm"
                className="p-2"
                onClick={() => setIsOpen(false)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={() => setIsOpen(true)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-2 py-2 text-sm font-medium rounded-md",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/60 hover:bg-muted"
              )}
              onClick={() => isMobile && setIsOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              {isOpen && <span className="ml-3">{item.name}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="flex-shrink-0 border-t p-4">
        <Button
          variant="ghost"
          className={cn(
            "flex items-center",
            isOpen ? "w-full" : "w-auto justify-center"
          )}
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5" />
          {isOpen && <span className="ml-3">Déconnexion</span>}
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
        <Button
    variant="ghost"
    size="icon"
    aria-label="Toggle Sidebar"
    onClick={() => setIsOpen(!isOpen)}
    className={cn(
      "fixed top-1/2 -left-1 transform -translate-y-1/2",
      "rounded-l-none rounded-r-full",
      "h-20 w-6 p-0 flex items-center justify-center",
      "bg-primary text-primary-foreground",
      "shadow-md"
    )}
  >
    <ChevronLeft
      className={cn(
        "h-4 w-4 transition-transform duration-200",
        !isOpen && "rotate-180"
      )}
    />
  </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className={cn(
      "bg-card border-r transition-all duration-300",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="h-full">
        <SidebarContent />
      </div>
    </div>
  );
}