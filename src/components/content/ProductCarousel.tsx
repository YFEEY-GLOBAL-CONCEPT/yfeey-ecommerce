import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import productHoodie from "@/assets/product-hoodie.jpg";
import productSneakers from "@/assets/product-sneakers.jpg";
import productBag from "@/assets/product-bag.jpg";
import productJacket from "@/assets/product-jacket.jpg";
import productBoots from "@/assets/product-boots.jpg";
import productTote from "@/assets/product-tote.jpg";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  discountPrice?: string;
  image: string;
  isNew?: boolean;
}

const products: Product[] = [
  { id: 1, name: "Oversized Hoodie", category: "Clothing", price: "$89.99", image: productHoodie, isNew: true },
  { id: 2, name: "Classic Sneakers", category: "Shoes", price: "$129.99", image: productSneakers, isNew: true },
  { id: 3, name: "Crossbody Bag", category: "Bags", price: "$64.99", image: productBag },
  { id: 4, name: "Denim Jacket", category: "Clothing", price: "$119.99", discountPrice: "$89.99", image: productJacket },
  { id: 5, name: "Leather Boots", category: "Shoes", price: "$189.99", image: productBoots },
  { id: 6, name: "Canvas Tote", category: "Bags", price: "$49.99", image: productTote },
];

const ProductCarousel = () => {
  return (
    <section className="w-full mb-16 px-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-foreground">Featured Products</h2>
        <Link to="/category/shop" className="text-sm font-light text-foreground hover:text-foreground/70 transition-colors">
          View All →
        </Link>
      </div>
      <Carousel opts={{ align: "start", loop: false }} className="w-full">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4 pr-2 md:pr-4">
              <Link to={`/product/${product.id}`}>
                <Card className="border-none shadow-none bg-transparent group">
                  <CardContent className="p-0">
                    <div className="aspect-square mb-3 overflow-hidden bg-muted/10 relative">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105" />
                      {product.isNew && (
                        <div className="absolute top-2 left-2 px-2 py-1 text-xs font-medium text-foreground bg-background/80 backdrop-blur-sm">
                          NEW
                        </div>
                      )}
                      {product.discountPrice && (
                        <div className="absolute top-2 right-2 px-2 py-1 text-xs font-medium text-white bg-destructive">
                          SALE
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-light text-muted-foreground">{product.category}</p>
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
                        <div className="text-right">
                          {product.discountPrice ? (
                            <>
                              <span className="text-xs line-through text-muted-foreground mr-1">{product.price}</span>
                              <span className="text-sm font-medium text-foreground">{product.discountPrice}</span>
                            </>
                          ) : (
                            <span className="text-sm font-light text-foreground">{product.price}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default ProductCarousel;
