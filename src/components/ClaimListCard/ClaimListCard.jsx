import { h, Fragment } from 'preact';
import { formatCurrency, useMediaQuery } from '../../../utils/helpers';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';

/**
 * ClaimListCard Component
 * Displays a summary of a claim, adapting layout for mobile and desktop.
 *
 * @param {Object} props - Component props
 * @param {string} props.claimnumber - The claim number.
 * @param {string} props.dateraised - The date the claim was raised.
 * @param {string} props.invoicenumber - The invoice number.
 * @param {string} props.invoicedate - The date of the invoice.
 * @param {number} props.amountexclvat - The claim amount excluding VAT.
 * @param {number} props.amountinclvat - The claim amount including VAT.
 * @param {number} props.productsclaimed - The number of products claimed.
 * @param {string} [props.message] - An optional message from the reviewer.
 * @param {string} props.closedon - The date the claim was closed.
 * @param {Function} [props.onclick] - Optional click handler for the card or arrow.
 * @returns {JSX.Element} Preact component
 */
const ClaimListCard = ({
  claimnumber,
  dateraised,
  invoicenumber,
  invoicedate,
  amountexclvat,
  amountinclvat,
  productsclaimed,
  message,
  closedon,
  onclick,
}) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  return (
    <div className="tw:rounded-[20px] tw:bg-white tw:p-5 tw:shadow-[16px_32px_56px_-24px_rgba(0,0,0,0.10)] tw:lg:p-8">
      {isMobile ? (
        <div className="tw:flex tw:flex-col tw:space-y-4 tw:lg:hidden">
          <div className="tw:flex tw:items-start tw:justify-between">
            <div>
              <span className="tw:text-lg tw:text-grey-600">Claim number</span>
              <p className="tw:text-xl tw:font-bold">{claimnumber}</p>
            </div>
            {closedon ? (
              <span className="tw:inline-block tw:rounded-[120px] tw:bg-beige-1000 tw:px-2.5 tw:py-2 tw:text-sm tw:leading-none tw:font-semibold tw:text-black">
                {closedon}
              </span>
            ) : (
              <span className="tw:inline-block tw:rounded-[120px] tw:bg-primary tw:px-2.5 tw:py-2 tw:text-sm tw:leading-none tw:font-semibold tw:text-white">
                Open
              </span>
            )}
          </div>
          <p className="tw:text-[13px] tw:text-grey-800">
            Date raised {dateraised}
          </p>

          <div>
            <span className="tw:text-lg tw:text-grey-600">Invoice number</span>
            <p className="tw:text-xl tw:font-bold">{invoicenumber}</p>
          </div>
          <p className="tw:text-[13px] tw:text-grey-800">
            Invoice date {invoicedate}
          </p>

          <div className="tw:mt-8 tw:flex tw:items-end tw:justify-between">
            <div>
              <p className="tw:text-xl tw:font-bold">
                {formatCurrency(amountexclvat)}
              </p>
              <p className="tw:text-lg tw:text-grey-600">
                {formatCurrency(amountinclvat)} incl. VAT
              </p>
              <p className="tw:mt-4 tw:text-[13px] tw:text-grey-800">
                {productsclaimed} products claimed
              </p>
            </div>
            <Button
              variant="tertiary"
              iconleft={<Icons.chevronRight classname="tw:w-4 tw:h-4" />}
              onclick={onclick}
            />
          </div>

          {message && (
            <div className="tw:border-t tw:border-dotted tw:border-gray-200 tw:pt-3">
              <p className="tw:text-sm tw:text-gray-600">{message}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="tw:flex tw:flex-col tw:items-start tw:space-y-4">
          {closedon ? (
            <span className="tw:inline-block tw:rounded-[120px] tw:bg-beige-1000 tw:px-2.5 tw:py-2 tw:text-sm tw:leading-none tw:font-semibold tw:text-black">
              {closedon}
            </span>
          ) : (
            <span className="tw:inline-block tw:rounded-[120px] tw:bg-primary tw:px-2.5 tw:py-2 tw:text-sm tw:leading-none tw:font-semibold tw:text-white">
              Open
            </span>
          )}
          <div className="tw:flex tw:w-full tw:items-start tw:justify-between">
            <div className="tw:flex tw:items-start tw:space-x-8">
              {/* Claim Info */}
              <div>
                <span className="tw:text-sm tw:text-grey-600">
                  Claim number
                </span>

                <p className="tw:text-3xl tw:font-bold">{claimnumber}</p>
                <p className="tw:mt-4 tw:text-base tw:text-grey-800">
                  Date raised {dateraised}
                </p>
              </div>

              {/* Invoice Info */}
              <div>
                <span className="tw:text-sm tw:text-grey-600">
                  Invoice number
                </span>
                <p className="tw:text-3xl tw:font-bold">{invoicenumber}</p>
                <p className="tw:mt-4 tw:text-base tw:text-grey-800">
                  Invoice date {invoicedate}
                </p>
              </div>
            </div>

            {/* Amount Info & Action */}
            <div className="tw:flex tw:items-center tw:space-x-10">
              <div className="tw:text-right">
                <p className="tw:text-3xl tw:font-bold">
                  {formatCurrency(amountexclvat)}
                </p>
                <p className="tw:text-lg tw:text-grey-600">
                  {formatCurrency(amountinclvat)} incl. VAT
                </p>
                <p className="tw:mt-4 tw:text-base tw:text-grey-800">
                  {productsclaimed} products claimed
                </p>
              </div>
              <Button
                variant="tertiary"
                iconleft={<Icons.chevronRight classname="tw:w-4 tw:h-4" />}
                onclick={onclick}
              />
            </div>
          </div>

          {message && (
            <div className="tw:w-full tw:border-t tw:border-dotted tw:border-gray-200 tw:pt-4">
              <p className="tw:text-sm tw:text-gray-600">{message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClaimListCard;
