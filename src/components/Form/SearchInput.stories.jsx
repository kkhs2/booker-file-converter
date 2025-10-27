import { h } from 'preact';
import { useState } from 'preact/hooks';
import SearchInput from './SearchInput';

export default {
  title: 'Form/Search Input',
  component: SearchInput,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: '#FAF9F5' }],
    },
    docs: {
      description: {
        component: `
Reusable search input component featuring an icon and clear styling.

Props:
- value (string): controlled input value
- onInput (function): input event handler
- placeholder (string): placeholder text
- barcode (boolean): enables barcode functionality
- onbarcodeclick (function): handler for barcode button click
- enabletabcompletion (boolean): enables tab completion functionality
- searchsuggestions (array): array of strings for tab completion suggestions
- ontabcomplete (function): callback when tab completion occurss
- classname (string): additional wrapper classes
`,
      },
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

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

          return `<SearchInput\n  ${props}\n/>`;
        },
      },
    },
  },

  argTypes: {
    value: {
      control: 'text',
      description: 'Current input value',
      defaultValue: '',
    },
    onInput: {
      action: 'input',
      description: 'Input event handler',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
      defaultValue: 'Search name, code or barcode',
    },
    barcode: {
      control: 'boolean',
      description: 'Enable barcode functionality',
      defaultValue: false,
    },
    onbarcodeclick: {
      action: 'barcode click',
      description: 'Handler for barcode button click',
    },
    enabletabcompletion: {
      control: 'boolean',
      description: 'Enable tab completion functionality',
      defaultValue: false,
    },
    searchsuggestions: {
      control: 'object',
      description: 'Array of strings for tab completion suggestions',
      defaultValue: [],
    },
    ontabcomplete: {
      action: 'tab complete',
      description: 'Callback when tab completion occurs',
    },

    classname: {
      control: 'text',
      description: 'Additional wrapper classes for styling',
      defaultValue: '',
    },
  },
};

// Interactive example for live editing
export const Interactive = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ maxWidth: '320px' }}>
        <SearchInput
          value={value}
          onInput={(e) => setValue(e.target.value)}
          placeholder="Type to search..."
        />
        <p>Current value: {value}</p>
      </div>
    );
  },
};

// Default controlled usage
export const Default = {
  args: {
    value: '',
    placeholder: 'Search name, code or barcode',
  },
};

// Example with barcode functionality
export const WithBarcodeMobile = {
  args: {
    value: '',
    placeholder: 'Search by barcode',
    barcode: true,
    onbarcodeclick: () => alert('Barcode scanner clicked!'),
  },
};

export const WithTabCompletion = {
  args: {
    placeholder: 'Search products...',
    value: '',
    barcode: false,
    enabletabcompletion: true,
    searchsuggestions: [
      'Apple iPhone 14',
      'Apple iPhone 14 Pro',
      'Apple iPhone 14 Pro Max',
      'Apple AirPods',
      'Apple Watch',
      'Samsung Galaxy S23',
      'Samsung Galaxy Note',
      'Google Pixel 7',
      'Google Pixel 7 Pro',
    ],
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || '');

    return (
      <div className="tw:max-w-md tw:space-y-4">
        <SearchInput
          {...args}
          value={value}
          onInput={(e) => {
            setValue(e.target.value);
            args.onInput(e);
          }}
          ontabcomplete={(completedValue, index) => {
            setValue(completedValue);
            args.ontabcomplete(completedValue, index);
          }}
        />
        <div className="tw:text-sm tw:text-gray-600">
          <p>
            <strong>Instructions:</strong>
          </p>
          <ul className="tw:list-inside tw:list-disc tw:space-y-1">
            <li>Type "app" or "sam" to see visual suggestions dropdown</li>
            <li>
              Press <kbd className="tw:rounded tw:bg-gray-100 tw:px-1">Tab</kbd>{' '}
              or <kbd className="tw:rounded tw:bg-gray-100 tw:px-1">↓</kbd> to
              cycle forward
            </li>
            <li>
              Press{' '}
              <kbd className="tw:rounded tw:bg-gray-100 tw:px-1">Shift+Tab</kbd>{' '}
              or <kbd className="tw:rounded tw:bg-gray-100 tw:px-1">↑</kbd> to
              cycle backward
            </li>
            <li>
              Press{' '}
              <kbd className="tw:rounded tw:bg-gray-100 tw:px-1">Enter</kbd> to
              select highlighted suggestion
            </li>
            <li>Click on any suggestion to select it</li>
            <li>
              Press{' '}
              <kbd className="tw:rounded tw:bg-gray-100 tw:px-1">Escape</kbd> to
              hide suggestions
            </li>
          </ul>
        </div>
      </div>
    );
  },
};
