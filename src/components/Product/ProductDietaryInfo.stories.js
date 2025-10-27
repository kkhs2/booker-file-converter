/**
 * Storybook configuration for the ProductDietaryInfo component
 * This defines how the ProductDietaryInfo component will appear in Storybook and what controls/options are available.
 */

import { ProductDietaryInfo } from './ProductDietaryInfo';

export default {
  title: 'Product/Product Dietary Info',
  component: ProductDietaryInfo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The Product Dietary Info component displays dietary information for products using icon tags with tooltips. It renders dietary tags for common dietary requirements such as vegetarian, vegan, halal, kosher, gluten-free, and dairy-free options.

### Features
- Displays dietary information as icon tags
- Supports tooltips for accessibility
- Responsive design with flexible layout
- Returns null when no dietary data is provided

### Supported Dietary Types
- \`vegetarian\` - Vegetarian products
- \`vegan\` - Vegan products  
- \`halal\` - Halal certified products
- \`kosher\` - Kosher certified products
- \`gluten-free\` - Gluten-free products
- \`dairy-free\` - Dairy-free products

### Design Figma References
- [Product Dietary Info UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=2468-12301&m=dev)
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

          return `<ProductDietaryInfo\n  ${props}\n/>`;
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
      control: {
        type: 'multi-select',
      },
      options: [
        'vegetarian',
        'vegan',
        'halal',
        'kosher',
        'gluten-free',
        'dairy-free',
      ],
      description:
        'Array of dietary information strings. Supported values: vegetarian, vegan, halal, kosher, gluten-free, dairy-free',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
  },
};

// Default story
export const Default = {
  args: {
    data: ['vegetarian', 'gluten-free'],
  },
};

// Single dietary tag
export const SingleDietaryTag = {
  args: {
    data: ['vegan'],
  },
};

// Multiple dietary tags
export const MultipleDietaryTags = {
  args: {
    data: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  },
};

// All dietary options
export const AllDietaryOptions = {
  args: {
    data: [
      'vegetarian',
      'vegan',
      'halal',
      'kosher',
      'gluten-free',
      'dairy-free',
    ],
  },
};

// Halal and Kosher
export const ReligiousDietary = {
  args: {
    data: ['halal', 'kosher'],
  },
};

// Allergy friendly
export const AllergyFriendly = {
  args: {
    data: ['gluten-free', 'dairy-free'],
  },
};

// All variations showcase
export const AllVariations = {
  render: () => (
    <div className="tw:flex tw:flex-col tw:space-y-6 tw:p-6">
      <div className="tw:space-y-2">
        <h3 className="tw:text-lg tw:font-medium tw:text-gray-900">
          Single Dietary Tag
        </h3>
        <ProductDietaryInfo data={['vegan']} />
      </div>

      <div className="tw:space-y-2">
        <h3 className="tw:text-lg tw:font-medium tw:text-gray-900">
          Multiple Dietary Tags
        </h3>
        <ProductDietaryInfo data={['vegetarian', 'gluten-free']} />
      </div>

      <div className="tw:space-y-2">
        <h3 className="tw:text-lg tw:font-medium tw:text-gray-900">
          Religious Dietary Requirements
        </h3>
        <ProductDietaryInfo data={['halal', 'kosher']} />
      </div>

      <div className="tw:space-y-2">
        <h3 className="tw:text-lg tw:font-medium tw:text-gray-900">
          Allergy Friendly
        </h3>
        <ProductDietaryInfo data={['dairy-free', 'gluten-free']} />
      </div>

      <div className="tw:space-y-2">
        <h3 className="tw:text-lg tw:font-medium tw:text-gray-900">
          All Dietary Options
        </h3>
        <ProductDietaryInfo
          data={[
            'vegetarian',
            'vegan',
            'halal',
            'kosher',
            'gluten-free',
            'dairy-free',
          ]}
        />
      </div>
    </div>
  ),
};
