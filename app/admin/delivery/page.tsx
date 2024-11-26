import { Button } from "@/components/ui/button";
import { WILAYAS } from "@/lib/constants";

export default function DeliveryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Delivery Fees</h1>

      <div className="rounded-md border">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Wilaya</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Delivery Fee</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {WILAYAS.map((wilaya) => (
              <tr key={wilaya.code}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{wilaya.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">500 DZD</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Button variant="outline" size="sm">Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}