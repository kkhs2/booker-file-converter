/**
 * PaymentSummary component displays a summary of payment details, including invoices and card information.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.invoices - An array of invoice objects. Each invoice object should have the following properties:
 *   @param {string} props.invoices[].invoiceNo - The invoice number.
 *   @param {string} props.invoices[].date - The date of the invoice.
 *   @param {string} props.invoices[].branch - The branch associated with the invoice.
 *   @param {string} props.invoices[].subTotal - The subtotal amount (including VAT) as a string.
 * @param {boolean} [props.defaultOpen=false] - Determines whether the payment summary is open by default.
 * @param {Object} [props.card] - The card information used for payment. If provided, it should have the following properties:
 *   @param {string} props.card.cardType - The type of the card (e.g., 'visa', 'mastercard').
 *   @param {string} props.card.title - The title or name of the card.
 *   @param {string} props.card.ending - The last digits of the card number.
 *
 * @returns {JSX.Element} The PaymentSummary component.
 */

import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { cn } from '../../../../utils/helpers';
import Icons from '../../Icons/Icons';
import Typography from '../../Typography/Typography';

const PaymentSummary = ({ invoices = [], defaultOpen = false, card }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const total = invoices.reduce((acc, invoice) => {
    const invoiceTotal = parseFloat(invoice.subTotal.replace(/[^0-9.-]+/g, ''));
    return acc + invoiceTotal;
  }, 0);

  const cardIcon = (type) => {
    if (type === 'visa') {
      return <Icons.visa classname="tw:h-10 tw:w-[62px] tw:shrink-0" />;
    }
    if (type === 'mastercard') {
      return <Icons.mastercard classname="tw:h-10 tw:w-[62px] tw:shrink-0" />;
    }
    return null;
  };

  return (
    <div className="tw:rounded-xl tw:bg-beige-1000 tw:px-3 tw:py-4 tw:lg:px-4 tw:lg:py-6">
      <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:px-2">
        <Typography content="Payment summary" domtype="h6" />

        <button
          className="tw:cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icons.chevronUp
            classname={cn(
              'tw:h-6 tw:w-6 tw:transition-transform',
              !isOpen && 'tw:rotate-180',
            )}
          />
        </button>
      </div>

      <div className={cn(!isOpen && 'tw:h-0 tw:overflow-hidden')}>
        <div className="tw:mt-4 tw:mb-4 tw:border-t tw:border-dotted tw:border-black/20 tw:lg:mx-2 tw:lg:mb-6">
          <p className="tw:mt-4 tw:text-base">
            You paid for <strong>{invoices.length}</strong> invoices totalling{' '}
            <strong>£{total}</strong> (including VAT).
          </p>
        </div>

        <div>
          {invoices.map((invoice, index) => (
            <div
              key={index}
              className="tw:mb-2 tw:flex tw:items-center tw:justify-between tw:gap-3 tw:bg-white tw:p-4 tw:first:rounded-t-[20px] tw:max-lg:flex-col tw:max-lg:rounded-[20px] tw:lg:mb-0.5 tw:lg:gap-10 tw:lg:p-6"
            >
              <div className="tw:flex tw:items-center tw:gap-1 tw:max-lg:w-full tw:max-lg:justify-between">
                <p className="tw:font-light">Invoice no:</p>
                <strong>{invoice.invoiceNo}</strong>
              </div>

              <div className="tw:flex tw:items-center tw:gap-1 tw:max-lg:w-full tw:max-lg:justify-between">
                <p className="tw:font-light">Date:</p>
                <strong>{invoice.date}</strong>
              </div>

              <div className="tw:flex tw:items-center tw:gap-1 tw:max-lg:w-full tw:max-lg:justify-between">
                <p className="tw:font-light">Branch:</p>
                <strong>{invoice.branch}</strong>
              </div>

              <div className="tw:flex tw:items-center tw:gap-10 tw:max-lg:w-full tw:max-lg:justify-between tw:lg:ml-auto">
                <p className="tw:font-light">Sub total (incl VAT):</p>
                <strong>{invoice.subTotal}</strong>
              </div>
            </div>
          ))}

          <div className="tw:flex tw:items-center tw:gap-2 tw:rounded-b-[20px] tw:p-4 tw:lg:justify-end tw:lg:bg-white tw:lg:p-6">
            <div className="tw:flex tw:items-center tw:gap-10 tw:max-lg:w-full tw:max-lg:justify-between">
              <p className="tw:font-bold">Total to pay:</p>
              <strong>£{total}</strong>
            </div>
          </div>
        </div>

        {card && (
          <div className="tw:mt-6 tw:space-y-6 tw:rounded-[20px] tw:bg-white tw:px-6 tw:py-3">
            <div className="tw:flex tw:items-center tw:gap-2 tw:py-2">
              {cardIcon(card.cardType)}{' '}
              <p>
                Payment card used was <strong>{card.title}</strong>,{' '}
                <strong>{card.cardType}</strong> ending{' '}
                <strong>{card.ending}</strong>.
              </p>
            </div>
            <div className="tw:flex tw:items-center tw:gap-3 tw:max-lg:flex-col">
              <div className="tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:gap-3 tw:rounded-xl tw:border tw:border-secondary-1300 tw:px-4 tw:py-5 tw:font-medium tw:transition-colors tw:hover:border-secondary-1000 tw:hover:bg-secondary-1000">
                <Icons.download /> <p>Download payment summary as .PDF</p>
                <img src="./images/pdf-icon.png" className="tw:ml-auto" />
              </div>
              <div className="tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:gap-3 tw:rounded-xl tw:border tw:border-secondary-1300 tw:px-4 tw:py-5 tw:font-medium tw:transition-colors tw:hover:border-secondary-1000 tw:hover:bg-secondary-1000">
                <Icons.download /> <p>Download payment summary as .CSV</p>
                <img src="./images/csv-icon.png" className="tw:ml-auto" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSummary;
