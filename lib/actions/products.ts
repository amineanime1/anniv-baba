"use server";

import { supabase } from "@/lib/supabase/config";
import { Database } from "@/lib/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];

export async function getProducts() {
  if (!supabase) throw new Error("Supabase client is not initialized");

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error.message);
      throw error;
    }
  return data as Product[];
}

export async function createProduct(product: Omit<Product, "id" | "created_at" | "updated_at">) {
  if (!supabase) throw new Error("Supabase client is not initialized");

  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();

    if (error) {
      console.error("Error creating product:", error.message);
      throw error;
    }
  return data;
}

export async function updateProduct(id: number, product: Partial<Product>) {
  if (!supabase) throw new Error("Supabase client is not initialized");
  
  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProduct(id: number) {
  if (!supabase) throw new Error("Supabase client is not initialized");
  
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
export async function getProductById(id: string) {
  if (!supabase) throw new Error("Supabase client is not initialized");

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Product;
}

export async function getRelatedProducts(category: string, currentProductId: string) {
  if (!supabase) throw new Error("Supabase client is not initialized");
  
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .neq("id", currentProductId)
    .limit(3);

  if (error) throw error;
  return data as Product[];
}