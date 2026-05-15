export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  features: string[];
  colors: string[];
  sizes: string[];
  isNew?: boolean;
  isLimited?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "ARCHIVE OVERSIZED HOODIE",
    price: 185,
    category: "Hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1287&auto=format&fit=crop",
    description: "Constructed from 480GSM heavy-weight brushback cotton. Nothing Local signature oversized fit with dropped shoulders.",
    features: ["480GSM Brushback Cotton", "Garment Dyed", "High Density Print", "Made in Portugal"],
    colors: ["Matte Black", "Graphite"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true
  },
  {
    id: "2",
    name: "GLOBAL MINDSET TEE",
    price: 85,
    category: "T-Shirts",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1364&auto=format&fit=crop",
    description: "Premium 240GSM jersey cotton with a structured finish. Minimalistic front chest logo with oversized back graphic.",
    features: ["240GSM Jersey Cotton", "Ribbed Collar", "Silicon Wash", "Anti-Pilling"],
    colors: ["Vintage White", "Jet Black"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isLimited: true
  },
  {
    id: "3",
    name: "AVANT CARGO TROUSERS",
    price: 245,
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1624374053855-48906660144f?q=80&w=1287&auto=format&fit=crop",
    description: "Tactical silhouette meets high-fashion tailoring. Water-resistant nylon blend with adjustable hem toggles.",
    features: ["Ripstop Nylon", "7-Pocket Design", "Adjustable Cuffs", "YKK Hardware"],
    colors: ["Charcoal"],
    sizes: ["30", "32", "34", "36"],
    isNew: true
  },
  {
    id: "4",
    name: "LOCAL EXCLUSION BOMBER",
    price: 320,
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1336&auto=format&fit=crop",
    description: "The definitive layering piece. Cropped body with elongated sleeves and emergency orange lining.",
    features: ["Premium Satin Shell", "Heavy Padding", "Internal Pockets", "Signature Zip Puller"],
    colors: ["Midnight Blue", "Onyx"],
    sizes: ["S", "M", "L", "XL"],
    isLimited: true
  }
];
