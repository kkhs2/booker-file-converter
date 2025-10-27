import ClaimListCard from './ClaimListCard';

export default {
  title: 'Components/Claims/Claim List Card',
  component: ClaimListCard,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#FAF9F5',
        },
      ],
    },

    docs: {
      description: {
        component:
          'The ClaimListCard component displays a summary of a claim, including details like claim number, date raised, invoice number, and status. It is designed to be used in a list format, allowing users to quickly view and manage their claims.',
      },

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

          return `<ClaimListCard\n  ${props}\n/>`;
        },
      },
    },
  },

  argTypes: {
    claimnumber: {
      control: 'text',
      description: 'The claim number.',
    },
    dateraised: {
      control: 'text',
      description: 'The date the claim was raised.',
    },
    invoicenumber: {
      control: 'text',
      description: 'The invoice number.',
    },
    invoicedate: {
      control: 'text',
      description: 'The date of the invoice.',
    },
    amountexclvat: {
      control: 'number',
      description: 'The claim amount excluding VAT.',
    },
    amountinclvat: {
      control: 'number',
      description: 'The claim amount including VAT.',
    },
    productsclaimed: {
      control: 'number',
      description: 'The number of products claimed.',
    },
    message: {
      control: 'text',
      description:
        'An optional message from the reviewer. Can be a string or empty.',
    },
    closedon: {
      control: 'text',
      description: 'The date the claim was closed.',
    },
    onclick: {
      action: 'clicked',
      description:
        'Optional click handler for the card or arrow. Can be a function.',
    },
  },
  decorators: [
    (Story) => (
      <div className="tw:max-w-7xl tw:p-4">
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <ClaimListCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  claimnumber: '90007272',
  dateraised: '10 Jan 2025',
  invoicenumber: '215646448888',
  invoicedate: '5 Jan 2025',
  amountexclvat: 78.56,
  amountinclvat: 94.78,
  productsclaimed: 6,
  message:
    'This is a message the reviewer may leave the customer of up to 150 characters.',
  closedon: 'Closed on 10 Jan 2025',
  onclick: () => {
    console.log('Claim card clicked');
  },
};

export const WithoutMessage = Template.bind({});
WithoutMessage.args = {
  ...Default.args,
  message: null,
};

export const DifferentStatus = Template.bind({});
DifferentStatus.args = {
  ...Default.args,
  closedon: null, // No closed date
};
