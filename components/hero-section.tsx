import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-playfair text-4xl font-bold tracking-tight text-primary sm:text-6xl">
              Bring Nature Into Your Home
            </h1>
            <p className="mt-6 text-lg leading-8 text-foreground/80">
              Discover our carefully curated collection of beautiful plants and cacti.
              Transform your space with the perfect green companion.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/products">
                <Button size="lg">
                  Shop Now
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="lg">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1470058869958-2a77ade41c02?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Hero background with plants"
          fill
          className="object-cover brightness-[0.85]"
          priority
        />
      </div>
    </div>
  );
}