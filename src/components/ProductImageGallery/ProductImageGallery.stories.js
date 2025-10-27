/**
 * Storybook configuration for the ProductImageGallery component
 * This defines how the ProductImageGallery component will appear in Storybook and what controls/options are available.
 */

// Import the component
import ProductImageGallery from './ProductImageGallery';

// Define the story configuration
export default {
  // The title under which the ProductImageGallery component will appear in Storybook's navigation
  title: 'Product/Product Image Gallery',

  // Tags used by Storybook for organisational purposes
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

          return `<ProductImageGallery\n  ${props}\n />`;
        },
      },
      description: {
        component: `
### ProductImageGallery Component
The ProductImageGallery component renders a gallery of product images with zoom and thumbnail functionality.


### Design Figma References
- [Product Image UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=4144-52377&m=dev)
        `,
      },
    },
  },

  // Define controls (props) for the component
  argTypes: {
    images: {
      control: {
        type: 'array',
      },
    },
  },
};

export const Default = {
  // The default story for the ProductImageGallery component
  args: {
    images: [
      './images/absolut1.png',
      './images/absolut2.png',
      './images/absolut3.png',
      './images/absolut4.png',
      './images/absolut5.png',
      './images/absolut1.png',
      './images/absolut2.png',
      './images/absolut3.png',
      './images/absolut4.png',
      './images/absolut5.png',
    ],
  },
  // The default story for the ProductImageGallery component
  render: (args) => <ProductImageGallery {...args} />,
};
