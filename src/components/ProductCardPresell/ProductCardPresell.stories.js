/**
 * Storybook configuration for the ProductCardPresell component
 * This defines how the ProductCardPresell component will appear in Storybook and what controls/options are available.
 */

import { faker } from '@faker-js/faker';
import ProductCardPresell from './ProductCardPresell';

// Define the story configuration
export default {
  title: 'Components/Presell/Product Card',
  component: ProductCardPresell,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#F5F4F0',
        },
        {
          name: 'dark',
          value: '#333333',
        },
      ],
    },
    docs: {
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const props = Object.entries(args)
            .map(([key, value]) => `${key}={${JSON.stringify(value)}}`)
            .join(' ');

          return `<ProductCardPresell ${props} />`;
        },
      },
      description: {
        component: `
The ProductCardPresell component displays a product with multiple drops available for pre-order.
It allows users to select quantities for each drop and view pricing information.

### Design Figma References
- [Product Card Presell UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=5310-33599&m=dev)
        `,
      },
    },
  },
  argTypes: {
    // Basic product information
    name: {
      control: { type: 'text' },
      description: 'Product name',
      table: { category: 'Basic Information' },
    },
    image: {
      control: { type: 'text' },
      description: 'Product image URL',
      table: { category: 'Basic Information' },
    },
    id: {
      control: { type: 'text' },
      description: 'Product ID',
      table: { category: 'Basic Information' },
    },
    caseinfo: {
      control: { type: 'text' },
      description: 'Case information',
      table: { category: 'Basic Information' },
    },
    presellinfo: {
      control: { type: 'text' },
      description: 'Pre-sell information',
      table: { category: 'Basic Information' },
    },
    additionalinfo: {
      control: { type: 'text' },
      description: 'Additional product information',
      table: { category: 'Basic Information' },
    },
    ordergroup: {
      control: { type: 'text' },
      description: 'Order group',
      table: { category: 'Basic Information' },
    },

    // Pricing
    price: {
      control: { type: 'text' },
      description: 'Main price',
      table: { category: 'Pricing' },
    },
    pricewithvat: {
      control: { type: 'text' },
      description: 'Price with VAT',
      table: { category: 'Pricing' },
    },
    priceperunit: {
      control: { type: 'text' },
      description: 'Price per unit',
      table: { category: 'Pricing' },
    },
    pricerpp: {
      control: { type: 'text' },
      description: 'Recommended retail price object',
      table: { category: 'Pricing' },
    },
    pricepor: {
      control: { type: 'text' },
      description: 'Price per order object',
      table: { category: 'Pricing' },
    },

    // Drops
    drops: {
      control: { type: 'object' },
      description:
        'Array of drop objects with id, label, date, quantity, and enabled status',
      table: { category: 'Drops' },
    },

    // Events
    onaddtodrop: {
      description:
        'Callback when adding/updating quantity for a specific drop (dropId, quantity)',
      table: { category: 'Events' },
    },

    // States
    ordereddisabled: {
      control: { type: 'boolean' },
      description:
        'When true, shows drops as "Ordered" with quantities and disables all interactions',
      table: { category: 'States' },
    },

    // Styling
    classname: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
      table: { category: 'Styling' },
    },
  },
};

// Default args for all stories
const defaultArgs = {
  name: 'Müller Semi Skimmed Milk 2 Litres',
  image: './images/search/41sHlEhACwL.jpg',
  id: '212321',
  caseinfo: 'Case of 4 x 2L',
  presellinfo: 'Pre-order only',
  additionalinfo: 'WIGIG Make 45.7% POR',
  ordergroup: 'Groceries',
  price: faker.commerce.price({
    min: 1,
    max: 100,
    dec: 2,
  }),
  pricewithvat: faker.commerce.price({
    min: 1,
    max: 100,
    dec: 2,
  }),
  priceperunit:
    faker.commerce.price({
      min: 1,
      max: 100,
      dec: 2,
    }) + ' per unit',

  pricerpp: {
    value:
      faker.commerce.price({
        min: 1,
        max: 100,
        dec: 2,
      }) + ' RPP',
    locked: Math.random() > 0.5, // Randomly lock the RPP
  },

  pricepor: {
    value:
      faker.commerce.price({
        min: 1,
        max: 100,
        dec: 2,
      }) + ' POR',
    locked: Math.random() > 0.5, // Randomly lock the POR
  },
};

const defaultDrops = [
  { id: 'drop1', label: 'Drop 1', date: 'w/c 10 Sep', enabled: true },
  { id: 'drop2', label: 'Drop 2', enabled: false },
  { id: 'drop3', label: 'Drop 3', enabled: false },
  { id: 'drop4', label: 'Drop 4', date: 'w/c 4 Oct', enabled: true },
  { id: 'drop5', label: 'Drop 5', enabled: false },
  { id: 'drop6', label: 'Drop 6', date: 'w/c 24 Oct', enabled: true },
  { id: 'drop7', label: 'Drop 7', date: 'w/c 4 Nov', enabled: true },
  { id: 'drop8', label: 'Drop 8', enabled: false },
];

/**
 * Default State
 * Shows the product card with multiple drop buttons, some enabled and some disabled
 */
export const Default = {
  args: {
    ...defaultArgs,
    drops: [...defaultDrops],
  },
};

