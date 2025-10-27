/**
 * Dropdown Component
 *
 * @description Renders a customisable dropdown menu with support for different types and states.
 *
 * @param {Object} props - Component props
 * @param {string} props.label - Text displayed when no selection is made
 * @param {Array} props.options - Array of options to display in the dropdown
 * @param {string} props.state - State of the dropdown ('active' or 'inactive')
 * @param {string} props.selectedvalue - Currently selected value
 * @param {string} props.type - Type of dropdown ('default' or 'date')
 * @param {boolean} props.bold - Whether to display the label in bold
 * @param {string} props.prevaccountyear - Previous account year label (for date type)
 * @param {string} props.currentaccountyear - Current account year label (for date type)
 * @param {string} props.customStartDate - Custom start date for date type
 * @param {string} props.customEndDate - Custom end date for date type
 * @param {function} props.onchange - Callback function to notify parent component when the dropdown value changes
 * @param {string} props.classname - Additional CSS classes
 *
 * @returns {JSX.Element} Preact component
 */

// Imports
import { h, Fragment } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { forwardRef, useImperativeHandle } from 'preact/compat';
import { cn } from '../../../../utils/helpers';
import Icons from '../../Icons/Icons';
import Button from '../../Button/Button';

// Custom hook for handling clicks outside
const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, callback]);
};

// Custom hook for checking dropdown position
const useDropdownPosition = (buttonRef, menuRef, isOpen, setShowUpward) => {
  useEffect(() => {
    if (!isOpen) return;

    const checkPosition = () => {
      if (buttonRef.current && menuRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const menuRect = menuRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        setShowUpward(buttonRect.bottom + menuRect.height > viewportHeight);
      }
    };

    checkPosition();
    window.addEventListener('resize', checkPosition);
    return () => window.removeEventListener('resize', checkPosition);
  }, [isOpen, buttonRef, menuRef, setShowUpward]);
};

