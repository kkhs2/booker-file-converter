/**
 * Storybook configuration for the Image Banner Navigation component
 * This defines how the Image Banner Navigation component will appear in Storybook and what controls/options are available.
 */

// Imports
import ImageBannerNavigation from './ImageBannerNavigation';
import NavigationCard from '../NavigationCard/NavigationCard';
import Icons from '../Icons/Icons';
import { getRandomNavigationCardImage } from '../../../utils/mockData';

// Define the story configuration
export default {
  title: 'Sections/Image Banner Navigation',
  component: ImageBannerNavigation,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
This component implements an Image Banner Navigation section with responsive design.

### Design Figma References
- [Image Banner Navigation UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=3611-51263&t=H4Dt4Pok6Tab75QU-4)
        `,
      },
    },
  },
  argTypes: {
    // Image Desktop
    imagedesktop: {
      control: 'text',
      description: 'The desktop image for the component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },

    // Image Mobile
    imagemobile: {
      control: 'text',
      description: 'The mobile image for the component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },

    // Banner Title
    bannertitle: {
      control: 'text',
      description: 'The title for the banner',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },

    // Banner Description
    bannerdescription: {
      control: 'text',
      description: 'The description for the banner',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },

    // Card Title
    cardstitle: {
      control: 'text',
      description: 'The title for the cards section',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },

    // Featured Navigation Cards
    featurednavigationcards: {
      control: 'object',
      description: 'Array of featured navigation cards to display',
      table: {
        defaultValue: {
          summary: [],
        },
      },
    },

    // Navigation Cards
    navigationcards: {
      control: 'object',
      description: 'Array of navigation cards to display',
      table: {
        defaultValue: {
          summary: [],
        },
      },
    },

    // Desktop Columns
    desktopcolumns: {
      control: { type: 'number', min: 2, max: 6 },
      description: 'Number of columns on desktop view',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 3 },
      },
    },

    // Mobile Carousel
    mobilecarousel: {
      control: 'boolean',
      description: 'Whether to show carousel on mobile',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },

    // Mobile Rows
    mobilerows: {
      control: { type: 'number', min: 1, max: 4 },
      description: 'Number of carousel rows to show on mobile',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 2 },
      },
    },
  },
};

/**
 * Template for rendering the QuickLinks component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => <ImageBannerNavigation {...args} />;

/**
 * Image Banner Navigation Default
 */
export const Default = Template.bind({});
Default.args = {
  imagedesktop: './images/standard-banner1.png',
  imagemobile: './images/standard-banner-mobile.png',
  bannertitle: 'Spirits & Liqueurs',
  bannerdescription:
    'Stock up on our wide range of top-brand spirits and liqueurs at unbeatably low prices.',
  navigationcards: Array(7)
    .fill()
    .map((_, index) => () => (
      <NavigationCard
        label={`Beer cider & Alcoholic RTD's ${index + 1}`}
        background="white"
        elementleft="./images/courvoisier.png"
        classname="tw:p-2 tw:pr-4 tw:lg:p-2 tw:lg:pr-4"
      />
    )),
};

/**
 * With Featured Navigation Cards
 */
export const WithFeaturedCards = Template.bind({});
WithFeaturedCards.args = {
  ...Default.args,
  cardstitle: 'Featured Categories',
  featurednavigationcards: [
    () => (
      <NavigationCard
        label="New products"
        background="orange"
        elementleft="./images/courvoisier.png"
        elementright={() => (
          <div className="tw:hidden tw:rounded-lg tw:bg-primary-700 tw:px-2 tw:py-1 tw:group-hover:bg-black tw:lg:flex">
            <span className="tw:inline-flex tw:text-center tw:text-lg tw:font-normal tw:text-white">
              10 new products
            </span>
          </div>
        )}
        classname="tw:lg:max-w-full tw:font-semibold tw:text-center tw:text-xl tw:lg:text-3xl tw:p-2 tw:pr-4 tw:lg:p-2 tw:lg:pr-4"
      />
    ),

    () => (
      <NavigationCard
        label="New offers"
        background="white"
        elementleft="./images/courvoisier.png"
        elementright={() => (
          <div className="tw:hidden tw:rounded-lg tw:bg-secondary-1000 tw:px-2 tw:py-1 tw:lg:flex">
            <span className="tw:inline-flex tw:text-center tw:text-lg tw:font-normal tw:text-black">
              10 new offers
            </span>
          </div>
        )}
        classname="tw:lg:max-w-full tw:bg-yellow-700 tw:hover:bg-yellow-800 tw:font-semibold tw:text-center tw:text-xl tw:lg:text-3xl tw:p-2 tw:pr-4 tw:lg:p-2 tw:lg:pr-4"
      />
    ),

    () => (
      <NavigationCard
        label="Allocations"
        background="white"
        elementleft={() => <Icons.listGraphic width="52" height="52" />}
        classname="tw:lg:max-w-full tw:py-3 tw:lg:py-3"
      />
    ),

    () => (
      <NavigationCard
        label="Pre-sell"
        background="white"
        elementleft={() => <Icons.gfxChevron width="52" height="52" />}
        classname="tw:lg:max-w-full tw:py-3 tw:lg:py-3"
      />
    ),
  ],
};

/**
 * Mobile Carousel enabled
 */
