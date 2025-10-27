import { useState } from 'preact/hooks';
import TextArea from './TextArea';

export default {
  title: 'Form/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
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

          return `<TextArea\n  ${props}\n/>`;
        },
      },
      description: {
        component:
          'A reusable TextArea component with optional character counter, validation, and various styling options.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'The current value of the textarea',
    },
    onchange: {
      action: 'changed',
      description: 'Callback fired when the textarea value changes',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the textarea',
    },
    label: {
      control: 'text',
      description: 'Label text for the textarea',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    rows: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Number of visible text lines',
    },
    maxlength: {
      control: { type: 'number', min: 1, max: 1000 },
      description: 'Maximum number of characters allowed',
    },
    showcharactercount: {
      control: 'boolean',
      description: 'Whether to show character counter',
    },
  },
};

// Template for interactive stories
const Template = (args) => {
  const [value, setValue] = useState(args.value || '');

  const handleChange = (e) => {
    setValue(e.target.value);
    if (args.onchange) {
      args.onchange(e);
    }
  };

  return (
    <div className="tw:max-w-md">
      <TextArea {...args} value={value} onchange={handleChange} />
    </div>
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter your text here...',
  rows: 4,
};

// With Label
export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Feedback',
  placeholder: 'Type your message...',
  rows: 4,
};

// With Character Counter
export const WithCharacterCounter = Template.bind({});
WithCharacterCounter.args = {
  label: 'Feedback',
  placeholder: 'Share your feedback...',
  rows: 6,
  maxlength: 200,
  showcharactercount: true,
};

// With Error State
export const WithError = Template.bind({});
WithError.args = {
  label: 'Description',
  placeholder: 'Enter description...',
  error: 'This field is required',
  rows: 4,
};

// Disabled State
export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Comments',
  value: 'This textarea is disabled',
  placeholder: 'Enter comments...',
  disabled: true,
  rows: 4,
};

// Large Text Area
export const Large = Template.bind({});
Large.args = {
  label: 'Long Form Content',
  placeholder: 'Write your long form content here...',
  rows: 10,
  maxlength: 1000,
  showcharactercount: true,
};
