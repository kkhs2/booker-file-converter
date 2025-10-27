import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import Icons from '../Icons/Icons';
import { useState } from 'preact/hooks';

/**
 * NotificationBar Component
 *
 * @description Renders a notification bar that can display important messages with expand/collapse functionality
 *
 * @param {Object} props - Component props
 * @param {string} props.message - Main message text to display
 * @param {JSX.Element} props.icon - Icon component to display (e.g. <Icons.x />)
 * @param {string} props.expandedText - Additional text shown when expanded
 * @param {"error" | "info"} props.variant - Visual style ('error', 'info')
 * @param {boolean} props.expanded - Default expanded state
 * @param {function} props.onClose - Callback function when close button is clicked
 * @param {string} props.classname - Additional classes to add to the component
 * @returns {JSX.Element} - The NotificationBar component
 */

const NotificationBar = ({
  message = '',
  icon = <Icons.info />,
  expandedText = '',
  variant = 'error',
  expanded = false,
  onClose = () => {},
  sticky = true,
  classname,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [isVisible, setIsVisible] = useState(true);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const handleClose = (e) => {
    setIsVisible(false);
    onClose(e);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        'tw:w-full',
        variant === 'error' && 'tw:bg-primary-700 tw:text-white',
        variant === 'info' && 'tw:bg-blue-500 tw:text-white',
        sticky &&
          'tw:fixed tw:top-0 tw:left-1/2 tw:z-[999] tw:-translate-x-1/2',
        classname,
      )}
      {...props}
    >
      <div className="tw-container tw:flex tw:items-start tw:justify-between tw:gap-2 tw:px-3 tw:py-2 tw:leading-tight tw:transition-all tw:lg:items-center tw:lg:px-6 tw:lg:py-3">
        <div className="tw:flex tw:w-full tw:flex-col tw:items-center tw:lg:flex-row">
          <div className="tw:flex tw:flex-1 tw:items-center tw:gap-2 tw:lg:gap-3">
            <div className="tw:hidden tw:lg:block">{icon && icon}</div>
            <div className="tw:flex tw:w-full tw:flex-col tw:items-center tw:text-center tw:lg:flex-row tw:lg:gap-2 tw:lg:text-left">
              <div className="tw:text-13 tw:font-bold tw:lg:text-base">
                {message}
              </div>
              {expandedText && <span className="tw:hidden tw:lg:block">∙</span>}
              <div className="tw:hidden tw:text-base tw:lg:block">
                {expandedText}
              </div>
              {isExpanded && expandedText && (
                <div className="tw:mt-0.5 tw:text-sm tw:lg:hidden">
                  {expandedText}
                </div>
              )}
            </div>
          </div>
          <div className="tw:ml-4 tw:flex tw:items-center tw:gap-2">
            {expandedText && (
              <button
                type="button"
                className="tw:text-sm tw:font-medium tw:text-white tw:underline tw:underline-offset-2 tw:hover:opacity-80 tw:lg:hidden"
                onClick={handleToggle}
              >
                {isExpanded ? 'Read less' : 'Read more'}
              </button>
            )}
          </div>
        </div>
        <button
          type="button"
          className="tw:cursor-pointer tw:hover:opacity-80"
          onClick={handleClose}
        >
          <Icons.x classname="tw:flex-shrink-0 tw:w-4 tw:h-4" />
        </button>
      </div>
    </div>
  );
};

export default NotificationBar;
