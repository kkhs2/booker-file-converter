import { faker } from '@faker-js/faker';

export const productImages = [
  './images/search/41sHlEhACwL.jpg',
  './images/search/81igtG3QpxL.jpg',
  './images/search/324617-Nutella-750g.jpg',
  './images/search/5740900805408_0_XL.jpg',
  './images/search/dy422.jpg.webp',
  './images/search/heinz_baked_beanz_fridge_pack_1kg_51681_T1.jpg',
  './images/search/Hellmanns-Real-Mayonnaise-430ml.png',
  './images/search/lurpak_spreadable_slightly_salted_500g_8648_T5.jpg',
  './images/search/snapshotimagehandler_1391346249.jpeg',
  './images/search/th.jpeg',
  './images/products/image98.png',
  './images/products/image61.png',
  './images/products/image47.png',
  './images/products/image37.png',
  './images/products/image17.png',
  './images/products/image14.png',
  './images/products/image12.png',
  './images/products/image11.png',
  './images/products/image09.png',
  './images/products/image8.png',
  './images/products/image7.png',
  './images/products/image6.png',
  './images/products/image4.png',
  './images/products/image3.png',
  './images/products/image0.png',
];

export const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * productImages.length);
  return productImages[randomIndex];
};

// get random image from /assets/drinks folder
export const getRandomDrinksImage = () => {
  const drinksImages = [
    './images/drinks/584ecae2c59affc137b85d8fd194f4f0e9dd51fc.png',
    './images/drinks/2d7200aade52c381e650ae9363ebe271df162c40.png',
    './images/drinks/7a8349962221f32c4517ce5b8526237470876bed.png',
    './images/drinks/8c0a1f724ff47424c7b73865d84b9950aacb1f54.png',
    './images/drinks/41edeba3a5102cd21496937d5071eb9c47768aa4.png',
    './images/drinks/690efcc9f272cff1862594d2bc25afa0518d2013.png',
    './images/drinks/395051ddbf29da3c0c059028809dc5ceac8deb55.png',
    './images/drinks/ab61a001d173b0cf7c2eabd2bc789b8b0b327fa9.png',
    './images/drinks/ac28da1805c94e2f3fdea5c5d5c7cbb7e4e8c2a8.png',
    './images/drinks/b01e8307225bb37d2fd492a808514ef6904c60cf.png',
    './images/drinks/bdcb84645405f7162d8e749996548d66b1df904f.png',
    './images/drinks/c3e0327b5924a6e5aebd27771361a83f9879964d.png',
    './images/drinks/d38a0d1b8b4d7d55b0a739b158190f4d18005f7b.png',
    './images/drinks/dd6b30fb2695179d755f21df7fdf8f73a2b1f05f.png',
    './images/drinks/e1f55bb4a977bb8a10c28b06fa13b95eb15f6972.png',
    './images/drinks/f1aefe01389f2fc23c58342a99c1745141c4cf5f.png',
  ];
  const randomIndex = Math.floor(Math.random() * drinksImages.length);
  return drinksImages[randomIndex];
};

export const getRandomNavigationCardImage = () => {
  const navigationCardImages = [
    './images/navigation-cards/5c221ef9-4a4c-43f7-90ca-ff8d55e84f2a.jpg',
    './images/navigation-cards/0ef16111-f058-4092-9a95-4e720fd9a049.jpg',
    './images/navigation-cards/77790e1f-4e44-462c-9183-61ab67c7a0bc.jpg',
    './images/navigation-cards/100001.jpg',
    './images/navigation-cards/100005.jpg',
    './images/navigation-cards/100045.jpg',
    './images/navigation-cards/100050.jpg',
    './images/navigation-cards/100055.jpg',
    './images/navigation-cards/100070.jpg',
    './images/navigation-cards/100090.jpg',
    './images/navigation-cards/100105.jpg',
    './images/navigation-cards/a19164f8-d6b2-4984-b207-fd4b84b2f7d1.jpg',
  ];
  const randomIndex = Math.floor(Math.random() * navigationCardImages.length);
  return navigationCardImages[randomIndex];
};

