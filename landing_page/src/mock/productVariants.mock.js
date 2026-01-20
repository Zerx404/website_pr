// src/mock/productVariants.mock.js
export const productVariants = [
  // ===== Laptop Dell XPS 13 Plus =====
  {
    id: 1,
    product_id: 1,
    sku: "XPS13-I7-16GB-512GB",
    price: 28990000,
    stock: 5,
    image:
      "https://images.unsplash.com/photo-1593640408182-31c70c826ce1?w=600",
  },
  {
    id: 2,
    product_id: 1,
    sku: "XPS13-I7-32GB-1TB",
    price: 32990000,
    stock: 3,
    image:
      "https://images.unsplash.com/photo-1593640408182-31c70c826ce1?w=600",
  },

  // ===== iPhone 15 Pro Max =====
  {
    id: 3,
    product_id: 2,
    sku: "IP15PM-256GB-TITAN",
    price: 34990000,
    stock: 0,
    image:
      "https://images.unsplash.com/photo-1695638297240-2ea1126e2bd9?w=600",
  },
  {
    id: 4,
    product_id: 2,
    sku: "IP15PM-512GB-TITAN",
    price: 37990000,
    stock: 0,
    image:
      "https://images.unsplash.com/photo-1695638297240-2ea1126e2bd9?w=600",
  },

  // ===== MacBook Air M3 =====
  {
    id: 5,
    product_id: 3,
    sku: "MBA-M3-8GB-256GB",
    price: 28990000,
    stock: 4,
    image:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600",
  },
  {
    id: 6,
    product_id: 3,
    sku: "MBA-M3-16GB-512GB",
    price: 32990000,
    stock: 4,
    image:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600",
  },

  // ===== Sony WH-1000XM5 =====
  {
    id: 7,
    product_id: 4,
    sku: "SONY-XM5-BLACK",
    price: 9490000,
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
  },
  {
    id: 8,
    product_id: 4,
    sku: "SONY-XM5-SILVER",
    price: 9490000,
    stock: 10,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
  },

  // ===== Samsung Galaxy S25 Ultra =====
  {
    id: 9,
    product_id: 5,
    sku: "S25U-256GB-BLACK",
    price: 32990000,
    stock: 6,
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600",
  },
  {
    id: 10,
    product_id: 5,
    sku: "S25U-512GB-GREEN",
    price: 35990000,
    stock: 6,
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600",
  },
];

// Helpers
export const getVariantsByProductId = (productId) => {
  return productVariants.filter(
    (v) => v.product_id === Number(productId)
  );
};

export const getVariantById = (id) => {
  return productVariants.find((v) => v.id === Number(id));
};
