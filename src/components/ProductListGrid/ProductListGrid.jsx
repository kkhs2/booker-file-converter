import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';

/**
 * ProductListGrid component that handles display of products in either grid or list view
 * @param {Object} props - Component props
 * @param {string} props.viewmode - The current view mode ('grid' or 'list')
 * @param {React.ReactNode} props.children - Child elements to render within the grid/list
 * @returns {React.ReactElement}
 */
const ProductListGrid = ({ viewmode = 'list', children }) => {
  return (
    <div
      className={cn(
        viewmode === 'grid'
          ? 'tw:grid tw:grid-cols-1 tw:gap-4 tw:gap-y-6 tw:sm:grid-cols-2 tw:lg:grid-cols-3 tw:2xl:grid-cols-4'
          : 'tw:flex tw:flex-col tw:gap-4',
      )}
    >
      {children}
    </div>
  );
};

export default ProductListGrid;
