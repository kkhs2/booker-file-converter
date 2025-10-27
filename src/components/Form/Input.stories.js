/**
 * Storybook configuration for the Button component
 * This defines how the Button component will appear in Storybook and what controls/options are available.
 */

// Import the Button component
import { Input } from './Input';

// Define the story configuration
export default {
  title: 'Form/Input',
  component: Input,
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

          return `<Input\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
### Input Component
The Input component is a versatile and customizable input field designed for various use cases. It supports different types of inputs, including text, password, email, and more. The component also includes features like error handling, hint display, and icon support.

### Props
- **type**: Specifies the type of input (e.g., text, password, email).
- **label**: The label text for the input field.
- **onInput**: Callback function triggered when the input value changes.
- **error**: Displays an error message if the input has an error.
- **hint**: Additional hint text displayed below the input field.
- **iconleft**: Icon to display on the left side of the input field.
- **iconright**: Icon to display on the right side of the input field.
- **classname**: Additional class names for styling the input field.
- **disabled**: Whether the input field is disabled.
- **required**: Whether the input field is required.
- **name**: The name attribute for the input field.
- **suggestions**: Array of suggestion objects for the autocomplete dropdown.
- **onSelect**: Callback function when a suggestion is selected.
- **loading**: Whether suggestions are being loaded.
- **dropdownlabel**: Label for the dropdown.
- **icononclick**: Callback function when the icon is clicked.
- **debouncewait**: Wait time for debounce functionality.
- **throttlelimit**: Limit time for throttle functionality.
- **labelbackgroundcolour**: Background colour for the floating label (e.g., 'tw:bg-white', 'tw:bg-secondary-1000').

### Native HTML Input Props

The Input component also supports all standard HTML input attributes:

- **value**: The current value of the input element
- **placeholder**: Placeholder text displayed when the input is empty
- **onChange**: Event handler triggered when the input value changes
- **onFocus**: Event handler triggered when the input gains focus
- **onBlur**: Event handler triggered when the input loses focus
- **onKeyDown/onKeyUp**: Event handlers for keyboard interactions
- **autoComplete**: Controls browser autocomplete behavior ("on", "off", etc.)
- **autoFocus**: If true, the input will be focused automatically on mount
- **readOnly**: If true, the input cannot be modified but remains in the tab order
- **min/max**: Minimum and maximum values for number inputs
- **minLength/maxLength**: Character length constraints for text inputs
- **pattern**: Regular expression for validation
- **step**: Increment value for number inputs
- **id**: Unique identifier for the input element
- **style**: Inline CSS styles
- **tabIndex**: Tab order of the element
- **aria-***: Accessibility attributes


### Design Figma References
- [Input UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=19-1223&m=dev)
        `,
      },

      story: {
        height: '300px',
      },
    },
  },

  // Define controls (props) for the Button component
  argTypes: {},
};

/**
 * Template for rendering the Button component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => Input(args);

/**
 * Default text input
 */
export const Text = Template.bind({});
Text.args = {
  type: 'text',
  name: 'text',
  placeholder: 'Enter text',
  label: 'Text Input',
};

/**
 * Password input variant
 */
export const Password = Template.bind({});
Password.args = {
  type: 'password',
  name: 'password',
  placeholder: 'Enter password',
  label: 'Password',
};

/**
 * Email input variant
 */
export const Email = Template.bind({});
Email.args = {
  type: 'email',
  name: 'email',
  placeholder: 'Enter email',
  label: 'Email Address',
};

/**
 * Input with error state
 */
export const WithError = Template.bind({});
WithError.args = {
  type: 'text',
  name: 'error',
  placeholder: 'Enter text',
  label: 'Error Input',
  error: 'This field is required',
};

/**
 * Input with hint text
 */
export const WithHint = Template.bind({});
WithHint.args = {
  type: 'text',
  name: 'hint',
  placeholder: 'Enter text',
  label: 'Input with Hint',
  hint: 'This is a helpful hint message',
};

/**
 * Input with suggestions
 */
export const WithSuggestions = Template.bind({});
WithSuggestions.args = {
  type: 'text',
  name: 'suggestions',
  placeholder: 'Enter text',
  label: 'Input with Suggestions',
  dropdownlabel: 'Select your address',
  suggestions: [
    {
      label: '2 Leighton Place London NW5 2QL',
      value: '2 Leighton Place London NW5 2QL',
    },
    {
      label: '2 Leighton Place London NW5 2QL',
      value: '2 Leighton Place London NW5 2QL',
    },
    {
      label: '2 Leighton Place London NW5 2QL',
      value: '2 Leighton Place London NW5 2QL',
    },
    {
      label: '2 Leighton Place London NW5 2QL',
      value: '2 Leighton Place London NW5 2QL',
    },
    {
      label: '2 Leighton Place London NW5 2QL',
      value: '2 Leighton Place London NW5 2QL',
    },
    {
      label: '2 Leighton Place London NW5 2QL',
      value: '2 Leighton Place London NW5 2QL',
    },
    {
      label: '2 Leighton Place London NW5 2QL',
      value: '2 Leighton Place London NW5 2QL',
    },
    {
      label: '2 Leighton Place London NW5 2QL',
      value: '2 Leighton Place London NW5 2QL',
    },
    {
      label: '2 Leighton Place London NW5 2QL',
      value: '2 Leighton Place London NW5 2QL',
    },
    {
      label: '2 Leighton Place London NW5 2QL',
      value: '2 Leighton Place London NW5 2QL',
    },
  ],
  dropdownlabel: 'Suggestions',
};

