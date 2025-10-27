/**
 * Context and provider for managing product filters and sorting in the application.
 *
 * @module useProductFilters
 */

import { filterChange, filterSingleChange } from './filterHelpers';
import { useState, useContext } from 'preact/hooks';
import { createContext } from 'preact/compat';

/**
 * Context for product filters.
 * Provides state and handlers for managing filters and sorting.
 */
const ProductFiltersContext = createContext();

/**
 * Provider component for the ProductFiltersContext.
 * Wraps children components and provides filter and sorting state management.
 *
 * @param {Object} props - The props for the provider component.
 * @param {React.ReactNode} props.children - The child components to wrap with the provider.
 * @param {Object} [props.initialfiltersdata] - Optional initial filters data.
 *
 * @returns {JSX.Element} The provider component wrapping its children.
 */
export const ProductFiltersProvider = ({ children, initialfiltersdata }) => {
  const [filters, setFilters] = useState(initialfiltersdata);
  const [sortBy, setSortBy] = useState('best-sellers');

  /**
   * Updates the filters state based on the provided value.
   *
   * @param {Object|string} value - The value to update the filters with.
   *                                Can be a string for multi-mode or an object for single-mode.
   */
  const handleFilterChange = (value) => {
    setFilters((prev) => {
      // Check if this is a single mode selection
      if (typeof value === 'object' && value.variant === 'single') {
        return filterSingleChange(prev, value.filterKey, value.value);
      }
      // Handle multi-mode or toggle filters
      return filterChange(prev, value);
    });
  };

  /**
   * Resets the filters state to the initial filters.
   */
  const handleResetFilters = () => {
    setFilters((prev) => {
      const updatedFilters = { ...initialfiltersdata }; // Reset to initial structure

      Object.keys(updatedFilters).forEach((filterKey) => {
        const filter = updatedFilters[filterKey];

        if (typeof filter === 'object' && filter !== null) {
          if (
            filter.hasOwnProperty('value') &&
            typeof filter.value === 'boolean'
          ) {
            // This is a toggle filter like previouslyOrdered or nonHfss
            updatedFilters[filterKey] = { ...filter, value: false };
          } else if (filter.items && Array.isArray(filter.items)) {
            // Handle filters with a direct 'items' array
            updatedFilters[filterKey] = {
              ...filter,
              items: filter.items.map((item) => ({ ...item, checked: false })),
            };
          } else {
            // Handle grouped filters (e.g., country, packaging)
            const newFilterGroup = { ...filter };
            let groupModified = false;
            Object.keys(newFilterGroup).forEach((groupKey) => {
              if (
                newFilterGroup[groupKey] &&
                typeof newFilterGroup[groupKey] === 'object' &&
                newFilterGroup[groupKey].items &&
                Array.isArray(newFilterGroup[groupKey].items)
              ) {
                newFilterGroup[groupKey] = {
                  ...newFilterGroup[groupKey],
                  items: newFilterGroup[groupKey].items.map((item) => ({
                    ...item,
                    checked: false,
                  })),
                };
                groupModified = true;
              }
            });
            if (groupModified) {
              updatedFilters[filterKey] = newFilterGroup;
            }
          }
        }
      });
      return updatedFilters;
    });
  };

  return (
    <ProductFiltersContext.Provider
      value={{
        filters,
        sortBy,
        setSortBy,
        setFilters,
        handleFilterChange,
        handleResetFilters,
      }}
    >
      {children}
    </ProductFiltersContext.Provider>
  );
};

/**
 * Custom hook to access the ProductFiltersContext.
 * Throws an error if used outside of a ProductFiltersProvider.
 *
 * @returns {Object} The context value containing filters, sorting, and handlers.
 *
 * @throws {Error} If the hook is used outside of a ProductFiltersProvider.
 */
export const useProductFilters = () => {
  const context = useContext(ProductFiltersContext);
  if (!context) {
    throw new Error(
      'useProductFilters must be used within a ProductFiltersProvider',
    );
  }
  return context;
};
