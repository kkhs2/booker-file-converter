import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { cn } from '../../../utils/helpers';
import Icons from '../Icons/Icons';
import { Checkbox } from './Checkbox';
import Button from '../Button/Button';
import Loading from '../Loading/Loading';

/**
 * Payment Methods Radio Group Component
 *
 * @description A specialized radio group for payment methods selection that displays cards with details
 *
 * @param {Object} props - Component props
 * @param {Array} props.paymentmethods - Array of payment method objects
 * @param {string} [props.defaultvalue] - The default selected value
 * @param {Function} props.onchange - Function called when selection changes
 * @param {Function} [props.onsavecardchange] - Function called when save card checkbox changes
 * @param {boolean} [props.isloading] - Whether the new payment method iframe is loading
 * @param {string} [props.classname] - Additional class names
 *
 * @returns {JSX.Element} The rendered Payment Methods Radio Group component
 */
export const PaymentMethodsRadioGroup = ({
  paymentmethods = [],
  defaultvalue,
  onchange,
  onsavecardchange,
  isloading = false,
  classname,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultvalue || '');
  const [isSaveCardChecked, setIsSaveCardChecked] = useState(false);
  const [expandingMethodId, setExpandingMethodId] = useState(null);

  const handleChange = (value) => {
    setSelectedValue(value);
    setExpandingMethodId(value);
    if (onchange) onchange(value);
  };

  // Reset expanding state after animation completes
  useEffect(() => {
    if (expandingMethodId && selectedValue === expandingMethodId) {
      const timer = setTimeout(() => {
        setExpandingMethodId(null);
      }, 400); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [expandingMethodId, selectedValue]);

  const handleSaveCardChange = (e) => {
    setIsSaveCardChecked(e.target.checked);
    if (onsavecardchange) onsavecardchange(e.target.checked);
  };

  const icon = (type) => {
    if (type === 'visa') {
      return <Icons.visa classname="tw:h-10 tw:w-[62px] tw:shrink-0" />;
    }
    if (type === 'mastercard') {
      return <Icons.mastercard classname="tw:h-10 tw:w-[62px] tw:shrink-0" />;
    }
    return null;
  };

  return (
    <div className={cn(classname)}>
      {paymentmethods.map((method) => {
        const isSelected = selectedValue === method.id;
        const isCard = method.type === 'card';
        const isApplePay = method.type === 'apple-pay';
        const isNewPayment = method.type === 'new';
        const isEditable = method.editable;
        const isWithoutSaveCard = !!method.withoutsavecard;

        return (
          <Fragment key={method.id}>
            <div
              className={cn(
                'tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:rounded-lg tw:bg-white tw:px-4 tw:py-4',
                isCard && 'tw:relative tw:mb-3 tw:max-lg:items-start',
                isNewPayment &&
                  selectedValue === method.id &&
                  'tw:rounded-b-none',
              )}
              onClick={() => handleChange(method.id)}
            >
              <span
                className={cn(
                  'tw:relative tw:mr-4 tw:flex tw:h-6 tw:w-6 tw:flex-shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:border-8 tw:border-grey-1100',
                  isSelected && 'tw:border-primary-500',
                  !isSelected && 'tw:border-grey-1100 tw:bg-grey-1100',
                )}
              >
                {isSelected && (
                  <span className="tw:absolute tw:h-2 tw:w-2 tw:rounded-full"></span>
                )}
              </span>

              <div
                className={cn(
                  'tw:flex tw:flex-1 tw:lg:ml-3 tw:lg:items-center',
                  isEditable && 'tw:max-lg:flex-col',
                )}
              >
                {isCard && (
                  <div className="tw:flex tw:flex-1 tw:flex-col">
                    <div className="tw:flex tw:flex-col tw:max-lg:space-y-3 tw:lg:flex-row tw:lg:items-center tw:lg:justify-between">
                      <div className="tw:w-full tw:text-lg tw:leading-none tw:font-medium tw:lg:max-w-[220px]">
                        {method.title}
                      </div>

                      <div className="tw:flex tw:w-full tw:flex-col tw:justify-between tw:max-lg:space-y-1 tw:lg:flex-row tw:lg:items-center tw:lg:space-x-3">
                        <span className="tw:flex tw:w-full tw:text-base tw:lg:max-w-[220px] tw:lg:text-lg">
                          {method.cardholdername}
                        </span>

                        {isEditable && (
                          <div className="tw:top-3 tw:right-3 tw:max-lg:absolute">
                            {icon(method.cardType)}
                          </div>
                        )}

                        <div
                          className={cn(
                            'tw:flex tw:w-full tw:flex-col tw:justify-end tw:max-lg:space-y-1',
                            isEditable &&
                              'tw:items-start tw:max-lg:flex-row tw:max-lg:justify-start',
                            !isEditable &&
                              'tw:lg:flex-row tw:lg:items-center tw:lg:space-x-3',
                          )}
                        >
                          <span className="tw:text-base tw:lg:text-right tw:lg:text-lg">
                            Ending in {method.ending}
                          </span>

                          <span className="tw:text-base tw:lg:pr-4 tw:lg:text-right tw:lg:text-lg">
                            {method.expiryDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!isEditable && icon(method.cardType)}

                {isApplePay && (
                  <div className="tw:flex tw:flex-1 tw:items-center tw:justify-between">
                    <div className="tw:text-lg tw:font-medium">
                      {method.title}
                    </div>
                    <div>
                      <Icons.applepay classname="tw:h-12 tw:w-[62px]" />
                    </div>
                  </div>
                )}

                {isNewPayment && (
                  <div className="tw:flex tw:w-full tw:flex-col tw:justify-between tw:lg:flex-row tw:lg:items-center">
                    <div className="tw:text-lg tw:font-medium">
                      {method.title}
                    </div>

                    {!isWithoutSaveCard && (
                      <Checkbox
                        id="save-card"
                        checked={isSaveCardChecked}
                        onChange={handleSaveCardChange}
                        label="Save card details"
                      />
                    )}
                  </div>
                )}

                {isEditable && (
                  <div className="tw:flex tw:space-x-3 tw:max-lg:mt-6">
                    <Button
                      label="Edit"
                      variant="secondary"
                      size="small"
                      onClick={(e) => {
                        e.preventDefault();
                        method.onedit(method.id);
                      }}
                    />
                    <Button
                      label="Delete"
                      variant="secondary"
                      size="small"
                      onClick={(e) => {
                        e.preventDefault();
                        method.ondelete(method.id);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            {selectedValue === method.id && (
              <div
                className={cn(
                  'tw:relative tw:overflow-hidden tw:rounded-b-lg tw:bg-white tw:transition-all tw:duration-300 tw:ease-out',
                  expandingMethodId === method.id
                    ? 'tw:animate-slide-down'
                    : 'tw:opacity-100',
                )}
              >
                {isloading && isNewPayment && (
                  <div className="tw:absolute tw:inset-0 tw:z-10 tw:flex tw:items-center tw:justify-center tw:bg-white tw:p-3 tw:transition-opacity tw:duration-200">
                    <Loading text="Loading payment details..." />
                  </div>
                )}
                <div
                  id={`payment-html-${method.id}`}
                  className="tw:transition-opacity tw:duration-300"
                ></div>
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default PaymentMethodsRadioGroup;
