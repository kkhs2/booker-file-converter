import { h, Fragment } from 'preact';
import { cn, formatCurrency } from '../../../utils/helpers';
import Button from '../Button/Button';
import Tag from '../Tag/Tag';
import Icons from '../Icons/Icons';
import Typography from '../Typography/Typography';

/**
 * AllocationsSummary Component
 *
 * @description A component that displays allocation summary information with details about products,
 * pricing, and optional action buttons. Supports multiple variants for different use cases.
 *
 * @param {Object} props - Component props
 * @param {string} [props.status] - The allocation status ("Not reviewed", "Confirmed - No Additionals", "Minimum sent", "Confirmed - Additionals")
 * @param {string} [props.changestext] - Text describing when changes can be made
 * @param {boolean} [props.locked=false] - Whether changes are locked
 * @param {number} [props.minimumproducts] - Number of minimum products
 * @param {number} [props.additionalproducts] - Number of additional products
 * @param {number} [props.totalproducts] - Total number of products
 * @param {number} [props.guidetotalinclvat] - Guide total including VAT
 * @param {number} [props.guidetotalexclvat] - Guide total excluding VAT
 * @param {string} [props.footnote] - Disclaimer footnote text
 * @param {boolean} [props.showactions] - Whether to show action buttons
 * @param {string} [props.savebuttonlabel] - Label for save button
 * @param {string} [props.discardbuttonlabel] - Label for discard button
 * @param {function} [props.onsave] - Callback for save action
 * @param {function} [props.ondiscard] - Callback for discard action
 * @param {JSX.Element} [props.tag] - Custom tag component to display status
 * @param {string} [props.classname] - Additional classes to add to the component
 * @returns {JSX.Element} Preact component - The AllocationsSummary component
 */

const AllocationsSummary = ({
  status,
  changestext,
  locked = false,
  minimumproducts,
  additionalproducts,
  totalproducts,
  guidetotalinclvat,
  guidetotalexclvat,
  footnote,
  showactions = true,
  savebuttonlabel = 'Save changes',
  discardbuttonlabel = 'Discard changes',
  onsave,
  ondiscard,
  tag = null,
  classname,
  ...props
}) => {
  const summaryItems = [
    { label: 'Minimum products', value: minimumproducts },
    { label: 'Additional', value: additionalproducts },
    { label: 'Total', value: totalproducts },
  ];

  return (
    <div
      className={cn(
        'tw:flex tw:flex-col tw:gap-5 tw:rounded-[20px] tw:bg-white tw:p-4 tw:lg:gap-8 tw:lg:p-6',
        classname,
      )}
      {...props}
    >
      {/* Header Section */}
      <div className="tw:flex tw:w-full tw:flex-col tw:gap-3 tw:lg:gap-4">
        <div className="tw:flex tw:w-full tw:flex-col tw:gap-2">
          <Typography domtype="h6" classname="tw:font-semibold ">
            Allocation summary
          </Typography>
        </div>

        {/* Status Tag */}
        <div className="tw:flex tw:flex-row tw:items-start tw:justify-start">
          {tag || (
            <Tag
              label={status}
              variant="secondary"
              size="small"
              classname="tw:bg-beige-1000 tw:rounded-[120px] tw:text-sm tw:px-2 tw:py-1 tw:font-medium"
            />
          )}
        </div>

        {/* Changes Text or Lock Indicator */}
        {locked ? (
          <div className="tw:flex tw:items-center tw:gap-2">
            <Icons.lock classname="tw:h-4 tw:w-4" />
            <span className="tw:text-[13px] tw:lg:text-lg">
              Cannot make changes
            </span>
          </div>
        ) : (
          <div className="tw:flex tw:w-full tw:flex-row tw:items-center tw:justify-start tw:gap-2">
            <span className="tw:text-[13px] tw:leading-[1.4] tw:lg:text-lg">
              {changestext}
            </span>
          </div>
        )}
      </div>

      {/* Summary Details Section */}
      <div className="tw:flex tw:w-full tw:flex-col">
        <div className="tw:mb-5 tw:w-full tw:border-t tw:border-dashed tw:border-secondary-1300 tw:lg:mb-8"></div>

        <div className="tw:space-y-3 tw:lg:space-y-4">
          {summaryItems.map((item, index) => (
            <div
              key={index}
              className="tw:flex tw:w-full tw:flex-row tw:items-center tw:justify-start tw:gap-2"
            >
              <div className="tw:flex tw:min-w-0 tw:grow tw:flex-row tw:items-center tw:justify-start tw:gap-2">
                <span className="tw:text-base tw:font-normal tw:whitespace-nowrap tw:lg:text-lg">
                  {item.label}
                </span>
              </div>
              <div className="tw:w-[120px] tw:text-right tw:text-base tw:font-normal tw:lg:text-lg">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VAT Total Section */}
      <div className="tw:flex tw:w-full tw:flex-col">
        <div className="tw:mb-5 tw:w-full tw:border-t tw:border-dashed tw:border-secondary-1300 tw:lg:mb-8"></div>

        <div className="tw:flex tw:w-full tw:flex-row tw:items-center tw:justify-start tw:gap-2">
          <div className="tw:flex tw:min-w-0 tw:grow tw:flex-row tw:items-center tw:justify-start tw:gap-2">
            <span className="tw:text-base tw:font-normal tw:whitespace-nowrap tw:lg:text-xl">
              Guide total incl. VAT*
            </span>
          </div>
          <div className="tw:w-[120px] tw:text-right tw:text-base tw:font-normal tw:lg:text-xl">
            {formatCurrency(guidetotalinclvat)}
          </div>
        </div>
      </div>

      {/* Final Total Section */}
      <div className="tw:flex tw:w-full tw:flex-col">
        <div className="tw:flex tw:w-full tw:flex-row tw:items-center tw:justify-start">
          <div className="tw:flex tw:min-w-0 tw:grow tw:flex-row tw:items-center tw:justify-start tw:gap-2">
            <span className="tw:text-lg tw:leading-[1.2] tw:font-bold tw:whitespace-nowrap tw:lg:text-xl">
              Guide total excl. VAT*
            </span>
          </div>
          <div className="tw:w-[120px] tw:text-right">
            <span className="tw:text-lg tw:leading-[1.2] tw:font-bold tw:lg:text-xl">
              {formatCurrency(guidetotalexclvat)}
            </span>
          </div>
        </div>
      </div>

      <div>
        {/* Action Buttons Section */}
        {showactions && !locked && (
          <div className="tw:flex tw:w-full tw:flex-col tw:gap-3 tw:lg:gap-4">
            <Button
              label={savebuttonlabel}
              variant="primary"
              onclick={onsave}
            />
            <Button
              label={discardbuttonlabel}
              variant="secondary"
              onclick={ondiscard}
            />
          </div>
        )}

        {/* Footnote */}
        {footnote && (
          <p className="tw:mt-3 tw:text-[13px] tw:leading-[1.4] tw:font-normal tw:lg:text-base">
            {footnote}
          </p>
        )}
      </div>
    </div>
  );
};

export default AllocationsSummary;
