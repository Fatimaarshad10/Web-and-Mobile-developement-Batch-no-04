export interface Product {
  id: string;
  userId: string;
  storeId?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  status: "Active" | "Draft";
}

export const mockProducts: Product[] = [
  {
    id: "1",
    userId: "demo-user",
    storeId: "store-1",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 79.99,
    stock: 24,
    imageUrl: "",
    status: "Active",
  },
  {
    id: "2",
    userId: "demo-user",
    storeId: "store-1",
    name: "Running Shoes",
    description: "Comfortable running shoes for all terrains",
    price: 120,
    stock: 12,
    imageUrl: "",
    status: "Active",
  },
  {
    id: "3",
    userId: "demo-user",
    storeId: "store-2",
    name: "Classic T-Shirt",
    description: "Premium cotton classic fit t-shirt",
    price: 35,
    stock: 45,
    imageUrl: "",
    status: "Active",
  },
  {
    id: "4",
    userId: "demo-user",
    storeId: "store-2",
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with blue switches",
    price: 89.99,
    stock: 18,
    imageUrl: "",
    status: "Active",
  },
];
