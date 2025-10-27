import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';
import { FilterDropdown } from '../ProductFilters/components/FilterDropdown';
import { useState } from 'preact/hooks';

/**
 * SortBar Component
 *
 * @description
 * The SortBar component is used to display the total number of items and sort options.
 *
 * @param {Object} props - Component props
 * @param {number} [props.totalitems] - The total number of items to display
 * @param {string} [props.categoryname] - Optional category name to display
 * @param {Function} [props.onprintproductlist] - Callback function to print the product list
 * @param {Array} props.sortoptions - The options for the sort dropdown.
 * @param {Function} props.onsortchange - Callback function when the sort option changes.
 * @param {Function} props.onviewchange - Callback function when the view mode changes.
 * @returns {JSX.Element} Preact component - The SortBar component
 */

const SortBar = ({
  totalitems = 0,
  categoryname,
  sortoptions,
  onsortchange,
  onprintproductlist,
  onviewchange = () => {},
  productview = 'list',
}) => {
  const [sortBy, setSortBy] = useState(
    sortoptions?.items?.find((item) => item.default)?.value ||
      sortoptions?.items?.[0]?.value ||
      '',
  );

  const [view, setView] = useState(productview);

  const handleSortChange = (value) => {
    setSortBy(value);
    if (onsortchange) {
      onsortchange(value);
    }
  };

  const handleViewChange = (view) => {
    setView(view);
    onviewchange(view);
  };

  return (
    <div className="tw:flex tw:flex-col-reverse tw:items-center tw:justify-between tw:lg:flex-row">
      <p className="tw:py-2 tw:text-left tw:max-md:w-full tw:md:py-0">
        Showing <strong>{totalitems}</strong> items
        {categoryname && (
          <>
            {' '}
            in ”<strong>{categoryname}</strong>“
          </>
        )}
      </p>
      <div className="tw:flex tw:space-x-0 tw:py-3 tw:max-md:w-full tw:md:space-x-4 tw:md:py-0">
        <FilterDropdown
          variant="single"
          itemvariant="plain"
          value={sortBy}
          options={sortoptions}
          onchange={handleSortChange}
        />

        <div className="tw:hidden tw:md:flex">
          <Button
            label="Print product list"
            variant="inverse"
            size="small"
            iconleft={<Icons.printer classname="tw:w-4 tw:h-4 " />}
            onClick={onprintproductlist}
          />
        </div>

        <div className="tw:hidden tw:rounded-full tw:bg-white tw:p-1 tw:md:flex">
          <Button
            label="List"
            variant={view === 'list' ? 'tertiary' : 'inverse'}
            classname={cn(view === 'list' && 'tw:pointer-events-none')}
            size="small"
            iconleft={<Icons.list classname="tw:w-4 tw:h-4" />}
            onClick={() => handleViewChange('list')}
          />
          <Button
            label="Grid"
            variant={view === 'grid' ? 'tertiary' : 'inverse'}
            classname={cn(view === 'grid' && 'tw:pointer-events-none')}
            size="small"
            iconleft={<Icons.grid classname="tw:w-4 tw:h-4" />}
            onClick={() => handleViewChange('grid')}
          />
        </div>
      </div>
    </div>
  );
};

export default SortBar;
