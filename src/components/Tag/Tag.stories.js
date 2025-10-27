/**
 * Storybook configuration for the Tag component
 * This defines how the Tag component will appear in Storybook and what controls/options are available.
 */

import Icons from '../Icons/Icons';
import Tag from './Tag';

export default {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A component that displays a tag with a label and optional icons.

### Design Figma References
- [Tag UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=2212-7767&m=dev)
        `,
      },
    },
    layout: 'fullscreen',
  },

  argTypes: {
    // Variant
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'tertiary',
        'muted',
        'lightPrimary',
        'inverse',
        'club',
        'quaternary',
      ],
      description: 'The visual style of the tag',
      table: {
        defaultValue: {
          summary: 'primary',
        },
      },
      if: { arg: 'variant', truthy: true },
    },
    // Label
    label: {
      control: 'text',
      description: 'The text displayed on the tag',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Tag Label' },
      },
    },
    // Icon Left
    iconleft: {
      control: 'function',
      description: 'Optional icon displayed on the left side of the tag',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: '' },
      },
    },
    // Icon Right
    iconright: {
      control: 'function',
      description: 'Optional icon displayed on the right side of the tag',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: '' },
      },
    },

    // Size
    size: {
      control: { type: 'select' },
      options: ['small', 'default', 'responsive', 'tip'],
      description: 'The size of the tag',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    // Tip
    tip: {
      control: 'boolean',
      description: 'Flag to indicate if the tag is a tip type',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    // Classname
    classname: {
      control: 'text',
      description: 'Additional classes to add to the component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    // Tooltip Label
    tooltiplabel: {
      control: 'text',
      description: 'The text to be displayed in the tooltip',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },
};

export const AllVariations = {
  render: () => (
    <div className="tw:flex tw:flex-col tw:space-y-8 tw:p-6">
      <Tag
        label="Primary"
        date="until 28th Feb"
        variant="primary"
        iconleft={() => <Icons.tag />}
      />
      <Tag label="Secondary" variant="secondary" />
      <Tag label="Tertiary" variant="tertiary" />

      <Tag label="Muted" variant="muted" iconleft={() => <Icons.tag />} />
      <Tag
        label="Light Primary"
        variant="lightPrimary"
        iconleft={() => <Icons.tag />}
      />
      <Tag label="Inverse" variant="inverse" iconleft={() => <Icons.tag />} />
      <Tag label="Club" variant="club" iconleft={() => <Icons.tag />} />
      <Tag
        label="Quaternary"
        variant="quaternary"
        iconleft={() => <Icons.tag />}
      />
      {/* Tooltip Example */}
      <Tag
        iconleft={() => <Icons.tag />}
        variant="secondary"
        tooltiplabel="Vegetarian"
        label="V"
      />
    </div>
  ),
};
