import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { PaymentMethodsRadioGroup } from './PaymentMethodsRadioGroup';
import { doc } from 'prettier';

export default {
  title: 'Sections/Payment Method Selection',
  component: PaymentMethodsRadioGroup,
  tags: ['autodocs'],
  argTypes: {
    isloading: {
      control: { type: 'boolean' },
      description: 'Whether the new payment method iframe is loading',
    },
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#FAF9F5',
        },
      ],
    },
    docs: {
      description: {
        component: `
The PaymentMethodsRadioGroup component is a specialized radio group for payment methods selection that displays cards with details. 
It's designed for checkout flows and payment method selection pages.

### Features
- Displays payment cards with details (card number, expiry date, name)
- Supports different payment types (credit cards, Apple Pay)
- Option to add a new payment method
- Optional "Save card details" checkbox
- Custom styling for selected state

### Payment HTML Container

When a payment card (existing or new) is selected, a \`<div id="payment-html-{id}"></div>\` is rendered below the selected card. This container is intended for mounting a third-party payment form via JavaScript. You can use this container to inject or mount your payment provider's UI components dynamically when the user chooses to pay with a card. The id will be \`payment-html-\<card id\>\` for existing cards and \`payment-html-new-card\` for the new card option.
`,
      },
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const props = Object.entries(args)
            .map(([key, value]) => {
              if (key === 'paymentMethods') {
                return `${key}={${JSON.stringify(value, null, 2)}}`;
              }
              return `${key}={${JSON.stringify(value)}}`;
            })
            .join('\n  ');

          return `<PaymentMethodsRadioGroup
  ${props}
/>`;
        },
      },
    },
  },
};

const commonPaymentMethods = [
  {
    id: 'card1',
    type: 'card',
    title: 'Main Business Card',
    cardType: 'visa',
    cardholdername: 'Jonathan Smith',
    ending: '8790',
    expiryDate: '12/2027',
  },
  {
    id: 'apple-pay',
    type: 'apple-pay',
    title: 'Apple Pay',
  },
  {
    id: 'new-card',
    type: 'new',
    title: 'Add a new payment card',
  },
];

/**
 * Interactive Example
 *
 * This story demonstrates the PaymentMethodsRadioGroup component with a selection of cards and a save card checkbox.
 *
 */
