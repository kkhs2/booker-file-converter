// Import the component
import AllocationsSummary from './AllocationsSummary';
import Tag from '../Tag/Tag';

// Define the story configuration
export default {
  title: 'Components/Allocations/Summary',

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the component
  argTypes: {
    status: {
      control: 'select',
      options: [
        'Not reviewed',
        'Confirmed - No Additionals',
        'Minimum sent',
        'Confirmed - Additionals',
      ],
      description: 'The allocation status',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Not reviewed' },
      },
    },
    changestext: {
      control: 'text',
      description: 'Text describing when changes can be made',
      table: {
        type: { summary: 'string' },
        defaultValue: {
          summary: 'You can amend quantities until Thursday 21 Feb',
        },
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
    minimumproducts: {
      control: 'number',
      description: 'Number of minimum products',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 32 },
      },
    },
    additionalproducts: {
      control: 'number',
      description: 'Number of additional products',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    totalproducts: {
      control: 'number',
      description: 'Total number of products',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 32 },
      },
    },
    guidetotalinclvat: {
      control: 'number',
      description: 'Guide total including VAT',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 240.0 },
      },
    },
    guidetotalexclvat: {
      control: 'number',
      description: 'Guide total excluding VAT',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 200.0 },
      },
    },
    showactions: {
      control: 'boolean',
      description: 'Whether to show action buttons',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    savebuttonlabel: {
      control: 'text',
      description: 'Label for save button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Save changes' },
      },
    },
    discardbuttonlabel: {
      control: 'text',
      description: 'Label for discard button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Discard changes' },
      },
    },
    tag: {
      control: false,
      description: 'Custom tag component to display status',
      table: {
        type: { summary: 'JSX.Element' },
        defaultValue: { summary: 'null' },
      },
    },
    footnote: {
      control: 'text',
      description: 'Disclaimer footnote text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '*Prices are only guides...' },
      },
    },
  },

  // Added to override default story height if needed for this component
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
      story: {
        height: '600px',
      },
    },
  },

  decorators: [
    (Story) => (
      <div style={{ maxWidth: '420px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Template for rendering the AllocationsSummary component.
 * @param {Object} args - Arguments passed from Storybook controls
 * @returns {JSX.Element} - The rendered component
 */
const Template = (args) => <AllocationsSummary {...args} />;

/**
 * Default story showing the basic AllocationsSummary component
 */
export const Default = Template.bind({});
Default.args = {
  status: 'Not reviewed',
  changestext: 'You can amend quantities until Thursday 21 Feb',
  minimumproducts: 32,
  additionalproducts: 0,
  totalproducts: 32,
  guidetotalinclvat: 240.0,
  guidetotalexclvat: 200.0,
  showactions: true,
  onsave: () => console.log('Save clicked'),
  ondiscard: () => console.log('Discard clicked'),
};

/**
 * Story showing with actions enabled
 */
export const WithActions = Template.bind({});
WithActions.args = {
  ...Default.args,
  showactions: true,
};

/**
 * Story showing summary only (no action buttons)
 */
export const SummaryOnly = Template.bind({});
SummaryOnly.args = {
  ...Default.args,
  showactions: false,
};

/**
 * Story showing different status variants
 */
export const ConfirmedStatus = Template.bind({});
ConfirmedStatus.args = {
  ...Default.args,
  status: 'Confirmed - No Additionals',
  changestext: 'Allocation confirmed, no additional products needed',
};

/**
 * Story showing with additional products
 */
export const WithAdditionalProducts = Template.bind({});
WithAdditionalProducts.args = {
  ...Default.args,
  status: 'Confirmed - Additionals',
  additionalproducts: 8,
  totalproducts: 40,
  guidetotalinclvat: 300.0,
  guidetotalexclvat: 250.0,
  changestext: 'Additional products have been allocated',
};

/**
 * Story showing with custom tag component
 */
export const WithCustomTag = Template.bind({});
WithCustomTag.args = {
  ...Default.args,
  tag: (
    <Tag
      label="Custom Status"
      variant="tertiary"
      size="small"
      classname="tw:bg-purple-100 tw:text-purple-800 tw:rounded-[120px] tw:text-xs tw:px-2 tw:py-1"
    />
  ),
};

/**
 * Story showing locked state
 */
export const Locked = Template.bind({});
Locked.args = {
  ...Default.args,
  status: 'Allocations now locked',
  locked: true,
  changestext: 'You can amend quantities until Thursday 21 Feb', // This won't show when locked
  tag: (
    <Tag
      label="Allocations now locked"
      variant="warning"
      size="small"
      classname="tw:bg-orange-100 tw:text-orange-800 tw:rounded-[120px] tw:text-xs tw:px-2 tw:py-1"
    />
  ),
};
