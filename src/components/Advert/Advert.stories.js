/**
 * Storybook configuration for the Advert component
 * This defines how the Advert component will appear in Storybook and what controls/options are available.
 */

import Advert from './Advert';

const mockAdvertItems = [
  {
    gridImage: './images/ad1.jpg',
    listImage: './images/ad2.jpg',
    link: 'https://example.com/ad1',
  },
  {
    gridImage: './images/ad3.jpg',
    listImage: './images/ad4.jpg',
    link: 'https://example.com/ad1',
  },
  {
    gridImage: './images/ad1.jpg',
    listImage: './images/ad2.jpg',
    link: 'https://example.com/ad1',
  },
  {
    gridImage: './images/ad3.jpg',
    listImage: './images/ad4.jpg',
    link: 'https://example.com/ad1',
  },
];

const singleAdItem = [mockAdvertItems[0]];

// Define the story configuration
export default {
  title: 'Components/Advert',
  component: Advert,
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
              // Handle special cases
              if (key === 'iconleft' || key === 'iconright') {
                const iconType =
                  key === 'iconleft' ? 'chevronLeft' : 'chevronRight';
                return `${key}={<Icons.${iconType} classname="tw:w-4 tw:h-4" />}`;
              }
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

          return `<Advert\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
The Advert component is a responsive advertisement slider that displays promotional images with links. 
It supports different image versions for grid and list views, and uses Swiper.js for smooth navigation.

## Features
- Dual image support (grid and list views)
- Customizable Swiper.js options
- Navigation arrows and pagination dots
- Autoplay functionality
- Click handling with external link support
        `,
      },
    },
  },
  argTypes: {
    items: {
      description: 'Array of advertisement items to display',
      control: 'object',
    },
    viewmode: {
      description: 'View mode determines which image version to display',
      control: 'radio',
      options: ['grid', 'list'],
    },
    shownavigation: {
      description: 'Show navigation arrows',
      control: 'boolean',
    },
    showpagination: {
      description: 'Show pagination dots',
      control: 'boolean',
    },
    autoplay: {
      description: 'Enable autoplay functionality',
      control: 'boolean',
    },
    slideroptions: {
      description: 'Custom Swiper.js configuration options',
      control: 'object',
    },
    classname: {
      description: 'Additional CSS classes',
      control: 'text',
    },
    onslidechange: {
      description: 'Callback function when slide changes',
      action: 'slide-changed',
    },
    onitemclick: {
      description: 'Callback function when an item is clicked',
      action: 'item-clicked',
    },
  },

  decorators: [
    (Story, context) => {
      const isGridView = context.args?.viewmode === 'grid';
      return isGridView ? (
        <div className="tw:mx-auto tw:w-full tw:max-w-[360px]">
          <Story />
        </div>
      ) : (
        <Story />
      );
    },
  ],
};

// Default story
export const Default = {
  args: {
    items: mockAdvertItems,
    viewmode: 'grid',
    shownavigation: true,
    showpagination: true,
    autoplay: true,
  },
};

// Grid view story
export const GridView = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          'Displays the advert in a grid view, suitable for mobile layouts.',
      },
    },
  },
};

// List view story
export const ListView = {
  args: {
    ...Default.args,
    viewmode: 'list',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays the advert in a list view, suitable for wider screens.',
      },
    },
  },
};

// Single item story
export const SingleItem = {
  args: {
    items: singleAdItem,
    viewmode: 'grid',
    shownavigation: false,
    showpagination: false,
    autoplay: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays a single advert item without navigation or pagination.',
      },
    },
  },
};

// Custom options story
export const CustomOptions = {
  args: {
    ...Default.args,
    slideroptions: {
      spaceBetween: 20,
      loop: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates how to pass custom Swiper.js options to the component.',
      },
    },
  },
};

// No navigation story
export const NoNavigation = {
  args: {
    ...Default.args,
    shownavigation: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Hides the navigation arrows.',
      },
    },
  },
};

// No pagination story
export const NoPagination = {
  args: {
    ...Default.args,
    showpagination: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Hides the pagination dots.',
      },
    },
  },
};

// Autoplay disabled story
export const AutoplayDisabled = {
  args: {
    ...Default.args,
    autoplay: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disables the autoplay functionality.',
      },
    },
  },
};
