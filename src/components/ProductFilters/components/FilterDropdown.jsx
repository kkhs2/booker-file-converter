import { h, Fragment } from 'preact';
import { cn } from '../../../../utils/helpers';
import Icons from '../../Icons/Icons';
import { useEffect, useState, useRef } from 'preact/hooks';
import { useClickOutside } from '../../../../utils';
import { Checkbox } from '../../Form/Checkbox';

/**
 * FilterDropdown Component
 *
 * @description
 * A dropdown component built with Preact that allows toggling a dropdown menu.
 * It supports alignment to the right and accepts additional custom classes.
 *
 * @param {Object} props - Component props
 * @param {Object} props.options - The options to display in the dropdown (can include a 'variant' property)
 * @param {boolean} alignright - Determines if the dropdown should be aligned to the right
 * @param {Function} [props.onchange] - The function to call when an option is selected
 * @param {string} [props.classname] - Additional classes to add to the component
 * @param {'multi' | 'single'} [props.variant] - The variant of the dropdown, either "multi" or "single" (will be overridden by options.variant if present)
 *  @param {boolean} [props.hidden] - Whether the component should be hidden
 * @param {string} [props.value] - The value of the selected option when variant is "single"
 * @param {'checkbox' | 'plain'} [props.itemvariant] - The variant of the dropdown items, either "checkbox" (default) or "plain"
 * @returns {JSX.Element} Preact component - The Dropdown component
 */

