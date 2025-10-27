/**
 * Storybook configuration for the Breadcrumb component
 * This defines how the Breadcrumbs component will appear in Storybook and what controls/options are available.
 */

// Imports
import Breadcrumbs from './Breadcrumbs';
import Icons from '../Icons/Icons';

export default {
  // The title under which the Breadcrumb component will appear in Storybook's navigation
  title: 'Components/Breadcrumbs',

  // The component to be displayed in Storybook
  component: Breadcrumbs,

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
              if (typeof value === 'boolean') return `${key}={${value}}`;
              if (typeof value === 'string') return `${key}="${value}"`;
              return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<Breadcrumbs\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
This component implements a breadcrumb navigation trail with truncation logic.

### Design Figma References
- [Breadcrumb UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=2750-28877&t=IOFf7eawVKJLfxO4-4)
        `,
      },
    },
  },
  argTypes: {
    // Items array
    items: {
      control: 'object',
      description: 'Array of breadcrumb items with label and optional href',
      table: {
        defaultValue: {
          summary: [],
        },
      },
    },

    // Separator
    separator: {
      control: 'text',
      description: 'Custom separator between items',
      table: {
        defaultValue: {
          summary: '/',
        },
      },
    },

    // Truncate the breadcrumb on desktop
    maxitemsdesktop: {
      control: 'number',
      description:
        'Maximum number of items to display before truncating on desktop',
      table: {
        defaultValue: {
          summary: 4,
        },
      },
    },

    // Truncate the breadcrumb on mobile
    maxitemsmobile: {
      control: 'number',
      description:
        'Maximum number of items to display before truncating on mobile',
      table: {
        defaultValue: {
          summary: 3,
        },
      },
    },

    // Leading Icon
    leadingicon: {
      description:
        'Icon element or function to display at the start of the breadcrumb trail',
      table: {
        defaultValue: {
          summary: 'undefined',
        },
      },
    },

    // Leading Icon Href
    leadingiconhref: {
      description: 'URL for the leading icon',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
  },
};

/**
 * Template for rendering the Breadcrumb component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => <Breadcrumbs {...args} />;

/**
 * Default breadcrumb story.
 * Demonstrates a standard breadcrumb with multiple levels.
 */
export const Default = Template.bind({});
Default.args = {
  items: [
    { label: 'Products', href: 'javascript:void(0)' },
    { label: 'Spirits & Liqueur', href: 'javascript:void(0)' },
    { label: 'Vodka' },
  ],
};

/**
 * Single item breadcrumb story.
 * Demonstrates a breadcrumb with a single item.
 */
export const SingleItem = Template.bind({});
SingleItem.args = {
  items: [{ label: 'Departments' }],
};

/**
 * Truncated breadcrumb story.
 * Demonstrates a breadcrumb with multiple items that are truncated.
 */
export const Truncated = Template.bind({});
Truncated.args = {
  items: [
    { label: 'Departments', href: 'javascript:void(0)' },
    { label: 'Products', href: 'javascript:void(0)' },
    { label: 'Spirits & Liqueur', href: 'javascript:void(0)' },
    { label: 'Vodka', href: 'javascript:void(0)' },
    { label: 'Smirnoff' },
  ],
  maxitems: 4,
};

/**
 * Custom separator story.
 * Demonstrates a breadcrumb with a user-defined separator ("|").
 */
export const CustomSeparator = Template.bind({});
CustomSeparator.args = {
  // prettier-ignore
  items: [
    { label: 'Departments', href: 'javascript:void(0)' },
    { label: 'Products', href: 'javascript:void(0)' },
    { label: 'Spirits & Liqueur', href: 'javascript:void(0)' },
    { label: 'Vodka' },
	],
  separator: '|',
};

/**
 * Breadcrumb with leading icon story.
 * Demonstrates a breadcrumb with an icon at the start.
 */
export const WithLeadingIcon = Template.bind({});
WithLeadingIcon.args = {
  items: [
    { label: 'Productsdsadsadsasdadsa', href: 'javascript:void(0)' },
    { label: 'Spirits & Liqueur', href: 'javascript:void(0)' },
    { label: 'Vodka' },
  ],
  leadingicon: () => <Icons.cornerUpLeft />,
  leadingiconhref: 'javascript:void(0)',
};

/**
 * Back only breadcrumb story.
 * Demonstrates a single "Back" link breadcrumb.
 */
export const BackOnly = Template.bind({});
BackOnly.args = {
  items: [{ label: 'Back', href: 'javascript:void(0)' }],
  leadingicon: () => <Icons.cornerUpLeft />,
  leadingiconhref: 'javascript:void(0)',
};

/**
 * All breadcrumbs story.
 * Demonstrates all available breadcrumbs in a single view.
 */
export const AllBreadcrumbs = {
  render: () => {
    const breadcrumbConfigs = [
      Default.args,
      CustomSeparator.args,
      SingleItem.args,
      Truncated.args,
      WithLeadingIcon.args,
      BackOnly.args,
    ];

    return (
      <div className="tw:space-y-8">
        {breadcrumbConfigs.map((config, index) => (
          <Breadcrumbs key={index} {...config} />
        ))}
      </div>
    );
  },
};
