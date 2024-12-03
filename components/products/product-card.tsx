import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <Card className="overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <CardContent className="p-0">
          <div className="relative h-64">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex flex-col items-start p-4 gap-2">
        <div className="w-full flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-foreground/80">{product.price} DZD</p>
          </div>
          <Button 
            variant="outline"
            onClick={() => addItem(product)}
          >
            Ajouter au panier
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}