import { h, Fragment } from 'preact';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import { cn, formatCurrency } from '../../../utils/helpers';
import CalloutCard from '../CalloutCard/CalloutCard';
import Icons from '../Icons/Icons';

/**
 * SummaryCard Component
 *
 * @description A component that displays a summary of the user's order, including groups of items, total costs, and any applicable savings or warnings.
 *
 * @param {Object} props - The component props
 * @param {string} props.title - The title of the summary card
 * @param {Array} props.groups - An array of groups, each containing a label, total, and items
 * @param {number} props.total - The total cost of the order
 * @param {number} props.savings - The total savings applied to the order
 * @param {number} props.suppliersavings - The total savings from supplier rep orders
 * @param {Object} props.voucher - An object representing a voucher, including its label and value
 * @param {function} props.oncheckout - A function to call when the checkout button is clicked
 * @param {number} props.totalwithvat - The total cost including VAT
 * @param {Object} props.warning - A string containing a warning message to be displayed under the table
 * @param {function} props.onwarningclick - A function to call when the warning message is clicked
 * @param {string} props.warninglabel - The label for the warning message
 * @param {string} props.footnote - A footnote to display at the bottom of the card
 * @param {string} props.ctalabel - The label for the checkout button
 * @param {string} props.classname - Additional classes to add to the component
 * @returns {JSX.Element} - The rendered SummaryCard component
 */

