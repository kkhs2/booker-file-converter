/**
 * Storybook configuration for the ProductCardAllocations component
 * This defines how the ProductCardAllocations component will appear in Storybook and what controls/options are available.
 */

import { action } from '@storybook/addon-actions';
import ProductCardAllocations from './ProductCardAllocations';

// Define the story configuration
export default {
  title: 'Components/ProductCardAllocations',
  component: ProductCardAllocations,
  tags: ['autodocs'],
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
    destination: {
      control: { type: 'text' },
      description: 'Destination information',
      table: { category: 'Basic Information' },
    },
    ordergroup: {
      control: { type: 'text' },
      description: 'Order group',
      table: { category: 'Basic Information' },
    },
    offertext: {
      control: { type: 'text' },
      description: 'Offer text',
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
      control: { type: 'object' },
      description: 'Recommended retail price object',
      table: { category: 'Pricing' },
    },
    pricepor: {
      control: { type: 'object' },
      description: 'Price per order object',
      table: { category: 'Pricing' },
    },

    // Allocation
    allocated: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Number of items allocated',
      table: { category: 'Allocation' },
    },
    ordered: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Number of items ordered (unlocked variant only)',
      table: { category: 'Allocation' },
    },
    locked: {
      control: { type: 'boolean' },
      description: 'Whether the allocation is locked',
      table: { category: 'Allocation' },
    },

    // Events
    onallocationchange: {
      action: 'allocation-changed',
      description: 'Callback when allocation quantity changes',
      table: { category: 'Events' },
    },
    onaddtocart: {
      action: 'add-to-cart',
      description: 'Callback when adding to cart',
      table: { category: 'Events' },
    },

    // Configuration
    maxquantity: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Maximum quantity allowed',
      table: { category: 'Configuration' },
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
  image:
    'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=200&h=200&fit=crop&crop=center',
  id: '212321',
  caseinfo: 'Case of 4 x 2L',
  destination: 'CORE',
  ordergroup: 'Groceries',
  offertext: 'Any 2 for £2.95',
  price: '5.49',
  pricewithvat: '51.99',
  priceperunit: null,
  pricerpp: { value: '£2.15 RRP' },
  pricepor: { value: '31.9% POR' },
  allocated: 1,
  maxquantity: 999,
  onallocationchange: action('allocation-changed'),
  onaddtocart: action('add-to-cart'),
};

/**
 * Unlocked Variant
 * Shows the product card with enabled allocation controls and ordered information
 */
export const Unlocked = {
  args: {
    ...defaultArgs,
    locked: false,
    ordered: 1,
  },
};

/**
 * Locked Variant
 * Shows the product card with disabled allocation controls and both allocated and ordered values
 */
export const Locked = {
  args: {
    ...defaultArgs,
    locked: true,
    ordered: 1, // Show ordered info for locked variant too
  },
};

/**
 * With Higher Allocation
 * Shows the unlocked variant with a higher allocation number
 */
export const WithHigherAllocation = {
  args: {
    ...defaultArgs,
    locked: false,
    allocated: 5,
    ordered: 3,
  },
};

/**
 * Zero Allocation
 * Shows the unlocked variant with zero allocation
 */
export const ZeroAllocation = {
  args: {
    ...defaultArgs,
    locked: false,
    allocated: 0,
    ordered: 0,
  },
};
