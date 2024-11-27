"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from "@/lib/supabase/config";
import type { Product } from "@/lib/types";

export function FeaturedProducts() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        if (!supabase) throw new Error("Could not connect to database");
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .limit(5)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error("Error loading featured products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadFeaturedProducts();
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-playfair font-bold text-center mb-12">Featured Plants</h2>
        <div className="relative">
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] px-4">
                <Card className="overflow-hidden animate-pulse">
                  <CardContent className="p-0">
                    <div className="relative h-64 bg-muted"/>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-4">
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-muted rounded w-3/4"/>
                      <div className="h-4 bg-muted rounded w-1/2"/>
                    </div>
                    <div className="h-9 w-24 bg-muted rounded"/>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-playfair font-bold text-center mb-12">Featured Plants</h2>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {products.map((product) => (
              <div key={product.id} className=" flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] px-4"
              onClick={() => window.location.href = `/products/${product.id}`}>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-64 pointer">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-4">
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-foreground/80">{product.price} DZD</p>
                    </div>
                    <Button variant="outline"
                       onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/products/${product.id}`;
                            }}>Add to Cart</Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2"
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
          onClick={scrollNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}