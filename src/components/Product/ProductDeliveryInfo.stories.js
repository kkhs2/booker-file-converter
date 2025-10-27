/**
 * Storybook configuration for the ProductDeliveryInfo component
 * This defines how the ProductDeliveryInfo component will appear in Storybook and what controls/options are available.
 */

import { ProductDeliveryInfo } from './ProductDeliveryInfo';

export default {
  title: 'Product/Product Delivery Info',
  component: ProductDeliveryInfo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The Product Delivery Info component renders delivery information inside a ProducCcard using a tag with an icon and label.

It supports four delivery types:
- **Chilled delivery** - For products requiring refrigeration
- **Ambient delivery** - For products that don't require special temperature control
- **Grocery delivery** - For general grocery items
- **Fresh delivery** - For fresh produce and perishables

### Design Figma References
- [Product Delivery Info UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=3598-30899&m=dev)
        `,
      },
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const props = Object.entries(args)
            .map(([key, value]) => {
              if (typeof value === 'string') {
                return `${key}="${value}"`;
              }
              return `${key}={${value}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<ProductDeliveryInfo\n  ${props}\n/>`;
        },
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#FAF9F5',
        },
        {
          name: 'white',
          value: '#FFFFFF',
        },
      ],
    },
  },
  argTypes: {
    data: {
      control: 'select',
      options: [
        'chilled-delivery',
        'ambient-delivery',
        'grocery-delivery',
        'fresh-delivery',
      ],
      description: 'The delivery type to display',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'chilled-delivery' },
      },
    },
    classname: {
      control: 'text',
      description: 'Additional CSS classes to apply to the component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },
};

export const Default = {
  args: {
    data: 'chilled-delivery',
  },
  render: (args) => (
    <div className="tw:p-4">
      <ProductDeliveryInfo {...args} />
    </div>
  ),
};

export const ChilledDelivery = {
  args: {
    data: 'chilled-delivery',
  },
  render: (args) => (
    <div className="tw:p-4">
      <ProductDeliveryInfo {...args} />
    </div>
  ),
};

export const AmbientDelivery = {
  args: {
    data: 'ambient-delivery',
  },
  render: (args) => (
    <div className="tw:p-4">
      <ProductDeliveryInfo {...args} />
    </div>
  ),
};

export const GroceryDelivery = {
  args: {
    data: 'grocery-delivery',
  },
  render: (args) => (
    <div className="tw:p-4">
      <ProductDeliveryInfo {...args} />
    </div>
  ),
};

export const FreshDelivery = {
  args: {
    data: 'fresh-delivery',
  },
  render: (args) => (
    <div className="tw:p-4">
      <ProductDeliveryInfo {...args} />
    </div>
  ),
};

export const WithCustomClass = {
  args: {
    data: 'chilled-delivery',
    classname: 'tw:border tw:border-dashed tw:border-gray-300',
  },
  render: (args) => (
    <div className="tw:p-4">
      <ProductDeliveryInfo {...args} />
    </div>
  ),
};

export const AllDeliveryTypes = {
  render: () => (
    <div className="tw:space-y-4 tw:p-4">
      <div className="tw:space-y-2">
        <h3 className="tw:text-lg tw:font-semibold">All Delivery Types</h3>
        <div className="tw:flex tw:flex-wrap tw:gap-2">
          <ProductDeliveryInfo data="chilled-delivery" />
          <ProductDeliveryInfo data="ambient-delivery" />
          <ProductDeliveryInfo data="grocery-delivery" />
          <ProductDeliveryInfo data="fresh-delivery" />
        </div>
      </div>
    </div>
  ),
};
