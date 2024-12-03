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
        <Label>Catégorie</Label>
        <Select
          value={filters.category}
          onValueChange={(value: string) =>
            setFilters({ ...filters, category: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Toutes les catégories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            <SelectItem value="indoor">Plantes d'intérieur</SelectItem>
            <SelectItem value="outdoor">Plantes d'extérieur</SelectItem>
            <SelectItem value="flowering">Plantes à fleurs</SelectItem>
            <SelectItem value="cacti">Cactus & Succulentes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Gamme de prix</Label>
        <Select
          value={filters.priceRange}
          onValueChange={(value: string) =>
            setFilters({ ...filters, priceRange: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Tous les prix" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les prix</SelectItem>
            <SelectItem value="0-1000">Moins de 1000 DZD</SelectItem>
            <SelectItem value="1000-2000">1000-2000 DZD</SelectItem>
            <SelectItem value="2000-3000">2000-3000 DZD</SelectItem>
            <SelectItem value="3000-plus">Plus de 3000 DZD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Disponibilité</Label>
        <Select
          value={filters.availability}
          onValueChange={(value: string) =>
            setFilters({ ...filters, availability: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Tout" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tout</SelectItem>
            <SelectItem value="in-stock">En stock</SelectItem>
            <SelectItem value="out-of-stock">Rupture de stock</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}