// Product catalog
export const products = [
  { id: 1, name: "hhr", category: "Running", price: 129, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
  { id: 2, name: "Urban Step", category: "Casual", price: 89, img: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&q=80" },
  { id: 3, name: "Air Glide", category: "Sneakers", price: 149, img: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&q=80" },
  { id: 4, name: "Trail Blaze", category: "Running", price: 159, img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80" },
  { id: 5, name: "Daily Comfort", category: "Casual", price: 79, img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80" },
  { id: 6, name: "Court Classic", category: "Sneakers", price: 119, img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&q=80" },
  { id: 7, name: "Swift Pace", category: "Running", price: 139, img: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&q=80" },
  { id: 8, name: "Street Edge", category: "Sneakers", price: 109, img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&q=80" },
];

// Unique category list with "All" first
export const categories = ["All", ...new Set(products.map((p) => p.category))];
