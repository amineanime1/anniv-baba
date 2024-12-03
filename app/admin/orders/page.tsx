"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/lib/actions/orders";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { toast } from "sonner";
import { Search, Phone } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderDetailsDialog } from "@/components/admin/order-details-dialog";
import { OrderStatusSelect } from "@/components/admin/order-status-select";

const ORDER_STATUS = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  async function loadOrders() {
    try {
      const data = await getOrders();
      console.log("Fetched orders:", data); // Debug log
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  }

  function filterOrders() {
    let filtered = [...orders];

    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }

  const columns = [
    { key: "id", label: "ID de commande" },
    { key: "customer", label: "Client" },
    { key: "contact", label: "Contact" },
    { key: "total", label: "Total" },
    { key: "status", label: "Statut" },
    { key: "date", label: "Date" },
    { key: "actions", label: "Actions", className: "text-right" },
  ];

  const tableData = filteredOrders.map((order) => ({
    id: `#${order.id}`,
    customer: order.customer_name,
    contact: (
      <div className="flex items-center gap-2">
        <Phone className="h-4 w-4" />
        {order.customer_phone}
      </div>
    ),
    total: `${order.total_amount} DZD`,
    status: (
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
    ),
    date: format(new Date(order.created_at), 'MMM d, yyyy'),
    actions: (
      <OrderStatusSelect
        orderId={order.id}
        currentStatus={order.status}
        onStatusChange={loadOrders}
      />
    ),
    // Additional data for mobile view
    raw: order,
  }));

  const renderMobileCard = (item: any) => (
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">{item.id}</p>
          <p className="text-sm text-muted-foreground">{item.customer}</p>
        </div>
        {item.status}
      </div>
      <div className="flex justify-between items-center text-sm">
        <div className="text-muted-foreground">{item.date}</div>
        <div className="font-medium">{item.total}</div>
      </div>
      <div className="flex justify-end">
        {item.actions}
      </div>
    </div>
  );

    const renderDetails = (item: any) => {
    if (!item) {
      return <div>Aucun détail disponible</div>;
    }
  
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {item.raw && (
            <div>
              <h3 className="font-semibold mb-2">Informations sur le client</h3>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="text-muted-foreground">Nom:</span>{" "}
                  {item.raw.customer_name}
                </p>
                <p>
                  <span className="text-muted-foreground">Email:</span>{" "}
                  {item.raw.customer_email || "N/A"}
                </p>
                <p>
                  <span className="text-muted-foreground">Téléphone:</span>{" "}
                  {item.raw.customer_phone}
                </p>
              </div>
            </div>
          )}
          <div>
            <h3 className="font-semibold mb-2">Détails de la commande</h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-muted-foreground">Statut:</span>{" "}
                {item.status}
              </p>
              <p>
                <span className="text-muted-foreground">Date:</span> {item.date}
              </p>
              <p>
                <span className="text-muted-foreground">Total:</span> {item.total}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Informations de livraison</h3>
          <div className="space-y-1 text-sm">
            <p>
              <span className="text-muted-foreground">Wilaya:</span>{" "}
              {item.raw.wilaya}
            </p>
            <p>
              <span className="text-muted-foreground">Adresse:</span>{" "}
              {item.raw.address}
            </p>
            <p>
              <span className="text-muted-foreground">Frais de livraison:</span>{" "}
              {item.raw.delivery_fee} DZD
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Articles de la commande</h3>
          <div className="space-y-4">
            {item.raw.order_items.map((orderItem: any) => (
              <div key={orderItem.id} className="flex items-center space-x-4">
                <img
                  src={orderItem.products.images[0]}
                  alt={orderItem.products.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{orderItem.products.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Quantité: {orderItem.quantity}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Prix: {orderItem.price_at_time} DZD
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {item.raw.notes && (
          <div>
            <h3 className="font-semibold mb-2">Notes</h3>
            <p className="text-sm">{item.raw.notes}</p>
          </div>
        )}
  
        <div className="pt-4 flex justify-end">{item.actions}</div>
      </div>
    );
  };
  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Commandes</h1>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher par nom de client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            {ORDER_STATUS.map((status) => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={tableData}
        renderMobileCard={renderMobileCard}
        renderDetails={renderDetails}
      />
    </div>
  );
}