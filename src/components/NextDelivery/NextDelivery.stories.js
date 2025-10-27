/**
 * Storybook configuration for the Next Delivery component
 * This defines how the Next Delivery component will appear in Storybook and what controls/options are available.
 */

import NextDelivery from './NextDelivery';
import Icons from '../Icons/Icons';

// Define the story configuration
export default {
  // The title under which the Next Delivery component will appear in Storybook's navigation
  title: 'Components/Next Delivery',

  parameters: {
    docs: {
      description: {
        component: `
The NextDelivery component is used to display delivery information with CTAs to different actions.

### Design Figma References
- [Next Delivery UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=2726-40405&m=dev)
`,
      },
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          // Helper function to clean objects
          const cleanObject = (obj) => {
            if (Array.isArray(obj)) {
              return obj.map(cleanObject);
            }
            if (obj && typeof obj === 'object') {
              const cleaned = {};
              for (const [key, value] of Object.entries(obj)) {
                if (key.startsWith('__')) continue;
                // Handle icon components specially
                if (key === 'iconleft' || key === 'iconright') {
                  if (value?.props?.classname) {
                    cleaned[key] =
                      `<Icons.chevronRight className="${value.props.classname}" />`;
                    continue;
                  }
                }
                cleaned[key] = cleanObject(value);
              }
              return cleaned;
            }
            return obj;
          };

          // Convert args to JSX props string
          const props = Object.entries(cleanObject(args))
            .map(([key, value]) => {
              if (typeof value === 'boolean') {
                return value ? key : null;
              }
              if (typeof value === 'string') {
                return `${key}="${value}"`;
              }
              return `${key}={${JSON.stringify(value, null, 2)}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<NextDelivery\n ${props}\n />`;
        },
      },
    },
  },

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  argTypes: {
    // Tag
    tag: {
      control: 'object',
      description: 'Tag associated with the feature',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '' },
      },
    },

    // Message
    message: {
      control: 'object',
      description: 'Delivery message',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: false },
      },
    },

    // Message if there is an issue
    issuemessage: {
      control: 'object',
      description: 'Message if there is an issue',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: false },
      },
    },

    // Time till delivery
    timetilldelivery: {
      control: 'text',
      description: 'Delivery message',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Estimate delivery date
    estimateddelivery: {
      control: 'text',
      description: 'Estimated arrival date',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // CTA
    ctas: {
      control: 'array',
      description: 'Call-to-action text',
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: [] },
      },
    },

    // CTA message
    ctamessage: {
      control: 'text',
      description: 'Message displayed above CTA buttons',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Flags if there is a delivery issue
    issue: {
      control: 'boolean',
      description: 'Is there is a delivery issue',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },

    // Information if there is a change to order
    changeorder: {
      control: 'object',
      description: 'Information if there is a change to order',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: false },
      },
    },
  },
};

/**
 * Default Next Delivery message
 */
export const Default = {
  args: {
    tag: {
      text: 'Estimated arrival',
      style: 'tw:bg-primary-600',
    },
    message: {
      text: 'Your next delivery is in',
    },
    timetilldelivery: '3 days',
    estimateddelivery: `Wednesday 12 Apr 2025 \u00A0 · \u00A0  4 - 5pm`,
    ctas: [
      {
        label: 'View order',
        iconleft: () => <Icons.cart />,
        variant: 'tertiary',
        href: 'https://www.google.com',
      },
      {
        label: 'See all deliveries',
        iconleft: null,
        variant: 'secondary',
        href: 'https://www.google.com',
      },
    ],
  },
  render: (args) => (
    <div className="tw:max-w-max">
      <NextDelivery {...args} />
    </div>
  ),
};

/**
 * Default Next Delivery message with delivery date of tomorrow
 */
export const Tomorrow = {
  args: {
    tag: {
      text: 'Estimated arrival',
      style: 'tw:bg-primary-600',
    },
    message: {
      text: 'Your next delivery is',
    },
    timetilldelivery: 'Tomorrow',
    estimateddelivery: `Wednesday 12 Apr 2025 \u00A0 · \u00A0  4 - 5pm`,
    ctas: [
      {
        label: 'View order',
        iconleft: () => <Icons.cart />,
        variant: 'tertiary',
        href: 'https://www.google.com',
      },
      {
        label: 'See all deliveries',
        icon: null,
        variant: 'secondary',
        href: 'https://www.google.com',
      },
    ],
  },
  render: (args) => (
    <div className="tw:max-w-max">
      <NextDelivery {...args} />
    </div>
  ),
};

/**
 * Default Next Delivery message with issue of delivery
 */
