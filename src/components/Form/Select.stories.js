import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Select } from './Select';

export default {
  title: 'Form/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The Select component is a customizable dropdown that allows users to select one option from a list. It features a floating label, custom styling, keyboard navigation, and accessibility support.`,
      },
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const props = Object.entries(args)
            .map(([key, value]) => {
              if (key === 'options' || key === 'value') {
                return `${key}={${JSON.stringify(value, null, 2)}}`;
              }
              return `${key}={${JSON.stringify(value)}}`;
            })
            .join('\n  ');

          return `<Select
  ${props}
/>`;
        },
      },
    },
  },
};

const commonOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

// Default Select Example
export const Default = {
  args: {
    options: commonOptions,
    value: null,
    placeholder: 'Select an option',
    label: 'Choose an option',
    name: 'default-select',
  },
};

// Select with a selected value
export const WithSelectedValue = {
  args: {
    options: commonOptions,
    value: { value: 'option2', label: 'Option 2' },
    label: 'Choose an option',
    name: 'selected-select',
  },
};

// Required Select
export const Required = {
  args: {
    options: commonOptions,
    value: null,
    label: 'Required field',
    placeholder: 'Select a required option',
    name: 'required-select',
    required: true,
  },
};

// Select with Error
export const WithError = {
  args: {
    options: commonOptions,
    value: null,
    label: 'Field with error',
    placeholder: 'Select an option',
    name: 'error-select',
    error: 'This field is required',
  },
};

// Disabled Select
export const Disabled = {
  args: {
    options: commonOptions,
    value: null,
    label: 'Disabled field',
    placeholder: 'Cannot select',
    name: 'disabled-select',
    disabled: true,
  },
};

// Interactive Example
export const Interactive = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState(null);

    const options = [
      { value: 'delivery', label: 'Standard Delivery' },
      { value: 'express', label: 'Express Delivery' },
      { value: 'collection', label: 'Click & Collect' },
      { value: 'store', label: 'In-Store Pickup' },
    ];

    const handleChange = (option) => {
      setSelectedValue(option);
    };

    return (
      <div className="tw:max-w-md tw:space-y-4">
        <Select
          options={options}
          value={selectedValue}
          onchange={handleChange}
          label="Delivery Method"
          placeholder="Choose a delivery method"
          name="delivery-method"
        />

        {selectedValue && (
          <div className="tw:mt-4 tw:rounded-md tw:bg-gray-100 tw:p-3">
            <div className="tw:font-medium">Selected option:</div>
            <div>
              {selectedValue.label} (value: {selectedValue.value})
            </div>
          </div>
        )}
      </div>
    );
  },
};
