/**
 * Storybook configuration for the ArticleCard component
 * This defines how the ArticleCard component will appear in Storybook and what controls/options are available.
 */

// Import the component
import { faker } from '@faker-js/faker';
import ArticleCard from './ArticleCard';

// Define the story configuration
export default {
  // The title under which the ArticleCard component will appear in Storybook's navigation
  title: 'Cards/Article Card',

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ECE8E1',
        },
      ],
    },
    docs: {
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const { image, title, description, cta, url, size, category } = args;
          const props = { image, title, description, cta, url, size, category };
          const propsString = Object.entries(props)
            .map(([key, value]) => `${key}="${value}"`)
            .join('\n ');

          return `<ArticleCard\n ${propsString}\n />`;
        },
      },
      description: {
        component: `
The Article Card component is used to display an article with an image, title, description, and call-to-action button.

### Design Figma References
- [Article Card UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=2188-6812&m=dev)
      `,
      },
    },
  },

  // Define controls (props) for the component
  argTypes: {
    // Image
    image: {
      control: 'text',
      description: 'Image source for the article',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Title
    title: {
      control: 'text',
      description: 'Title of the article',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Description
    description: {
      control: 'text',
      description: 'Description of the article',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // CTA
    cta: {
      control: 'text',
      description: 'Call to action text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
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

    // Size
    size: {
      control: {
        type: 'select',
      },
      options: ['wide', 'narrow'],
      description: 'Size of the article card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'wide' },
      },
    },

    // Category
    category: {
      control: {
        type: 'select',
      },
      options: ['inspiration', 'recipe', 'insights'],
      description: 'Category of the article',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'inspiration' },
      },
    },

    // Constrain Image Height
    constrainimageheight: {
      control: 'number',
      description: 'Maximum height constraint for the image in pixels',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
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
    image: './images/chef.jpeg',
    title:
      'How serving up the perfect roast is more planning than just the perfect potatoes',
    cta: 'Read more',
    description:
      "The perfect roast is more than just the perfect potatoes. It's about the planning, the timing, and the execution.",
    url: '#',
  },

  render: (args) => (
    <div className="tw:max-w-[550px]">
      <ArticleCard {...args} />
    </div>
  ),
};

/**
 * All variations story.
 * Demonstrates different component configurations in a single view.
 */
export const AllVariations = {
  render: () => {
    return (
      <div className="tw:grid tw:grid-cols-1 tw:gap-8 tw:md:grid-cols-2 tw:lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ArticleCard
            key={index}
            image="./images/chef.jpeg"
            title={faker.lorem.sentence()}
            cta="Read more"
            description={faker.lorem.sentences({ min: 1, max: 8 })}
            url="#"
            category={
              index % 3 === 0
                ? 'inspiration'
                : index % 3 === 1
                  ? 'recipe'
                  : 'insights'
            }
            size={index % 2 === 0 ? 'wide' : 'narrow'}
          />
        ))}
      </div>
    );
  },
};
