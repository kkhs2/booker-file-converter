import { Toggle } from './Toggle';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Form/Toggle',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A toggle component that allows users to switch between two states (on/off, yes/no, etc).',
      },
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

          return `<Toggle\n  ${props}\n/>`;
        },
      },
    },
  },
  component: Toggle,
  argTypes: {
    labelleft: {
      control: 'text',
      description: 'Label for the left option',
      defaultValue: 'Show only',
    },
    labelright: {
      control: 'text',
      description: 'Label for the right option',
      defaultValue: 'Hide',
    },
    initialstate: {
      control: { type: 'radio' },
      options: ['left', 'right'],
      description: 'Initial selected state',
      defaultValue: 'left',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the toggle',
      defaultValue: false,
    },
    onchange: {
      action: 'changed',
      description:
        'Callback when toggle state changes. Receives new state (left/right).',
    },
    classname: {
      control: 'text',
      description: 'Additional CSS classes for the container',
    },
  },
};

const Template = (args) => <Toggle {...args} onchange={action('onchange')} />;

export const Default = Template.bind({});
Default.args = {
  labelleft: 'Show only',
  labelright: 'Hide',
  initialstate: 'left',
};

export const RightSelected = Template.bind({});
RightSelected.args = {
  labelleft: 'Option A',
  labelright: 'Option B',
  initialstate: 'right',
};

export const CustomLabels = Template.bind({});
CustomLabels.args = {
  labelleft: 'Yes',
  labelright: 'No',
  initialstate: 'right',
};
