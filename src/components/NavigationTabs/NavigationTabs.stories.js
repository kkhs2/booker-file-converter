/**
 * Storybook configuration for the NavigationTabs component
 * This defines how the NavigationTabs component will appear in Storybook and what controls/options are available.
 */

import NavigationTabs from './NavigationTabs';

// Define the story configuration
export default {
  // The title under which the Button component will appear in Storybook's navigation
  title: 'Better Credit/Components/NavigationTabs',

  component: NavigationTabs,

  // Tags used by Storybook for organisational purposes
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
              if (typeof value === 'boolean') {
                return `${key}={${value}}`;
              }
              if (typeof value === 'string') {
                return `${key}="${value}"`;
              }
              if (key === 'tabs') {
                // Handle tabs array specially to avoid circular references
                return `${key}={${JSON.stringify(
                  value,
                  (key, val) => {
                    if (key === 'content') {
                      // Return the content as a function string
                      return val.toString();
                    }
                    return val;
                  },
                  2,
                )}}`;
              }
              return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join('\n  ');
          return props.length ? `<NavigationTabs\n  ${props}\n/>` : ' ';
        },
      },
      description: {
        component: `
This component implements a tabbed interface as defined in the design system.

### Design Figma References
- [NavigationTabs UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=6012-62807&m=dev)
        `,
      },
    },
    backgrounds: {
      default: 'gray',
      values: [{ name: 'gray', value: '#f2f0f0' }],
    },
  },

  // Define controls (props) for the Button component
  argTypes: {
    // Tabs configuration
    tabs: {
      control: 'object',
      description:
        'Array of tab objects containing label, content, and optional count',
      table: {
        type: { summary: 'array' },
      },
    },

    // Active tab index
    initialactivetab: {
      control: 'number',
      description: 'Index of the currently active tab',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
  },
};

/**
 * Template for rendering the NavigationTabs component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => <NavigationTabs {...args} />;

/**
 * Default tabs story.
 * Demonstrates basic horizontal tabs with content.
 */
export const Default = Template.bind({});
Default.args = {
  tabs: [
    {
      label: 'Outstanding invoices',
      content: () => (
        <div className="tw:p-4">
          <div className="tw:font-bold">Outstanding invoices content</div>
        </div>
      ),
    },
    {
      label: 'Paid invoices',
      content: () => (
        <div className="tw:p-4">
          <div className="tw:font-bold">Paid invoices content</div>
        </div>
      ),
    },
    {
      label: 'Central billing statements',
      content: () => <div className="tw:p-4">Central billing content</div>,
    },
  ],
  initialactivetab: 0,
};

/**
 * Custom styled tabs story.
 * Demonstrates tabs with custom styling.
 */
export const CustomStyled = Template.bind({});
CustomStyled.args = {
  tabs: [
    {
      label: 'Tab 1',
      content: () => <div className="tw:p-4">Custom styled tab 1</div>,
    },
    {
      label: 'Tab 2',
      content: () => <div className="tw:p-4">Custom styled tab 2</div>,
    },
  ],
  initialactivetab: 0,
  className: 'tw:bg-primary-400 tw:p-4 tw:rounded-xl',
};

/**
 * Second tab active story.
 * Demonstrates tabs with second tab selected by default.
 */
export const SecondTabActive = Template.bind({});
SecondTabActive.args = {
  tabs: [
    {
      label: 'First Tab',
      content: () => <div className="tw:p-4">First tab content</div>,
    },
    {
      label: 'Second Tab',
      content: () => <div className="tw:p-4">Second tab content</div>,
    },
    {
      label: 'Third Tab',
      content: () => <div className="tw:p-4">Third tab content</div>,
    },
  ],
  initialactivetab: 1,
};

/**
 * All tabs variations story.
 * Demonstrates different tab configurations in a single view.
 */
export const AllTabs = {
  render: () => {
    const configs = [Default.args, SecondTabActive.args, CustomStyled.args];

    return (
      <div className="tw:space-y-8">
        {configs.map((config, idx) => (
          <NavigationTabs key={idx} {...config} />
        ))}
      </div>
    );
  },
};
