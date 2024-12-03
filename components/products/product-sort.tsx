"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductSortProps {
  sortOrder: string;
  onSortChange: (value: string) => void;
}

export function ProductSort({ sortOrder, onSortChange }: ProductSortProps) {
  return (
    <div className="flex justify-end">
      <Select value={sortOrder} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Trier par" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">En Vedette</SelectItem>
          <SelectItem value="price-asc">Prix: Croissant</SelectItem>
          <SelectItem value="price-desc">Prix: Décroissant</SelectItem>
          <SelectItem value="newest">Les Plus Récents</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}