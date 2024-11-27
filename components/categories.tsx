import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const CATEGORIES = [
  {
    id: 1,
    name: "Indoor Plants",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    href: "/categories/indoor",
  },
  {
    id: 2,
    name: "Cacti & Succulents",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    href: "/categories/cacti",
  },
  {
    id: 3,
    name: "Flowering Plants",
    image: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    href: "/categories/flowering",
  },
  {
    id: 4,
    name: "Outdoor Plants",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        href: "/categories/outdoor",
  },
];

export function Categories() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-playfair font-bold tex</div>t-center mb-12">Shop by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES.map((category) => (
          <Link key={category.id} href={category.href}>
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-0">
                <div className="relative h-64">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-all duration-300 hover:bg-black/20">
                    <h3 className="text-white text-2xl font-semibold">{category.name}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}