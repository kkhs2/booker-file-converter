/**
 * Storybook configuration for the AddToWishlist component
 * This defines how the AddToWishlist component will appear in Storybook and what controls/options are available.
 */

// Import the AddToWishlist component
import AddToWishlist from './AddToWishlist';

// Define the story configuration
export default {
  title: 'Components/AddToWishlist',
  component: AddToWishlist,
  tags: ['autodocs'],
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
              // Handle special cases
              if (typeof value === 'boolean') {
                return value ? key : null;
              }
              if (typeof value === 'string') {
                return `${key}="${value}"`;
              }
              if (typeof value === 'function') {
                return `${key}={${value.name || 'function'}}`;
              }
              return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<AddToWishlist\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
The AddToWishlist component provides a button interface for adding multiple products to user wishlists.
It displays a dropdown with existing wishlists and allows creating new lists.

### Features
- Add multiple products to existing wishlists
- Create new wishlists on the fly
- Manage wishlist interactions
- Keyboard navigation support (Escape to close)
- Click outside to close dropdown

### Usage
The component expects an array of product IDs and wishlist data, and exposes an onaddtowishlist callback
for handling the actual wishlist operations.
        `,
      },
    },
  },

  // Define controls (props) for the AddToWishlist component
  argTypes: {
    productids: {
      control: 'object',
      description: 'Array of product IDs to add to wishlist',
      table: {
        defaultValue: {
          summary: '[]',
        },
      },
    },

    wishlists: {
      control: 'object',
      description:
        'Array of wishlist objects with name, count, and selected properties',
      table: {
        defaultValue: {
          summary: '[]',
        },
      },
    },

    onaddtowishlist: {
      action: 'added to wishlist',
      description: 'Callback function when items are added to wishlist',
    },

    oncreatenewlist: {
      action: 'created new list',
      description: 'Callback function when a new list is created',
    },

    classname: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        defaultValue: {
          summary: '',
        },
      },
    },
  },
};

/**
 * Template for rendering the AddToWishlist component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => AddToWishlist(args);

/**
 * Default AddToWishlist story.
 * Demonstrates the component with sample wishlist data.
 */
export const Default = Template.bind({});
Default.args = {
  productids: ['product-1', 'product-2', 'product-3'],
  wishlists: [
    { name: 'Go Live', count: 6, selected: false },
    { name: 'Click and Collect', count: 8, selected: false },
    { name: 'Redesign', count: 0, selected: false },
    { name: 'Delivery', count: 6, selected: false },
  ],
};

/**
 * Empty Wishlists story.
 * Demonstrates the component with no existing wishlists.
 */
export const EmptyWishlists = Template.bind({});
EmptyWishlists.args = {
  productids: ['product-1', 'product-2'],
  wishlists: [],
};

/**
 * Single Product story.
 * Demonstrates the component with a single product.
 */
export const SingleProduct = Template.bind({});
SingleProduct.args = {
  productids: ['product-1'],
  wishlists: [
    { name: 'My Favorites', count: 5, selected: false },
    { name: 'Shopping List', count: 12, selected: true },
  ],
};

/**
 * Many Wishlists story.
 * Demonstrates the component with many wishlist options.
 */
export const ManyWishlists = Template.bind({});
ManyWishlists.args = {
  productids: ['product-1', 'product-2', 'product-3', 'product-4'],
  wishlists: [
    { name: 'Go Live', count: 6, selected: false },
    { name: 'Click and Collect', count: 8, selected: false },
    { name: 'Redesign', count: 0, selected: false },
    { name: 'Delivery', count: 6, selected: false },
    { name: 'Favorites', count: 23, selected: true },
    { name: 'Weekend Projects', count: 4, selected: false },
    { name: 'Gift Ideas', count: 11, selected: false },
    { name: 'Home Improvement', count: 7, selected: false },
  ],
};

/**
 * With Custom Classes story.
 * Demonstrates the component with custom styling.
 */
export const WithCustomClasses = Template.bind({});
WithCustomClasses.args = {
  productids: ['product-1', 'product-2'],
  wishlists: [
    { name: 'Go Live', count: 6, selected: false },
    { name: 'Click and Collect', count: 8, selected: false },
  ],
  classname: 'tw:max-w-xs',
};
