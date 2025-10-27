import { useState } from 'preact/hooks';
import InvoiceTable from './InvoiceTable';

export default {
  title: 'Better Credit/Components/Invoice Table',
  component: InvoiceTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
  argTypes: {
    data: { control: 'object' },
    columns: { control: 'object' },
    isscrollable: { control: 'boolean' },
    onrowselect: { action: 'row selected' },
    onsort: { action: 'sorted' },
    onclearsearch: { action: 'search cleared' },
    oninvoiceclick: { action: 'invoice clicked' },
    defaultsort: { control: 'object' },
  },
};

const Template = (args) => <InvoiceTable {...args} />;

// Mock invoice data
const mockInvoiceData = [
  {
    id: 'INV-001',
    invoiceNo: 'INV-2024-001',
    date: '2024-01-15',
    dueDate: '2024-02-15',
    customer: 'Acme Corp',
    gross: 1250.0,
    vat: 250.0,
    net: 1000.0,
    balance: 1250.0,
    status: 'Outstanding',
    dueIn: '30 days',
  },
  {
    id: 'INV-002',
    invoiceNo: 'INV-2024-002',
    date: '2024-01-20',
    dueDate: '2024-02-20',
    customer: 'Tech Solutions Ltd',
    gross: 875.5,
    vat: 175.1,
    net: 700.4,
    balance: 875.5,
    status: 'Outstanding',
    dueIn: '25 days',
  },
  {
    id: 'INV-003',
    invoiceNo: 'INV-2024-003',
    date: '2024-01-10',
    dueDate: '2024-02-10',
    customer: 'Global Industries',
    gross: 2100.0,
    vat: 420.0,
    net: 1680.0,
    balance: 0.0,
    status: 'Paid',
    dueIn: 'Paid',
  },
  {
    id: 'INV-004',
    invoiceNo: 'INV-2024-004',
    date: '2024-01-05',
    dueDate: '2024-02-05',
    customer: 'Small Business Co',
    gross: 450.75,
    vat: 90.15,
    net: 360.6,
    balance: 450.75,
    status: 'Overdue',
    dueIn: 'Overdue',
  },
  {
    id: 'INV-005',
    invoiceNo: 'INV-2024-005',
    date: '2024-01-25',
    dueDate: '2024-02-25',
    customer: 'Retail Store Chain',
    gross: 3200.0,
    vat: 640.0,
    net: 2560.0,
    balance: 3200.0,
    status: 'Outstanding',
    dueIn: '20 days',
  },
  {
    id: 'INV-006',
    invoiceNo: 'INV-2024-006',
    date: '2024-01-12',
    dueDate: '2024-02-12',
    customer: 'Manufacturing Inc',
    gross: 1800.25,
    vat: 360.05,
    net: 1440.2,
    balance: 0.0,
    status: 'Paid',
    dueIn: 'Paid',
  },
];

// Column definitions
const defaultColumns = [
  {
    field: 'invoiceNo',
    label: 'Invoice Number',
    maxChars: 15,
  },
  {
    field: 'date',
    label: 'Date',
    maxChars: 12,
  },
  {
    field: 'customer',
    label: 'Customer',
    maxChars: 20,
  },
  {
    field: 'gross',
    label: 'Gross',
    maxChars: 12,
  },
  {
    field: 'balance',
    label: 'Balance',
    maxChars: 12,
  },
  {
    field: 'status',
    label: 'Status',
    component: 'Chip',
    maxChars: 12,
  },
  {
    field: 'dueIn',
    label: 'Due In',
    maxChars: 10,
  },
];

// Interactive story with state management
const InteractiveTemplate = (args) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortInfo, setSortInfo] = useState(null);

  const handleRowSelect = (rows) => {
    setSelectedRows(rows);
    args.onrowselect?.(rows);
  };

  const handleSort = (field, order) => {
    setSortInfo({ field, order });
    args.onsort?.(field, order);
  };

  const handleInvoiceClick = (row, invoiceNumber) => {
    console.log('Invoice clicked:', { row, invoiceNumber });
    args.oninvoiceclick?.(row, invoiceNumber);
  };

  return (
    <div className="tw:p-6">
      <div className="tw-mb-4">
        <h3 className="tw-text-lg tw-font-semibold tw-mb-2">Invoice Table</h3>
        {selectedRows.length > 0 && (
          <p className="tw-text-sm tw-text-gray-600">
            Selected: {selectedRows.length} invoice(s)
          </p>
        )}
        {sortInfo && (
          <p className="tw-text-sm tw-text-gray-600">
            Sorted by: {sortInfo.field} ({sortInfo.order})
          </p>
        )}
      </div>
      <InvoiceTable
        {...args}
        onrowselect={handleRowSelect}
        onsort={handleSort}
        oninvoiceclick={handleInvoiceClick}
      />
    </div>
  );
};

// Basic usage
export const Default = Template.bind({});
Default.args = {
  data: mockInvoiceData,
  columns: defaultColumns,
  isscrollable: true,
};

