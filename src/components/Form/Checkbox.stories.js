import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Checkbox } from './Checkbox';

export default {
  title: 'Form/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The Checkbox component is a customizable checkbox input that allows users to select one or more options. It features a custom styled checkbox with a checkmark icon that appears when selected.`,
      },
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const props = Object.entries(args)
            .map(([key, value]) => `${key}={${JSON.stringify(value)}}`)
            .join('\n  ');

          return `<Checkbox
  ${props}
/>`;
        },
      },
    },
  },
};

// Default Checkbox Example
export const Default = {
  args: {
    id: 'checkbox1',
    name: 'acceptTerms',
    label: 'I accept the terms and conditions',
    checked: false,
  },
};

// Checked Checkbox Example
export const Checked = {
  args: {
    id: 'checkbox2',
    name: 'newsletter',
    label: 'Subscribe to newsletter',
    checked: true,
  },
};

// Disabled Checkbox Example
export const Disabled = {
  args: {
    id: 'checkbox3',
    name: 'premium',
    label: 'Premium option (unavailable)',
    disabled: true,
  },
};

// Checkbox Group Example
export const CheckboxGroup = {
  render: () => {
    const [selectedOptions, setSelectedOptions] = useState({
      delivery: true,
      collection: false,
      special: false,
    });

    const handleChange = (e) => {
      const { name, checked } = e.target;
      setSelectedOptions((prev) => ({
        ...prev,
        [name]: checked,
      }));
    };

    return (
      <div className="tw:max-w-md tw:space-y-2">
        <Checkbox
          id="delivery"
          name="delivery"
          label="Standard Delivery"
          checked={selectedOptions.delivery}
          onChange={handleChange}
        />
        <Checkbox
          id="collection"
          name="collection"
          label="Click & Collect"
          checked={selectedOptions.collection}
          onChange={handleChange}
        />
        <Checkbox
          id="special"
          name="special"
          label="Special Delivery"
          checked={selectedOptions.special}
          onChange={handleChange}
        />

        <div className="tw:mt-4 tw:rounded-md tw:bg-gray-100 tw:p-3">
          <div className="tw:font-medium">Selected options:</div>
          <div>
            {Object.entries(selectedOptions)
              .filter(([_, isSelected]) => isSelected)
              .map(([option]) => option)
              .join(', ') || 'None'}
          </div>
        </div>
      </div>
    );
  },
};
