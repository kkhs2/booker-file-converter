import { h } from 'preact';
import { useState } from 'preact/hooks';
import PaymentMethodPanel from './PaymentMethodPanel';
import { CheckoutProductsList } from '../../../utils/mockData';

export default {
  title: 'Sections/Payment Method Panel',
  component: PaymentMethodPanel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The PaymentMethodPanel component is used in checkout flows to display payment options for a delivery. 
It allows users to select different payment methods and see details about the products included in their order.

### Features
- Displays payment method options
- Supports enabling/disabling payment methods
- Auto-selects the only enabled payment method
- Shows delivery notes/instructions
- Expandable to show product details
- Displays order total and VAT information
- Responsive design for mobile and desktop
- Unique panel identification for multiple instances

### Usage Note
When using multiple PaymentMethodPanel instances, make sure to provide a unique \`panelid\` prop to each instance to ensure radio button groups work independently.

### Payment Methods
Each payment method object should have the following structure:
\`\`\`js
{
  id: string,      // Unique identifier
  value: string,   // Value to be used when selected
  label: string,   // Display label
  enabled: boolean // Whether this payment method is enabled (optional, defaults to true)
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    paymentmethods: {
      description:
        'Array of payment methods to display. Each method can be enabled/disabled.',
      control: 'object',
    },
    deliverynotes: {
      description: 'Multi-line text for delivery notes or instructions',
      control: 'text',
    },
    title: {
      description: 'Title for the panel',
      control: 'text',
    },
    total: {
      description: 'Total price (excluding VAT)',
      control: 'number',
    },
    totalwithvat: {
      description: 'Total price (including VAT)',
      control: 'number',
    },
    products: {
      description: 'Array of product groups to display',
      control: 'object',
    },
    onchange: {
      description: 'Function called when payment method changes',
      action: 'changed',
    },
    classname: {
      description: 'Additional CSS classes',
      control: 'text',
    },
    panelid: {
      description:
        'Unique identifier for the panel (used to create unique radio group names)',
      control: 'text',
    },
  },
};

const Template = (args) => {
  const [paymentMethod, setPaymentMethod] = useState(
    args.paymentmethods?.[0]?.value || '',
  );

  return (
    <div className="tw:bg-secondary-1000 tw:p-4">
      <PaymentMethodPanel
        {...args}
        onchange={(value) => {
          setPaymentMethod(value);
          if (args.onchange) {
            args.onchange(value);
          }
        }}
      />
      {paymentMethod && (
        <div className="tw:mt-4 tw:rounded-xl tw:bg-white tw:p-4">
          <p>Selected payment method: {paymentMethod}</p>
        </div>
      )}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  panelid: 'default-panel',
  paymentmethods: [
    {
      id: 'payment-card',
      value: 'card',
      label: 'Pay by card',
      enabled: true,
    },
    {
      id: 'payment-account',
      value: 'account',
      label: 'Add to account',
      enabled: true,
    },
  ],
  title: 'Standard Delivery',
  deliverynotes:
    'Will be delivered to the main entrance.\nItems should be kept at room temperature.',
  total: 142.5,
  totalwithvat: 171.0,
  products: CheckoutProductsList,
};

export const WithDisabledPaymentMethod = Template.bind({});
WithDisabledPaymentMethod.args = {
  ...Default.args,
  panelid: 'disabled-method-panel',
  paymentmethods: [
    {
      id: 'payment-card',
      value: 'card',
      label: 'Pay by card',
      enabled: true,
    },
    {
      id: 'payment-account',
      value: 'account',
      label: 'Add to account',
      enabled: false,
    },
  ],
};

export const WithDeliveryNotes = Template.bind({});
WithDeliveryNotes.args = {
  ...Default.args,
  panelid: 'delivery-notes-panel',
  title: null,
  deliverynotes:
    'Please deliver to the back door.\nItems require refrigeration.\nCall 5 minutes before arrival.',
};

export const SinglePaymentMethod = Template.bind({});
SinglePaymentMethod.args = {
  ...Default.args,
  panelid: 'single-method-panel',
  paymentmethods: [
    {
      id: 'payment-card',
      value: 'card',
      label: 'Pay by card',
      enabled: true,
    },
  ],
};

export const WithTag = Template.bind({});
WithTag.args = {
  ...Default.args,
  panelid: 'marketplace-panel',
  tag: 'Marketplace',
};

export const CustomClass = Template.bind({});
CustomClass.args = {
  ...Default.args,
  panelid: 'custom-panel',
  classname: 'tw:border-2 tw:border-primary-500',
};

// Example of multiple panels with different payment method configurations
export const MultiplePanels = () => {
  return (
    <div className="tw:space-y-4 tw:bg-secondary-1000 tw:p-4">
      <PaymentMethodPanel
        panelid="panel-1"
        paymentmethods={[
          {
            id: 'payment-card',
            value: 'card',
            label: 'Pay by card',
            enabled: true,
          },
          {
            id: 'payment-account',
            value: 'account',
            label: 'Add to account',
            enabled: true,
          },
        ]}
        title="First Delivery"
        deliverynotes="Will be delivered to the main entrance.\nItems should be kept at room temperature."
        total={142.5}
        totalwithvat={171.0}
        products={CheckoutProductsList}
      />
      <PaymentMethodPanel
        panelid="panel-2"
        paymentmethods={[
          {
            id: 'payment-card',
            value: 'card',
            label: 'Pay by card',
            enabled: true,
          },
          {
            id: 'payment-account',
            value: 'account',
            label: 'Add to account',
            enabled: false,
          },
        ]}
        title="Second Delivery"
        deliverynotes="Will be delivered to the main entrance.\nItems require refrigeration."
        total={75.0}
        totalwithvat={90.0}
        products={CheckoutProductsList}
      />
    </div>
  );
};
