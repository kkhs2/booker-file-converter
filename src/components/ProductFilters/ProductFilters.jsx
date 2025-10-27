import { FilterBar } from './components/FilterBar';
import {
  ProductFiltersProvider,
  useProductFilters,
} from './utils/useProductFilters';

/**
 * ProductFilters Component
 *
 *  @description The ProductFilters component is used to filter products based on various criteria.
 *
 * @param {Object} props - Component props
 * @param {number} [props.totalitems] - The total number of items to display
 * @param {Object} [props.initialfiltersdata] - Optional initial filters data to pass to the provider.
 * @param {Function} [props.onFilterChange] - Optional callback function when a filter changes.
 * @param {Function} [props.onResetFilters] - Optional callback function when filters are reset.
 * @param {Array} [props.sortoptions] - Optional array of sort options to pass to the SortBar.
 * @param {Function} [props.onsortchange] - Optional callback function when the sort option changes.
 * @param {Function} [props.onprintproductlist] - Callback function to print the product list.
 * @param {boolean} [props.showsearch=true] - Whether to show the search bar in the filter bar
 * @param {'grouped' | 'ungrouped'} [props.initialgroupstate='grouped'] - Initial state for the group toggle
 * @param {Function} [props.ongroupchange] - Callback function when the group toggle state changes
 * @returns {JSX.Element} Preact component - The ProductFilters component
 */

const ProductFilters = ({
  totalitems = 0,
  initialfiltersdata,
  onFilterChange,
  onResetFilters,
  sortoptions = { label: 'Sort by', items: [] },
  onsortchange,
  showsearch = true,
  initialgroupstate = 'grouped',
  ongroupchange,
}) => {
  return (
    <ProductFiltersProvider initialfiltersdata={initialfiltersdata}>
      <ProductFiltersContent
        totalitems={totalitems}
        onFilterChange={onFilterChange}
        onResetFilters={onResetFilters}
        sortoptions={sortoptions}
        onsortchange={onsortchange}
        showsearch={showsearch}
        initialgroupstate={initialgroupstate}
        ongroupchange={ongroupchange}
      />
    </ProductFiltersProvider>
  );
};

const ProductFiltersContent = ({
  onFilterChange,
  onResetFilters,
  showsearch,
  initialgroupstate,
  ongroupchange,
}) => {
  const {
    filters,
    setFilters,
    handleFilterChange: hookHandleFilterChange,
    handleResetFilters: hookHandleResetFilters,
  } = useProductFilters();

  // Wrap hook functions to also call external handlers
  const handleFilterChange = (filterKey, itemValue, isChecked) => {
    hookHandleFilterChange(filterKey, itemValue, isChecked);
    onFilterChange?.(filterKey, itemValue, isChecked);
  };

  const handleResetFilters = () => {
    hookHandleResetFilters();
    onResetFilters?.();
  };

  return (
    <div className="tw:md:space-y-8">
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        handleFilterChange={handleFilterChange}
        handleResetFilters={handleResetFilters}
        showsearch={showsearch}
        initialgroupstate={initialgroupstate}
        ongroupchange={ongroupchange}
      />
    </div>
  );
};

export default ProductFilters;
