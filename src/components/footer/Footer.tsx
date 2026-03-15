import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-white text-foreground pt-8 pb-2 px-6 border-t border-border mt-48">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
          <div>
            <h2 className="text-xl font-semibold tracking-wider mb-4 uppercase">yfeey</h2>
            <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-md mb-6">
              Quality clothing, shoes, and bags for the modern shopper. Unbeatable prices, seamless experience.
            </p>
            <div className="space-y-2 text-sm font-light text-muted-foreground">
              <div>
                <p className="font-normal text-foreground mb-1">Contact</p>
                <p>support@yfeey.com</p>
                <p>+44 624 403102</p>
                <p>Isle of Man</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-normal mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><Link to="/category/clothing" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Clothing</Link></li>
                <li><Link to="/category/shoes" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Shoes</Link></li>
                <li><Link to="/category/bags" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Bags</Link></li>
                <li><Link to="/category/new-arrivals" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">New Arrivals</Link></li>
                <li><Link to="/category/sale" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Sale</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-normal mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/about/size-guide" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Size Guide</Link></li>
                <li><Link to="/about/customer-care" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Returns & Exchanges</Link></li>
                <li><Link to="/about/customer-care" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Shipping</Link></li>
                <li><Link to="/about/customer-care" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-normal mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Instagram</a></li>
                <li><a href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Twitter</a></li>
                <li><a href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Facebook</a></li>
                <li><a href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Newsletter</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border -mx-6 px-6 pt-2">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm font-light text-muted-foreground mb-1 md:mb-0">
            © 2025 yfeey. All rights reserved. <span className="ml-2 opacity-50 text-xs">build by yfeey.com</span>
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