// Array of products for the search results
export const SearchProducts = [
  {
    name: 'Mermaid 41cm/16" Baking Tray Hard Anodised Aluminium',
    pkg: 'Case of 6',
    price: 24.99,
    image: getRandomImage(),
  },
  {
    name: 'Heinz Baked Beans Fridge Pack 1kg',
    pkg: 'Case of 6',
    price: 14.99,
    rrp: 3.99,
    image: getRandomImage(),
  },
  {
    name: 'Heinz Baked Beans Fridge Pack 1kg',
    pkg: 'Case of 1',
    price: 2.56,
    rrp: 3.99,
    image: getRandomImage(),
  },
  {
    name: "Chef's Essentials Baked Beans in Tomato Sauce 2.61kg",
    pkg: 'Case of 6',
    price: 15.99,
    image: getRandomImage(),
  },
  {
    name: 'Dr. Oetker Baking Powder 170g',
    pkg: 'Case of 4',
    price: 4.35,
    rrp: 1.65,
    image: getRandomImage(),
  },
  {
    name: 'Kerrymaid Premium Baking Block 250g',
    price: 30.95,
    image: getRandomImage(),
  },
  {
    name: 'Cadbury Dairy Milk Chocolate Bar 200g',
    pkg: 'Case of 12',
    price: 18.99,
    rrp: 2.0,
    image: getRandomImage(),
  },
  {
    name: 'Twinings English Breakfast Tea Bags 100 Pack',
    pkg: 'Case of 5',
    price: 22.5,
    rrp: 5.99,
    image: getRandomImage(),
  },
  {
    name: 'Nutella Hazelnut Spread 750g',
    pkg: 'Case of 6',
    price: 34.99,
    rrp: 6.99,
    image: getRandomImage(),
  },
  {
    name: 'Walkers Ready Salted Crisps 32.5g',
    pkg: 'Case of 48',
    price: 19.99,
    rrp: 0.5,
    image: getRandomImage(),
  },
  {
    name: 'Nescafé Gold Blend Coffee 200g',
    pkg: 'Case of 6',
    price: 47.99,
    rrp: 9.99,
    image: getRandomImage(),
  },
  {
    name: 'Hellmann’s Real Mayonnaise 430ml',
    pkg: 'Case of 8',
    price: 16.99,
    rrp: 3.49,
    image: getRandomImage(),
  },
  {
    name: 'Oreo Original Biscuits 154g',
    pkg: 'Case of 24',
    price: 29.99,
    rrp: 1.5,
    image: getRandomImage(),
  },
  {
    name: 'Coca-Cola Original Taste 330ml Can',
    pkg: 'Case of 24',
    price: 16.8,
    rrp: 0.99,
    image: getRandomImage(),
  },
  {
    name: 'Lurpak Spreadable Butter 500g',
    pkg: 'Case of 6',
    price: 27.5,
    rrp: 5.99,
    image: getRandomImage(),
  },
];

export const getRandomProductName = () => {
  return `${faker.commerce.productAdjective()} ${faker.commerce.product()} ${faker.commerce.productName()} ${faker.commerce.productMaterial()} ${faker.commerce.product()} ${faker.commerce.productName()}`;
};

const sizeOptions = [
  '500ml',
  '1L',
  '2L',
  '3L',
  '4L',
  '5L',
  '75cl',
  'Av 7kg',
  '300g',
];

// Helper function to generate a single product
export const generateProduct = () => ({
  code: faker.string.numeric(5),
  name: getRandomProductName(),
  image: getRandomImage(),
  qtw: faker.number.int({ min: 1, max: 10 }),
  itemsPerCase: faker.number.int({ min: 1, max: 10 }),
  price: faker.commerce.price({ min: 1, max: 100, dec: 2 }),
  casePrice: faker.commerce.price({ min: 10, max: 200, dec: 2 }),
  size: faker.helpers.arrayElement(sizeOptions),

  total: (
    faker.number.int({ min: 1, max: 10 }) *
    parseFloat(faker.commerce.price({ min: 10, max: 200, dec: 2 }))
  ).toFixed(2),
});

