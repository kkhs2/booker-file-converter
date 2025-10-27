import { useState } from 'preact/hooks';
import FilterButtons from './FilterButtons';

export default {
  title: 'Sections/Filter buttons',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    argTypes: {
      topics: { control: 'array' },
      value: { control: 'array' },
      onchange: { control: 'function' },
    },
    docs: {
      description: {
        component:
          'A filter component for selecting FAQ topics. It allows users to filter FAQs based on different categories.',
      },
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
              return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<FilterButtons\n  ${props}\n/>`;
        },
      },
    },
  },
  component: FilterButtons,
};

export const Default = () => {
  const [selected, setSelected] = useState([]);
  const topics = [
    { key: 'general', label: 'General' },
    { key: 'getting-started', label: 'Getting started' },
    { key: 'products', label: 'Products' },
    { key: 'deliveries', label: 'Deliveries' },
    { key: 'ordering', label: 'Ordering' },
    { key: 'account', label: 'Account' },
    { key: 'click-collect', label: 'Click & Collect' },
    { key: 'checkout-payments', label: 'Checkout & Payments' },
    { key: 'prices-promotions', label: 'Prices & Promotions' },
    { key: 'returns-refunds', label: 'Returns & Refunds' },
  ];
  return (
    <div className="tw-container">
      <FilterButtons topics={topics} value={selected} onchange={setSelected} />
      <div className="tw-mt-4">
        <b>Selected:</b> {selected.join(', ')}
      </div>
    </div>
  );
};
