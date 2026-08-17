export interface CartItem {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
}

export interface Order {
  id: string;
  storeId: string;
  storeName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerPostalCode: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
}

export const mockOrders: Order[] = [
  {
    id: "ORD-1001",
    storeId: "store-1",
    storeName: "Fatima Fashion",
    customerName: "John Davis",
    customerEmail: "john@example.com",
    customerPhone: "+1234567890",
    customerAddress: "123 Main St",
    customerCity: "New York",
    customerPostalCode: "10001",
    items: [
      {
        product: {
          id: "1",
          name: "Wireless Headphones",
          description: "High-quality wireless headphones with noise cancellation",
          price: 79.99,
          imageUrl: "",
        },
        quantity: 1,
      },
    ],
    subtotal: 79.99,
    shipping: 0,
    total: 79.99,
    status: "Pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: "ORD-1002",
    storeId: "store-2",
    storeName: "Tech Store",
    customerName: "Amelia Lee",
    customerEmail: "amelia@example.com",
    customerPhone: "+1234567891",
    customerAddress: "456 Oak Ave",
    customerCity: "Los Angeles",
    customerPostalCode: "90001",
    items: [
      {
        product: {
          id: "2",
          name: "Running Shoes",
          description: "Comfortable running shoes for all terrains",
          price: 120,
          imageUrl: "",
        },
        quantity: 2,
      },
    ],
    subtotal: 240,
    shipping: 0,
    total: 240,
    status: "Processing",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];
