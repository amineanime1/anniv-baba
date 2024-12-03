"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WILAYAS } from "@/lib/constants";
import { getDeliveryFees, createDeliveryFee, updateDeliveryFee } from "@/lib/actions/delivery-fees";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-table";

export default function DeliveryPage() {
  const [fees, setFees] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    loadDeliveryFees();
  }, []);

  async function loadDeliveryFees() {
    try {
      const data = await getDeliveryFees();
      setFees(data);
    } catch (error) {
      toast.error("Échec du chargement des frais de livraison");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave(wilaya: string) {
    try {
      if (editingId) {
        await updateDeliveryFee(wilaya, parseInt(editValue));
      } else {
        await createDeliveryFee({
          wilaya,
          fee: parseInt(editValue),
        });
      }
      toast.success("Frais de livraison mis à jour");
      loadDeliveryFees();
      setEditingId(null);
    } catch (error) {
      toast.error("Échec de la mise à jour des frais de livraison");
    }
  }

  const columns = [
    { key: "wilaya", label: "Wilaya" },
    { key: "fee", label: "Frais de livraison" },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
    },
  ];

  const tableData = WILAYAS.map((wilaya) => {
    const fee = fees.find(f => f.wilaya === wilaya.name);
    const isEditing = editingId === wilaya.name;

    return {
      wilaya: wilaya.name,
      fee: isEditing ? (
        <Input
          type="number"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="w-32"
        />
      ) : (
        `${fee?.fee || 0} DZD`
      ),
      actions: isEditing ? (
        <div className="space-x-2">
          <Button 
            variant="default" 
            size="sm"
            onClick={() => handleSave(wilaya.name)}
          >
            Enregistrer
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditingId(null)}
          >
            Annuler
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setEditingId(wilaya.name);
            setEditValue(fees.find(f => f.wilaya === wilaya.name)?.fee?.toString() || "0");
          }}
        >
          Modifier
        </Button>
      ),
    };
  });

  const renderMobileCard = (item: any) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{item.wilaya}</h3>
          <p className="text-sm text-muted-foreground">
            {item.fee}
          </p>
        </div>
        {item.actions}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Frais de livraison</h1>
        <div className="rounded-md border">
          <div className="p-8 text-center">Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Frais de livraison</h1>
      <DataTable
        columns={columns}
        data={tableData}
        renderMobileCard={renderMobileCard}
      />
    </div>
  );
}