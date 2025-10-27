/**
 * Storybook configuration for the ProductList component
 * This defines how the ProductList component will appear in Storybook and what controls/options are available.
 */

// Import the component
import ProductList from './ProductList';
import { DefaultArgs as ProductDefaultArgs } from '..//ProductCard/ProductCard.stories';
import { faker } from '@faker-js/faker';
import { getRandomImage } from '../../../utils/mockData';
import { ProductListCollection } from './components/ProductListCollection';
import { OrderList } from './OrderList';
import { SearchWithList } from '../NavBar/components/SearchWithList';
import Icons from '../Icons/Icons';
import { convertPropsToString } from '../../../utils/storybookHelpers';
import { action } from '@storybook/addon-actions';

// Define the story configuration
export default {
  // The title under which the ProductList component will appear in Storybook's navigation
  title: 'Product/Product List',

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the component
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of items to be displayed in the list',
    },
    banner: {
      control: 'object',
      description: 'Banner object containing title and icon',
    },
    previousOrder: {
      control: 'object',
      description: 'Previous order object',
    },
  },

  // Added to override default story height if needed for this component
  parameters: {
    docs: {
      story: {
        height: '300px',
      },

      source: {
        transform: (source, storyContext) => {
          // Get the story args
          const { args } = storyContext;
          if (!args) return source;

          const cleanObject = (obj) => {
            if (Array.isArray(obj)) {
              return obj.map(cleanObject);
            }
            if (obj && typeof obj === 'object') {
              const cleaned = {};
              for (const [key, value] of Object.entries(obj)) {
                if (key.startsWith('__')) continue;

                cleaned[key] = cleanObject(value);
              }
              return cleaned;
            }
            return obj;
          };

          const props = convertPropsToString(cleanObject(args));

          return `<ProductList\n  ${props}\n/>`;
        },
      },
    },
  },
};

/**
 * Default story.
 * Demonstrates basic usage with default settings.
 */

const generateUniqueName = () => {
  return `${faker.commerce.productAdjective()} ${faker.commerce.product()} ${faker.commerce.productName()} ${faker.commerce.productMaterial()} ${faker.commerce.product()} ${faker.commerce.productName()}`;
};

const generateUUID = () => {
  return Math.floor(10000 + Math.random() * 90000);
};

