/**
 * Storybook configuration for the Promotions component
 * This defines how the Promotions component will appear in Storybook and what controls/options are available.
 */

import PromotionsBanner from './PromotionsBanner';
import Icons from '../Icons/Icons';

export default {
  title: 'Sections/Promotions',
  component: PromotionsBanner,
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
              if (key === 'cta' && Array.isArray(value)) {
                const ctaString = JSON.stringify(
                  value,
                  (key, val) => {
                    if (key === 'iconright')
                      return '<Icons.chevronRight className="tw:w-4 tw:h-4" />';
                    return val;
                  },
                  2,
                );
                return `${key}={${ctaString}}`;
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

          return `<PromotionsBanner\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
This component implements various promotional banner styles as defined in the design system.

### Design Figma References
- [Promotional banner UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=1-18&m=dev)

### Usage Guidelines
- Use background images for high-impact, full-width promotions
- Maintain text contrast and legibility over images
- Keep CTAs clear and action-oriented
- Consider mobile responsiveness when using image positions
        `,
      },
    },
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#eeeeee',
        },
        {
          name: 'dark',
          value: '#333333',
        },
      ],
    },
  },

  argTypes: {
    // Layout
    layout: {
      control: { type: 'select' },
      options: ['fullwidth', 'grouped', 'navigation'],
      description:
        'The layout context of the banner: fullwidth, grouped or navigation',
      table: {
        defaultValue: {
          summary: 'fullwidth',
        },
      },
    },

    // Background Style
    backgroundstyle: {
      control: { type: 'select' },
      options: ['orange', 'white'],
      description:
        'The background color style when no background image is used',
      table: {
        defaultValue: {
          summary: 'orange',
        },
      },
    },

    // Content Box Style
    contentboxstyle: {
      control: { type: 'select' },
      options: ['style1', 'style2'],
      description: 'The style of the text content box',
      table: {
        defaultValue: {
          summary: 'style1',
        },
      },
    },

    // Title
    title: {
      control: { type: 'text' },
      description: 'Title text',
      table: {
        defaultValue: {
          summary: 'null',
        },
      },
    },

    // Subtitle
    subtitle: {
      control: { type: 'text' },
      description: 'Subtitle text',
      table: {
        defaultValue: {
          summary: 'null',
        },
      },
    },

    // CTA
    cta: {
      control: false,
      description: 'Call to action buttons',
    },

    // Footnote
    footnote: {
      control: { type: 'text' },
      description: 'Footnote text',
      table: {
        defaultValue: {
          summary: 'null',
        },
      },
    },

    // Image
    image: {
      control: { type: 'text' },
      description: 'The URL of the image or video asset used in the banner',
      table: {
        defaultValue: {
          summary: 'null',
        },
      },
    },

    // Image Placement
    imageplacement: {
      control: { type: 'select' },
      options: ['background', 'inline'],
      description:
        'Whether the image is used as background or displayed inline with content',
      table: {
        defaultValue: {
          summary: 'inline',
        },
      },
    },

    // Badge Source
    badgesrc: {
      control: { type: 'text' },
      description: 'The URL of the badge image asset used in the banner',
      table: {
        defaultValue: {
          summary: 'null',
        },
      },
    },

    // Image on left
    imageonleft: {
      control: { type: 'boolean' },
      description: 'Indicates if the content columns should be flipped',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },

    // External Image
    externalimage: {
      control: {
        type: 'text',
      },
      name: 'External Image',
      options: [
        './images/Brand=Carling.png',
        './images/Brand=Coca-Cola.png',
        './images/Brand=Heinz.png',
        './images/Brand=Napolina.png',
      ],
      description: 'Image source (selectable when external is true)',
      if: { arg: 'externalimage', truthy: true },
    },

    // External Image Mobile
    externalimagemobile: {
      control: {
        type: 'text',
      },
      name: 'External Image Mobile',
      options: ['./images/Brand=Carling-Mobile.png'],
      description: 'Image source for mobile (selectable when external is true)',
      if: { arg: 'externalimage', truthy: true },
    },

    // External URL
    externalurl: {
      control: {
        type: 'text',
      },
      name: 'External URL',
      description: 'URL to navigate to when clicked',
      if: { arg: 'externalimage', truthy: true },
    },
  },
};

const Template = (args) => <PromotionsBanner {...args} />;

//  Default Promotions Banner
export const WithBackgroundImage = Template.bind({});
WithBackgroundImage.args = {
  backgroundstyle: 'orange',
  image: './images/greens.jpeg',
  imageplacement: 'background',
  badgesrc: './images/hero/Badge.png',
  title: 'Gorgeously green.',
  subtitle: 'Get the pick of the season from Farm Fresh.',
  cta: [
    {
      label: 'Explore the range',
      variant: 'primary',
      iconright: <Icons.chevronRight className="tw:h-4 tw:w-4" />,
      size: 'small',
    },
  ],
};

//  Default Promotions Banner with solid background
export const WithoutBackground = Template.bind({});
WithoutBackground.args = {
  backgroundstyle: 'orange',
  contentboxstyle: 'style2',
  image: './images/greens.jpeg',
  imageplacement: 'inline',
  title: 'Gorgeously green.',
  subtitle: 'Get the pick of the season from Farm Fresh.',
  cta: [
    {
      label: 'Explore the Farm Fresh range',
      variant: 'primary',
      iconright: <Icons.chevronRight className="tw:h-4 tw:w-4" />,
      size: 'small',
    },
  ],
};

