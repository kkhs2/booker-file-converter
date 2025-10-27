import RailSection from './RailSection';
import { Default as FC } from '../FeatureCard/FeatureCard.stories';
import FeatureCard from '../FeatureCard/FeatureCard';
import MenuCard from '../MenuCard/MenuCard';
import { convertPropsToString } from '../../../utils/storybookHelpers';

export default {
  title: 'Sections/Rail section',
  component: RailSection,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### RailSection Component

A versatile section component that displays content with a header area and a collection of child components in either a carousel or grid layout.

#### Layout Structure
- **Header Area**:
  - Left side: Title (optional) and description (optional)
  - Right side: Navigation arrows (when carousel mode is active)
- **Content Area**: 
  - Displays child components in either carousel or grid format

#### Responsive Behavior
- **Desktop**: Choice of two layout styles:
  - Carousel: Horizontally scrolling content with navigation arrows
  - Grid: Fixed grid layout with customisable number of columns
- **Mobile**: Always displays as a carousel, regardless of desktop setting

#### Usage Example
\`\`\`jsx
<RailSection
  title="Featured Items"
  description="Check out our selection"
  desktopstyle="grid"
  desktopgridcols={3}
>
  <ProductCard />
  <ProductCard />
  <ProductCard />
</RailSection>
\`\`\`
`,
      },
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;

          if (!args) return source;

          const props = convertPropsToString(args);

          return `<RailSection\n ${props} >
  {/* Add children here */}
</RailSection>`;
        },
      },
    },
  },

  argTypes: {
    title: {
      control: {
        type: 'text',
      },
      description: 'Title of the RailSection',
      table: {
        defaultValue: { summary: 'Section title' },
      },
    },

    titleclassname: {
      control: {
        type: 'text',
      },
      description: 'Additional classes to add to the title',
    },

    description: {
      control: {
        type: 'text',
      },
      description: 'Description of the RailSection',
      table: {
        defaultValue: { summary: 'Section description' },
      },
    },

    descriptionclassname: {
      control: {
        type: 'text',
      },
      description: 'Additional classes to add to the description',
    },

    navigationclassname: {
      control: {
        type: 'text',
      },
      description: 'Additional classes to add to the navigation',
    },

    tag: {
      control: {
        type: 'text',
      },
      description: 'Tag of the RailSection',
    },

    cta: {
      control: {
        type: 'text',
      },
      description: 'CTA of the RailSection',
    },

    href: {
      control: {
        type: 'text',
      },
      description: 'CTA link of the RailSection',
    },

    children: {
      control: {
        type: 'array',
      },
      description: 'List of components to be displayed in the section',
      table: {
        defaultValue: { summary: '[]' },
      },
    },

    desktopstyle: {
      control: {
        type: 'select',
      },
      options: ['carousel', 'grid'],
      description:
        'The style of the section, either carousel or grid on desktop',
      table: {
        defaultValue: { summary: 'carousel' },
      },
    },

    desktopgridcols: {
      control: {
        type: 'number',
      },
      description: 'Number of grid columns to display',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 4 },
      },
    },

    desktopgridclassname: {
      control: {
        type: 'text',
      },
      description: 'Additional classes to add to the grid for desktop',
    },

    showNavigation: {
      control: {
        type: 'boolean',
      },
      description: 'Show navigation buttons',
      table: {
        defaultValue: { summary: true },
      },
    },

    carouseloptions: {
      control: {
        type: 'object',
      },
      description: 'Custom Swiper settings for the carousel',
      table: {
        defaultValue: { summary: '{}' },
      },
    },

    aligncontent: {
      control: {
        type: 'select',
      },
      options: ['top', 'bottom', 'stretch'],
      description:
        'Vertical alignment of slide content: top, bottom, or stretch',
      table: {
        defaultValue: { summary: 'stretch' },
      },
    },
  },
};

// Showcase of the RailSection component with FeatureCard children
export const FeatureCardRail = {
  args: {
    title: 'Current offers',
    description: 'Check out these deals on popular products',
    desktopstyle: 'carousel',
  },
  render: (args) => {
    const slides = [
      <FeatureCard {...FC.args} />,
      <FeatureCard {...FC.args} />,
      <FeatureCard {...FC.args} variant="primary" size="large" />,
      <FeatureCard {...FC.args} variant="secondary" size="large" />,
      <FeatureCard {...FC.args} variant="primary" size="large" />,
      <FeatureCard
        {...FC.args}
        variant="primary-inverse"
        size="large"
        border
      />,
      <FeatureCard {...FC.args} variant="secondary" />,
      <FeatureCard {...FC.args} variant="secondary-inverse" size="large" />,
      <FeatureCard {...FC.args} />,
      <FeatureCard {...FC.args} variant="primary-inverse" size="large" />,
      <FeatureCard {...FC.args} variant="secondary" size="small" />,
      <FeatureCard {...FC.args} variant="secondary-inverse" size="small" />,
    ];

    return (
      <RailSection
        desktopstyle={args.desktopstyle}
        title={args.title}
        description={args.description}
        showNavigation={args.showNavigation}
      >
        {slides}
      </RailSection>
    );
  },
};

// Showcase of the RailSection component with MenuCard children
export const MenuCardSection = {
  args: {
    title: 'Explore our range',
    desktopgridcols: 4,
    shownavigation: false,
    desktopstyle: 'grid',
  },
  render: (args) => {
    return (
      <RailSection
        desktopstyle={args.desktopstyle}
        desktopgridcols={args.desktopgridcols}
        title={args.title}
        shownavigation={args.shownavigation}
      >
        {Array.from({ length: 8 }).map((_, index) =>
          // prettier-ignore
          <MenuCard
            key={index}
            label={index === 0 ? "Pubs & Bars" :
              index === 1 ? "Restaurants" :
                index === 2 ? "Coffee Shops & Cafes" :
                  index === 3 ? "Events" :
                    index === 4 ? "Independent Shops" :
                      index === 5 ? "Hotels" :
                        index === 6 ? "Care & Education" :
                          "Convenience Retailing"}
            image="./images/cards/pubs-and-bars.png"
            url="http://booker.co.uk"
            classname="tw:aspect-[5/4]" />,
        )}
      </RailSection>
    );
  },
};
