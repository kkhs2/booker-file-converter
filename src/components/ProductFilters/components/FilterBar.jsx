import { h, Fragment } from 'preact';
import { cn, useMediaQuery } from '../../../../utils/helpers';
import Icons from '../../Icons/Icons';
import { SearchBar } from '../../NavBar/components/SearchBar';
import { FilterDropdown } from './FilterDropdown';
import { FilterToggle } from './FilterToggle';
import { FiltersOverlay } from './FiltersOverlay';
import Button from '../../Button/Button';
import { useOverlay } from '../../../../hooks/useOverlay';
import { useState } from 'preact/hooks';
import GroupToggle from '../../GroupToggle/GroupToggle';

/**
 * FilterBar Component
 *
 * @description
 * The FilterBar component is used to display the filter options.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.filters - The filter object from context/props.
 * @param {Function} props.setFilters - Function to set filters from context/props.
 * @param {Function} props.handleFilterChange - Function to handle filter changes from context/props.
 * @param {Function} props.handleResetFilters - Function to reset filters from context/props.
 * @param {boolean} [props.showsearch=true] - Whether to show the search bar
 * @param {'grouped' | 'ungrouped'} [props.initialgroupstate='grouped'] - Initial state for the group toggle
 * @param {Function} [props.ongroupchange] - Callback function when the group toggle state changes
 * @returns {JSX.Element} Preact component - The FilterBar component
 */

