import { h, Fragment } from 'preact';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';
import { cn, useMediaQuery } from '../../../utils/helpers';

/**
 * Pagination Component
 *
 * @description Renders a pagination control with customisable page numbers and navigation buttons.
 *
 * @param {Object} props - Component props
 * @param {number} props.currentpage - Current active page number
 * @param {number} props.itemsperpage - Number of items to display per page
 * @param {number} props.totalitems - Total number of items to paginate
 * @param {string} props.theme - Theme of the pagination control
 * @param {function} props.onpagechange - Callback function to notify parent component when page changes
 * @param {string} props.classname - Additional CSS classes
 *
 * @returns {JSX.Element} Preact component
 */

const Pagination = ({
  currentpage = 1,
  totalitems = 0,
  itemsperpage = 25,
  theme = 'light',
  onpagechange,
  classname,
  ...props
}) => {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const totalPages = Math.ceil(totalitems / itemsperpage);

  // Helper function to get the page range
  const getPageRange = () => {
    let pages = [];
    const visiblePages = isMobile ? 5 : 7; // Mobile: 5 pages, Desktop: 7 pages

    if (totalPages <= visiblePages) {
      // If there are fewer pages than the visible pages, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // If there are more pages, show maximum visible pages
      if (currentpage <= Math.ceil(visiblePages / 2)) {
        // Near the beginning
        for (let i = 1; i <= visiblePages - 2; i++) {
          pages.push(i);
        }
        pages.push('...', totalPages);
      } else if (currentpage >= totalPages - Math.floor(visiblePages / 2)) {
        // Near the end
        pages.push(1, '...');
        for (let i = totalPages - (visiblePages - 3); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push(1, '...');
        const middleStart = currentpage - Math.floor((visiblePages - 4) / 2);
        const middleEnd = currentpage + Math.floor((visiblePages - 4) / 2);
        for (let i = middleStart; i <= middleEnd; i++) {
          pages.push(i);
        }
        pages.push('...', totalPages);
      }
    }
    return pages;
  };

  const handlePageChange = (page) => {
    if (page !== currentpage && page > 0 && page <= totalPages) {
      onpagechange(page);
    }
  };

  const renderPageButton = (page) => {
    // Ellipsis Button
    if (page === '...') {
      return (
        <Button
          label="..."
          variant="inverse"
          state="disabled"
          aria-hidden="true"
          classname={cn(
            'tw:pointer-events-none tw:opacity-100 p-0 tw:text-black',
            isMobile ? 'tw:h-10 tw:w-10' : 'tw:h-12 tw:w-12',
            theme === 'dark' && 'tw:bg-secondary-1100',
            theme === 'light' && 'tw:bg-white',
          )}
        />
      );
    }

    // Page Number Button
    return (
      <Button
        label={page}
        variant="inverse"
        onClick={() => handlePageChange(page)}
        aria-current={page === currentpage ? 'page' : undefined}
        classname={cn(
          'p-0',
          isMobile ? 'tw:h-10 tw:w-10' : 'tw:h-12 tw:w-12',
          page === currentpage &&
            'tw:bg-primary tw:text-white 11 tw:pointer-events-none',
          page !== currentpage && theme === 'dark' && 'tw:bg-secondary-1100',
        )}
      />
    );
  };

  // Get the page range
  const pages = getPageRange();

  return (
    <div
      className={cn(
        'tw:flex tw:flex-col tw:items-center tw:justify-center tw:xl:flex-row tw:xl:justify-between',
        classname,
      )}
      {...props}
    >
      {/* Navigation controls */}
      {totalPages > 1 && (
        <nav
          className={cn(
            'tw:flex tw:items-center',
            isMobile ? 'tw:space-x-5' : 'tw:space-x-2',
          )}
          role="navigation"
        >
          {/* Previous Button */}
          <Button
            label={isMobile ? null : 'Previous'}
            variant="inverse"
            iconleft={<Icons.chevronLeft classname="tw:h-4 tw:w-4" />}
            onClick={() => handlePageChange(currentpage - 1)}
            state={currentpage === 1 ? 'disabled' : 'enabled'}
            classname={cn(
              isMobile && 'tw:h-10 tw:w-10',
              currentpage === 1
                ? 'tw:bg-secondary-1000'
                : theme === 'light'
                  ? ''
                  : 'tw:bg-secondary-1100',
            )}
          />

          {/* Page Numbers */}
          <div
            className={cn(
              'tw:flex tw:items-center',
              isMobile ? 'tw:space-x-1' : 'tw:space-x-2',
            )}
            role="group"
          >
            {pages.map((page) => renderPageButton(page))}
          </div>

          {/* Next Button */}
          <Button
            label={isMobile ? null : 'Next'}
            variant="inverse"
            iconright={<Icons.chevronRight classname="tw:h-4 tw:w-4" />}
            onClick={() => handlePageChange(currentpage + 1)}
            state={currentpage === totalPages ? 'disabled' : 'enabled'}
            classname={cn(
              isMobile && 'tw:h-10 tw:w-10',
              currentpage === totalPages
                ? 'tw:bg-secondary-1000'
                : theme === 'light'
                  ? ''
                  : 'tw:bg-secondary-1100',
            )}
          />
        </nav>
      )}
    </div>
  );
};

export default Pagination;
