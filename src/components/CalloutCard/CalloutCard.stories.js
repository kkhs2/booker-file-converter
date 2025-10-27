/**
 * Storybook configuration for the CalloutCard component
 * This defines how the CalloutCard component will appear in Storybook and what controls/options are available.
 */

// Import the component
import CalloutCard from './CalloutCard';
import Icons from '../Icons/Icons';

// Define the story configuration
export default {
  // The title under which the CalloutCard component will appear in Storybook's navigation
  title: 'Components/Callout Card',

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the component
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'error'],
      description: 'Type of the callout card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'info' },
      },
    },
    icon: {
      control: 'text',
      description: 'Custom icon to display for the callout card',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: '' },
      },
    },
    closeicon: {
      control: 'boolean',
      description: 'Show close icon',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    onclose: {
      control: 'function',
      description: 'Function to call when the close icon is clicked',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: '' },
      },
    },
    cta: {
      control: 'text',
      description: 'Text for the call-to-action button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    onctaclick: {
      control: 'function',
      description: 'Function to call when the CTA button is clicked',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: '' },
      },
    },

    children: {
      control: 'text',
      description: 'Content to display inside the callout card',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: '' },
      },
    },
  },

  // Added to override default story height if needed for this component
  parameters: {
    docs: {
      story: {
        height: '300px',
      },
    },
  },
};

/**
 * Template for rendering the CalloutCard component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => CalloutCard(args);

/**
 * Default story.
 * Demonstrates basic usage with default settings.
 */
export const Default = Template.bind({});
Default.args = {
  type: 'info',
  children: 'This is an info callout card.',
  closeicon: true,
  onclose: () => {
    console.log('Callout card closed');
  },
};

/**
 * Success story.
 * Demonstrates the success variant of the callout card.
 */
export const Success = Template.bind({});
Success.args = {
  type: 'success',
  children: 'This is a success callout card.',
};

/**
 * Error story.
 * Demonstrates the error variant of the callout card.
 */
export const Error = Template.bind({});
Error.args = {
  type: 'error',
  children: 'This is an error callout card.',
};

/**
 * With CTA story.
 * Demonstrates the callout card with a call-to-action button.
 */
export const WithCTA = Template.bind({});
WithCTA.args = {
  type: 'info',
  children: 'This callout card has a call-to-action button.',
  cta: 'Learn More',
  onctaclick: () => {
    console.log('CTA clicked');
  },
};

/**
 * Success with CTA story.
 * Demonstrates the success variant with a CTA button.
 */
export const SuccessWithCTA = Template.bind({});
SuccessWithCTA.args = {
  type: 'success',
  children: 'Operation completed successfully!',
  cta: 'Continue',
  onctaclick: () => {
    console.log('Success CTA clicked');
  },
};

/**
 * Error with CTA story.
 * Demonstrates the error variant with a CTA button.
 */
export const ErrorWithCTA = Template.bind({});
ErrorWithCTA.args = {
  type: 'error',
  children: 'An error occurred. Please try again.',
  cta: 'Retry',
  onctaclick: () => {
    console.log('Error CTA clicked');
  },
};

/**
 * Complete example story.
 * Demonstrates the callout card with all features: CTA and close button.
 */
export const CompleteExample = Template.bind({});
CompleteExample.args = {
  type: 'info',
  children: 'This is a complete example with both CTA and close functionality.',
  cta: 'Take Action',
  onctaclick: () => {
    console.log('CTA clicked');
  },
  closeicon: true,
  onclose: () => {
    console.log('Callout card closed');
  },
};

/**
 * All variations story.
 * Demonstrates different component configurations in a single view.
 */
export const AllVariations = {
  render: () => {
    return (
      <div className="tw:flex tw:max-w-lg tw:flex-col tw:space-y-8 tw:p-6">
        <CalloutCard {...Default.args} />
        <CalloutCard {...Success.args} />
        <CalloutCard {...Error.args} />
        <CalloutCard type="info" icon={<Icons.tag />}>
          This is a callout card with a custom icon.
        </CalloutCard>
        <CalloutCard
          type="info"
          cta="Learn More"
          onctaclick={() => console.log('CTA clicked')}
        >
          This callout card has a CTA button.
        </CalloutCard>
        <CalloutCard
          type="success"
          cta="Continue"
          closeicon={true}
          onctaclick={() => console.log('Success CTA clicked')}
          onclose={() => console.log('Success card closed')}
        >
          Complete example with CTA and close button.
        </CalloutCard>
      </div>
    );
  },
};
