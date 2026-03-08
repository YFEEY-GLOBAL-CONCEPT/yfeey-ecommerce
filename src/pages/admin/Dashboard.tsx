import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Package, Users, TrendingUp, TrendingDown } from "lucide-react";

const stats = [
  { title: "Total Revenue", value: "$45,231.89", change: "+20.1%", trend: "up", icon: DollarSign },
  { title: "Orders", value: "356", change: "+12.5%", trend: "up", icon: ShoppingCart },
  { title: "Products", value: "128", change: "+3", trend: "up", icon: Package },
  { title: "Customers", value: "2,350", change: "+180", trend: "up", icon: Users },
];

const recentOrders = [
  { id: "#ORD-001", customer: "John Doe", product: "Wireless Headphones", amount: "$129.99", status: "Delivered" },
  { id: "#ORD-002", customer: "Jane Smith", product: "Smart Watch Pro", amount: "$299.99", status: "Processing" },
  { id: "#ORD-003", customer: "Mike Johnson", product: "Leather Backpack", amount: "$89.99", status: "Shipped" },
  { id: "#ORD-004", customer: "Sarah Williams", product: "Running Shoes", amount: "$159.99", status: "Pending" },
  { id: "#ORD-005", customer: "Tom Brown", product: "Bluetooth Speaker", amount: "$79.99", status: "Delivered" },
];

const topProducts = [
  { name: "Wireless Headphones", sales: 142, revenue: "$18,457" },
  { name: "Smart Watch Pro", sales: 98, revenue: "$29,402" },
  { name: "Leather Backpack", sales: 87, revenue: "$7,833" },
  { name: "Running Shoes", sales: 76, revenue: "$12,159" },
];

const statusColors: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-yellow-100 text-yellow-700",
  Pending: "bg-gray-100 text-gray-700",
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground text-sm">Overview of your store performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <span className="text-xs text-green-600">{stat.change} from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{order.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{order.customer} · {order.product}</p>
                  </div>
                  <span className="text-sm font-medium">{order.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, i) => (
                <div key={product.name} className="flex items-center gap-4">
                  <span className="text-sm font-bold text-muted-foreground w-6">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                  </div>
                  <span className="text-sm font-semibold">{product.revenue}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
