import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import Icons from '../Icons/Icons';
import Typography from '../Typography/Typography';
import { cn } from '../../../utils/helpers';
import CheckoutProductsTable from '../Tables/CheckoutProductsTable';
import Tag from '../Tag/Tag';

/**
 * EstimatedDeliveryPanel Component
 *
 *  @description A component that displays estimated delivery information, including a title, date, time, and a list of products.
 *
 * @param {Object} props - Component props
 * @param {string} [props.classname] - Additional classes to add to the component
 * @param {string} [props.title] - Title of the panel
 * @param {string} [props.icon] - Icon to display in the panel
 * @param {string} [props.date] - Date of the delivery
 * @param {string} [props.time] - Time of the delivery
 * @param {Array} [props.products] - Array of grouped products to display
 * @param {string} [props.tag] - Optional tag to display next to the title
 * @param {boolean} [props.defaultexpanded] - Whether the panel should be expanded by default
 *
 * @returns {JSX.Element} Preact component - The EstimatedDeliveryPanel component
 */

const EstimatedDeliveryPanel = ({
  title,
  icon,
  date,
  time,
  products,
  classname,
  defaultexpanded = false,
  tag,
  note,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultexpanded);

  const totalItems = products.reduce(
    (acc, group) => acc + group.products.length,
    0,
  );

  return (
    <div
      className={cn('tw:rounded-xl tw:bg-white tw:p-3 tw:lg:p-4', classname)}
      {...props}
    >
      <div className="tw:flex tw:flex-col tw:justify-between tw:gap-2 tw:lg:flex-row tw:lg:items-center">
        <div className="tw:flex tw:items-start tw:gap-4">
          {typeof icon === 'function' ? icon() : icon}
          <div className="tw:space-y-2">
            <div className="tw:flex tw:items-center tw:gap-2">
              <Icons.truck classname="tw:h-5 tw:w-5 tw:flex-shrink-0" />
              <Typography domtype="h7" classname="tw:font-semibold">
                {title}
              </Typography>
              {tag && (
                <Tag
                  classname="tw:ml-2"
                  variant="secondary"
                  size="small"
                  label={tag}
                />
              )}
            </div>

            <div className="tw:flex tw:items-center">
              <span className="tw:text-[13px] tw:lg:text-base">{date}</span>
              <span className="tw:mx-2 tw:text-[13px] tw:lg:text-base">•</span>
              <span className="tw:text-[13px] tw:lg:text-base">{time}</span>
            </div>
            {note && (
              <span className="tw:mt-3 tw:text-[13px] tw:lg:text-base">
                {note}
              </span>
            )}
          </div>
        </div>

        <button
          className="tw:flex tw:cursor-pointer tw:items-center tw:gap-2 tw:text-base"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-label="Show delivery information"
        >
          {totalItems} items
          {isExpanded ? (
            <Icons.chevronUp />
          ) : (
            <Icons.chevronUp classname="tw:rotate-180" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="tw:mt-3 tw:space-y-2 tw:overflow-x-auto">
          <div className="tw:inline-block tw:min-w-full tw:py-2 tw:align-middle">
            <CheckoutProductsTable products={products} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EstimatedDeliveryPanel;
