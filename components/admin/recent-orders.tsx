"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((order) => (
            <div
              key={order}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <p className="font-medium">Order #{order}</p>
                <p className="text-sm text-muted-foreground">
                  Customer Name {order}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">2,500 DZD</p>
                <Badge variant="outline">Pending</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}