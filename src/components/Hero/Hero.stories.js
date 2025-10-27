/**
 * Storybook configuration for the Hero component
 * This defines how the Hero component will appear in Storybook and what controls/options are available.
 */

// Import the component
import Hero, { DEFAULT_SWIPER_SETTINGS } from './Hero';

import Icons from '../Icons/Icons';

// Define the story configuration
export default {
  title: 'Sections/Hero',
  component: Hero,
  tags: ['autodocs'],
  parameters: {
    docs: {
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

          return `<Hero\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
This component implements hero sections and carousels as defined in the design system.

### Design Figma References
- [Hero Banner UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=3738-47082&m=dev)

### Usage Guidelines
- Keep headlines concise (recommended 2-8 words)
- Subtitles should provide clear value proposition
- Use high-quality images/videos
- Limit CTAs to 1-2 per section
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

  // Define controls (props) for the component
  argTypes: {
    // Sections
    sections: {
      control: 'object',
      description:
        'Array of section objects with titles, subtitles, CTAs, and assets',
    },

    // Swiper settings
    swipersettings: {
      control: 'object',
      description: 'Swiper slider settings',
      defaultValue: DEFAULT_SWIPER_SETTINGS,
      table: {
        type: {
          summary: 'object',
          detail: JSON.stringify(DEFAULT_SWIPER_SETTINGS, null, 2),
        },
      },
    },
  },
};

/**
 * Template for rendering the Hero component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => Hero(args);

/**
 * Primary story.
 * Demonstrates basic usage with default settings.
 */
export const Carousel = Template.bind({});
Carousel.args = {
  sections: [
    {
      variant: 'primary',
      assetPath: './images/hero/1.png',
      title: 'A cut <br class="tw:lg:hidden" />above.',
      subtitle:
        'From the corner shop to the cabaret, from the mini-mart to the Michelin starred, Booker helps food businesses across the nation keep their customers happy, and their profits healthy.',
      CTA: [
        {
          label: 'Become a member',
          iconleft: () => <Icons.user classname="tw:h-4 tw:w-4" />,
          variant: 'primary',
        },

        {
          label: 'Find your local store',
          iconleft: () => <Icons.pin classname="tw:h-4 tw:w-4" />,
          variant: 'inverse',
        },
      ],
    },
    {
      variant: 'primary',
      assetPath: './images/hero/steak-video.mp4',
      title: 'A cut <br class="tw:lg:hidden" />above.',
      subtitle:
        'From the corner shop to the cabaret, from the mini-mart to the Michelin starred, Booker helps food businesses across the nation keep their customers happy, and their profits healthy.',
      CTA: [
        {
          label: 'Become a member',
          iconleft: () => <Icons.user classname="tw:h-4 tw:w-4" />,
          variant: 'primary',
        },

        {
          label: 'Find your local store',
          iconleft: () => <Icons.pin classname="tw:h-4 tw:w-4" />,
          variant: 'inverse',
        },
      ],
    },
    {
      variant: 'secondary',
      assetPath: './images/hero/pizza.jpg',
      title: 'A slice of <br class="tw:lg:hidden" />the action.',
      subtitle:
        'Become a Booker member and join over a million successful  convenience stores up and down the country',

      CTA: [
        {
          label: 'Become a member',
          iconleft: () => <Icons.user classname="tw:h-4 tw:w-4" />,
          variant: 'primary',
        },

        {
          label: 'Discover Booker Benefits',
          variant: 'inverse',
        },
      ],
    },
    {
      variant: 'secondary',
      assetPath: './images/hero/pizza.jpg',
      title: 'A slice of <br class="tw:lg:hidden" />the action.',
      subtitle:
        'Become a Booker member and join over a million successful  convenience stores up and down the country',

      CTA: [
        {
          label: 'Become a member',
          iconleft: () => <Icons.user classname="tw:h-4 tw:w-4" />,
          variant: 'primary',
        },
      ],
    },
    {
      variant: 'inverse',
      assetPath: './images/hero/beers.png',
      assetPathMobile: './images/hero/beers-mobile.png',
      title: "Brooklyn's finest.",
      subtitle:
        'Get a case on us, when you buy 4 cases of Brooklyn lager this Easter.',
      imageposition: 'bottom',
      CTA: [
        {
          label: 'View the Brooklyn Lager range',
          variant: 'primary',
        },
      ],
    },
  ],
  swipersettings: DEFAULT_SWIPER_SETTINGS,
};

/**
 * Story for a full bleed hero section with a video asset.
 * Demonstrates a hero section with a video background, primary variant, and two CTAs.
 */
export const FullBleedWithVideo = Template.bind({});
FullBleedWithVideo.args = {
  sections: [
    {
      variant: 'primary',
      assetPath: './images/hero/steak-video.mp4',
      title: 'A slice of the action.',
      subtitle:
        'From the corner shop to the cabaret, from the mini-mart to the Michelin starred, Booker helps food businesses across the nation keep their customers happy, and their profits healthy.',
      CTA: [
        {
          label: 'Become a member',
          iconleft: () => <Icons.user classname="tw:h-4 tw:w-4" />,
          variant: 'primary',
        },

        {
          label: 'Find your local store',
          iconleft: () => <Icons.pin classname="tw:h-4 tw:w-4" />,
          variant: 'inverse',
        },
      ],
    },
  ],
};

/**
 * Story for a hero section with an image asset.
 * Demonstrates a hero section with an inline image, secondary variant, and two CTAs.
 */

export const WithImage = Template.bind({});
WithImage.args = {
  sections: [
    {
      variant: 'secondary',
      assetPath: './images/hero/pizza.jpg',
      title: 'A slice of the action.',
      subtitle:
        'Become a Booker member and join over a million successful  convenience stores up and down the country',
      mobileCTAOutside: true,

      CTA: [
        {
          label: 'Become a member',
          iconleft: () => <Icons.user classname="tw:h-4 tw:w-4" />,
          variant: 'primary',
        },

        {
          label: 'Discover Booker Benefits',
          variant: 'inverse',
          classname: 'tw:border tw:border-black tw:text-black',
        },
      ],
    },
  ],
};

/**
 * Story for a hero section with an image asset and flipped content.
 * Demonstrates a hero section with an inline image, secondary variant, and two CTAs with flipped content.
 */

export const WithImageWithFlippedContent = Template.bind({});
WithImageWithFlippedContent.args = {
  sections: [
    {
      variant: 'secondary',
      flipContentColumns: true,
      assetPath: './images/hero/pizza.jpg',
      title: 'A slice of the action.',
      subtitle:
        'Become a Booker member and join over a million successful  convenience stores up and down the country',

      CTA: [
        {
          label: 'Become a member',
          iconleft: () => <Icons.user classname="tw:h-4 tw:w-4" />,
          variant: 'primary',
        },

        {
          label: 'Discover Booker Benefits',
          variant: 'inverse',
        },
      ],
    },
  ],
};

/**
 * Story for a hero section with a light background.
 * Demonstrates a hero section with a light background, tertiary variant, and two CTAs.
 */

export const WithLightCTABackground = Template.bind({});
WithLightCTABackground.args = {
  sections: [
    {
      variant: 'tertiary',
      assetPath: './images/hero/carrot-video.mp4',
      title: 'A slice of the action.',
      subtitle:
        'Become a Booker member and join over a million successful convenience stores up and down the country',

      CTA: [
        {
          label: 'Become a member',
          iconleft: () => <Icons.user classname="tw:h-4 tw:w-4" />,
          variant: 'primary',
        },
      ],
    },
  ],
};

/**
 * Story for a hero section with a light background.
 *
 * Demonstrates a hero section with a light background, tertiary variant, and two CTAs.
 */

export const WithLightBackground = Template.bind({});
WithLightBackground.args = {
  sections: [
    {
      variant: 'inverse',
      assetPath: './images/hero/beers.png',
      assetPathMobile: './images/hero/beers-mobile.png',
      title: "Brooklyn's finest.",
      subtitle:
        'Get a case on us, when you buy 4 cases of Brooklyn lager this Easter.',
      imageposition: 'bottom',
      CTA: [
        {
          label: 'View the Brooklyn Lager range',
          variant: 'primary',
        },
      ],
    },
  ],
};

/**
 * Story for a hero section with a light background.
 */
export const FullBleedWithHighlight = Template.bind({});
FullBleedWithHighlight.args = {
  sections: [
    {
      variant: 'tertiary',
      assetPath: './images/hero/carrot-video.mp4',
      title: 'Seasonal favourites.',
      subtitle: 'Gorgeous greens, oranges, reds and blues, all Farm Fresh.',
      badgePath: './images/hero/Badge.png',
      CTA: [
        {
          label: 'Become a member',
          variant: 'primary',
        },
      ],
    },
  ],
};

/**
 * All variations story.
 * Demonstrates different component configurations in a single view.
 */
export const AllVariations = {
  render: () => {
    const configs = [
      Carousel.args,
      FullBleedWithVideo.args,
      WithImage.args,
      WithLightCTABackground.args,
      WithImageWithFlippedContent.args,
      FullBleedWithHighlight.args,
      WithLightBackground.args,
    ];

    return (
      <div className="tw:space-y-8">
        {configs.map((config, idx) => (
          <Hero key={idx} {...config} />
        ))}
      </div>
    );
  },
};
