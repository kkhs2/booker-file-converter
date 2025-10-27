import React from 'react';
import InstructionsCard from './InstructionsCard';

export default {
  title: 'Components/Instructions Card',
  component: InstructionsCard,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#FAF9F5',
        },
      ],
    },
    docs: {
      description: {
        component: `
The InstructionsCard component is designed to display a set of instructions with an optional note feature. It includes a checkbox to indicate whether the instruction has been completed and allows users to add a note if the instruction is checked.
### Props
- **name**: A unique identifier for the instruction card.
- **title**: The title of the instruction.
- **details**: Additional details about the instruction.
- **hasnote**: A boolean indicating whether the instruction has an optional note.
- **initialchecked**: A boolean indicating whether the checkbox should be initially checked.
- **initialnote**: The initial value of the note.
- **onupdatenote**: A callback function that is triggered when the note is updated.

`,
      },
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const props = Object.entries(args)
            .map(([key, value]) => `${key}={${JSON.stringify(value)}}`)
            .join('\n  ');

          return `<InstructionsCard
  ${props}
/>`;
        },
      },
    },
  },
  argTypes: {
    onupdatenote: { action: 'note updated' },
    name: {
      control: {
        type: 'text',
      },
    },
    title: {
      control: {
        type: 'text',
      },
    },
    details: {
      control: {
        type: 'text',
      },
    },

    hasnote: {
      control: {
        type: 'boolean',
      },
    },
    initialchecked: {
      control: {
        type: 'boolean',
      },
    },
    initialnote: {
      control: {
        type: 'text',
      },
    },
    onupdatenote: {
      action: 'note updated',
    },
  },
};

const Template = (args) => (
  <div className="tw:max-w-5xl">
    <InstructionsCard {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  name: 'default-instruction',
  title: 'Default Instruction Title',
  details: 'Some details about this instruction.',
  hasnote: false,
};

export const WithNote = Template.bind({});
WithNote.args = {
  name: 'instruction-with-note',
  title: 'Instruction With Optional Note',
  details: 'Check the box to add a note.',
  hasnote: true,
  initialchecked: false,
  initialnote: '',
};

export const WithNoteInitiallyChecked = Template.bind({});
WithNoteInitiallyChecked.args = {
  name: 'instruction-checked-note',
  title: 'Instruction With Note (Initially Checked)',
  details: 'This instruction starts checked, and you can edit the note.',
  hasnote: true,
  initialchecked: true,
  initialnote: 'This is an initial note.',
};