const mockProductList = [
  {
    id: generateUUID(),
    name: generateUniqueName(),
    image: getRandomImage(),
    price: faker.commerce.price({
      min: 1,
      max: 100,
      dec: 2,
    }),
    pricerpp: {
      value: faker.commerce.price() + ' RPP',
      locked: true,
    },
    pricepor: {
      value: faker.commerce.price() + ' POR',
      locked: true,
    },
    tags: ['online-exclusive'],
    availability: {
      status: 'inStock',
      outofstocknotice: null,
      alternativeaction: false,
    },
    offer: {
      label: 'Discount Offer',
      date: 'until 28th Feb',
      prevText: 'Was £6.50',
      discountText: 'Save £1.60',
    },
    servings: ['Case of 4 x 2L', 'Serves 10'],
    dietaryinfo: ['vegan', 'gluten-free', 'dairy-free'],
  },
  {
    id: generateUUID(),
    name: generateUniqueName(),
    image: getRandomImage(),
    price: faker.commerce.price({
      min: 1,
      max: 100,
      dec: 2,
    }),
    pricerpp: {
      value: faker.commerce.price() + ' RPP',
    },
    availability: {
      status: 'inStock',
      outofstocknotice: null,
      alternativeaction: false,
    },
    servings: ['Case of 4 x 2L', 'Serves 10'],
    dietaryinfo: ['vegan', 'gluten-free', 'dairy-free'],
  },

  {
    id: generateUUID(),
    name: generateUniqueName(),
    image: getRandomImage(),
    price: faker.commerce.price({
      min: 1,
      max: 100,
      dec: 2,
    }),
    pricerpp: {
      value: faker.commerce.price() + ' RPP',
    },
    pricepor: {
      value: faker.commerce.price() + ' POR',
    },
    tags: ['online-exclusive'],
    availability: {
      status: 'lowStock',
      outofstocknotice: null,
    },
    tags: ['recent-order'],
    servings: ['2L'],
    dietaryinfo: ['vegan', 'gluten-free', 'dairy-free'],
  },
  {
    id: generateUUID(),
    name: generateUniqueName(),
    image: getRandomImage(),
    price: faker.commerce.price({
      min: 1,
      max: 100,
      dec: 2,
    }),
    priceperunit: faker.commerce.price() + ' per unit',
    tags: ['online-exclusive'],
    availability: {
      status: 'inStock',
      outofstocknotice: null,
      alternativeaction: false,
    },
    offer: {
      label: 'Low stock',
      date: 'until 28th Feb',
      variant: 'club',
      sublabel: 'Save £3 on Any 3 products from the Excellence Range',
    },
    servings: ['Case of 4 x 2L', 'Serves 10'],
    dietaryinfo: ['vegan', 'gluten-free', 'dairy-free'],
  },
  {
    id: generateUUID(),
    name: generateUniqueName(),
    image: getRandomImage(),
    price: faker.commerce.price({
      min: 1,
      max: 100,
      dec: 2,
    }),
    pricerpp: {
      value: faker.commerce.price() + ' RPP',
      locked: true,
    },
    pricepor: {
      value: faker.commerce.price() + ' POR',
      locked: true,
    },
    offer: {
      label: 'Low stock',
      date: 'until 28th Feb',
      variant: 'club',
      sublabel: 'Save £3 on Any 3 products from the Excellence Range',
    },
    servings: ['Case of 4 x 2L', 'Serves 10'],
    dietaryinfo: ['vegan', 'gluten-free', 'dairy-free'],
  },
  {
    id: generateUUID(),
    name: generateUniqueName(),
    image: getRandomImage(),
    price: faker.commerce.price({
      min: 1,
      max: 100,
      dec: 2,
    }),
    pricerpp: {
      value: faker.commerce.price() + ' RPP',
      locked: true,
    },
    pricepor: {
      value: faker.commerce.price() + ' POR',
      locked: true,
    },
    tags: ['online-exclusive'],
    availability: {
      status: 'inStock',
      outofstocknotice: null,
      alternativeaction: false,
    },
    offer: {
      label: 'Low stock',
      date: 'until 28th Feb',
      variant: 'club',
      sublabel: 'Save £3 on Any 3 products from the Excellence Range',
    },
    servings: ['Case of 4 x 2L', 'Serves 10'],
    dietaryinfo: ['vegan', 'gluten-free', 'dairy-free'],
  },
];

export const Default = {
  args: {
    banner: {
      title: 'Shopping list',
      icon: () => (
        <Icons.shoppingList classname="tw:self-start tw:w-[56px] tw:md:w-[90px] tw:h-auto tw:order-1 tw:shrink-0" />
      ),
      variant: 'product-list',
    },
    items: [
      ...mockProductList.map((product) => ({
        type: 'product',
        product,
      })),
      {
        type: 'product-with-alternative',
        product: {
          ...ProductDefaultArgs,

          id: generateUUID(),
          name: generateUniqueName(),
          image: getRandomImage(),
          availability: {
            status: 'outOfStock',
            outofstocknotice: 'Out of stock in all stores',
            alternativeaction: action('alternative-url-clicked'),
            alternativelabel: 'View alternative products',
          },
        },
        alternativeproducts: [
          {
            ...ProductDefaultArgs,
            id: generateUUID(),
            name: generateUniqueName(),
            image: getRandomImage(),
            pricepor: null,
            pricerpp: null,
            butchersnote: null,
          },
        ],
      },
    ],
    onremoveproducts: () => console.log('Remove Products clicked'),
    onaddalltobasket: () => console.log('Add All to Basket clicked'),
    onduplicate: (name) => console.log('Duplicate clicked', name),
    ondeletelist: () => console.log('Delete List clicked'),
  },
  render: (args) => (
    <div className="tw-container tw:bg-secondary-1000">
      <div className="tw:mx-auto tw:max-w-[1312px]">
        <ProductList {...args} />
      </div>
    </div>
  ),
};