// Array of products for the checkout estimated delivery section grouped by category
export const CheckoutProductsList = [
  {
    category: 'Alcohol',
    products: [generateProduct(), generateProduct()],
  },
  {
    category: 'Butchery',
    products: Array.from({ length: 5 }, generateProduct),
  },
  {
    category: 'Confectionary',
    products: Array.from({ length: 2 }, generateProduct),
  },
  {
    category: 'Fresh',
    products: Array.from({ length: 5 }, generateProduct),
  },
];

export const sortOptions = {
  label: 'Sort by',
  items: [
    { label: 'Best-sellers', value: 'best-sellers' },
    { label: 'Lowest price', value: 'lowest-price' },
    {
      label: 'Lowest price per item',
      value: 'lowest-price-per-item',
    },
    { label: 'Highest price', value: 'highest-price' },
    {
      label: 'Highest price per item',
      value: 'highest-price-per-item',
    },
    {
      label: 'Highest Profit on Return (POR)',
      value: 'highest-por',
    },
    { label: 'New products', value: 'new-products' },
    {
      label: 'Recently purchased',
      value: 'recently-purchased',
    },
    {
      label: 'Alphabetical (A-Z)',
      value: 'alphabetical-a-z',
    },
  ],
};

// Outstanding Invoices Data
export const generateOutstandingInvoices = (count = 10) => {
  return Array.from({ length: count }, (_, index) => {
    // Cycle through statuses and branches to ensure even distribution
    const status = ['Overdue', 'Direct Debit', 'Available'][index % 3];
    const branch = ['London', 'Manchester', 'Birmingham'][index % 3];

    return {
      invoiceNo: faker.string.alphanumeric(10).toUpperCase(),
      poNumber: `SSW-SSWPP ${faker.number.int({ min: 10000000, max: 99999999 })}`,
      status,
      date: faker.date.past().toISOString().split('T')[0],
      dueDate: faker.date.future().toISOString().split('T')[0],
      dueIn: `${faker.number.int({ min: 1, max: 30 })} days`,
      type: faker.helpers.arrayElement(['Direct Delivered', 'Marketplace']),
      branch,
      gross: faker.finance.amount({ min: 100, max: 1000, dec: 2, symbol: '£' }),
      net: faker.finance.amount({ min: 50, max: 900, dec: 2, symbol: '£' }),
      paid: '£0.00',
      balance: faker.finance.amount({ min: 0, max: 500, dec: 2, symbol: '£' }),
      isLocked: status === 'Direct Debit' || status === 'On Order',
    };
  });
};

// Paid Invoices Data
export const generatePaidInvoices = (count = 10) => {
  return Array.from({ length: count }, () => ({
    invoiceNo: faker.string.alphanumeric(10).toUpperCase(),
    poNumber: `SSW-SSWPP ${faker.number.int({ min: 10000000, max: 99999999 })}`,
    date: faker.date.past().toISOString().split('T')[0],
    totalItems: faker.number.int({ min: 1, max: 100 }),
    total5PercentGoodsExVAT: faker.finance.amount({
      min: 5,
      max: 50,
      dec: 2,
      symbol: '£',
    }),
    vat5: faker.finance.amount({ min: 5, max: 100, dec: 2, symbol: '£' }),
    total20PercentGoodsExVAT: faker.finance.amount({
      min: 20,
      max: 400,
      dec: 2,
      symbol: '£',
    }),
    vat20: faker.finance.amount({ min: 5, max: 200, dec: 2, symbol: '£' }),
    goods0: faker.finance.amount({ min: 50, max: 500, dec: 2, symbol: '£' }),
    totalGoods: faker.finance.amount({
      min: 200,
      max: 2000,
      dec: 2,
      symbol: '£',
    }),
    totalVAT: faker.finance.amount({ min: 50, max: 300, dec: 2, symbol: '£' }),
    invoiceTotalValue: faker.finance.amount({
      min: 50,
      max: 2000,
      dec: 2,
      symbol: '£',
    }),
  }));
};

