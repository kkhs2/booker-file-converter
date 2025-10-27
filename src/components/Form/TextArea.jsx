/**
 * TextArea component renders a textarea input field with optional character counter.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.value=''] - The current value of the textarea.
 * @param {function} props.onchange - Callback fired when the textarea value changes.
 * @param {string} [props.placeholder=''] - Placeholder text for the textarea.
 * @param {string} [props.label] - Label text for the textarea.
 * @param {boolean} [props.disabled=false] - Whether the textarea is disabled.
 * @param {string} [props.error] - Error message to display if the textarea has an error.
 * @param {string} [props.classname=''] - Additional class names for the root element.
 * @param {number} [props.rows=4] - Number of visible text lines for the textarea.
 * @param {number} [props.maxlength] - Maximum number of characters allowed.
 * @param {boolean} [props.showcharactercount=false] - Whether to show character counter.
 * @param {boolean} [props.required=false] - Whether the textarea is required.
 * @param {...Object} props - Additional props passed to the textarea element.
 *
 * @returns {JSX.Element} The rendered TextArea component.
 */

import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import Typography from '../Typography/Typography';

export const TextArea = ({
  value = '',
  onchange,
  placeholder = '',
  label,
  disabled = false,
  error,
  classname = '',
  rows = 4,
  maxlength,
  showcharactercount = false,
  required = false,
  ...props
}) => {
  const characterCount = value.length;
  const isOverLimit = maxlength && characterCount > maxlength;
  const hasError = !!error;

  const handleChange = (e) => {
    if (onchange) {
      onchange(e);
    }
  };

  return (
    <div className={cn('tw:relative tw:flex tw:w-full tw:flex-col', classname)}>
      <textarea
        value={value}
        onchange={handleChange}
        placeholder={label}
        disabled={disabled}
        rows={rows}
        maxlength={maxlength}
        className={cn(
          'tw:peer tw:text-md tw:w-full tw:rounded-lg tw:border tw:border-secondary-1300 tw:p-4 tw:leading-relaxed tw:placeholder-grey-600 tw:focus:border-transparent tw:focus:ring-2 tw:focus:ring-secondary-1300 tw:focus:outline-none tw:focus:placeholder:invisible',
          'tw:disabled:border-transparent tw:disabled:bg-beige-500 tw:disabled:text-gray-500',
          hasError && 'tw:border-red-700 tw:text-red-700 tw:focus:ring-red-700',
          value && 'tw:bg-secondary-1000',
        )}
        {...props}
      />

      {label && (
        <label
          htmlFor={props.name}
          className={cn(
            'tw:absolute tw:-top-2 tw:left-2 tw:mb-2 tw:bg-white tw:px-1 tw:text-sm tw:leading-[125%] tw:transition-all tw:duration-200',
            'tw:peer-[:not(:focus):placeholder-shown]:translate-y-6 tw:peer-[:not(:focus):placeholder-shown]:opacity-0',
            disabled && 'tw:bg-transparent tw:text-gray-500',
            hasError && 'tw:text-red-700',
          )}
        >
          {required && (
            <span className="tw:mr-2 tw:text-sm tw:leading-[125%] tw:text-orange-500">
              *
            </span>
          )}
          {label}
        </label>
      )}

      {error && (
        <Typography className="tw:mt-1 tw:rounded-lg tw:bg-red-50 tw:p-2 tw:text-[13px] tw:text-black tw:lg:text-base">
          {error}
        </Typography>
      )}

      <div className="tw:mt-2 tw:flex tw:items-center tw:justify-between">
        {showcharactercount && maxlength && (
          <Typography
            className={cn(
              'tw:text-[11px]',
              isOverLimit ? 'tw:text-red-500' : 'tw:text-grey-600',
            )}
          >
            {characterCount} / {maxlength} characters
          </Typography>
        )}

        {showcharactercount && !maxlength && (
          <Typography className="tw:text-[11px] tw:text-grey-600">
            {characterCount} characters
          </Typography>
        )}
      </div>
    </div>
  );
};

export default TextArea;
