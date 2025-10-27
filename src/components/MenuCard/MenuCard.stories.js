/**
 * Storybook configuration for the MenuCard component
 * This defines how the MenuCard component will appear in Storybook and what controls/options are available.
 */

// Imports
import MenuCard from './MenuCard';
import RailSection from '../RailSection/RailSection';

// Define the story configuration
export default {
  // The title under which the MenuCard component will appear in Storybook's navigation
  title: 'Cards/Menu Card',

  // The component to display in the story
  component: MenuCard,

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  parameters: {
    // Background configuration for the component
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ECE8E1',
        },
      ],
    },

    // Documentation configuration
    docs: {
      description: {
        component: `
The Menu Card component is used to display a menu item with an image and label.

### Design Figma References
- [Menu Card UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=2757-35599&m=dev)
      `,
      },

      // Custom source code transformation for better documentation
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const { label, image, url } = args;
          const props = { label, image, url };
          const propsString = Object.entries(props)
            .map(([key, value]) => `${key}="${value}"`)
            .join('\n ');

          return `<MenuCard\n ${propsString}\n />`;
        },
      },
    },
  },

  // Define controls (props) for the component
  argTypes: {
    // Label
    label: {
      control: 'text',
      description: 'The text label displayed on the menu card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Image
    image: {
      control: 'text',
      description: 'URL of the image to display',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Image Aspect Ratio
    imageaspecttatio: {
      control: 'text',
      description: 'The aspect ratio for the image container',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'tw:aspect-square' },
      },
    },

    // URL
    url: {
      control: 'text',
      description: 'URL to navigate to when clicked',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // External URL
    externalurl: {
      control: 'boolean',
      description: 'Whether the URL is external',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },

    // Label Position
    labelposition: {
      control: 'radio',
      options: ['overlay', 'below'],
      description: 'Position of the label and button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'overlay' },
      },
    },
  },
};

/**
 * Default story.
 * Demonstrates the basic MenuCard component with default settings.
 */
export const Default = {
  args: {
    label: 'Pubs and bars',
    image: './images/burgers.jpeg',
    url: 'http://booker.co.uk',
  },

  render(args) {
    return (
      <div className="tw:max-w-[260px]">
        <MenuCard {...args} />
      </div>
    );
  },
};

/**
 * LabelBelow story.
 * Demonstrates the MenuCard component with the label positioned below the image.
 */
export const LabelBelow = {
  args: {
    label: 'Pubs and bars',
    image: './images/burgers.jpeg',
    url: 'http://booker.co.uk',
    labelposition: 'below',
    classname: 'tw:bg-white tw:p-2 tw:rounded-[20px]',
  },

  render(args) {
    return (
      <div className="tw:max-w-[260px]">
        <MenuCard {...args} />
      </div>
    );
  },
};

/**
 * MenuCardRail story.
 * Demonstrates multiple MenuCard components in a horizontal rail layout.
 */
export const MenuCardRail = {
  render: () => {
    return (
      <RailSection title="Pubs and bars">
        {Array(12)
          .fill(null)
          .map((_, index) => (
            <MenuCard
              key={index}
              label="Pubs and bars"
              image="./images/burgers.jpeg"
              url="http://booker.co.uk"
            />
          ))}
      </RailSection>
    );
  },
};

/**
 * MenuCardGrid story.
 * Demonstrates multiple MenuCard components in a responsive grid layout.
 */
export const MenuCardGrid = {
  render: () => {
    return (
      <div className="tw:grid tw:grid-cols-2 tw:gap-4 tw:lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <MenuCard
            key={index}
            label="Pubs and bars"
            image="./images/burgers.jpeg"
            url="http://booker.co.uk"
          />
        ))}
      </div>
    );
  },
};

/**
 * MenuCardGridWithLabelBelow story.
 * Demonstrates multiple MenuCard components in a grid with labels positioned below.
 */
export const MenuCardGridWithLabelBelow = {
  render: () => {
    return (
      <div className="tw:grid tw:grid-cols-2 tw:gap-4 tw:lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <MenuCard
            key={index}
            label="Pubs and bars"
            image="./images/burgers.jpeg"
            url="http://booker.co.uk"
            labelposition="below"
            classname="tw:bg-white tw:p-2 tw:rounded-[20px]"
          />
        ))}
      </div>
    );
  },
};

/**
 * MenuCardSectionExample story.
 * Demonstrates a real-world example of MenuCards in a section with different labels.
 */
export const MenuCardSectionExample = {
  render: () => {
    return (
      <RailSection title="Supporting businesses like yours">
        {Array.from({ length: 8 }).map((_, index) =>
          // prettier-ignore
          <MenuCard
            key={index}
            label={
              index === 0 ? "Pubs & Bars" :
              index === 1 ? "Restaurants" : 
              index === 2 ? "Coffee Shops & Cafes" :
              index === 3 ? "Events" :
              index === 4 ? "Independent Shops" :
              index === 5 ? "Hotels" :
              index === 6 ? "Care & Education" :
              "Convenience Retailing"
            }
            image="./images/cards/pubs-and-bars.png"
            url="http://booker.co.uk"
            imageaspecttatio="tw:aspect-[5/4]"
          />,
        )}
      </RailSection>
    );
  },
};
