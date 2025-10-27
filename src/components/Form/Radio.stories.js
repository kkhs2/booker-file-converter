import { h } from 'preact';
import { useState } from 'preact/hooks';
import Radio from './Radio';
import RadioGroup from './RadioGroup';

export default {
  title: 'Form/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The Radio component is a customizable radio button that allows users to select one option from a set. It can be used individually or as part of a RadioGroup for better organization and functionality.`,
      },
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const props = Object.entries(args)
            .map(([key, value]) => `${key}={${JSON.stringify(value)}}`)
            .join('\n  ');

          return `<Radio
  ${props}
/>`;
        },
      },
    },
  },
};

// Single Radio Example
export const Default = {
  args: {
    id: 'radio1',
    name: 'radioOption',
    value: 'option1',
    label: 'Pay by card',
    checked: true,
    disabled: false,
  },
};

export const Disabled = {
  args: {
    id: 'radio2',
    name: 'radioOption',
    value: 'option2',
    label: 'Pay by account',
    checked: false,
    disabled: true,
  },
};

// Radio Group with payment variant
export const PaymentRadioGroup = {
  render: () => {
    const [selected, setSelected] = useState('card');

    const options = [
      {
        id: 'payment-card',
        value: 'card',
        label: 'Pay by card',
      },
      {
        id: 'payment-account',
        value: 'account',
        label: 'Add to account',
      },
    ];

    return (
      <div className="tw:max-w-md">
        <RadioGroup
          name="paymentMethod"
          options={options}
          defaultvalue="card"
          onchange={setSelected}
        />
        <div className="tw:mt-4">Selected: {selected}</div>
      </div>
    );
  },
};
