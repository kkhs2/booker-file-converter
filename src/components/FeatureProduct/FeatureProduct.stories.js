/**
 * Storybook configuration for the Feature Product component
 * This defines how the Feature Product component will appear in Storybook and what controls/options are available.
 */

// Import the component
import { faker } from '@faker-js/faker';
import FeatureProduct from './FeatureProduct';
import { convertPropsToString } from '../../../utils/storybookHelpers';
import { FeatureProductRail } from './components/FeatureProductRail';

// Define the story configuration
export default {
  // The title under which the Feature Product component will appear in Storybook's navigation
  title: 'Cards/Feature Product Card',

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the component
  argTypes: {
    featurecardprops: {
      control: 'object',
      description: 'Props for the FeatureCard component',
      table: {
        type: { summary: 'object' },
      },
    },
    productcardprops: {
      control: 'object',
      description: 'Props for the ProductCard component',
      table: {
        type: { summary: 'object' },
      },
    },
  },

  // Added to override default story height if needed for this component
  parameters: {
    docs: {
      story: {
        height: '300px',
      },
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const props = convertPropsToString(args);

          return `<FeatureProduct\n ${props}\n />`;
        },
      },
      description: {
        component: `
  ### Description
  A Feature Product Card component displays product information and a feature with an image and text in a card format that can be used in grids, lists or rails. It is used to display product details such as name, price, availability, and other relevant information.
  
  ### Design Figma References
  - [Feature Product Cards UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=3225-88717&t=3Vs8rF4bWFX2TbEB-4)
        `,
      },
    },
  },
};

/**
 * Reusable render method.
 * The args object provides dynamic values for different stories.
 */
const Render = (args) => (
  <div className="tw-container">
    <FeatureProduct {...args} />
  </div>
);

/**
 * Default story.
 * Demonstrates basic usage with default settings.
 */
export const Default = {
  args: {
    featurecardprops: {
      image: './images/meatloaf.png',
      variant: 'feature-product',
      title:
        'A great value joint, boasting the deep flavour that make our grass fed British beef so special.',
      ctahidden: true,
    },
    productcardprops: {
      url: faker.internet.url(),
      image: './images/products/image1.png',
      name: 'Blackgate Beef D Rump',
      price: 35.49,
      priceperunit: '11.37 / kg',
      availability: {
        outofstocknotice: null,
        alternativeaction: false,
      },
      offer: {
        label: 'Offer',
        date: 'until 07 Feb 2025',
        prevText: 'Was £6.50',
        discountText: 'Save £1.60',
      },
      servings: ['5.5kg', 'Serves 10'],

      wishlist: {
        lists: [
          {
            id: '123456',
            name: 'My Wishlist',
            selected: true,
            count: 2,
          },
          {
            id: '123457',
            name: 'My Other Wishlist',
            selected: false,
            count: 121,
          },
        ],
      },

      addedtowishlist: false,

      butchersnote: {
        hasnote: false,
        note: 'some note',
      },
    },
  },
  render: Render,
};

/**
 * Feature Product card with image story.
 * Demonstrates basic usage with a feature image variation.
 */
export const FeatureProductWithImage = {
  args: {
    featurecardprops: {
      image: './images/glasses.png',
      variant: 'feature-product',
      ctahidden: true,
    },
    productcardprops: {
      id: '212321',
      url: faker.internet.url(),
      image: './images/products/product2.png',
      name: 'Buffalo Trace Kentucky Straight Bourbon Whiskey 70cl',
      price: '£65.49',
      pricewithvat: '£5.49',
      pricerpp: {
        value: '2.15 RRP',
        locked: true,
      },
      pricepor: {
        value: '31.9% POR',
      },
      tags: ['online-exclusive'],
      availability: {
        outofstocknotice: null,
        alternativeaction: false,
      },
      offer: {
        label: 'Offer',
        date: 'until 07 Feb 2025',
        prevText: 'Was £6.50',
        discountText: 'Save £1.60',
      },
      servings: ['70cl'],

      wishlist: {
        lists: [
          {
            id: '123456',
            name: 'My Wishlist',
            selected: true,
            count: 2,
          },
          {
            id: '123457',
            name: 'My Other Wishlist',
            selected: false,
            count: 121,
          },
        ],
      },

      addedtowishlist: false,
    },
  },
  render: Render,
};

/**
 * Feature Product card with image story.
 * Demonstrates basic usage with a feature image variation and a list Product layout.
 */
export const FeatureProductWithImageAndList = {
  args: {
    featurecardprops: {
      image: './images/glasses-full.png',
      variant: 'feature-product',
      ctahidden: true,
    },
    productcardprops: {
      id: '212321',
      mode: 'list',
      url: faker.internet.url(),
      image: './images/products/product2.png',
      name: 'Buffalo Trace Kentucky Straight Bourbon Whiskey 70cl',
      price: '£65.49',
      pricewithvat: '£5.49',
      pricerpp: {
        value: '2.15 RRP',
        locked: true,
      },
      pricepor: {
        value: '31.9% POR',
      },
      tags: ['new'],
      availability: {
        status: 'inStock',
        outofstocknotice: null,
        alternativeaction: false,
      },
      offer: {
        label: 'Offer',
        date: 'until 07 Feb 2025',
        prevText: 'Was £6.50',
        discountText: 'Save £1.60',
      },
      servings: ['70cl'],

      wishlist: {
        lists: [
          {
            id: '123456',
            name: 'My Wishlist',
            selected: true,
            count: 2,
          },
          {
            id: '123457',
            name: 'My Other Wishlist',
            selected: false,
            count: 121,
          },
        ],
      },

      addedtowishlist: false,
    },
  },
  render: Render,
};

/**
 * Rail section story.
 * Demonstrates the component in a horizontal slider.
 * This story uses the Carousel component to display a list of ProductCard components.
 */
export const FeatureProductCardRailSection = {
  render: () => {
    return (
      <div className="tw-container tw:h-full tw:min-h-[800px]">
        <FeatureProductRail title="Best sellers">
          {Array.from({ length: 12 }).map((_, index) => (
            <FeatureProduct
              key={index}
              fixedcardwith={false}
              {...Default.args}
            />
          ))}
        </FeatureProductRail>
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
      FeatureProductWithImage.args,
      FeatureProductWithImageAndList.args,
      // FeatureProductCardRailSection.args,
    ];

    return (
      <div className="tw:flex tw:flex-col tw:space-y-4 tw:p-6">
        {configs.map((config, index) => (
          <div key={index}>{FeatureProduct(config)}</div>
        ))}
      </div>
    );
  },
};