export const Interactive = {
  render: () => {
    const [selectedMethod, setSelectedMethod] = useState('card1');
    const [isSaveCardChecked, setIsSaveCardChecked] = useState(false);

    useEffect(() => {
      if (selectedMethod === 'new-card') {
        injectIframe('payment-html-new-card', 'https://booker.co.uk');
      }
    }, [selectedMethod]);

    return (
      <div className="tw:max-w-[1220px] tw:space-y-4">
        <PaymentMethodsRadioGroup
          paymentmethods={commonPaymentMethods}
          defaultvalue={selectedMethod}
          onchange={(value) => setSelectedMethod(value)}
          onsavecardchange={(checked) => setIsSaveCardChecked(checked)}
        />

        <div className="tw:mt-6 tw:rounded-md tw:bg-white tw:p-4">
          <div className="tw:font-medium">Selected payment method:</div>
          <div>{selectedMethod}</div>
          <div className="tw:mt-2">
            Save card: {isSaveCardChecked ? 'Yes' : 'No'}
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Default Example
 *
 * This story demonstrates the PaymentMethodsRadioGroup component with the default value set to "card1".
 *
 */
export const Default = {
  render: () => {
    const [selectedMethod, setSelectedMethod] = useState('card1');

    useEffect(() => {
      if (selectedMethod === 'new-card') {
        injectIframe('payment-html-new-card', 'https://booker.co.uk');
      }
    }, [selectedMethod]);

    return (
      <div className="tw:max-w-[1220px] tw:space-y-4">
        <PaymentMethodsRadioGroup
          paymentmethods={commonPaymentMethods}
          defaultvalue="card1"
          onchange={(value) => setSelectedMethod(value)}
        />
      </div>
    );
  },
};

/**
 * No Default Selection
 *
 * This story demonstrates the PaymentMethodsRadioGroup component with no default selection.
 *
 */
export const NoDefaultSelection = {
  render: () => {
    const [selectedMethod, setSelectedMethod] = useState('');

    useEffect(() => {
      if (selectedMethod === 'new-card') {
        injectIframe('payment-html-new-card', 'https://booker.co.uk');
      }
    }, [selectedMethod]);

    return (
      <div className="tw:max-w-[1220px] tw:space-y-4">
        <PaymentMethodsRadioGroup
          paymentmethods={commonPaymentMethods}
          onchange={(value) => setSelectedMethod(value)}
        />
      </div>
    );
  },
};

/**
 * Multiple Cards
 *
 * This story demonstrates the PaymentMethodsRadioGroup component with multiple cards.
 *
 */
export const MultipleCards = {
  render: () => {
    const [selectedMethod, setSelectedMethod] = useState('card2');

    useEffect(() => {
      if (selectedMethod === 'new-card') {
        injectIframe('payment-html-new-card', 'https://booker.co.uk');
      }
    }, [selectedMethod]);

    return (
      <div className="tw:max-w-[1220px] tw:space-y-4">
        <PaymentMethodsRadioGroup
          paymentmethods={[
            {
              id: 'card1',
              type: 'card',
              title: 'Main Business Card',
              cardType: 'visa',
              cardholdername: 'Jonathan Smith',
              ending: '8790',
              expiryDate: '12/2027',
            },
            {
              id: 'card2',
              type: 'card',
              cardType: 'mastercard',
              title: 'Personal Credit Card',
              cardholdername: 'Jonathan Smith',
              ending: '4321',
              expiryDate: '09/2026',
            },
            {
              id: 'apple-pay',
              type: 'apple-pay',
              title: 'Apple Pay',
            },
            {
              id: 'new-card',
              type: 'new',
              title: 'Add a new payment card',
            },
          ]}
          defaultvalue="card2"
          onchange={(value) => setSelectedMethod(value)}
        />
      </div>
    );
  },
};

// Helper to inject an iframe into the payment-html container
const injectIframe = (containerId, url) => {
  setTimeout(() => {
    const container = document.getElementById(containerId);

    if (container && !container.querySelector('iframe')) {
      const wrapper = document.createElement('div');
      wrapper.style.padding = '0 16px 16px 16px';
      wrapper.style.marginTop = '-16px';
      container.appendChild(wrapper);

      const iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.width = '100%';
      iframe.height = '400';
      iframe.style.border = '1px solid #ccc';
      wrapper.appendChild(iframe);
    } else if (!container) {
      console.error('Container not found:', containerId);
    } else {
      console.log('Container already has iframe:', containerId);
    }
  }, 100);
};

/**
 * Card Selection with Iframes
 *
 * This story demonstrates the PaymentMethodsRadioGroup component with a selection of cards and an iframe for each card.
 * The iframe is injected into the payment-html container when the card is selected.
 *
 */
export const CardSelectionWithIframes = {
  render: () => {
    const [selectedMethod, setSelectedMethod] = useState('card1');
    useEffect(() => {
      if (selectedMethod === 'new-card') {
        injectIframe('payment-html-new-card', 'https://booker.co.uk');
      }
    }, [selectedMethod]);
    return (
      <div className="tw:max-w-[1220px] tw:space-y-4">
        <PaymentMethodsRadioGroup
          paymentmethods={[
            {
              id: 'card1',
              type: 'card',
              title: 'Main Business Card',
              cardType: 'visa',
              cardholdername: 'Jonathan Smith',
              ending: '8790',
              expiryDate: '12/2027',
            },
            {
              id: 'card2',
              type: 'card',
              cardType: 'mastercard',
              title: 'Personal Credit Card',
              cardholdername: 'Jonathan Smith',
              ending: '4321',
              expiryDate: '09/2026',
            },
            {
              id: 'new-card',
              type: 'new',
              title: 'Add a new payment card',
            },
          ]}
          defaultvalue="card1"
          onchange={setSelectedMethod}
        />
      </div>
    );
  },
};

/**
 * Loading State
 *
 * This story demonstrates the PaymentMethodsRadioGroup component with loading state active for new card.
 * The loading overlay only shows when a new payment method is selected and loading is true.
 *
 */
export const LoadingState = {
  render: () => {
    const [selectedMethod, setSelectedMethod] = useState('card1');
    useEffect(() => {
      if (selectedMethod === 'new-card') {
        injectIframe('payment-html-new-card', 'https://booker.co.uk');
      }
    }, [selectedMethod]);
    return (
      <div className="tw:max-w-[1220px] tw:space-y-4">
        <PaymentMethodsRadioGroup
          paymentmethods={[
            {
              id: 'card1',
              type: 'card',
              title: 'Main Business Card',
              cardType: 'visa',
              cardholdername: 'Jonathan Smith',
              ending: '8790',
              expiryDate: '12/2027',
            },
            {
              id: 'new-card',
              type: 'new',
              title: 'Add a new payment card',
            },
          ]}
          isloading={true}
          defaultvalue="card1"
          onchange={setSelectedMethod}
        />
      </div>
    );
  },
};
