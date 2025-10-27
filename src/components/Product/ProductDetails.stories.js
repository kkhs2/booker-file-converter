import { ProductDetails } from './ProductDetails';

export default {
  title: 'Product/Product Details',
  component: ProductDetails,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The Product Details component renders the main product information section including tags, name, servings, storage types and dietary/feature tags.

### Design Figma References
- [Product Details UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library)
        `,
      },
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const props = Object.entries(args)
            .map(([key, value]) => {
              if (Array.isArray(value)) {
                return `${key}={${JSON.stringify(value)}}`;
              }
              if (typeof value === 'string') {
                return `${key}="${value}"`;
              }
              return `${key}={${value}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<ProductDetails\n  ${props}\n/>`;
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
      ],
    },
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'Product ID',
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      control: 'text',
      description: 'Product name',
      table: {
        type: { summary: 'string' },
      },
    },
    tags: {
      control: 'array',
      description: 'Product tags',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    servings: {
      control: 'array',
      description: 'Product servings information',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    storageType: {
      control: 'select',
      description: 'Product storage type',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    productTags: {
      control: 'array',
      description: 'Product dietary/feature tags',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    variant: {
      control: 'select',
      options: ['card', 'pdp'],
      description: 'Product variant',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export const Default = {
  args: {
    id: '212321',
    name: 'Absolute Swedish Vodka 70cl',
    tags: ['Best-seller in category'],
    servings: ['Case of 4 x 2L', 'Serves 10'],
    storageType: 'frozen',
    productTags: ['Vegetarian', 'Vegan', 'Gluten Free', 'Probiotic'],
    variant: 'pdp',
  },
  render: (args) => (
    <div className="tw:max-w-[800px]">
      <ProductDetails {...args} />
    </div>
  ),
};

export const WithoutTags = {
  args: {
    ...Default.args,
    tags: [],
    productTags: [],
  },
};

export const WithStorageTypeOnly = {
  args: {
    ...Default.args,
    tags: [],
    productTags: [],
    servings: [],
  },
};
