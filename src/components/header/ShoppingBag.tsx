import { X, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";

const ShoppingBag = () => {
  const { cartItems, updateCartQuantity, cartTotal, isShoppingBagOpen, setIsShoppingBagOpen } = useStore();

  if (!isShoppingBagOpen) return null;

  return (
    <div className="fixed inset-0 z-50 h-screen">
      <div className="absolute inset-0 bg-black/50 h-screen" onClick={() => setIsShoppingBagOpen(false)} />
      <div className="absolute right-0 top-0 h-screen w-96 bg-background border-l border-border animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-light text-foreground">Shopping Bag ({cartItems.length})</h2>
          <button onClick={() => setIsShoppingBagOpen(false)} className="p-2 text-foreground hover:text-muted-foreground transition-colors" aria-label="Close"><X size={20} /></button>
        </div>
        <div className="flex-1 flex flex-col p-6">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground text-sm text-center">Your shopping bag is empty.<br />Continue shopping to add items.</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-6 mb-6">
                {cartItems.map((item) => (
                  <div key={`${item.productId}-${item.size}`} className="flex gap-4">
                    <div className="w-20 h-20 bg-muted/10 overflow-hidden"><img src={item.image} alt={item.name} className="w-full h-full object-cover" /></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                          <h3 className="text-sm font-medium text-foreground">{item.name}</h3>
                          {item.size && <p className="text-xs text-muted-foreground">Size: {item.size}</p>}
                        </div>
                        <div className="text-right">
                          {item.discountPrice ? (
                            <><p className="text-xs line-through text-muted-foreground">€{item.price.toFixed(2)}</p><p className="text-sm font-medium">€{item.discountPrice.toFixed(2)}</p></>
                          ) : (
                            <p className="text-sm font-light">€{item.price.toFixed(2)}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-border">
                          <button onClick={() => updateCartQuantity(item.productId, item.quantity - 1)} className="p-1.5 hover:bg-muted/50"><Minus size={12} /></button>
                          <span className="px-2 text-sm min-w-[28px] text-center">{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.productId, item.quantity + 1)} className="p-1.5 hover:bg-muted/50"><Plus size={12} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-6 space-y-4">
                <div className="flex justify-between"><span className="text-sm font-light">Subtotal</span><span className="text-sm font-medium">€{cartTotal.toFixed(2)}</span></div>
                <p className="text-xs text-muted-foreground">Shipping and taxes calculated at checkout</p>
                <Button asChild className="w-full rounded-none" size="lg" onClick={() => setIsShoppingBagOpen(false)}>
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button variant="outline" className="w-full rounded-none" size="lg" onClick={() => setIsShoppingBagOpen(false)} asChild>
                  <Link to="/cart">View Cart</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingBag;
