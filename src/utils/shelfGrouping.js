/**
 * Shelf Grouping Utilities
 *
 * Utility functions for grouping products by shelf categories
 * and managing shelf-based product organization
 */

// Define shelf categories with their associated products
export const SHELF_CATEGORIES = {
  CONFECTIONARY: {
    id: 'confectionary',
    name: 'Confectionary',

    keywords: [
      'chocolate',
      'candy',
      'sweets',
      'biscuits',
      'cookies',
      'cake',
      'nutella',
      'oreo',
      'cadbury',
      'mars',
      'nestle',
      'haribo',
      'lindt',
    ],
  },
  CHILLED_MILK: {
    id: 'chilled-milk',
    name: 'Chilled flavoured milk',

    keywords: [
      'milk',
      'dairy',
      'cream',
      'yogurt',
      'cheese',
      'butter',
      'lurpak',
      'kerrymaid',
      'lactofree',
    ],
  },
  BAKING: {
    id: 'baking',
    name: 'Baking essentials',

    keywords: [
      'flour',
      'sugar',
      'baking powder',
      'baking',
      'essential',
      'ingredients',
      'dr. oetker',
    ],
  },
  TINS_CANS: {
    id: 'tins-cans',
    name: 'Tins & Cans',

    keywords: [
      'beans',
      'tomato',
      'soup',
      'tuna',
      'sweetcorn',
      'heinz',
      'baked beans',
    ],
  },
  SOFT_DRINKS: {
    id: 'soft-drinks',
    name: 'Soft Drinks',

    keywords: [
      'coca-cola',
      'coke',
      'pepsi',
      'fanta',
      'sprite',
      'drink',
      'soda',
      'juice',
    ],
  },
  TEA_COFFEE: {
    id: 'tea-coffee',
    name: 'Tea & Coffee',

    keywords: [
      'tea',
      'coffee',
      'nescafe',
      'twinings',
      'pg tips',
      'kenco',
      'taylors',
    ],
  },
  CRISPS_SNACKS: {
    id: 'crisps-snacks',
    name: 'Crisps & Snacks',

    keywords: [
      'crisps',
      'chips',
      'snacks',
      'walkers',
      'pringles',
      'doritos',
      'nuts',
    ],
  },
};

/**
 * Get shelf category for a product based on its name
 * @param {string} productName - The name of the product
 * @returns {string} - The shelf category ID
 */
export const getProductShelfCategory = (productName) => {
  if (!productName) return 'other';

  const name = productName.toLowerCase();

  for (const [categoryKey, category] of Object.entries(SHELF_CATEGORIES)) {
    if (category.keywords.some((keyword) => name.includes(keyword))) {
      return category.id;
    }
  }

  return 'other';
};

/**
 * Group products by shelf categories
 * @param {Array} products - Array of product objects
 * @returns {Object} - Object with shelf categories as keys and product arrays as values
 */
export const groupProductsByShelf = (products) => {
  const grouped = {};

  // Initialize all shelf categories
  Object.values(SHELF_CATEGORIES).forEach((category) => {
    grouped[category.id] = {
      category,
      products: [],
    };
  });

  // Add 'other' category for uncategorized products
  grouped.other = {
    category: {
      id: 'other',
      name: 'Other',
    },
    products: [],
  };

  // Group products
  products.forEach((product) => {
    const shelfCategory = getProductShelfCategory(product.name);
    if (grouped[shelfCategory]) {
      grouped[shelfCategory].products.push(product);
    } else {
      grouped.other.products.push(product);
    }
  });

  // Remove empty categories
  Object.keys(grouped).forEach((key) => {
    if (grouped[key].products.length === 0) {
      delete grouped[key];
    }
  });

  return grouped;
};

/**
 * Get all shelf categories with their product counts
 * @param {Array} products - Array of product objects
 * @returns {Array} - Array of category objects with product counts
 */
export const getShelfCategoriesWithCounts = (products) => {
  const grouped = groupProductsByShelf(products);

  return Object.values(grouped).map((group) => ({
    ...group.category,
    productCount: group.products.length,
  }));
};

/**
 * Filter products by shelf category
 * @param {Array} products - Array of product objects
 * @param {string} categoryId - The shelf category ID to filter by
 * @returns {Array} - Filtered array of products
 */
export const filterProductsByShelf = (products, categoryId) => {
  if (categoryId === 'all') return products;

  const grouped = groupProductsByShelf(products);
  return grouped[categoryId]?.products || [];
};

/**
 * Get shelf category display name
 * @param {string} categoryId - The shelf category ID
 * @returns {string} - The display name of the category
 */
export const getShelfCategoryName = (categoryId) => {
  const category = Object.values(SHELF_CATEGORIES).find(
    (cat) => cat.id === categoryId,
  );
  return category?.name || 'Other';
};

/**
 * Add shelf category information to products
 * @param {Array} products - Array of product objects
 * @returns {Array} - Products with shelf category information added
 */
export const addShelfInfoToProducts = (products) => {
  return products.map((product) => ({
    ...product,
    shelfCategory: getProductShelfCategory(product.name),
    shelfCategoryName: getShelfCategoryName(
      getProductShelfCategory(product.name),
    ),
  }));
};

/**
 * Get sorted shelf categories by product count (descending)
 * @param {Array} products - Array of product objects
 * @returns {Array} - Sorted array of category objects with counts
 */
export const getSortedShelfCategories = (products) => {
  const categoriesWithCounts = getShelfCategoriesWithCounts(products);

  return categoriesWithCounts.sort((a, b) => b.productCount - a.productCount);
};
