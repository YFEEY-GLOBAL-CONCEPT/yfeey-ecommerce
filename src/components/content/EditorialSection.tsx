import yfeeyTeam from "@/assets/yfeey-team.jpg";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const EditorialSection = () => {
  return (
    <section className="w-full mb-16 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4 max-w-[630px]">
          <h2 className="text-2xl font-normal text-foreground leading-tight md:text-xl">
            Fashion Built on Purpose
          </h2>
          <p className="text-sm font-light text-foreground leading-relaxed">
            Yfeey Store was born from a simple idea: quality fashion shouldn't break the bank. We curate clothing, shoes, and bags that blend modern design with everyday wearability — so you can look your best without compromise.
          </p>
          <Link to="/about/our-story" className="inline-flex items-center gap-1 text-sm font-light text-foreground hover:text-foreground/80 transition-colors duration-200">
            <span>Read our full story</span>
            <ArrowRight size={12} />
          </Link>
        </div>
        <div className="order-first md:order-last">
          <div className="w-full aspect-square overflow-hidden">
            <img src={yfeeyTeam} alt="The Yfeey Store team" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialSection;
