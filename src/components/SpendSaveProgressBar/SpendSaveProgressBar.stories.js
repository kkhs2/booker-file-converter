/**
 * Storybook configuration for the SpendSaveProgressBar component
 * This defines how the SpendSaveProgressBar component will appear in Storybook and what controls/options are available.
 */

// Import the component
import { convertPropsToString } from '../../../utils/storybookHelpers';
import SpendSaveProgressBar from './SpendSaveProgressBar';

// Define the story configuration
export default {
  // The title under which the SpendSaveProgressBar component will appear in Storybook's navigation
  title: 'Components/Spend & Save Progress Bar',

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the component
  argTypes: {
    steps: {
      control: 'number',
      description: 'Number of steps in the progress bar',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 5 },
      },
    },
    progress: {
      control: 'number',
      description: 'Current progress percentage',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
  },

  // Added to override default story height if needed for this component
  parameters: {
    docs: {
      story: {
        height: '300px',
      },
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const props = convertPropsToString(args);

          return `<SpendSaveProgressBar\n ${props}\n />`;
        },
      },
      description: {
        component: `
The SpendSaveProgressBar component is a visual representation of progress in a spending or saving context. It displays the current progress as a percentage of the total steps.
      
### Design Figma References
- [SpendSaveProgressBar UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=4872-38491&m=dev)
  `,
      },
    },
  },
};

/**
 * Template for rendering the SpendSaveProgressBar component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => SpendSaveProgressBar(args);

/**
 * Default story.
 * Demonstrates basic usage with default settings.
 */
export const Default = Template.bind({});
Default.args = {
  steps: 5,
  progress: 5,
};

export const Variant = Template.bind({});
Variant.args = {
  steps: 5,
  progress: 75,
};

export const FullVariant = Template.bind({});
FullVariant.args = {
  steps: 5,
  progress: 100,
};

/**
 * All variations story.
 * Demonstrates different component configurations in a single view.
 */
export const AllVariations = {
  render: () => {
    const configs = [Default.args, Variant.args, FullVariant.args];

    return (
      <div className="tw:space-y-4">
        {configs.map((config) => (
          <Template {...config} />
        ))}
      </div>
    );
  },
};
