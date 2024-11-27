"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/api/products`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to fetch products");
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProductById(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to fetch product");
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
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

    const responseData = await res.json();

    if (!res.ok) {
      console.error("Server error creating product:", responseData);
      throw new Error(responseData.details || "Failed to create product");
    }

    return responseData;
  } catch (error: any) {
    console.error("Error in createProduct:", error);
    throw new Error(error.message || "Failed to create product");
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update product");
    }

    return res.json();
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export async function deleteProduct(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to delete product");
    }

    return res.json();
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

export async function getRelatedProducts(category: string, currentProductId: string) {
  try {
    const products = await getProducts();
    return products
      .filter((p: any) => p.category === category && p.id.toString() !== currentProductId)
      .slice(0, 3);
  } catch (error) {
    console.error("Error fetching related products:", error);
    throw error;
  }
}