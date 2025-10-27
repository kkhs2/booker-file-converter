const allergens = {
  label: 'Allergens',
  items: [
    { label: 'No gluten', value: 'option1', counter: 45 },
    {
      label: 'No cereals containing gluten',
      value: 'option2',
      counter: 120,
    },
    {
      label: 'No sulphur dioxide',
      value: 'option3',
      counter: 134,
    },
    { label: 'No wheat', value: 'option4', counter: 42 },
    { label: 'No soy', value: 'option5', counter: 86 },
    { label: 'No milk', value: 'option6', counter: 54 },
    { label: 'No peanuts', value: 'option7', counter: 29 },
  ],
};

const brand = {
  label: 'Brand',
  items: [
    { label: 'Absolut', value: 'absolut', counter: 23 },
    { label: 'Ciroc', value: 'ciroc', counter: 23 },
    { label: 'Smirnoff', value: 'smirnoff', counter: 23 },
  ],
};

const department = {
  label: 'Department',
  items: [
    { label: 'Brandy & Cognac', value: 'brandy-cognac', counter: 13 },
    { label: 'Cocktail mixers', value: 'cocktail-mixers', counter: 16 },
    { label: 'Gin', value: 'gin', counter: 26 },
  ],
};

const dietLifestyle = {
  label: 'Diet & Lifestyle',
  items: [
    { label: 'Halal', value: 'halal', counter: 45 },
    { label: 'Vegan', value: 'vegan', counter: 120 },
    { label: 'Vegetarian', value: 'vegetarian', counter: 134 },
    { label: 'Gluten-free', value: 'gluten-free', counter: 42 },
    { label: 'No added sugar', value: 'no-added-sugar', counter: 86 },
    {
      label: 'No artificial colours',
      value: 'no-artificial-colours',
      counter: 54,
    },
    {
      label: 'No artificial flavours',
      value: 'no-artificial-flavours',
      counter: 29,
    },
    {
      label: 'No artificial sweeteners',
      value: 'no-artificial-sweeteners',
      counter: 36,
    },
    {
      label: 'No genetically modified ingredients',
      value: 'no-caffeine',
      counter: 74,
    },
  ],
};

const offersPrice = {
  label: 'Offers & price',
  items: [
    { label: 'All offers', value: 'all-offers', counter: 23 },
    { label: 'Club offers', value: 'club-offers', counter: 13 },
    { label: 'Multi-buy', value: 'multibuy', counter: 5 },
    { label: 'Price marked', value: 'price-marked', counter: 12 },
    { label: 'Hide price marked', value: 'hide-price-marked', counter: 23 },
  ],
};

const country = {
  label: 'Country',

  list1: {
    title: 'Subheading label',
    items: [
      { label: 'United Kingdom', value: 'uk', counter: 12 },
      { label: 'France', value: 'france', counter: 5 },
      { label: 'Chile', value: 'chile', counter: 21 },
    ],
  },

  list2: {
    title: 'Subheading label',
    items: [{ label: 'Nicaragua', value: 'nicaragua', counter: 23 }],
  },
};

const packaging = {
  label: 'Packaging',
  group1: {
    title: 'Subheading label',
    items: [
      { label: 'Glass bottle', value: 'glass-bottle', counter: 12 },
      { label: 'Plastic bottle', value: 'plastic-bottle', counter: 5 },
      { label: 'Can', value: 'can', counter: 21 },
    ],
  },
  group2: {
    title: 'Subheading label',
    items: [
      { label: 'Screwcap', value: 'screwcap', counter: 23 },
      { label: 'Other', value: 'other', counter: 23 },
    ],
  },
};

const marketplaceOnline = {
  label: 'Marketplace & online',
  items: [
    { label: 'Online exclusive', value: 'online-exclusive', counter: 12 },
    { label: 'Marketplace', value: 'marketplace', counter: 5 },
    {
      label: 'Hide online exclusives',
      value: 'hide-online-exclusives',
      counter: 5,
    },
    { label: 'Hide marketplace', value: 'hide-marketplace', counter: 12 },
  ],
};

const recycling = {
  label: 'Recycling',
  group1: {
    title: 'Subheading label',
    items: [
      { label: 'Recyclable', value: 'recyclable', counter: 12 },
      { label: 'Not recyclable', value: 'not-recyclable', counter: 5 },
      { label: 'No information', value: 'no-information', counter: 21 },
    ],
  },
  group2: {
    title: 'Subheading label',
    items: [
      {
        label: 'Check local recyclable',
        value: 'check-local-recyclable',
        counter: 12,
      },
      {
        label: 'Check local non-recyclable',
        value: 'check-local-non-recyclable',
        counter: 5,
      },
      {
        label: 'Check local recyclable',
        value: 'check-local-recyclable',
        counter: 23,
      },
    ],
  },
};

const storage = {
  label: 'Storage',
  items: [
    { label: 'Ambient', value: 'ambient', counter: 12 },
    { label: 'Chilled', value: 'chilled', counter: 5 },
    { label: 'Frozen', value: 'frozen', counter: 21 },
  ],
};

const nonHfss2 = {
  label: 'Non-HFSS',
  variant: 'multi', // Override mobile single-select behavior to allow multi-select
  items: [
    { label: 'Non-HFSS', value: 'non-hfss', counter: 12 },
    { label: 'HFSS', value: 'hfss', counter: 5 },
  ],
};

// New structure for toggleable filters
const previouslyOrdered = {
  label: 'Previously ordered',
  value: false,
};

const nonHfss = {
  label: 'Non-HFSS',
  value: false,
  tooltip:
    'New regulation is coming into effect restricting the amount of products with High Fat Salt and Sugar (HFSS) that may be purchased. Selecting this filter will show products that are not affected by the regulation.',
};

export const initialFilters = {
  allergens,
  brand,
  department,
  dietLifestyle,
  offersPrice,
  previouslyOrdered,
  // nonHfss,
  nonHfss2,
  country,
  packaging,
  marketplaceOnline,
  recycling,
  storage,
};
