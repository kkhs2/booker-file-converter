/**
 * Message Component
 *
 * @description Renders a message box with title, descriptive text, and an optional action button.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - The bold title text
 * @param {string} props.message - The additional descriptive text
 * @param {boolean} props.hasactionbutton - Whether to display an action button
 * @param {string} props.buttontext - Text for the action button
 * @param {string} props.buttonicon - Optional SVG markup for button icon
 * @param {Function} props.onbuttonclick - Callback function for button click
 * @param {string} props.classname - Additional CSS classes
 *
 * @returns {JSX.Element} Preact component
 */

// Imports
import { h, Fragment } from 'preact';
import Button from '../../Button/Button';
import { cn } from '../../../../utils/helpers';

const Message = ({
  title = '',
  message = '',
  hasactionbutton = false,
  buttontext = '',
  buttonicon,
  onbuttonclick,
  classname,
  ...props
}) => {
  return (
    <div
      role="alert"
      aria-labelledby="message-title"
      className={cn(
        'tw:flex tw:flex-col tw:items-center tw:justify-between tw:gap-4 tw:rounded-xl tw:bg-secondary-1000 tw:p-6 tw:lg:w-max tw:lg:max-w-full tw:lg:flex-row tw:lg:gap-10',
        classname,
      )}
      {...props}
    >
      <div className="tw:whitespace-normal">
        <span id="message-title" className="tw:mr-2 tw:font-medium">
          {title}{' '}
        </span>
        <span className="tw:text-font-gray-200 tw:break-words">{message}</span>
      </div>
      {hasactionbutton && (
        <Button
          label={buttontext}
          variant="secondary"
          size="small"
          iconright={
            buttonicon && typeof buttonicon === 'function'
              ? buttonicon()
              : buttonicon
          }
          classname="tw:font-bold"
          onClick={onbuttonclick}
        />
      )}
    </div>
  );
};

export default Message;
