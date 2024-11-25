"use client";

import { ProductCard } from "@/components/products/product-card";

const PRODUCTS = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    price: 2500,
    category: "indoor",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b",
    availability: "in-stock",
  },
  {
    id: 2,
    name: "Snake Plant",
    price: 1800,
    category: "indoor",
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355",
    availability: "in-stock",
  },
  {
    id: 3,
    name: "Peace Lily",
    price: 2000,
    category: "flowering",
    image: "https://images.unsplash.com/photo-1593691512429-7785f268b9c6",
    availability: "in-stock",
  },
  // Add more products here
];

interface ProductGridProps {
  filters: {
    category: string;
    priceRange: string;
    availability: string;
  };
}

export function ProductGrid({ filters }: ProductGridProps) {
  const filteredProducts = PRODUCTS.filter((product) => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.availability && product.availability !== filters.availability)
      return false;
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      if (product.price < min || product.price > max) return false;
    }
    return true;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}