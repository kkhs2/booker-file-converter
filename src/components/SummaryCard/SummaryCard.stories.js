import React from 'react';
import SummaryCard from './SummaryCard';

export default {
  title: 'Components/Summary Card',
  component: SummaryCard,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component:
          "SummaryCard component displays a summary of the user's order, including groups of items, total costs, and any applicable savings or warnings.",
      },
    },
  },

  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the summary card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Delivery summary' },
      },
    },
    groups: {
      control: 'object',
      description: 'Array of groups containing label, total, and items',
      table: {
        type: { summary: 'Array' },
        defaultValue: { summary: [] },
      },
    },
    total: {
      control: 'number',
      description: 'Total cost of the order',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    savings: {
      control: 'number',
      description: 'Total savings applied to the order',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    suppliersavings: {
      control: 'number',
      description: 'Total savings from supplier rep orders',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    voucher: {
      control: 'object',
      description: 'Voucher object containing label and value',
      table: {
        type: { summary: 'Object' },
        defaultValue: { summary: {} },
      },
    },
    oncheckout: {
      control: 'function',
      description: 'Function to call when the checkout button is clicked',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: () => {} },
      },
    },
    totalwithvat: {
      control: 'number',
      description: 'Total cost including VAT',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    warning: {
      control: 'text',
      description: 'Warning message to display under the table',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    footnote: {
      control: 'text',
      description: 'Footnote to display at the bottom of the card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    onwarningclick: {
      control: 'function',
      description: 'Function to call when the warning message is clicked',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: () => {} },
      },
    },

    warninglabel: {
      control: 'text',
      description: 'Label for the warning message',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'See more' },
      },
    },

    classname: {
      control: 'text',
      description: 'Additional classes to add to the component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },
};

const Template = (args) => <SummaryCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Delivery summary',
  groups: [
    {
      label: 'On next delivery',
      total: 100.0,
      items: [
        { label: 'Ambient delivery', qty: 7, type: 'delivery' },
        {
          label: 'Chilled delivery',
          qty: 6,
          type: 'delivery',
          warning:
            'Minimum not reached. Spend at least £75 more for each delivery',
        },
      ],
    },
    {
      label: 'Shipped separately',
      total: 150.0,
      items: [
        { label: 'Online exclusive', qty: 3, type: 'delivery', price: 50.0 },
        {
          label: 'Booker direct delivered',
          qty: 2,
          type: 'delivery',
          price: 40.0,
          warning:
            'Minimum not reached. Spend at least £75 more for each delivery',
        },

        {
          label: 'TIBARD Ltd',
          qty: 2,
          type: 'delivery',
          price: 13.0,
          warning:
            'Minimum not reached. Spend at least £75 more for each delivery',
        },
        { label: 'New item added', qty: 1, type: 'delivery', price: 30.0 },
        { label: 'Additional item', qty: 1, type: 'delivery', price: 20.0 },
      ],
    },
  ],
  total: 200.0,
  totalwithvat: 240.0,
  savings: -35.0,
  voucher: {
    label: '1 voucher applied: 6% Off crisps and snacks',
    value: -10.0,
  },
  warning: ' Minimum not reached ',
  footnote:
    '*Prices are only guides. The final payment is the price you would pay if you shopped on the day of your delivery or collection.',
  oncheckout: () => alert('Checkout clicked'),
};

export const WithMixedWarnings = Template.bind({});
WithMixedWarnings.args = {
  ...Default.args,
  groups: [
    {
      label: 'On next delivery',
      total: 100.0,
      items: [
        { label: 'Ambient delivery', qty: 7, type: 'delivery' },
        {
          label: 'Chilled delivery',
          qty: 6,
          type: 'delivery',
          warning:
            'Item-specific warning: Chilled delivery minimum not reached',
        },
      ],
    },
    {
      label: 'Shipped separately',
      total: 150.0,
      items: [
        {
          label: 'Online exclusive',
          qty: 3,
          type: 'delivery',
          price: 50.0,
          warning:
            'Item-specific warning: Online exclusive items may take longer to ship',
        },
        {
          label: 'Booker direct delivered',
          qty: 2,
          type: 'delivery',
          price: 40.0,
        },
        { label: 'TIBARD Ltd', qty: 2, type: 'delivery', price: 13.0 },
        { label: 'New item added', qty: 1, type: 'delivery', price: 30.0 },
        { label: 'Additional item', qty: 1, type: 'delivery', price: 20.0 },
      ],
    },
  ],
  warning: "Minimum not reached'",
};
