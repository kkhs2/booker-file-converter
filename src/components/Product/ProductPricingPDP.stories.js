/**
 * Storybook configuration for the ProductPricingPDP component
 * This defines how the ProductPricingPDP component will appear in Storybook and what controls/options are available.
 */

import { ProductPricingPDP } from './ProductPricingPDP';

export default {
  title: 'Product/Product pricing for PDP',
  component: ProductPricingPDP,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Product Pricing PDP Component

A component that displays product pricing information specifically for PDP (Product Detail Page) pages.
It shows various price-related information including:
- Main product price
- Price with VAT
- Price per item
- Recommended retail price (RPP)
- Price POR
        `,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#FAF9F5',
        },
      ],
    },
  },
  argTypes: {
    price: {
      control: 'text',
      description: 'Main price of the product',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: null },
      },
    },
    pricewithvat: {
      control: 'text',
      description: 'Price of the product with VAT',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: null },
      },
    },
    priceperitem: {
      control: 'text',
      description: 'Price per item',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: null },
      },
    },
    pricerpp: {
      control: 'text',
      description: 'Recommended retail price',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: null },
      },
    },
    pricepor: {
      control: 'text',
      description: 'Price POR',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: null },
      },
    },
    classname: {
      control: 'text',
      description: 'Additional classes',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: null },
      },
    },
  },
};

/**
 * Default story.
 * Demonstrates basic usage with sample pricing data.
 */
export const Default = {
  args: {
    price: '£24.99',
    pricewithvat: '£29.99',
    priceperitem: '£2.49',
    pricerpp: {
      value: '£34.99',
    },
    pricepor: {
      value: '28.6%',
    },
  },
  render: (args) => (
    <div className="tw:max-w-[800px]">
      <ProductPricingPDP {...args} />
    </div>
  ),
};

/**
 * With Long Prices story.
 * Demonstrates the component with longer price values.
 */
export const WithLongPrices = {
  args: {
    price: '£1,024.99',
    pricewithvat: '£1,229.99',
    priceperitem: '£102.49',
    pricerpp: {
      value: '£1,499.99',
      locked: true,
    },
    pricepor: {
      value: '31.6%',
      locked: true,
    },
  },
  render: (args) => (
    <div className="tw:max-w-[800px]">
      <ProductPricingPDP {...args} />
    </div>
  ),
};
