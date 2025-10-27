/**
 * Storybook configuration for the CheckoutNav component
 * This defines how the CheckoutNav component will appear in Storybook and what controls/options are available.
 */

// Import the component
import CheckoutNav from './CheckoutNav';

// Define the story configuration
export default {
  // The title under which the CheckoutNav component will appear in Storybook's navigation
  title: 'Components/CheckoutNav',

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the component
  argTypes: {
    // Example prop
    propName: {
      control: 'text',
      description: '[Description of the prop]',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    // Another example prop
    anotherPropName: {
      control: 'boolean',
      description: '[Description of the prop]',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    classname: {
      description: 'Additional classes to add to the component',
      control: 'text',
    },
    backtoshopurl: {
      description:
        'URL for the "Back to shop" button. If provided, uses an anchor tag instead of button',
      control: 'text',
    },
    handlebacktoshop: {
      description:
        'Click handler for the "Back to shop" button (used when backtoshopurl is not provided)',
      action: 'clicked',
    },
  },

  // Added to override default story height if needed for this component
  parameters: {
    docs: {
      story: {
        height: '300px',
      },
      description: {
        component: `
Navigation component for the checkout flow with configurable back to shop functionality.
        `,
      },
    },
  },
};

/**
 * Template for rendering the CheckoutNav component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => CheckoutNav(args);

/**
 * With Click Handler story.
 * Demonstrates component usage with a click handler for the "Back to shop" button.
 */
export const WithClickHandler = Template.bind({});
WithClickHandler.args = {
  handlebacktoshop: () => alert('Back to shop clicked'),
};
WithClickHandler.parameters = {
  docs: {
    description: {
      story: 'Example using a click handler for the "Back to shop" button.',
    },
  },
};

/**
 * With URL story.
 * Demonstrates component usage with a URL for the "Back to shop" button.
 */
export const WithUrl = Template.bind({});
WithUrl.args = {
  backtoshopurl: 'https://www.booker.co.uk/',
};
WithUrl.parameters = {
  docs: {
    description: {
      story:
        'Example using a URL for the "Back to shop" button, which renders as an anchor tag.',
    },
  },
};

/**
 * Custom Class story.
 * Demonstrates component usage with custom class applied to the navigation bar.
 */
export const CustomClass = Template.bind({});
CustomClass.args = {
  backtoshopurl: 'https://www.booker.co.uk/',
  classname: 'tw:bg-primary-100',
};
CustomClass.parameters = {
  docs: {
    description: {
      story: 'Example with custom class applied to the navigation bar.',
    },
  },
};

/**
 * All variations story.
 * Demonstrates different component configurations in a single view.
 */
export const AllVariations = {
  render: () => {
    const container = document.createElement('div');
    container.className = 'tw:space-y-8';

    const configs = [WithClickHandler.args, WithUrl.args, CustomClass.args];

    configs.forEach((config) => {
      const component = Template(config);
      container.appendChild(component);
    });

    return container;
  },
};