// With default sort
export const WithDefaultSort = Template.bind({});
WithDefaultSort.args = {
  data: mockInvoiceData,
  columns: defaultColumns,
  defaultsort: { field: 'date', order: 'desc' },
  isscrollable: true,
};

// Interactive example
export const Interactive = InteractiveTemplate.bind({});
Interactive.args = {
  data: mockInvoiceData,
  columns: defaultColumns,
  isscrollable: true,
};

// Empty state
export const EmptyState = Template.bind({});
EmptyState.args = {
  data: [],
  columns: defaultColumns,
  isscrollable: true,
};

// Large dataset
export const LargeDataset = Template.bind({});
LargeDataset.args = {
  data: [
    ...mockInvoiceData,
    {
      id: 'INV-007',
      invoiceNo: 'INV-2024-007',
      date: '2024-01-30',
      dueDate: '2024-02-30',
      customer: 'Enterprise Solutions',
      gross: 5000.0,
      vat: 1000.0,
      net: 4000.0,
      balance: 5000.0,
      status: 'Outstanding',
      dueIn: '15 days',
    },
    {
      id: 'INV-008',
      invoiceNo: 'INV-2024-008',
      date: '2024-01-28',
      dueDate: '2024-02-28',
      customer: 'Startup Ventures',
      gross: 750.0,
      vat: 150.0,
      net: 600.0,
      balance: 0.0,
      status: 'Paid',
      dueIn: 'Paid',
    },
    {
      id: 'INV-009',
      invoiceNo: 'INV-2024-009',
      date: '2024-01-22',
      dueDate: '2024-02-22',
      customer: 'Consulting Partners',
      gross: 1500.75,
      vat: 300.15,
      net: 1200.6,
      balance: 1500.75,
      status: 'Outstanding',
      dueIn: '18 days',
    },
    {
      id: 'INV-010',
      invoiceNo: 'INV-2024-010',
      date: '2024-01-18',
      dueDate: '2024-02-18',
      customer: 'Digital Agency',
      gross: 2200.5,
      vat: 440.1,
      net: 1760.4,
      balance: 2200.5,
      status: 'Outstanding',
      dueIn: '22 days',
    },
  ],
  columns: defaultColumns,
  defaultsort: { field: 'gross', order: 'desc' },
  isscrollable: true,
};

// With locked rows
export const WithLockedRows = Template.bind({});
WithLockedRows.args = {
  data: mockInvoiceData.map((row, index) => ({
    ...row,
    isLocked: index === 1, // Lock the second row
  })),
  columns: defaultColumns,
  isscrollable: true,
};

// Custom columns
export const CustomColumns = Template.bind({});
CustomColumns.args = {
  data: mockInvoiceData,
  columns: [
    {
      field: 'invoiceNo',
      label: 'Invoice #',
      maxChars: 12,
    },
    {
      field: 'customer',
      label: 'Client Name',
      maxChars: 25,
    },
    {
      field: 'gross',
      label: 'Total Amount',
      maxChars: 15,
    },
    {
      field: 'status',
      label: 'Payment Status',
      component: 'Chip',
      maxChars: 15,
    },
  ],
  defaultsort: { field: 'customer', order: 'asc' },
  isscrollable: true,
};

// Columns with empty data (demonstrates auto-hiding)
export const ColumnsWithEmptyData = Template.bind({});
ColumnsWithEmptyData.args = {
  data: [
    {
      id: 'INV-001',
      invoiceNo: 'INV-2024-001',
      date: '2024-01-15',
      customer: 'Acme Corp',
      gross: 1250.0,
      balance: 1250.0,
      status: 'Outstanding',
      dueIn: '30 days',
      // Note: vat field is missing - column will be hidden
    },
    {
      id: 'INV-002',
      invoiceNo: 'INV-2024-002',
      date: '2024-01-20',
      customer: 'Tech Solutions Ltd',
      gross: 875.5,
      balance: 875.5,
      status: 'Outstanding',
      dueIn: '25 days',
      // Note: vat field is missing - column will be hidden
    },
    {
      id: 'INV-003',
      invoiceNo: 'INV-2024-003',
      date: '2024-01-10',
      customer: 'Global Industries',
      gross: 2100.0,
      balance: 0.0,
      status: 'Paid',
      dueIn: 'Paid',
      // Note: vat field is missing - column will be hidden
    },
  ],
  columns: [
    {
      field: 'invoiceNo',
      label: 'Invoice Number',
      maxChars: 15,
    },
    {
      field: 'date',
      label: 'Date',
      maxChars: 12,
    },
    {
      field: 'customer',
      label: 'Customer',
      maxChars: 20,
    },
    {
      field: 'gross',
      label: 'Gross',
      maxChars: 12,
    },
    {
      field: 'vat',
      label: 'VAT',
      maxChars: 12,
    },
    {
      field: 'balance',
      label: 'Balance',
      maxChars: 12,
    },
    {
      field: 'status',
      label: 'Status',
      component: 'Chip',
      maxChars: 12,
    },
    {
      field: 'dueIn',
      label: 'Due In',
      maxChars: 10,
    },
  ],
  isscrollable: true,
};
