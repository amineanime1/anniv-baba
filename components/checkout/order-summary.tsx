"use client";

import { useCart } from "@/contexts/cart-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export function OrderSummary() {
  const { items, subtotal, deliveryFee, total } = useCart();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-md">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.quantity} × {item.price} DZD
                </p>
              </div>
              <p className="font-medium">{item.quantity * item.price} DZD</p>
            </div>
          ))}

          <Separator className="my-4" />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Sous-total</span>
              <span>{subtotal} DZD</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Frais de livraison</span>
              <span>{deliveryFee} DZD</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{total} DZD</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}