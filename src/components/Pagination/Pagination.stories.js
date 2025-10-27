/**
 * Storybook configuration for the Pagination component
 * This defines how the Pagination component will appear in Storybook and what controls/options are available.
 */

import Pagination from './Pagination';
import { useState, useEffect } from 'preact/hooks';

// Define the story configuration
export default {
  // The title under which the Pagination component will appear in Storybook's navigation
  title: 'UI Controls/Pagination',

  // The component to be displayed in Storybook
  component: Pagination,

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  parameters: {
    backgrounds: {
      default: 'gray',
      values: [
        {
          name: 'gray',
          value: '#FAF9F5',
        },
      ],
    },
    docs: {
      story: {
        height: '300px',
      },
      source: {
        transform: (source, storyContext) => {
          // Get the story args
          const { args } = storyContext;
          if (!args) return source;

          if (source.includes('initialArgs={config}')) return ' ';

          // Extract initialArgs from the source if present
          const match = source.match(/initialArgs=\{(\{[\s\S]*?\})\}/);
          const argsToUse = match ? eval(`(${match[1]})`) : args;

          try {
            // Convert args to props string, preserving arrays and adding default theme
            const props = Object.entries({
              ...argsToUse,
              currentpage: argsToUse.currentpage || 1,
              theme: argsToUse.theme || 'light',
            })
              .map(([key, value]) => {
                if (Array.isArray(value)) {
                  return `      ${key}={[${value.join(', ')}]}`;
                }
                return `      ${key}=${typeof value === 'string' ? `"${value}"` : `{${value}}`}`;
              })
              .join('\n');

            // Return the formatted component
            return `<Pagination\n${props}\n    />`;
          } catch (e) {
            return source;
          }
        },
      },
      description: {
        component: `
This component implements a pagination control as defined in the design system.

### Design Figma References
- [Pagination UI Library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=3923-162666&t=VBLCXGpwzp0C81d7-4)
        `,
      },
    },
  },

  // Define controls (props) for the Pagination component
  argTypes: {
    // Current page
    currentpage: {
      control: 'number',
      description: 'Current active page number',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 1 },
      },
    },

    // Total items
    totalitems: {
      control: 'number',
      description: 'Total number of items to paginate',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },

    // Items per page
    itemsperpage: {
      control: 'number',
      description: 'Number of items to display per page',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 25 },
      },
    },

    // Theme
    theme: {
      control: 'select',
      description: 'Theme of the pagination control',
      options: ['light', 'dark'],
      defaultValue: { summary: 'light' },
    },

    // Callback function when page changes
    onpagechange: {
      action: 'onpagechange',
      description: 'Callback function when page changes',
    },
  },
};

/**
 * Template for rendering the Pagination component with state management.
 */
const Template = (args) => {
  const [currentPage, setCurrentPage] = useState(args.currentpage || 1);
  const [itemsPerPage, setItemsPerPage] = useState(args.itemsperpage);

  useEffect(() => {
    setCurrentPage(args.currentpage || 1);
    setItemsPerPage(args.itemsperpage);
  }, [args.currentpage, args.itemsperpage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    args.onpagechange?.(newPage);
  };

  return (
    <Pagination
      {...args}
      currentpage={currentPage}
      itemsperpage={itemsPerPage}
      onpagechange={handlePageChange}
    />
  );
};

// Bind the template to create the stories
export const Default = Template.bind({});
Default.args = {
  itemsperpage: 25,
  totalitems: 126,
};

/**
 * First page story.
 * Demonstrates pagination on the first page.
 */
export const FirstPage = Template.bind({});
FirstPage.args = {
  currentpage: 1,
  totalitems: 100,
  itemsperpage: 10,
};

/**
 * Middle page story.
 * Demonstrates pagination on a middle page.
 */
export const MiddlePage = Template.bind({});
MiddlePage.args = {
  currentpage: 5,
  totalitems: 100,
  itemsperpage: 10,
};

/**
 * Last page story.
 * Demonstrates pagination on the last page.
 */
export const LastPage = Template.bind({});
LastPage.args = {
  currentpage: 10,
  totalitems: 100,
  itemsperpage: 10,
};

/**
 * Dark theme story.
 * Demonstrates pagination with a dark theme.
 */
export const DarkTheme = Template.bind({});
DarkTheme.args = {
  currentpage: 1,
  totalitems: 100,
  itemsperpage: 10,
  theme: 'dark',
};
DarkTheme.parameters = {
  backgrounds: {
    default: 'white',
    values: [{ name: 'white', value: '#FFFFFF' }],
  },
};

/**
 * Few pages story.
 * Demonstrates pagination with a small number of pages.
 */
export const FewPages = Template.bind({});
FewPages.args = {
  currentpage: 2,
  totalitems: 30,
  itemsperpage: 10,
};

/**
 * Many pages story.
 * Demonstrates pagination with a large number of pages.
 */
export const ManyPages = Template.bind({});
ManyPages.args = {
  currentpage: 50,
  totalitems: 1000,
  itemsperpage: 10,
};

/**
 * All pagination variations story with state management
 */
export const AllPaginations = () => {
  const configs = [
    { itemsperpage: 25, totalitems: 126 },
    { currentpage: 5, totalitems: 100, itemsperpage: 10 },
    { currentpage: 1, totalitems: 100, itemsperpage: 10 },
    { currentpage: 1, totalitems: 100, itemsperpage: 10, theme: 'dark' },
    { currentpage: 10, totalitems: 100, itemsperpage: 10 },
    { currentpage: 2, totalitems: 30, itemsperpage: 10 },
    { currentpage: 50, totalitems: 1000, itemsperpage: 10 },
  ];

  return (
    <div className="tw:space-y-8">
      {configs.map((config, idx) => (
        <div key={idx}>
          <Template {...config} />
        </div>
      ))}
    </div>
  );
};
