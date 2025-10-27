/**
 * Storybook configuration for the ProductWithAlternative component
 * This defines how the ProductWithAlternative component will appear in Storybook and what controls/options are available.
 */

import { faker } from '@faker-js/faker';
import ProductWithAlternative from './ProductWithAlternative';
import { action } from '@storybook/addon-actions';
import { DefaultArgs as DefaultProductArgs } from '../ProductCard/ProductCard.stories';

// Define the story configuration
export default {
  title: 'Product/Product With Alternative',
  component: ProductWithAlternative,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: {
        type: 'select',
        options: ['grid', 'list'],
      },
      description:
        "The display mode for the component. 'grid' for side-by-side (main product with first alternative), 'list' for stacked (main product followed by all alternatives).",
      table: {
        category: 'Display',
        defaultValue: { summary: 'grid' },
      },
    },
    product: {
      control: 'object',
      description: 'The main product data.',
      table: {
        category: 'Product Data',
      },
    },

    alternativeproducts: {
      control: 'object',
      description:
        'An array of alternative product data. Takes precedence over `alternativeProduct`. In "grid" mode, only the first item in this array is displayed alongside the main product. In "list" mode, all items are displayed.',
      table: {
        category: 'Product Data',
        defaultValue: { summary: '[]' },
      },
    },
    showremovebutton: {
      control: 'boolean',
      description: 'Whether to show the "Remove from cart" button (only works in list mode).',
      table: {
        category: 'Actions',
        defaultValue: { summary: 'false' },
      },
    },
    onremove: {
      control: false,
      description: 'Callback function when "Remove from cart" is clicked.',
      table: {
        category: 'Actions',
      },
    },
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#FAF9F5',
        },
      ],
    },
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

          return `<ProductWithAlternative\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
### Description
A component that displays a product alongside one or more alternative products for comparison.
It can be displayed in either 'grid' or 'list' mode.
In 'grid' mode, the main product is shown with the *first* available alternative.
In 'list' mode, the main product is followed by *all* available alternatives.

### When to Use
- When you want to show a product with suggested alternatives.
- When you want to compare a product with its primary alternative side-by-side ('grid' mode).
- When you want to provide users with a list of alternative options to consider ('list' mode).

### Usage

#### Basic Usage
\`\`\`jsx
import { ProductWithAlternative } from './components/ProductWithAlternative/ProductWithAlternative';

const mainProduct = {
  id: '123',
  name: 'Organic Bananas',
  price: 2.99,
  unit: 'lb',
  image: '/path/to/image.jpg',
  availability: {
    status: 'outOfStock',
    outofstocknotice: 'Out of stock. Available 13 Feb',
    alternativeaction: 'https://www.booker.co.uk',
    alternativelabel: 'View alternative products',
  },
};

const altProducts = [
  {
    id: '124',
    name: 'Conventional Bananas',
    price: 1.99,
    unit: 'lb',
    image: '/path/to/alternative-image.jpg',
  },
  {
    id: '125',
    name: 'Fair Trade Bananas',
    price: 2.49,
    unit: 'lb',
    image: '/path/to/fair-trade-bananas.jpg',
  }
];


// List mode (shows all alternatives from array)
<ProductWithAlternative
  mode="list"
  product={mainProduct}
  alternativeproducts={altProducts}
/>

\`\`\`
        `,
      },
    },
  },
};

// Template function for the stories
const Template = (args) => <ProductWithAlternative {...args} />;

// Default args for the component
const DefaultArgs = {
  mode: 'grid',
  product: {
    ...DefaultProductArgs,
    name: 'Premium Organic Coffee',
    availability: {
      status: 'outOfStock',
      outofstocknotice: 'Out of stock. Available 13 Feb',
      alternativeaction: action('alternative-url-clicked'),
      alternativelabel: 'View alternative products',
    },
  },
  alternativeproducts: [
    {
      ...DefaultProductArgs,
      name: 'Fair Trade Standard Coffee',
      price: 8.99,
    },
  ],
};

export const Default = Template.bind({});
Default.args = DefaultArgs;
Default.storyName = 'Grid Mode';

export const ListModeMultipleAlternatives = Template.bind({});
ListModeMultipleAlternatives.args = {
  ...DefaultArgs,
  mode: 'list',
  product: {
    ...DefaultProductArgs,
    name: 'Wholewheat Bread',
    availability: {
      status: 'outOfStock',
      outofstocknotice: 'Out of stock. Available 13 Feb',
      alternativeaction: action('alternative-url-clicked'),
      alternativelabel: 'View alternative products',
    },
  },
  alternativeproducts: [
    {
      ...DefaultProductArgs,
      name: 'Sourdough Bread',
    },
    {
      ...DefaultProductArgs,
      name: 'Multigrain Loaf',
    },
    {
      ...DefaultProductArgs,
      name: 'Rye Bread',
    },
  ],
};
ListModeMultipleAlternatives.storyName = 'List Mode - Multiple Alternatives';

export const ListModeWithSingleItemInArray = Template.bind({});
ListModeWithSingleItemInArray.args = {
  mode: 'list',
  product: {
    ...DefaultProductArgs,
    name: 'Espresso Machine',
    availability: {
      status: 'outOfStock',
      outofstocknotice: 'Out of stock. Available 13 Feb',
      alternativeaction: action('alternative-url-clicked'),
      alternativelabel: 'View alternative products',
    },
  },
  alternativeproducts: [
    {
      ...DefaultProductArgs,
      name: 'French Press Coffee Maker',
    },
  ],
};
ListModeWithSingleItemInArray.storyName =
  'List Mode - Single Alternative (in Array)';

export const WithRemoveButton = Template.bind({});
WithRemoveButton.args = {
  ...DefaultArgs,
  mode: 'list',
  showremovebutton: true,
  onremove: action('remove-clicked'),
  product: {
    ...DefaultProductArgs,
    name: 'Oyster Bay Pinot Noir 750ml',
    availability: {
      status: 'outOfStock',
      alternativeaction: action('alternative-url-clicked'),
      alternativelabel: 'View alternative products',
    },
  },
  alternativeproducts: [
    {
      ...DefaultProductArgs,
      name: 'Beefsteak Club Reserve Malbec 750ml',
      price: 55.49,
      availability: {
        status: 'inStock',
      },
    },
  ],
};
WithRemoveButton.storyName = 'With Remove from Cart Button (List Mode Only)';
