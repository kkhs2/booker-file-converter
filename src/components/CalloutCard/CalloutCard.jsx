import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import Icons from '../Icons/Icons';

/**
 * CalloutCard Component
 *
 *  @description A callout card component that displays a message with an optional icon and close button.
 *
 * @param {Object} props - Component props
 * @param {string} [props.classname] - Additional classes to add to the component
 * @param {'info' | 'error' | 'success'} [props.type] - Type of the callout card
 * @param {React.ReactNode} [props.children] - Content to display inside the callout card
 * @param {React.ReactNode} [props.icon] - Custom icon to display for the callout card
 * @param {React.ReactNode} [props.closeicon] - Custom close icon for the callout card
 * @param {function} [props.onclose] - Function to call when the close icon is clicked
 * @param {string} [props.cta] - Text for the call-to-action button
 * @param {function} [props.onctaclick] - Function to call when the CTA button is clicked
 * @returns {JSX.Element} Preact component - The CalloutCard component
 */

const CalloutCard = ({
  type = 'info',
  classname,
  children,
  icon,
  closeicon = false,
  onclose,
  cta,
  onctaclick,
  ...props
}) => {
  const defaultIcons = {
    success: <Icons.checkMark />,
    info: <Icons.info />,
    warning: <Icons.alertTriangle classname="tw:w-4 tw:h-4" />,
    error: <Icons.alertTriangle classname="tw:w-4 tw:h-4" />,
  };

  return (
    <div
      className={cn(
        'tw:flex tw:items-center tw:justify-between tw:rounded-2xl tw:p-3 tw:text-[13px] tw:lg:text-base',
        type === 'success' && 'tw:bg-green-100',
        type === 'info' && 'tw:bg-blue-100',
        type === 'error' && 'tw:bg-primary-700 tw:text-white',
        type === 'warning' && 'tw:bg-orange-200',
        classname,
      )}
      {...props}
    >
      <div className="tw:items- tw:flex tw:flex-1">
        <span className="tw:mt-0.5 tw:mr-2 tw:shrink-0">
          {icon || defaultIcons[type]}
        </span>
        <span className="tw:flex-1">{children}</span>
      </div>

      <div className="tw:ml-4 tw:flex tw:items-center tw:gap-2">
        {cta && (
          <button
            onClick={onctaclick}
            className={cn(
              'tw:cursor-pointer tw:rounded-lg tw:px-3 tw:py-1 tw:text-xs tw:font-medium tw:whitespace-nowrap tw:transition-colors tw:focus:outline-none tw:lg:text-sm',
              type === 'success' &&
                'hover:tw:bg-green-700 tw:bg-green-600 tw:text-white',
              type === 'info' &&
                'hover:tw:bg-blue-700 tw:bg-blue-600 tw:text-white',
              type === 'error' &&
                'hover:tw:bg-gray-100 tw:bg-white tw:text-primary-700',
            )}
          >
            {cta}
          </button>
        )}

        {closeicon && (
          <button
            onClick={onclose}
            className="tw:cursor-pointer"
            aria-label="Close"
          >
            <Icons.x classname="tw:w-4 tw:h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CalloutCard;
