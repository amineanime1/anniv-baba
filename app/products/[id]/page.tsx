import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/products/product-details";
import { ProductSkeleton } from "@/components/products/product-skeleton";
import { getProductById, getProducts } from "@/lib/actions/products";

interface ProductPageProps {
  params: {
    id: string;
  };
}

// Generate static params for all products
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  let product;
  
  try {
    product = await getProductById(params.id);
  } catch (error) {
    notFound();
  }

  if (!product) {
    notFound();
  }

  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetails product={product} />
    </Suspense>
  );
}