// Central Billing Statements Data
export const generateCentralBillingStatements = (count = 10) => {
  return Array.from({ length: count }, () => ({
    date: faker.date.past().toISOString().split('T')[0],
    numberOfInvoices: faker.number.int({ min: 1, max: 50 }),
    totalGoods: faker.finance.amount({
      min: 1000,
      max: 10000,
      dec: 2,
      symbol: '£',
    }),
    totalVAT: faker.finance.amount({
      min: 200,
      max: 2000,
      dec: 2,
      symbol: '£',
    }),
    invoiceTotalValue: faker.finance.amount({
      min: 50,
      max: 2000,
      dec: 2,
      symbol: '£',
    }),
  }));
};

// Credit Dashboard Data Generator
export const generateCreditDashboardData = (state) => {
  const configs = {
    'all-types': {
      Overdue: { count: 3, invoices: [] },
      'Direct Debit': { count: 3, invoices: [] },
      Available: { count: 1, invoices: [] },
      'On Order': { count: 1, invoices: [] },
    },
    'no-outstanding': {
      Overdue: { count: 0, invoices: [] },
      'Direct Debit': { count: 0, invoices: [] },
      Available: { count: 0, invoices: [] },
      'On Order': { count: 0, invoices: [] },
    },
    'available-to-pay': {
      Overdue: { count: 0, invoices: [] },
      'Direct Debit': { count: 0, invoices: [] },
      Available: { count: 1, invoices: [] },
      'On Order': { count: 1, invoices: [] },
    },
    overdue: {
      Overdue: { count: 3, invoices: [] },
      'Direct Debit': { count: 3, invoices: [] },
      Available: { count: 0, invoices: [] },
      'On Order': { count: 0, invoices: [] },
    },
    'credit-suspended': {
      Overdue: { count: 3, invoices: [] },
      'Direct Debit': { count: 3, invoices: [] },
      Available: { count: 0, invoices: [] },
      'On Order': { count: 0, invoices: [] },
    },
    'fully-suspended': {
      Overdue: { count: 3, invoices: [] },
      'Direct Debit': { count: 0, invoices: [] },
      Available: { count: 0, invoices: [] },
      'On Order': { count: 0, invoices: [] },
    },
  };

  const stateConfig = configs[state];

  // Generate invoices for each status
  Object.keys(stateConfig).forEach((status) => {
    for (let i = 0; i < stateConfig[status].count; i++) {
      // Cycle through branches to ensure even distribution
      const branch = ['London', 'Manchester', 'Birmingham'][i % 3];

      stateConfig[status].invoices.push({
        invoiceNo: faker.string.alphanumeric(10).toUpperCase(),
        poNumber: `SSW-SSWPP ${faker.number.int({ min: 10000000, max: 99999999 })}`,
        status: status,
        date: faker.date.past().toISOString().split('T')[0],
        dueDate: faker.date.future().toISOString().split('T')[0],
        dueIn: `${faker.number.int({ min: 1, max: 30 })} days`,
        type: faker.helpers.arrayElement(['Direct Delivered', 'Marketplace']),
        branch,
        gross: faker.finance.amount({
          min: 100,
          max: 1000,
          dec: 2,
          symbol: '£',
        }),
        net: faker.finance.amount({ min: 50, max: 900, dec: 2, symbol: '£' }),
        paid: '£0.00',
        balance: faker.finance.amount({
          min: 0,
          max: 1000,
          dec: 2,
          symbol: '£',
        }),
        isLocked: status === 'Direct Debit' || status === 'On Order',
      });
    }
  });

  return stateConfig;
};
