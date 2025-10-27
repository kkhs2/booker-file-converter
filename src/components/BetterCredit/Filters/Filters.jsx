/**
 * Filters Component
 *
 * @description Renders a filter bar with dropdowns and search functionality.
 *
 * @param {Object} props - Component props
 * @param {Array} props.filters - Array of filter objects
 * @param {Object} props.activefilters - Object to control filter state
 * @param {string} props.searchplaceholder - Placeholder text for search input
 * @param {string} props.searchmobileplaceholder - Placeholder text for search input on mobile
 * @param {string} props.currentaccountyear - Current account year
 * @param {string} props.prevaccountyear - Previous account year
 * @param {string} props.searchValue - Current search value
 * @param {function} props.onclearsearch - Callback function to notify parent component when the clear search button is clicked
 * @param {function} props.onfilterchange - Callback function to notify parent component when the filter value changes
 * @param {function} props.onfilterclear - Callback function to notify parent component when the clear filters button is clicked
 * @param {function} props.onsearch - Callback function to notify parent component when the search value changes
 * @param {string} props.classname - Additional CSS classes
 *
 * @returns {JSX.Element} Preact component
 *
 */

// Imports
import { h, Fragment } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import { forwardRef } from 'preact/compat';
import { cn } from '../../../../utils/helpers';
import Button from '../../Button/Button';
import Icons from '../../Icons/Icons';
import Typography from '../../Typography/Typography';
import Dropdown from '../Dropdown/Dropdown';
import SearchInput from '../../Form/SearchInput';

