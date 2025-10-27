/**
 * Storybook configuration for the Product Filters component
 * This defines how the Product Filters component will appear in Storybook and what controls/options are available.
 */

// Import the component
import { convertPropsToString } from '../../../utils/storybookHelpers';
import ProductFilters from './ProductFilters';
import { initialFilters } from './utils/initialFilters';

// Define the story configuration
export default {
  // The title under which the Product Filters component will appear in Storybook's navigation
  title: 'Components/Product Filters',

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],
  // Define controls (props) for the component
  argTypes: {
    initialfiltersdata: {
      description:
        'Initial filters data to pass to the provider. This allows overriding the default initial state of the filters.',
      control: {
        type: 'object',
      },
    },
    showsearch: {
      description: 'Whether to show the search bar in the filter bar.',
      control: {
        type: 'boolean',
      },
      defaultValue: true,
    },
    onFilterChange: {
      description: 'Callback function triggered when a filter changes.',
      action: 'onFilterChange', // Logs to Storybook actions tab
    },
    onResetFilters: {
      description: 'Callback function triggered when filters are reset.',
      action: 'onResetFilters', // Logs to Storybook actions tab
    },
    initialgroupstate: {
      description:
        "Initial state for the group toggle ('grouped' | 'ungrouped').",
      control: {
        type: 'select',
        options: ['grouped', 'ungrouped'],
      },
      defaultValue: 'grouped',
    },
    ongroupchange: {
      description:
        'Callback function triggered when the group toggle state changes.',
      action: 'ongroupchange', // Logs to Storybook actions tab
    },
  },

  // Added to override default story height if needed for this component
  parameters: {
    docs: {
      story: {
        height: '500px',
      },
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const props = convertPropsToString(args);

          return `<ProductFilters ${props} />`;
        },
      },
      description: {
        component: `
        
 Product Filters allow users to refine and narrow down product search results.
 
 ### Design Figma References
 - [Product Filters UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=2704-8235&m=dev)
       `,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#FAF9F5',
        },
      ],
    },
  },
};

/**
 * Reusable render method.
 * The args object provides dynamic values for different stories.
 */
const Render = (args) => (
  <div className="tw-container">
    <div className="tw:mx-auto tw:max-w-[1312px]">
      <ProductFilters {...args} />
    </div>
  </div>
);

/**
 * Default story.
 * Demonstrates basic usage with default settings.
 */

export const Default = {
  args: {
    initialfiltersdata: initialFilters,
    showsearch: true,

    onFilterChange: (filterKey) => {
      console.log('Filter Changed:', filterKey);
    },
    onResetFilters: () => {
      console.log('Filters Reset');
    },
  },
  render: Render,
};

/**
 * Story with Custom Initial Filters.
 * Demonstrates how to use the initialfiltersdata prop to set a custom initial state for the filters.
 */
export const WithCustomInitialFilters = {
  args: {
    initialfiltersdata: {
      ...initialFilters,
      previouslyOrdered: { ...initialFilters.previouslyOrdered, value: true },

      brand: {
        ...initialFilters.brand,

        items: initialFilters.brand.items.map((item, idx) =>
          idx === 1 ? { ...item, checked: true } : item,
        ),

        selected: [initialFilters.brand.items[1]?.value].filter(Boolean),
      },
    },
    showsearch: true,

    onFilterChange: (filterKey) => {
      console.log('Custom Filter Changed:', filterKey);
    },
    onResetFilters: () => {
      console.log('Custom Filters Reset');
    },
  },
  render: Render,
};

/**
 * Story wirh randomly generated filters.
 * Demonstrates how to use the initialfiltersdata prop to set a custom initial state for the filters.
 */
export const WithRandomFilters = {
  args: {
    initialfiltersdata: {
      brand: {
        ...initialFilters.brand,
        items: initialFilters.brand.items.map((item, idx) => ({
          ...item,
          checked: Math.random() > 0.5,
        })),
      },
      nonHfss: {
        label: 'Non-HFSS',
        value: false,
        tooltip:
          'New regulation is coming into effect restricting the amount of products with High Fat Salt and Sugar (HFSS) that may be purchased. Selecting this filter will show products that are not affected by the regulation.',
      },
    },
    showsearch: true,

    onFilterChange: (filterKey) => {
      console.log('Random Filter Changed:', filterKey);
    },
    onResetFilters: () => {
      console.log('Random Filters Reset');
    },
  },
  render: Render,
};

/**
 * Story without Search Bar.
 * Demonstrates the component with the search bar hidden.
 */
export const WithoutSearchBar = {
  args: {
    initialfiltersdata: initialFilters,
    showsearch: false,

    onFilterChange: (filterKey) => {
      console.log('Filter Changed (No Search):', filterKey);
    },
    onResetFilters: () => {
      console.log('Filters Reset (No Search)');
    },
  },
  render: Render,
};

/**
 * Story demonstrating multi-select override on mobile.
 * Shows how the nonHfss2 filter bypasses mobile single-select restriction.
 */
export const WithMultiSelectOverride = {
  args: {
    initialfiltersdata: {
      ...initialFilters,
      nonHfss2: {
        ...initialFilters.nonHfss2,
        variant: 'multi', // This overrides the mobile single-select behavior
      },
    },
    showsearch: true,

    onFilterChange: (filterKey) => {
      console.log('Multi-Select Override Filter Changed:', filterKey);
    },
    onResetFilters: () => {
      console.log('Multi-Select Override Filters Reset');
    },
  },
  render: Render,
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates how to override the mobile single-select behavior for specific filters.
The nonHfss2 filter has \`variant: 'multi'\` which allows multi-select even on mobile devices,
bypassing the default mobile single-select restriction.

**Key Features:**
- The nonHfss2 filter supports multi-select on mobile
- Other filters still follow the default mobile behavior (single-select)
- This is useful for filters where users need to select multiple options simultaneously
        `,
      },
    },
  },
};

/**
 * Story demonstrating the GroupToggle integration.
 * Shows how the GroupToggle component is integrated into the ProductFilters component.
 */
export const WithGroupToggle = {
  args: {
    initialfiltersdata: initialFilters,
    showsearch: true,
    initialgroupstate: 'grouped',
    onFilterChange: (filterKey) => {
      console.log('Filter Changed (With Group Toggle):', filterKey);
    },
    onResetFilters: () => {
      console.log('Filters Reset (With Group Toggle)');
    },
    ongroupchange: (newState) => {
      console.log('Group Toggle Changed:', newState);
    },
  },
  render: Render,
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates the integration of the GroupToggle component within the ProductFilters component.

**GroupToggle Integration:**
- The GroupToggle appears next to the "Show all filters" button in desktop view
- It allows users to toggle between "Group by shelf" and "Ungrouped" views
- The toggle state is managed by the parent component through the \`ongroupchange\` callback
- This integration provides a seamless way to control product grouping directly from the filter bar

**Usage Example:**
\`\`\`jsx
const handleGroupChange = (newState) => {
  if (newState === 'grouped') {
    // Group products by shelf location
    setProducts(groupProductsByShelf(products));
  } else {
    // Show products in flat list
    setProducts(ungroupProducts(products));
  }
};

<ProductFilters
  initialgroupstate="grouped"
  ongroupchange={handleGroupChange}
  onFilterChange={handleFilterChange}
/>
\`\`\`

**Available Props:**
- \`initialgroupstate\`: Set the initial toggle state ('grouped' | 'ungrouped')
- \`ongroupchange\`: Callback fired when the toggle state changes
        `,
      },
    },
  },
};
