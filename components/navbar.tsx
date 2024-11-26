"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CartSheet } from "./cart/cart-sheet";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-playfair font-bold text-primary">
              Grandpa&apos;s Plant Shop
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
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
            <ThemeToggle />
            <CartSheet />
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex md:hidden">
            <ThemeToggle />
            <CartSheet />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="ml-2"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            "md:hidden",
            isOpen ? "block" : "hidden"
          )}
        >
          <div className="space-y-1 pb-3 pt-2">
            <Link
              href="/products"
              className="block px-3 py-2 text-foreground/80 hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="block px-3 py-2 text-foreground/80 hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-foreground/80 hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-foreground/80 hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}