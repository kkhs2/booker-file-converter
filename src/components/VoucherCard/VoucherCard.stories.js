/**
 * Storybook configuration for the VoucherCard component
 * This defines how the VoucherCard component will appear in Storybook and what controls/options are available.
 */

// Import the component
import { convertPropsToString } from '../../../utils/storybookHelpers';
import Icons from '../Icons/Icons';
import VoucherCard from './VoucherCard';

// Define the story configuration
export default {
  // The title under which the VoucherCard component will appear in Storybook's navigation
  title: 'Cards/Voucher Card',

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the component
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the voucher',
      table: {
        type: { summary: 'string' },
      },
    },
    expirationtext: {
      control: 'text',
      description: 'The expiration text of the voucher',
      table: {
        type: { summary: 'string' },
      },
    },
    image: {
      control: 'text',
      description: 'The background image of the voucher card',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      control: 'function',
      description: 'The icon to be displayed on the voucher card',
      table: {
        type: { summary: 'function' },
      },
    },
    termsurl: {
      control: 'text',
      description: 'The URL for the terms and conditions',
      table: {
        type: { summary: 'string' },
      },
    },
    productsurl: {
      control: 'text',
      description: 'The URL for the products',
      table: {
        type: { summary: 'string' },
      },
    },
    expiressoon: {
      control: 'boolean',
      description: 'Flag indicating if the voucher expires soon',
      table: {
        type: { summary: 'boolean' },
      },
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
          const { args } = storyContext;
          if (!args) return source;

          const props = convertPropsToString(args);

          return `<VoucherCard\n ${props}\n />`;
        },
      },
      description: {
        component: `
The VoucherCard component is a visual representation of a voucher. It displays an image, title, expiration text, and buttons for terms and products. The component is designed to be responsive and adapts to different screen sizes.
            
### Design Figma References
- [VoucherCard UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=5633-46086&m=dev)
  `,
      },
    },
  },
};

/**
 * Template for rendering the VoucherCard component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => VoucherCard(args);

/**
 * Default story.
 * Demonstrates basic usage with default settings.
 */
export const Default = Template.bind({});
Default.args = {
  title: '7% off Fizzy Drinks in Northampton',
  expirationtext: 'Expires in 2 days',
  image: './images/voucher/soda.png',
  icon: () => <Icons.percentage className="tw:h-16 tw:w-16" />,
};
