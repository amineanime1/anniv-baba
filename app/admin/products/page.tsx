"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getProducts, deleteProduct } from "@/lib/actions/products";
import { AddEditProductDialog } from "@/components/admin/add-edit-product-dialog";
import { toast } from "sonner";
import { Product } from "@/lib/types"; // Import the Product type

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id.toString());
        toast.success("Product deleted successfully");
        loadProducts();
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  }

  function handleEdit(product: Product) {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  }

  function handleAdd() {
    setSelectedProduct(null);
    setIsDialogOpen(true);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="rounded-md border">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Category</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Price</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Stock</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{product.price} DZD</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddEditProductDialog 
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        product={selectedProduct}
        onSuccess={() => {
          loadProducts();
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
}