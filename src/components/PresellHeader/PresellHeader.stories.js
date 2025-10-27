/**
 * Storybook configuration for the PresellHeader component
 * This defines how the PresellHeader component will appear in Storybook and what controls/options are available.
 */

// Import the component
import PresellHeader from './PresellHeader';

// Define the story configuration
export default {
  // The title under which the PresellHeader component will appear in Storybook's navigation
  title: 'Components/Presell/Presell Header',

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the component
  argTypes: {
    drops: {
      control: 'object',
      description:
        'Array of drop objects with id, label, date, additionalinfo, quantity, enabled, and selected status',
      table: {
        type: { summary: 'Array<Object>' },
        defaultValue: { summary: '[]' },
      },
    },
    showscrollcontrols: {
      control: 'boolean',
      description: 'Whether to show the navigation arrows and drop count',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },

  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ECE8E1',
        },
      ],
    },
    docs: {
      docs: {
        description: {
          component: `
          The PresellHeader component displays a list of presell drops with navigation controls.
          
          ### Design Figma References
          - [Presell Header UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=5323-31664&m=dev)
          `,
        },
        source: {
          transform: (source, storyContext) => {
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

            return `<PresellHeader\n  ${props}\n/>`;
          },
        },
      },
      story: {
        height: '300px',
      },
    },
  },
};

/**
 * Template for rendering the PresellHeader component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => PresellHeader(args);

/**
 * Default story showing basic usage of the PresellHeader component.
 */
export const Default = Template.bind({});
Default.args = {
  drops: [
    {
      id: 'drop-1',
      label: 'Drop 1',
      date: 'w/c 10 Sep',
      additionalinfo: 'Ext Credit',
      quantity: 1,
      enabled: true,
      selected: true,
    },
    {
      id: 'drop-2',
      label: 'Drop 2',
      enabled: false,
    },
    {
      id: 'drop-3',
      label: 'Drop 3',
      enabled: false,
    },
    {
      id: 'drop-4',
      label: 'Drop 4',
      date: 'w/c 4 Oct',
      quantity: 0,
      enabled: true,
      selected: true,
    },
    {
      id: 'drop-5',
      label: 'Drop 5',
      enabled: false,
    },
    {
      id: 'drop-6',
      label: 'Drop 6',
      date: 'w/c 24 Oct',
      additionalinfo: 'Ext Credit',
      quantity: 0,
      enabled: true,
      selected: true,
    },
    {
      id: 'drop-7',
      label: 'Drop 7',
      date: 'w/c 4 Nov',
      additionalinfo: 'Ext Credit',
      quantity: 0,
      enabled: true,
      selected: true,
    },
    {
      id: 'drop-8',
      label: 'Drop 8',
      enabled: false,
    },
  ],
  showscrollcontrols: true,
};

/**
 * Story showing the PresellHeader without scroll controls.
 */
export const WithoutScrollControls = Template.bind({});
WithoutScrollControls.args = {
  ...Default.args,
  showscrollcontrols: false,
};

/**
 * Story showing the PresellHeader with fewer drops (no scrolling needed).
 */
export const FewDrops = Template.bind({});
FewDrops.args = {
  drops: [
    {
      id: 'drop-1',
      label: 'Drop 1',
      date: 'w/c 10 Sep',
      additionalinfo: 'Ext Credit',
      quantity: 1,
      enabled: true,
      selected: true,
    },
    {
      id: 'drop-2',
      label: 'Drop 2',
      enabled: false,
    },
    {
      id: 'drop-3',
      label: 'Drop 3',
      date: 'w/c 4 Oct',
      quantity: 0,
      enabled: true,
      selected: true,
    },
  ],
  showscrollcontrols: true,
};

/**
 * Story showing many drops to demonstrate scrolling functionality.
 */
export const ManyDrops = Template.bind({});
ManyDrops.args = {
  drops: Array.from({ length: 15 }, (_, index) => ({
    id: `drop-${index + 1}`,
    label: `Drop ${index + 1}`,
    date: index % 3 === 0 ? `w/c ${10 + index} Sep` : undefined,
    additionalinfo: index % 4 === 0 ? 'Ext Credit' : undefined,
    quantity: index % 5 === 0 ? Math.floor(Math.random() * 5) : 0,
    enabled: index % 3 !== 1,
    selected: index % 5 === 0 || index % 7 === 0,
  })),
  showscrollcontrols: true,
};
