import { ArrowRight, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ShoppingBag from "./ShoppingBag";
import productHoodie from "@/assets/product-hoodie.jpg";
import productSneakers from "@/assets/product-sneakers.jpg";
import productBag from "@/assets/product-bag.jpg";

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
  category: string;
}

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShoppingBagOpen, setIsShoppingBagOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Oversized Hoodie", price: "$89.99", image: productHoodie, quantity: 1, category: "Clothing" },
    { id: 2, name: "Classic Sneakers", price: "$129.99", image: productSneakers, quantity: 1, category: "Shoes" },
    { id: 3, name: "Crossbody Bag", price: "$64.99", image: productBag, quantity: 1, category: "Bags" },
  ]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems((items) => items.filter((item) => item.id !== id));
    } else {
      setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
    }
  };

  const popularSearches = ["Hoodies", "Sneakers", "Leather Bags", "Denim Jackets", "Boots", "Tote Bags"];

  const navItems = [
    {
      name: "Shop",
      href: "/category/shop",
      submenuItems: ["Clothing", "Shoes", "Bags", "New Arrivals", "Sale"],
      images: [
        { src: "/clothing-collection.jpg", alt: "Clothing Collection", label: "Clothing", link: "/category/clothing" },
        { src: "/shoes-collection.jpg", alt: "Shoes Collection", label: "Shoes", link: "/category/shoes" },
      ],
    },
    {
      name: "New in",
      href: "/category/new-in",
      submenuItems: ["This Week's Arrivals", "Spring Collection", "Trending Now", "Limited Edition", "Pre-Orders"],
      images: [
        { src: "/product-hoodie.jpg", alt: "Oversized Hoodie", label: "Oversized Hoodie", link: "/product/oversized-hoodie" },
        { src: "/product-sneakers.jpg", alt: "Classic Sneakers", label: "Classic Sneakers", link: "/product/classic-sneakers" },
      ],
    },
    {
      name: "About",
      href: "/about/our-story",
      submenuItems: ["Our Story", "Sustainability", "Size Guide", "Customer Care", "Store Locator"],
      images: [
        { src: "/yfeey-team.jpg", alt: "Yfeey Team", label: "Read our story", link: "/about/our-story" },
      ],
    },
  ];

  return (
    <nav className="relative" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(10px)" }}>
      <div className="flex items-center justify-between h-16 px-6">
        {/* Mobile hamburger */}
        <button className="lg:hidden p-2 mt-0.5 text-nav-foreground hover:text-nav-hover transition-colors duration-200" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
          <div className="w-5 h-5 relative">
            <span className={`absolute block w-5 h-px bg-current transform transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 top-2.5" : "top-1.5"}`}></span>
            <span className={`absolute block w-5 h-px bg-current transform transition-all duration-300 top-2.5 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}></span>
            <span className={`absolute block w-5 h-px bg-current transform transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 top-2.5" : "top-3.5"}`}></span>
          </div>
        </button>

        {/* Left navigation */}
        <div className="hidden lg:flex space-x-8">
          {navItems.map((item) => (
            <div key={item.name} className="relative" onMouseEnter={() => setActiveDropdown(item.name)} onMouseLeave={() => setActiveDropdown(null)}>
              <Link to={item.href} className="text-nav-foreground hover:text-nav-hover transition-colors duration-200 text-sm font-light py-6 block">
                {item.name}
              </Link>
            </div>
          ))}
        </div>

        {/* Center logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="block text-xl font-semibold tracking-wider text-foreground">
            YFEEY
          </Link>
        </div>

        {/* Right icons */}
        <div className="flex items-center space-x-2">
          <button className="p-2 text-nav-foreground hover:text-nav-hover transition-colors duration-200" aria-label="Search" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
          <button className="hidden lg:block p-2 text-nav-foreground hover:text-nav-hover transition-colors duration-200" aria-label="Account">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </button>
          <button className="p-2 text-nav-foreground hover:text-nav-hover transition-colors duration-200 relative" aria-label="Shopping bag" onClick={() => setIsShoppingBagOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[30%] text-[0.5rem] font-semibold text-foreground pointer-events-none">
                {totalItems}
              </span>
            )}
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
                  {navItems.find((item) => item.name === activeDropdown)?.submenuItems.map((subItem, index) => (
                    <li key={index}>
                      <Link to={activeDropdown === "About" ? `/about/${subItem.toLowerCase().replace(/\s+/g, "-")}` : `/category/${subItem.toLowerCase().replace(/\s+/g, "-")}`} className="text-nav-foreground hover:text-nav-hover transition-colors duration-200 text-sm font-light block py-2">
                        {subItem}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex space-x-6">
                {navItems.find((item) => item.name === activeDropdown)?.images.map((image, index) => (
                  <Link key={index} to={image.link} className="w-[400px] h-[280px] cursor-pointer group relative overflow-hidden block">
                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-90" />
                    <div className="absolute bottom-2 left-2 text-white text-xs font-light flex items-center gap-1">
                      <span>{image.label}</span>
                      <ArrowRight size={12} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-nav border-b border-border z-50">
          <div className="px-6 py-8">
            <div className="max-w-2xl mx-auto">
              <div className="relative mb-8">
                <div className="flex items-center border-b border-border pb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-nav-foreground mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <input type="text" placeholder="Search for clothing, shoes, bags..." className="flex-1 bg-transparent text-nav-foreground placeholder:text-nav-foreground/60 outline-none text-lg" autoFocus />
                </div>
              </div>
              <div>
                <h3 className="text-nav-foreground text-sm font-light mb-4">Popular Searches</h3>
                <div className="flex flex-wrap gap-3">
                  {popularSearches.map((search, index) => (
                    <button key={index} className="text-nav-foreground hover:text-nav-hover text-sm font-light py-2 px-4 border border-border rounded-full transition-colors duration-200 hover:border-nav-hover">
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-nav border-b border-border z-50">
          <div className="px-6 py-8">
            <div className="space-y-6">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link to={item.href} className="text-nav-foreground hover:text-nav-hover transition-colors duration-200 text-lg font-light block py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    {item.name}
                  </Link>
                  <div className="mt-3 pl-4 space-y-2">
                    {item.submenuItems.map((subItem, subIndex) => (
                      <Link key={subIndex} to={item.name === "About" ? `/about/${subItem.toLowerCase().replace(/\s+/g, "-")}` : `/category/${subItem.toLowerCase().replace(/\s+/g, "-")}`} className="text-nav-foreground/70 hover:text-nav-hover text-sm font-light block py-1" onClick={() => setIsMobileMenuOpen(false)}>
                        {subItem}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <ShoppingBag isOpen={isShoppingBagOpen} onClose={() => setIsShoppingBagOpen(false)} cartItems={cartItems} updateQuantity={updateQuantity} onViewFavorites={() => {}} />
    </nav>
  );
};

export default Navigation;
