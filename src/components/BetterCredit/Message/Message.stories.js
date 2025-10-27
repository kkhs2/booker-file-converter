/**
 * Storybook configuration for the Message component
 * This defines how the Message component will appear in Storybook and what controls/options are available.
 */

// Imports
import Icons from '../../Icons/Icons';
import Message from './Message';

// Define the story configuration
export default {
  // The title under which the Notification component will appear in Storybook's navigation
  title: 'Better Credit/Components/Message',

  // The component to be displayed in the story
  component: Message,

  // Tags used by Storybook for organisational purposes
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
              if (key === 'buttonicon' && typeof value === 'function') {
                const functionString = value.toString();
                if (functionString.includes('.close')) {
                  return `icon={<Icons.close />}`;
                }
                if (functionString.includes('.smallClose')) {
                  return `icon={<Icons.smallClose />}`;
                }
              }
              if (typeof value === 'boolean') {
                return `${key}={${value}}`;
              }
              if (typeof value === 'string') {
                return `${key}="${value}"`;
              }
              return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return props.length ? `<Message\n  ${props}\n/>` : ' ';
        },
      },
      description: {
        component: `
This component implements a message component as defined in the design system.

### Design Figma References
- [Message UI Library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=5987-46729&m=dev)
        `,
      },
    },
  },

  argTypes: {
    // Message title
    title: {
      control: 'text',
      description: 'The bold title text of the message',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Message content
    message: {
      control: 'text',
      description: 'The additional descriptive text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Action button
    hasactionbutton: {
      control: 'boolean',
      description: 'Whether to display an action button',
      table: {
        defaultValue: { summary: false },
      },
    },

    // Action button text
    buttontext: {
      control: 'text',
      description: 'Text displayed on the action button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Action button icon
    buttonicon: {
      control: false,
      description: 'Optional icon for the action button',
      table: {
        type: { summary: 'JSX.Element | string' },
        defaultValue: { summary: 'null' },
      },
    },

    // Callback function when action button is clicked
    onbuttonclick: {
      action: 'onbuttonclick',
      description: 'Callback function when action button is clicked',
    },
  },
};

/**
 * Template for rendering the Message component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => <Message {...args} />;

/**
 * Default message story.
 * Demonstrates a standard message with action button and icon.
 */
export const Default = Template.bind({});
Default.args = {
  title: 'No invoices found.',
  message: 'Try double checking your invoice number.',
  hasactionbutton: true,
  buttontext: 'Clear search',
  buttonicon: () => <Icons.x classname="tw:w-4 tw:h-4" />,
};

/**
 * Simple message story.
 * Demonstrates a message without action button.
 */
export const Simple = Template.bind({});
Simple.args = {
  title: 'No invoices found',
  message: 'Try double checking your invoice number.',
  hasactionbutton: false,
};

/**
 * Button without icon story.
 * Demonstrates a message with action button but no icon.
 */
export const ButtonWithoutIcon = Template.bind({});
ButtonWithoutIcon.args = {
  title: 'Something went wrong',
  message: 'Please try again later or contact support.',
  hasactionbutton: true,
  buttontext: 'Retry',
};

/**
 * Long content message story.
 * Demonstrates how the message handles longer content.
 */
export const LongContent = Template.bind({});
LongContent.args = {
  title: 'Important System Update',
  message:
    'Our system will be undergoing maintenance on Saturday, 20th January 2024, from 02:00 to 04:00 GMT. During this time, some services may be unavailable. We apologise for any inconvenience caused.',
  hasactionbutton: true,
  buttontext: 'Dismiss',
  buttonicon: () => <Icons.x classname="tw:w-4 tw:h-4" />,
};

/**
 * All messages story.
 * Demonstrates different message variants in a single view.
 */
export const AllMessages = {
  render: () => {
    const configs = [
      Default.args,
      Simple.args,
      ButtonWithoutIcon.args,
      LongContent.args,
    ];

    return (
      <div className="tw:space-y-8">
        {configs.map((config, idx) => (
          <Message key={idx} {...config} />
        ))}
      </div>
    );
  },
};
