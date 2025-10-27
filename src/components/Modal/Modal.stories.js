import Button from '../Button/Button';
import { Modal } from './Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A dialog component for showing content, descriptions, and custom actions.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    title: { control: 'text', description: 'Modal title' },
    description: {
      control: 'text',
      description: 'Optional description text below the title',
    },
    isopen: {
      control: 'boolean',
      description: 'Controls whether the modal is visible',
    },
    classname: {
      control: 'text',
      description: 'Additional CSS classes for modal container',
    },
    onclose: {
      control: false,
      description: 'Callback when modal is requested to close',
    },
    children: {
      control: false,
      description: 'Content to render inside the modal body',
    },
    buttonscomponent: {
      control: false,
      description: 'Render prop for custom footer buttons',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'error', 'productList'],
      description: 'Modal style variant',
    },
  },
};

export const Default = {
  args: {
    title: 'Modal Title',
    isopen: true,
    onclose: () => alert('Modal closed'),
  },
};

export const WithDescription = {
  args: {
    ...Default.args,
    description:
      'This is a sample description to provide more context in the modal.',
  },
};

export const WithChildren = {
  render: (args) => (
    <Modal {...args}>
      <p>
        This is <strong>custom content</strong> inside the modal.
      </p>
    </Modal>
  ),
  args: {
    ...Default.args,
  },
};

export const WithButtons = {
  render: (args) => (
    <Modal
      {...args}
      buttonscomponent={() => (
        <>
          <Button
            onClick={() => alert('Canceled')}
            label="Cancel"
            variant="secondary"
          />
          <Button onClick={args.onclose} label="Confirm" variant="tertiary" />
        </>
      )}
    >
      <p>Confirm this action?</p>
    </Modal>
  ),
  args: {
    ...Default.args,
  },
};

export const ErrorVariant = {
  args: {
    ...Default.args, // Reuse default onclose and isopen
    title: 'Payment failed',
    description:
      'Sorry, we were unable to process your online payment at this time.\n\nThis was an error when trying to authorise the entered card details with your debit/credit card provider:\n\nPlease try again or contact your debit/credit card provider to diagnose the problem further.',
    variant: 'error',
    buttonscomponent: () => (
      <Button
        onClick={() => alert('Trying again...')}
        label="Try again"
        variant="tertiary"
        // Assuming 'tertiary' gives the black background style from the image
        // You might need to adjust the button variant/styling
      />
    ),
  },
};

export const HowToShopModal = {
  render: (args) => (
    <Modal
      {...args}
      classname="tw:max-w-[600px]"
      buttonscomponent={() => (
        <Button
          onClick={args.onclose}
          label="Cancel"
          variant="secondary"
          size="default"
        />
      )}
    >
      <div className="tw:space-y-6">
        {/* Delivery Section */}
        <div className="tw:space-y-4">
          <div className="tw:space-y-2">
            <p className="tw:text-base tw:text-black-1000">
              You are not currently able to order online for delivery.
            </p>
            <p className="tw:text-base tw:text-black-1000">
              To request ongoing deliveries please click Request Deliveries.
              Your Branch Manager will contact you to discuss your requirements.
            </p>
          </div>
          <div className="tw:flex">
            <Button
              onClick={() => alert('Request Deliveries clicked')}
              label="Request Deliveries"
              variant="primary"
              size="default"
              classname="tw:min-w-[200px]"
            />
          </div>
        </div>

        {/* Collection Section */}
        <div className="tw:space-y-4">
          <p className="tw:text-base tw:text-black-1000">
            To place an order for collection in-branch click Collect.
          </p>
          <p className="tw:text-sm tw:leading-relaxed tw:text-black-1000">
            A minimum order value of £100 is applicable on collect orders. There
            is no minimum if your order only contains Online Exclusive products.
            Online Exclusive products are not stocked in your chosen branch.
            They are ordered in for you and will normally be available for
            collection within 2 - 4 days. Simply add them to your order and
            we'll let you know when they're in.
          </p>
          <div className="tw:flex">
            <Button
              onClick={() => alert('Collect clicked')}
              label="Collect"
              variant="primary"
              size="default"
              classname="tw:min-w-[200px]"
            />
          </div>
        </div>
      </div>
    </Modal>
  ),
  args: {
    title: 'How to shop with Booker',
    isopen: true,
    onclose: () => alert('Modal closed'),
    showclosebutton: true,
  },
};
