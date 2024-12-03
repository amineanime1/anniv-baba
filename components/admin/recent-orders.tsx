"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getOrders } from "@/lib/actions/orders";
import { ArrowRight } from "lucide-react";

export function RecentOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getOrders();
        setOrders(data.slice(0, 5)); // Get only the 5 most recent orders
      } catch (error) {
        console.error("Échec du chargement des commandes :", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadOrders();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Commandes récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border rounded-lg animate-pulse"
              >
                <div className="h-4 w-32 bg-muted rounded" />
                <div className="h-4 w-24 bg-muted rounded" />
              </div>
            ))}
            <p className="text-center text-muted-foreground">
              Votre panier est vide
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Commandes récentes</CardTitle>
        <Link href="/admin/orders">
          <Button variant="ghost" size="sm" className="gap-2">
            Voir tout <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 flex flex-col">
          {orders.map((order) => (
            <Link key={order.id} href={`/admin/orders?id=${order.id}`}>
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div>
                  <p className="font-medium">Commande #{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.customer_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(order.created_at), 'MMM d, yyyy')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.total_amount} DZD</p>
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}