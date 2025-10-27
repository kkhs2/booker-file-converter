/**
 * AutocompleteInput component for rendering an input field with autocomplete dropdown.
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.type='text'] - The type of the input field.
 * @param {string} [props.label] - The label text for the input field.
 * @param {string} [props.error] - The error message to display if the input has an error.
 * @param {string} [props.hint] - Additional hint text displayed below the input field.
 * @param {string} [props.iconleft] - Icon to display on the left side of the input field.
 * @param {string} [props.iconright] - Icon to display on the right side of the input field.
 * @param {string} [props.classname] - Additional class names for styling the input field.
 * @param {boolean} [props.disabled] - Whether the input field is disabled.
 * @param {boolean} [props.required] - Whether the input field is required.
 * @param {string} [props.name] - The name attribute for the input field.
 * @param {Array} [props.suggestions] - Array of suggestion objects for the autocomplete dropdown.
 * @param {Function} [props.onSelect] - Callback function when a suggestion is selected.
 * @param {boolean} [props.loading] - Whether suggestions are being loaded.
 * @param {string} [props.dropdownlabel] - Label for the dropdown.
 * @param {Function} [props.icononclick] - Callback function when the icon is clicked.
 * @param {number} [props.debouncewait] - Wait time for debounce functionality.
 * @param {number} [props.throttlelimit] - Limit time for throttle functionality.
 * @param {string} [props.labelbackgroundcolour] - Background color for the label.
 * @param {boolean} [props.hideclearbutton] - Whether to hide the clear button.

 *
 * @returns {JSX.Element} The rendered AutocompleteInput component.
 */
import { h, Fragment } from 'preact';
import { useEffect, useRef, useState, useCallback } from 'preact/hooks';
import { cn } from '../../../utils/helpers';
import Icons from '../Icons/Icons';
import Typography from '../Typography/Typography';
import { debounce, throttle } from '../../../utils/helpers';

