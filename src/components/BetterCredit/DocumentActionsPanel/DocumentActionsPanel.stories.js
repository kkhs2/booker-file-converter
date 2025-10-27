/**
 * Storybook configuration for the Action Panel component
 * This defines how the Action Panel component will appear in Storybook and what controls/options are available.
 */

// Imports
import DocumentActionsPanel from './DocumentActionsPanel';

// Define the story configuration
export default {
  // The title under which the Document Actions Panel component will appear in Storybook's navigation
  title: 'Better Credit/Components/Document Actions Panel',

  // The component to be displayed in the story
  component: DocumentActionsPanel,

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the Document Actions Panel component
  argTypes: {
    // Selected items count
    selectedcount: {
      control: 'number',
      description: 'Number of selected invoices',
      defaultValue: 0,
    },

    // Total amount
    total: {
      control: 'number',
      description: 'Total amount for selected invoices',
      defaultValue: 0,
    },

    // Currency symbol
    currency: {
      control: 'text',
      description: 'Currency symbol for the total amount',
      defaultValue: '£',
    },

    // Add ispayable control
    ispayable: {
      control: 'boolean',
      description: 'Whether the invoices can be paid',
      defaultValue: false,
    },

    // Selected rows
    selectedrows: {
      control: 'object',
      description: 'Array of selected row objects',
      defaultValue: [],
    },

    // Document type
    documenttype: {
      control: 'text',
      description:
        "Type of document being displayed (e.g., 'OutstandingInvoice', 'PaidInvoice', 'CentralBillingStatement')",
      defaultValue: 'invoice',
    },

    // Download callback
    ondownload: {
      action: 'ondownload',
      description:
        'Callback when download button is clicked (type, selectedRows, documentType, completeCallback)',
    },
  },

  parameters: {
    layout: 'fullscreen',
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

          return `<DocumentActionsPanel\n  ${props}\n/>`;
        },
      },
      story: {
        height: '250px',
      },
      description: {
        component: `
This component implements a document actions panel as defined in the design system.

### Design Figma References
- [Document Actions Panel UI Library - Desktop](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=6094-75845&m=dev)
- [Document Actions Panel UI Library - Mobile](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=6094-75870&m=dev)
        `,
      },
    },
    backgrounds: {
      default: 'gray',
      values: [{ name: 'gray', value: '#f2f0f0' }],
    },
  },
};

/**
 * Template for rendering the Document Actions Panel component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => <DocumentActionsPanel {...args} />;

/**
 * Default document actions panel story.
 * Demonstrates the panel with a single selected invoice.
 */
export const Default = Template.bind({});
Default.args = {
  selectedcount: 1,
  total: 150.0,
  currency: '£',
  ispayable: true,
};

/**
 * Multiple selections story.
 * Demonstrates the panel with multiple selected invoices.
 */
export const MultipleSelections = Template.bind({});
MultipleSelections.args = {
  selectedcount: 3,
  total: 1250.5,
  currency: '£',
};

/**
 * No selections story.
 * Demonstrates the panel with no selected invoices.
 */
export const NoSelections = Template.bind({});
NoSelections.args = {
  selectedcount: 0,
  total: 0,
  currency: '£',
};

/**
 * Custom currency story.
 * Demonstrates the panel with a different currency symbol.
 */
export const CustomCurrency = Template.bind({});
CustomCurrency.args = {
  selectedcount: 2,
  total: 299.99,
  currency: '$',
};

/**
 * Non-payable story.
 * Demonstrates the panel when invoices cannot be paid.
 */
export const NonPayable = Template.bind({});
NonPayable.args = {
  selectedcount: 2,
  total: 299.99,
  currency: '£',
  ispayable: false,
};

/**
 * Custom styled story.
 * Demonstrates the panel with additional custom styling.
 */
export const CustomStyled = Template.bind({});
CustomStyled.args = {
  selectedcount: 1,
  total: 150.0,
  currency: '£',
  classname: 'tw:shadow-xl tw:border-2 tw:border-primary tw:bg-primary-100',
};

/**
 * Document type story.
 * Demonstrates the panel with a specific document type.
 */
export const DocumentType = Template.bind({});
DocumentType.args = {
  selectedcount: 2,
  total: 299.99,
  currency: '£',
  documenttype: 'CentralBillingStatement',
};
