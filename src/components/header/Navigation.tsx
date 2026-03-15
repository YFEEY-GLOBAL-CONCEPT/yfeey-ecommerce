import { ArrowRight, X, Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";
import ShoppingBag from "./ShoppingBag";

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { cartCount, isShoppingBagOpen, setIsShoppingBagOpen, wishlistIds } = useStore();

  const popularSearches = ["Hoodies", "Sneakers", "Leather Bags", "Denim Jackets", "Boots", "Tote Bags"];

  const navItems = [
    {
      name: "Shop", href: "/category/shop",
      submenuItems: ["Clothing", "Shoes", "Bags", "New Arrivals", "Sale"],
      images: [
        { src: "/clothing-collection.jpg", alt: "Clothing", label: "Clothing", link: "/category/clothing" },
        { src: "/shoes-collection.jpg", alt: "Shoes", label: "Shoes", link: "/category/shoes" },
      ],
    },
    {
      name: "New in", href: "/category/new-in",
      submenuItems: ["This Week's Arrivals", "Spring Collection", "Trending Now", "Limited Edition"],
      images: [
        { src: "/product-hoodie.jpg", alt: "Hoodie", label: "Oversized Hoodie", link: "/product/1" },
        { src: "/product-sneakers.jpg", alt: "Sneakers", label: "Classic Sneakers", link: "/product/2" },
      ],
    },
    {
      name: "About", href: "/about/our-story",
      submenuItems: ["Our Story", "Sustainability", "Size Guide", "Customer Care", "Store Locator"],
      images: [
        { src: "/yfeey-team.jpg", alt: "Team", label: "Read our story", link: "/about/our-story" },
      ],
    },
  ];

  return (
    <nav className="relative" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(10px)" }}>
      <div className="flex items-center justify-between h-16 px-6">
        <button className="lg:hidden p-2 mt-0.5 text-nav-foreground hover:text-nav-hover transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Menu">
          <div className="w-5 h-5 relative">
            <span className={`absolute block w-5 h-px bg-current transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 top-2.5" : "top-1.5"}`} />
            <span className={`absolute block w-5 h-px bg-current transition-all duration-300 top-2.5 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`absolute block w-5 h-px bg-current transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 top-2.5" : "top-3.5"}`} />
          </div>
        </button>

        <div className="hidden lg:flex space-x-8">
          {navItems.map((item) => (
            <div key={item.name} onMouseEnter={() => setActiveDropdown(item.name)} onMouseLeave={() => setActiveDropdown(null)}>
              <Link to={item.href} className="text-nav-foreground hover:text-nav-hover text-sm font-light py-6 block">{item.name}</Link>
            </div>
          ))}
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="block text-xl font-semibold tracking-wider text-foreground uppercase">yfeey</Link>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 text-nav-foreground hover:text-nav-hover transition-colors" onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
          </button>
          <button className="hidden lg:block p-2 text-nav-foreground hover:text-nav-hover transition-colors relative" onClick={() => setIsWishlistOpen(true)} aria-label="Wishlist">
            <Heart className="w-5 h-5" />
            {wishlistIds.length > 0 && <span className="absolute -top-0.5 -right-0.5 bg-destructive text-white text-[0.5rem] w-4 h-4 rounded-full flex items-center justify-center">{wishlistIds.length}</span>}
          </button>
          <button className="p-2 text-nav-foreground hover:text-nav-hover transition-colors relative" onClick={() => setIsShoppingBagOpen(true)} aria-label="Cart">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
            {cartCount > 0 && <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[30%] text-[0.5rem] font-semibold text-foreground pointer-events-none">{cartCount}</span>}
          </button>
        </div>
      </div>

      {/* Dropdown */}
      {activeDropdown && (
        <div className="absolute top-full left-0 right-0 bg-nav border-b border-border z-50" onMouseEnter={() => setActiveDropdown(activeDropdown)} onMouseLeave={() => setActiveDropdown(null)}>
          <div className="px-6 py-8">
            <div className="flex justify-between w-full">
              <div className="flex-1">
                <ul className="space-y-2">
                  {navItems.find((i) => i.name === activeDropdown)?.submenuItems.map((sub, idx) => (
                    <li key={idx}>
                      <Link to={activeDropdown === "About" ? `/about/${sub.toLowerCase().replace(/\s+/g, "-")}` : `/category/${sub.toLowerCase().replace(/\s+/g, "-")}`} className="text-nav-foreground hover:text-nav-hover text-sm font-light block py-2">{sub}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex space-x-6">
                {navItems.find((i) => i.name === activeDropdown)?.images.map((img, idx) => (
                  <Link key={idx} to={img.link} className="w-[400px] h-[280px] group relative overflow-hidden block">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" />
                    <div className="absolute bottom-2 left-2 text-white text-xs font-light flex items-center gap-1"><span>{img.label}</span><ArrowRight size={12} /></div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-nav border-b border-border z-50">
          <div className="px-6 py-8 max-w-2xl mx-auto">
            <div className="flex items-center border-b border-border pb-2 mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-nav-foreground mr-3"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
              <input type="text" placeholder="Search for clothing, shoes, bags..." className="flex-1 bg-transparent text-nav-foreground placeholder:text-nav-foreground/60 outline-none text-lg" autoFocus />
            </div>
            <h3 className="text-nav-foreground text-sm font-light mb-4">Popular Searches</h3>
            <div className="flex flex-wrap gap-3">
              {popularSearches.map((s, i) => (<button key={i} className="text-nav-foreground hover:text-nav-hover text-sm font-light py-2 px-4 border border-border rounded-full hover:border-nav-hover transition-colors">{s}</button>))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-nav border-b border-border z-50">
          <div className="px-6 py-8 space-y-6">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link to={item.href} className="text-nav-foreground text-lg font-light block py-2" onClick={() => setIsMobileMenuOpen(false)}>{item.name}</Link>
                <div className="mt-3 pl-4 space-y-2">
                  {item.submenuItems.map((sub, i) => (
                    <Link key={i} to={item.name === "About" ? `/about/${sub.toLowerCase().replace(/\s+/g, "-")}` : `/category/${sub.toLowerCase().replace(/\s+/g, "-")}`} className="text-nav-foreground/70 text-sm font-light block py-1" onClick={() => setIsMobileMenuOpen(false)}>{sub}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ShoppingBag />

      {/* Wishlist panel */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 h-screen">
          <div className="absolute inset-0 bg-black/50 h-screen" onClick={() => setIsWishlistOpen(false)} />
          <div className="absolute right-0 top-0 h-screen w-96 bg-background border-l border-border animate-slide-in-right flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-light">Your Wishlist ({wishlistIds.length})</h2>
              <button onClick={() => setIsWishlistOpen(false)} className="p-2 text-foreground hover:text-muted-foreground"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {wishlistIds.length === 0 ? (
                <p className="text-muted-foreground text-sm">Your wishlist is empty. Browse our collection and click the heart icon to save items.</p>
              ) : (
                <div className="space-y-4">
                  {wishlistIds.map((id) => {
                    const product = require("@/data/products").getProductById(id);
                    if (!product) return null;
                    return (
                      <Link key={id} to={`/product/${id}`} onClick={() => setIsWishlistOpen(false)} className="flex gap-4 group">
                        <div className="w-20 h-20 bg-muted/10 overflow-hidden"><img src={product.image} alt={product.name} className="w-full h-full object-cover" /></div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">{product.category}</p>
                          <h3 className="text-sm font-medium group-hover:underline">{product.name}</h3>
                          <p className="text-sm font-light mt-1">
                            {product.discountPrice ? <><span className="line-through text-muted-foreground mr-1">€{product.price}</span>€{product.discountPrice}</> : `€${product.price}`}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
