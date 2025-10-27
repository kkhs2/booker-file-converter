/**
 * Storybook configuration for the ContentCarousel component
 * This defines how the ContentCarousel component will appear in Storybook and what controls/options are available.
 */

// Import the component
import ContentCarousel, { DEFAULT_SWIPER_SETTINGS } from './ContentCarousel';

import Icons from '../Icons/Icons';
import StandardBanner from '../StandardBanner/StandardBanner';
import PromotionsBanner from '../PromotionsBanner/PromotionsBanner';
import Button from '../Button/Button';

// Define the story configuration
export default {
  title: 'Sections/Content Carousel',
  component: ContentCarousel,
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

          return `<ContentCarousel\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
This component implements content carousels for banner content as defined in the design system.
It uses the same props as the Hero component but with banner-appropriate width sizing, making it perfect for content editors to add standard or promotional banners in a carousel format.

### Design Figma References
- Based on Hero Banner UI library with banner-specific sizing
- [Hero Banner UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=3738-47082&m=dev)

### Usage Guidelines
- Designed for standard and promotional banner content
- Keep headlines concise (recommended 2-8 words)
- Subtitles should provide clear value proposition
- Use high-quality images/videos
- Limit CTAs to 1-2 per section
- Width is optimized for banner content rather than full-width hero sections
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
 * Template for rendering the ContentCarousel component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => ContentCarousel(args);

/**
 * StandardBanner Carousel story.
 * Demonstrates StandardBanner components in a carousel layout.
 */
export const StandardBannerCarousel = Template.bind({});
StandardBannerCarousel.args = {
  sections: [
    <StandardBanner
      image="./images/standard-banner1.png"
      imagemobile="./images/standard-banner-mobile.png"
      title="Fresh Deals"
      description="Discover amazing offers on fresh produce and quality ingredients for your business."
      badge="./images/logos/black-gate.png"
      ctas={[
        <Button
          label="Shop Now"
          variant="primary"
          iconleft={() => <Icons.shoppingBag className="tw:h-4 tw:w-4" />}
        />,
        <Button label="View All Offers" variant="secondary" />,
      ]}
    />,
    <StandardBanner
      image="./images/banner-s.png"
      imagemobile="./images/banner-s-mobile.jpg"
      title="Quality Ingredients"
      description="Source the finest ingredients for your restaurant or catering business."
      badge="./images/logos/chefs-essentials.png"
      variant="dark"
      cta={{
        label: 'Browse Catalogue',
        iconleft: () => <Icons.search className="tw:h-4 tw:w-4" />,
        variant: 'primary',
      }}
    />,
    <StandardBanner
      image="./images/banner-sausage.png"
      imagemobile="./images/banner-sausage-mobile.jpg"
      title="Premium Selection"
      description="Explore our premium range of beverages and specialty items."
      badge="./images/logos/black-gate.png"
      variant="light"
      bordercolor="white"
      cta={{
        label: 'Explore Premium Range',
        variant: 'primary',
      }}
    />,
  ],
  swipersettings: DEFAULT_SWIPER_SETTINGS,
};

/**
 * PromotionsBanner Carousel story.
 * Demonstrates PromotionsBanner components with different layouts.
 */
export const PromotionsBannerCarousel = Template.bind({});
PromotionsBannerCarousel.args = {
  sections: [
    <PromotionsBanner
      backgroundstyle="orange"
      image="./images/greens.jpeg"
      imageplacement="background"
      badgesrc="./images/hero/Badge.png"
      title="Limited Time Offer"
      subtitle="Get 20% off premium cuts when you order this week. Perfect for restaurants and high-end catering."
      cta={[
        {
          label: 'Claim Offer',
          iconright: <Icons.chevronRight className="tw:h-4 tw:w-4" />,
          variant: 'primary',
          size: 'small',
        },
      ]}
    />,
    <PromotionsBanner
      backgroundstyle="orange"
      contentboxstyle="style2"
      image="./images/veggies.jpeg"
      imageplacement="inline"
      title="Flash Sale"
      subtitle="50% off all organic vegetables this weekend only. Stock up on fresh produce."
      cta={[
        {
          label: 'Shop Flash Sale',
          iconright: <Icons.chevronRight className="tw:h-4 tw:w-4" />,
          variant: 'primary',
          size: 'small',
        },
      ]}
    />,
    <PromotionsBanner
      backgroundstyle="white"
      image="./images/beers2-desktop.png"
      imageplacement="inline"
      imageonleft={true}
      title="New Customer Deal"
      subtitle="First order gets 15% off plus free delivery. Start your business journey with us."
      footnote="Terms and conditions apply"
      cta={[
        {
          label: 'Sign Up Now',
          iconright: <Icons.chevronRight className="tw:h-4 tw:w-4" />,
          variant: 'primary',
          size: 'small',
        },
      ]}
      classname="tw:pb-0"
    />,
  ],
};

