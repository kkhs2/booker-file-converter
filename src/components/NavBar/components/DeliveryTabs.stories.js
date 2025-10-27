/**
 * Storybook configuration for the DeliveryTabs component
 * This defines how the DeliveryTabs component will appear in Storybook and what controls/options are available.
 */

import { DeliveryTabs } from './DeliveryTabs';

export default {
  title: 'Components/Delivery Tabs',
  component: DeliveryTabs,
  tags: ['autodocs'],
  parameters: {
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

          return `<DeliveryTabs\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
The DeliveryTabs component displays delivery options with tabs for collection and delivery methods.

### Features
- Smooth transitions between tabs
- Responsive design
- Support for prices and item counts
- Location selection button
- Collection and delivery information display

### Props
- \`initialactiveitem\`: Sets the initial active tab (default: 'collect')
- \`collectlabel\`: Label for the collection tab
- \`deliverylabel\`: Label for the delivery tab
- \`collectlocation\`: Name of the collection location
- \`collectprice\`: Price for collection
- \`deliveryprice\`: Price for delivery
- \`collectcount\`: Number of items for collection
- \`deliverycount\`: Number of items for delivery
- \`deliverylocation\`: Name of the delivery location
- \`onlocationchange\`: Callback function when the location button is clicked
- \`nodelivery\`: Prevents toggle and shows delivery option as link
- \`nocollect\`: Prevents toggle and shows collection option as link
- \`browse\`: Enables the browse in-store option
- \`onclickdelivery\`: Callback function when the delivery tab is clicked
- \`onclickcollect\`: Callback function when the collection tab is clicked
- \`onclicklocation\`: Callback function when the location button is clicked
- \`onclickcollectaction\`: Callback function when the collect tab is clicked
- \`onclickdeliveryaction\`: Callback function when the delivery tab is clicked\
- \`hasnotification\`: Whether there is a notification or not
- \`nobasket\`: If true, hides the basket icon
- \`nodeliverytoggle\`: Prevents toggle and shows delivery option as link
- \`nocollecttoggle\`: Prevents toggle and shows collection option as link

### Design Figma References
- [Delivery Tabs UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library)
        `,
      },
    },
  },
  argTypes: {
    browse: {
      control: 'boolean',
      description: 'Enable browse in-store option',
      table: {
        type: { summary: 'boolean' },
      },
    },
    collectcount: {
      control: 'number',
      description: 'Number of items for collection',
      table: {
        type: { summary: 'number' },
      },
    },
    collectlabel: {
      control: 'text',
      description: 'Label for collection tab',
      table: {
        type: { summary: 'string' },
      },
    },
    collectlocation: {
      control: 'text',
      description: 'Collection location name',
      table: {
        type: { summary: 'string' },
      },
    },
    collectprice: {
      control: 'text',
      description: 'Price for collection',
      table: {
        type: { summary: 'string' },
      },
    },
    deliverycount: {
      control: 'number',
      description: 'Number of items for delivery',
      table: {
        type: { summary: 'number' },
      },
    },
    deliverylabel: {
      control: 'text',
      description: 'Label for delivery tab',
      table: {
        type: { summary: 'string' },
      },
    },
    deliverylocation: {
      control: 'text',
      description: 'Name of the delivery location',
      table: {
        type: { summary: 'string' },
      },
    },
    deliveryprice: {
      control: 'text',
      description: 'Price for delivery',
      table: {
        type: { summary: 'string' },
      },
    },
    initialactiveitem: {
      control: 'select',
      options: ['collect', 'delivery'],
      description: 'Initial active tab',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'collect' },
      },
    },
    nocollect: {
      control: 'boolean',
      description: 'Prevent collection toggle and show collection as link',
      table: {
        type: { summary: 'boolean' },
      },
    },
    nodelivery: {
      control: 'boolean',
      description: 'Prevent delivery toggle and show delivery as link',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onclickcollectaction: {
      action: 'collectActionClicked',
      description: 'Callback when collect tab is clicked',
    },
    onclickdeliveryaction: {
      action: 'deliveryActionClicked',
      description: 'Callback when delivery tab is clicked',
    },
    onclicklocation: {
      action: 'locationClicked',
      description: 'Callback when location button is clicked',
    },
    onlocationchange: {
      action: 'locationChanged',
      description: 'Callback when location button is clicked',
    },
    hasnotification: {
      control: 'boolean',
      description: 'Whether there is a notification or not',
      table: {
        type: { summary: 'boolean' },
      },
      defaultValue: false,
    },
    nobasket: {
      control: 'boolean',
      description: 'If true, hides the basket icon',
      table: {
        type: { summary: 'boolean' },
      },
      defaultValue: false,
    },
    nocollecttoggle: {
      control: 'boolean',
      description: 'If true, shows collect as simple link without toggle functionality',
      table: {
        type: { summary: 'boolean' },
      },
    },
    nodeliverytoggle: {
      control: 'boolean',
      description: 'If true, shows delivery as simple link without toggle functionality',
      table: {
        type: { summary: 'boolean' },
      },
    },

  },
};

