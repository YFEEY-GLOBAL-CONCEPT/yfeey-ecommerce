import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import CategoryHeader from "../components/category/CategoryHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { allProducts, Product } from "@/data/products";
import { useStore } from "@/contexts/StoreContext";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const Category = () => {
  const { category } = useParams();
  const { toggleWishlist, isInWishlist } = useStore();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

  const categories = ["Clothing", "Shoes", "Bags"];
  const priceRanges = ["Under $50", "$50 - $100", "$100 - $200", "Over $200"];

  const filteredProducts = useMemo(() => {
    let products = [...allProducts];

    // Filter by route category
    if (category && category !== "shop" && category !== "new-in" && category !== "sale" && category !== "new-arrivals") {
      const cat = category.charAt(0).toUpperCase() + category.slice(1);
      products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
    if (category === "new-in" || category === "new-arrivals") {
      products = products.filter((p) => p.isNew);
    }
    if (category === "sale") {
      products = products.filter((p) => p.isSale);
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      products = products.filter((p) => selectedCategories.includes(p.category));
    }

    // Filter by price ranges
    if (selectedPriceRanges.length > 0) {
      products = products.filter((p) => {
        const price = p.discountPrice ?? p.price;
        return selectedPriceRanges.some((range) => {
          if (range === "Under $50") return price < 50;
          if (range === "$50 - $100") return price >= 50 && price <= 100;
          if (range === "$100 - $200") return price >= 100 && price <= 200;
          if (range === "Over $200") return price > 200;
          return true;
        });
      });
    }

    // Sort
    switch (sortBy) {
      case "price-low": products.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price)); break;
      case "price-high": products.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price)); break;
      case "newest": products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case "rating": products.sort((a, b) => b.rating - a.rating); break;
      case "name": products.sort((a, b) => a.name.localeCompare(b.name)); break;
    }

    return products;
  }, [category, sortBy, selectedCategories, selectedPriceRanges]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]);
  };

  const togglePriceRange = (range: string) => {
    setSelectedPriceRanges((prev) => prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]);
  };

  const clearFilters = () => { setSelectedCategories([]); setSelectedPriceRanges([]); };

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-3 h-3 ${star <= Math.round(rating) ? "text-amber-400" : "text-muted-foreground/20"}`}>
          <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
        </svg>
      ))}
      <span className="text-xs text-muted-foreground ml-0.5">({rating})</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-6">
        <CategoryHeader category={category || "All Products"} />

        {/* Filter/Sort bar */}
        <section className="w-full px-6 mb-8 border-b border-border pb-4">
          <div className="flex justify-between items-center">
            <p className="text-sm font-light text-muted-foreground">{filteredProducts.length} items</p>
            <div className="flex items-center gap-4">
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild><Button variant="ghost" size="sm" className="font-light hover:bg-transparent">Filters</Button></SheetTrigger>
                <SheetContent side="right" className="w-80 bg-background">
                  <SheetHeader className="mb-6 border-b border-border pb-4"><SheetTitle className="text-lg font-light">Filters</SheetTitle></SheetHeader>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-sm font-light mb-4">Category</h3>
                      <div className="space-y-3">
                        {categories.map((cat) => (
                          <div key={cat} className="flex items-center space-x-3">
                            <Checkbox id={cat} checked={selectedCategories.includes(cat)} onCheckedChange={() => toggleCategory(cat)} />
                            <Label htmlFor={cat} className="text-sm font-light cursor-pointer">{cat}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="text-sm font-light mb-4">Price</h3>
                      <div className="space-y-3">
                        {priceRanges.map((range) => (
                          <div key={range} className="flex items-center space-x-3">
                            <Checkbox id={range} checked={selectedPriceRanges.includes(range)} onCheckedChange={() => togglePriceRange(range)} />
                            <Label htmlFor={range} className="text-sm font-light cursor-pointer">{range}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2 pt-4">
                      <Button onClick={() => setFiltersOpen(false)} className="w-full">Apply Filters</Button>
                      <Button variant="ghost" onClick={clearFilters} className="w-full">Clear All</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-auto border-none bg-transparent text-sm font-light shadow-none"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Product grid */}
        <section className="w-full px-6 mb-16">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20"><p className="text-muted-foreground">No products found matching your filters.</p><Button variant="outline" onClick={clearFilters} className="mt-4">Clear Filters</Button></div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group relative">
                  <Link to={`/product/${product.id}`}>
                    <Card className="border-none shadow-none bg-transparent">
                      <CardContent className="p-0">
                        <div className="aspect-square mb-3 overflow-hidden bg-muted/10 relative">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                          {/* Tags */}
                          <div className="absolute top-2 left-2 flex flex-col gap-1">
                            {product.isNew && <span className="px-2 py-0.5 text-[0.65rem] font-semibold bg-foreground text-background">NEW</span>}
                            {product.isSale && <span className="px-2 py-0.5 text-[0.65rem] font-semibold bg-destructive text-white">SALE</span>}
                            {product.stock === 0 && <span className="px-2 py-0.5 text-[0.65rem] font-semibold bg-muted-foreground text-white">SOLD OUT</span>}
                            {product.stock > 0 && product.stock <= 5 && <span className="px-2 py-0.5 text-[0.65rem] font-medium bg-amber-100 text-amber-800">Only {product.stock} left</span>}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">{product.category}</p>
                          <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
                          <StarRating rating={product.rating} />
                          <div className="flex items-center gap-2">
                            {product.discountPrice ? (
                              <>
                                <span className="text-xs line-through text-muted-foreground">${product.price.toFixed(2)}</span>
                                <span className="text-sm font-semibold text-destructive">${product.discountPrice.toFixed(2)}</span>
                                <span className="text-[0.65rem] font-medium text-destructive bg-destructive/10 px-1 py-0.5 rounded">-{Math.round((1 - product.discountPrice / product.price) * 100)}%</span>
                              </>
                            ) : (
                              <span className="text-sm font-medium">${product.price.toFixed(2)}</span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                  {/* Wishlist button */}
                  <button
                    onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
                    className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                    aria-label="Add to wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-destructive text-destructive" : "text-foreground"}`} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Category;
