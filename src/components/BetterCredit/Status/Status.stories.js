/**
 * Storybook configuration for the Status component
 * This defines how the Status component will appear in Storybook and what controls/options are available.
 */

// Import the component
import Status from './Status';

// Define the story configuration
export default {
  // The title under which the Status component will appear in Storybook's navigation
  title: 'Better Credit/Components/Status',

  // The component to be displayed in Storybook
  component: Status,

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

          return props.length ? `<Status\n  ${props}\n/>` : ' ';
        },
      },
      description: {
        component: `
This component implements status cards as defined in the design system.

### Design Figma References
- [Status UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=6015-22340&m=dev)
        `,
      },
    },
    backgrounds: {
      default: 'gray',
      values: [{ name: 'gray', value: '#f2f0f0' }],
    },
  },

  // Define controls (props) for the Status component
  argTypes: {
    // Status label
    label: {
      control: 'text',
      description: 'The label displayed on the status card',
      table: {
        defaultValue: { summary: '' },
      },
    },

    // Status count
    count: {
      control: 'text',
      description: 'The numeric count displayed below the label',
      table: {
        defaultValue: { summary: 0 },
      },
    },

    // Status type
    type: {
      control: { type: 'select' },
      options: ['overdue', 'pending', 'available'],
      description: 'The status type, determining the color and style',
      table: {
        defaultValue: { summary: 'available' },
      },
    },
  },
};

/**
 * Template for rendering the Status component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => <Status {...args} />;

/**
 * Default breadcrumb story.
 * Demonstrates a standard status with a label and count.
 */
export const Default = Template.bind({});
Default.args = {
  label: 'Overdue',
  count: '15',
  type: 'overdue',
};

/**
 * Pending status story.
 * Demonstrates a status with a label and count.
 */
export const Pending = Template.bind({});
Pending.args = {
  label: (
    <>
      Direct Debit <span className="tw:hidden tw:xl:inline">in progress</span>
    </>
  ),
  count: '10',
  type: 'pending',
};

/**
 * Available status story.
 * Demonstrates a status with a label and count.
 */
export const Available = Template.bind({});
Available.args = {
  label: 'Available to Pay',
  count: '8',
  type: 'available',
};

/**
 * All statuses story.
 * Demonstrates displaying all statuses in a row.
 */
export const AllStatuses = {
  render: () => {
    const statusConfigs = [Default.args, Pending.args, Available.args];

    return (
      <div className="tw:flex tw:items-center tw:gap-4">
        {statusConfigs.map((config, idx) => (
          <Status key={idx} {...config} />
        ))}
      </div>
    );
  },
};