// Promotions Banner with solid background
export const WithSolidBackground = Template.bind({});
WithSolidBackground.args = {
  backgroundstyle: 'orange',
  image: './images/veggies.jpeg',
  imageplacement: 'inline',
  title: 'Become a Booker VIP.',
  subtitle: 'Join the On Trade Club for exclusive offers and support.',
  cta: [
    {
      label: 'Find out more',
      variant: 'primary',
      iconright: <Icons.chevronRight className="tw:h-4 tw:w-4" />,
      size: 'small',
    },
  ],
};

// Promotions Banner with solid background reversed
export const WithSolidBackgroundReversed = Template.bind({});
WithSolidBackgroundReversed.args = {
  backgroundstyle: 'orange',
  image: './images/veggies.jpeg',
  imageplacement: 'inline',
  imageonleft: true,
  title: 'Cut your energy costs.',
  subtitle: 'Save £1000s with exclusive tariffs from our partners today.',
  cta: [
    {
      label: 'Switch providers and save',
      iconright: <Icons.chevronRight className="tw:h-4 tw:w-4" />,
      variant: 'primary',
      size: 'small',
    },
  ],
};

// Promotions Banner with inverted colors
export const InvertedColors = Template.bind({});
InvertedColors.args = {
  backgroundstyle: 'white',
  image: './images/beers2-desktop.png',
  imageplacement: 'inline',
  imageonleft: true,
  title: "Brooklyn's finest.",
  subtitle: 'Get a free case of Brooklyn lager when you buy any 4. ',
  footnote: 'Terms and conditions apply',
  cta: [
    {
      label: 'Shop the Schweppes range',
      iconright: <Icons.chevronRight className="tw:h-4 tw:w-4" />,
      variant: 'primary',
      size: 'small',
    },
  ],
  classname: 'tw:pb-0',
};

// Promotions Banner with external image
export const ExternalImage = Template.bind({});
ExternalImage.args = {
  externalimage: './images/Brand=Carling.png',
  externalimagemobile: './images/Brand=Carling-Mobile.png',
  externalurl: 'https://www.booker.co.uk',
};

// Grouped Promotions Banner
export const GroupedBanner = {
  render: () => (
    <div className="tw:grid tw:grid-cols-1 tw:gap-4 tw:lg:grid-cols-2">
      <PromotionsBanner
        backgroundstyle="orange"
        layout="grouped"
        image="./images/greens.jpeg"
        imageplacement="background"
        badgesrc="./images/hero/Badge.png"
        title="Gorgeously green."
        subtitle="Save £1000s with exclusive tariffs from our partners today."
        cta={[
          {
            label: 'Find out more',
            variant: 'primary',
            iconright: <Icons.chevronRight className="tw:h-4 tw:w-4" />,
            size: 'small',
          },
        ]}
      />

      <PromotionsBanner
        backgroundstyle="orange"
        layout="grouped"
        image="./images/veggies.jpeg"
        imageplacement="inline"
        title="Become a Booker VIP."
        subtitle="Join the On Trade Club for exclusive offers and support."
        cta={[
          {
            label: 'Find out more',
            variant: 'primary',
            iconright: <Icons.chevronRight className="tw:h-4 tw:w-4" />,
            size: 'small',
          },
        ]}
      />

      <PromotionsBanner
        backgroundstyle="orange"
        layout="grouped"
        image="./images/veggies.jpeg"
        imageplacement="inline"
        title="Cut your energy costs."
        subtitle="Save £1000s with exclusive tariffs from our partners today."
        cta={[
          {
            label: 'Switch providers and save',
            variant: 'primary',
            iconright: <Icons.chevronRight className="tw:h-4 tw:w-4" />,
            size: 'small',
          },
        ]}
      />

      <PromotionsBanner
        backgroundstyle="white"
        layout="grouped"
        image="./images/beers2-desktop.png"
        imageplacement="inline"
        title="Brooklyn's finest."
        subtitle="Get a free case of Brooklyn lager when you buy any 4. "
        footnote="Terms and conditions apply"
        cta={[
          {
            label: 'Shop the Schweppes range',
            iconright: <Icons.chevronRight className="tw:h-4 tw:w-4" />,
            variant: 'primary',
            size: 'small',
          },
        ]}
        classname="tw:pb-0"
      />
    </div>
  ),
};

// Navigation Promotions Banner
export const NavigationBanner = Template.bind({});
NavigationBanner.args = {
  backgroundstyle: 'orange',
  layout: 'navigation',
  image: './images/veggies.jpeg',
  title: 'Latest offers.',
  subtitle: 'View our exclusive member promos.',
  cta: [
    {
      label: 'Offers',
      variant: 'primary',
      iconright: <Icons.chevronRight className="tw:h-4 tw:w-4" />,
      size: 'small',
    },
  ],
};

export const AllVariations = {
  render: () => (
    <div className="tw:m-5 tw:space-y-8">
      <h2 className="tw:text-2xl tw:font-bold">Full Width Banners</h2>
      <PromotionsBanner {...WithBackgroundImage.args} />
      <PromotionsBanner {...WithoutBackground.args} />
      <PromotionsBanner {...WithSolidBackground.args} />
      <PromotionsBanner {...WithSolidBackgroundReversed.args} />
      <PromotionsBanner {...InvertedColors.args} />
      <PromotionsBanner {...ExternalImage.args} />

      <h2 className="tw:text-2xl tw:font-bold">Grouped Banners</h2>
      {GroupedBanner.render()}

      <h2 className="tw:text-2xl tw:font-bold">Navigation Banners</h2>
      <div className="tw:grid tw:grid-cols-1 tw:gap-4 tw:lg:grid-cols-4">
        <PromotionsBanner {...NavigationBanner.args} />
        <PromotionsBanner {...NavigationBanner.args} />
        <PromotionsBanner {...NavigationBanner.args} />
        <PromotionsBanner {...NavigationBanner.args} />
      </div>
    </div>
  ),
};
