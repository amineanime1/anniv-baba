"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getDeliveryFees() {
  const res = await fetch(`${API_URL}/api/delivery-fees`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error("Failed to fetch delivery fees");
  return res.json();
}

export async function getDeliveryFee(wilaya: string) {
  try {
    const fees = await getDeliveryFees();
    const fee = fees.find((f: any) => f.wilaya === wilaya);
    return fee ? fee.fee : null;
  } catch (error) {
    console.error("Error fetching delivery fee:", error);
    throw new Error("Failed to fetch delivery fee");
  }
}

export async function createDeliveryFee(data: any) {
  const res = await fetch(`${API_URL}/api/delivery-fees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create delivery fee");
  return res.json();
}