/**
 * With Ordered Drops
 * Shows the product card with some drops already ordered
 */
export const WithOrderedDrops = {
  args: {
    ...defaultArgs,
    drops: [
      {
        id: 'drop1',
        label: 'Drop 1',
        date: 'w/c 10 Sep',
        enabled: true,
        quantity: 2,
      },
      { id: 'drop2', label: 'Drop 2', enabled: false },
      { id: 'drop3', label: 'Drop 3', enabled: false },
      {
        id: 'drop4',
        label: 'Drop 4',
        date: 'w/c 4 Oct',
        enabled: true,
        quantity: 1,
      },
      { id: 'drop5', label: 'Drop 5', enabled: false },
      {
        id: 'drop6',
        label: 'Drop 6',
        date: 'w/c 24 Oct',
        enabled: true,
        quantity: 3,
      },
      {
        id: 'drop7',
        label: 'Drop 7',
        date: 'w/c 4 Nov',
        enabled: true,
        quantity: 1,
      },
      { id: 'drop8', label: 'Drop 8', enabled: false },
    ],
  },
};

/**
 * Few Drops
 * Shows the product card with only a few drop buttons
 */
export const FewDrops = {
  args: {
    ...defaultArgs,
    drops: [
      { id: 'drop1', label: 'Drop 1', date: 'w/c 10 Sep', enabled: true },
      { id: 'drop2', label: 'Drop 2', date: 'w/c 17 Sep', enabled: true },
      { id: 'drop3', label: 'Drop 3', date: 'w/c 24 Sep', enabled: true },
    ],
  },
};

/**
 * Many Drops
 * Shows the product card with many drop buttons to test scrolling
 */
export const ManyDrops = {
  args: {
    ...defaultArgs,
    drops: [
      { id: 'drop1', label: 'Drop 1', date: 'w/c 10 Sep', enabled: true },
      { id: 'drop2', label: 'Drop 2', enabled: false },
      { id: 'drop3', label: 'Drop 3', enabled: false },
      { id: 'drop4', label: 'Drop 4', date: 'w/c 4 Oct', enabled: true },
      { id: 'drop5', label: 'Drop 5', enabled: false },
      { id: 'drop6', label: 'Drop 6', date: 'w/c 24 Oct', enabled: true },
      { id: 'drop7', label: 'Drop 7', date: 'w/c 4 Nov', enabled: true },
      { id: 'drop8', label: 'Drop 8', enabled: false },
      { id: 'drop9', label: 'Drop 9', date: 'w/c 11 Nov', enabled: true },
      { id: 'drop10', label: 'Drop 10', enabled: false },
      { id: 'drop11', label: 'Drop 11', date: 'w/c 18 Nov', enabled: true },
      { id: 'drop12', label: 'Drop 12', date: 'w/c 25 Nov', enabled: true },
    ],
  },
};

/**
 * All Disabled
 * Shows the product card with all drop buttons disabled
 */
export const AllDisabled = {
  args: {
    ...defaultArgs,
    drops: defaultDrops.map((drop) => ({ ...drop, enabled: false })),
  },
};

/**
 * Mixed State
 * Shows the product card with a mix of quantity controls and add buttons
 */
export const MixedState = {
  args: {
    ...defaultArgs,
    drops: [
      {
        id: 'drop1',
        label: 'Drop 1',
        date: 'w/c 10 Sep',
        enabled: true,
        quantity: 2,
      },
      { id: 'drop2', label: 'Drop 2', enabled: false },
      { id: 'drop3', label: 'Drop 3', enabled: true },
      {
        id: 'drop4',
        label: 'Drop 4',
        date: 'w/c 4 Oct',
        enabled: true,
        quantity: 1,
      },
      { id: 'drop5', label: 'Drop 5', enabled: true },
      { id: 'drop6', label: 'Drop 6', date: 'w/c 24 Oct', enabled: true },
      {
        id: 'drop7',
        label: 'Drop 7',
        date: 'w/c 4 Nov',
        enabled: true,
        quantity: 5,
      },
      { id: 'drop8', label: 'Drop 8', enabled: false },
    ],
  },
};

/**
 * Ordered Disabled State
 * Shows the product card with ordered drops in a disabled state - matches Figma design
 */
export const OrderedDisabled = {
  args: {
    ...defaultArgs,
    ordereddisabled: true,
    drops: [
      {
        id: 'drop1',
        label: 'Drop 1',
        date: 'w/c 10 Sep',
        enabled: true,
        quantity: 1,
      },
      { id: 'drop2', label: 'Drop 2', enabled: false, quantity: 0 },
      { id: 'drop3', label: 'Drop 3', enabled: false, quantity: 0 },
      {
        id: 'drop4',
        label: 'Drop 4',
        date: 'w/c 4 Oct',
        enabled: true,
        quantity: 1,
      },
      { id: 'drop5', label: 'Drop 5', enabled: false, quantity: 0 },
      {
        id: 'drop6',
        label: 'Drop 6',
        date: 'w/c 24 Oct',
        enabled: true,
        quantity: 1,
      },
      {
        id: 'drop7',
        label: 'Drop 7',
        date: 'w/c 4 Nov',
        enabled: true,
        quantity: 1,
      },
      { id: 'drop8', label: 'Drop 8', enabled: false, quantity: 0 },
    ],
  },
};