/**
 * Default story.
 * Demonstrates basic usage with default settings.
 */
export const Default = {
  args: {
    collectlabel: 'Click & Collect',
    deliverylabel: 'Delivery',
    deliverylocation: 'London',
    collectlocation: 'Washington Macro',
    collectprice: '£11.20',
    deliveryprice: '£32.15',
    collectcount: 23,
    deliverycount: 298,
    onlocationchange: () => alert('Location changed'),
    nodelivery: false,
    nocollect: false,
    onclicklocation: () => alert('Location clicked'),
    onclickcollectaction: () => alert('Collect action clicked'),
    onclickdeliveryaction: () => alert('Delivery action clicked'),
  },

  render: (args) => {
    return (
      <div className="tw:max-w-[520px]">
        <DeliveryTabs {...args} />
      </div>
    );
  },
};

/**
 * Delivery Active story.
 * Demonstrates the component with delivery tab active.
 */
export const DeliveryActive = {
  args: {
    ...Default.args,
    initialactiveitem: 'delivery',
  },

  render: (args) => {
    return (
      <div className="tw:max-w-[520px]">
        <DeliveryTabs {...args} />
      </div>
    );
  },
};

/**
 * Prevent Toggle story.
 * Demonstrates the component with toggle prevention.
 */
export const NoToggleToDelivery = {
  args: {
    ...Default.args,
    collectlabel: 'Collect',
    deliverylabel: 'Delivery',
    nodeliverytoggle: true,
  },

  render: (args) => {
    return (
      <div className="tw:max-w-[520px]">
        <DeliveryTabs {...args} />
      </div>
    );
  },
};

export const NoToggleToCollect = {
  args: {
    ...Default.args,
    collectlabel: 'Collect',
    deliverylabel: 'Delivery',
    nocollecttoggle: true,
  },

  render: (args) => {
    return (
      <div className="tw:max-w-[520px]">
        <DeliveryTabs {...args} />
      </div>
    );
  },
};

/**
 * Browse in store
 * Demonstrates the component with a different label for the collection tab.
 */
export const BrowseInStore = {
  args: {
    ...Default.args,
    collectlabel: 'Browse in-store range',
    deliveryprice: null,
    deliverylabel: 'Shop online ',
    deliverylocation: null,
    browse: true,
  },

  render: (args) => {
    return (
      <div className="tw:max-w-[520px]">
        <DeliveryTabs {...args} />
      </div>
    );
  },
};

/**
 * Browse and Delivery
 * Demonstrates the component with 'Browse in-store range' and a full-featured 'Delivery' tab.
 */
export const BrowseAndDelivery = {
  args: {
    ...Default.args,
    collectlabel: 'Browse',
    browse: true,
    onbrowseaction: () => alert('Browse action clicked'),
    onclickdeliveryaction: () => alert('Delivery action clicked'),
  },
  render: (args) => {
    return (
      <div className="tw:max-w-[520px]">
        <DeliveryTabs {...args} />
      </div>
    );
  },
};

/**
 * Only Collect and Only Delivery stories.
 * Demonstrates the component with only one of the tabs available.
 */
export const OnlyCollect = {
  args: {
    ...Default.args,
    nodelivery: true,
  },

  render: (args) => {
    return (
      <div className="tw:max-w-[520px]">
        <DeliveryTabs {...args} />
      </div>
    );
  },
};

/**
 * Only Delivery story.
 * Demonstrates the component with only the delivery tab available.
 */
export const OnlyDelivery = {
  args: {
    ...Default.args,
    nocollect: true,
  },

  render: (args) => {
    return (
      <div className="tw:max-w-[520px]">
        <DeliveryTabs {...args} />
      </div>
    );
  },
};

/** No Basket story.
 * Demonstrates the component with the basket icon hidden.
 */
export const NoBasket = {
  args: {
    ...Default.args,
    nobasket: true,
  },

  render: (args) => {
    return (
      <div className="tw:max-w-[520px]">
        <DeliveryTabs {...args} />
      </div>
    );
  },
};

/**
 * All variations story.
 * Demonstrates different component configurations in a single view.
 */
export const AllVariations = {
  render: () => {
    const configs = [
      Default.args,
      DeliveryActive.args,
      NoToggleToDelivery.args,
      NoToggleToCollect.args,
      BrowseInStore.args,
      BrowseAndDelivery.args,
      OnlyCollect.args,
      OnlyDelivery.args,
    ];

    return (
      <div className="tw:flex tw:max-w-[520px] tw:flex-col tw:space-y-8 tw:lg:p-6">
        {configs.map((config, index) => (
          <DeliveryTabs {...config} key={index} />
        ))}
      </div>
    );
  },
};
