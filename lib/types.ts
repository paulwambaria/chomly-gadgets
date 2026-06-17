export type Condition = "new" | "refurbished";

export type Storage = "64GB" | "128GB" | "256GB" | "512GB" | "1TB";

export type Color = {
  name: string;
  hex: string;
};

export type ProductImage = {
  url: string;
  alt: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  model: string;
  series: string;
  condition: Condition;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: ProductImage[];
  colors: Color[];
  storage: Storage[];
  specs: {
    display: string;
    chip: string;
    camera: string;
    battery: string;
    os: string;
    network: string;
  };
  batteryHealth?: number;
  warranty: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
  bestSeller: boolean;
  category: "iphone" | "accessory" | "gadget";
  description: string;
  tags: string[];
};

export type CartItem = {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedStorage: Storage;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: number;
  category: string;
  image: string;
};

export type Review = {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  product?: string;
};