const Dropdown = forwardRef(
  (
    {
      label = 'Select an option',
      options = [],
      state = 'active',
      selectedvalue = null,
      type = 'default',
      bold = false,
      prevaccountyear = null,
      currentaccountyear = null,
      customStartDate = null,
      customEndDate = null,
      onchange,
      classname,
      ...props
    },
    ref,
  ) => {
    // State management
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(selectedvalue);
    const [showUpward, setShowUpward] = useState(false);
    const [showCustomDateRange, setShowCustomDateRange] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const dropdownRef = useRef(null);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    // Tailwind classes for styling
    const CLASSES = {
      button: cn(
        'tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:justify-between tw:rounded-lg tw:border tw:border-black/20 tw:px-3 tw:py-4.25 tw:transition-all tw:duration-200 tw:placeholder:text-grey-600 tw:focus:placeholder:invisible',
      ),
      menuOption: {
        base: cn(
          'dropdown-menu-item',
          'tw:flex tw:p-3 tw:text-base tw:justify-between',
          'tw:cursor-pointer tw:transition-colors tw:duration-200',
          'tw:hover:bg-grey-200',
        ),
        selected: cn('tw:gap-1 tw:items-center tw:font-bold'),
        first: 'tw:rounded-t-lg',
        last: 'tw:rounded-b-lg',
      },
      tick: 'tw:w-5 tw:h-5 tw:inline-block',
    };

    // Use the custom hooks
    useClickOutside(dropdownRef, () => {
      setIsOpen(false);
      setShowCustomDateRange(false);
    });

    // Check dropdown position
    useDropdownPosition(buttonRef, menuRef, isOpen, setShowUpward);

    // Handle selectedvalue changes
    useEffect(() => {
      if (
        selectedvalue === 'Custom Date Range' &&
        customStartDate &&
        customEndDate
      ) {
        setSelected(selectedvalue);
        setStartDate(customStartDate);
        setEndDate(customEndDate);
      } else {
        setSelected(selectedvalue);
      }
    }, [selectedvalue, customStartDate, customEndDate]);

    // Toggle dropdown visibility
    const handleToggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    // Handle custom date range submission
    const handleSetDateRange = () => {
      if (startDate && endDate) {
        setIsOpen(false);
        setShowCustomDateRange(false);
        // Pass the value in the format expected by the parent
        onchange?.({
          value: 'Custom Date Range',
          type: 'Custom Date Range',
          startDate,
          endDate,
        });
      }
    };

    // Handle option click
    const handleOptionClick = (option) => {
      // Special handling for Custom Date Range
      if (option === 'Custom Date Range') {
        setShowCustomDateRange(true);
        return;
      }

      // Clear custom date range state if switching from it
      if (selected === 'Custom Date Range') {
        setStartDate('');
        setEndDate('');
      }

      // Handle deselection for all options
      if (option === selected || option === selectedvalue) {
        setSelected(null);
        onchange?.(null);
      } else {
        setSelected(option);
        onchange?.(option);
      }

      setIsOpen(false);
    };

    // Add a function to get the display label
    const getDisplayLabel = () => {
      if (
        type === 'date' &&
        selectedvalue === 'Custom Date Range' &&
        customStartDate &&
        customEndDate
      ) {
        return `${customStartDate} to ${customEndDate}`;
      }
      return selectedvalue || selected || label;
    };

    // Render dropdown menu based on type
    const renderDropdownMenu = () => {
      if (type === 'default') {
        return options.map((option, index) => (
          <div
            key={option}
            className={cn(
              CLASSES.menuOption.base,
              option === selected && CLASSES.menuOption.selected,
              index === 0 && CLASSES.menuOption.first,
              index === options.length - 1 && CLASSES.menuOption.last,
            )}
            onClick={() => handleOptionClick(option)}
            role="option"
            aria-selected={option === selected}
          >
            <span>{option}</span>
            {option === selected && (
              <Icons.checkMark classname="tw:h-3 tw:w-3" />
            )}
          </div>
        ));
      }

      // Date type options
      const dateOptions = [
        { value: 'All', selected: selected === 'All' },
        { value: 'Last 3 months', selected: selected === 'Last 3 months' },
        { value: 'Last 6 months', selected: selected === 'Last 6 months' },
        { value: 'Last 12 months', selected: selected === 'Last 12 months' },
      ];

      return (
        <>
          {/* Standard date options */}
          {dateOptions.map((option, index) => (
            <div
              key={option.value}
              className={cn(
                CLASSES.menuOption.base,
                option.selected && CLASSES.menuOption.selected,
                index === 0 && CLASSES.menuOption.first,
                index === dateOptions.length - 1 && CLASSES.menuOption.last,
              )}
              onClick={() => handleOptionClick(option.value)}
              role="option"
              aria-selected={option.selected}
            >
              <span>{option.value}</span>
              {option.selected && <Icons.checkMark classname="tw:h-3 tw:w-3" />}
            </div>
          ))}

          {/* Accounting period section */}
          {(prevaccountyear || currentaccountyear) && (
            <>
              <div
                className="tw:mx-6 tw:my-1 tw:block tw:border-t tw:border-grey-200"
                role="separator"
              />
              <div className="tw:cursor-default tw:p-3 tw:text-base tw:font-bold">
                Accounting period
              </div>
              {[prevaccountyear, currentaccountyear]
                .filter(Boolean)
                .map((year) => (
                  <div
                    key={year}
                    className={cn(
                      CLASSES.menuOption.base,
                      selected === year && CLASSES.menuOption.selected,
                    )}
                    onClick={() => handleOptionClick(year)}
                    role="option"
                    aria-selected={selected === year}
                  >
                    <span>{year}</span>
                    {selected === year && (
                      <Icons.checkMark classname="tw:h-3 tw:w-3" />
                    )}
                  </div>
                ))}
              <div
                className="tw:mx-6 tw:my-1 tw:block tw:border-t tw:border-grey-200"
                role="separator"
              />
              <div
                className={cn(
                  CLASSES.menuOption.base,
                  (selected === 'Custom Date Range' || (selectedvalue === 'Custom Date Range' && customStartDate && customEndDate)) &&
                    CLASSES.menuOption.selected,
                )}
                onClick={() => handleOptionClick('Custom Date Range')}
                role="option"
              >
                <span>Custom date range</span>
                {(selected === 'Custom Date Range' || (selectedvalue === 'Custom Date Range' && customStartDate && customEndDate)) && (
                  <Icons.checkMark classname="tw:h-3 tw:w-3" />
                )}
              </div>
            </>
          )}
        </>
      );
    };

    // Custom date range panel
    const renderCustomDateRange = () => (
      <div
        className="tw:absolute tw:z-10 tw:mt-1 tw:w-[300px] tw:rounded-lg tw:border tw:border-grey-200 tw:bg-white tw:p-6"
        style={{
          boxShadow:
            '-1px -1px 4px 4px rgba(0, 0, 0, 0.02), 6px 10px 24px 0px rgba(0, 0, 0, 0.30)',
        }}
        {...props}
      >
        <button
          className="tw:mb-4 tw:flex tw:cursor-pointer tw:items-center tw:space-x-2 tw:transition-opacity tw:hover:opacity-50 tw:md:mb-6"
          onClick={() => setShowCustomDateRange(false)}
        >
          <Icons.chevronLeft classname="tw:w-4 tw:h-4" />
          <span>Back</span>
        </button>

        {/* Date input fields */}
        <div>
          <label
            htmlFor="dropdown-start-date"
            className="tw:block tw:text-sm tw:leading-[18.20px] tw:font-normal tw:text-gray-800"
          >
            From date
          </label>
          <input
            type="date"
            id="dropdown-start-date"
            name="dropdown-start-date"
            className="focus:tw:border-primary-400 focus:tw:outline-none tw:mt-1 tw:block tw:w-full tw:rounded-lg tw:border tw:border-gray-300 tw:p-3 tw:leading-tight tw:text-gray-800 tw:uppercase"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="tw:mt-4">
          <label
            htmlFor="dropdown-end-date"
            className="tw:block tw:text-sm tw:leading-[18.20px] tw:font-bold tw:text-gray-800"
          >
            To date
          </label>
          <input
            type="date"
            id="dropdown-end-date"
            name="dropdown-end-date"
            className="focus:tw:border-primary-400 focus:tw:outline-none tw:mt-1 tw:block tw:w-full tw:rounded-lg tw:border tw:border-gray-300 tw:p-3 tw:leading-tight tw:text-gray-800 tw:uppercase"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Action buttons */}
        <div className="tw:mt-6 tw:flex tw:justify-between tw:gap-[11px]">
          <Button
            label="Cancel"
            variant="secondary"
            size="small"
            classname="tw:w-[40%]"
            onClick={() => setShowCustomDateRange(false)}
          />
          <Button
            label="Set date range"
            variant="tertiary"
            size="small"
            state={startDate && endDate ? 'enabled' : 'disabled'}
            classname="tw:w-[60%]"
            onClick={handleSetDateRange}
          />
        </div>
      </div>
    );

    // Expose reset and setValue methods through ref
    useImperativeHandle(ref, () => ({
      reset: () => {
        setSelected(null);
      },
      setValue: (value) => {
        setSelected(value);
      },
    }));

    return (
      <div
        ref={dropdownRef}
        className={cn('tw:relative tw:inline-block tw:text-left', classname)}
      >
        {/* Main dropdown button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={handleToggleDropdown}
          className={cn(
            'tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:justify-between tw:rounded-lg tw:border tw:border-black/20 tw:px-3 tw:py-4.25 tw:transition-all tw:duration-200 tw:placeholder:text-grey-600 tw:focus:placeholder:invisible',
            !selected && 'tw:text-grey-600',
            props.disabled &&
              'tw:cursor-default tw:border-transparent tw:bg-beige-500 tw:text-gray-500',
            (isOpen || !!selectedvalue) &&
              !props.disabled &&
              'tw:inset-ring tw:inset-ring-black/20',
            (selected || selectedvalue || (selectedvalue === 'Custom Date Range' && customStartDate && customEndDate)) && 'tw:bg-secondary-1000',
          )}
          aria-controls="custom-select-listbox"
          aria-label="Select option"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="tw:truncate tw:text-nowrap">
            {getDisplayLabel()}
          </span>
          <Icons.chevronLeft
            className={cn(
              'tw:ml-5 tw:h-4 tw:w-4 tw:shrink-0 tw:-rotate-90 tw:text-black tw:transition-transform tw:duration-200',
              !selected && !selectedvalue && 'tw:text-gray-500',
            )}
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div
            ref={menuRef}
            className={
              showUpward
                ? 'tw:absolute tw:bottom-full tw:left-0 tw:z-10 tw:mt-1 tw:mb-1 tw:w-max tw:origin-bottom-left tw:rounded-lg tw:border tw:border-grey-200 tw:bg-white tw:shadow-lg'
                : 'tw:absolute tw:top-full tw:left-0 tw:z-10 tw:mt-1 tw:mb-1 tw:w-max tw:origin-top-left tw:rounded-lg tw:border tw:border-grey-200 tw:bg-white tw:shadow-lg'
            }
            style={{
              boxShadow:
                '-1px -1px 4px 4px rgba(0, 0, 0, 0.02), 6px 10px 24px 0px rgba(0, 0, 0, 0.30)',
            }}
            role="listbox"
          >
            {showCustomDateRange
              ? renderCustomDateRange()
              : renderDropdownMenu()}
          </div>
        )}
      </div>
    );
  },
);

export default Dropdown;
