"use server";

import { supabase } from "@/lib/supabase/config";
import { Database } from "@/lib/supabase/types";

type DeliveryFee = Database["public"]["Tables"]["delivery_fees"]["Row"];

export async function getDeliveryFee(wilaya: string) {
  const { data, error } = await supabase
    .from("delivery_fees")
    .select("fee")
    .eq("wilaya", wilaya)
    .single();

  if (error) throw error;
  return data.fee;
}

export async function getAllDeliveryFees() {
  const { data, error } = await supabase
    .from("delivery_fees")
    .select("*")
    .order("wilaya", { ascending: true });

  if (error) throw error;
  return data as DeliveryFee[];
}