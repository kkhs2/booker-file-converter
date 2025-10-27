/**
 * Storybook configuration for the Sort Bar component
 * This defines how the Sort Bar component will appear in Storybook and what controls/options are available.
 */

// Import the component
import { convertPropsToString } from '../../../utils/storybookHelpers';
import SortBar from './SortBar';

// Define the story configuration
export default {
  // The title under which the Sort Bar component will appear in Storybook's navigation
  title: 'Components/Sort Bar',

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the component
  argTypes: {
    totalitems: {
      description: 'The total number of items to display',
      control: {
        type: 'number',
      },
    },
    categoryname: {
      description: 'Optional category name to display',
      control: {
        type: 'string',
      },
    },
    onprintproductlist: {
      description: 'Callback function to print the product list.',
      action: 'onprintproductlist', // Logs to Storybook actions tab
    },
    sortoptions: {
      description: 'Options for the sort dropdown.',
      control: {
        type: 'object',
      },
    },
    onsortchange: {
      description: 'Callback function triggered when the sort option changes.',
      action: 'onsortchange', // Logs to Storybook actions tab
    },
  },

  // Added to override default story height if needed for this component
  parameters: {
    docs: {
      story: {
        height: '600px',
      },
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const props = convertPropsToString(args);

          return `<SortBar ${props} />`;
        },
      },
      description: {
        component: `
        
 Sort Bar displays the total number of items and provides sorting options and view controls.
 
 ### Design Figma References
 - [Sort Bar UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library)
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
};

/**
 * Reusable render method.
 * The args object provides dynamic values for different stories.
 */
const Render = (args) => (
  <div className="tw-container">
    <div className="tw:mx-auto tw:max-w-[1312px]">
      <SortBar {...args} />
    </div>
  </div>
);

/**
 * Default story.
 * Demonstrates basic usage with default settings.
 */
export const Default = {
  args: {
    totalitems: 1002,
    sortoptions: {
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
        { label: 'New products', value: 'new-products', default: true },
        { label: 'Recently purchased', value: 'recently-purchased' },
        { label: 'Alphabetical (A-Z)', value: 'alphabetical-a-z' },
      ],
    },
    onprintproductlist: () => {
      console.log('Print product list clicked');
    },
    onsortchange: (value) => {
      console.log('Sort Changed:', value);
    },
  },
  render: Render,
};

/**
 * Story with Category Name.
 * Demonstrates the sort bar with a category name.
 */
export const WithCategoryName = {
  args: {
    totalitems: 1002,
    categoryname: 'Red Wine',
    sortoptions: {
      label: 'Sort by',
      items: [
        { label: 'Price: Low to High', value: 'price-low-high' },
        { label: 'Price: High to Low', value: 'price-high-low' },
        { label: 'Name: A to Z', value: 'name-a-z' },
      ],
    },
    onprintproductlist: () => {
      console.log('Print product list clicked');
    },
    onsortchange: (value) => {
      console.log('Limited Sort Changed:', value);
    },
  },
  render: Render,
};

/**
 * Story with Limited Sort Options.
 * Demonstrates the sort bar with fewer sorting options.
 */
export const WithLimitedSortOptions = {
  args: {
    totalitems: 567,
    sortoptions: {
      label: 'Sort by',
      items: [
        { label: 'Price: Low to High', value: 'price-low-high' },
        { label: 'Price: High to Low', value: 'price-high-low' },
        { label: 'Name: A to Z', value: 'name-a-z' },
      ],
    },
    onprintproductlist: () => {
      console.log('Print product list clicked');
    },
    onsortchange: (value) => {
      console.log('Limited Sort Changed:', value);
    },
  },
  render: Render,
};
