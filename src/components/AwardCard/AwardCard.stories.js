/**
 * Storybook configuration for the Footer component
 * Defines how the Footer component appears in Storybook and its configurable options.
 */

import AwardCard from './AwardCard';
import RailSection from '../RailSection/RailSection';

export default {
  title: 'Cards/Award Card',
  component: AwardCard,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: `
The Award Card component is used to display an award with an image, title, and description.

### Design Figma References
- [Award Card UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=3121-71977&m=dev)
      `,
      },
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const { title, image, description } = args;
          const props = { title, image, description };
          const propsString = Object.entries(props)
            .map(([key, value]) => `${key}="${value}"`)
            .join('\n ');

          return `<AwardCard\n ${propsString}\n />1
        `;
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
  argTypes: {
    // Title
    title: {
      control: 'text',
      description: 'Title of Award Card',
      table: {
        defaultValue: {
          summary: null,
        },
      },
    },

    // Image
    image: {
      control: 'text',
      description: 'Location of image',
      table: {
        defaultValue: {
          summary: null,
        },
      },
    },

    // Description
    description: {
      control: 'text',
      description: 'Description of Award Card',
      table: {
        defaultValue: {
          summary: null,
        },
      },
    },
  },
};

/**
 * Template for rendering the Award Card component with dynamic props.
 * @param {Object} args - Arguments to customize the component.
 * @returns {JSX.Element} Rendered Award Card component.
 */
const Template = (args) => <AwardCard {...args} />;

/**
 * Default story for the Award Card
 * Demonstrates a complete Award Card with image, title and description
 */
export const Default = Template.bind({});
Default.args = {
  image: './images/chefsChoiceAward.png',
  title: "Chefs' Choice Awards",
  description: 'Winner in multiple categories for Own Brand products',
};

/**
 * Default story for the Awards Rail component.
 * Demonstrates an Awards rail with multiple awards
 */
export const AwardRail = {
  render: () => {
    const slides = [
      <AwardCard
        image="./images/chefsChoiceAward.png"
        title="Chefs' Choice Awards"
        description="Winner in multiple categories for Own Brand products"
      />,
      <AwardCard
        image="./images/swaAchieversAward.png"
        title="SWA Achievers Awards"
        description={
          <>
            Green Wholesaler
            <span> </span>
            <br className="tw:lg:hidden" />
            of the Year
          </>
        }
      />,
      <AwardCard
        image="./images/qAward.png"
        title="Quality Food Awards"
        description="Winner in multiple categories for Own Brand products"
      />,
      <AwardCard
        image="./images/himWholesaleAward.png"
        title="HIM Wholesale Awards"
        description="Best National Wholesaler for customer satisfaction"
      />,
      <AwardCard
        image="./images/qAward.png"
        title="Quality Food Awards"
        description="Winner in multiple categories for Own Brand products"
      />,
      <AwardCard
        image="./images/swaAchieversAward.png"
        title="SWA Achievers Awards"
        description={
          <>
            Green Wholesaler
            <span> </span>
            <br className="tw:lg:hidden" />
            of the Year
          </>
        }
      />,
      <AwardCard
        image="./images/qAward.png"
        title="Quality Food Awards"
        description="Winner in multiple categories for Own Brand products"
      />,
      <AwardCard
        image="./images/himWholesaleAward.png"
        title="HIM Wholesale Awards"
        description="Best National Wholesaler for customer satisfaction"
      />,
    ];

    const options = {
      spaceBetween: 12,
      observer: true,
      observeParents: true,
      slidesPerView: 1.2,
      grid: {
        rows: 2,
        fill: 'row',
      },
      breakpoints: {
        500: {
          freeMode: false,
          autoHeight: true,
          slidesPerView: 2,
          grid: {
            rows: 1,
            fill: 'column',
          },
        },
        1024: {
          freeMode: false,
          autoHeight: true,
          slidesPerView: 4,
          grid: {
            rows: 1,
            fill: 'column',
          },
        },
        1312: {
          freeMode: false,
          slidesPerView: 4,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
          grid: {
            rows: 1,
            fill: 'column',
          },
        },
      },
    };

    return (
      <RailSection
        title="Awards & Recognition"
        description="Our most recent accolades"
        carouseloptions={options}
        classname="tw:!overflow-visible tw:lg:!overflow-hidden"
        titleclassname="tw:lg:px-0"
        descriptionclassname="tw:lg:px-0"
      >
        {slides}
      </RailSection>
    );
  },
};
