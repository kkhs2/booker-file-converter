import { h } from 'preact';
import { useState } from 'preact/hooks';
import ClaimFilters from './ClaimFilters';

export default {
  title: 'Components/Claims/Claim Filters',
  component: ClaimFilters,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#FAF9F5',
        },
      ],
    },
    docs: {
      description: {
        component: `
The ClaimFilters component provides search and filtering capabilities for claims.
It includes a search input for searching by invoice or claim number and dropdown filters for claim date and invoice date.

The claim date filter can be hidden if not needed, and custom options can be provided for both date filters.
        `,
      },
    },
  },
};

export const Default = {
  args: {
    onsearch: (value) => console.log('Search:', value),
    onclaimdatechange: (value) => console.log('Claim date:', value),
    oninvoicedatechange: (value) => console.log('Invoice date:', value),
  },
};

export const WithoutClaimDate = {
  args: {
    showClaimDateFilter: false,
    onsearch: (value) => console.log('Search:', value),
    oninvoicedatechange: (value) => console.log('Invoice date:', value),
  },
};

export const CustomOptions = {
  args: {
    claimDateOptions: [
      { value: 'today', label: 'Today (May 2, 2025)' },
      { value: 'yesterday', label: 'Yesterday' },
      { value: 'this-week', label: 'This week' },
      { value: 'custom', label: 'Custom range...' },
    ],
    invoiceDateOptions: [
      { value: 'q1-2025', label: 'Q1 2025' },
      { value: 'q4-2024', label: 'Q4 2024' },
      { value: 'q3-2024', label: 'Q3 2024' },
      { value: 'custom', label: 'Custom range...' },
    ],
    onsearch: (value) => console.log('Search:', value),
    onclaimdatechange: (value) => console.log('Claim date:', value),
    oninvoicedatechange: (value) => console.log('Invoice date:', value),
  },
};

export const WithInitialValues = {
  render: () => {
    const [searchValue, setSearchValue] = useState('12345');
    const [claimDate, setClaimDate] = useState({
      value: 'last-30-days',
      label: 'Last 30 days',
    });
    const [invoiceDate, setInvoiceDate] = useState({
      value: 'this-year',
      label: 'This year',
    });

    return (
      <div className="tw:bg-secondary-1000 tw:p-4">
        <ClaimFilters
          initialSearch={searchValue}
          initialClaimDate={claimDate}
          initialInvoiceDate={invoiceDate}
          onsearch={(value) => {
            console.log('Search:', value);
            setSearchValue(value);
          }}
          onclaimdatechange={(value) => {
            console.log('Claim date:', value);
            setClaimDate(value);
          }}
          oninvoicedatechange={(value) => {
            console.log('Invoice date:', value);
            setInvoiceDate(value);
          }}
        />
      </div>
    );
  },
};
