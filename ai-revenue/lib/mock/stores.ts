export interface Store {
  id: string;
  userId: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  heroTitle: string;
  heroDescription: string;
}

export const mockStores: Store[] = [
  {
    id: "store-1",
    userId: "demo-user",
    name: "Fatima Fashion",
    slug: "fatima-fashion",
    description: "Trendy fashion for everyone",
    logo: "",
    heroTitle: "Welcome to Fatima Fashion",
    heroDescription: "Discover our latest collection of trendy clothes and accessories.",
  },
  {
    id: "store-2",
    userId: "demo-user",
    name: "Tech Store",
    slug: "tech-store",
    description: "Best tech gadgets in town",
    logo: "",
    heroTitle: "Welcome to Tech Store",
    heroDescription: "Explore the latest headphones, keyboards, and more.",
  },
];
