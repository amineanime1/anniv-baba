"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { updateOrderStatus, cancelOrder } from "@/lib/actions/orders";
import { toast } from "sonner";

interface OrderStatusSelectProps {
  orderId: string;
  currentStatus: string;
  onStatusChange: () => void;
}

export function OrderStatusSelect({ orderId, currentStatus, onStatusChange }: OrderStatusSelectProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === "cancelled") {
      setShowCancelDialog(true);
      return;
    }

    try {
      setIsUpdating(true);
      await updateOrderStatus(orderId, newStatus);
      toast.success("Statut de la commande mis à jour avec succès");
      onStatusChange();
    } catch (error) {
      toast.error("Échec de la mise à jour du statut de la commande");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelConfirm = async () => {
    try {
      setIsUpdating(true);
      await cancelOrder(orderId);
      toast.success("Commande annulée avec succès", {
        description: "Le stock a été retourné à l'inventaire."
      });
      onStatusChange();
    } catch (error) {
      toast.error("Échec de l'annulation de la commande");
    } finally {
      setIsUpdating(false);
      setShowCancelDialog(false);
    }
  };

  return (
    <>
      <Select
        value={currentStatus}
        onValueChange={handleStatusChange}
        disabled={isUpdating || currentStatus === "cancelled"}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="processing">Processing</SelectItem>
          <SelectItem value="shipped">Shipped</SelectItem>
          <SelectItem value="delivered">Delivered</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Annuler la commande</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir annuler cette commande ? Cette action ne peut pas être annulée et remboursera les quantités de stock à l'inventaire.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Non, garder la commande</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Oui, annuler la commande
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}