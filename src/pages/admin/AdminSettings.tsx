import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
        <p className="text-muted-foreground text-sm">
          Manage your store configuration
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Store Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Store Name</Label>
            <Input defaultValue="yfeey" />
          </div>
          <div>
            <Label>Store Description</Label>
            <Textarea defaultValue="Your one-stop online marketplace for quality products at unbeatable prices." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Support Email</Label>
              <Input defaultValue="support@yfeey.com" />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input defaultValue="+44 123456789" />
            </div>
          </div>
          <div>
            <Label>Business Address</Label>
            <Input defaultValue="Douglas, Isle of Man" />
          </div>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Shipping</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Free Shipping</Label>
              <p className="text-xs text-muted-foreground">
                Enable free shipping for orders above threshold
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div>
            <Label>Free Shipping Threshold (£)</Label>
            <Input type="number" defaultValue="50" />
          </div>
          <div>
            <Label>Default Shipping Cost (£)</Label>
            <Input type="number" defaultValue="5.99" />
          </div>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Stripe</Label>
              <p className="text-xs text-muted-foreground">
                Accept credit/debit card payments
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Paystack</Label>
              <p className="text-xs text-muted-foreground">
                Accept payments in African markets
              </p>
            </div>
            <Switch />
          </div>
          <p className="text-xs text-muted-foreground">
            Connect Lovable Cloud to enable payment processing.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Order Confirmation Email</Label>
              <p className="text-xs text-muted-foreground">
                Send email to customers after purchase
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Low Stock Alert</Label>
              <p className="text-xs text-muted-foreground">
                Get notified when product stock is low
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
