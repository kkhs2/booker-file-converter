/**
 * Storybook configuration for the ProgressStepper component
 * This defines how the ProgressStepper component will appear in Storybook and what controls/options are available.
 */

// Import the component
import ProgressStepper from './ProgressStepper';

// Define the story configuration
export default {
  // The title under which the ProgressStepper component will appear in Storybook's navigation
  title: 'Components/Progress Stepper',

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the component
  argTypes: {
    steps: {
      control: {
        type: 'array',
        options: [
          { label: 'Your business', checked: true },
          { label: 'Tell us about you', active: false },
          { label: 'Choose your branch' },
          { label: 'Branch activation' },
        ],
      },
      description: 'Array of steps for the ProgressStepper',
    },
  },

  // Added to override default story height if needed for this component
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

          return `<ProgressStepper\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
### Progress Stepper Component
The Progress Stepper component is designed to visually represent the progress of a multi-step process. It allows users to easily understand their current position within the process and what steps are remaining.

### Design Figma References
- [Progress Stepper library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=3734-100788&m=dev)
        `,
      },
    },
  },
};

/**
 * Template for rendering the ProgressStepper component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => ProgressStepper(args);

/**
 * Default story.
 * Demonstrates basic usage with default settings.
 */
export const Default = Template.bind({});
Default.args = {
  steps: [
    { label: 'Your business', checked: true },
    { label: 'Tell us about you', active: true },
    { label: 'Choose your branch' },
    { label: 'Branch activation' },
  ],
};
