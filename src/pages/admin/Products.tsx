import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  stock: number;
  status: "Active" | "Draft" | "Out of Stock";
  image: string;
}

const initialProducts: Product[] = [
  { id: 1, name: "Oversized Hoodie", category: "Clothing", price: 89.99, stock: 45, status: "Active", image: "👕" },
  { id: 2, name: "Classic Sneakers", category: "Shoes", price: 129.99, stock: 23, status: "Active", image: "👟" },
  { id: 3, name: "Crossbody Bag", category: "Bags", price: 64.99, stock: 67, status: "Active", image: "👜" },
  { id: 4, name: "Denim Jacket", category: "Clothing", price: 119.99, discountPrice: 89.99, stock: 38, status: "Active", image: "🧥" },
  { id: 5, name: "Leather Boots", category: "Shoes", price: 189.99, stock: 0, status: "Out of Stock", image: "🥾" },
  { id: 6, name: "Canvas Tote", category: "Bags", price: 49.99, stock: 120, status: "Active", image: "🛍️" },
  { id: 7, name: "Linen Shirt", category: "Clothing", price: 59.99, stock: 34, status: "Draft", image: "👔" },
  { id: 8, name: "Running Shoes", category: "Shoes", price: 159.99, discountPrice: 119.99, stock: 56, status: "Active", image: "🏃" },
];

const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  Draft: "bg-yellow-100 text-yellow-700",
  "Out of Stock": "bg-red-100 text-red-700",
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Products</h2>
          <p className="text-muted-foreground text-sm">{products.length} products total</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Product Name</Label>
                <Input placeholder="Enter product name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Price (£)</Label>
                  <Input type="number" step="0.01" />
                </div>
                <div className="space-y-2">
                  <Label>Discount Price (£)</Label>
                  <Input type="number" placeholder="0.00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="shoes">Shoes</SelectItem>
                      <SelectItem value="bags">Bags</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Stock</Label>
                  <Input type="number" placeholder="0" />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Product description..." />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddOpen(false)}>Save Product</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-muted-foreground">Product</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Category</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Price</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Stock</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{product.image}</span>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{product.category}</td>
                    <td className="p-4">
                        {product.discountPrice ? (
                          <>
                            <span className="line-through text-muted-foreground mr-2">£{product.price}</span>
                            <span className="font-medium">£{product.discountPrice}</span>
                          </>
                        ) : (
                          <span>£{product.price}</span>
                        )}
                    </td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${statusColors[product.status]}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
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