export const MobileCarousel = Template.bind({});
MobileCarousel.args = {
  ...Default.args,
  mobilecarousel: true,
  mobilerows: 2,
  navigationcards: Array(12)
    .fill()
    .map((_, index) => () => (
      <NavigationCard
        key={index}
        label={`Category ${index + 1}`}
        background="white"
        elementleft="./images/courvoisier.png"
        classname="tw:p-2 tw:pr-4 tw:lg:p-2 tw:lg:pr-4"
      />
    )),
};

/**
 * Custom Columns
 */
export const CustomColumns = Template.bind({});
CustomColumns.args = {
  ...Default.args,
  desktopcolumns: 4,
  navigationcards: Array(8)
    .fill()
    .map((_, index) => () => (
      <NavigationCard
        label={`Category ${index + 1}`}
        background="white"
        elementleft="./images/courvoisier.png"
        classname="tw:p-2 tw:pr-4 tw:lg:p-2 tw:lg:pr-4"
      />
    )),
};

/**
 * Complete Example
 */
export const CompleteExample = Template.bind({});
CompleteExample.args = {
  imagedesktop: './images/standard-banner1.png',
  imagemobile: './images/standard-banner-mobile.png',
  bannertitle: 'Shop by Category',
  bannerdescription:
    'Explore our complete range of products across all categories.',
  cardstitle: 'Popular Categories',
  desktopcolumns: 3,
  featurednavigationcards: WithFeaturedCards.args.featurednavigationcards,
  navigationcards: Array(15)
    .fill()
    .map((_, index) => () => (
      <NavigationCard
        label={`Category ${index + 1}`}
        background="white"
        elementleft="./images/courvoisier.png"
        classname="tw:p-2 tw:pr-4 tw:lg:p-2 tw:lg:pr-4 tw:lg:max-w-none tw:w-full"
      />
    )),
};

/**
 * Banner Navigation
 * Demonstrates a banner navigation layout with prominent navigation options
 */
export const BannerNavigationWithSquareCards = Template.bind({});
BannerNavigationWithSquareCards.args = {
  imagedesktop: './images/standard-banner1.png',
  imagemobile: './images/standard-banner-mobile.png',
  bannertitle: 'Quick Navigation',
  bannerdescription:
    'Browse our most popular categories and find exactly what you need.',

  desktopcolumns: 6,
  featurednavigationcards: [
    () => (
      <NavigationCard
        label="New Arrivals"
        background="white"
        elementleft={() => <Icons.gfxChevron width="52" height="52" />}
        elementright={() => (
          <div className="tw:rounded-lg tw:bg-white tw:px-3 tw:py-1">
            <span className="tw:text-sm tw:font-medium tw:text-black">New</span>
          </div>
        )}
        classname="tw:font-semibold tw:text-xl tw:lg:text-2xl"
      />
    ),
    () => (
      <NavigationCard
        label="Featured Deals"
        background="white"
        elementleft="./images/courvoisier.png"
        classname="tw:font-semibold tw:text-xl tw:lg:text-2xl tw:p-2 tw:pr-4 tw:lg:p-2 tw:lg:pr-4"
      />
    ),
  ],
  navigationcards: [
    () => (
      <NavigationCard
        variant="square"
        label="Spirits & Liqueurs"
        background="orange"
        elementleft={getRandomNavigationCardImage()}
        classname="tw:p-2 tw:pr-4 tw:lg:p-2 tw:lg:pr-4"
      />
    ),
    () => (
      <NavigationCard
        variant="square"
        label="Beer & Cider"
        background="yellow"
        elementleft={getRandomNavigationCardImage()}
        classname="tw:p-2 tw:pr-4 tw:lg:p-2 tw:lg:pr-4"
      />
    ),
    () => (
      <NavigationCard
        background="white"
        variant="square"
        label="Wine"
        elementleft={getRandomNavigationCardImage()}
      />
    ),
    () => (
      <NavigationCard
        background="white"
        variant="square"
        label="Soft Drinks"
        elementleft={getRandomNavigationCardImage()}
      />
    ),
    () => (
      <NavigationCard
        variant="square"
        label="Snacks & Confectionery"
        background="white"
        elementleft={getRandomNavigationCardImage()}
        classname="tw:p-2 tw:pr-4 tw:lg:p-2 tw:lg:pr-4"
      />
    ),
    () => (
      <NavigationCard
        background="white"
        variant="square"
        label="Frozen Foods"
        elementleft={getRandomNavigationCardImage()}
      />
    ),
    () => (
      <NavigationCard
        variant="square"
        label="Fresh Produce"
        background="white"
        elementleft={getRandomNavigationCardImage()}
        classname="tw:p-2 tw:pr-4 tw:lg:p-2 tw:lg:pr-4"
      />
    ),
    () => (
      <NavigationCard
        background="white"
        variant="square"
        label="Household Items"
        elementleft={getRandomNavigationCardImage()}
      />
    ),
  ],
};

BannerNavigationWithSquareCards.decorators = [
  (Story) => (
    <div className="tw-container">
      <Story />
    </div>
  ),
];

/**
 * All statuses story.
 * Demonstrates displaying all Image Banner Navigation variants in a row.
 */
export const AllImageBannerNavigation = {
  render: () => {
    const configs = [
      Default.args,
      WithFeaturedCards.args,
      MobileCarousel.args,
      CustomColumns.args,
      CompleteExample.args,
      BannerNavigationWithSquareCards.args,
    ];

    return (
      <div className="tw:flex tw:flex-wrap tw:items-start tw:gap-4">
        {configs.map((config, idx) => (
          <ImageBannerNavigation key={idx} {...config} />
        ))}
      </div>
    );
  },
};
