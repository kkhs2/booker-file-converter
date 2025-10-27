/**
 * Storybook configuration for the DeliveryTimes component
 * This defines how the DeliveryTimes component will appear in Storybook and what controls/options are available.
 */

// Import the component
import DeliveryTimes from './DeliveryTimes';
import Icons from '../Icons/Icons';

// Define the story configuration
export default {
  // The title under which the DeliveryTimes component will appear in Storybook's navigation
  title: 'Components/Delivery Times',

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the component
  argTypes: {
    items: {
      control: {
        type: 'object',
      },
      description: 'Array of delivery items with type, deadline, and icon.',
    },
    info: {
      control: {
        type: 'text',
      },
      description: 'Information text for the expandable section.',
    },
    infolist: {
      control: {
        type: 'array',
      },
      description: 'Bullet points for delivery groups.',
    },
  },

  // Added to override default story height if needed for this component
  parameters: {
    docs: {
      description: {
        component: `
This component displays the order deadlines for ambient and chilled products.

### Usage Guidelines
- The component is designed to be used in the checkout process to inform users about the deadlines for their orders.
- It accepts an array of items, each with a type (e.g., Ambient, Chilled), a deadline (in ISO format), and an icon.
- The component can be expanded to show additional information about the delivery groups.
- The component will automatically calculate the countdown to the deadline.
- The component will display the deadline in the format "Order by {deadline}".

### Props
- **items**: An array of objects, each containing:
  - **type**: The type of delivery (e.g., Ambient, Chilled).
  - **deadline**: The deadline for the order in ISO format.
  - **icon**: A function that returns the icon for the delivery type.
- **info**: A string containing information text for the expandable section.
- **infolist**: An array of objects, each containing a text string for bullet points related to delivery groups.

### Design
- [Delivery Times UI Library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=2610-4902&m=dev)
`,
      },

      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          // Convert args to JSX props string
          const props = Object.entries(args)
            .map(([key, value]) => {
              return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<DeliveryTimes\n  ${props}\n/>`;
        },
      },
      story: {
        height: '300px',
      },
    },
  },
};

// Default story showcase for DeliveryTimes component
export const Default = {
  args: {
    // Sample delivery items with different types and deadlines
    items: [
      {
        type: 'Ambient',
        deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
        icon: () => <Icons.ambient />,
      },
      {
        type: 'Chilled',
        countdownType: 'datetime',
        deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
        icon: () => <Icons.chilled />,
      },
    ],

    // Information text for the expandable section
    info: 'To receive your order on or before 8 Mar you must complete the checkout before the deadlines set out above. Choose "show" to display the delivery group letters on each product.',

    // Bullet points for delivery groups
    infolist: [
      {
        text: 'Delivery group A includes all ambient storage products and some frozen.',
      },
      {
        text: 'Delivery group B includes all fresh / chilled storage products and some frozen.',
      },
    ],
  },

  // Render the component inside a container for proper spacing
  render: (args) => (
    <div className="tw-container">
      <DeliveryTimes {...args} />
    </div>
  ),
};

export const WithOneItem = {
  args: {
    items: [
      {
        type: 'Ambient',
        deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
        icon: () => <Icons.ambient />,
      },
    ],

    // Information text for the expandable section
    info: 'To receive your order on or before 8 Mar you must complete the checkout before the deadlines set out above. Choose "show" to display the delivery group letters on each product.',

    // Bullet points for delivery groups
    infolist: [
      {
        text: 'Delivery group A includes all ambient storage products and some frozen.',
      },
      {
        text: 'Delivery group B includes all fresh / chilled storage products and some frozen.',
      },
    ],
  },

  // Render the component inside a container for proper spacing
  render: (args) => (
    <div className="tw-container">
      <DeliveryTimes {...args} />
    </div>
  ),
};
