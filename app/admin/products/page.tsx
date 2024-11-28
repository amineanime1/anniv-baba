"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getProducts, deleteProduct } from "@/lib/actions/products";
import { AddEditProductDialog } from "@/components/admin/add-edit-product-dialog";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import Image from "next/image";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  const columns = [
    { key: "name", label: "Name" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price" },
    { key: "stock", label: "Stock" },
    { key: "actions", label: "Actions", className: "text-right" },
  ];

  const tableData = products.map((product: any) => ({
    ...product,
    price: `${product.price} DZD`,
    actions: (
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => {
          setSelectedProduct(product);
          setIsDialogOpen(true);
        }}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  }));

  const renderMobileCard = (item: any) => (
    <div className="space-y-3">
      <div className="flex gap-4">
        {item.images?.[0] && (
          <div className="relative h-16 w-16 rounded-md overflow-hidden">
            <Image
              src={item.images[0]}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-sm text-muted-foreground">{item.category}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm font-medium">{item.price}</span>
            <span className="text-sm text-muted-foreground">Stock: {item.stock}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        {item.actions}
      </div>
    </div>
  );

  const renderDetails = (item: any) => {
    if (!item) {
      return <div>No details available</div>;
    }
    return (
    <div className="space-y-4">
      {item.images?.[0] && (
        <div className="relative h-48 rounded-lg overflow-hidden">
          <Image
            src={item.images[0]}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="grid gap-2">
        <div>
          <span className="font-medium">Name:</span> {item.name}
        </div>
        <div>
          <span className="font-medium">Category:</span> {item.category}
        </div>
        <div>
          <span className="font-medium">Price:</span> {item.price}
        </div>
        <div>
          <span className="font-medium">Stock:</span> {item.stock}
        </div>
        {item.description && (
          <div>
            <span className="font-medium">Description:</span>
            <p className="mt-1 text-muted-foreground">{item.description}</p>
          </div>
        )}
      </div>
      <div className="flex justify-end gap-2 pt-4">
        {item.actions}
      </div>
    </div>
  );
}

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={() => {
          setSelectedProduct(null);
          setIsDialogOpen(true);
        }}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={tableData}
        renderMobileCard={renderMobileCard}
        renderDetails={renderDetails}
      />

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