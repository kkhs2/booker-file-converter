import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import CustomerRating from './CustomerRating';
import { useOverlay } from '../../../hooks/useOverlay';

export default {
  title: 'Components/Feedback Forms/Customer Rating',
  component: CustomerRating,
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

          return `<CustomerRating\n  ${props}\n/>`;
        },
      },
      description: {
        component:
          'A customer rating form component that collects rating feedback with emoji-based rating icons and text feedback.',
      },
    },
  },
  argTypes: {
    onSubmit: { action: 'submitted' },
    onclose: { action: 'closed' },
    submitted: {
      control: 'boolean',
      description: 'Indicates if the form has been submitted',
    },
    classname: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    initialValues: {
      control: 'object',
      description: 'Initial form values',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A customer rating form component that collects rating feedback with emoji-based rating icons and text feedback.',
      },
    },
  },
};

// Portal-based templates that open on mount
const PortalTemplate = (args) => {
  const { showOverlay, hideOverlay, portalNode } = useOverlay();

  useEffect(() => {
    showOverlay(
      CustomerRating,
      {
        ...args,
        onclose: hideOverlay,
      },
      { closeOnClickOutside: true },
    );
  }, []);

  return (
    <div className="tw:flex tw:min-h-screen tw:items-center tw:justify-center tw:bg-gray-100 tw:p-6">
      <div className="tw:text-center">
        <h2 className="tw:mb-4 tw:text-2xl tw:font-bold tw:text-gray-700">
          Portal Example
        </h2>
        <p className="tw:text-gray-600">
          The CustomerRating form should open automatically in an overlay
        </p>
      </div>
      {portalNode}
    </div>
  );
};

export const Default = PortalTemplate.bind({});
Default.args = {
  onSubmit: (data) => {
    console.log('Rating submitted:', data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
  initialValues: {
    rating: '',
    feedback: '',
  },
};

export const Submitted = PortalTemplate.bind({});
Submitted.args = {
  onSubmit: (data) => {
    console.log('Rating submitted:', data);
  },
  submitted: true,
};

export const WithInitialValues = PortalTemplate.bind({});
WithInitialValues.args = {
  onSubmit: (data) => {
    console.log('Rating submitted:', data);
  },
  initialValues: {
    rating: 'good',
    feedback: 'Great service! Very satisfied with the experience.',
  },
};