export const FilterBar = ({
  filters,
  setFilters,
  handleFilterChange,
  handleResetFilters,
  showsearch = true,
  initialgroupstate = 'grouped',
  ongroupchange,
}) => {
  const isMobile = useMediaQuery('(max-width: 1023px)');

  const { showOverlay, hideOverlay, portalNode } = useOverlay();

  const [showAllFilters, setShowAllFilters] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const selectedItems =
    filters && typeof filters === 'object'
      ? Object.keys(filters).reduce((acc, key) => {
          const filter = filters[key];

          if (filter && typeof filter === 'object') {
            // Handle toggle filters (filters with boolean value property)
            if (
              filter.hasOwnProperty('value') &&
              typeof filter.value === 'boolean' &&
              filter.value === true
            ) {
              acc = [...acc, { label: filter.label, value: key }];
            }
            // Handle filters with items array (checkbox/dropdown filters)
            else if (filter.items && Array.isArray(filter.items)) {
              acc = [...acc, ...filter.items.filter((item) => item.checked)];
            }
            // Handle grouped filters (e.g., country, packaging)
            else if (typeof filter !== 'boolean') {
              Object.keys(filter).forEach((groupKey) => {
                if (
                  filter[groupKey] &&
                  filter[groupKey].items &&
                  Array.isArray(filter[groupKey].items)
                ) {
                  acc = [
                    ...acc,
                    ...filter[groupKey].items.filter((item) => item.checked),
                  ];
                }
              });
            }
          }

          return acc;
        }, [])
      : [];

  const safeFilters = filters || {};

  const getFilterStructure = (filterKey) => {
    const filterFromState = safeFilters[filterKey];
    const filterFromDefault = filters[filterKey];

    if (filterFromState && typeof filterFromState === 'object') {
      if (
        filterFromState.items ||
        Object.values(filterFromState).some((group) => group && group.items)
      ) {
        return { ...filterFromDefault, ...filterFromState };
      }

      if (
        filterFromState.hasOwnProperty('value') &&
        typeof filterFromState.value === 'boolean'
      ) {
        return { ...filterFromDefault, ...filterFromState };
      }
    }
    return { ...(filterFromDefault || {}) };
  };

  return (
    <div className="tw:rounded-[20px] tw:bg-white tw:px-2 tw:py-3 tw:md:space-y-4 tw:md:px-3 tw:md:py-4">
      {/* Filters Desktop */}
      <div className="tw:hidden tw:items-center tw:justify-between tw:px-3 tw:md:flex">
        {showsearch ? (
          <SearchBar
            variant="filtericon"
            classname="tw:md:flex"
            placeholder="Search within product list"
          />
        ) : (
          <div />
        )}

        <div className="tw:flex tw:items-center tw:gap-4">
          <GroupToggle
            leftlabel="Group by shelf"
            rightlabel="Ungrouped"
            initialstate={initialgroupstate}
            ongroupchange={ongroupchange}
          />

          {filters && Object.keys(filters).length > 5 && (
            <Button
              label={showAllFilters ? 'Show less filters' : 'Show all filters'}
              variant="inverse"
              size="small"
              iconleft={<Icons.settings classname="tw:w-4 tw:h-4 " />}
              onClick={() => setShowAllFilters(!showAllFilters)}
            />
          )}
        </div>
      </div>

      {/* Filters Mobile */}
      <div className="tw:flex tw:items-center tw:justify-between tw:space-x-3 tw:md:hidden">
        {showsearch && (
          <Button
            classname={cn(
              'tw:flex tw:h-12 tw:w-12',
              isMobileSearchOpen && 'tw:hidden',
            )}
            variant="secondary"
            iconright={<Icons.search classname="tw:h-4 tw:w-4" />}
            onClick={() => setIsMobileSearchOpen(true)}
          />
        )}
        {showsearch && (
          <SearchBar
            variant="filtericon"
            placeholder="Search within product list"
            classname={cn(
              'tw:w-0 tw:min-w-0 tw:hidden',
              isMobileSearchOpen && 'tw:w-full tw:min-w-[130px] tw:flex',
            )}
          />
        )}

        <Button
          classname={cn(
            'tw:flex tw:grid-1 tw:w-full tw:h-12',
            showsearch && isMobileSearchOpen && 'tw:flex-auto tw:w-13',
          )}
          label={!showsearch || !isMobileSearchOpen ? 'Filters' : ''}
          variant="secondary"
          size="small"
          iconleft={<Icons.settings classname="tw:w-4 tw:h-4" />}
          onClick={() =>
            showOverlay(FiltersOverlay, {
              onClose: hideOverlay,
              filters,
            })
          }
        />
      </div>

      <div className="tw:hidden tw:grid-cols-[repeat(auto-fill,_204px)] tw:gap-2 tw:px-3 tw:md:grid">
        {Object.keys(filters).map((filterKey, index) => {
          const filterConfig = getFilterStructure(filterKey);
          const isToggle =
            filterConfig.hasOwnProperty('value') &&
            typeof filterConfig.value === 'boolean';
          const isHidden = index >= 6 && !showAllFilters;

          if (isToggle) {
            return (
              <FilterToggle
                key={filterKey}
                label={filterConfig.label}
                value={filterConfig.value}
                tooltip={filterConfig.tooltip}
                hidden={isHidden}
                onchange={() => {
                  handleFilterChange(filterKey);
                }}
              />
            );
          } else {
            return (
              <FilterDropdown
                key={filterKey}
                filterKey={filterKey}
                hidden={isHidden}
                options={filterConfig}
                onchange={handleFilterChange}
                variant={isMobile ? 'single' : 'multi'}
              />
            );
          }
        })}
      </div>

      {selectedItems.length > 0 && (
        <div className="tw:flex tw:flex-wrap tw:space-y-1 tw:space-x-1 tw:px-3 tw:pt-3">
          {selectedItems.map((item) => (
            <button
              key={item.value}
              className="tw:inline-flex tw:cursor-pointer tw:items-center tw:rounded-full tw:bg-grey-1100 tw:px-3 tw:py-2 tw:text-nowrap tw:transition-opacity tw:hover:opacity-80"
              onClick={() => handleFilterChange(item.value)}
            >
              <span className="tw:text-base tw:font-medium">{item.label}</span>
              <Icons.x className="tw:ml-2 tw:h-4 tw:w-4" />
            </button>
          ))}

          <button
            className="tw:inline-flex tw:cursor-pointer tw:items-center tw:px-3 tw:py-2 tw:transition-opacity tw:hover:opacity-80"
            onClick={handleResetFilters}
          >
            <span className="tw:font-medium">Clear all</span>
            <Icons.x className="tw:ml-2 tw:h-4 tw:w-4" />
          </button>
        </div>
      )}
      {portalNode}
    </div>
  );
};
