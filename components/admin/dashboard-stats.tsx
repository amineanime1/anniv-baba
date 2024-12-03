"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Truck, DollarSign } from "lucide-react";
import { getOrders } from "@/lib/actions/orders";
import { getProducts } from "@/lib/actions/products";
import Link from "next/link";

export function DashboardStats() {
  const [dashboardStats, setDashboardStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    pendingDeliveries: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [orders, products] = await Promise.all([
          getOrders(),
          getProducts(),
        ]);

        const pendingDeliveries = orders.filter(
          (order: any) => order.status === "pending"
        ).length;

        const revenue = orders.reduce(
          (sum: number, order: any) => sum + order.total_amount,
          0
        );

        setDashboardStats({
          totalOrders: orders.length,
          totalRevenue: revenue,
          totalProducts: products.length,
          pendingDeliveries,
        });
      } catch (error) {
        console.error("Failed to load stats:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="h-20" />
            <CardContent className="h-16" />
          </Card>
        ))}
      </div>
    );
  }

  const statsData = [
    {
      title: "Total des commandes",
      value: dashboardStats.totalOrders,
      icon: ShoppingCart,
      href: "/admin/orders",
      color: "text-blue-600",
    },
    {
      title: "Revenu total",
      value: `${dashboardStats.totalRevenue} DZD`,
      icon: DollarSign,
      href: "/admin/orders",
      color: "text-green-600",
    },
    {
      title: "Produits",
      value: dashboardStats.totalProducts,
      icon: Package,
      href: "/admin/products",
      color: "text-purple-600",
    },
    {
      title: "Livraison en attente",
      value: dashboardStats.pendingDeliveries,
      icon: Truck,
      href: "/admin/orders?status=pending",
      color: "text-orange-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat) => (
        <Link key={stat.title} href={stat.href}>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}