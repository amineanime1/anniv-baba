"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { RelatedProducts } from "./related-products";
import { format } from "date-fns";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const { addItem } = useCart();

  const formattedDate = format(new Date(product.created_at), 'MMMM dd, yyyy');

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.images[currentImage]}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImage(i => (i > 0 ? i - 1 : product.images.length - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => setCurrentImage(i => (i < product.images.length - 1 ? i + 1 : 0))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={cn(
                    "relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-lg",
                    currentImage === index && "ring-2 ring-primary"
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl font-playfair font-bold">{product.name}</h1>
            <div className="flex justify-between items-center mt-2">
              <p className="text-2xl font-semibold">{product.price} DZD</p>
              <p className="text-sm text-muted-foreground">Added on {formattedDate}</p>
            </div>
          </div>

          <div className="prose prose-sm">
            <p>{product.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Availability</h3>
              <span className={cn(
                "px-3 py-1 rounded-full text-sm",
                product.stock > 0 
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
              )}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Category</h3>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {product.category}
              </span>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full"
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </Button>
        </motion.div>
      </div>

      <RelatedProducts 
        category={product.category} 
        currentProductId={product.id.toString()} 
      />
    </div>
  );
}