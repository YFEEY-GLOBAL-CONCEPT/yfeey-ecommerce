import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

export default function Homepage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Homepage Content</h2>
        <p className="text-muted-foreground text-sm">Manage your storefront homepage sections</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Hero Banner</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Headline</Label><Input defaultValue="Smart Shopping Starts at yfeey" /></div>
          <div><Label>Subtext</Label><Textarea defaultValue="Discover quality products, unbeatable prices, and seamless online shopping." /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Primary Button Text</Label><Input defaultValue="Shop Now" /></div>
            <div><Label>Secondary Button Text</Label><Input defaultValue="Browse Categories" /></div>
          </div>
          <Button><Save className="h-4 w-4 mr-2" />Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Promotional Banner</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Banner Text</Label><Input defaultValue="Spring Sale — Up to 40% Off Selected Items" /></div>
          <div><Label>Link URL</Label><Input defaultValue="/shop?sale=true" /></div>
          <Button><Save className="h-4 w-4 mr-2" />Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Featured Products</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">Select which products appear in the "Featured" section on the homepage. Currently showing 4 products.</p>
          <Button variant="outline">Manage Featured Products</Button>
        </CardContent>
      </Card>
    </div>
  );
}
