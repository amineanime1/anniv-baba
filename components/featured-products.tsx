import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    price: "2500 DZD",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Snake Plant",
    price: "1800 DZD",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Peace Lily",
    price: "2000 DZD",
    image: "https://images.unsplash.com/photo-1593691512429-7785f268b9c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export function FeaturedProducts() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-playfair font-bold text-center mb-12">Featured Plants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURED_PRODUCTS.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4">
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-foreground/80">{product.price}</p>
              </div>
              <Button variant="outline">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}