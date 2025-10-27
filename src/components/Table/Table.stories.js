/**
 * Storybook configuration for the Table component
 * This defines how the Table component will appear in Storybook and what controls/options are available.
 */

import Table from './Table';
import Button from '../Button/Button';
import Tag from '../Tag/Tag';

// Define the story configuration
export default {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A generic, reusable table component that can display data in a structured format with customizable headers and rows.

### Features
- Customizable number of rows
- Flexible header configuration with alignment options
- Support for React components in table cells (Buttons, Tags, etc.)
- Responsive design with horizontal scrolling
- Click handlers for row interactions
- Empty state handling

### Design Figma References
- [Table UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=5085-13281&m=dev)
        `,
      },
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          // Convert args to JSX props string
          const props = Object.entries(args)
            .filter(([key, value]) => {
              // Filter out undefined values and functions
              return value !== undefined && typeof value !== 'function';
            })
            .map(([key, value]) => {
              if (typeof value === 'boolean') {
                return value ? key : null;
              }
              if (typeof value === 'string') {
                return `${key}="${value}"`;
              }
              if (typeof value === 'number') {
                return `${key}={${value}}`;
              }
              if (Array.isArray(value)) {
                return `${key}={${JSON.stringify(value)}}`;
              }
              return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<Table\n  ${props}\n/>`;
        },
      },
    },
  },

  argTypes: {
    // Headers configuration
    headers: {
      control: 'object',
      description:
        'Array of header objects with label, key, and alignment properties',
      table: {
        type: {
          summary:
            'Array<{label: string, key: string, align?: "left"|"center"|"right"}>',
        },
        defaultValue: { summary: '[]' },
      },
    },

    // Data array
    data: {
      control: 'object',
      description:
        'Array of data objects to display in the table rows. Values can be strings or React components.',
      table: {
        type: { summary: 'Array<Object>' },
        defaultValue: { summary: '[]' },
      },
    },

    // Number of rows
    rows: {
      control: { type: 'number', min: 1, max: 50 },
      description: 'Number of rows to display in the table',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '10' },
      },
    },

    // Show header
    showheader: {
      control: 'boolean',
      description: 'Whether to show the table header',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },

    // Empty message
    emptymessage: {
      control: 'text',
      description: 'Message to display when no data is available',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'No data available' },
      },
    },

    // Additional class names
    classname: {
      control: 'text',
      description: 'Additional CSS classes to apply to the table container',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Row click handler
    onrowclick: {
      action: 'row clicked',
      description: 'Callback function called when a row is clicked',
      table: {
        type: { summary: 'Function' },
      },
    },
  },
};

// Template for creating stories
const Template = (args) => <Table {...args} />;

/**
 * Default story - shows the basic table with default styling
 */
export const Default = Template.bind({});
Default.args = {
  headers: [
    { label: 'Table header', key: 'col1', align: 'left' },
    { label: 'Table header', key: 'col2', align: 'left' },
    { label: 'Table header', key: 'col3', align: 'left' },
    { label: 'Table header', key: 'col4', align: 'left' },
    { label: 'Table header', key: 'col5', align: 'left' },
  ],
  data: [
    {
      col1: 'Table cell',
      col2: 'Table cell',
      col3: 'Table cell',
      col4: 'Table cell',
      col5: 'Table cell',
    },
    {
      col1: 'Table cell',
      col2: 'Table cell',
      col3: 'Table cell',
      col4: 'Table cell',
      col5: 'Table cell',
    },
    {
      col1: 'Table cell',
      col2: 'Table cell',
      col3: 'Table cell',
      col4: 'Table cell',
      col5: 'Table cell',
    },
    {
      col1: 'Table cell',
      col2: 'Table cell',
      col3: 'Table cell',
      col4: 'Table cell',
      col5: 'Table cell',
    },
  ],

  rows: 13,
};

/**
 * No Header - shows table without header
 */
export const NoHeader = Template.bind({});
NoHeader.args = {
  ...Default.args,
  showheader: false,
  rows: 6,
};

/**
 * Clickable Rows - shows table with row click functionality
 */
export const ClickableRows = Template.bind({});
ClickableRows.args = {
  ...Default.args,
  onrowclick: (row, index) => {
    alert(`Clicked row ${index + 1} with data: ${JSON.stringify(row)}`);
  },
};

/**
 * With React Components - shows table with Button and Tag components in cells
 */
export const WithReactComponents = Template.bind({});
WithReactComponents.args = {
  headers: [
    { label: 'User', key: 'user', align: 'left' },
    { label: 'Role', key: 'role', align: 'left' },
    { label: 'Status', key: 'status', align: 'center' },
    { label: 'Actions', key: 'actions', align: 'center' },
  ],
  data: [
    {
      user: 'John Doe',
      role: 'Administrator',
      status: <Tag label="Active" variant="primary" />,
      actions: <Button label="Edit" variant="primary" size="small" />,
    },
    {
      user: 'Jane Smith',
      role: 'Editor',
      status: <Tag label="Active" variant="primary" />,
      actions: <Button label="Edit" variant="primary" size="small" />,
    },
    {
      user: 'Bob Johnson',
      role: 'Viewer',
      status: <Tag label="Inactive" variant="muted" />,
      actions: <Button label="Enable" variant="secondary" size="small" />,
    },
    {
      user: 'Alice Brown',
      role: 'Editor',
      status: <Tag label="Pending" variant="tertiary" />,
      actions: <Button label="Approve" variant="primary" size="small" />,
    },
  ],
  rows: 4,
};
