import OrderInvoiceCard from './OrderInvoiceCard';

export default {
  title: 'Components/Claims/Order Invoice Card',
  component: OrderInvoiceCard,
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
          'The OrderInvoiceCard component displays a summary of an order invoice, including details like date, invoice number, price, and items. It is designed to be used in a list format, allowing users to quickly view and manage their invoices.',
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

          return `<OrderInvoiceCard\n  ${props}\n/>`;
        },
      },
    },
  },

  decorators: [
    (Story) => (
      <div className="tw:max-w-7xl tw:p-4">
        <Story />
      </div>
    ),
  ],

  argTypes: {
    date: { control: 'text' },
    invoiceno: { control: 'text' },
    priceexclvat: { control: 'number' },
    priceinclvat: { control: 'number' },
    items: { control: 'number' },
    tag: { control: 'text' },
    onclick: { action: 'clicked' },
  },
};

const Template = (args) => <OrderInvoiceCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  date: '21 Aug 2025',
  invoiceno: '1333445678',
  priceexclvat: 268.9,
  priceinclvat: 296.8,
  items: 3,
  tag: 'Marketplace',
  tagColor: 'primary',
};

export const InStore = Template.bind({});
InStore.args = {
  date: '21 Aug 2025',
  invoiceno: '1333445678',
  priceexclvat: 268.9,
  priceinclvat: 296.8,
  items: 5,
  tag: 'In-store',
  tagColor: 'secondary',
};

export const SingleItem = Template.bind({});
SingleItem.args = {
  date: '22 Aug 2025',
  invoiceno: '1333445679',
  priceexclvat: 89.95,
  priceinclvat: 107.94,
  items: 1,
  tag: 'Online',
  tagColor: 'success',
};
