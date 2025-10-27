/**
 * Storybook configuration for the DeliveryTracker component
 * This defines how the DeliveryTracker component will appear in Storybook and what controls/options are available.
 */

import DeliveryTracker from './DeliveryTracker';

export default {
  title: 'Components/Delivery Tracker',
  component: DeliveryTracker,
  tags: ['autodocs'],

  argTypes: {
    deliveries: {
      control: {
        type: 'object',
      },
      description:
        'Array of delivery objects with day, am, and pm properties. Each am/pm can contain status, time, and message.',
    },
    weekcommencing: {
      control: {
        type: 'text',
      },
      description: 'Week commencing date string (e.g., "11/05/2025").',
    },
    classname: {
      control: {
        type: 'text',
      },
      description: 'Additional CSS classes to apply to the component.',
    },
  },

  // Default parameters for all stories
  parameters: {
    backgrounds: {
      default: 'beige',
      values: [
        {
          name: 'beige',
          value: '#FAF9F5',
        },
        {
          name: 'white',
          value: '#ffffff',
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

          return `<DeliveryTracker\n  ${props}\n/>`;
        },
      },
      description: {
        component:
          'A weekly delivery tracker component that displays delivery statuses for each day of the week.',
      },
    },
  },

  decorators: [
    (Story) => (
      <div className="tw-container">
        <Story />
      </div>
    ),
  ],
};

// Template function for creating stories
const Template = (args) => <DeliveryTracker {...args} />;

/**
 * Default story - shows the standard delivery tracker
 */
export const Default = Template.bind({});
Default.args = {
  weekcommencing: '11/05/2025',
  deliveries: [
    {
      day: 'Sunday',
      am: {
        status: 'arrived',
        time: '11:12pm',
      },
      pm: null,
    },
    {
      day: 'Monday',
      am: null,
      pm: {
        status: 'arrived',
        time: '12:35pm',
      },
    },
    {
      day: 'Tuesday',
      am: {
        status: 'arrived',
        time: '9:48pm',
      },
      pm: {
        status: 'issue',
      },
    },
    {
      day: 'Wednesday',
      am: {
        status: 'ontheway',
        time: '10:56am',
      },
      pm: null,
    },
    {
      day: 'Thursday',
      am: null,
      pm: null,
    },
    {
      day: 'Friday',
      am: null,
      pm: {
        status: 'estimated',
        time: '4:30pm',
      },
    },
    {
      day: 'Saturday',
      am: {
        status: 'estimated',
        time: '11:30am',
      },
      pm: {
        status: 'waiting',
      },
    },
  ],
};

/**
 * All Delivered - shows all days with delivered status
 */
export const AllDelivered = Template.bind({});
AllDelivered.args = {
  weekcommencing: '11/05/2025',
  deliveries: [
    {
      day: 'Sunday',
      am: {
        status: 'arrived',
        time: '11:12am',
      },
      pm: {
        status: 'arrived',
        time: '6:30pm',
      },
    },
    {
      day: 'Monday',
      am: {
        status: 'arrived',
        time: '10:56am',
      },
      pm: {
        status: 'arrived',
        time: '5:15pm',
      },
    },
    {
      day: 'Tuesday',
      am: {
        status: 'arrived',
        time: '9:30am',
      },
      pm: {
        status: 'arrived',
        time: '2:30pm',
      },
    },
    {
      day: 'Wednesday',
      am: {
        status: 'arrived',
        time: '8:45am',
      },
      pm: {
        status: 'arrived',
        time: '4:15pm',
      },
    },
    {
      day: 'Thursday',
      am: {
        status: 'arrived',
        time: '11:20am',
      },
      pm: {
        status: 'arrived',
        time: '3:45pm',
      },
    },
    {
      day: 'Friday',
      am: {
        status: 'arrived',
        time: '10:30am',
      },
      pm: {
        status: 'arrived',
        time: '1:20pm',
      },
    },
    {
      day: 'Saturday',
      am: {
        status: 'arrived',
        time: '9:30am',
      },
      pm: {
        status: 'arrived',
        time: '7:45pm',
      },
    },
  ],
};

/**
 * Mixed Status - shows various delivery statuses
 */
export const MixedStatus = Template.bind({});
MixedStatus.args = {
  weekcommencing: '11/05/2025',
  deliveries: [
    {
      day: 'Sunday',
      am: {
        status: 'arrived',
        time: '12:12pm',
      },
      pm: null,
    },
    {
      day: 'Monday',
      am: null,
      pm: null,
    },
    {
      day: 'Tuesday',
      am: {
        status: 'ontheway',
        time: '2:30pm',
      },
      pm: {
        status: 'issue',
      },
    },
    {
      day: 'Wednesday',
      am: {
        status: 'estimated',
        time: '11:15am',
      },
      pm: null,
    },
    {
      day: 'Thursday',
      am: null,
      pm: {
        status: 'waiting',
      },
    },
    {
      day: 'Friday',
      am: null,
      pm: null,
    },
    {
      day: 'Saturday',
      am: {
        status: 'estimated',
        time: '4:00pm',
      },
      pm: {
        status: 'waiting',
      },
    },
  ],
};

/**
 * No Deliveries - shows all empty days
 */
export const NoDeliveries = Template.bind({});
NoDeliveries.args = {
  weekcommencing: '11/05/2025',
  deliveries: [
    {
      day: 'Sunday',
      am: null,
      pm: null,
    },
    {
      day: 'Monday',
      am: null,
      pm: null,
    },
    {
      day: 'Tuesday',
      am: null,
      pm: null,
    },
    {
      day: 'Wednesday',
      am: null,
      pm: null,
    },
    {
      day: 'Thursday',
      am: null,
      pm: null,
    },
    {
      day: 'Friday',
      am: null,
      pm: null,
    },
    {
      day: 'Saturday',
      am: null,
      pm: null,
    },
  ],
};

/**
 * Two Days Only - shows only Sunday and Wednesday deliveries
 */
export const TwoDaysOnly = Template.bind({});
TwoDaysOnly.args = {
  weekcommencing: '11/05/2025',
  deliveries: [
    {
      day: 'Sunday',
      am: {
        status: 'arrived',
        time: '11:12pm',
      },
      pm: null,
    },
    {
      day: 'Wednesday',
      am: {
        status: 'ontheway',
        time: '10:56am',
      },
      pm: {
        status: 'estimated',
        time: '3:30pm',
      },
    },
  ],
};