export const DeliveryIssue = {
  args: {
    issue: true,
    issuemessage: {
      text: `There's an issue with your delivery`,
      iconleft: () => (
        <Icons.alertCircle classname="tw:h-[58px] tw:lg:h-[76px] tw:flex-shrink-0 tw:text-primary" />
      ),
      message:
        'Please contact your local branch in Sheffield for more information. We apologise for any inconvenience caused.',
    },
    ctas: [
      {
        label: 'Call Sheffield branch',
        variant: 'primary',
        href: 'https://www.google.com',
      },
      {
        label: 'View order',
        iconleft: () => <Icons.cart />,
        variant: 'secondary',
        href: 'https://www.google.com',
      },
      {
        label: 'See all deliveries',
        iconleft: null,
        variant: 'secondary',
        href: 'https://www.google.com',
      },
    ],
  },
  render: (args) => (
    <div className="tw:max-w-max">
      <NextDelivery {...args} />
    </div>
  ),
};

/**
 * Default Next Delivery message with delivery date of today
 */
export const Today = {
  args: {
    tag: {
      text: 'Estimated arrival',
      style: 'tw:bg-primary-600',
    },
    message: {
      text: 'Your delivery is arriving',
    },
    timetilldelivery: 'Today',
    estimateddelivery: `Wednesday 12 Apr 2025 \u00A0 · \u00A0  4 - 5pm`,
    ctas: [
      {
        label: 'View order',
        iconleft: () => <Icons.cart />,
        variant: 'tertiary',
        href: 'https://www.google.com',
      },
      {
        label: 'See all deliveries',
        iconleft: null,
        variant: 'secondary',
        href: 'https://www.google.com',
      },
    ],
  },
  render: (args) => (
    <div className="tw:max-w-max">
      <NextDelivery {...args} />
    </div>
  ),
};

/**
 * Default Next Delivery message with message that is has been delivered
 */
export const Delivered = {
  args: {
    message: {
      text: 'Order delivered',
      iconleft: () => <Icons.checkCircle />,
      textsize: 'tw:text-2xl tw:lg:text-5xl',
    },
    estimateddelivery: `Wednesday 12 Apr 2025 \u00A0 · \u00A0  4:36pm`,
    ctas: [
      {
        label: 'View invoice',
        variant: 'tertiary',
        href: 'https://www.google.com',
      },
      {
        label: 'Make a claim',
        iconleft: null,
        variant: 'secondary',
        href: 'https://www.google.com',
      },
      {
        label: 'See all deliveries',
        iconleft: null,
        variant: 'secondary',
        href: 'https://www.google.com',
      },
    ],
  },
  render: (args) => (
    <div className="tw:max-w-max">
      <NextDelivery {...args} />
    </div>
  ),
};

/**
 * Default Next Delivery message with no deliveries scheduled but items in basket
 */
export const NoDeliveriesScheduled = {
  args: {
    message: {
      text: 'No deliveries\n scheduled',
      iconright: () => (
        <Icons.truck
          stroke="white"
          classname="tw:h-[58px] tw:w-[58px] tw:lg:h-[74px] tw:lg:w-[74px]"
        />
      ),
      textsize: 'tw:text-2xl tw:lg:text-5xl tw:leading-[1.2]',
    },
    ctas: [
      {
        label: 'View basket',
        iconleft: () => <Icons.cart />,
        variant: 'tertiary',
        href: 'https://www.google.com',
      },
      {
        label: 'See all deliveries',
        iconleft: null,
        variant: 'secondary',
        href: 'https://www.google.com',
      },
    ],
    ctamessage:
      "You have 3 items in your basket, but you haven't checked out yet",
  },
  render: (args) => (
    <div className="tw:max-w-max">
      <NextDelivery {...args} />
    </div>
  ),
};

/**
 * Default Next Delivery message with no deliveries scheduled with NO items in basket
 */
export const NoDeliveriesScheduledNoItemsInBasket = {
  args: {
    message: {
      text: 'No deliveries\n scheduled',
      iconright: () => (
        <Icons.truck
          stroke="white"
          classname="tw:h-[58px] tw:w-[58px] tw:lg:h-[74px] tw:lg:w-[74px]"
        />
      ),
      textsize: 'tw:text-2xl tw:lg:text-5xl tw:leading-[1.2]',
    },
    ctas: [
      {
        label: 'Browse products',
        variant: 'tertiary',
        href: 'https://www.google.com',
      },
    ],
    ctamessage: 'Add items to your basket and check out to book a delivery.',
  },
  render: (args) => (
    <div className="tw:max-w-max">
      <NextDelivery {...args} />
    </div>
  ),
};

/**
 * Future iteration of Default where option for user to make changes to delivery
 */
