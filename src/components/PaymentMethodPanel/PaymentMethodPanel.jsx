import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Icons from '../Icons/Icons';
import Typography from '../Typography/Typography';
import { cn, formatCurrency } from '../../../utils/helpers';
import CheckoutProductsTable from '../Tables/CheckoutProductsTable';
import { RadioGroup } from '../Form';
import Tag from '../Tag/Tag';

/**
 * PaymentMethodPanel Component
 *
 * @description A component that displays a payment method panel with delivery options, payment methods, and total amounts.
 *
 * @param {Object} props - Component props
 * @param {string} [props.classname] - Additional classes to add to the component
 * @param {string} [props.title] - Title of the panel
 * @param {Array} [props.products] - Array of grouped products to display
 * @param {string} [props.tag] - Optional tag to display
 * @param {string} [props.deliverynotes] - Multi-line text input for delivery notes/instructions
 * @param {function} [props.onchange] - Callback function for when the payment method changes
 * @param {Array} [props.paymentmethods] - Array of payment methods to display, each with {id, value, label, enabled}
 * @param {number} [props.total] - Total amount to display
 * @param {number} [props.totalwithvat] - Total amount with VAT to display
 * @param {string} [props.panelid] - Unique identifier for the panel to create unique radio group names
 * @returns {JSX.Element} Preact component - The PaymentMethodPanel component
 */

const PaymentMethodPanel = ({
  paymentmethods,
  deliverynotes,
  total,
  totalwithvat,
  title,
  onchange,
  products,
  classname,
  tag,
  panelid = 'default',
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // Calculate the total number of items in the products array
  const totalItems = products.reduce(
    (acc, group) => acc + group.products.length,
    0,
  );

  // Filter out disabled payment methods
  const enabledPaymentMethods =
    paymentmethods?.filter((pm) => pm.enabled !== false) || [];

  // Auto-select the first enabled payment method if there's only one enabled option
  useEffect(() => {
    if (enabledPaymentMethods.length === 1) {
      const selectedValue = enabledPaymentMethods[0].value;
      setSelectedPaymentMethod(selectedValue);

      // Call the onchange callback with the selected payment method value
      if (onchange) {
        onchange(selectedValue);
      }
    }
  }, [enabledPaymentMethods]);

  const handlePaymentMethodChange = (value) => {
    setSelectedPaymentMethod(value);

    // Call the onchange callback with the selected payment method value
    if (onchange) {
      onchange(value);
    }
  };

  return (
    <div
      className={cn('tw:rounded-xl tw:bg-white tw:p-4', classname)}
      {...props}
    >
      <div className="tw:flex tw:flex-col tw:justify-between tw:gap-2 tw:lg:flex-row tw:lg:items-center">
        <div className="tw:flex tw:w-full tw:flex-col tw:items-start tw:justify-between tw:space-y-5 tw:lg:flex-row tw:lg:space-y-0">
          <div className="tw:w-full tw:max-w-lg">
            <div className="tw:flex tw:flex-col tw:gap-4.5 tw:lg:mb-6">
              {deliverynotes && (
                <div className="tw:flex tw:items-start tw:gap-2">
                  <Icons.info classname="tw:mt-1 tw:h-5 tw:w-5 tw:flex-shrink-0" />
                  <Typography
                    domtype="p"
                    classname="tw:whitespace-pre-line tw:text-2xs tw:lg:text-sm"
                  >
                    {deliverynotes}
                  </Typography>
                </div>
              )}

              {title && (
                <div className="tw:flex tw:items-center tw:gap-2">
                  <Icons.truck classname="tw:h-5 tw:w-5 tw:flex-shrink-0" />
                  <Typography domtype="h7" classname="tw:font-semibold">
                    {title}
                  </Typography>
                  {tag && (
                    <Tag
                      label={tag}
                      variant="secondary"
                      size="small"
                      classname="tw:ml-2"
                    />
                  )}
                </div>
              )}
            </div>
            <button
              className="tw:hidden tw:cursor-pointer tw:items-center tw:gap-2 tw:text-base tw:lg:flex"
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

          {/* payment methods */}
          <div>
            {enabledPaymentMethods.length > 1 ? (
              <RadioGroup
                name={`paymentMethod-${panelid}`}
                options={enabledPaymentMethods.map((pm) => ({
                  id: `${pm.id}-${panelid}`,
                  value: pm.value,
                  label: pm.label,
                }))}
                defaultvalue={
                  selectedPaymentMethod || enabledPaymentMethods[0]?.value
                }
                onchange={handlePaymentMethodChange}
                classname="tw:space-y-4"
              />
            ) : enabledPaymentMethods.length === 1 ? (
              <Typography domtype="p" classname="tw:font-semibold">
                {enabledPaymentMethods[0]?.label}
              </Typography>
            ) : (
              <Typography domtype="p" classname="tw:text-red-500">
                No payment methods available
              </Typography>
            )}
          </div>

          <div className="tw:flex tw:flex-row tw:gap-2 tw:py-5 tw:max-lg:w-full tw:max-lg:border-t tw:max-lg:border-b tw:max-lg:border-secondary-1300 tw:lg:flex-col tw:lg:items-end tw:lg:py-0 tw:lg:text-right">
            <Typography domtype="h6" classname="tw:font-semibold">
              {formatCurrency(total)}
            </Typography>
            {totalwithvat && (
              <Typography domtype="p" classname="tw:text-lg">
                {formatCurrency(totalwithvat)} incl. VAT
              </Typography>
            )}
          </div>

          <button
            className="tw:flex tw:cursor-pointer tw:items-center tw:gap-2 tw:text-base tw:lg:hidden"
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
      </div>

      {isExpanded && (
        <div className="tw:mt-3 tw:max-lg:overflow-x-scroll">
          <div className="tw:inline-block tw:min-w-full tw:py-2 tw:align-middle">
            <CheckoutProductsTable products={products} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodPanel;
