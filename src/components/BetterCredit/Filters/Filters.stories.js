/**
 * Storybook configuration for the Filters component
 * This defines how the Filters component will appear in Storybook and what controls/options are available.
 */

// Imports
import Filters from './Filters';

// Define the story configuration
export default {
  // The title under which the Filters component will appear in Storybook's navigation
  title: 'Components/Filters',

  // The component to be displayed in the story
  component: Filters,

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
              return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<Filters\n  ${props}\n/>`;
        },
      },
      story: {
        height: '250px',
      },
      description: {
        component: `
This component implements a filter component as defined in the design system.

### Design Figma References
- [Filters UI Library - Desktop](https://www.figma.com/design/I5lXtB7kdx9KPk1SP1aAV5/Booker-Better-Credit-(Copy)?node-id=4381-2475&t=Fcr3QHRt6xRW0zEa-4)
- [Filters UI Library - Mobile](https://www.figma.com/design/I5lXtB7kdx9KPk1SP1aAV5/Booker-Better-Credit-(Copy)?node-id=5336-30527&t=Fcr3QHRt6xRW0zEa-4)
        `,
      },
    },
  },

  // Define controls (props) for the Filters component
  argTypes: {
    // Array of filter objects
    filters: {
      control: 'object',
      description:
        'Array of filter objects containing key, label, items, and optional type properties',
      table: {
        type: {
          summary: 'array',
          detail: `[{
            key: string,
            label: string,
            items: string[],
            type?: "default" | "date"
          }]`,
        },
      },
    },

    // Object to control filter state
    activeFilters: {
      control: 'object',
      description: 'Object to control filter state',
      table: {
        type: { summary: 'object' },
      },
    },

    // Desktop search placeholder
    searchplaceholder: {
      control: 'text',
      description: 'Desktop search placeholder',
      table: {
        defaultValue: { summary: 'Search by number' },
      },
    },

    // Mobile search placeholder
    searchmobileplaceholder: {
      control: 'text',
      description: 'Mobile search placeholder',
      table: {
        defaultValue: { summary: 'Search' },
      },
    },

    // Current account year
    currentaccountyear: {
      control: 'text',
      description: 'Current account year',
      table: {
        type: { summary: 'string' },
      },
    },

    // Previous account year
    prevaccountyear: {
      control: 'text',
      description: 'Previous account year',
      table: {
        type: { summary: 'string' },
      },
    },

    // Current search value
    searchValue: {
      control: 'text',
      description: 'Current search value',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Array of search suggestions
    searchsuggestions: {
      control: 'object',
      description: 'Array of search suggestions',
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: '[]' },
      },
    },

    // Callback function when clear search button is clicked
    onclearsearch: {
      action: 'onclearsearch',
      description: 'Callback function when clear search button is clicked',
    },

    // Callback function when filter value changes
    onfilterchange: {
      action: 'onfilterchange',
      description: 'Callback function when filter value changes',
    },

    // Callback function when clear filters button is clicked
    onfilterclear: {
      action: 'onfilterclear',
      description: 'Callback function when clear filters button is clicked',
    },

    // Callback function when search value changes
    onsearch: {
      action: 'onsearch',
      description: 'Callback function when search value changes',
    },
  },
};

/**
 * Default filters story.
 * Demonstrates a standard set of filters with search functionality.
 */
export const Default = {
  args: {
    filters: [
      {
        key: 'status',
        label: 'Status',
        items: ['Active', 'Pending', 'Completed'],
      },
      {
        key: 'type',
        label: 'Type',
        items: ['Standard', 'Express', 'Premium'],
      },
    ],
    activeFilters: {},
    searchplaceholder: 'Search items',
    searchmobileplaceholder: 'Search',
  },
  render: (args) => {
    const filteredActiveFilters = Object.fromEntries(
      Object.entries(args.activeFilters).filter(
        ([key]) => key !== 'currentPage' && key !== 'itemsPerPage',
      ),
    );
    return <Filters {...args} activefilters={filteredActiveFilters} />;
  },
};

/**
 * Filters with date range story.
 * Demonstrates filters including a date range selector.
 */
export const WithDateRange = {
  args: {
    filters: [
      {
        key: 'status',
        label: 'Status',
        items: ['Active', 'Pending', 'Completed'],
      },
      {
        key: 'dateRange',
        label: 'Date Range',
        type: 'date',
      },
    ],
    activeFilters: {},
    prevaccountyear: 'Account year 2023 - 2024',
    currentaccountyear: 'Account year 2024 - 2025',
    searchplaceholder: 'Search by reference',
    searchmobileplaceholder: 'Search',
  },
  render: (args) => {
    const filteredActiveFilters = Object.fromEntries(
      Object.entries(args.activeFilters).filter(
        ([key]) => key !== 'currentPage' && key !== 'itemsPerPage',
      ),
    );
    return <Filters {...args} activeFilters={filteredActiveFilters} />;
  },
};

/**
 * Multiple filters story.
 * Demonstrates a complex set of filters with various options.
 */
export const MultipleFilters = {
  args: {
    filters: [
      {
        key: 'status',
        label: 'Status',
        items: ['Active', 'Pending', 'Completed', 'Cancelled', 'On Hold'],
      },
      {
        key: 'priority',
        label: 'Priority',
        items: ['High', 'Medium', 'Low'],
      },
      {
        key: 'category',
        label: 'Category',
        items: ['Electronics', 'Clothing', 'Food', 'Books'],
      },
      {
        key: 'dateRange',
        label: 'Date Range',
        type: 'date',
      },
    ],
    prevaccountyear: 'Account year 2023 - 2024',
    currentaccountyear: 'Account year 2024 - 2025',
    searchplaceholder: 'Search by any field',
    searchmobileplaceholder: 'Search',
  },
  parameters: {
    docs: {
      story: {
        height: '600px',
      },
    },
  },
};
