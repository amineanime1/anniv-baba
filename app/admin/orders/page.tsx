export default function OrdersPage() {
    const orders = [
      { id: 1, customer: "John Doe", total: 5000, status: "Pending", date: "2024-03-17" },
      { id: 2, customer: "Jane Smith", total: 3500, status: "Delivered", date: "2024-03-16" },
      { id: 3, customer: "Mike Johnson", total: 2800, status: "Processing", date: "2024-03-15" },
    ];
  
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Orders</h1>
  
        <div className="rounded-md border">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Total</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">#{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{order.total} DZD</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{order.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }