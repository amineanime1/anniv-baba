"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getProducts() {
  const res = await fetch(`${API_URL}/api/products`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProductById(id: string) {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function createProduct(data: any) {
  try {
    const res = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error creating product:", errorData);
      throw new Error("Failed to create product");
    }
    return res.json();
  } catch (error) {
    console.error("Error in createProduct:", error);
    throw error;
  }
}

export async function updateProduct(id: string, data: any) {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}

export async function deleteProduct(id: string) {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
}

export async function getRelatedProducts(category: string, currentProductId: string) {
  const products = await getProducts();
  return products
    .filter((p: any) => p.category === category && p.id.toString() !== currentProductId)
    .slice(0, 3);
}