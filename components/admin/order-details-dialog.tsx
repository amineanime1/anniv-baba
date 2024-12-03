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
import Image from "next/image";

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
          <DialogTitle>Commande #{order.id}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Informations sur le client</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Nom:</span> {order.customer_name}</p>
                  <p><span className="text-muted-foreground">Email:</span> {order.customer_email || 'N/A'}</p>
                  <p><span className="text-muted-foreground">Téléphone:</span> {order.customer_phone}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Détails de la commande</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-muted-foreground">Statut:</span>{" "}
                    <Badge variant={
        order.status === "livré" ? "livré" :
        order.status === "annulé" ? "annulé" :
        order.status === "en_attente" ? "en_attente" :
        order.status === "en_cours" ? "en_cours" :
        order.status === "envoyé" ? "envoyé" :
        "outline"
      }>
        {order.status}
      </Badge>
                  </p>
                  <p><span className="text-muted-foreground">Date:</span> {format(new Date(order.created_at), 'PPP')}</p>
                  <p><span className="text-muted-foreground">Montant total:</span> {order.total_amount} DZD</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Informations de livraison</h3>
              <div className="space-y-1 text-sm">
                <p><span className="text-muted-foreground">Wilaya:</span> {order.wilaya}</p>
                <p><span className="text-muted-foreground">Adresse:</span> {order.address}</p>
                <p><span className="text-muted-foreground">Frais de livraison:</span> {order.delivery_fee} DZD</p>
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
                <h3 className="font-semibold mb-4">Articles de la commande</h3>
                <div className="space-y-4">
                  {order.order_items.map((item: any) => (
                    <div key={item.id} className="flex gap-4 border-b pb-4">
                      {item.products.images?.[0] && (
                        <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={item.products.images[0]}
                            alt={item.products.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium">{item.products.name}</h4>
                        <div className="mt-1 text-sm text-muted-foreground">
                          <p>Quantité: {item.quantity}</p>
                          <p>Prix au moment: {item.price_at_time} DZD</p>
                          <p>Sous-total: {item.quantity * item.price_at_time} DZD</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between items-center font-medium">
                  <span>Résumé de la commande</span>
                  <div className="text-right">
                    <p>Sous-total: {order.total_amount - order.delivery_fee} DZD</p>
                    <p>Frais de livraison: {order.delivery_fee} DZD</p>
                    <p className="text-lg mt-1">Total: {order.total_amount} DZD</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}