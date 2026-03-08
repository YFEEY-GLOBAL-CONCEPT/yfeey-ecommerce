import clothingCollection from "@/assets/clothing-collection.jpg";
import shoesCollection from "@/assets/shoes-collection.jpg";
import { Link } from "react-router-dom";

const FiftyFiftySection = () => {
  return (
    <section className="w-full mb-16 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Link to="/category/clothing" className="block">
            <div className="w-full aspect-square mb-3 overflow-hidden">
              <img src={clothingCollection} alt="Clothing collection" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          </Link>
          <div>
            <h3 className="text-sm font-normal text-foreground mb-1">Clothing</h3>
            <p className="text-sm font-light text-foreground">Curated styles for every occasion</p>
          </div>
        </div>
        <div>
          <Link to="/category/shoes" className="block">
            <div className="w-full aspect-square mb-3 overflow-hidden">
              <img src={shoesCollection} alt="Shoes collection" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          </Link>
          <div>
            <h3 className="text-sm font-normal text-foreground mb-1">Shoes</h3>
            <p className="text-sm font-light text-foreground">Step into style with premium footwear</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FiftyFiftySection;
