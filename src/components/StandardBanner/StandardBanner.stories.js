/**
 * Storybook configuration for the StandardBanner component
 * This defines how the StandardBanner component will appear in Storybook and what controls/options are available.
 */

// Import the component
import StandardBanner from './StandardBanner';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';
import RailSection from '../RailSection/RailSection';

// Define the story configuration
export default {
  // The title under which the StandardBanner component will appear in Storybook's navigation
  title: 'Sections/Standard Banner',

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the component
  argTypes: {
    // Image
    image: {
      control: {
        type: 'text',
      },
    },

    // Mobile image
    imagemobile: {
      control: {
        type: 'text',
      },
    },

    // Title
    title: {
      control: 'text',
      description: 'Title of the banner',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Description
    description: {
      control: 'text',
      description: 'Description of the banner',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Badge
    badge: {
      control: 'text',
      description: 'Badge image source for the banner',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Badge position
    badgeposition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the badge on the banner (left or right)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // CTA button (deprecated)
    cta: {
      control: 'object',
      description:
        '@deprecated Use `ctas` prop instead. Call-to-action button properties (label, href, variant, iconleft)',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '' },
      },
    },

    // CTAs array (new prop)
    ctas: {
      control: 'object',
      description: 'Array of up to 2 Button components for call-to-action',
      table: {
        type: { summary: 'Array<JSX.Element>' },
        defaultValue: { summary: '[]' },
      },
    },

    // Border color
    bordercolor: {
      control: 'select',
      options: ['white', 'black'],
      description: 'Border color of the banner (white or black)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Shadow effect
    shadow: {
      control: 'boolean',
      description: 'Whether to show a shadow effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: '' },
      },
    },
    // Size
    size: {
      control: 'select',
      options: ['large', 'small'],
      description: 'Size of the banner (large or small)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    // Variant
    variant: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Visual style of the banner (light or dark)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    // Height
    height: {
      control: 'select',
      options: ['regular', 'small'],
      description: 'Height of the banner (regular or small)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },

  // Added to override default story height if needed for this component
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
                    if (key === 'iconleft')
                      return '<Icons.user classname="tw:w-4 tw:h-4" />';
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

          return `<StandardBanner\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
This component implements various banner styles as defined in the design system.

### Design Figma References
- [Standard banner UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=3739-57969&m=dev)
`,
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
    image: './images/standard-banner1.png',
    imagemobile: './images/standard-banner-mobile.png',
    title: 'Restaurants',
    description:
      'Discover how Booker meets all your restaurant needs with exceptional quality and service, no matter your business or portions sizes.',
    badge: './images/logos/black-gate.png',
    badgeposition: 'left',
    cta: {
      label: 'Become a member',
      href: '#',
      variant: 'primary',
      iconleft: () => <Icons.user className="tw:h-4 tw:w-4" />,
    },
  },
  render: (args) => (
    <div className="tw-container">
      <StandardBanner {...args} />
    </div>
  ),
};

/**
 * Story with badge on the right.
 */
export const BadgeOnTheRight = {
  args: {
    image: './images/standard-banner1.png',
    imagemobile: './images/standard-banner-mobile.png',
    title: 'Restaurants',
    description:
      'Discover how Booker meets all your restaurant needs with exceptional quality and service, no matter your business or portions sizes.',
    badge: './images/logos/quality.png',
    badgeposition: 'right',
    cta: {
      label: 'Become a member',
      href: '#',
      variant: 'primary',
      iconleft: () => <Icons.user className="tw:h-4 tw:w-4" />,
    },
  },
  render: (args) => (
    <div className="tw-container">
      <StandardBanner {...args} />
    </div>
  ),
};

/**
 * Story with small height banner.
 */
export const SmallHeightBanner = {
  args: {
    image: './images/standard-banner1.png',
    imagemobile: './images/standard-banner-mobile.png',
    title: 'Restaurants',
    description:
      'Discover how Booker meets all your restaurant needs with exceptional quality and service, no matter your business or portions sizes.',
    badge: './images/logos/quality.png',
    badgeposition: 'right',
    height: 'small',
    cta: {
      label: 'Become a member',
      href: '#',
      variant: 'primary',
      iconleft: () => <Icons.user className="tw:h-4 tw:w-4" />,
    },
  },
  render: (args) => (
    <div className="tw-container">
      <StandardBanner {...args} />
    </div>
  ),
};

/**
 * Story without badge.
 * Demonstrates the absence of a badge in the banner.
 */
export const WithoutBadge = {
  args: {
    image: './images/standard-banner1.png',
    imagemobile: './images/standard-banner-mobile.png',
    title: 'Restaurants',
    description:
      'Discover how Booker meets all your restaurant needs with exceptional quality and service, no matter your business or portions sizes.',
    cta: {
      label: 'Become a member',
      href: '#',
      variant: 'primary',
      iconleft: () => <Icons.user className="tw:h-4 tw:w-4" />,
    },
  },
  render: (args) => (
    <div className="tw-container">
      <StandardBanner {...args} />
    </div>
  ),
};

/**
 * Story with border.
 * Demonstrates the border color option.
 */
export const WithBorder = {
  args: {
    image: './images/standard-banner1.png',
    imagemobile: './images/standard-banner-mobile.png',
    title: 'Restaurants',
    description:
      'Discover how Booker meets all your restaurant needs with exceptional quality and service, no matter your business or portions sizes.',
    bordercolor: 'white',
    cta: {
      label: 'Become a member',
      href: '#',
      variant: 'primary',
      iconleft: () => <Icons.user className="tw:h-4 tw:w-4" />,
    },
  },
  render: (args) => (
    <div className="tw-container">
      <StandardBanner {...args} />
    </div>
  ),
};

/**
 * Story with dark text variant.
 * Demonstrates the dark variant option.
 */
export const DarkTextVariant = {
  args: {
    image: './images/banner-s.png',
    imagemobile: './images/banner-s-mobile.jpg',
    title: "Chef's Essentials",
    badge: './images/logos/chefs-essentials.png',
    description:
      "Premium quality at unbeatable prices - we've got your kitchen covered!",
    bordercolor: 'black',
    shadow: false,
    variant: 'dark',
    cta: {
      label: 'Explore the range',
      href: '#',
      variant: 'primary',
    },
  },
  render: (args) => (
    <div className="tw-container">
      <StandardBanner {...args} />
    </div>
  ),
};

/**
 * Story with light text variant.
 * Demonstrates the light variant option.
 *
 */
export const LightTextVariant = {
  args: {
    image: './images/banner-sausage.png',
    imagemobile: './images/banner-sausage-mobile.jpg',
    title: 'Blackgate',
    badge: './images/logos/black-gate.png',
    description:
      'Our exclusive premium range only sources the best from British farms. The result is tender, succulent and mouthwateringly delicious award-winning meat.',
    bordercolor: 'white',
    variant: 'light',
    cta: {
      label: 'Explore the range',
      href: '#',
      variant: 'primary',
    },
  },
  render: (args) => (
    <div className="tw-container">
      <StandardBanner {...args} />
    </div>
  ),
};

/**
 * Story with primary color banner.
 */
export const BannerPrimaryColor = {
  args: {
    image: './images/banner-primary.png',
    imagemobile: './images/banner-primary-mobile.png',
    title: 'Help us make your Booker experience better',

    description: 'Help us help you by answering a few questions.',
    shadow: false,
    size: 'small',
    cta: {
      label: 'Get started',
      href: '#',
      variant: 'primary',
    },
  },
  render: (args) => (
    <div className="tw-container">
      <StandardBanner {...args} />
    </div>
  ),
};

/**
 * Story with two buttons.
 * Demonstrates the new ctas prop with two Button components.
 */
export const WithTwoButtons = {
  args: {
    image: './images/standard-banner1.png',
    imagemobile: './images/standard-banner-mobile.png',
    title: 'Restaurants',
    description:
      'Discover how Booker meets all your restaurant needs with exceptional quality and service, no matter your business or portions sizes.',
    badge: './images/logos/black-gate.png',
    badgeposition: 'left',
    ctas: [
      <Button
        label="Become a member"
        href="#"
        variant="primary"
        iconleft={() => <Icons.user className="tw:h-4 tw:w-4" />}
      />,
      <Button
        label="Learn more"
        href="#"
        variant="secondary"
        iconleft={() => <Icons.user className="tw:h-4 tw:w-4" />}
      />,
    ],
  },
  render: (args) => (
    <div className="tw-container">
      <StandardBanner {...args} />
    </div>
  ),
};

/**
 * Story with two buttons - Primary theme.
 * Demonstrates two buttons on a primary color banner.
 */
export const TwoButtonsPrimaryTheme = {
  args: {
    image: './images/banner-primary.png',
    imagemobile: './images/banner-primary-mobile.png',
    title: 'Help us make your Booker experience better',
    description: 'Help us help you by answering a few questions.',
    shadow: false,
    size: 'small',
    ctas: [
      <Button label="Get started" href="#" variant="primary" />,
      <Button label="Maybe later" href="#" variant="tertiary" />,
    ],
  },
  render: (args) => (
    <div className="tw-container">
      <StandardBanner {...args} />
    </div>
  ),
};

/**
 * Story with banner rail.
 */
export const StandardBannerRail = {
  render: () => {
    return (
      <div className="tw-container">
        <RailSection
          title="Our butchery brands"
          description="As the UK's leading catering butcher, we offer award winning service, unrivalled choice, and price."
          shownavigation={false}
          carouseloptions={{
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            slidesPerView: 1.1,
            spaceBetween: 12,
            breakpoints: {
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2,
              },
            },
          }}
        >
          <StandardBanner {...LightTextVariant.args} size="small" />
          <StandardBanner {...DarkTextVariant.args} size="small" />
        </RailSection>
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
    return (
      <div className="tw:max-w-[1312px] tw:space-y-10">
        <StandardBanner {...Default.args} />
        <StandardBanner {...SmallHeightBanner.args} />
        <StandardBanner {...BadgeOnTheRight.args} />
        <StandardBanner {...WithBorder.args} />
        <StandardBanner {...LightTextVariant.args} />
        <StandardBanner {...DarkTextVariant.args} />
        <StandardBanner {...BannerPrimaryColor.args} />
        <StandardBanner {...WithoutBadge.args} />
        <StandardBanner {...WithDualCTAs.args} />
        <StandardBanner {...DualCTAsPrimaryTheme.args} />

        {StandardBannerRail.render()}
      </div>
    );
  },
};
