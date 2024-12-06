"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getOrders() {
  const res = await fetch(`${API_URL}/api/orders`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function createOrder(data: any) {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create order");
  }
  
  return res.json();
}

export async function getOrderById(id: string) {
  const res = await fetch(`${API_URL}/api/orders/${id}`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error("Failed to fetch order");
  return res.json();
}

export async function updateOrderStatus(id: string, status: string) {
  const res = await fetch(`${API_URL}/api/orders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error || "Failed to update order status");
  }
  return res.json();
}

export async function cancelOrder(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/orders/${id}/cancel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to cancel order");
    }
    
    return res.json();
  } catch (error) {
    console.error("Cancel order error:", error);
    throw error;
  }
}