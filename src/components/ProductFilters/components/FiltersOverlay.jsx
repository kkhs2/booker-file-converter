/**
 * FiltersOverlay component renders a filter panel with various filter options
 * and controls for managing product filters.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.Ref} ref - A forwarded ref for the component.
 *
 * @returns {JSX.Element} The rendered FiltersOverlay component.
 */
import { h, Fragment } from 'preact';
import { forwardRef, useState, useEffect } from 'preact/compat';
import Typography from '../../Typography/Typography';
import Icons from '../../Icons/Icons';
import { FilterDropdown } from './FilterDropdown';
import { FilterToggle } from './FilterToggle';
import Button from '../../Button/Button';
import { cn, useMediaQuery } from '../../../../utils/helpers';
import { useProductFilters } from '../utils/useProductFilters';

export const FiltersOverlay = forwardRef(({ onClose }, ref) => {
  const { filters, setFilters, handleFilterChange, handleResetFilters } =
    useProductFilters();
  const [isFilterFormDirty, setIsFilterFormDirty] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1023px)');

  // Helper function to get merged filter structure
  const getFilterStructure = (filterKey) => {
    const filterFromState = filters?.[filterKey];
    const filterFromDefault = filters[filterKey];

    if (
      filterFromState &&
      typeof filterFromState === 'object' &&
      filterFromState.hasOwnProperty('value') &&
      typeof filterFromState.value === 'boolean'
    ) {
      return { ...filterFromDefault, ...filterFromState };
    }

    if (
      filterFromState &&
      typeof filterFromState === 'object' &&
      (filterFromState.items ||
        Object.values(filterFromState).some((group) => group && group.items))
    ) {
      return { ...filterFromDefault, ...filterFromState };
    }

    return { ...(filterFromDefault || {}) };
  };

  const onFilterChangedWrapper = (itemValue) => {
    setIsFilterFormDirty(true);
    handleFilterChange(itemValue);
  };

  const onToggleChangeWrapper = (filterKey) => {
    setIsFilterFormDirty(true);
    handleFilterChange(filterKey);
  };

  const handleClearAllInOverlay = () => {
    handleResetFilters();
    setIsFilterFormDirty(false);
  };

  // close the overlay when the window is resized
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      onClose();
    }
  });

  useEffect(() => {
    return () => {
      window.removeEventListener('resize', onClose);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      className={cn(
        'tw:relative tw:flex tw:h-full tw:w-full tw:translate-x-full tw:justify-end tw:overflow-auto tw:transition-all tw:duration-1000 tw:group-[.open]:translate-x-0',
        isFilterFormDirty && 'tw:pb-[88px]',
      )}
    >
      <div className="tw:h-full tw:w-full tw:overflow-auto tw:bg-secondary-1000">
        <div className="tw:flex tw:items-center tw:justify-between tw:px-5 tw:py-[14px]">
          <Typography domtype="h4" content="Filters" />

          <button
            className="tw:cursor-pointer tw:transition-opacity tw:hover:opacity-50"
            onClick={() => {
              onClose();
            }}
          >
            <Icons.x
              fill="black"
              classname="tw:w-5 tw:h-5 tw:md:w-6 tw:md:h-6"
            />
          </button>
        </div>

        <div className="tw:space-y-2 tw:px-4 tw:py-3">
          {Object.keys(filters).map((filterKey) => {
            // Changed to iterate over filters keys
            const filterConfig = getFilterStructure(filterKey);

            if (!filterConfig || !filterConfig.label) {
              return null;
            }

            const isToggle =
              filterConfig.hasOwnProperty('value') &&
              typeof filterConfig.value === 'boolean';

            if (isToggle) {
              return (
                <FilterToggle
                  key={filterKey}
                  label={filterConfig.label}
                  value={filterConfig.value}
                  tooltip={filterConfig.tooltip}
                  onchange={() => onToggleChangeWrapper(filterKey)}
                />
              );
            } else {
              if (
                !filterConfig.items &&
                !Object.values(filterConfig).some(
                  (group) => group && group.items,
                )
              ) {
              }
              return (
                <FilterDropdown
                  key={filterKey}
                  filterKey={filterKey}
                  options={filterConfig}
                  onchange={(itemValue) => onFilterChangedWrapper(itemValue)}
                  variant={isMobile ? 'single' : 'multi'}
                />
              );
            }
          })}
        </div>
      </div>

      {isFilterFormDirty && (
        <div className="tw:absolute tw:bottom-0 tw:flex tw:w-full tw:flex-col tw:space-y-3 tw:bg-white tw:px-4 tw:py-5 tw:shadow-[inset_-1px_-1px_4px_4px_rgba(0,0,0,0.02),6px_10px_24px_0px_rgba(0,0,0,0.30)]">
          <Button
            label="Clear all filters"
            variant="secondary"
            onClick={handleClearAllInOverlay}
            classname="tw:w-full"
          />
          <Button
            label="Show results"
            variant="primary"
            onClick={onClose}
            classname="tw:w-full"
          />
        </div>
      )}

      {!isFilterFormDirty && (
        <div className="tw:absolute tw:bottom-0 tw:flex tw:w-full tw:flex-col tw:bg-white tw:px-4 tw:py-5 tw:shadow-[inset_-1px_-1px_4px_4px_rgba(0,0,0,0.02),6px_10px_24px_0px_rgba(0,0,0,0.30)]">
          <Button
            label="Show results"
            variant="primary"
            onClick={onClose}
            classname="tw:w-full"
          />
        </div>
      )}
    </div>
  );
});
