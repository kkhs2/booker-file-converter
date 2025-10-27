import { h, Fragment } from 'preact';
import Tag from '../Tag/Tag';
import Icons from '../Icons/Icons';
import { formatCurrency } from '../../../utils/helpers';
import { cn } from '../../../utils/helpers';

/**
 * OrderInvoiceCard component
 * @description The OrderInvoiceCard component displays a summary of an order invoice, including details like date, invoice number, price, and items. It is designed to be used in a list format, allowing users to quickly view and manage their invoices.
 * @param {string} date - The date of the invoice.
 * @param {string} invoiceno - The invoice number.
 * @param {number} priceexclvat - The price excluding VAT.
 * @param {number} priceinclvat - The price including VAT.
 * @param {number} items - The number of items in the invoice.
 * @param {string} tag - The tag to display on the card.
 * @param {function} onclick - The function to call when the card is clicked.
 * @param {function} classname - Additional classes to add to the component.
 * @returns {JSX.Element} The OrderInvoiceCard component.
 */

const OrderInvoiceCard = ({
  date,
  invoiceno,
  priceexclvat,
  priceinclvat,
  items,
  tag,
  onclick,
  classname,
}) => {
  return (
    <div
      className={cn(
        'tw:relative tw:flex tw:items-center tw:justify-between tw:rounded-[20px] tw:bg-white tw:py-3 tw:pl-4 tw:max-lg:gap-x-4 tw:lg:rounded-none tw:lg:px-6 tw:lg:py-4 tw:lg:pr-0 tw:lg:first:rounded-tl-[20px] tw:lg:first:rounded-tr-[20px] tw:lg:last:rounded-br-[20px] tw:lg:last:rounded-bl-[20px]',
        classname,
      )}
    >
      <div className="tw:flex tw:w-full tw:flex-col tw:justify-between tw:gap-4 tw:lg:flex-row tw:lg:items-center">
        <div className="tw:full tw:flex tw:flex-col tw:gap-2 tw:lg:flex-row tw:lg:gap-10">
          <div className="tw:flex tw:justify-between tw:lg:flex-row tw:lg:justify-start tw:lg:gap-1">
            <span className="tw:text-base tw:font-light tw:lg:text-lg">
              Date:
            </span>
            <span className="tw:text-base tw:font-semibold tw:lg:text-lg">
              {date}
            </span>
          </div>
          <div className="tw:flex tw:justify-between tw:lg:flex-row tw:lg:justify-start tw:lg:gap-1">
            <span className="tw:text-base tw:font-light tw:lg:text-lg">
              Invoice No.
            </span>
            <span className="tw:text-base tw:font-semibold tw:lg:text-lg">
              {invoiceno}
            </span>
          </div>

          <div className="tw:flex tw:justify-between tw:lg:items-start tw:lg:gap-1">
            <span className="tw:text-base tw:font-light tw:lg:text-lg">
              Price:
            </span>
            <div className="tw:flex tw:flex-col tw:items-end tw:gap-2 tw:lg:flex-row tw:lg:items-center">
              <span className="tw:text-base tw:font-bold tw:lg:text-lg">
                {formatCurrency(priceexclvat)}
              </span>
              <span className="tw:text-base tw:font-light tw:lg:text-lg">
                {formatCurrency(priceinclvat)} incl. VAT
              </span>
            </div>
          </div>
        </div>

        <div className="tw:flex tw:w-full tw:items-center tw:justify-between tw:lg:mt-0 tw:lg:max-w-[160px] tw:lg:min-w-[80px] tw:lg:flex-grow tw:lg:justify-end tw:lg:pt-0">
          <span className="tw:text-base tw:font-light tw:lg:text-lg">Qty:</span>
          <span className="tw:text-base tw:font-semibold tw:lg:text-lg">{`${items} ${items === 1 ? 'item' : 'items'}`}</span>
        </div>

        <div className="tw:mt-4 tw:flex tw:items-center tw:justify-end tw:gap-2 tw:lg:mt-0 tw:lg:ml-auto tw:lg:gap-0">
          {tag && <Tag label={tag} variant="lightPrimary" size="small" />}
        </div>
      </div>

      <button
        className="tw:shrink-0 tw:cursor-pointer tw:p-4 tw:lg:p-6"
        onClick={onclick}
      >
        <Icons.chevronRight classname="tw:w-4 tw:h-4" />
      </button>
    </div>
  );
};

export default OrderInvoiceCard;
