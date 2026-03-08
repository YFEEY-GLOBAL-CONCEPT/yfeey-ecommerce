import { useState, useMemo } from "react";
import { Minus, Plus, CreditCard, Check, ShieldCheck, Lock } from "lucide-react";
import CheckoutHeader from "../components/header/CheckoutHeader";
import Footer from "../components/footer/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useStore } from "@/contexts/StoreContext";
import { Link } from "react-router-dom";
import OrderReceipt from "@/components/checkout/OrderReceipt";

const Checkout = () => {
  const { cartItems, updateCartQuantity, cartTotal, clearCart } = useStore();
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [customerDetails, setCustomerDetails] = useState({ email: "", firstName: "", lastName: "", phone: "" });
  const [shippingAddress, setShippingAddress] = useState({ address: "", city: "", state: "", postalCode: "", country: "" });
  const [shippingOption, setShippingOption] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: "", expiryDate: "", cvv: "", cardholderName: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [completedOrderData, setCompletedOrderData] = useState<{
    items: typeof cartItems;
    subtotal: number;
    shippingCost: number;
    total: number;
    orderNumber: string;
  } | null>(null);

  const shippingCost = shippingOption === "express" ? 14.99 : shippingOption === "overnight" ? 29.99 : cartTotal >= 50 ? 0 : 5.99;
  const total = cartTotal + shippingCost;

  const shippingLabel = shippingOption === "express" ? "Express" : shippingOption === "overnight" ? "Overnight" : "Standard";

  const handleCompleteOrder = async () => {
    setIsProcessing(true);
    // Snapshot order data before clearing cart
    const orderData = {
      items: [...cartItems],
      subtotal: cartTotal,
      shippingCost,
      total,
      orderNumber: `YF-${Date.now().toString(36).toUpperCase()}`,
    };
    await new Promise((r) => setTimeout(r, 2000));
    setCompletedOrderData(orderData);
    setIsProcessing(false);
    setPaymentComplete(true);
    clearCart();
  };

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-background">
        <CheckoutHeader />
        <main className="pt-6 pb-12">
          <div className="max-w-lg mx-auto px-6 text-center py-20">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-light mb-3">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-2">Thank you for your purchase. Your order has been placed successfully.</p>
            <p className="text-sm text-muted-foreground mb-8">A confirmation email has been sent to {customerDetails.email || "your email address"}.</p>
            <p className="text-lg font-medium mb-8">Order Total: ${total.toFixed(2)}</p>
            <Button asChild className="rounded-none"><Link to="/category/shop">Continue Shopping</Link></Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <CheckoutHeader />
        <main className="pt-6 pb-12">
          <div className="max-w-lg mx-auto px-6 text-center py-20">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button asChild><Link to="/category/shop">Continue Shopping</Link></Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CheckoutHeader />
      <main className="pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order summary sidebar */}
            <div className="lg:col-span-1 lg:order-2">
              <div className="bg-muted/20 p-6 sticky top-6">
                <h2 className="text-lg font-light mb-6">Order Summary</h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={`${item.productId}-${item.size}`} className="flex gap-3">
                      <div className="w-16 h-16 bg-muted overflow-hidden relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <span className="absolute -top-1 -right-1 bg-foreground text-background text-[0.6rem] w-5 h-5 rounded-full flex items-center justify-center">{item.quantity}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-light truncate">{item.name}</h3>
                        {item.size && <p className="text-xs text-muted-foreground">Size: {item.size}</p>}
                      </div>
                      <span className="text-sm font-medium">${((item.discountPrice ?? item.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {!showDiscountInput ? (
                  <button onClick={() => setShowDiscountInput(true)} className="text-sm underline mt-6 block">Discount code</button>
                ) : (
                  <div className="flex gap-2 mt-6">
                    <Input value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} placeholder="Enter code" className="rounded-none" />
                    <Button variant="outline" className="rounded-none" onClick={() => setShowDiscountInput(false)}>Apply</Button>
                  </div>
                )}

                <div className="border-t border-border mt-6 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span></div>
                  <div className="border-t border-border pt-2 flex justify-between font-medium text-base"><span>Total</span><span>${total.toFixed(2)}</span></div>
                </div>

                <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                  <ShieldCheck className="w-4 h-4" /> <span>Secure checkout · SSL encrypted</span>
                </div>
              </div>
            </div>

            {/* Forms */}
            <div className="lg:col-span-2 lg:order-1 space-y-8">
              {/* Customer details */}
              <div className="bg-muted/20 p-6">
                <h2 className="text-lg font-light mb-6">Customer Details</h2>
                <div className="space-y-4">
                  <div><Label className="text-sm font-light">Email Address *</Label><Input value={customerDetails.email} onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})} className="mt-1 rounded-none" placeholder="your@email.com" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label className="text-sm font-light">First Name *</Label><Input value={customerDetails.firstName} onChange={(e) => setCustomerDetails({...customerDetails, firstName: e.target.value})} className="mt-1 rounded-none" /></div>
                    <div><Label className="text-sm font-light">Last Name *</Label><Input value={customerDetails.lastName} onChange={(e) => setCustomerDetails({...customerDetails, lastName: e.target.value})} className="mt-1 rounded-none" /></div>
                  </div>
                  <div><Label className="text-sm font-light">Phone Number</Label><Input value={customerDetails.phone} onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})} className="mt-1 rounded-none" /></div>
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-muted/20 p-6">
                <h2 className="text-lg font-light mb-6">Shipping Address</h2>
                <div className="space-y-4">
                  <div><Label className="text-sm font-light">Address *</Label><Input value={shippingAddress.address} onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})} className="mt-1 rounded-none" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label className="text-sm font-light">City *</Label><Input value={shippingAddress.city} onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})} className="mt-1 rounded-none" /></div>
                    <div><Label className="text-sm font-light">State</Label><Input value={shippingAddress.state} onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})} className="mt-1 rounded-none" /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label className="text-sm font-light">Postal Code *</Label><Input value={shippingAddress.postalCode} onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})} className="mt-1 rounded-none" /></div>
                    <div><Label className="text-sm font-light">Country *</Label><Input value={shippingAddress.country} onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})} className="mt-1 rounded-none" /></div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="text-base font-light mb-4">Shipping Method</h3>
                  <RadioGroup value={shippingOption} onValueChange={setShippingOption} className="space-y-3">
                    <div className="flex items-center justify-between border border-border p-4"><div className="flex items-center gap-3"><RadioGroupItem value="standard" id="standard" /><Label htmlFor="standard" className="cursor-pointer"><span className="text-sm">Standard Shipping (5-7 days)</span></Label></div><span className="text-sm">{cartTotal >= 50 ? "Free" : "$5.99"}</span></div>
                    <div className="flex items-center justify-between border border-border p-4"><div className="flex items-center gap-3"><RadioGroupItem value="express" id="express" /><Label htmlFor="express" className="cursor-pointer"><span className="text-sm">Express Shipping (2-3 days)</span></Label></div><span className="text-sm">$14.99</span></div>
                    <div className="flex items-center justify-between border border-border p-4"><div className="flex items-center gap-3"><RadioGroupItem value="overnight" id="overnight" /><Label htmlFor="overnight" className="cursor-pointer"><span className="text-sm">Overnight Shipping</span></Label></div><span className="text-sm">$29.99</span></div>
                  </RadioGroup>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-muted/20 p-6">
                <h2 className="text-lg font-light mb-6 flex items-center gap-2"><Lock className="w-4 h-4" /> Payment</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex gap-4 mb-6">
                  <div className="flex items-center gap-2"><RadioGroupItem value="card" id="card" /><Label htmlFor="card" className="cursor-pointer flex items-center gap-1"><CreditCard className="w-4 h-4" /> Credit/Debit Card</Label></div>
                </RadioGroup>
                <div className="space-y-4">
                  <div><Label className="text-sm font-light">Cardholder Name *</Label><Input value={paymentDetails.cardholderName} onChange={(e) => setPaymentDetails({...paymentDetails, cardholderName: e.target.value})} className="mt-1 rounded-none" /></div>
                  <div><Label className="text-sm font-light">Card Number *</Label><Input value={paymentDetails.cardNumber} onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})} className="mt-1 rounded-none" placeholder="1234 5678 9012 3456" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label className="text-sm font-light">Expiry Date *</Label><Input value={paymentDetails.expiryDate} onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})} className="mt-1 rounded-none" placeholder="MM/YY" /></div>
                    <div><Label className="text-sm font-light">CVV *</Label><Input value={paymentDetails.cvv} onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})} className="mt-1 rounded-none" placeholder="123" /></div>
                  </div>
                </div>

                <Button onClick={handleCompleteOrder} disabled={isProcessing} className="w-full h-14 mt-8 rounded-none text-base" size="lg">
                  {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
