"use client";

import { useState } from "react";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductSort } from "@/components/products/product-sort";

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    availability: "",
  });
  const [sortOrder, setSortOrder] = useState("featured");

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-playfair font-bold mb-8">Nos Plantes</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64">
          <ProductFilters filters={filters} setFilters={setFilters} />
        </aside>
        <div className="flex-1">
          <div className="mb-6">
            <ProductSort sortOrder={sortOrder} onSortChange={setSortOrder} />
          </div>
          <ProductGrid filters={filters} sortOrder={sortOrder} />
        </div>
      </div>
    </div>
  );
}