"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/products/product-card";
import { getProducts } from "@/app/api/products";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
}

interface ProductGridProps {
  filters: {
    category: string;
    priceRange: string;
    availability: string;
  };
}

export function ProductGrid({ filters }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const data = await getProducts(); // Fetch all products
        const filteredProducts = data.filter((product) => {
          // Category filter
          if (filters.category && filters.category !== "all" && product.category !== filters.category) {
            return false;
          }

          // Availability filter
          if (
            filters.availability &&
            filters.availability !== "all" &&
            (filters.availability === "in-stock" ? product.stock <= 0 : product.stock > 0)
          ) {
            return false;
          }

          // Price range filter
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

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [filters]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (products.length === 0) {
    return <p>No products match the selected filters.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
