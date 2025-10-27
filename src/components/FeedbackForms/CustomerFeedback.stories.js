import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import CustomerFeedback from './CustomerFeedback';
import { useOverlay } from '../../../hooks/useOverlay';

export default {
  title: 'Components/Feedback Forms/Customer Feedback',
  component: CustomerFeedback,
  argTypes: {
    onSubmit: { action: 'submitted' },
    disabled: {
      control: 'boolean',
      description: 'Disable the entire form',
    },
    classname: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    initialvalues: {
      control: 'object',
      description: 'Initial form values',
    },
    submitted: {
      control: 'boolean',
      description: 'Indicates if the form has been submitted',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A comprehensive customer feedback form for collecting user insights and feedback.',
      },
    },
  },
};

// Portal-based templates that open on mount
const PortalTemplate = (args) => {
  const { showOverlay, hideOverlay, portalNode } = useOverlay();

  useEffect(() => {
    showOverlay(
      CustomerFeedback,
      {
        ...args,
        onclose: hideOverlay,
        onsubmit: (data) => {
          console.log('Form submitted:', data);
        },
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
          The CustomerFeedback form should open automatically in an overlay
        </p>
      </div>
      {portalNode}
    </div>
  );
};

export const Default = PortalTemplate.bind({});
Default.args = {
  onSubmit: (data) => {
    console.log('Form submitted:', data);
  },
};

export const Submitted = PortalTemplate.bind({});
Submitted.args = {
  onSubmit: (data) => {
    console.log('Form submitted:', data);
  },
  submitted: true,
};
