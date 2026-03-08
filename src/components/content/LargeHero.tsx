import heroImage from "@/assets/hero-yfeey.jpg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LargeHero = () => {
  return (
    <section className="w-full mb-16 px-6">
      <div className="w-full aspect-[16/9] mb-6 overflow-hidden relative">
        <img src={heroImage} alt="Yfeey Store - Clothing, Shoes & Bags" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-semibold text-white mb-3">
            Smart Shopping Starts Here
          </h1>
          <p className="text-sm md:text-base font-light text-white/90 mb-6 max-w-lg">
            Discover quality clothing, shoes, and bags at unbeatable prices.
          </p>
          <div className="flex gap-3">
            <Button asChild className="bg-white text-foreground hover:bg-white/90 rounded-full px-6">
              <Link to="/category/shop">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white bg-transparent hover:bg-white/10 rounded-full px-6">
              <Link to="/category/clothing">Browse Categories</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LargeHero;
