import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";

const Cart = () => {
  const { cartItems, updateCartQuantity, removeFromCart, cartTotal, cartCount } = useStore();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-6 pb-12">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-3xl font-light mb-2">Shopping Cart</h1>
          <p className="text-sm text-muted-foreground mb-8">{cartCount} {cartCount === 1 ? "item" : "items"} in your cart</p>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button asChild><Link to="/category/shop">Continue Shopping</Link></Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-0">
                {/* Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 pb-3 border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Price</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
                {cartItems.map((item) => {
                  const price = item.discountPrice ?? item.price;
                  return (
                    <div key={`${item.productId}-${item.size}`} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 border-b border-border items-center">
                      <div className="md:col-span-6 flex gap-4">
                        <div className="w-24 h-24 bg-muted/10 overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          {item.size && <p className="text-xs text-muted-foreground mt-0.5">Size: {item.size}</p>}
                          <button onClick={() => removeFromCart(item.productId)} className="flex items-center gap-1 text-xs text-destructive mt-2 hover:underline">
                            <Trash2 className="w-3 h-3" /> Remove
                          </button>
                        </div>
                      </div>
                      <div className="md:col-span-2 flex justify-center">
                        <div className="flex items-center border border-border">
                          <button onClick={() => updateCartQuantity(item.productId, item.quantity - 1)} className="p-2 hover:bg-muted/50"><Minus size={14} /></button>
                          <span className="px-3 text-sm min-w-[36px] text-center">{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.productId, item.quantity + 1)} className="p-2 hover:bg-muted/50"><Plus size={14} /></button>
                        </div>
                      </div>
                      <div className="md:col-span-2 text-right">
                        {item.discountPrice ? (
                          <div>
                            <span className="text-xs line-through text-muted-foreground block">€{item.price.toFixed(2)}</span>
                            <span className="text-sm font-medium">€{item.discountPrice.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span className="text-sm">€{item.price.toFixed(2)}</span>
                        )}
                      </div>
                      <div className="md:col-span-2 text-right font-medium text-sm">
                        €{(price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="bg-muted/20 p-6 sticky top-20">
                  <h2 className="text-lg font-light mb-6">Order Summary</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>€{cartTotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{cartTotal >= 50 ? "Free" : "€5.99"}</span></div>
                    <div className="border-t border-border pt-3 flex justify-between font-medium text-base">
                      <span>Total</span><span>€{(cartTotal + (cartTotal >= 50 ? 0 : 5.99)).toFixed(2)}</span>
                    </div>
                  </div>
                  {cartTotal < 50 && <p className="text-xs text-muted-foreground mt-3">Add €{(50 - cartTotal).toFixed(2)} more for free shipping</p>}
                  <Button asChild className="w-full mt-6 h-12 rounded-none" size="lg">
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full mt-2 rounded-none" size="lg">
                    <Link to="/category/shop">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
