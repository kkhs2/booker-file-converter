/**
 * Storybook configuration for the CreditChart component
 * This defines how the CreditChart component will appear in Storybook and what controls/options are available.
 */

// Import the CreditChart component
import CreditChart from './CreditChart';

// Define the story configuration
export default {
  title: 'Better Credit/Components/Credit Chart',
  component: CreditChart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The CreditChart component renders a doughnut chart displaying credit-related data such as credit limit, balance, and credit available. It includes a legend with status items that interact with the chart on hover.

**Features:**
- Interactive doughnut chart with hover effects
- Responsive design (different sizes for mobile/desktop)
- Legend items that highlight corresponding chart segments
- Handles zero-value scenarios gracefully
- Shows suspension status when applicable

**Chart Interactions:**
- Hover over chart segments to highlight legend items
- Hover over legend items to highlight chart segments
- Automatic opacity changes for better visual feedback
        `,
      },
    },
  },
  argTypes: {
    creditlimit: {
      control: { type: 'number', min: 0, step: 1000 },
      description: 'The total credit limit amount',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    balance: {
      control: { type: 'number', min: 0, step: 100 },
      description: 'The current balance amount',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    creditavailable: {
      control: { type: 'number', min: 0, step: 100 },
      description: 'The available credit amount',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    isSuspended: {
      control: { type: 'boolean' },
      description: 'Whether the account is suspended',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    statuses: {
      control: { type: 'object' },
      description:
        'Object containing status data for chart segments and legend',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
  },
};

// Template function for creating stories
const Template = (args) => <CreditChart {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  creditlimit: 50000,
  balance: 12500,
  creditavailable: 37500,
  isSuspended: false,
  statuses: {
    overdue: {
      label: 'Overdue',
      amount: 5000,
      colour: '#FF6B6B',
      count: 3,
    },
    pending: {
      label: 'Pending',
      amount: 7500,
      colour: '#4ECDC4',
      count: 5,
    },
    paid: {
      label: 'Paid',
      amount: 15000,
      colour: '#45B7D1',
      count: 12,
    },
    processing: {
      label: 'Processing',
      amount: 2500,
      colour: '#96CEB4',
      count: 2,
    },
  },
};

// High balance story
export const HighBalance = Template.bind({});
HighBalance.args = {
  creditlimit: 100000,
  balance: 85000,
  creditavailable: 15000,
  isSuspended: false,
  statuses: {
    overdue: {
      label: 'Overdue',
      amount: 25000,
      colour: '#FF6B6B',
      count: 8,
    },
    pending: {
      label: 'Pending',
      amount: 35000,
      colour: '#4ECDC4',
      count: 15,
    },
    paid: {
      label: 'Paid',
      amount: 25000,
      colour: '#45B7D1',
      count: 20,
    },
  },
};

// Suspended account story
export const SuspendedAccount = Template.bind({});
SuspendedAccount.args = {
  creditlimit: 25000,
  balance: 28000,
  creditavailable: 0,
  isSuspended: true,
  statuses: {
    overdue: {
      label: 'Overdue',
      amount: 15000,
      colour: '#FF6B6B',
      count: 12,
    },
    pending: {
      label: 'Pending',
      amount: 8000,
      colour: '#4ECDC4',
      count: 6,
    },
    paid: {
      label: 'Paid',
      amount: 5000,
      colour: '#45B7D1',
      count: 3,
    },
  },
};

// Zero balance story
export const ZeroBalance = Template.bind({});
ZeroBalance.args = {
  creditlimit: 30000,
  balance: 0,
  creditavailable: 30000,
  isSuspended: false,
  statuses: {
    overdue: {
      label: 'Overdue',
      amount: 0,
      colour: '#FF6B6B',
      count: 0,
    },
    pending: {
      label: 'Pending',
      amount: 0,
      colour: '#4ECDC4',
      count: 0,
    },
    paid: {
      label: 'Paid',
      amount: 0,
      colour: '#45B7D1',
      count: 0,
    },
  },
};

// Single status story
export const SingleStatus = Template.bind({});
SingleStatus.args = {
  creditlimit: 40000,
  balance: 8000,
  creditavailable: 32000,
  isSuspended: false,
  statuses: {
    pending: {
      label: 'Pending',
      amount: 8000,
      colour: '#4ECDC4',
      count: 4,
    },
  },
};

// Large numbers story
export const LargeNumbers = Template.bind({});
LargeNumbers.args = {
  creditlimit: 1250000,
  balance: 687500,
  creditavailable: 562500,
  isSuspended: false,
  statuses: {
    overdue: {
      label: 'Overdue',
      amount: 125000,
      colour: '#FF6B6B',
      count: 25,
    },
    pending: {
      label: 'Pending',
      amount: 312500,
      colour: '#4ECDC4',
      count: 48,
    },
    paid: {
      label: 'Paid',
      amount: 250000,
      colour: '#45B7D1',
      count: 156,
    },
  },
};

// Minimal credit story
export const MinimalCredit = Template.bind({});
MinimalCredit.args = {
  creditlimit: 5000,
  balance: 4800,
  creditavailable: 200,
  isSuspended: false,
  statuses: {
    overdue: {
      label: 'Overdue',
      amount: 2400,
      colour: '#FF6B6B',
      count: 3,
    },
    pending: {
      label: 'Pending',
      amount: 2400,
      colour: '#4ECDC4',
      count: 2,
    },
  },
};
