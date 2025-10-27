/**
 * Storybook configuration for the ControlPanel component
 * This defines how the ControlPanel component will appear in Storybook and what controls/options are available.
 */

// Import the component
import NextDelivery from '../NextDelivery/NextDelivery';
import { DefaultFuture } from '../NextDelivery/NextDelivery.stories';
import QuickLinks from '../QuickLinks/QuickLinks';
import { Default, Wide } from '../QuickLinks/QuickLinks.stories';
import ControlPanel from './ControlPanel';

// Define the story configuration
export default {
  // The title under which the ControlPanel component will appear in Storybook's navigation
  title: 'Sections/Control Panel',

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the component
  argTypes: {
    // The background image for the control panel
    image: {
      control: {
        type: 'text',
      },
    },

    // The left element of the control panel
    elementleft: {
      control: {
        type: 'object',
      },
    },

    // The right element of the control panel
    elementright: {
      control: {
        type: 'object',
      },
    },
  },

  // Added to override default story height if needed for this component
  parameters: {
    docs: {
      description: {
        component: `
Thsi component is used to display a control panel with two elements, one on the left and one on the right. The left element is typically a set of quick links, while the right element is a next delivery component.

### Design Figma References
- [Control Panel library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=2599-26593&m=dev)
        `,
      },

      source: {
        transfrom: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const props = Object.entries(args)
            .map(([key, value]) => {
              return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<ControlPanel\n  ${props}\n/>`;
        },
      },
    },
  },
};

/**
 * Default story.
 * Demonstrates basic usage with default settings.
 */

export const DefaultControlPanel = {
  args: {
    image: './images/control-panel-bg.jpg',
    elementleft: () => <QuickLinks {...Default.args} />,
    elementright: () => <NextDelivery {...DefaultFuture.args} />,
  },
  render: (args) => {
    return (
      <div className="tw:container">
        <ControlPanel {...args} />
      </div>
    );
  },
};

/**
 * Wide story.
 * Demonstrates a wider version of the ControlPanel component.
 */

export const WideAndWithoutNextDelivery = {
  args: {
    image: './images/control-panel-wide-bg.jpg',
    elementleft: () => <QuickLinks {...Wide.args} />,
  },
  render: (args) => {
    return (
      <div className="tw:container">
        <ControlPanel {...args} />
      </div>
    );
  },
};

export const AllVariants = (args) => {
  return (
    <div className="tw:container tw:flex tw:flex-col tw:gap-8">
      <ControlPanel {...DefaultControlPanel.args} />
      <ControlPanel {...WideAndWithoutNextDelivery.args} />
    </div>
  );
};
