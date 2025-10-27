import { h, Fragment } from 'preact';
import { cn, formatCurrency } from '../../../utils/helpers';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';

/**
 * PresellSummary Component
 * @description A summary component for presell orders showing different states and variants
 * @param {Object} props - Component props
 * @param {string} [props.step="empty"] - Step state: "empty" | "update" | "done" | "full"
 * @param {boolean} [props.locked=false] - Whether changes are locked
 * @param {string} [props.status="not_ordered"] - Order status: "not_ordered" | "order_placed" | "none"
 * @param {string} [props.title="Pre-sell summary"] - Title text
 * @param {string} [props.closingdate="Wed 10 Sep"] - Closing date text
 * @param {Array} [props.drops=[]] - Array of drop data objects
 * @param {number} [props.guidevatamount=0] - Guide total including VAT
 * @param {number} [props.guideamount=0] - Guide total excluding VAT
 * @param {JSX.Element} [props.tag=null] - Custom Tag component to display status
 * @param {Array<JSX.Element>} [props.buttons=[]] - Array of custom Button components for actions
 * @param {string} [props.footnote] - footnote text
 * @param {string} [props.classname] - Additional CSS classes
 * @returns {JSX.Element} The PresellSummary component
 */

const PresellSummary = ({
  step = 'empty',
  locked = false,
  status = 'not_ordered',
  title = 'Pre-sell summary',
  closingdate = 'Wed 10 Sep',
  drops = [],
  guidevatamount = 0,
  guideamount = 0,
  tag = null,
  buttons = [],
  footnote = '*Prices are only guides. The final payment is the price you would pay if you shopped on the day of your delivery or collection.',
  classname,
  ...props
}) => {
  return (
    <div
      className={cn(
        'tw:flex tw:flex-col tw:gap-5 tw:rounded-[20px] tw:bg-white tw:p-4 tw:lg:gap-8 tw:lg:p-6',
        classname,
      )}
      {...props}
    >
      {/* Header */}
      <div className="tw:flex tw:flex-col tw:gap-3 tw:lg:gap-4">
        {/* Title */}
        <h2 className="tw:text-xl tw:leading-[1.2] tw:font-semibold tw:text-black-1000 tw:lg:text-3xl">
          {title}
        </h2>

        {/* Status tag */}
        <div className="tw:flex tw:w-full tw:flex-row tw:items-start tw:justify-start">
          {status !== 'none' &&
            tag &&
            (typeof tag === 'function' ? tag() : tag)}
        </div>

        {/* Lock indicator or closing date */}
        {locked ? (
          <div className="tw:flex tw:items-center tw:gap-2">
            <Icons.lock classname="tw:h-4 tw:w-4" />
            <span className="tw:text-lg tw:leading-[1.4] tw:font-normal">
              Cannot make changes
            </span>
          </div>
        ) : (
          <div className="tw:flex tw:w-full tw:items-end tw:justify-between">
            <span className="tw:text-lg tw:leading-[1.4] tw:font-normal">
              Closing date
            </span>
            <span className="tw:text-lg tw:leading-[1.4] tw:font-medium">
              {closingdate}
            </span>
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="tw:flex tw:flex-col tw:gap-3 tw:border-t tw:border-dashed tw:border-secondary-1300 tw:pt-5 tw:lg:gap-4 tw:lg:pt-8">
        {step === 'empty' ? (
          <div className="tw:flex tw:w-full tw:items-center tw:justify-between">
            <span className="tw:text-base tw:leading-none tw:font-normal tw:lg:text-lg">
              Nothing ordered
            </span>
            <span className="tw:w-[120px] tw:text-right tw:text-base tw:leading-none tw:font-normal tw:lg:text-lg">
              0
            </span>
          </div>
        ) : (
          <Fragment>
            {/* Drop table headers */}
            <div className="tw:flex tw:w-full tw:items-center tw:gap-2">
              <div className="tw:w-40 tw:text-base tw:leading-none tw:font-medium tw:lg:w-[205px] tw:lg:text-lg">
                Drop
              </div>
              <div className="tw:w-[43px] tw:text-right tw:text-base tw:leading-none tw:font-medium tw:lg:w-[50px] tw:lg:text-lg">
                Qty
              </div>
              <div className="tw:flex-1 tw:text-right tw:text-base tw:leading-none tw:font-medium tw:lg:text-lg">
                Total
              </div>
            </div>

            {/* Drop rows */}
            {drops &&
              drops.length > 0 &&
              drops.map((drop, index) => (
                <div
                  key={index}
                  className="tw:flex tw:w-full tw:items-center tw:gap-2 tw:leading-none tw:font-normal"
                >
                  <div className="tw:flex tw:w-40 tw:items-baseline tw:gap-3 tw:text-base tw:lg:w-[205px] tw:lg:text-lg">
                    <span className="tw:text-black-1000">{drop.name}</span>
                    <span className="tw:text-2xs tw:text-grey-600 tw:lg:text-sm">
                      {drop.date}
                    </span>
                  </div>
                  <div className="tw:w-[43px] tw:text-right tw:text-base tw:text-black-1000 tw:lg:w-[50px] tw:lg:text-lg">
                    {drop.quantity}
                  </div>
                  <div className="tw:flex-1 tw:text-right tw:text-base tw:text-black-1000 tw:lg:text-lg">
                    {formatCurrency(drop.total)}
                  </div>
                </div>
              ))}
          </Fragment>
        )}
      </div>

      {/* VAT Total */}
      {!(
        step === 'empty' ||
        (step === 'done' && status === 'order_placed' && !locked)
      ) && (
        <div className="tw:flex tw:flex-col tw:gap-3 tw:border-t tw:border-dashed tw:border-secondary-1300 tw:pt-5 tw:lg:gap-4 tw:lg:pt-8">
          <div className="tw:flex tw:w-full tw:items-center tw:justify-between">
            <span className="tw:text-base tw:leading-none tw:font-normal tw:lg:text-lg">
              Guide total incl. VAT*
            </span>
            <span className="tw:w-[120px] tw:text-right tw:text-base tw:leading-none tw:font-normal tw:lg:text-lg">
              {formatCurrency(guidevatamount)}
            </span>
          </div>
        </div>
      )}

      {/* Final Total */}
      <div className="tw:flex tw:flex-col tw:gap-3 tw:lg:gap-4">
        <div className="tw:flex tw:w-full tw:items-center tw:justify-between">
          <span className="tw:text-lg tw:leading-[1.2] tw:font-bold tw:lg:text-xl">
            {step === 'empty' ? 'Total' : 'Guide total excl. VAT*'}
          </span>
          <span className="tw:w-[120px] tw:text-right tw:text-lg tw:leading-[1.2] tw:font-bold tw:lg:text-xl">
            {formatCurrency(guideamount)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      {step !== 'empty' &&
        step !== 'done' &&
        (buttons && buttons.length > 0 ? (
          <div className="tw:flex tw:w-full tw:flex-col tw:gap-3">
            {buttons.map((button, index) => (
              <div key={index} className="tw:w-full">
                {button}
              </div>
            ))}
          </div>
        ) : (
          <div className="tw:flex tw:w-full tw:flex-col tw:gap-3">
            <Button
              label="Place order"
              variant="tertiary"
              size="default"
              classname="tw:w-full"
            />
            <Button
              label="Cancel changes"
              variant="secondary"
              size="default"
              classname="tw:w-full"
            />
          </div>
        ))}

      {/* footnote */}
      <div className="tw:text-[13px] tw:leading-[1.4] tw:font-normal tw:text-black-1000 tw:lg:text-base">
        {footnote}
      </div>
    </div>
  );
};

export default PresellSummary;