export const MyLists = {
  parameters: {
    docs: {
      source: {
        transform: (source, storyContext) => {
          // Get the story args
          const { args } = storyContext;
          if (!args) return source;

          // Convert args to JSX props string
          const props = Object.entries(args)

            .map(([key, value]) => {
              if (typeof value === 'boolean') {
                return value ? key : null;
              }
              if (typeof value === 'string') {
                return `${key}="${value}"`;
              }
              return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<ProductListCollection\n  ${props}\n/>`;
        },
      },
    },
  },
  args: {
    title: 'My Lists',
    productlists: [
      {
        title: 'New List',
        productcount: 0,
        lastUsed: 'Last used 17 Jul 2024',
        products: [],
        onviewproductsclick: () => console.log('View Products clicked'),
        onadditemsclick: () => console.log('Add Items to List clicked'),
        onrename: (name) => console.log('Rename clicked', name),
        ondelete: () => console.log('Delete clicked'),
        onedit: () => console.log('Edit clicked'),
        onduplicate: (name) => console.log('Duplicate clicked', name),
      },
      {
        title: 'Shopping List',
        productcount: 32,
        lastUsed: 'Last used 17 Jul 2024',
        products: mockProductList.map((product) => ({ image: product.image })),
        onviewproductsclick: () => console.log('View Products clicked'),
        onadditemsclick: () => console.log('Add Items to List clicked'),
        onrename: (name) => console.log('Rename clicked', name),
        ondelete: () => console.log('Delete clicked'),
        onedit: () => console.log('Edit clicked'),
        onduplicate: (name) => console.log('Duplicate clicked', name),
      },
      {
        title: 'Easter',
        productcount: 7,
        lastUsed: 'Last used 17 Jul 2024',
        products: mockProductList.map((product) => ({ image: product.image })),
        onviewproductsclick: () => console.log('View Products clicked'),
        onadditemsclick: () => console.log('Add Items to List clicked'),
        onrename: (name) => console.log('Rename clicked', name),
        ondelete: () => console.log('Delete clicked'),
        onedit: () => console.log('Edit clicked'),
        onduplicate: (name) => console.log('Duplicate clicked', name),
      },
    ],
  },
  render: (args) => (
    <div className="tw-container tw:bg-secondary-1000">
      <div className="tw:mx-auto tw:max-w-[1312px]">
        <ProductListCollection {...args} />
      </div>
    </div>
  ),
};

export const PreviousOrders = {
  parameters: {
    docs: {
      source: {
        transform: (source, storyContext) => {
          // Get the story args
          const { args } = storyContext;
          if (!args) return source;

          // Convert args to JSX props string
          const props = Object.entries(args)

            .map(([key, value]) => {
              if (typeof value === 'boolean') {
                return value ? key : null;
              }
              if (typeof value === 'string') {
                return `${key}="${value}"`;
              }
              return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<OrderList\n  ${props}\n/>`;
        },
      },
    },
  },
  args: {
    title: 'Favourites',
    orders: [
      {
        id: generateUUID(),
        date: '20 Jul 2024',
        type: 'Click & Collect',
        orderno: '123456789',
        ref: 'Easter Order',
        tags: ['Online exclusive', 'Marketplace'],
      },
      {
        id: generateUUID(),
        date: '20 Jul 2024',
        type: 'Click & Collect',
        orderno: '123456789',
        ref: 'Restocking cellar',
        tags: ['Marketplace'],
      },
      {
        id: generateUUID(),
        date: '20 Jul 2024',
        type: 'Click & Collect',
        orderno: '123456789',
        ref: '',
        tags: [],
      },
      {
        id: generateUUID(),
        date: '20 Jul 2024',
        type: 'Delivery',
        orderno: '123456789',
        ref: '',
        tags: [],
      },
      {
        id: generateUUID(),
        date: '20 Jul 2024',
        type: 'Delivery',
        orderno: '123456789',
        ref: 'Summer menu',
        tags: [],
      },
      {
        id: generateUUID(),
        date: '20 Jul 2024',
        type: 'Click & Collect',
        orderno: '123456789',
        ref: 'Easter Order',
        tags: ['Online exclusive', 'Marketplace'],
      },
      {
        id: generateUUID(),
        date: '20 Jul 2024',
        type: 'Click & Collect',
        orderno: '123456789',
        ref: 'Restocking cellar',
        tags: ['Marketplace'],
      },
      {
        id: generateUUID(),
        date: '20 Jul 2024',
        type: 'Click & Collect',
        orderno: '123456789',
        ref: '',
        tags: [],
      },
      {
        id: generateUUID(),
        date: '20 Jul 2024',
        type: 'Delivery',
        orderno: '123456789',
        ref: '',
        tags: [],
      },
      {
        id: generateUUID(),
        date: '20 Jul 2024',
        type: 'Delivery',
        orderno: '123456789',
        ref: 'Summer menu',
        tags: [],
      },
      {
        id: generateUUID(),
        date: '20 Jul 2024',
        type: 'Click & Collect',
        orderno: '123456789',
        ref: 'Easter Order',
        tags: ['Online exclusive', 'Marketplace'],
      },
      {
        id: generateUUID(),
        date: '20 Jul 2024',
        type: 'Click & Collect',
        orderno: '123456789',
        ref: 'Restocking cellar',
        tags: ['Marketplace'],
      },
      {
        id: generateUUID(),
        date: '20 Jul 2024',
        type: 'Click & Collect',
        orderno: '123456789',
        ref: '',
        tags: [],
      },
    ],
  },
  render: (args) => (
    <div className="tw-container tw:bg-secondary-1000">
      <div className="tw:mx-auto tw:max-w-[1312px]">
        <OrderList {...args} />
        <SearchWithList
          onsearchwithlist={(items) => console.log('Search with list:', items)}
        />
      </div>
    </div>
  ),
};

export const PreviousOrder = {
  args: {
    banner: {
      title: 'Favourites',
      icon: null,
      variant: 'order-list',
    },
    previousorder: {
      id: generateUUID(),
      date: '20 Jul 2024',
      type: 'Click & Collect',
      orderno: '123456789',
      ref: 'Easter Order',
      tags: ['Online exclusive', 'Marketplace'],
    },
    items: [
      ...mockProductList.map((product) => ({
        type: 'product',
        product: { ...product, previouslyOrdered: 120 },
      })),
      {
        type: 'product-with-alternative',
        product: {
          ...ProductDefaultArgs,

          id: generateUUID(),
          name: generateUniqueName(),
          image: getRandomImage(),
          availability: {
            status: 'outOfStock',
            outofstocknotice: 'Out of stock in all stores',
            alternativeaction: action('alternative-url-clicked'),
            alternativelabel: 'View alternative products',
          },
        },
        alternativeproducts: [
          {
            ...ProductDefaultArgs,
            id: generateUUID(),
            name: generateUniqueName(),
            image: getRandomImage(),
            pricepor: null,
            pricerpp: null,
            butchersnote: null,
          },
        ],
      },
    ],
  },
  render: (args) => (
    <div className="tw-container tw:bg-secondary-1000">
      <div className="tw:mx-auto tw:max-w-[1312px]">
        <ProductList {...args} />
      </div>
    </div>
  ),
};
