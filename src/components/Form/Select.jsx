import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import Icons from '../Icons/Icons';
import { cn } from '../../../utils/helpers';
import { useClickOutside } from '../../../utils';
import Typography from '../Typography/Typography';

/**
 * Select component for rendering a customizable select field with options.
 *
 * @param {Array} options - The options to display in the select dropdown.
 * @param {Object} value - The currently selected value.
 * @param {Function} onchange - Callback function to handle value changes.
 * @param {string} placeholder - Placeholder text when no value is selected.
 * @param {string} label - Label for the select field.
 * @param {string} error - Error message to display if the select has an error.
 * @param {boolean} required - Whether the select field is required.
 * @param {boolean} disabled - Whether the select field is disabled.
 * @param {string} classname - Additional classes to add to the component.
 *
 * @returns {JSX.Element} The rendered Select component.
 */

export const Select = ({
  options = [],
  value = null,
  onchange,
  error,
  placeholder = 'Select an option',
  label,
  classname,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const ref = useClickOutside(() => setIsOpen(false), isOpen);

  useEffect(() => {
    if (value) {
      const index = options.findIndex((opt) => opt.value === value.value);
      if (index >= 0) {
        setHighlightedIndex(index);
      }
    }
  }, [value, options]);

  useEffect(() => {
    if (error) setHasError(true);
  }, [error]);

  const handleKeyDown = (e) => {
    if (props.disabled) return;

    if (!isOpen && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setIsOpen(true);
      return;
    }
    if (isOpen) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % options.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex(
          (prev) => (prev - 1 + options.length) % options.length,
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        onchange(options[highlightedIndex]);
        setIsOpen(false);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      }
    }
  };

  return (
    <div
      className={cn('tw:relative tw:inline-block tw:w-full', classname)}
      ref={ref}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <button
        type="button"
        onClick={() => !props.disabled && setIsOpen(!isOpen)}
        className={cn(
          'tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:justify-between tw:rounded-lg tw:border tw:border-secondary-1300 tw:px-3 tw:py-4.25 tw:transition-all tw:duration-200 tw:placeholder:text-grey-600 tw:focus:placeholder:invisible',
          !value && 'tw:text-grey-600',
          props.disabled &&
            'tw:cursor-default tw:border-transparent tw:bg-beige-500 tw:text-gray-500',
          (isOpen || !!value) &&
            !props.disabled &&
            'tw:inset-ring tw:inset-ring-secondary-1300',
          !!value && 'tw:bg-secondary-1000',
          hasError && 'tw:border-red-700 tw:text-red-700',
        )}
        aria-controls="custom-select-listbox"
        aria-label="Select option"
      >
        <span className="tw:truncate tw:leading-none tw:text-nowrap">
          {value ? value.label : !isOpen ? label || placeholder : null}
        </span>
        <Icons.chevronLeft
          className={cn(
            'tw:ml-5 tw:h-4 tw:w-4 tw:shrink-0 tw:-rotate-90 tw:text-black tw:transition-transform tw:duration-200',
            props.disabled && 'tw:text-gray-500',
          )}
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      <label
        htmlFor={props.name}
        className={cn(
          'tw:absolute tw:-top-2 tw:left-2 tw:mb-2 tw:translate-y-3 tw:bg-white tw:px-1 tw:text-sm tw:leading-[125%] tw:opacity-0 tw:transition-all tw:duration-200',
          props.disabled && 'tw:bg-transparent tw:text-gray-500',
          (isOpen || !!value) && 'tw:translate-y-0 tw:opacity-100',
          hasError && 'tw:text-red-700',
        )}
      >
        {props.required && (
          <span className="tw:mr-2 tw:text-sm tw:leading-[125%] tw:text-orange-500">
            *
          </span>
        )}
        {label}
      </label>

      <div
        className={`tw:absolute tw:z-10 tw:mt-2 tw:w-full tw:origin-top tw:transform tw:transition-all tw:duration-200 ${
          isOpen
            ? 'tw:scale-100 tw:opacity-100'
            : 'tw:pointer-events-none tw:scale-95 tw:opacity-0'
        }`}
      >
        <ul
          id="custom-select-listbox"
          role="listbox"
          className="tw:z-10 tw:max-h-60 tw:overflow-auto tw:rounded-lg tw:border tw:border-grey-200 tw:bg-white"
          style={{
            boxShadow:
              '-1px -1px 4px 4px rgba(0, 0, 0, 0.02), 6px 10px 24px 0px rgba(0, 0, 0, 0.30)',
          }}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={value && value.value === option.value}
              onClick={() => {
                onchange(option);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              className="tw:cursor-pointer tw:p-3 tw:text-base tw:transition-colors tw:duration-150 tw:hover:bg-grey-200"
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>

      {error && (
        <Typography className="tw:mt-1 tw:rounded-lg tw:bg-red-50 tw:p-2 tw:text-[13px] tw:text-black tw:lg:text-base">
          {error}
        </Typography>
      )}
    </div>
  );
};