export const DefaultFuture = {
  args: {
    tag: {
      text: 'Estimated arrival',
      style: 'tw:bg-primary-600',
    },
    message: {
      text: 'Your next delivery is in',
    },
    timetilldelivery: '3 days',
    estimateddelivery: `Wednesday 12 Apr 2025 \u00A0 · \u00A0  4 - 5pm`,
    ctas: [
      {
        label: 'Make changes',
        variant: 'primary',
        href: 'https://www.google.com',
      },
      {
        label: 'See all deliveries',
        iconleft: null,
        variant: 'secondary',
        href: 'https://www.google.com',
      },
    ],
    changeorder: {
      icon: () => <Icons.edit classname="tw:h-[16px] tw:w-[16px]" />,
      text: 'Make changes until Mon 10 Apr 11:59pm',
    },
  },
  render: (args) => (
    <div className="tw:max-w-max">
      <NextDelivery {...args} />
    </div>
  ),
};

/**
 * Future iteration of Tomorrow where info that order cannot be changed
 */
export const TomorrowFuture = {
  args: {
    tag: {
      text: 'Estimated arrival',
      style: 'tw:bg-primary-600',
    },
    message: {
      text: 'Your next delivery is',
    },
    timetilldelivery: 'Tomorrow',
    estimateddelivery: `Wednesday 12 Apr 2025 \u00A0 · \u00A0  4 - 5pm`,
    ctas: [
      {
        label: 'View order',
        iconleft: () => <Icons.cart />,
        variant: 'tertiary',
        href: 'https://www.google.com',
      },
      {
        label: 'See all deliveries',
        iconleft: null,
        variant: 'secondary',
        href: 'https://www.google.com',
      },
    ],
    changeorder: {
      icon: () => <Icons.truck classname="tw:h-[16px] tw:w-[16px]" />,
      text: `Order is on its way. It can't be changed`,
    },
  },
  render: (args) => (
    <div className="tw:max-w-max">
      <NextDelivery {...args} />
    </div>
  ),
};

/**
 * Future iteration where items have substitutes
 */
export const TodayFuture = {
  args: {
    tag: {
      text: 'Estimated arrival',
      style: 'tw:bg-primary-600',
    },
    message: {
      text: 'Your delivery is arriving',
    },
    timetilldelivery: 'Today',
    estimateddelivery: `Wednesday 12 Apr 2025 \u00A0 · \u00A0  4 - 5pm`,
    ctas: [
      {
        label: 'View order & subtitutions',
        iconleft: () => <Icons.cart />,
        variant: 'tertiary',
        href: 'https://www.google.com',
      },
      {
        label: 'See all deliveries',
        iconleft: null,
        variant: 'secondary',
        href: 'https://www.google.com',
      },
    ],
    changeorder: {
      icon: () => <Icons.truck classname="tw:h-[16px] tw:w-[16px]" />,
      text: `Order is on its way. It can't be changed`,
      tag: {
        message: 'There are 5 subsitutions',
        icon: () => <Icons.info />,
      },
    },
  },
  render: (args) => (
    <div className="tw:max-w-max">
      <NextDelivery {...args} />
    </div>
  ),
};

/**
 * Future iteration where item has been delayed
 */
export const DelayedFuture = {
  args: {
    tag: {
      text: 'New estimated arrival',
      style: 'tw:bg-orange-500 tw:text-black-1000',
    },
    message: {
      text: 'Your delivery has been',
    },
    timetilldelivery: 'Delayed',
    estimateddelivery: `Wednesday 12 Apr 2025 \u00A0 · \u00A0  6 - 9pm`,
    ctas: [
      {
        label: 'View order & subtitutions',
        iconleft: () => <Icons.cart />,
        variant: 'tertiary',
        href: 'https://www.google.com',
      },
      {
        label: 'See all deliveries',
        iconleft: null,
        variant: 'secondary',
        href: 'https://www.google.com',
      },
    ],
    changeorder: {
      icon: () => <Icons.truck classname="tw:h-[16px] tw:w-[16px]" />,
      text: `Order is on its way. It can't be changed`,
      tag: {
        message: 'There are 5 subsitutions',
        icon: () => <Icons.info />,
      },
    },
  },
  render: (args) => (
    <div className="tw:max-w-max">
      <NextDelivery {...args} />
    </div>
  ),
};

/**
 * All variations story.
 * Demonstrates different component configurations in a single view.
 */
export const AllVariations = {
  render: () => {
    const configs = [
      Default.args,
      Tomorrow.args,
      DeliveryIssue.args,
      Today.args,
      Delivered.args,
      NoDeliveriesScheduled.args,
      NoDeliveriesScheduledNoItemsInBasket.args,
      DefaultFuture.args,
      TomorrowFuture.args,
      TodayFuture.args,
      DelayedFuture.args,
    ];

    return (
      <div className="tw:max-w-max tw:space-y-8">
        {configs.map((config, index) => (
          <NextDelivery key={index} {...config} />
        ))}
      </div>
    );
  },
};
