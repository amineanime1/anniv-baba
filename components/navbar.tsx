"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CartSheet } from "./cart/cart-sheet";
import { ThemeToggle } from "./theme-toggle";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const router = useRouter();

  // Reset click count after 2 seconds of inactivity
  useEffect(() => {
    const timer = setTimeout(() => setClickCount(0), 2000);
    return () => clearTimeout(timer);
  }, [clickCount]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Handle keyboard shortcut (Ctrl + Shift + A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        router.push("/admin/login");
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  // Handle logo triple click
  const handleLogoClick = (e: React.MouseEvent | React.TouchEvent) => {
    setClickCount((prev) => {
      if (prev === 2) {
        router.push("/admin/login");
        return 0;
      }
      return prev + 1;
    });
  };

  const NavLinks = () => (
    <>
      <Link href="/products" className="text-foreground/80 hover:text-foreground">
        Products
      </Link>
      <Link href="/categories" className="text-foreground/80 hover:text-foreground">
        Categories
      </Link>
      <Link href="/about" className="text-foreground/80 hover:text-foreground">
        About
      </Link>
      <Link href="/contact" className="text-foreground/80 hover:text-foreground">
        Contact
      </Link>
    </>
  );

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isScrolled && "shadow-sm"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo with triple-click logic */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-playfair font-bold text-primary"
              onClick={handleLogoClick}
              onTouchStart={handleLogoClick}
            >
              Grandpa&apos;s Plant Shop
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavLinks />
            <ThemeToggle />
            <CartSheet />
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <CartSheet />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-6 mt-8">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
