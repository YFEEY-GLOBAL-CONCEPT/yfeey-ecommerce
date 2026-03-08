import bagsCollection from "@/assets/bags-collection.jpg";
import productBoots from "@/assets/product-boots.jpg";
import { Link } from "react-router-dom";

const OneThirdTwoThirdsSection = () => {
  return (
    <section className="w-full mb-16 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Link to="/category/shoes" className="block">
            <div className="w-full h-[500px] lg:h-[800px] mb-3 overflow-hidden">
              <img src={productBoots} alt="Shoes collection" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          </Link>
          <div>
            <h3 className="text-sm font-normal text-foreground mb-1">Premium Footwear</h3>
            <p className="text-sm font-light text-foreground">Elevate every step with quality shoes</p>
          </div>
        </div>
        <div className="lg:col-span-2">
          <Link to="/category/bags" className="block">
            <div className="w-full h-[500px] lg:h-[800px] mb-3 overflow-hidden">
              <img src={bagsCollection} alt="Bags collection" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          </Link>
          <div>
            <h3 className="text-sm font-normal text-foreground mb-1">Designer Bags</h3>
            <p className="text-sm font-light text-foreground">Carry your style with elegance</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OneThirdTwoThirdsSection;
