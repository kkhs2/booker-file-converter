/**
 * Storybook configuration for the GroupToggle component
 * This defines how the GroupToggle component will appear in Storybook and what controls/options are available.
 */

// Import the GroupToggle component
import { action } from '@storybook/addon-actions';
import GroupToggle from './GroupToggle';

// Define the story configuration
export default {
  title: 'Components/GroupToggle',
  component: GroupToggle,
  tags: ['autodocs'],
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
              // Handle special cases
              if (typeof value === 'boolean') {
                return value ? key : null;
              }
              if (typeof value === 'string') {
                return `${key}="${value}"`;
              }
              if (typeof value === 'function') {
                return `${key}={${value.name || 'function'}}`;
              }
              return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<GroupToggle\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
The GroupToggle component provides a toggle interface for switching between grouped and ungrouped views.
It is commonly used for organizing products by shelf location or displaying them in a flat list.

### Usage
The component exposes ongroupchange and onstatechange callbacks for handling state changes.
Use ongroupchange for new implementations and onstatechange for backward compatibility.

### Integration Events
- ongroupchange: Called when the toggle state changes (recommended)
- onstatechange: Legacy callback function (deprecated but supported)
        `,
      },
    },
  },

  // Define controls (props) for the GroupToggle component
  argTypes: {
    leftlabel: {
      control: 'text',
      description: 'Label for the left (grouped) option',
      table: {
        defaultValue: {
          summary: 'Group by shelf',
        },
      },
    },

    rightlabel: {
      control: 'text',
      description: 'Label for the right (ungrouped) option',
      table: {
        defaultValue: {
          summary: 'Ungrouped',
        },
      },
    },

    initialstate: {
      control: {
        type: 'select',
        options: ['grouped', 'ungrouped'],
      },
      description: 'Initial state of the toggle',
      table: {
        defaultValue: {
          summary: 'grouped',
        },
      },
    },

    ongroupchange: {
      action: 'group state changed',
      description:
        'Callback function when the toggle state changes (recommended)',
      table: {
        category: 'Events',
      },
    },

    onstatechange: {
      action: 'legacy state changed',
      description: 'Legacy callback function (use ongroupchange instead)',
      table: {
        category: 'Events',
      },
    },

    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },

    classname: {
      control: 'text',
      description: 'Additional CSS classes for styling',
      table: {
        defaultValue: {
          summary: '""',
        },
      },
    },

    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
      description: 'Size variant of the toggle',
      table: {
        defaultValue: {
          summary: 'md',
        },
      },
    },
  },
};

// Default story
export const Default = {
  args: {
    leftlabel: 'Group by shelf',
    rightlabel: 'Ungrouped',
    initialstate: 'grouped',
    ongroupchange: action('group state changed'),
    onstatechange: action('legacy state changed'),
  },
};

// Story with initial ungrouped state
export const InitiallyUngrouped = {
  args: {
    leftlabel: 'Group by shelf',
    rightlabel: 'Ungrouped',
    initialstate: 'ungrouped',
    ongroupchange: action('group state changed'),
  },
};

// Story with disabled state
export const Disabled = {
  args: {
    leftlabel: 'Group by shelf',
    rightlabel: 'Ungrouped',
    initialstate: 'grouped',
    disabled: true,
    ongroupchange: action('group state changed'),
  },
};
