"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function LowStockAlert() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Low Stock Alert</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <p className="font-medium">Product {item}</p>
                <p className="text-sm text-muted-foreground">
                  Category {item}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">Stock: {item}</p>
                <Badge variant="destructive">Low Stock</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}