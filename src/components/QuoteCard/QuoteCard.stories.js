/**
 * Storybook configuration for the QuoteCard component
 * This defines how the QuoteCard component will appear in Storybook and what controls/options are available.
 */

// Import the component
import QuoteCarousel from './components/QuoteCarousel';
import QuoteCard from './QuoteCard';

import { convertPropsToString } from '../../../utils/storybookHelpers';

// Define the story configuration
export default {
  // The title under which the QuoteCard component will appear in Storybook's navigation
  title: 'Cards/Quote Card',

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the component
  argTypes: {
    quote: {
      description: 'The quote text to display',
      control: {
        type: 'text',
      },
    },

    author: {
      description: "The name of the quote's author",
      control: {
        type: 'text',
      },
    },
    location: {
      description: 'The name of the author location',
      control: {
        type: 'text',
      },
    },

    image: {
      description: "The URL of the author's image",
      control: {
        type: 'text',
      },
    },

    imagemobile: {
      description: "The URL of the author's image for mobile",
      control: {
        type: 'text',
      },
    },

    imagebackground: {
      description: 'The URL of the background image for Simple variant',
      control: {
        type: 'text',
      },
    },

    article: {
      description:
        'Object containing article information for the Article variant',
      control: {
        type: 'object',
      },
    },

    variant: {
      description: 'The style variant of the quote card',
      control: {
        type: 'select',
        options: ['graphic', 'stacked', 'article', 'simple'],
      },
    },

    position: {
      description: 'The position of the quote card for the Graphic variant',
      control: {
        type: 'select',
        options: ['left', 'center', 'right'],
      },
    },
  },

  // Added to override default story height if needed for this component
  parameters: {
    layouts: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#FAF9F5',
        },
        {
          name: 'dark',
          value: '#FAF9F5',
        },
      ],
    },
    docs: {
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const cleanObject = (obj) => {
            if (Array.isArray(obj)) {
              return obj.map(cleanObject);
            }
            if (obj && typeof obj === 'object') {
              const cleaned = {};
              for (const [key, value] of Object.entries(obj)) {
                if (key.startsWith('__')) continue;

                cleaned[key] = cleanObject(value);
              }
              return cleaned;
            }
            return obj;
          };

          const props = convertPropsToString(cleanObject(args));

          if (storyContext.name === 'Rail With Graphic Quotes') {
            // Get props for each quote variant
            const leftProps = convertPropsToString(QuoteLeft.args);
            const centerProps = convertPropsToString(QuoteCenter.args);
            const rightProps = convertPropsToString(QuoteRight.args);

            return `<QuoteCarousel title="What our customers think.">
                  <QuoteCard\n  ${leftProps}\n  />
                  <QuoteCard\n  ${centerProps}\n  />
                  <QuoteCard\n  ${rightProps}\n  />
              </QuoteCarousel>`;
          }

          return `<QuoteCard\n ${props}\n />`;
        },
      },
      description: {
        component: `
The Quote Card component is used to display a quote with an author and location, and can be styled in different variants.

### Design Figma References
- [Quote Card UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=2212-6583&m=dev)

- [Quote Rail design](https://www.figma.com/design/Jgv6b7BGHkVg0CqK2R7A4O/Booker-UI-Design-Templates?node-id=1214-68036&m=dev)
      `,
      },
    },
  },
};

/**
 * Template for rendering the QuoteCard component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => QuoteCard(args);

/**
 * Left graphic quote story.
 * Demonstrates basic usage with default settings.
 */
export const QuoteLeft = Template.bind({});
QuoteLeft.args = {
  quote: `"Always helpful, always available"`,
  author: 'Jason, Shop owner',
  location: 'Walthamstow',
  variant: 'graphic',
  position: 'left',
  image: './images/quotes/quote-left.png',
  imagemobile: './images/quotes/quote-left-mobile.png',
};

/**
 * Center graphic quote story.
 * Demonstrates the quote card positioned to the center.
 */
export const QuoteCenter = Template.bind({});
QuoteCenter.args = {
  quote: `"Great choice and customer service"`,
  author: 'Selena, Cafe owner',
  location: 'Penzance',
  variant: 'graphic',
  position: 'center',
  image: './images/quotes/quote-center.png',
  imagemobile: './images/quotes/quote-center-mobile.png',
};

/**
 * Right graphic quote story.
 * Demonstrates the quote card positioned to the right.
 */
export const QuoteRight = Template.bind({});
QuoteRight.args = {
  quote: `"They're just like an extension of the team here"`,
  author: 'Selena, Cafe owner',
  location: 'Penzance',
  variant: 'graphic',
  position: 'right',
  image: './images/quotes/quote-right.png',
  imagemobile: './images/quotes/quote-right-mobile.png',
};

/**
 * Stacked story.
 * Demonstrates the quote card in a stacked layout.
 */
export const QuoteStacked = Template.bind({});
QuoteStacked.args = {
  quote: `“They're just like an extension of the team here“`,
  author: 'Dev, Head Chef',
  location: 'The Kings Arms, Salford',
  variant: 'stacked',
  image: './images/quotes/dev-chef.jpg',
};

/**
 * Simple story.
 * Demonstrates the quote card in a simple layout.
 */
export const QuoteSimple = {
  args: {
    quote:
      'On time deliveries, and always feeling reassured that what I order will arrive is crucial for us, and is the Booker difference."',
    author: 'Jason, Shop owner',
    location: 'Walthamstow',
    variant: 'simple',
    image: './images/quotes/quote-person.png',
    imagebackground: './images/quotes/kitchen-bg.jpeg',
  },
  render: (args) => (
    <div className="tw:max-w-[340px]">
      <QuoteCard {...args} />
    </div>
  ),
};

/**
 * Quote with article story.
 * Demonstrates the quote card with an article.
 */

export const QuoteWithArticle = Template.bind({});
QuoteWithArticle.args = {
  image: './images/quotes/quote-article.png',
  variant: 'article',
  quote:
    '“Running a kitchen is never smooth sailing, so much is driven by stock reliability and consistency. I get this with Booker, plus great value too.',
  author: 'Henry Fung, Head Chef and restaurant owner',
  location: 'The Kings Arms, Salford',
  article: {
    description:
      "Insights and strategies from business owners who achieved growth using Booker's diverse products and expert support.",
    href: '#',
  },
};

/**
 * Quote without article story.
 * Demonstrates the QuoteArticle component without an article section.
 */
export const QuoteWithoutArticle = Template.bind({});
QuoteWithoutArticle.args = {
  variant: 'article',
  quote:
    '"Always helpful, always available. The team at Booker has been instrumental in helping us grow our business. Always helpful, always available. The team at Booker has been instrumental in helping us grow our business. Always helpful, always available. The team at Booker has been instrumental in helping us grow our business."',
  author: 'Sarah Johnson, Restaurant Manager',
  location: 'The Blue Bistro, Manchester',
  image: './images/quotes/quote-article.png',
};

/**
 * Rail story.
 * Demonstrates the quote card in a rail section.
 */
export const RailWithGraphicQuotes = {
  render: () => (
    <QuoteCarousel title="What our customers think.">
      <QuoteCard {...QuoteLeft.args} />
      <QuoteCard {...QuoteCenter.args} />
      <QuoteCard {...QuoteRight.args} />
    </QuoteCarousel>
  ),
};
