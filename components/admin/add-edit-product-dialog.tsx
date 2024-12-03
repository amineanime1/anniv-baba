"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProduct, updateProduct } from "@/lib/actions/products";
import { toast } from "sonner";
import { ImageUpload } from "./image-upload";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  value: string;
  label: string;
}

const CATEGORIES: Category[] = [
  { value: "all", label: "Toutes les catégories" },
  { value: "indoor", label: "Plantes d'intérieur" },
  { value: "outdoor", label: "Plantes d'extérieur" },
  { value: "flowering", label: "Plantes à fleurs" },
  { value: "cacti", label: "Cactus et succulentes" },
];

interface AddEditProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: any;
  onSuccess: () => void;
}

export function AddEditProductDialog({
  open,
  onOpenChange,
  product,
  onSuccess,
}: AddEditProductDialogProps) {
  const [formData, setFormData] = useState(
    product || {
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      images: [],
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleImagesUploaded = (urls: string[]) => {
    setFormData((prev: typeof formData) => ({ ...prev, images: urls }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.price || !formData.category) {
        toast.error("Please fill in all required fields");
        return;
      }

      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock) || 0,
      };

      if (product) {
        await updateProduct(product.id, productData);
        toast.success("Product updated successfully");
      } else {
        await createProduct(productData);
        toast.success("Product created successfully");
      }
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error submitting product:", error);
      toast.error(
        error.message ||
          (product ? "Failed to update product" : "Failed to create product")
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className={cn(
          "flex-row items-center justify-between",
          isMobile && "sticky top-0 bg-background/95 backdrop-blur z-10 px-4 py-3 border-b"
        )}>
          <DialogTitle className="text-xl">
            {product ? "Modifier le produit" : "Ajouter un nouveau produit"}
          </DialogTitle>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
        <div className={cn(
            "space-y-4",
            isMobile && "px-4"
          )}>
            <div className="space-y-2">
              <Label htmlFor="name">Nom *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                 className="h-12 text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="min-h-[100px] text-base"
              />
            </div>
         
            <div className={cn(
              "grid gap-4",
              isMobile ? "grid-cols-1" : "grid-cols-2"
            )}>
              <div className="space-y-2">
                <Label htmlFor="price">Prix (DZD) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                  min="0"
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock" className="text-base">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  min="0"
                   className="h-12 text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-base">Catégorie *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                required
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value} className="text-base py-3">
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-base">Images du produit</Label>
              <ImageUpload
                onImagesUploaded={handleImagesUploaded}
                existingImages={formData.images}
              />
            </div>
          </div>

          <div className={cn(
            "flex justify-end space-x-2",
            isMobile && "sticky bottom-0 bg-background/95 backdrop-blur z-10 px-4 py-3 border-t mt-auto"
          )}>
             {!isMobile && (
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                type="button"
                className="h-12"
              >
                Annuler
              </Button>
            )}
            <Button type="submit" disabled={isLoading}   className={cn(
                "h-12 text-base",
                isMobile && "flex-1"
              )}>
              {isLoading ? "Enregistrement..." : product ? "Mettre à jour" : "Créer" }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
