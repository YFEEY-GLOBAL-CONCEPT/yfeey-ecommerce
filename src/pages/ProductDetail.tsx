import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ProductCarousel from "../components/content/ProductCarousel";
import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus, ChevronDown, ChevronUp, Check } from "lucide-react";
import { getProductById, allProducts } from "@/data/products";
import { useStore } from "@/contexts/StoreContext";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const StarRating = ({ rating, count }: { rating: number; count: number }) => (
  <div className="flex items-center gap-2">
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 ${star <= Math.round(rating) ? "text-amber-400" : "text-muted-foreground/20"}`}>
          <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
        </svg>
      ))}
    </div>
    <span className="text-sm text-muted-foreground">{rating} ({count} reviews)</span>
  </div>
);

const ProductDetail = () => {
  const { productId } = useParams();
  const product = getProductById(Number(productId));
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [descOpen, setDescOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  if (!product) {
    return <div className="min-h-screen bg-background"><Header /><div className="flex items-center justify-center h-96"><p className="text-muted-foreground">Product not found</p></div><Footer /></div>;
  }

  const effectivePrice = product.discountPrice ?? product.price;
  const inStock = product.stock > 0;
  const needsSize = product.sizes && product.sizes.length > 0;

  const handleAddToCart = () => {
    if (needsSize && !selectedSize) return;
    addToCart(product, quantity, selectedSize);
  };

  const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-6">
        <section className="w-full px-6">
          <div className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink asChild><Link to={`/category/${product.category.toLowerCase()}`}>{product.category}</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>{product.name}</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <div>
              <div className="aspect-square overflow-hidden mb-4">
                <img src={product.images[currentImageIndex]} alt={product.name} className="w-full h-full object-cover" />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, i) => (
                    <button key={i} onClick={() => setCurrentImageIndex(i)} className={`w-20 h-20 overflow-hidden border-2 ${i === currentImageIndex ? "border-foreground" : "border-transparent"}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="lg:pl-4 lg:sticky lg:top-20 lg:h-fit space-y-6">
              {/* Tags */}
              <div className="flex gap-2">
                {product.isNew && <span className="px-2 py-0.5 text-xs font-semibold bg-foreground text-background">NEW</span>}
                {product.isSale && <span className="px-2 py-0.5 text-xs font-semibold bg-destructive text-white">SALE</span>}
                {!inStock && <span className="px-2 py-0.5 text-xs font-semibold bg-muted-foreground text-white">SOLD OUT</span>}
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                <h1 className="text-2xl md:text-3xl font-light text-foreground">{product.name}</h1>
              </div>

              {/* Rating */}
              <StarRating rating={product.rating} count={product.reviewCount} />

              {/* Price */}
              <div className="flex items-center gap-3">
                {product.discountPrice ? (
                  <>
                    <span className="text-lg line-through text-muted-foreground">€{product.price.toFixed(2)}</span>
                    <span className="text-2xl font-semibold text-destructive">€{product.discountPrice.toFixed(2)}</span>
                    <span className="text-sm font-medium text-destructive bg-destructive/10 px-2 py-0.5 rounded">
                      -{Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-light">€{product.price.toFixed(2)}</span>
                )}
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 text-sm">
                {inStock ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">In Stock</span>
                    {product.stock <= 10 && <span className="text-amber-600 ml-1">— Only {product.stock} left!</span>}
                  </>
                ) : (
                  <span className="text-destructive font-medium">Out of Stock</span>
                )}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

              {/* Size selector */}
              {needsSize && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Select Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes!.map((size) => (
                      <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 border text-sm transition-colors ${selectedSize === size ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}>
                        {size}
                      </button>
                    ))}
                  </div>
                  {needsSize && !selectedSize && <p className="text-xs text-muted-foreground">Please select a size</p>}
                </div>
              )}

              {/* Quantity + Add to cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm">Quantity</span>
                  <div className="flex items-center border border-border">
                    <Button variant="ghost" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-10 w-10 p-0 rounded-none"><Minus className="h-4 w-4" /></Button>
                    <span className="h-10 flex items-center px-4 text-sm min-w-12 justify-center border-l border-r border-border">{quantity}</span>
                    <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} className="h-10 w-10 p-0 rounded-none"><Plus className="h-4 w-4" /></Button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleAddToCart} disabled={!inStock || (needsSize && !selectedSize)} className="flex-1 h-12 rounded-none">
                    {inStock ? "Add to Bag" : "Sold Out"}
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => toggleWishlist(product.id)} className="h-12 w-12 rounded-none">
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-destructive text-destructive" : ""}`} />
                  </Button>
                </div>

                {inStock && (
                  <Button asChild variant="outline" className="w-full h-12 rounded-none" onClick={handleAddToCart}>
                    <Link to="/checkout">Buy Now</Link>
                  </Button>
                )}
              </div>

              {/* Accordion sections */}
              <div className="border-t border-border mt-6">
                <div className="border-b border-border">
                  <Button variant="ghost" onClick={() => setDescOpen(!descOpen)} className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none">
                    <span>Description</span>{descOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                  {descOpen && <p className="pb-6 text-sm text-muted-foreground leading-relaxed">{product.description}</p>}
                </div>
                <div className="border-b border-border">
                  <Button variant="ghost" onClick={() => setDetailsOpen(!detailsOpen)} className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none">
                    <span>Product Details</span>{detailsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                  {detailsOpen && (
                    <div className="pb-6 space-y-3">
                      {Object.entries(product.details).map(([key, val]) => (
                        <div key={key} className="flex justify-between"><span className="text-sm text-muted-foreground">{key}</span><span className="text-sm">{val}</span></div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="w-full mt-16">
            <div className="mb-4 px-6"><h2 className="text-sm font-light">You might also like</h2></div>
            <ProductCarousel />
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
