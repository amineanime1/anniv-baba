"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

interface OrderDetailsDialogProps {
  order: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetailsDialog({ order, open, onOpenChange }: OrderDetailsDialogProps) {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order #{order.id}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Customer Information</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Name:</span> {order.customer_name}</p>
                  <p><span className="text-muted-foreground">Email:</span> {order.customer_email}</p>
                  <p><span className="text-muted-foreground">Phone:</span> {order.customer_phone}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Order Details</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-muted-foreground">Status:</span>{" "}
                    <Badge variant={
                      order.status === "delivered" ? "delivered" :
                      order.status === "cancelled" ? "cancelled" :
                      order.status === "pending" ? "pending" :
                      order.status === "processing" ? "processing" :
                      order.status === "shipped" ? "shipped" :
                      "outline"
                    }>
                      {order.status}
                    </Badge>
                  </p>
                  <p><span className="text-muted-foreground">Date:</span> {format(new Date(order.created_at), 'PPP')}</p>
                  <p><span className="text-muted-foreground">Total Amount:</span> {order.total_amount} DZD</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Delivery Information</h3>
              <div className="space-y-1 text-sm">
                <p><span className="text-muted-foreground">Wilaya:</span> {order.wilaya}</p>
                <p><span className="text-muted-foreground">Address:</span> {order.address}</p>
                <p><span className="text-muted-foreground">Delivery Fee:</span> {order.delivery_fee} DZD</p>
              </div>
            </div>

            {order.notes && (
              <div>
                <h3 className="font-semibold mb-2">Notes</h3>
                <p className="text-sm">{order.notes}</p>
              </div>
            )}

            {order.order_items && (
              <div>
                <h3 className="font-semibold mb-2">Order Items</h3>
                <div className="space-y-2">
                  {order.order_items.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{item.products.name}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <p>{item.price_at_time} DZD</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}