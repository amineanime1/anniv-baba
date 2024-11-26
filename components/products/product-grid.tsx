"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/products/product-card";
import { Product } from "@/lib/types";
import { getProducts } from "@/lib/actions/products";

interface ProductGridProps {
  filters: {
    category: string;
    priceRange: string;
    availability: string;
  };
}

export function ProductGrid({ filters }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    if (filters.category && filters.category !== "all" && product.category !== filters.category) return false;
    if (filters.availability && filters.availability !== "all") {
      const isInStock = product.stock > 0;
      if (filters.availability === "in-stock" && !isInStock) return false;
      if (filters.availability === "out-of-stock" && isInStock) return false;
    }
    if (filters.priceRange && filters.priceRange !== "all") {
      if (filters.priceRange === "3000-plus") {
        if (product.price <= 3000) return false;
      } else {
        const [min, max] = filters.priceRange.split("-").map(Number);
        if (product.price < min || product.price > max) return false;
      }
    }
    return true;
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}