/**
 * Input with tooltip
 *
 */

export const WithTooltip = () => {
  return (
    <div className="tw:relative tw:max-w-md">
      <Input
        type="text"
        name="tooltip"
        placeholder="Enter text"
        label="Input with Tooltip"
        icononclick={() => {
          console.log('Tooltip clicked');
        }}
      />
    </div>
  );
};

/**
 * Input with debounce and throttle
 */
/**
 * Renders an Input component with debounce and throttle capabilities.
 *
 *
 * @returns {JSX.Element} A text input field with debounce and throttle functionality
 */
export const WithDebounceAndThrottle = () => {
  return (
    <div className="tw:relative tw:max-w-md">
      <p className="tw:mb-4 tw:text-sm tw:text-gray-600">
        This story demonstrates how to use the Input component with debounce and
        throttle properties:
        <br />• <code>debouncewait</code>: Delays execution of the onInput
        handler by 300ms after the user stops typing
        <br />• <code>throttlelimit</code>: Limits the execution of the onInput
        handler to once every 200ms
        <br />
        <br />
        This combination is useful for performance optimization when handling
        input changes, especially for operations like search fields or real-time
        validation that could be resource-intensive if executed on every
        keystroke.
      </p>

      <Input
        type="text"
        name="debounce-throttle"
        placeholder="Enter text"
        label="Input with Debounce and Throttle"
        debouncewait={300}
        throttlelimit={200}
        onInput={(e) => console.log(e.target.value)}
      />
    </div>
  );
};

/**
 * Input with different background colors for the label
 */
export const DifferentBackgrounds = {
  render: () => {
    return (
      <div className="tw:space-y-8">
        <div className="tw:rounded-lg tw:bg-white tw:p-8">
          <p className="tw:mb-4 tw:text-sm">Default white background:</p>
          <Input
            type="text"
            name="white-bg"
            placeholder="Enter text"
            label="White Background Label"
            labelbackgroundcolour="tw:bg-white"
          />
        </div>

        <div className="tw:rounded-lg tw:bg-secondary-1000 tw:p-8">
          <p className="tw:mb-4 tw:text-sm">Secondary background:</p>
          <Input
            type="text"
            name="secondary-bg"
            placeholder="Enter text"
            label="Secondary Background Label"
            labelbackgroundcolour="tw:bg-secondary-1000"
          />
        </div>

        <div className="tw:rounded-lg tw:bg-beige-1000 tw:p-8">
          <p className="tw:mb-4 tw:text-sm">Beige background:</p>
          <Input
            type="text"
            name="beige-bg"
            placeholder="Enter text"
            label="Beige Background Label"
            labelbackgroundcolour="tw:bg-beige-1000"
          />
        </div>
      </div>
    );
  },
};

/**
 * All statuses story.
 * Demonstrates displaying all statuses in a row.
 */
export const AllInputs = {
  render: () => {
    // Add all the previously defined args here
    const statusConfigs = [
      {
        type: 'text',
        name: 'text',
        placeholder: 'Enter text',
        label: 'Text Input',
      },
      {
        type: 'password',
        name: 'password',
        placeholder: 'Enter password',
        label: 'Password Input',
      },
      {
        type: 'email',
        name: 'email',
        placeholder: 'Enter email',
        label: 'Email Input',
      },
      {
        type: 'text',
        name: 'error',
        placeholder: 'Enter text',
        label: 'Error Input',
        error: 'This field is required',
      },
      {
        type: 'text',
        name: 'hint',
        placeholder: 'Enter text',
        label: 'Input with Hint',
        hint: 'This is a helpful hint message',
      },
      {
        type: 'text',
        name: 'suggestions',
        placeholder: 'Enter text',
        label: 'Input with Suggestions',
        dropdownlabel: 'Select your address',
        suggestions: [
          {
            label: '2 Leighton Place London NW5 2QL',
            value: '2 Leighton Place London NW5 2QL',
          },
          {
            label: '2 Leighton Place London NW5 2QL',
            value: '2 Leighton Place London NW5 2QL',
          },
          {
            label: '2 Leighton Place London NW5 2QL',
            value: '2 Leighton Place London NW5 2QL',
          },
        ],
      },
    ];

    return (
      <div className="tw:flex tw:flex-col tw:flex-wrap tw:items-start tw:gap-8">
        {statusConfigs.map((config, idx) => (
          <div key={idx} className="tw:w-1/2">
            <Input {...config} />
          </div>
        ))}
      </div>
    );
  },
};
