import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const customers = [
  { id: 1, name: "John Doe", email: "john@example.com", orders: 12, spent: "€1,459.88", joined: "2024-08-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", orders: 8, spent: "€2,399.92", joined: "2024-09-02" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", orders: 5, spent: "€899.95", joined: "2024-10-11" },
  { id: 4, name: "Sarah Williams", email: "sarah@example.com", orders: 15, spent: "€3,199.85", joined: "2024-07-20" },
  { id: 5, name: "Tom Brown", email: "tom@example.com", orders: 3, spent: "€449.97", joined: "2025-01-05" },
  { id: 6, name: "Lisa Davis", email: "lisa@example.com", orders: 7, spent: "€1,119.93", joined: "2024-11-18" },
];

export default function Customers() {
  const [search, setSearch] = useState("");
  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Customers</h2>
        <p className="text-muted-foreground text-sm">{customers.length} customers</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-muted-foreground">Customer</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Orders</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Total Spent</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Joined</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-4">
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.email}</p>
                    </td>
                    <td className="p-4">{c.orders}</td>
                    <td className="p-4 font-medium">{c.spent}</td>
                    <td className="p-4 text-muted-foreground">{c.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
