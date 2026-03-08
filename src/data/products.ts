import productHoodie from "@/assets/product-hoodie.jpg";
import productSneakers from "@/assets/product-sneakers.jpg";
import productBag from "@/assets/product-bag.jpg";
import productJacket from "@/assets/product-jacket.jpg";
import productBoots from "@/assets/product-boots.jpg";
import productTote from "@/assets/product-tote.jpg";

export interface Product {
  id: number;
  name: string;
  category: "Clothing" | "Shoes" | "Bags";
  price: number;
  discountPrice?: number;
  image: string;
  images: string[];
  isNew?: boolean;
  isSale?: boolean;
  stock: number;
  rating: number;
  reviewCount: number;
  sizes?: string[];
  description: string;
  details: Record<string, string>;
}

export const allProducts: Product[] = [
  {
    id: 1, name: "Oversized Hoodie", category: "Clothing", price: 89.99, image: productHoodie, images: [productHoodie, productJacket],
    isNew: true, stock: 45, rating: 4.8, reviewCount: 124, sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Premium heavyweight cotton hoodie with relaxed oversized fit. Features a kangaroo pocket, ribbed cuffs, and adjustable drawstring hood.",
    details: { "Material": "100% Organic Cotton", "Fit": "Oversized", "Weight": "400gsm", "Care": "Machine wash cold" },
  },
  {
    id: 2, name: "Classic Sneakers", category: "Shoes", price: 129.99, image: productSneakers, images: [productSneakers, productBoots],
    isNew: true, stock: 23, rating: 4.7, reviewCount: 89, sizes: ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    description: "Minimalist white leather sneakers with cushioned insole and durable rubber outsole. Perfect for everyday wear.",
    details: { "Material": "Full-grain leather", "Sole": "Rubber", "Insole": "Memory foam", "Origin": "Portugal" },
  },
  {
    id: 3, name: "Crossbody Bag", category: "Bags", price: 64.99, image: productBag, images: [productBag, productTote],
    stock: 67, rating: 4.6, reviewCount: 56,
    description: "Compact leather crossbody bag with adjustable strap. Multiple interior compartments keep your essentials organized.",
    details: { "Material": "PU Leather", "Dimensions": "22cm x 16cm x 8cm", "Strap": "Adjustable, 120cm max", "Closure": "Zip" },
  },
  {
    id: 4, name: "Denim Jacket", category: "Clothing", price: 119.99, discountPrice: 89.99, image: productJacket, images: [productJacket, productHoodie],
    isSale: true, stock: 38, rating: 4.9, reviewCount: 201, sizes: ["S", "M", "L", "XL"],
    description: "Classic denim jacket in medium wash with button closure. Timeless style that pairs with anything in your wardrobe.",
    details: { "Material": "100% Cotton Denim", "Fit": "Regular", "Closure": "Button front", "Pockets": "4" },
  },
  {
    id: 5, name: "Leather Boots", category: "Shoes", price: 189.99, image: productBoots, images: [productBoots, productSneakers],
    stock: 0, rating: 4.8, reviewCount: 67, sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"],
    description: "Elegant leather ankle boots with stiletto heel and side zip closure. Made from premium calf leather.",
    details: { "Material": "Calf leather", "Heel height": "8.5cm", "Sole": "Leather", "Closure": "Side zip" },
  },
  {
    id: 6, name: "Canvas Tote", category: "Bags", price: 49.99, image: productTote, images: [productTote, productBag],
    stock: 120, rating: 4.5, reviewCount: 178,
    description: "Spacious canvas tote bag perfect for everyday use. Durable cotton canvas with reinforced handles.",
    details: { "Material": "Heavy-duty cotton canvas", "Dimensions": "40cm x 35cm x 12cm", "Handle drop": "25cm", "Interior": "Unlined" },
  },
  {
    id: 7, name: "Linen Shirt", category: "Clothing", price: 59.99, image: productHoodie, images: [productHoodie, productJacket],
    isNew: true, stock: 34, rating: 4.4, reviewCount: 45, sizes: ["S", "M", "L", "XL"],
    description: "Breathable linen button-up shirt perfect for warm weather. Relaxed fit with mother-of-pearl buttons.",
    details: { "Material": "100% Linen", "Fit": "Relaxed", "Closure": "Button front", "Care": "Hand wash recommended" },
  },
  {
    id: 8, name: "Running Shoes", category: "Shoes", price: 159.99, discountPrice: 119.99, image: productSneakers, images: [productSneakers, productBoots],
    isSale: true, stock: 56, rating: 4.6, reviewCount: 312, sizes: ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11"],
    description: "Lightweight performance running shoes with responsive cushioning. Breathable mesh upper keeps feet cool.",
    details: { "Material": "Mesh/Synthetic", "Sole": "EVA foam", "Weight": "280g", "Drop": "8mm" },
  },
  {
    id: 9, name: "Leather Backpack", category: "Bags", price: 149.99, image: productBag, images: [productBag, productTote],
    stock: 19, rating: 4.7, reviewCount: 93,
    description: "Sleek leather backpack with padded laptop compartment. Multiple zippered pockets for organization.",
    details: { "Material": "Full-grain leather", "Dimensions": "42cm x 30cm x 15cm", "Laptop": "Fits up to 15\"", "Closure": "Zip" },
  },
  {
    id: 10, name: "Wool Overcoat", category: "Clothing", price: 249.99, discountPrice: 199.99, image: productJacket, images: [productJacket, productHoodie],
    isSale: true, stock: 12, rating: 4.9, reviewCount: 34, sizes: ["S", "M", "L", "XL"],
    description: "Tailored wool-blend overcoat with notch lapel. Fully lined interior with interior pockets.",
    details: { "Material": "70% Wool, 30% Polyester", "Fit": "Tailored", "Length": "Below knee", "Lining": "100% Polyester" },
  },
  {
    id: 11, name: "Slip-On Loafers", category: "Shoes", price: 99.99, image: productBoots, images: [productBoots, productSneakers],
    stock: 41, rating: 4.5, reviewCount: 78, sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    description: "Classic suede loafers with cushioned footbed. Easy slip-on style for effortless dressing.",
    details: { "Material": "Suede", "Sole": "Rubber", "Insole": "Cushioned", "Style": "Penny loafer" },
  },
  {
    id: 12, name: "Weekender Duffle", category: "Bags", price: 129.99, image: productTote, images: [productTote, productBag],
    isNew: true, stock: 28, rating: 4.8, reviewCount: 52,
    description: "Spacious duffle bag for weekend trips. Water-resistant canvas with leather accents and shoe compartment.",
    details: { "Material": "Waxed canvas + leather", "Dimensions": "55cm x 30cm x 25cm", "Shoe compartment": "Yes", "Strap": "Removable shoulder strap" },
  },
];

export const getProductById = (id: number): Product | undefined => allProducts.find(p => p.id === id);