export const Input = ({
  type = 'text',
  label,
  error,
  hint,
  iconleft,
  iconright,
  classname,
  suggestions = [],
  dropdownlabel,
  onSelect,
  icononclick,
  loading = false,
  debouncewait,
  throttlelimit,
  onInput,
  labelbackgroundcolour = 'tw:bg-white',
  hideclearbutton = false,
  ...props
}) => {
  const inputRef = useRef();
  const dropdownRef = useRef();
  const [hasError, setHasError] = useState(false);
  const [inputValue, setInputValue] = useState(
    props.value ?? props.defaultValue ?? '',
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [inputType, setInputType] = useState(type);

  // Create stable debounced and throttled functions
  const debouncedOnChange = useCallback(
    debouncewait
      ? debounce((val) => {
          if (onInput) {
            onInput({ target: { value: val } });
          }
        }, debouncewait)
      : null,
    [debouncewait, onInput],
  );

  const throttledOnChange = useCallback(
    throttlelimit
      ? throttle((val) => {
          if (onInput) {
            onInput({ target: { value: val } });
          }
        }, throttlelimit)
      : null,
    [throttlelimit, onInput],
  );

  // Cleanup debounced and throttled functions on unmount
  useEffect(() => {
    return () => {
      if (debouncedOnChange?.cancel) {
        debouncedOnChange.cancel();
      }
      if (throttledOnChange?.cancel) {
        throttledOnChange.cancel();
      }
    };
  }, [debouncedOnChange, throttledOnChange]);

  useEffect(() => {
    if (error) setHasError(true);
  }, [error]);

  useEffect(() => {
    if (inputRef.current) {
      const handleFocus = () => {
        setHasError(false);
        if (inputValue.length > 0 && suggestions.length > 0) {
          setShowDropdown(true);
        }
      };

      inputRef.current.addEventListener('focus', handleFocus);
      return () => {
        inputRef.current.removeEventListener('focus', handleFocus);
      };
    }
  }, [inputRef, inputValue, suggestions]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, inputRef]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 0 && suggestions.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }

    if (!onInput) return;

    if (debouncedOnChange) {
      debouncedOnChange(value);
    } else if (throttledOnChange) {
      throttledOnChange(value);
    } else {
      onInput(e);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setInputValue(suggestion.label || suggestion.value || suggestion);
    setShowDropdown(false);
    setActiveIndex(-1);

    if (onSelect) {
      onSelect(suggestion);
    }
  };

  const handleKeyDown = (e) => {
    if (!showDropdown) return;

    // Arrow down
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex,
      );
    }

    // Arrow up
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    }

    // Enter key
    else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelectSuggestion(suggestions[activeIndex]);
    }

    // Escape key
    else if (e.key === 'Escape') {
      e.preventDefault();
      setShowDropdown(false);
    }
  };

  return (
    <div className="tw:relative tw:flex tw:w-full tw:flex-col">
      {iconleft && (
        <span className="tw:absolute tw:top-4 tw:left-3 tw:z-10 tw:h-5 tw:w-5">
          {iconleft}
        </span>
      )}
      <input
        ref={inputRef}
        type={inputType}
        className={cn(
          'tw:peer tw:rounded-lg tw:border tw:border-secondary-1300 tw:px-3 tw:py-[15px] tw:pr-9 tw:leading-none tw:outline-none tw:placeholder:text-grey-600 tw:focus:inset-ring tw:focus:inset-ring-secondary-1300 tw:focus:placeholder:invisible tw:disabled:border-transparent tw:disabled:bg-beige-500 tw:disabled:text-gray-500',
          hasError && 'tw:border-red-700 tw:text-red-700',
          iconleft && 'tw:pl-10',
          inputValue && 'tw:bg-secondary-1000',
          classname,
        )}
        placeholder={label}
        value={inputValue}
        onInput={handleInputChange}
        onKeyDown={handleKeyDown}
        autoComplete={suggestions.length > 0 ? 'off' : 'on'}
        {...props}
      />

      {iconright && (
        <span className="tw:absolute tw:top-4 tw:right-3 tw:z-10 tw:h-5 tw:w-5">
          {iconright}
        </span>
      )}

      <label
        htmlFor={props.name}
        className={cn(
          'tw:absolute tw:-top-2 tw:left-2 tw:mb-2 tw:bg-white tw:px-1 tw:text-sm tw:leading-[125%] tw:transition-all tw:duration-200 tw:peer-[:not(:focus):placeholder-shown]:translate-y-3 tw:peer-[:not(:focus):placeholder-shown]:opacity-0',
          props.disabled && 'tw:bg-transparent tw:text-gray-500',
          hasError && 'tw:text-red-700',
          labelbackgroundcolour,
        )}
      >
        {props.required && (
          <span className="tw:mr-2 tw:text-sm tw:leading-[125%] tw:text-orange-500">
            *
          </span>
        )}
        {label}
      </label>

      {!props.disabled && !hideclearbutton && inputValue.length > 0 && type !== 'password' && (
        <div className="tw:absolute tw:top-4 tw:right-3 tw:flex tw:space-x-2">
          <button
            type="button"
            className="tw:group tw:cursor-pointer tw:peer-[:placeholder-shown]:hidden tw:disabled:pointer-events-none"
            disabled={props.disabled}
            onClick={() => {
              setInputValue('');
              inputRef.current.focus();
              if (onInput) {
                onInput({ target: { value: '' } });
              }
            }}
          >
            <Icons.x
              classname={cn(
                'tw:w-4 tw:h-4 tw:group-disabled:text-secondary-1300 tw:group-hover:text-primary tw:transition-colors',
                hasError && 'tw:text-red-700 hover:tw:text-red-700/60',
              )}
            />
          </button>
        </div>
      )}

      {!!icononclick && !inputValue && (
        <button
          type="button"
          onClick={icononclick}
          className="tw:absolute tw:top-1/2 tw:right-3 tw:flex tw:-translate-y-1/2 tw:cursor-pointer tw:space-x-2"
        >
          <Icons.helpCircle classname="tw:h-4 tw:w-4" />
        </button>
      )}

      {!props.disabled && type === 'password' && (
        <button
          type="button"
          onClick={() =>
            setInputType(inputType === 'password' ? 'text' : 'password')
          }
          className="tw:absolute tw:top-1/2 tw:right-3 tw:flex tw:-translate-y-1/2 tw:cursor-pointer tw:space-x-2"
        >
          <Icons.eye classname="tw:h-4 tw:w-4" />
        </button>
      )}

      {/* Autocomplete dropdown */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="tw:absolute tw:top-full tw:right-0 tw:left-0 tw:z-20 tw:mt-1 tw:max-h-60 tw:overflow-auto tw:rounded-lg tw:border tw:border-black/10 tw:bg-white tw:shadow-lg"
        >
          {suggestions.length === 0 ? (
            <div className="tw:p-3 tw:text-sm tw:text-gray-500">
              No suggestions found
            </div>
          ) : (
            <div>
              <p className="tw:border-b tw:border-grey-200 tw:bg-white tw:px-3 tw:py-4 tw:text-lg tw:font-semibold">
                {dropdownlabel}
              </p>
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className={cn(
                      'tw:cursor-pointer tw:px-3 tw:py-2 tw:hover:bg-gray-100',
                      activeIndex === index && 'tw:bg-gray-100',
                    )}
                    onClick={() => handleSelectSuggestion(suggestion)}
                  >
                    {suggestion.label || suggestion.value || suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {typeof error === 'string' && error.trim() && (
        <Typography className="tw:mt-1 tw:rounded-lg tw:bg-red-50 tw:p-2 tw:text-[13px] tw:text-black tw:lg:text-base">
          {error}
        </Typography>
      )}

      {hint && (
        <Typography classname="tw:text-sm tw:text-gray-500 tw:mt-1.5">
          {hint}
        </Typography>
      )}
    </div>
  );
};
