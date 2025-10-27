/**
 * Storybook configuration for the Benefits Card component
 * This defines how the Benefits Card component will appear in Storybook and what controls/options are available.
 */

// Import the Benefits Card component
import BenefitCard from './BenefitCard';
// Import the Icons component for examples
import Icons from '../Icons/Icons';
import RailSection from '../RailSection/RailSection';

// Define the story configuration
export default {
  // The title under which the Benefits Card component will appear in Storybook's navigation
  title: 'Cards/Benefits Card',
  component: BenefitCard,

  // InformationCard used by Storybook for organisational purposes
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: `
This component implements various Benefits Card styles as defined in the design system.

### Design Figma References
- [Benefits Card UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=3431-29704&m=dev)
        `,
      },
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const { heading, subheading, bodytext, bulletpoints, icon } = args;
          const props = { heading, subheading, bodytext, bulletpoints, icon };
          const propsString = Object.entries(props)
            .map(([key, value]) => `${key}="${value}"`)
            .join('\n ');

          return `<BenefitCard\n ${propsString}\n />`;
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
      ],
    },
  },

  // Define controls (props) for the Benefits Card component
  argTypes: {
    subheading: {
      control: 'text',
      description: 'Text displayed on the Information Card',
      defaultValue:
        'Fresh produce, accredited butchers and award-winning own ranges.',
    },
    heading: {
      control: 'text',
      description: 'Heading text displayed on the Information Card',
    },
    bodytext: {
      control: 'text',
      description: 'Text displayed on the Information Card',
    },
    bulletpoints: {
      control: 'array',
      description: 'Bullet points to display on the Information Card',
    },
    icon: {
      control: { type: 'function' },
      description: 'Icon displayed to the left of the label',
    },
  },
};

/**
 * Template for rendering the Benefits Card component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => BenefitCard(args);

/**
 * Easy Access Benefits Card story.
 */
export const BenefitsDefaultCard = Template.bind({});
BenefitsDefaultCard.args = {
  subheading:
    'Fresh produce, accredited butchers and award-winning own ranges.',
  icon: () => <Icons.benefitsEasyAccess />,
};

export const CardWithHeading = {
  render: () => {
    return (
      <BenefitCard
        heading="1"
        subheading="Choose"
        bodytext="Pick the club that’s right for your business and check what terms and conditions apply."
        icon={() => <Icons.benefitsEasyAccess />}
      />
    );
  },
};

export const AllBenefitCards = {
  render: () => {
    return (
      <RailSection
        title="Why Booker?"
        gridcols={3}
        titleclassname="tw:text-primary-500 tw:lg:px-0"
        shownavigation={false}
      >
        <BenefitCard
          subheading="Fresh produce, accredited butchers and award-winning own ranges."
          icon={() => (
            <Icons.benefitsFresh classname="tw:h-10.5 tw:w-10.5 tw:lg:h-[90px] tw:lg:w-[90px]" />
          )}
        />
        <BenefitCard
          subheading="Unbeatable and diverse product range, high-quality brands and bulk packs."
          icon={() => (
            <Icons.benefitsSuperiorQuality classname="tw:h-10.5 tw:w-10.5 tw:lg:h-[90px] tw:lg:w-[90px]" />
          )}
        />
        <BenefitCard
          subheading="Great value, excellent prices, club deals, local promotions."
          icon={() => (
            <Icons.benefitsGreatValue classname="tw:h-10.5 tw:w-10.5 tw:lg:h-[90px] tw:lg:w-[90px]" />
          )}
        />

        <BenefitCard
          subheading="Walk-in store, quick access, effortless layouts, and fast  checkout."
          icon={() => (
            <Icons.benefitsLocation classname="tw:h-10.5 tw:w-10.5 tw:lg:h-[90px] tw:lg:w-[90px]" />
          )}
        />

        <BenefitCard
          subheading="Click and collect from all of 192 local stores found nationwide."
          icon={() => (
            <Icons.benefitsCollect classname="tw:h-10.5 tw:w-10.5 tw:lg:h-[90px] tw:lg:w-[90px]" />
          )}
        />

        <BenefitCard
          subheading="Fast, reliable delivery with tracking and timely doorstep service."
          icon={() => (
            <Icons.benefitsDeliver classname="tw:h-10.5 tw:w-10.5 tw:lg:h-[90px] tw:lg:w-[90px]" />
          )}
        />
      </RailSection>
    );
  },
};

export const RailSectionWithHeading = {
  render: () => {
    return (
      <RailSection
        title="Sustainability"
        description="We are committed to doing our fair share to help the planet"
        gridcols={3}
        shownavigation={false}
      >
        <BenefitCard
          heading="1."
          subheading="Choose"
          bodytext="Pick the club that's right for your business and check what terms and conditions apply."
          icon={() => <Icons.graphicsSearch />}
        />
        <BenefitCard
          heading="2."
          subheading="Browse"
          bodytext="Stock up on exclusive club-member offers across our biggest sellers from mozzarella to mayonnaise."
          icon={() => <Icons.news classname="tw:w-full tw:h-full" />}
        />
        <BenefitCard
          heading="3."
          subheading="Save"
          bodytext="Budget better with low fixed prices to help you plan ahead and manage cashflow."
          icon={() => <Icons.benefitsFresh />}
        />

        <BenefitCard
          heading="156"
          subheading="tonnes of water saved last year"
          bodytext="Pick the club that's right for your business and check what terms and conditions apply."
          icon={() => <Icons.benefitsFast />}
        />

        <BenefitCard
          heading="3,41kg"
          subheading="food wastage prevented"
          bodytext="Our food waste prevention campaign has helped hundreds of small businesses IN the UK"
          icon={() => <Icons.graphicsTriangles />}
        />

        <BenefitCard
          heading="73%"
          subheading="less energy used in the last 3 years"
          bodytext="Our offices now use 90% green energy and our fleet is 67% electric or hybrid"
          icon={() => <Icons.graphicsInfo />}
        />
      </RailSection>
    );
  },
};
