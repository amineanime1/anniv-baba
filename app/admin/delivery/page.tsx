"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WILAYAS } from "@/lib/constants";
import { getDeliveryFees, createDeliveryFee } from "@/lib/actions/delivery-fees";
import { toast } from "sonner";

export default function DeliveryPage() {
  const [fees, setFees] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [sortCriteria, setSortCriteria] = useState<"code" | "name">("code");

  useEffect(() => {
    loadDeliveryFees();
  }, []);

  async function loadDeliveryFees() {
    try {
      const data = await getDeliveryFees();
      setFees(data);
    } catch (error) {
      toast.error("Failed to load delivery fees");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave(wilaya: string) {
    try {
      await createDeliveryFee({
        wilaya,
        fee: parseInt(editValue),
      });
      toast.success("Delivery fee updated");
      loadDeliveryFees();
      setEditingId(null);
    } catch (error) {
      toast.error("Failed to update delivery fee");
    }
  }

  const sortedWilayas = [...WILAYAS].sort((a, b) => {
    if (sortCriteria === "code") {
      return a.code - b.code;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Delivery Fees</h1>
        <div className="rounded-md border">
          <div className="p-8 text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Delivery Fees</h1>

      <div className="flex justify-between items-center mb-4">
        <div>
          <Button variant="outline" onClick={() => setSortCriteria("code")}>
            Sort by Code
          </Button>
          <Button variant="outline" onClick={() => setSortCriteria("name")} className="ml-2">
            Sort by Name
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">Wilaya</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Delivery Fee</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {sortedWilayas.map((wilaya) => {
              const fee = fees.find(f => f.wilaya === wilaya.name);
              const isEditing = editingId === wilaya.name;

              return (
                <tr key={wilaya.code}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">{wilaya.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    {isEditing ? (
                      <Input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-24"
                      />
                    ) : (
                      `${fee?.fee || 0} DZD`
                    )}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    {isEditing ? (
                      <div className="space-x-2">
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => handleSave(wilaya.name)}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingId(wilaya.name);
                          setEditValue(fee?.fee?.toString() || "0");
                        }}
                      >
                        Edit
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}