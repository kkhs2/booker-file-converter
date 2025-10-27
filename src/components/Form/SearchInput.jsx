import { useState, useRef, useEffect } from 'preact/hooks';
import Icons from '../Icons/Icons';
import { useMediaQuery } from '../../../utils/helpers';

/**
 * Reusable search input with icon wrapper
 * @param {object} props
 * @param {string} props.value - Current input value
 * @param {function} props.onInput - Input event handler
 * @param {string} [props.placeholder] - Placeholder text
 * @param {object} [props.classname] - Additional wrapper classes
 * @param {boolean} [props.enabletabcompletion] - Enable tab completion functionality with visual suggestions
 * @param {Array} [props.searchsuggestions] - Array of strings for tab completion suggestions
 * @param {function} [props.ontabcomplete] - Callback when tab completion occurs
 * @param {boolean} [props.barcode] - Show barcode button on mobile
 * @param {function} [props.onbarcodeclick] - Barcode button click handler
 * @param {function} [props.onclear] - Clear button click handler
 * @returns JSX.Element
 */
const SearchInput = ({
  value,
  onInput,
  barcode = false,
  onbarcodeclick = () => {},
  onclear = () => {},
  placeholder = 'Search...',
  classname = '',
  enabletabcompletion = false,
  searchsuggestions = [],
  ontabcomplete,
  ...props
}) => {
  // Tab completion state
  const [tabcompletionindex, setTabcompletionindex] = useState(-1);
  const [filteredsuggestions, setFilteredsuggestions] = useState([]);
  const [showsuggestions, setShowsuggestions] = useState(false);
  const inputRef = useRef(null);

  // Filter suggestions based on current search value
  useEffect(() => {
    if (enabletabcompletion && searchsuggestions.length > 0 && value) {
      const filtered = searchsuggestions.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(value.toLowerCase()),
      );
      setFilteredsuggestions(filtered);
      setTabcompletionindex(-1);
      setShowsuggestions(filtered.length > 0);
    } else {
      setFilteredsuggestions([]);
      setTabcompletionindex(-1);
      setShowsuggestions(false);
    }
  }, [value, searchsuggestions, enabletabcompletion]);

  // Handle tab completion
  const handleTabCompletion = (shiftPressed = false) => {
    if (!enabletabcompletion || filteredsuggestions.length === 0) return false;

    let newIndex;
    if (shiftPressed) {
      // Shift+Tab: go backwards
      newIndex =
        tabcompletionindex <= 0
          ? filteredsuggestions.length - 1
          : tabcompletionindex - 1;
    } else {
      // Tab: go forwards
      newIndex =
        tabcompletionindex >= filteredsuggestions.length - 1
          ? 0
          : tabcompletionindex + 1;
    }

    setTabcompletionindex(newIndex);
    const completedValue = filteredsuggestions[newIndex];

    // Update the input value
    if (onInput) {
      onInput({ target: { value: completedValue } });
    }

    // Notify parent component
    if (ontabcomplete) {
      ontabcomplete(completedValue, newIndex);
    }

    // Close suggestions after tab completion
    setShowsuggestions(false);
    setTabcompletionindex(-1);

    return true;
  };

  // Handle keyboard events
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const wasCompleted = handleTabCompletion(e.shiftKey);
      if (!wasCompleted) {
        // If no completion available, allow normal tab behavior
        e.target.blur();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleTabCompletion(false);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleTabCompletion(true);
    } else if (e.key === 'Enter') {
      if (tabcompletionindex >= 0 && filteredsuggestions.length > 0) {
        e.preventDefault();
        const completedValue = filteredsuggestions[tabcompletionindex];
        if (onInput) {
          onInput({ target: { value: completedValue } });
        }
        if (ontabcomplete) {
          ontabcomplete(completedValue, tabcompletionindex);
        }
        setShowsuggestions(false);
        setTabcompletionindex(-1);
      }
    } else if (e.key === 'Escape') {
      // Reset tab completion on escape
      setTabcompletionindex(-1);
      setShowsuggestions(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion, index) => {
    if (onInput) {
      onInput({ target: { value: suggestion } });
    }
    if (ontabcomplete) {
      ontabcomplete(suggestion, index);
    }
    setShowsuggestions(false);
    setTabcompletionindex(-1);
    inputRef.current?.focus();
  };

  // Handle input focus
  const handleInputFocus = (e) => {
    if (enabletabcompletion && filteredsuggestions.length > 0) {
      setShowsuggestions(true);
    }
    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  // Handle input blur
  const handleInputBlur = (e) => {
    // Delay hiding suggestions to allow clicks
    setTimeout(() => {
      setShowsuggestions(false);
      setTabcompletionindex(-1);
    }, 150);
    if (props.onBlur) {
      props.onBlur(e);
    }
  };
  const isMobile = useMediaQuery('(max-width: 1023px)');
  return (
    <div className="tw:relative tw:w-full">
      <div
        className={`tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-full tw:border tw:border-secondary-1100 tw:bg-white tw:px-3 tw:py-4 tw:shadow-[3px_4px_9px_0_rgba(0,0,0,0.07)] tw:focus-within:border-primary-500 ${classname}`}
      >
        <Icons.search classname="tw:h-5 tw:w-5 tw:text-primary" />
        <input
          ref={inputRef}
          type="search"
          className="tw:w-full tw:bg-white tw:text-lg tw:placeholder-black-1000 tw:outline-none tw:focus:ring-0 tw:[&::-webkit-search-cancel-button]:hidden tw:[&::-webkit-search-cancel-button]:appearance-none"
          placeholder={placeholder}
          value={value}
          onInput={onInput}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {...props}
        />
        {value && (
          <button
            type="button"
            className="tw:flex tw:h-6 tw:w-6 tw:cursor-pointer tw:items-center tw:justify-center"
            onClick={() => {
              // Clear the input field
              if (onInput) {
                onInput({ target: { value: '' } });
              }

              onclear();
            }}
            aria-label="Clear search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_8785_6337)">
                <path
                  d="M9.99967 5.99967L5.99967 9.99967M5.99967 5.99967L9.99967 9.99967M14.6663 7.99967C14.6663 11.6816 11.6816 14.6663 7.99967 14.6663C4.31778 14.6663 1.33301 11.6816 1.33301 7.99967C1.33301 4.31778 4.31778 1.33301 7.99967 1.33301C11.6816 1.33301 14.6663 4.31778 14.6663 7.99967Z"
                  stroke="black"
                  stroke-opacity="0.2"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_8785_6337">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        )}
        {barcode && isMobile && (
          <button
            className="tw:ml-auto tw:cursor-pointer"
            onClick={onbarcodeclick}
          >
            <Icons.barcode classname="tw:h-4 tw:w-4" />
          </button>
        )}
      </div>

      {/* Tab Completion Suggestions Dropdown */}
      {enabletabcompletion &&
        showsuggestions &&
        filteredsuggestions.length > 0 && (
          <div className="tw:absolute tw:top-full tw:right-0 tw:left-0 tw:z-50 tw:mt-1 tw:max-h-60 tw:overflow-y-auto tw:rounded-lg tw:border tw:border-gray-200 tw:bg-white">
            {filteredsuggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                className={`tw:block tw:w-full tw:px-4 tw:py-3 tw:text-left tw:text-lg tw:transition-colors tw:hover:bg-gray-50 tw:focus:bg-gray-50 tw:focus:outline-none ${
                  index === tabcompletionindex
                    ? 'tw:bg-primary-50 tw:text-primary-700'
                    : 'tw:text-gray-900'
                }`}
                onClick={() => handleSuggestionClick(suggestion, index)}
                onMouseEnter={() => setTabcompletionindex(index)}
              >
                <span className="tw:font-medium">
                  {suggestion.substring(0, value.length)}
                </span>
                <span className="tw:text-gray-600">
                  {suggestion.substring(value.length)}
                </span>
              </button>
            ))}
          </div>
        )}
    </div>
  );
};

export default SearchInput;
