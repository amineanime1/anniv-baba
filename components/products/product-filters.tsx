"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltersProps {
  filters: {
    category: string;
    priceRange: string;
    availability: string;
  };
  setFilters: (filters: any) => void;
}

export function ProductFilters({ filters, setFilters }: FiltersProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label>Category</Label>
        <Select
          value={filters.category}
          onValueChange={(value) =>
            setFilters({ ...filters, category: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All categories</SelectItem>
            <SelectItem value="indoor">Indoor Plants</SelectItem>
            <SelectItem value="outdoor">Outdoor Plants</SelectItem>
            <SelectItem value="flowering">Flowering Plants</SelectItem>
            <SelectItem value="cacti">Cacti & Succulents</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Price Range</Label>
        <Select
          value={filters.priceRange}
          onValueChange={(value) =>
            setFilters({ ...filters, priceRange: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All prices" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All prices</SelectItem>
            <SelectItem value="0-1000">Under 1000 DZD</SelectItem>
            <SelectItem value="1000-2000">1000-2000 DZD</SelectItem>
            <SelectItem value="2000-3000">2000-3000 DZD</SelectItem>
            <SelectItem value="3000-999999">Over 3000 DZD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Availability</Label>
        <Select
          value={filters.availability}
          onValueChange={(value) =>
            setFilters({ ...filters, availability: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="in-stock">In Stock</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}