const SummaryCard = ({
  title,
  groups,
  total,
  savings,
  suppliersavings,
  voucher,
  oncheckout,
  totalwithvat,
  warning,
  onwarningclick,
  warninglabel = 'See more',
  footnote,
  ctalabel = 'Checkout',
  classname,
}) => {
  return (
    <div
      className={cn(
        'tw:space-y-5 tw:rounded-[20px] tw:bg-white tw:p-4 tw:lg:max-w-[427px] tw:lg:space-y-6 tw:lg:p-6',
        classname,
      )}
    >
      <Typography domtype="h6" classname="tw:font-semibold">
        {title}
      </Typography>

      <div className="tw:space-y-5 tw:lg:space-y-6">
        {groups &&
          groups.map((group, index) => (
            <table key={index} className="tw:w-full tw:table-auto">
              {group.label && (
                <thead>
                  <tr>
                    <th
                      colSpan={7}
                      className="tw:py-2 tw:text-left tw:text-base tw:lg:text-xl"
                    >
                      {group.label}
                    </th>
                    <th
                      colSpan={2}
                      className="tw:min-w-[60px] tw:py-2 tw:text-right tw:text-base tw:lg:text-xl"
                    >
                      Qty
                    </th>
                    <th
                      colSpan={3}
                      className="tw:min-w-[80px] tw:py-2 tw:text-right tw:text-base tw:lg:text-xl"
                    >
                      {formatCurrency(group.total)}
                    </th>
                  </tr>
                </thead>
              )}
              <tbody>
                {group.items.map((item, itemIndex) => (
                  <Fragment key={itemIndex}>
                    <tr>
                      <td colSpan={7} className="tw:py-1">
                        <div className="tw:flex tw:w-full tw:items-start tw:text-sm tw:lg:text-lg">
                          {item.type === 'delivery' && (
                            <Icons.truck className="tw:mt-1 tw:mr-2 tw:h-4 tw:w-4 tw:shrink-0" />
                          )}

                          {item.type === 'collect' && (
                            <Icons.shoppingBag className="tw:mt-1 tw:mr-2 tw:h-4 tw:w-4 tw:shrink-0" />
                          )}
                          {item.label}
                        </div>
                      </td>
                      <td
                        colSpan={2}
                        className="tw:min-w-[60px] tw:px-2 tw:py-1 tw:text-right tw:text-sm tw:lg:text-lg"
                      >
                        {item.qty}
                      </td>
                      <td
                        colSpan={3}
                        className="tw:min-w-[80px] tw:px-2 tw:py-1 tw:text-right tw:text-sm tw:lg:text-lg"
                      >
                        {item.price ? formatCurrency(item.price) : null}
                      </td>
                    </tr>
                    {item.warning && (
                      <tr>
                        <td colSpan={12} className="tw:py-1">
                          <CalloutCard type="error" classname="tw:mt-1 tw:mb-2">
                            {item.warning}
                          </CalloutCard>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          ))}

        {!groups && (
          <div className="tw:sapce-y-6 tw:lg:space-y-8">
            <div className="tw:mt-2 tw:flex tw:w-full tw:items-center tw:justify-between">
              <div className="tw:flex tw:w-full tw:items-center tw:justify-start tw:font-semibold">
                <Icons.truck className="tw:mt-1 tw:mr-2 tw:h-4 tw:w-4 tw:shrink-0" />
                0 products
              </div>

              <div className="tw:text-right">{formatCurrency(0)}</div>
            </div>
            <CalloutCard type="error" classname="tw:mt-2">
              You must have at least one product in your basket before trying to
              check out.
            </CalloutCard>
          </div>
        )}

        {warning && (
          <CalloutCard
            type="error"
            classname="tw:mt-2"
            cta={onwarningclick ? warninglabel : undefined}
            onctaclick={onwarningclick}
          >
            {warning}
          </CalloutCard>
        )}
      </div>

      <div className="tw:space-y-3 tw:border-t tw:border-dotted tw:pt-5 tw:lg:space-y-4 tw:lg:pt-6">
        {suppliersavings && (
          <div className="tw:flex tw:justify-between tw:text-sm tw:lg:text-lg">
            <span>Supplier Rep order savings</span>
            <span>{formatCurrency(suppliersavings)}</span>
          </div>
        )}
        {savings && (
          <div className="tw:flex tw:justify-between tw:text-sm tw:lg:text-lg">
            <span>Offer savings</span>
            <span>{formatCurrency(savings)}</span>
          </div>
        )}

        {voucher && (
          <div className="tw:flex tw:justify-between tw:text-sm tw:lg:text-lg">
            <span className="tw:flex tw:items-center">
              Voucher savings <Icons.tag className="tw:ml-1" />
            </span>
            <span>{formatCurrency(voucher.value)}</span>
          </div>
        )}

        <div className="tw:flex tw:justify-between tw:text-sm tw:lg:text-lg">
          <span className="tw:flex tw:items-center">
            Guide total incl. VAT*
          </span>
          <span>{formatCurrency(totalwithvat)}</span>
        </div>

        {/* Backward compatibility for top level warnings */}
        {warning && warning.short && (
          <CalloutCard type="error" classname="tw:mt-2">
            {warning.short}
          </CalloutCard>
        )}
        <div className="tw:mt-3 tw:flex tw:justify-between tw:font-semibold tw:lg:mt-6">
          <span>
            <Typography domtype="h7" classname="tw:text-base tw:lg:text-xl">
              Guide total excl. VAT*
            </Typography>
          </span>
          <span>
            <Typography domtype="h7" classname="tw:text-base tw:lg:text-xl">
              {formatCurrency(total)}
            </Typography>
          </span>
        </div>
        {voucher && (
          <CalloutCard
            type="success"
            classname="tw:mt-2 tw:lg:mb-7 tw:lg:mt-4"
            icon={<Icons.tag />}
          >
            {voucher.label}
          </CalloutCard>
        )}
      </div>

      {oncheckout && (
        <Button
          label={ctalabel}
          variant="primary"
          onclick={oncheckout}
          classname="tw:w-full tw:mt-1 tw:mb-3"
        />
      )}

      {!groups && (
        <Button
          label="Checkout"
          variant="primary"
          state="disabled"
          classname="tw:w-full"
        />
      )}

      {footnote && (
        <Typography
          domtype="p"
          classname="tw:text-[13px] tw:lg:text-base tw:text-gray-500"
        >
          {footnote}
        </Typography>
      )}
    </div>
  );
};

export default SummaryCard;
