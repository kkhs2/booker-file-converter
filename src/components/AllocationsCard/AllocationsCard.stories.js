import AllocationsCard from './AllocationsCard';

export default {
  title: 'Components/Allocations/Card',
  component: AllocationsCard,
  tags: ['autodocs'],

  parameters: {
    layout: 'centered',

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

          return `<AllocationsCard\n  ${props}\n/>`;
        },
      },
      description: {
        component:
          'AllocationsCard is used to display allocation details including title, status, dates, and product images. It supports various status variants and can handle click events for actions.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The allocation title',
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle text with amendment information',
    },
    status: {
      control: 'text',
      description: 'Status of the allocation',
    },
    statusvariant: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'tertiary',
        'muted',
        'lightPrimary',
        'inverse',
        'club',
      ],
      description: 'Status tag variant style',
    },
    buyindate: {
      control: 'object',
      description: 'Buy-in date information object',
    },
    instoredate: {
      control: 'object',
      description: 'In-store date information object',
    },
    productimages: {
      control: 'object',
      description: 'Array of product image URLs',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the card is disabled',
    },
    isclosed: {
      control: 'boolean',
      description: 'Whether the allocation is closed',
    },
    onbuttonclick: {
      action: 'clicked',
      description: 'Callback function for button click',
    },
  },
};

// Default story
export const Default = {
  args: {
    title: 'NP2',
    subtitle: 'You can amend quantities until Thursday 21 Feb',
    status: 'Not reviewed',
    statusvariant: 'secondary',
    buyindate: {
      label: 'Buy-in',
      value: '28 Jan - 20 Feb',
    },
    instoredate: {
      label: 'In-store',
      value: '28 - 29 Feb',
    },
    productimages: [
      './images/search/41sHlEhACwL.jpg',
      './images/search/81igtG3QpxL.jpg',
      './images/search/324617-Nutella-750g.jpg',
      './images/search/5740900805408_0_XL.jpg',
      './images/search/dy422.jpg.webp',
      './images/search/heinz_baked_beanz_fridge_pack_1kg_51681_T1.jpg',
    ],
    disabled: false,
    isclosed: false,
  },
};

// Confirmed - No Additionals status
export const ConfirmedNoAdditionals = {
  args: {
    ...Default.args,
    status: 'Confirmed - No Additionals',
    statusvariant: 'lightPrimary',
  },
};

// With fewer product images
export const WithFewerProducts = {
  args: {
    ...Default.args,
    productimages: [
      './images/search/41sHlEhACwL.jpg',
      './images/search/81igtG3QpxL.jpg',
      './images/search/324617-Nutella-750g.jpg',
      './images/search/5740900805408_0_XL.jpg',
    ],
  },
};

// Custom dates
export const CustomDates = {
  args: {
    ...Default.args,
    buyindate: {
      label: 'Order Period',
      value: '1 Mar - 15 Mar',
    },
    instoredate: {
      label: 'Available',
      value: '16 - 18 Mar',
    },
  },
};

// Closed allocation
export const Closed = {
  args: {
    ...Default.args,
    title: 'BU WEEK 45',
    status: 'Order placed',
    statusvariant: 'quaternary',
    isclosed: true,
    buyindate: {
      label: 'Closed',
      value: 'Wed 20 Feb',
    },
    // For closed allocations, we don't need instoredate
    instoredate: {
      label: '',
      value: '',
    },
  },
};
