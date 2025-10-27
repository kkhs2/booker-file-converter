/**
 * Storybook configuration for the PresellSummary component
 * This defines how the PresellSummary component will appear in Storybook and what controls/options are available.
 */

// Import the component
import PresellSummary from './PresellSummary';
import Tag from '../Tag/Tag';

// Mock data for drops
const sampleDrops = [
  { name: 'Drop 1', date: 'w/c 10 Sep', quantity: 1, total: 48.0 },
  { name: 'Drop 4', date: 'w/c 4 Oct', quantity: 0, total: 0.0 },
  { name: 'Drop 6', date: 'w/c 24 Oct', quantity: 0, total: 0.0 },
  { name: 'Drop 7', date: 'w/c 4 Nov', quantity: 0, total: 0.0 },
];

const fullDrops = [
  { name: 'Drop 1', date: 'w/c 10 Sep', quantity: 2, total: 96.0 },
  { name: 'Drop 4', date: 'w/c 4 Oct', quantity: 0, total: 0.0 },
  { name: 'Drop 6', date: 'w/c 24 Oct', quantity: 0, total: 0.0 },
  { name: 'Drop 7', date: 'w/c 4 Nov', quantity: 0, total: 0.0 },
];

const orderPlacedDrops = [
  { name: 'Drop 1', date: 'w/c 10 Sep', quantity: 2, total: 96.0 },
  { name: 'Drop 4', date: 'w/c 4 Oct', quantity: 0, total: 0.0 },
  { name: 'Drop 6', date: 'w/c 24 Oct', quantity: 0, total: 0.0 },
  { name: 'Drop 7', date: 'w/c 4 Nov', quantity: 0, total: 0.0 },
];

const lockedOrderPlacedDrops = [
  { name: 'Drop 1', date: 'w/c 10 Sep', quantity: 3, total: 146.48 },
  { name: 'Drop 4', date: 'w/c 4 Oct', quantity: 0, total: 0.0 },
  { name: 'Drop 6', date: 'w/c 24 Oct', quantity: 0, total: 0.0 },
  { name: 'Drop 7', date: 'w/c 4 Nov', quantity: 0, total: 0.0 },
];

// Define the story configuration
export default {
  title: 'Components/Presell/Summary',
  tags: ['autodocs'],
  argTypes: {
    step: {
      control: { type: 'select' },
      options: ['empty', 'update', 'done', 'full'],
      description: 'The current step/state of the presell summary',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'empty' },
      },
    },
    locked: {
      control: 'boolean',
      description: 'Whether changes are locked',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    status: {
      control: { type: 'select' },
      options: ['not_ordered', 'order_placed', 'none'],
      description: 'The order status',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'not_ordered' },
      },
    },
    title: {
      control: 'text',
      description: 'Title text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Pre-sell summary' },
      },
    },
    closingdate: {
      control: 'text',
      description: 'Closing date text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Wed 10 Sep' },
      },
    },
    drops: {
      control: 'object',
      description: 'Array of drop data objects',
      table: {
        type: { summary: 'Array' },
        defaultValue: { summary: '[]' },
      },
    },
    guidevatamount: {
      control: 'number',
      description: 'Guide total including VAT',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    guideamount: {
      control: 'number',
      description: 'Guide total excluding VAT',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    tag: {
      control: false,
      description: 'Custom Tag component to display status',
      table: {
        type: { summary: 'JSX.Element' },
        defaultValue: { summary: 'null' },
      },
    },
    buttons: {
      control: false,
      description: 'Array of custom Button components for actions',
      table: {
        type: { summary: 'Array<JSX.Element>' },
        defaultValue: { summary: '[]' },
      },
    },
    footnote: {
      control: 'text',
      description: 'Footnote text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '*Prices are only guides...' },
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
      description: {
        component: `
          The PresellSummary component displays a summary of pre-sell orders, including drop information, guide totals, and status tags.
          
          ### Design Figma References
          - [Presell Summary UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=5292-57893&m=dev)
        `,
      },
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;
          const props = Object.entries(args)
            .map(([key, value]) => `${key}={${JSON.stringify(value)}}`)
            .join(' ');
          return `<PresellSummary ${props} />`;
        },
      },

      story: {
        height: '600px',
      },
    },
  },

  decorators: [
    (Story) => (
      <div className="tw:max-w-md">
        <Story />
      </div>
    ),
  ],
};

/**
 * Template for rendering the PresellSummary component.
 */
const Template = (args) => <PresellSummary {...args} />;

/**
 * Default Empty State - No orders placed
 */
export const Empty = Template.bind({});
Empty.args = {
  step: 'empty',
  locked: false,
  status: 'not_ordered',
  guideamount: 0.0,
  drops: [],
};

/**
 * Update State - User can make changes with drops
 */
export const Update = Template.bind({});
Update.args = {
  step: 'update',
  locked: false,
  status: 'none',
  drops: sampleDrops,
  guidevatamount: 56.0,
  guideamount: 48.0,
};

/**
 * Update State with Order Placed
 */
export const UpdateOrderPlaced = Template.bind({});
UpdateOrderPlaced.args = {
  step: 'update',
  locked: false,
  status: 'order_placed',
  drops: orderPlacedDrops,
  guidevatamount: 100.0,
  guideamount: 96.0,
  tag: () => <Tag label="Order Placed" variant="default" size="small" />,
};

/**
 * Done State - Locked, cannot make changes
 */
export const Locked = Template.bind({});
Locked.args = {
  step: 'done',
  locked: true,
  status: 'not_ordered',
  tag: () => <Tag label="Order Placed" variant="secondary" size="small" />,
};

/**
 * Done State with Order Placed - Unlocked
 */
export const OrderPlacedUnlocked = Template.bind({});
OrderPlacedUnlocked.args = {
  step: 'done',
  locked: false,
  status: 'order_placed',
  drops: orderPlacedDrops,
  guidevatamount: 100.0,
  guideamount: 96.0,
  tag: () => <Tag label="Order Placed" variant="default" size="small" />,
};

/**
 * Done State with Order Placed - Locked
 */
export const OrderPlacedLocked = Template.bind({});
OrderPlacedLocked.args = {
  step: 'done',
  locked: true,
  status: 'order_placed',
  drops: lockedOrderPlacedDrops,
  guidevatamount: 186.48,
  guideamount: 146.48,
  tag: () => <Tag label="Order Placed" variant="default" size="small" />,
};

/**
 * Full State - Complete view with all drops
 */
export const Full = Template.bind({});
Full.args = {
  step: 'full',
  locked: false,
  status: 'not_ordered',
  drops: fullDrops,
  guidevatamount: 100.0,
  guideamount: 96.0,
  tag: () => (
    <Tag
      label="Order Placed"
      variant="secondary"
      size="small"
      classname="tw:h-6 tw:w-6 tw:rounded-full tw:p-2 tw:bg-beige-1000"
    />
  ),
};
