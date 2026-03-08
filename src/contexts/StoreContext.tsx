import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, getProductById } from "@/data/products";
import { toast } from "@/hooks/use-toast";

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  quantity: number;
  category: string;
  size?: string;
}

interface StoreContextType {
  // Cart
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  // Wishlist
  wishlistIds: number[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  // Shopping bag UI
  isShoppingBagOpen: boolean;
  setIsShoppingBagOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("yfeey-cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlistIds, setWishlistIds] = useState<number[]>(() => {
    const saved = localStorage.getItem("yfeey-wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [isShoppingBagOpen, setIsShoppingBagOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("yfeey-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("yfeey-wishlist", JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const addToCart = (product: Product, quantity = 1, size?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        productId: product.id,
        name: product.name,
        price: product.price,
        discountPrice: product.discountPrice,
        image: product.image,
        quantity,
        category: product.category,
        size,
      }];
    });
    setIsShoppingBagOpen(true);
    toast({ title: "Added to bag", description: `${product.name} has been added to your shopping bag.` });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems((prev) => prev.map((item) => (item.productId === productId ? { ...item, quantity } : item)));
    }
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce((sum, item) => {
    const price = item.discountPrice ?? item.price;
    return sum + price * item.quantity;
  }, 0);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleWishlist = (productId: number) => {
    setWishlistIds((prev) => {
      const isIn = prev.includes(productId);
      if (isIn) {
        toast({ title: "Removed from wishlist" });
        return prev.filter((id) => id !== productId);
      }
      toast({ title: "Added to wishlist", description: "Item saved to your wishlist." });
      return [...prev, productId];
    });
  };

  const isInWishlist = (productId: number) => wishlistIds.includes(productId);

  return (
    <StoreContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateCartQuantity, clearCart, cartTotal, cartCount,
      wishlistIds, toggleWishlist, isInWishlist,
      isShoppingBagOpen, setIsShoppingBagOpen,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
};