const Filters = forwardRef(
  (
    {
      filters = [],
      activefilters = {},
      searchplaceholder = 'Search by number',
      searchmobileplaceholder = 'Search',
      currentaccountyear,
      prevaccountyear,
      searchValue = '',

      onclearsearch,
      onfilterchange,
      onfilterclear,
      onsearch,
      classname,
      searchsuggestions = [],
      ...props
    },
    ref,
  ) => {
    // State for mobile filter modal
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [filterState, setFilterState] = useState(activefilters);
    const [showCustomDateRange, setShowCustomDateRange] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const modalRef = useRef(null);
    const overlayRef = useRef(null);
    const inputRef = useRef(null);
    const dropdownRefs = useRef({});

    // Handle body scroll lock when modal is open
    useEffect(() => {
      const body = document.body;
      if (isModalOpen) {
        body.classList.add('tw:overflow-hidden');
        setIsOverlayVisible(true);
      } else {
        body.classList.remove('tw:overflow-hidden');
        setTimeout(() => {
          if (!isModalOpen) setIsOverlayVisible(false);
        }, 300);
      }
      return () => body.classList.remove('tw:overflow-hidden');
    }, [isModalOpen]);

    useEffect(() => {
      // Handle external clear requests (from parent components)
      const handleExternalClear = () => {
        handleClearFilters();
      };

      window.addEventListener('clearAllFilters', handleExternalClear);
      return () =>
        window.removeEventListener('clearAllFilters', handleExternalClear);
    }, []);

    // Expose handleClearFilters to parent through ref
    useEffect(() => {
      if (ref) {
        ref.current = {
          handleClearFilters,
        };
      }
    }, [ref]);

    // Handle filter change
    const handleFilterChange = (key, value) => {
      // For Select component, value might be an object with a value property
      const isSelectValue =
        typeof value === 'object' && value && 'value' in value;
      const actualValue = isSelectValue ? value.value : value;
      const valueToSet = actualValue === '' ? null : actualValue;

      // Handle null value first
      if (value === null || value === '') {
        setFilterState((prevState) => ({
          ...prevState,
          [key]: null,
          ...(key === 'date' ? { startDate: null, endDate: null } : {}),
        }));

        if (key === 'date') {
          onfilterchange?.('startDate', null);
          onfilterchange?.('endDate', null);
        }
        onfilterchange?.(key, null);
        return;
      }

      // Handle custom date range from dropdown
      if (typeof value === 'object' && value?.type === 'Custom Date Range') {
        setFilterState((prevState) => ({
          ...prevState,
          [key]: value.value,
          startDate: value.startDate,
          endDate: value.endDate,
        }));

        onfilterchange?.('startDate', value.startDate);
        onfilterchange?.('endDate', value.endDate);
        onfilterchange?.(key, value.value);
        return;
      }

      // Handle regular options
      setFilterState((prevState) => ({
        ...prevState,
        [key]: valueToSet,
        ...(key === 'date' ? { startDate: null, endDate: null } : {}),
      }));

      if (key === 'date') {
        onfilterchange?.('startDate', null);
        onfilterchange?.('endDate', null);
      }
      onfilterchange?.(key, valueToSet);

      // Update dropdowns
      const dropdownRef = dropdownRefs.current[key];
      if (dropdownRef) {
        if (valueToSet === null) {
          dropdownRef.reset();
        } else {
          dropdownRef.setValue(valueToSet);
        }
      }
    };

    // Modify ref setup to use callback ref pattern
    const setDropdownRef = (key) => (el) => {
      if (el) {
        dropdownRefs.current[key] = el;
      }
    };

    // Update search handling
    const handleSearch = (value) => {
      onsearch?.(value);
    };

    // Update clear filters handling
    const handleClearFilters = () => {
      // Clear filter state
      setFilterState({});
      setStartDate('');
      setEndDate('');

      // Clear dropdowns using refs
      Object.values(dropdownRefs.current).forEach((dropdownRef) => {
        if (dropdownRef?.reset) {
          dropdownRef.reset();
        }
      });

      // Clear search input using ref
      if (inputRef.current?.reset) {
        inputRef.current.reset(); // Use the new reset method instead of directly setting value
      }

      // Notify parent components
      onfilterclear?.();
      if (onclearsearch) {
        onclearsearch?.();
      }
    };

    // In the custom date range panel
    const handleCustomDateRangeSubmit = () => {
      // Update both start and end dates in both states
      setFilterState((prevState) => ({
        ...prevState,
        startDate,
        endDate,
        date: 'Custom Date Range',
      }));

      // Update parent component
      onfilterchange?.('startDate', startDate);
      onfilterchange?.('endDate', endDate);
      onfilterchange?.('date', 'Custom Date Range');
      setShowCustomDateRange(false);
    };

    // Render filter buttons for mobile view
    const renderFilterButtons = (filter) => {
      if (filter.type === 'date') {
        // Date type options
        const dateOptions = [
          { value: 'All', selected: filterState[filter.key] === 'All' },
          {
            value: 'Last 3 months',
            selected: filterState[filter.key] === 'Last 3 months',
          },
          {
            value: 'Last 6 months',
            selected: filterState[filter.key] === 'Last 6 months',
          },
          {
            value: 'Last 12 months',
            selected: filterState[filter.key] === 'Last 12 months',
          },
          {
            value: currentaccountyear,
            selected: filterState[filter.key] === currentaccountyear,
          },
          {
            value: prevaccountyear,
            selected: filterState[filter.key] === prevaccountyear,
          },
          {
            value: 'Custom date range',
            selected:
              filterState[filter.key] === 'Custom Date Range' &&
              filterState.startDate &&
              filterState.endDate,
          },
        ];

        return (
          <div className="tw:my-3 tw:flex tw:flex-wrap tw:gap-2">
            {dateOptions.map((option) => (
              <button
                key={option.value}
                className={cn(
                  'filter-button tw:rounded-full tw:bg-beige-1000 tw:px-3 tw:py-2 tw:text-base tw:font-medium tw:focus:outline-hidden',
                  (filterState[filter.key] === option.value ||
                    (option.value === 'Custom date range' &&
                      filterState[filter.key] === 'Custom Date Range' &&
                      filterState.startDate &&
                      filterState.endDate)) &&
                    'tw:bg-primary tw:text-white',
                )}
                onClick={() => {
                  if (option.value === 'Custom date range') {
                    setShowCustomDateRange(true);
                  } else if (
                    filterState[filter.key] === option.value ||
                    (option.value === 'Custom date range' &&
                      filterState[filter.key] === 'Custom Date Range')
                  ) {
                    handleFilterChange(filter.key, '');
                  } else {
                    handleFilterChange(filter.key, option.value);
                  }
                }}
                data-filter={filter.key}
                data-value={option.value}
                aria-checked={
                  filterState[filter.key] === option.value ||
                  (option.value === 'Custom date range' &&
                    filterState[filter.key] === 'Custom Date Range' &&
                    filterState.startDate &&
                    filterState.endDate)
                }
              >
                {option.value}
              </button>
            ))}
          </div>
        );
      }

      return (
        <div className="tw:my-3 tw:flex tw:flex-wrap tw:gap-2">
          {filter.items?.map((item) => {
            const itemValue = typeof item === 'object' ? item.value : item;
            const itemLabel = typeof item === 'object' ? item.label : item;

            return (
              <button
                key={itemValue}
                className={cn(
                  'filter-button tw:rounded-full tw:bg-beige-1000 tw:px-3 tw:py-2 tw:text-base tw:font-medium tw:focus:outline-hidden',
                  filterState[filter.key] === itemValue &&
                    'tw:bg-primary tw:text-white',
                )}
                onClick={() => {
                  // If clicking an active filter, clear it
                  if (filterState[filter.key] === itemValue) {
                    handleFilterChange(filter.key, '');
                  } else {
                    handleFilterChange(filter.key, itemValue);
                  }
                }}
                data-filter={filter.key}
                data-value={itemValue}
                aria-checked={filterState[filter.key] === itemValue}
              >
                {itemLabel}
              </button>
            );
          })}
        </div>
      );
    };

    // Count active filters
    const getActiveFiltersCount = () => {
      let count = 0;

      // Count regular filters (exclude startDate and endDate as they are part of custom date range)
      Object.keys(filterState).forEach((key) => {
        if (
          key !== 'startDate' &&
          key !== 'endDate' &&
          filterState[key] !== null &&
          filterState[key] !== ''
        ) {
          count++;
        }
      });

      return count;
    };

    // Custom date range panel
    const renderCustomDateRange = () => (
      <div
        id="custom-date-module"
        className={cn('tw:px-4 tw:py-4', !showCustomDateRange && 'tw:hidden')}
      >
        <button
          className="tw:mb-8 tw:flex tw:cursor-pointer tw:items-center tw:space-x-2 tw:transition-opacity tw:hover:opacity-50 tw:md:mb-6"
          onClick={() => setShowCustomDateRange(false)}
        >
          <Icons.chevronLeft classname="tw:w-4 tw:h-4" />
          <span>Back</span>
        </button>

        <div className="tw:mt-3 tw:rounded-xl tw:bg-secondary-1100 tw:p-3">
          <div className="tw:mb-6 tw:flex tw:items-center tw:justify-between tw:border-b tw:border-gray-300 tw:pt-4 tw:pb-2 tw:text-base tw:font-medium">
            Custom date range
          </div>
          <div>
            <label
              htmlFor="start-date-filter"
              className="tw:block tw:text-sm tw:leading-[18.20px] tw:font-normal tw:text-gray-800"
            >
              From date
            </label>
            <input
              type="date"
              id="start-date-filter"
              name="start-date-filter"
              className="tw:mt-1 tw:block tw:w-full tw:rounded-lg tw:border tw:border-gray-300 tw:bg-white tw:p-3 tw:leading-tight tw:text-gray-800 tw:uppercase tw:placeholder:text-grey-600"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="tw:mt-4">
            <label
              htmlFor="end-date-filter"
              className="tw:block tw:text-sm tw:leading-[18.20px] tw:font-normal tw:text-gray-800"
            >
              To date
            </label>
            <input
              type="date"
              id="end-date-filter"
              name="end-date-filter"
              className="tw:mt-1 tw:block tw:w-full tw:rounded-lg tw:border tw:border-gray-300 tw:bg-white tw:p-3 tw:leading-tight tw:text-gray-800 tw:uppercase tw:placeholder:text-grey-600"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="tw:mt-6 tw:flex tw:justify-between tw:gap-3">
            <Button
              label="Cancel"
              variant="secondary"
              classname="tw:w-[40%]"
              onClick={() => setShowCustomDateRange(false)}
            />
            <Button
              label="Set date range"
              variant="tertiary"
              state={startDate && endDate ? 'enabled' : 'disabled'}
              classname="tw:w-[60%]"
              onClick={handleCustomDateRangeSubmit}
            />
          </div>
        </div>
      </div>
    );

    // Mobile filter modal
    const renderModal = () => (
      <>
        {/* Overlay */}
        <div
          ref={overlayRef}
          className={cn(
            'tw:fixed tw:inset-0 tw:z-40 tw:bg-[rgba(0,0,0,0.30)] tw:transition-opacity tw:duration-300 tw:ease-in-out',
            isOverlayVisible
              ? 'tw:block tw:opacity-100'
              : 'tw:hidden tw:opacity-0',
          )}
          onClick={() => setIsModalOpen(false)}
          aria-hidden="true"
        />

        {/* Modal content */}
        <div
          ref={modalRef}
          className={cn(
            'tw:fixed tw:inset-x-0 tw:bottom-0 tw:z-61 tw:max-h-[80vh] tw:w-full tw:overflow-y-auto tw:bg-white',
            'tw:scrollbar-hide tw:rounded-t-[12px] tw:shadow-lg tw:transition-transform tw:duration-300 tw:ease-in-out',
            isModalOpen ? 'tw:translate-y-0' : 'tw:translate-y-full',
          )}
        >
          <div className="tw:sticky tw:top-0 tw:z-10 tw:flex tw:items-center tw:justify-between tw:bg-white tw:px-4 tw:pt-4 tw:pb-2">
            <Typography
              variant="h4"
              content="Filter"
              id="filter-modal-title"
              classname="tw:text-3xl"
            />
            <button
              onClick={() => setIsModalOpen(false)}
              aria-label="Close filters"
              className="tw:p-2"
            >
              {<Icons.x classname="tw:h-5 tw:w-5" />}
            </button>
          </div>

          {!showCustomDateRange &&
            filters.map((filter) => (
              <div
                key={filter.key}
                className="filter-group-section tw:px-4 tw:py-4"
              >
                <div className="tw:border-b tw:border-grey-200">
                  <Typography
                    variant="h3"
                    content={filter.label}
                    classname="tw:mb-3 tw:mt-2 tw:font-bold tw:text-base"
                  />
                </div>
                {renderFilterButtons(filter)}
              </div>
            ))}

          {renderCustomDateRange()}

          <div
            className={cn(
              'tw:p-4',
              'filter-controls',
              showCustomDateRange && 'tw:hidden',
            )}
          >
            <Button
              label={`Apply Filters${getActiveFiltersCount() > 0 ? ` (${getActiveFiltersCount()})` : ''}`}
              variant="tertiary"
              classname="tw:w-full tw:mb-2"
              onClick={() => {
                setIsModalOpen(false);
              }}
            />
            <Button
              label="Clear Selected"
              variant="secondary"
              classname="tw:w-full"
              onClick={() => {
                handleClearFilters();
                setIsModalOpen(false);
              }}
            />
          </div>
        </div>
      </>
    );

    // Mobile filter button
    const renderMobileFilters = () => (
      <div className="tw:my-8 tw:flex tw:w-full tw:items-center tw:justify-between tw:space-x-3 tw:lg:hidden">
        <Button
          classname={cn(
            'tw:flex tw:h-12 tw:w-12',
            isMobileSearchOpen && 'tw:hidden',
          )}
          variant="secondary"
          iconright={<Icons.search classname="tw:h-4 tw:w-4" />}
          onClick={() => setIsMobileSearchOpen(true)}
        />

        {isMobileSearchOpen && (
          <div
            className={cn(
              'tw:hidden tw:w-full tw:flex-1 tw:transition-all',
              isMobileSearchOpen && 'tw:flex tw:min-w-[130px]',
            )}
          >
            <SearchInput
              variant="with-border"
              classname="tw:w-full tw:shadow-none "
              placeholder="Search by invoice number"
              onInput={(e) => handleSearch(e.target.value)}
              enabletabcompletion={true}
              value={searchValue}
              searchsuggestions={searchsuggestions}
            />
          </div>
        )}

        <Button
          classname={cn(
            'tw:flex tw:grid-1 tw:w-full tw:h-12',
            isMobileSearchOpen && ' tw:w-13 tw:h-14',
          )}
          label={!isMobileSearchOpen ? 'Filters' : ''}
          variant="secondary"
          size="small"
          iconleft={<Icons.settings classname="tw:w-4 tw:h-4" />}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
    );

    return (
      <div className={cn('tw:relative', classname)} {...props}>
        <div className="tw:flex tw:w-full tw:items-center tw:justify-between tw:gap-2 tw:lg:gap-4">
          {renderMobileFilters()}
          <div className="tw:hidden tw:items-center tw:gap-3 tw:lg:flex tw:lg:w-1/2">
            <span className="tw:text-lg tw:font-bold tw:whitespace-nowrap tw:text-gray-800">
              Filter by:
            </span>
            {filters.map((filter) =>
              filter.key === 'date' ? (
                <Dropdown
                  key={filter.key}
                  ref={setDropdownRef(filter.key)}
                  label={filter.label}
                  options={filter.items}
                  type={filter.type || 'default'}
                  prevaccountyear={
                    filter.type === 'date' ? prevaccountyear : null
                  }
                  currentaccountyear={
                    filter.type === 'date' ? currentaccountyear : null
                  }
                  onchange={(value) => handleFilterChange(filter.key, value)}
                  selectedvalue={filterState[filter.key]}
                  customStartDate={filterState.startDate}
                  customEndDate={filterState.endDate}
                />
              ) : (
                <Dropdown
                  key={filter.key}
                  ref={setDropdownRef(filter.key)}
                  label={filter.label}
                  options={filter.items.map((item) => item.value || item)}
                  type="default"
                  onchange={(value) => handleFilterChange(filter.key, value)}
                  selectedvalue={filterState[filter.key]}
                />
              ),
            )}
          </div>
          <div className="tw:flex tw:flex-1 tw:items-center tw:gap-4 tw:max-lg:hidden tw:lg:min-w-[260px] tw:lg:flex-none">
            <SearchInput
              variant="with-border"
              classname="tw:md:flex tw:shadow-none"
              placeholder="Search by invoice number"
              onInput={(e) => handleSearch(e.target.value)}
              enabletabcompletion={true}
              value={searchValue}
              searchsuggestions={searchsuggestions}
            />
          </div>
        </div>
        {renderModal()}
      </div>
    );
  },
);

export default Filters;
