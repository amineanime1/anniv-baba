"use server";

import { supabase } from "@/lib/supabase/config";
import { Database } from "@/lib/supabase/types";

type Order = Database["public"]["Tables"]["orders"]["Row"];
type OrderItem = Database["public"]["Tables"]["order_items"]["Row"];

export async function createOrder(orderData: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  wilaya: string;
  address: string;
  notes?: string;
  items: { productId: number; quantity: number; price: number }[];
  totalAmount: number;
  deliveryFee: number;
}) {
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_name: orderData.customerName,
      customer_email: orderData.customerEmail,
      customer_phone: orderData.customerPhone,
      wilaya: orderData.wilaya,
      address: orderData.address,
      notes: orderData.notes,
      total_amount: orderData.totalAmount,
      delivery_fee: orderData.deliveryFee,
    })
    .select()
    .single();

  if (orderError) throw orderError;

  const orderItems = orderData.items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    quantity: item.quantity,
    price_at_time: item.price,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw itemsError;

  return order;
}

export async function getOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateOrderStatus(orderId: number, status: string) {
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (error) throw error;
}