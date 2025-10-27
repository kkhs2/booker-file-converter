/**
 * Storybook configuration for the Feature card component
 * This defines how the Feature card component will appear in Storybook and what controls/options are available.
 */

import FeatureCard from './FeatureCard';
import RailSection from '../RailSection/RailSection';
import Tag from '../Tag/Tag';
import Icons from '../Icons/Icons';

// Define the story configuration
export default {
  // The title under which the Feature card component will appear in Storybook's navigation
  title: 'Cards/Feature Card',

  parameters: {
    docs: {
      description: {
        component: `
The FeatureCard component is used to display a feature with an image, title, tag, and call-to-action button.

### Design Figma References
- [Feature Card UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=2162-5057&m=dev)
`,
      },
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const { title, image, size, tag, cta, href, variant } = args;
          const props = { title, image, size, tag, cta, href, variant };
          const propsString = Object.entries(props)
            .map(([key, value]) => `${key}="${value}"`)
            .join('\n ');

          return `<FeatureCard\n ${propsString}\n />`;
        },
      },
    },
  },

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  argTypes: {
    // Title
    title: {
      control: 'text',
      description: 'Title of the feature',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Image
    image: {
      control: 'text',
      description: 'Image source for the feature',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Size
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'large'],
      description: 'Size of the feature rail (small or large)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'small' },
      },
    },

    // CTA
    cta: {
      control: 'text',
      description: 'Call-to-action text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Href
    href: {
      control: 'text',
      description: 'URL for the CTA button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Variant
    variant: {
      control: {
        type: 'select',
      },
      options: [
        'primary',
        'secondary',
        'primary-inverse',
        'secondary-inverse',
        'feature-product',
      ],
      description: 'Variant of the CTA button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },

    // Border
    border: {
      control: 'boolean',
      description: 'Whether to show a border around the feature card',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },

    // Border inside
    borderinside: {
      control: 'boolean',
      description: 'Whether to show a border inside the feature card',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },

    // Onclick handler
    onclick: {
      action: 'clicked',
      description: 'Optional click handler for the card',
      table: {
        type: { summary: 'Function' },
        defaultValue: { summary: '' },
      },
    },
    ctahidden: {
      control: 'boolean',
      description: 'Whether to hide the CTA button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

/**
 * Small size primary variant
 * Demonstrates basic usage with default settings.
 */
export const Default = {
  args: {
    title: 'Butchery',
    image: './images/steak.jpeg',
    size: 'small',
    variant: 'primary',
    tag: () => (
      <Tag
        label="Primary"
        date="until 28th Feb"
        variant="primary"
        size="small"
        iconleft={() => <Icons.tag />}
      />
    ),

    cta: 'View offers',
    href: 'https://www.google.com',
  },
  render: (args) => (
    <div className="tw:max-w-[316px]">
      <FeatureCard {...args} />
    </div>
  ),
};

export const SpecialFeatureCard = {
  args: {
    title: 'Butchery',
    image: './images/steak.jpeg',
    size: 'small',
    variant: 'primary',
    cta: 'View offers',
    href: 'https://www.google.com',
  },
  render: (args) => (
    <div className="tw:max-w-[316px]">
      <FeatureCard {...args} />
    </div>
  ),
};

/**
 *  Large size primary variant
 */
export const Large = {
  render: () => (
    <div className="tw:max-w-[316px]">
      <FeatureCard {...Default.args} size="large" />
    </div>
  ),
};

/**
 * Secondary variant
 */
export const Secondary = {
  render: () => (
    <div className="tw:max-w-[316px]">
      <FeatureCard {...Default.args} size="large" variant="secondary" />
    </div>
  ),
};

/**
 * Primary inverse variant
 */
export const PrimaryInverse = {
  render: () => (
    <div className="tw:max-w-[316px]">
      <FeatureCard {...Default.args} variant="primary-inverse" />
    </div>
  ),
};

/**
 * Secondary inverse variant
 */
export const SecondaryInverse = {
  render: () => (
    <div className="tw:max-w-[316px]">
      <FeatureCard {...Default.args} variant="secondary-inverse" />
    </div>
  ),
};

/**
 * Border variant
 */
export const WithBorderInside = {
  render: () => (
    <div className="tw:max-w-[316px]">
      <FeatureCard
        variant="secondary"
        size="responsive"
        borderinside
        description="Pick prime quality fresh and frozen cuts from our exclusive value and premium ranges, delivered to your door or available to collect."
        image="./images/value-img.png"
        title="Value."
        classname="tw:text-white"
      />
    </div>
  ),
};

/**
 * Cards in carousel story.
 * Demonstrates the FeatureCard component in a carousel.
 */

const slides = [
  <FeatureCard {...Default.args} />,
  <FeatureCard {...Default.args} />,
  <FeatureCard {...Default.args} variant="primary" size="large" />,
  <FeatureCard {...Default.args} variant="secondary" size="large" />,
  <FeatureCard {...Default.args} variant="primary" size="large" />,
  <FeatureCard
    {...Default.args}
    variant="primary-inverse"
    size="large"
    border
  />,
  <FeatureCard {...Default.args} variant="secondary" />,
  <FeatureCard {...Default.args} variant="secondary-inverse" size="large" />,
  <FeatureCard {...Default.args} />,
  <FeatureCard {...Default.args} variant="primary-inverse" size="large" />,
  <FeatureCard {...Default.args} variant="secondary" size="small" />,
  <FeatureCard {...Default.args} variant="secondary-inverse" size="small" />,
  <FeatureCard
    variant="secondary"
    size="responsive"
    borderinside
    description="Pick prime quality fresh and frozen cuts from our exclusive value and premium ranges, delivered to your door or available to collect."
    image="./images/value-img.png"
    title="Value."
    classname="tw:text-white"
  />,
];

export const FeatureCardRail = {
  render: () => {
    return (
      <RailSection
        title="Current offers"
        description="Prices may vary in each branch"
        aligncontent="bottom"
        carouseloptions={{
          slidesOffsetBefore: 20,
          slidesOffsetAfter: 20,
          slidesPerView: 1.25,
          spaceBetween: 12,
          breakpoints: {
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1312: {
              freeMode: false,
              slidesPerView: 4,
              slidesOffsetBefore: 0,
              slidesOffsetAfter: 0,
            },
          },
        }}
      >
        {slides}
      </RailSection>
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
      <div className="tw:grid tw:grid-cols-1 tw:gap-4 tw:md:grid-cols-2 tw:lg:grid-cols-5">
        {slides}
      </div>
    );
  },
};
