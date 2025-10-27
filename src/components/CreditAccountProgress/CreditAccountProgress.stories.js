/**
 * Storybook configuration for the CreditAccountProgress component
 * Defines how the CreditAccountProgress component appears in Storybook and its configurable options.
 */

import CreditAccountProgress from './CreditAccountProgress';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';

export default {
  title: 'Components/Credit Account Progress',
  component: CreditAccountProgress,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The CreditAccountProgress component displays the progress steps for a credit account application process.
It shows different layouts for desktop (horizontal) and mobile (vertical) views.
        `,
      },
    },
    layout: 'padded',
  },

  // Controls for the component
  argTypes: {
    steps: {
      control: 'object',
      description:
        'Array of step objects with label, status, optional stepNumber, optional id, and optional stepId',
    },
    status: {
      control: 'select',
      options: ['not-started', 'in-progress', 'completed'],
      description: 'Overall status of the application process',
    },
    content: {
      control: 'object',
      description: 'Custom content for different states (optional)',
    },
    creditlimit: {
      control: 'text',
      description: 'Credit limit amount (optional)',
    },
    terms: {
      control: 'text',
      description: 'Terms and conditions for the credit account (optional)',
    },
    requestcreditincrease: {
      control: 'boolean',
      description: 'Whether to show the credit increase request button',
    },
    oncreditincrease: {
      action: 'credit increase requested',
      description: 'Function to call when credit increase is requested',
    },
    button: {
      control: false,
      description: 'Optional Button component to display in the content area',
    },

    title: {
      control: 'text',
      description: 'Title for the credit account progress section',
    },
    message: {
      control: 'text',
      description: 'Message to display in the credit account progress section',
    },

    classname: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

/**
 * Template for rendering the CreditAccountProgress component with dynamic props.
 * @param {Object} args - Arguments to customize the component.
 * @returns {JSX.Element} Rendered CreditAccountProgress component.
 */
const Template = (args) => <CreditAccountProgress {...args} />;

/**
 * Story showing the progress at the beginning of the process
 */
export const NotStarted = Template.bind({});
NotStarted.args = {
  status: 'not-started',
  title: 'Buy now, pay later.',
  message:
    'You can apply for a Branch Credit Account to help you spread the cost of  your shop.',
  steps: [
    {
      id: 'apply-credit',
      label: 'Apply for credit',
      status: 'completed',
      stepId: '1',
    },
    {
      id: 'sign-document',
      label: 'Sign document',
      status: 'pending',
      stepId: '2',
    },
    {
      id: 'id-scan',
      label: 'ID scan',
      status: 'pending',
      stepId: '3',
    },
    {
      id: 'submitted',
      label: 'Submitted',
      status: 'pending',
      stepId: '—',
    },
    {
      id: 'awaiting-approval',
      label: 'Awaiting approval',
      status: 'pending',
      stepId: '4',
    },
    {
      id: 'credit-status',
      label: 'My credit status',
      status: 'pending',
      stepId: '5',
    },
  ],
};

/**
 * Story showing the progress at the beginning of the process
 */
export const Starting = Template.bind({});
Starting.args = {
  status: 'in-progress',
  title: 'Application status.',
  message:
    'Thank you for applying for a Branch Credit Account. You can track your progress by following the steps.',
  steps: [
    {
      id: 'apply-credit',
      label: 'Apply for credit',
      status: 'completed',
      stepId: '1',
    },
    {
      id: 'sign-document',
      label: 'Sign document',
      status: 'completed',
      stepId: '2',
    },
    {
      id: 'id-scan',
      label: 'ID scan',
      status: 'completed',
      stepId: '3',
    },
    {
      id: 'submitted',
      label: 'Submitted',
      status: 'pending',
      stepId: '—',
    },
    {
      id: 'awaiting-approval',
      label: 'Awaiting approval',
      status: 'pending',
      stepId: '4',
    },
    {
      id: 'credit-status',
      label: 'My credit status',
      status: 'pending',
      stepId: '5',
    },
  ],
};

/**
 * Story showing progress near completion
 */
export const NearCompletion = Template.bind({});
NearCompletion.args = {
  status: 'in-progress',
  title: 'Application status.',
  message:
    'Thank you for applying for a Branch Credit Account. You can track your progress by following the steps.',
  steps: [
    {
      id: 'apply-credit',
      label: 'Apply for credit',
      status: 'completed',
      stepId: '1',
    },
    {
      id: 'sign-document',
      label: 'Sign document',
      status: 'completed',
      stepId: '2',
    },
    {
      id: 'id-scan',
      label: 'ID scan',
      status: 'completed',
      stepId: '3',
    },
    {
      id: 'submitted',
      label: 'Submitted',
      status: 'completed',
      stepId: '4',
    },
    {
      id: 'awaiting-approval',
      label: 'Awaiting approval',
      status: 'completed',
      stepId: '5',
    },
    {
      id: 'credit-status',
      label: 'My credit status',
      status: 'pending',
      stepId: '—',
    },
  ],
};

/**
 * Story showing all steps completed
 */
export const Completed = Template.bind({});
Completed.args = {
  status: 'completed',
  creditlimit: '£5000',
  terms: 'Invoices due in 5 days',
  title: 'Credit overview.',
  message:
    'Your credit application has been successful and you have been extended a Branch Credit Account.',
  steps: [
    {
      id: 'apply-credit',
      label: 'Apply for credit',
      status: 'completed',
      stepId: '1',
    },
    {
      id: 'sign-document',
      label: 'Sign document',
      status: 'completed',
      stepId: '2',
    },
    {
      id: 'id-scan',
      label: 'ID scan',
      status: 'completed',
      stepId: '3',
    },
    {
      id: 'submitted',
      label: 'Submitted',
      status: 'completed',
      stepId: '—',
    },
    {
      id: 'awaiting-approval',
      label: 'Awaiting approval',
      status: 'completed',
      stepId: '4',
    },
    {
      id: 'credit-status',
      label: 'My credit status',
      status: 'completed',
      stepId: '5',
    },
  ],
};

/**
 * Story with credit increase request button
 */
export const WithCreditIncreaseRequest = Template.bind({});
WithCreditIncreaseRequest.args = {
  title: 'Credit overview.',
  message:
    'Thank you for your request. We’re reviewing your credit increase application and will update you within [X] working days.',
  status: 'completed',
  creditlimit: '£5000',
  requestcreditincrease: true,
  oncreditincrease: () => console.log('Credit increase requested'),
  terms: 'Invoices due in 5 days',
  steps: [
    {
      id: 'apply-credit',
      label: 'Apply for credit',
      status: 'completed',
      stepId: '1',
    },
    {
      id: 'sign-document',
      label: 'Sign document',
      status: 'completed',
      stepId: '2',
    },
    {
      id: 'id-scan',
      label: 'ID scan',
      status: 'completed',
      stepId: '3',
    },
    {
      id: 'submitted',
      label: 'Submitted',
      status: 'completed',
      stepId: '—',
    },
    {
      id: 'awaiting-approval',
      label: 'Awaiting approval',
      status: 'completed',
      stepId: '4',
    },
    {
      id: 'credit-status',
      label: 'My credit status',
      status: 'completed',
      stepId: '5',
    },
  ],
};

/** * Story with credit increase request in progress
 */
export const CreditIncreaseInProgress = Template.bind({});
CreditIncreaseInProgress.args = {
  title: 'Credit overview.',
  message:
    'Thank you for your request. We’re reviewing your credit increase application and will update you within [X] working days.',
  status: 'credit-increase-requested',
  creditlimit: '£5000',
  requestcreditincrease: true,
  oncreditincrease: () => console.log('Credit increase requested'),
  terms: 'Invoices due in 5 days',
  steps: [
    {
      id: 'apply-credit',
      label: 'Apply for credit',
      status: 'completed',
      stepId: '1',
    },
    {
      id: 'sign-document',
      label: 'Sign document',
      status: 'completed',
      stepId: '2',
    },
    {
      id: 'id-scan',
      label: 'ID scan',
      status: 'completed',
      stepId: '3',
    },
    {
      id: 'submitted',
      label: 'Submitted',
      status: 'completed',
      stepId: '—',
    },
    {
      id: 'awaiting-approval',
      label: 'Awaiting approval',
      status: 'completed',
      stepId: '4',
    },
    {
      id: 'credit-status',
      label: 'My credit status',
      status: 'completed',
      stepId: '5',
    },
  ],
};

/** * Story with credit increase successfully requested
 */
export const CreditIncreaseSuccess = Template.bind({});
CreditIncreaseSuccess.args = {
  title: 'Credit overview.',
  message:
    'Great news! Your credit increase request has been approved. Your new credit limit is shown below.',
  status: 'completed',
  creditlimit: '£15000',
  requestcreditincrease: true,
  oncreditincrease: () => console.log('Credit increase requested'),
  terms: 'Invoices due in 5 days',
  steps: [
    {
      id: 'apply-credit',
      label: 'Apply for credit',
      status: 'completed',
      stepId: '1',
    },
    {
      id: 'sign-document',
      label: 'Sign document',
      status: 'completed',
      stepId: '2',
    },
    {
      id: 'id-scan',
      label: 'ID scan',
      status: 'completed',
      stepId: '3',
    },
    {
      id: 'submitted',
      label: 'Submitted',
      status: 'completed',
      stepId: '—',
    },
    {
      id: 'awaiting-approval',
      label: 'Awaiting approval',
      status: 'completed',
      stepId: '4',
    },
    {
      id: 'credit-status',
      label: 'My credit status',
      status: 'completed',
      stepId: '5',
    },
  ],
};

/**
 * Story showing a custom 4-step process
 */
export const CustomFlow = Template.bind({});
CustomFlow.args = {
  status: 'in-progress',
  title: 'Custom status.',
  message: 'Custom message for the simplified flow.',
  creditlimit: '£5000',
  steps: [
    {
      id: 'application',
      label: 'Application',
      status: 'completed',
      stepId: '1',
    },
    {
      id: 'verification',
      label: 'Verification',
      status: 'completed',
      stepId: '2',
    },
    {
      id: 'review',
      label: 'Review',
      status: 'completed',
      stepId: '3',
    },
    {
      id: 'approval',
      label: 'Approval',
      status: 'pending',
      stepId: '—',
    },
  ],
};

/**
 * Story with custom clickable button for not-started state
 */
export const NotStartedWithCustomButton = Template.bind({});
NotStartedWithCustomButton.args = {
  status: 'not-started',
  title: 'Buy now, pay later.',
  message:
    'You can apply for a Branch Credit Account to help you spread the cost of your shop.',
  button: (
    <Button
      variant="secondary"
      label="Get Started Now"
      classname="tw:w-full tw:lg:w-auto tw:lg:px-6 tw:py-3 tw:lg:py-4 tw:text-base tw:leading-none tw:lg:text-lg"
      onClick={() => console.log('Custom Get Started Clicked')}
      iconright={<Icons.chevronRight classname="tw:w-4 tw:h-4" />}
    />
  ),
  steps: [
    {
      id: 'apply-credit',
      label: 'Apply for credit',
      status: 'pending',
      stepId: '1',
    },
    {
      id: 'sign-document',
      label: 'Sign document',
      status: 'pending',
      stepId: '2',
    },
    {
      id: 'id-scan',
      label: 'ID scan',
      status: 'pending',
      stepId: '3',
    },
    {
      id: 'submitted',
      label: 'Submitted',
      status: 'pending',
      stepId: '—',
    },
    {
      id: 'awaiting-approval',
      label: 'Awaiting approval',
      status: 'pending',
      stepId: '4',
    },
    {
      id: 'credit-status',
      label: 'My credit status',
      status: 'pending',
      stepId: '5',
    },
  ],
};

/**
 * Story with custom clickable button for in-progress state
 */
export const InProgressWithCustomButton = Template.bind({});
InProgressWithCustomButton.args = {
  status: 'in-progress',
  title: 'Application status.',
  message:
    'Thank you for applying for a Branch Credit Account. You can track your progress by following the steps.',
  button: (
    <Button
      variant="tertiary"
      label="Continue Application"
      classname="tw:w-full tw:lg:w-auto tw:lg:px-6 tw:py-3 tw:lg:py-4 tw:text-base tw:leading-none tw:lg:text-lg"
      onClick={() => console.log('Continue Application Clicked')}
      iconright={<Icons.chevronRight classname="tw:w-4 tw:h-4" />}
    />
  ),
  steps: [
    {
      id: 'apply-credit',
      label: 'Apply for credit',
      status: 'completed',
      stepId: '1',
    },
    {
      id: 'sign-document',
      label: 'Sign document',
      status: 'completed',
      stepId: '2',
    },
    {
      id: 'id-scan',
      label: 'ID scan',
      status: 'current',
      stepId: '3',
    },
    {
      id: 'submitted',
      label: 'Submitted',
      status: 'pending',
      stepId: '—',
    },
    {
      id: 'awaiting-approval',
      label: 'Awaiting approval',
      status: 'pending',
      stepId: '4',
    },
    {
      id: 'credit-status',
      label: 'My credit status',
      status: 'pending',
      stepId: '5',
    },
  ],
};

/**
 * Story with non-clickable button for completed state
 */
export const CompletedWithCustomButton = Template.bind({});
CompletedWithCustomButton.args = {
  status: 'completed',
  creditlimit: '£5000',
  terms: 'Invoices due in 5 days',
  title: 'Credit overview.',
  message:
    'Your credit application has been successful and you have been extended a Branch Credit Account.',
  button: (
    <Button
      variant="primary"
      label="Account Active"
      state="disabled"
      classname="tw:w-full tw:lg:w-auto tw:lg:px-6 tw:py-3 tw:lg:py-4 tw:text-base tw:leading-none tw:lg:text-lg"
      iconleft={<Icons.checkMark classname="tw:w-4 tw:h-4" />}
    />
  ),
  steps: [
    {
      id: 'apply-credit',
      label: 'Apply for credit',
      status: 'completed',
      stepId: '1',
    },
    {
      id: 'sign-document',
      label: 'Sign document',
      status: 'completed',
      stepId: '2',
    },
    {
      id: 'id-scan',
      label: 'ID scan',
      status: 'completed',
      stepId: '3',
    },
    {
      id: 'submitted',
      label: 'Submitted',
      status: 'completed',
      stepId: '—',
    },
    {
      id: 'awaiting-approval',
      label: 'Awaiting approval',
      status: 'completed',
      stepId: '4',
    },
    {
      id: 'credit-status',
      label: 'My credit status',
      status: 'completed',
      stepId: '5',
    },
  ],
};

/**
 * Story with credit increase request button using new button prop
 */
export const WithCustomCreditIncreaseButton = Template.bind({});
WithCustomCreditIncreaseButton.args = {
  title: 'Credit overview.',
  message:
    'Your credit application has been successful and you have been extended a Branch Credit Account.',
  status: 'completed',
  creditlimit: '£5000',
  terms: 'Invoices due in 5 days',
  button: (
    <Button
      variant="primary"
      label="Request credit increase"
      classname="tw:w-full tw:lg:w-auto tw:lg:px-6 tw:py-3 tw:lg:py-4 tw:text-base tw:leading-none tw:border-none tw:lg:text-lg"
      onClick={() => console.log('Credit increase requested')}
      iconright={<Icons.chevronRight classname="tw:w-4 tw:h-4" />}
    />
  ),
  steps: [
    {
      id: 'apply-credit',
      label: 'Apply for credit',
      status: 'completed',
      stepId: '1',
    },
    {
      id: 'sign-document',
      label: 'Sign document',
      status: 'completed',
      stepId: '2',
    },
    {
      id: 'id-scan',
      label: 'ID scan',
      status: 'completed',
      stepId: '3',
    },
    {
      id: 'submitted',
      label: 'Submitted',
      status: 'completed',
      stepId: '—',
    },
    {
      id: 'awaiting-approval',
      label: 'Awaiting approval',
      status: 'completed',
      stepId: '4',
    },
    {
      id: 'credit-status',
      label: 'My credit status',
      status: 'completed',
      stepId: '5',
    },
  ],
};
