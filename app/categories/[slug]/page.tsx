import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/products/product-grid";

const validCategories = ["indoor", "outdoor", "flowering", "cacti"];

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return validCategories.map((slug) => ({
    slug,
  }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
  if (!validCategories.includes(params.slug)) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-playfair font-bold mb-8 capitalize">
        {params.slug.replace("-", " ")} Plants
      </h1>
      <ProductGrid 
        filters={{
          category: params.slug,
          priceRange: "all",
          availability: "all"
        }}
        sortOrder=""
      />
    </div>
  );
}