export const FilterDropdown = ({
  value,
  options,
  alignright,
  onchange,
  hidden,
  variant = 'multi', // Default to multi-selection
  itemvariant = 'checkbox', // Default to checkbox variant
  classname,
  filterKey, // Add filterKey prop to identify which filter this dropdown represents
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1); // Track focused option
  const dropdownRef = useClickOutside(() => closeDropdown(), isOpen);
  const listRef = useRef(null); // Reference to the options list

  // Use variant from options if provided, otherwise use prop, default to 'multi'
  const selectedVariant = options.variant || variant || 'multi';

  const isGrouped = !options.items;

  // Get all options array for both grouped and flat structures
  const getAllOptions = () => {
    if (isGrouped) {
      return Object.values(options)
        .filter((group) => !!group?.items)
        .flatMap((group) => group.items);
    }
    return options.items || [];
  };

  const singleSelectionValue =
    selectedVariant === 'single'
      ? getAllOptions().find((item) => item.value === value)
      : null;

  const hasValueSelected =
    selectedVariant === 'single'
      ? !!singleSelectionValue
      : isGrouped
        ? Object.values(options)
            .filter((group) => !!group?.items)
            .some((group) => group.items.some((item) => item.checked))
        : options.items?.some((item) => item.checked);

  const closeDropdown = () => {
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  useEffect(() => {
    const handleEscapePress = (event) => {
      if (event.key === 'Escape') closeDropdown();
    };

    const handleKeyDown = (event) => {
      if (isOpen) {
        const optionsArray = getAllOptions();

        if (event.key === 'ArrowDown') {
          event.preventDefault();
          setFocusedIndex((prev) => {
            const nextIndex = (prev + 1) % optionsArray.length;
            scrollToOption(nextIndex);
            return nextIndex;
          });
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          setFocusedIndex((prev) => {
            const nextIndex =
              (prev - 1 + optionsArray.length) % optionsArray.length;
            scrollToOption(nextIndex);
            return nextIndex;
          });
        } else if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          if (focusedIndex >= 0) {
            handleOptionChange(optionsArray[focusedIndex].value);
          }
        } else if (event.key === 'Tab') {
          closeDropdown();
        }
      }
    };

    const scrollToOption = (index) => {
      const list = listRef.current;

      if (list) {
        const options = list.querySelectorAll('li'); // Select all list items
        const option = options[index];
        if (option) {
          option.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest',
          });
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapePress);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleEscapePress);
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapePress);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, focusedIndex, options, onchange, isGrouped]);

  const handleOptionChange = (value) => {
    if (selectedVariant === 'single') {
      closeDropdown(); // Close the dropdown for single selection
      // For single mode, pass the value and variant information
      onchange({ value, variant: 'single', filterKey });
    } else {
      onchange(value);
    }
  };

  const renderGroupedOptions = () =>
    Object.keys(options)
      .filter((key) => options[key]?.items) // Ensure the key has an `items` array
      .map((key, groupIndex) => (
        <div key={groupIndex}>
          {options[key].title && (
            <div className="tw:mx-3 tw:border-b tw:border-grey-200">
              <span className="tw:mt-2 tw:mb-3 tw:inline-block tw:text-base tw:leading-[140%] tw:font-bold">
                {options[key].title}
              </span>
            </div>
          )}

          <ul
            className="tw:p-0"
            ref={groupIndex === 0 ? listRef : null} // Assign `listRef` to the first group's list
          >
            {options[key].items.map((item, itemIndex) => {
              const index =
                Object.keys(options)
                  .filter((k) => options[k]?.items)
                  .slice(0, groupIndex)
                  .reduce((acc, k) => acc + options[k].items.length, 0) +
                itemIndex;

              return (
                <li
                  className={cn(
                    'tw:flex tw:cursor-pointer tw:items-start tw:p-3 tw:hover:bg-beige/5',
                    focusedIndex === index && 'tw:bg-beige/5',
                  )}
                  key={item.value}
                  onClick={() => handleOptionChange(item.value)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOptionChange(item.value);
                    }
                  }}
                  onFocus={() => setFocusedIndex(index)}
                >
                  {itemvariant === 'checkbox' && (
                    <Checkbox
                      checked={
                        item.checked ||
                        singleSelectionValue?.value === item.value
                      }
                      onChange={() => handleOptionChange(item.value)}
                    />
                  )}
                  <span
                    className={cn(
                      'tw:flex-1 tw:pt-0.5 tw:pl-2 tw:text-base',
                      (item.checked ||
                        singleSelectionValue?.value === item.value) &&
                        'tw:font-medium',
                      itemvariant === 'plain' && 'tw:pl-0 tw:text-sm',
                    )}
                  >
                    {item.label}
                  </span>
                  {item.counter && (
                    <div className="tw:ml-4 tw:flex tw:min-w-6 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:bg-beige-1000 tw:px-1 tw:py-1.5">
                      <span className="tw:text-[11px] tw:leading-none">
                        {item.counter}
                      </span>
                    </div>
                  )}

                  {itemvariant === 'plain' &&
                    singleSelectionValue?.value === item.value && (
                      <Icons.checkMark classname="tw:h-4 tw:w-4 tw:ml-2" />
                    )}
                </li>
              );
            })}
          </ul>
        </div>
      ));

  const renderFlatOptions = () => (
    <ul className="tw:p-0" ref={listRef}>
      {/* Assign `listRef` for flat options */}
      {options.items.map((item, index) => (
        <li
          className={cn(
            'tw:flex tw:cursor-pointer tw:items-start tw:p-3 tw:hover:bg-beige/5',
            focusedIndex === index && 'tw:bg-beige/5',
          )}
          key={item.value}
          onClick={() => handleOptionChange(item.value)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOptionChange(item.value);
            }
          }}
          onFocus={() => setFocusedIndex(index)}
        >
          {
            // Render checkbox if item variant is checkbox
            itemvariant === 'checkbox' && (
              <Checkbox
                checked={
                  item.checked || singleSelectionValue?.value === item.value
                }
                onChange={() => handleOptionChange(item.value)}
              />
            )
          }
          <span
            className={cn(
              'tw:flex-1 tw:pt-0.5 tw:pl-2 tw:text-base',
              (item.checked || singleSelectionValue?.value === item.value) &&
                'tw:font-medium',
              itemvariant === 'plain' && 'tw:pl-0 tw:text-sm',
            )}
          >
            {item.label}
          </span>
          {item.counter && (
            <div className="tw:ml-4 tw:flex tw:min-w-6 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:bg-beige-1000 tw:px-1 tw:py-1.5">
              <span className="tw:text-[11px] tw:leading-none">
                {item.counter}
              </span>
            </div>
          )}

          {itemvariant === 'plain' &&
            singleSelectionValue?.value === item.value && (
              <Icons.checkMark classname="tw:h-4 tw:w-4 tw:ml-2" />
            )}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      ref={dropdownRef}
      className={cn(
        'tw:group tw:relative tw:flex tw:outline-none tw:max-md:w-full tw:max-md:flex-col',
        alignright && 'tw:justify-end',
        isOpen && 'control-open',
        hidden && 'tw:hidden',
        classname,
      )}
      {...props}
    >
      <div
        className={cn(
          'tw:flex tw:w-[204px] tw:cursor-pointer tw:items-center tw:justify-between tw:rounded-lg tw:border tw:border-black/20 tw:bg-transparent tw:p-3 tw:outline-none tw:max-md:w-full tw:max-md:group-[.control-open]:rounded-b-none tw:max-md:group-[.control-open]:border-none tw:max-md:group-[.control-open]:bg-white tw:md:group-[.control-open]:inset-ring tw:md:group-[.control-open]:inset-ring-black/20',
          hasValueSelected &&
            'tw:bg-secondary-1000 tw:inset-ring tw:inset-ring-black/20',
          selectedVariant === 'single' && 'tw:w-[256px] tw:max-md:w-full',
        )}
        tabIndex={0}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="tw:inline-block tw:truncate tw:font-medium tw:text-nowrap">
          {selectedVariant === 'single'
            ? singleSelectionValue?.label || options.label
            : options.label}
        </span>
        <Icons.chevronUp
          classname={cn(
            'tw:h-4 tw:w-4 tw:transition-transform tw:duration-300',
            !isOpen && 'tw:rotate-180',
          )}
        />
      </div>

      {isOpen && (
        <div className="tw:top-full tw:z-10 tw:flex tw:max-h-[280px] tw:w-[250px] tw:overflow-y-auto tw:rounded-lg tw:bg-white tw:py-2 tw:max-md:w-full tw:max-md:rounded-t-none tw:md:absolute tw:md:mt-2 tw:md:shadow-[inset_-1px_-1px_4px_4px_rgba(0,0,0,0.02),6px_10px_24px_0px_rgba(0,0,0,0.30)]">
          <div className="tw:max-h-full tw:w-full tw:overflow-y-auto">
            {isGrouped ? renderGroupedOptions() : renderFlatOptions()}
          </div>
        </div>
      )}
    </div>
  );
};
