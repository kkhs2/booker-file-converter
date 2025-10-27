import { h, Fragment } from 'preact';
import Tag from '../Tag/Tag';
import Icons from '../Icons/Icons';
import { cn } from '../../../utils/helpers';

/**
 * RepOrderSummaryCard component
 * @description The RepOrderSummaryCard component displays a summary of a rep order, including details like date, supplier, rep name, number of items, and a tag. It is designed to be used in a list format, allowing users to quickly view and manage their rep orders.
 * @param {string} date - The date of the invoice.
 * @param {string} supplier - The invoice number.
 * @param {number} repname - The price excluding VAT.
 * @param {number} items - The number of items in the invoice.
 * @param {string} tag - The tag to display on the card.
 * @param {function} onclick - The function to call when the card is clicked.
 * @param {function} classname - Additional classes to add to the component.
 * @returns {JSX.Element} The RepOrderSummaryCard component.
 */

const RepOrderSummaryCard = ({
  date,
  suplier,
  repname,
  items,
  tag,
  onclick,
  classname,
}) => {
  return (
    <div
      className={cn(
        'tw:relative tw:flex tw:items-center tw:justify-between tw:bg-white tw:py-3 tw:pl-6 tw:first:rounded-tl-[20px] tw:first:rounded-tr-[20px] tw:last:rounded-br-[20px] tw:last:rounded-bl-[20px] tw:max-lg:gap-x-4 tw:lg:p-3 tw:lg:pr-0',
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
          <div className="tw:flex tw:justify-between tw:lg:min-w-[360px] tw:lg:flex-row tw:lg:justify-start tw:lg:gap-1">
            <span className="tw:text-base tw:font-light tw:lg:text-lg">
              Supplier:
            </span>
            <span className="tw:text-base tw:font-semibold tw:lg:text-lg">
              {suplier}
            </span>
          </div>

          <div className="tw:flex tw:items-start tw:lg:min-w-[320px] tw:lg:gap-1">
            <span className="tw:text-base tw:font-light tw:lg:text-lg">
              Rep name:
            </span>
            <div className="tw:flex tw:flex-col tw:items-end tw:gap-2 tw:lg:flex-row tw:lg:items-center">
              <span className="tw:text-left tw:text-base tw:font-bold tw:lg:text-lg">
                {repname}
              </span>
            </div>
          </div>
        </div>

        <div className="tw:flex tw:w-full tw:items-center tw:justify-between tw:lg:mt-0 tw:lg:max-w-[160px] tw:lg:min-w-[80px] tw:lg:flex-grow tw:lg:justify-end tw:lg:pt-0">
          <span className="tw:text-base tw:font-semibold tw:lg:text-lg">{`${items} ${items === 1 ? 'item' : 'items'}`}</span>
        </div>

        <div className="tw:mt-4 tw:flex tw:items-center tw:justify-end tw:gap-2 tw:lg:mt-0 tw:lg:ml-auto tw:lg:gap-0">
          {tag && (
            <Tag
              label={tag}
              variant={tag === 'Open' ? 'secondary' : 'default'}
              size="small"
            />
          )}
        </div>
      </div>

      <button
        className="tw:shrink-0 tw:cursor-pointer tw:p-6"
        onClick={onclick}
      >
        <Icons.chevronRight classname="tw:w-4 tw:h-4" />
      </button>
    </div>
  );
};

export default RepOrderSummaryCard;
