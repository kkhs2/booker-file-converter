/**
 * Storybook configuration for the InformationCard component
 * This defines how the InformationCard component will appear in Storybook and what controls/options are available.
 */

// Import the component
import { convertPropsToString } from '../../../utils/storybookHelpers';
import Icons from '../Icons/Icons';
import InformationCard from './InformationCard';

// Define the story configuration
export default {
  // The title under which the InformationCard component will appear in Storybook's navigation
  title: 'Cards/Information Card',

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the component
  argTypes: {
    title: {
      control: 'text',
      description:
        'The text to display as a headline in the InformationCard component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    accentcolor: {
      control: 'color',
      description: 'The accent color of the InformationCard component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#26176F' },
      },
    },
    cost: {
      control: 'text',
      description: 'The cost value to display in the InformationCard component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    costsubtitle: {
      control: 'text',
      description:
        'The subtitle for the cost value in the InformationCard component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    costwithvat: {
      control: 'text',
      description: 'The cost value with VAT in the InformationCard component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'behind', 'on-track'],
      description: 'The variant of the InformationCard component',
      table: {
        type: { summary: "'default' | 'behind' | 'on-track'" },
        defaultValue: { summary: 'default' },
      },
    },
    progress: {
      control: 'number',
      description: 'The progress percentage for the InformationCard component',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    costtospend: {
      control: 'text',
      description: 'The cost to spend in the InformationCard component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    costtospendsubtitle: {
      control: 'text',
      description:
        'The subtitle for the cost to spend in the InformationCard component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    icon: {
      control: 'select',
      options: Object.keys(Icons),
      description: 'The icon to display in the InformationCard component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Additional classes
    classname: {
      control: 'text',
      description: 'Additional classes to add to the component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },

  // Added to override default story height if needed for this component
  parameters: {
    docs: {
      story: {
        height: '300px',
        backgrounds: {
          default: 'gray',
          values: [{ name: 'gray', value: '#f2f0f0' }],
        },
      },
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const props = convertPropsToString(args);

          return `<InformationCard\n ${props}\n />`;
        },
      },
      description: {
        component: `
  The Information Card component is a visual representation of progress in a spending or saving context. It displays the current progress as a percentage of the total steps.
            
  ### Design Figma References
  - [Information Card UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=4798-28221&m=dev)
        `,
      },
    },
  },
};

const colors = ['#26176F', '#B6284B', '#FF8000', '#06C167'];

/**
 * Template for rendering the InformationCard component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => {
  return (
    <div className="tw:flex tw:max-w-[1312px] tw:flex-wrap tw:gap-3">
      {colors.map((color, index) => (
        <div key={index}>
          {InformationCard({ ...args, accentcolor: color })}
        </div>
      ))}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'Total spent on alcohol, soft drinks and snacks',
  accentcolor: '#26176F',
  cost: '£6,427.03',
  costsubtitle: '/ week',
  costwithvat: '£6,927.03',
};

export const Behind = Template.bind({});
Behind.args = {
  ...Default.args,
  title: 'Average spend on alcohol, soft drinks and snacks',
  variant: 'behind',
  progress: 75,
  costtospend: '£1,248.59',
  costtospendsubtitle: 'In the next 14 days',
};

export const OnTrack = Template.bind({});
OnTrack.args = {
  ...Default.args,
  title: 'Average spend on alcohol, soft drinks and snacks',
  variant: 'on-track',
  cost: '£536.07',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...Default.args,
  title: 'Total spent on all products',
  icon: Icons.benefitsGreatValue,
};

/**
 * All variations story.
 * Demonstrates different component configurations in a single view.
 */
export const AllVariations = {
  render: () => {
    const configs = [Default, Behind, OnTrack, WithIcon];

    return (
      <div className="tw:container tw:flex tw:flex-col tw:gap-8">
        {configs.map((config, index) => (
          <div key={index} className="tw:space-y-8">
            <Template {...config.args} />
          </div>
        ))}
      </div>
    );
  },
};
