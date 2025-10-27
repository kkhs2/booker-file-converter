import { h } from 'preact';
import { useState } from 'preact/hooks';
import PhoneNumberInput from './PhoneNumberInput';

export default {
  title: 'Form/Phone Number Input',
  component: PhoneNumberInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
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
                return value ? key : null;
              }
              if (typeof value === 'string') {
                return `${key}="${value}"`;
              }
              return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<PhoneNumberInput\n  ${props}\n/>`;
        },
      },
      description: {
        component:
          'A customizable phone number input component with country selection and validation.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'The phone number value',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text for the input',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Whether to show error state',
    },
    onchange: {
      action: 'phone-changed',
      description: 'Callback fired when phone number changes',
    },
  },
};

const Template = (args) => {
  const [phoneNumber, setPhoneNumber] = useState(args.value || '');
  const [selectedCountry, setSelectedCountry] = useState(
    args.selectedCountry || {
      code: 'GB',
      name: 'United Kingdom',
      dialcode: '+44',
    },
  );

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
    args.onchange?.(value);
  };

  return (
    <div className="tw:h-96">
      <PhoneNumberInput
        {...args}
        value={phoneNumber}
        country={country}
        onchange={handlePhoneChange}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Contact number',
};

export const WithValue = Template.bind({});
WithValue.args = {
  value: '123 456 7890',
  placeholder: 'Contact number',
};

export const USSelected = Template.bind({});
USSelected.args = {
  placeholder: 'Contact number',
  value: '123 456 7890',
  country: {
    code: 'US',
    name: 'United States',
    dialcode: '+1',
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'Contact number',
  disabled: true,
  value: '123 456 7890',
};
