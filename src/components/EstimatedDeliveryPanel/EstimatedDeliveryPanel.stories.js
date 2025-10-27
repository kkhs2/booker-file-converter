/**
 * Storybook configuration for the EstimatedDeliveryPanel component
 * This defines how the EstimatedDeliveryPanel component will appear in Storybook and what controls/options are available.
 */

// Import the component
import Icons from '../Icons/Icons';
import EstimatedDeliveryPanel from './EstimatedDeliveryPanel';
// Import mock data
import { CheckoutProductsList } from '../../../utils/mockData'; // Adjust path if necessary

// Define the story configuration
export default {
  // The title under which the EstimatedDeliveryPanel component will appear in Storybook's navigation
  title: 'Sections/Estimated Delivery Panel',

  // The component being documented
  component: EstimatedDeliveryPanel,

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Added to override default story height if needed for this component
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
      description: {
        component: `
The EstimatedDeliveryPanel component displays the estimated delivery date and time for an order. It can be expanded to show a table of products grouped by category.
### Props
- **title**: The main title for the delivery panel (e.g., 'Ambient delivery').
- **icon**: Icon element or function returning an icon. Displayed next to the title.
- **date**: The estimated delivery date string.
- **time**: The estimated delivery time string.
- **products**: An array of objects, where each object has a 'category' string and a 'products' array. Used to display items in the expandable table.
- **tag**: Optional tag to display next to the title.
- **classname**: Additional CSS classes for custom styling.

### Example Usage
\`\`\`jsx
<EstimatedDeliveryPanel
  title="Ambient Delivery"
  icon={() => <Icons.ambient />}
  date="Mon, 20 May"
  time="Estimated 4-5 pm"
  products={CheckoutProductsList}
/>
\`\`\`
`,
      },
    },
  },

  // Define controls (props) for the component
  argTypes: {
    title: {
      control: 'text',
      description:
        "The main title for the delivery panel (e.g., 'Ambient delivery').",
      defaultValue: 'Estimated Delivery',
    },
    icon: {
      control: false, // Icons are complex objects, disable control
      description:
        'Icon element or function returning an icon. Displayed next to the title.',
    },
    date: {
      control: 'text',
      description: 'The estimated delivery date string.',
      defaultValue: 'Mon, 20 May',
    },
    time: {
      control: 'text',
      description: 'The estimated delivery time string.',
      defaultValue: 'Between 9am - 5pm',
    },
    products: {
      control: false, // Disable control for complex data structures
      description:
        "An array of objects, each with 'category' and 'products' array.",
      // No defaultValue for complex data, provide in story args
    },
    defaultexpanded: {
      control: 'boolean',
      description:
        'Whether the panel should be expanded by default. Useful for initial state.',
      defaultValue: false,
    },
    tag: {
      control: 'text',
      description:
        'Optional tag to display next to the title (e.g., "Marketplace").',
      defaultValue: '',
    },
    classname: {
      control: 'text',
      description: 'Additional CSS classes for custom styling.',
      defaultValue: '',
    },
  },
};

/**
 * Default story.
 * Demonstrates basic usage with default settings and mock product data.
 */
export const Default = {
  args: {
    title: 'Ambient Delivery',
    icon: () => <Icons.ambient />,
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toDateString(), // Tomorrow
    time: 'Estimated 4-5 pm',
    products: CheckoutProductsList, // Use imported mock data
  },
};

/**
 * Another example story, e.g., for Chilled Delivery
 */
export const Chilled = {
  args: {
    title: 'Chilled Delivery',
    icon: () => <Icons.chilled />,
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toDateString(), // Tomorrow
    time: 'Estimated 4-5 pm',
    products: CheckoutProductsList.slice(0, 2), // Example with fewer categories
  },
};

/**
 * Story demonstrating the panel with a tag
 */
export const WithTag = {
  args: {
    title: 'Booker online exclusives',

    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toDateString(), // Tomorrow
    time: 'Estimated 4-5 pm',
    products: CheckoutProductsList,
    tag: 'Marketplace',
  },
};
