import { DashboardStats } from '@/components/admin/dashboard-stats';
import { RecentOrders } from '@/components/admin/recent-orders';
import { LowStockAlert } from '@/components/admin/low-stock-alert';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <DashboardStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders />
        <LowStockAlert />
      </div>
    </div>
  );
}