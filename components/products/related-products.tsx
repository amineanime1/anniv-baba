"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { ProductCard } from "./product-card";
import { getRelatedProducts } from "@/lib/actions/products";

interface RelatedProductsProps {
  category: string;
  currentProductId: string;
}

export function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRelatedProducts() {
      try {
        const data = await getRelatedProducts(category, currentProductId);
        setProducts(data);
      } catch (error) {
        console.error("Failed to load related products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadRelatedProducts();
  }, [category, currentProductId]);

  if (isLoading || products.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-playfair font-bold mb-8">Related Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}