/**
 * Storybook configuration for the WelcomeBar component
 * This defines how the WelcomeBar component will appear in Storybook and what controls/options are available.
 */

// Import the component
import WelcomeBar from './WelcomeBar';

// Define the story configuration
export default {
  // The title under which the WelcomeBar component will appear in Storybook's navigation
  title: 'Sections/Welcome bar',

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

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
              if (typeof value === 'undefined' || typeof value === 'function') {
                return null;
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

          return `<WelcomeBar\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
A component that displays a welcome message for a customer or trade club member.

### Design Figma References
- [WelcomeBar UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=2775-29185&m=dev)
        `,
      },
    },
  },

  // Define controls (props) for the component
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['default', 'with-logo', 'club'],
      description: 'The variant of the component',
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },

    image: {
      control: {
        type: 'text',
      },
    },
    customerid: {
      control: {
        type: 'text',
      },
    },
    headline: {
      control: {
        type: 'text',
      },
    },
    title: {
      control: {
        type: 'text',
      },
    },
    registrationinfo: {
      control: {
        type: 'text',
      },
    },

    club: {
      control: {
        type: 'object',
      },
      description: 'The club type',
      table: {
        type: {
          summary: '{ id: string, name: string, image: string }',
        },
      },
    },
  },
};

/**
 * Template for rendering the WelcomeBar component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => WelcomeBar(args);

/**
 * Default story.
 * Demonstrates basic usage with default settings.
 */
export const Default = Template.bind({});
Default.args = {
  variant: 'default',
  customerid: '1232323',
  title: 'Trattoria Carlotta',
  registrationinfo: 'Registered with the Booker Northampton branch',
};

/**
 * Default story.
 * Demonstrates basic usage with default settings.
 */
export const WithLogo = Template.bind({});
WithLogo.args = {
  variant: 'with-logo',
  image: './images/logos/londis.png',
  customerid: '1232323',
  title: 'Londis Wellingborough',
};

/**
 * Variant story.
 * Demonstrates component with different prop values.
 */
export const Club = Template.bind({});
Club.args = {
  title: 'Trattoria Carlotta',
  variant: 'club',
  customerid: '1232323',
  club: {
    id: 'on-trade',
    name: 'On Trade Club',
  },
};

/**
 * All variations story.
 * Demonstrates different component configurations in a single view.
 */
export const AllVariations = {
  render: () => {
    return (
      <div className="tw:space-y-20">
        <WelcomeBar {...Default.args} />
        <WelcomeBar {...WithLogo.args} />
        <WelcomeBar {...Club.args} />
        <WelcomeBar
          {...Club.args}
          club={{
            id: 'fast-food',
            name: 'Fast Food Club',
          }}
        />
        <WelcomeBar
          {...Club.args}
          club={{
            id: 'just-eat',
            name: 'Just Eat Club',
            image: './images/logos/just-eat.png',
          }}
        />
        <WelcomeBar
          {...Club.args}
          club={{
            id: 'uber-eats',
            name: 'Uber Eats Club',
            image: './images/logos/uber-eats.png',
          }}
        />
      </div>
    );
  },
};
