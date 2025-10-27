/**
 * Component for displaying account actions, including notifications, a footnote, and call-to-action buttons.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.notifications - List of notification objects to display.
 * @param {string} props.notifications[].type - The type of notification (e.g., 'alert').
 * @param {number} props.notifications[].invoices - The number of invoices associated with the notification.
 * @param {number} props.notifications[].total - The total amount for the invoices.
 * @param {string} [props.footernote] - Optional footnote text to display below the notifications.
 * @param {Array<Object>} props.ctas - List of call-to-action button props.
 * @returns {JSX.Element} The rendered AccountActions component.
 */

import { h, Fragment } from 'preact';
import Icons from '../../Icons/Icons';
import { cn, formatCurrency } from '../../../../utils/helpers';
import Button from '../../Button/Button';
import Typography from '../../Typography/Typography';

export const AccountActions = ({ notifications, footernote, ctas }) => {
  return (
    <div className="tw:flex tw:flex-col tw:rounded-xl tw:bg-secondary-1100 tw:p-4 tw:lg:p-6">
      <div class="tw:mb-4 tw:flex tw:items-center tw:gap-3">
        <Icons.bell classname="tw:w-5 tw:h-5 tw:md:w-6 tw:md:h-6" />

        <Typography domtype="h6" classname="tw:font-semibold">
          Key account actions
        </Typography>
      </div>

      <div class="tw:mb-1 tw:flex-1 tw:space-y-4 tw:md:mb-6">
        {notifications?.map((notification, index) => (
          <Notification
            key={index}
            type={notification.type}
            invoices={notification.invoices}
            total={notification.total}
            title={notification.title}
            description={notification.description}
          />
        ))}
      </div>

      {footernote && (
        <div class="tw:mt-4 tw:lg:mt-3">
          <p className="tw:mb-2 tw:text-base tw:leading-none tw:font-bold">
            Please note:
          </p>
          <p className="tw:text-sm tw:lg:text-base">{footernote}</p>
        </div>
      )}

      <div class="tw:mt-4 tw:flex tw:flex-col tw:gap-3 tw:lg:mt-6 tw:lg:gap-4">
        {ctas?.map((cta, index) => (
          <Button key={index} {...cta} />
        ))}
      </div>
    </div>
  );
};

export default AccountActions;

/**
 * Notification component for displaying individual notification details.
 *
 * @param {Object} props - The component props.
 * @param {string} props.type - The type of notification (e.g., 'alert').
 * @param {number} props.invoices - The number of invoices associated with the notification.
 * @param {number} props.total - The total amount for the invoices.
 * @returns {JSX.Element} The rendered Notification component.
 */

const Notification = ({ type, invoices, total, title, description }) => {
  return (
    <div className="tw:flex tw:items-start tw:gap-3 tw:rounded-lg tw:bg-white tw:p-3">
      <div
        className={cn(
          'tw:rounded-sm tw:p-2',
          type === 'alert'
            ? 'tw:bg-red-100'
            : type === 'info'
              ? 'tw:bg-blue-100'
              : type === 'warning'
                ? 'tw:bg-orange-100'
                : 'tw:bg-green-100',
        )}
      >
        {type !== 'success' && (
          <Icons.flag
            classname={cn(
              'tw:w-4 tw:h-4',
              type === 'alert'
                ? 'tw:text-red-700'
                : type === 'info'
                  ? 'tw:text-blue-500'
                  : type === 'warning'
                    ? 'tw:text-orange-500'
                    : 'tw:text-black',
            )}
          />
        )}
        {type === 'success' && (
          <Icons.smile classname="tw:w-4 tw:h-4 tw:text-green-500" />
        )}
      </div>
      <div className="tw:space-y-3 tw:pt-1">
        {title ? (
          <p>{title}</p>
        ) : (
          <p>
            You have <strong>{invoices}</strong> invoices owing a total of:{' '}
            <strong>{formatCurrency(total)}</strong>
          </p>
        )}
        {description && <p className="tw:text-[#2F2F2F]">{description}</p>}
      </div>
    </div>
  );
};
