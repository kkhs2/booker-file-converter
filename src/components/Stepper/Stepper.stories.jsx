// Import the Stepper component
import Stepper from './Stepper';

// Define the story configuration
export default {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: `
The Stepper component visually represents the progress of a multi-step process. It helps users understand their current position and the remaining steps.

### Props
- **steps**: An array of step objects with the following properties:
  - **label**: The name of the step.
  - **id**: A unique identifier for the step.
  - **completed**: A boolean indicating whether the step is completed.

### Example Usage

<Stepper
  steps={[
    { label: 'Delivery', id: 1, completed: true },
    { label: 'Payment', id: 2, completed: false },
    { label: 'Confirmation', id: 3, completed: false },
  ]}
/>
        `,
      },
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const props = Object.entries(args.steps || {})
            .map(([key, value]) => `${key}={${JSON.stringify(value)}}`)
            .join('\n  ');

          return `<Stepper
  steps={${props}}
/>`;
        },
      },
    },
  },

  argTypes: {
    steps: {
      control: 'object',
      description:
        'Array of step objects with label, id, and completed properties.',
      table: {
        type: {
          summary: 'Array<{ label: string, id: number, completed: boolean }>',
        },
        defaultValue: { summary: '[]' },
      },
    },
  },
};

// Template for rendering the Stepper component
const Template = (args) => <Stepper {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  steps: [
    { label: 'Delivery', id: 1, completed: true },
    { label: 'Payment', id: 2, completed: false },
    { label: 'Confirmation', id: 3, completed: false },
  ],
};

// Additional story variants

// Variant with all steps completed
export const AllStepsCompleted = Template.bind({});
AllStepsCompleted.args = {
  steps: [
    { label: 'Delivery', id: 1, completed: true },
    { label: 'Payment', id: 2, completed: true },
    { label: 'Confirmation', id: 3, completed: true },
  ],
};

// Variant with no steps completed
export const NoStepsCompleted = Template.bind({});
NoStepsCompleted.args = {
  steps: [
    { label: 'Delivery', id: 1, completed: false },
    { label: 'Payment', id: 2, completed: false },
    { label: 'Confirmation', id: 3, completed: false },
  ],
};

// Variant with a custom step label
export const CustomStepLabels = Template.bind({});
CustomStepLabels.args = {
  steps: [
    { label: 'Start', id: 1, completed: true },
    { label: 'Middle', id: 2, completed: false },
    { label: 'End', id: 3, completed: false },
  ],
};
