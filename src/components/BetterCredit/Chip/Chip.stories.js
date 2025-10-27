/**
 * Storybook configuration for the Chip component
 * This defines how the Chip component will appear in Storybook and what controls/options are available.
 */

// Imports
import Icons from '../../Icons/Icons';
import Chip from './Chip';

// Define the story configuration
export default {
  // The title under which the Chip component will appear in Storybook's navigation
  title: 'Better Credit/Components/Chip',

  // The component to be displayed in the story
  component: Chip,

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
              if (key === 'icon' && typeof value === 'function') {
                const functionString = value.toString();
                if (functionString.includes('.greenCheck')) {
                  return `icon={<Icons.greenCheck />}`;
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

          return `<Chip\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
This component implements status chips/badges as defined in the design system.

### Design Figma References
- [Chip UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=6015-60029&m=dev)
        `,
      },
    },
  },

  // Define controls (props) for the Chip component
  argTypes: {
    // Status type
    status: {
      control: { type: 'select' },
      options: ['red', 'green', 'orange', 'blue', 'alert', 'custom'],
      description:
        "Predefined status types that determine the chip's appearance",
      table: {
        defaultValue: {
          summary: '',
        },
      },
    },

    // Size options
    size: {
      control: { type: 'select' },
      options: ['default', 'large'],
      description: 'Size of the chip',
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },

    // Label text
    label: {
      control: 'text',
      description: 'Text displayed inside the chip',
      table: {
        defaultValue: {
          summary: '',
        },
      },
    },

    // Custom background colour
    custombgcolour: {
      control: 'color',
      description: 'Custom background colour',
      table: {
        defaultValue: {
          summary: null,
        },
      },
    },

    // Custom font colour
    customfontcolour: {
      control: 'color',
      description: 'Custom text colour',
      table: {
        defaultValue: {
          summary: null,
        },
      },
    },

    // Optional icon
    icon: {
      control: false,
      description: 'Optional Icon component to display',
      table: {
        type: { summary: 'JSX.Element' },
      },
    },
  },
};

/**
 * Template for rendering the Chip component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => <Chip {...args} />;

/**
 * Default chip story.
 * Demonstrates a standard green status chip.
 */
export const Default = Template.bind({});
Default.args = {
  status: 'green',
  label: 'Available',
};

/**
 * Large chip story.
 * Demonstrates a standard chip with large size.
 */
export const Large = Template.bind({});
Large.args = {
  status: 'green',
  size: 'large',
  label: 'Available',
};

/**
 * Red status chip story.
 * Demonstrates a chip indicating an overdue or error state.
 */
export const Overdue = Template.bind({});
Overdue.args = {
  status: 'red',
  label: 'Overdue',
};

/**
 * Orange status chip story.
 * Demonstrates a chip indicating a pending or in-progress state.
 */
export const Pending = Template.bind({});
Pending.args = {
  status: 'orange',
  label: 'Direct Debit',
};

/**
 * Blue status chip story.
 * Demonstrates a chip indicating an informational state.
 */
export const Information = Template.bind({});
Information.args = {
  status: 'blue',
  label: 'On Order',
};

/**
 * Alert status chip story.
 * Demonstrates a chip indicating an alert state.
 */
export const Alert = Template.bind({});
Alert.args = {
  status: 'alert',
  label: 'To be Recovered',
};

/**
 * Custom styled chip story with icon.
 * Demonstrates a chip with custom colours and an icon.
 */
export const CustomWithIcon = Template.bind({});
CustomWithIcon.args = {
  status: 'custom',
  size: 'large',
  label: 'Active',
  custombgcolour: '#B6F7E8',
  customfontcolour: '#135E4C',
  icon: () => <Icons.checkCircle classname="tw:w-3 tw:h-3" />,
};

/**
 * All chips story.
 * Demonstrates all available chip variants in a single view.
 */
export const AllChips = {
  render: () => {
    const chipConfigs = [
      Default.args,
      Large.args,
      Overdue.args,
      Pending.args,
      Information.args,
      Alert.args,
      CustomWithIcon.args,
    ];

    return (
      <div className="tw:flex tw:flex-wrap tw:items-start tw:gap-2">
        {chipConfigs.map((config, index) => (
          <Chip key={index} {...config} />
        ))}
      </div>
    );
  },
};
