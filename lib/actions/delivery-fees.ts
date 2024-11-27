"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
console.log("API_URL:", API_URL);

export async function getDeliveryFees() {
  const res = await fetch(`${API_URL}/api/delivery-fees`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error("Failed to fetch delivery fees");
  return res.json();
}

export async function getDeliveryFee(wilaya: string) {
  const fees = await getDeliveryFees();
  const fee = fees.find((f: any) => f.wilaya === wilaya);
  return fee ? fee.fee : null;
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