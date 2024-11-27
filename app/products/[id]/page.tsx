import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/products/product-details";
import { ProductSkeleton } from "@/components/products/product-skeleton";
import { supabase } from "@/lib/supabase/config";

interface ProductPageProps {
  params: {
    id: string;
  };
}

// Generate static params for all products
export async function generateStaticParams() {
  try {
    if (!supabase) {
      console.error("Supabase client is not initialized");
      return [];
    }

    const { data: products, error } = await supabase
      .from("products")
      .select("id");

    if (error) {
      console.error("Error fetching products:", error);
      return [];
    }

    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  let product;
  
  try {
    if (!supabase) {
      console.error("Supabase client is not initialized");
      notFound();
    }

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) throw error;
    if (!data) notFound();
    
    product = data;
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }

  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetails product={product} />
    </Suspense>
  );
}