/**
 * Document Actions Panel Component
 *
 * Renders a panel with action buttons and total information for selected invoices.
 * Supports both mobile and desktop layouts with different interactions.
 *
 * Props:
 * @param {Object} props - Component props
 * @param {number} props.selectedcount - Number of selected invoices
 * @param {number} props.total - Total amount of selected invoices
 * @param {boolean} props.ispayable - Whether the table is payable
 * @param {string} props.currency - Currency symbol to display
 * @param {Array} props.selectedrows - Array of selected row objects
 * @param {string} props.documenttype - Type of document being displayed (optional)
 * @param {Function} props.ondownload - Callback when download button is clicked (type, selectedRows, documentType, completeCallback)
 * @param {string} props.classname - Additional CSS classes
 *
 * @returns {JSX.Element} Preact component
 */

// Imports
import { h, Fragment } from 'preact';
import { useState, useEffect, useRef, useCallback } from 'preact/hooks';
import { cn, useMediaQuery } from '../../../../utils/helpers';
import Icons from '../../Icons/Icons';
import Button from '../../Button/Button';
import Typography from '../../Typography/Typography';

const DocumentActionsPanel = ({
  selectedcount = 0,
  total = 0,
  ispayable = false,
  currency = '£',
  selectedrows = [],
  documenttype = 'invoice',
  ondownload,
  classname,
  ...props
}) => {
  // Responsive state management
  const isMobile = useMediaQuery('(max-width: 1023px)');

  // State variables for dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Controls initial panel visibility based on selection
  const [isInitiallyVisible, setIsInitiallyVisible] = useState(
    selectedcount > 0,
  );
  const downloadOptionsRef = useRef(null);

  // State variables for loading states
  const [loadingStates, setLoadingStates] = useState({
    pdf: false,
    csv: false,
  });

  // Animate panel visibility and handle dropdown state when selection changes
  useEffect(() => {
    setIsInitiallyVisible(selectedcount > 0);
    if (selectedcount === 0) {
      setIsDropdownOpen(false);
      setIsMobileOpen(false);
    }
  }, [selectedcount]);

  // Handle download button state changes
  const handleDownload = (type) => {
    setLoadingStates((prev) => ({
      ...prev,
      [type]: true,
    }));

    // Call the ondownload callback with type, selected rows, document type, and a completion callback
    if (ondownload) {
      ondownload(type, selectedrows, documenttype, () => {
        // This callback will be called by the parent when download completes
        setLoadingStates((prev) => ({
          ...prev,
          [type]: false,
        }));
      });
    }
  };

  // Reset all download buttons to initial state
  const resetDownloadButtons = () => {
    setLoadingStates({
      pdf: false,
      csv: false,
    });
  };

  // Handle dropdown menu toggle with different behaviour for mobile/desktop
  const handleDropdownToggle = () => {
    if (isMobile) {
      setIsMobileOpen(true);
    } else {
      setIsDropdownOpen((prev) => {
        if (prev) {
          resetDownloadButtons();
        }
        return !prev;
      });
    }
  };

  // Handle responsive layout changes
  const handleResize = useCallback(() => {
    if (!isMobile && isMobileOpen) {
      setIsMobileOpen(false);
    }
  }, [isMobile, isMobileOpen]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Close mobile panel and reset buttons
  const handleMobileClose = () => {
    setIsMobileOpen(false);
    resetDownloadButtons();
  };

  // Reusable download button component
  const renderDownloadButton = (type) => {
    const isLoading = loadingStates[type.toLowerCase()];
    return (
      <button
        className="tw:ml-auto tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:gap-3 tw:rounded-[10px] tw:border tw:border-secondary-1300 tw:bg-white tw:p-4 tw:text-base tw:font-medium tw:transition-colors tw:hover:border-secondary-1000 tw:hover:bg-secondary-1000"
        data-action={type.toLowerCase()}
        onClick={() => {
          handleDownload(type.toLowerCase());
        }}
        disabled={selectedcount < 1 || isLoading}
      >
        {!isLoading && (
          <span className="download-icon">{<Icons.download />}</span>
        )}
        {isLoading && (
          <span className="tw:animate-spin">{<Icons.loader />}</span>
        )}
        <span className="tw:whitespace-nowrap">
          Download as <span className="tw:font-bold">.{type}</span>
        </span>

        {type.toLowerCase() === 'pdf' ? (
          <img src="./images/pdf-icon.png" className="tw:ml-auto" />
        ) : (
          <img src="./images/csv-icon.png" className="tw:ml-auto" />
        )}
      </button>
    );
  };

  return (
    <div>
      {/* Main panel - slides up from bottom */}
      <div
        className={cn(
          'tw:fixed tw:bottom-0 tw:left-0 tw:z-60 tw:w-full tw:transform tw:transition-all tw:duration-500',
          'tw:flex tw:flex-col tw:rounded-t-[20px] tw:bg-white tw:p-3 tw:shadow-[0px_0px_36px_0px_rgba(0,0,0,0.24)] tw:lg:px-8 tw:lg:py-6 tw:lg:shadow-[4px_4px_40px_-24px_rgba(0,0,0,0.1)]',
          'tw:items-center tw:justify-between tw:lg:flex-row',
          isInitiallyVisible ? '' : 'tw:translate-y-full',
          isMobileOpen ? 'tw:translate-y-full' : 'tw:translate-y-0',
          classname,
        )}
        {...props}
      >
        <div className="tw:flex tw:w-full tw:flex-col tw:items-center tw:justify-between tw:gap-4 tw:lg:flex-row">
          {/* Left side - Invoice selection status */}
          <div className="tw:flex tw:w-full tw:items-center tw:gap-3 tw:px-3">
            <span className="tw:hidden tw:lg:block" aria-hidden="true">
              {
                <Icons.file
                  classname={cn(
                    'tw:h-4 tw:w-4',
                    selectedcount > 0 ? 'tw:text-primary' : 'tw:text-gray-300',
                  )}
                />
              }
            </span>
            <span>
              {selectedcount > 0 ? (
                <span>
                  <span className="tw:font-bold">{selectedcount}</span> invoice
                  {selectedcount > 1 ? 's' : ''} selected
                  {ispayable && (
                    <span>
                      , totalling{' '}
                      <span className="tw:font-bold">
                        {currency}
                        {total.toFixed(2)}
                      </span>
                    </span>
                  )}
                </span>
              ) : (
                <span>
                  <span className="tw:font-bold">No invoices selected.</span>{' '}
                  Select an invoice to {ispayable ? 'pay or ' : ''}download.
                </span>
              )}
            </span>
          </div>
        </div>
        {/* Right side - Action buttons */}
        <div className="tw:flex tw:w-full tw:items-center tw:gap-3 tw:lg:w-auto">
          {/* Download dropdown section */}
          <div className="tw:relative tw:w-full tw:lg:min-w-[240px]">
            <Button
              variant="secondary"
              label={`Download invoice${selectedcount > 1 ? 's' : ''}`}
              iconright={
                !isMobile && (
                  <Icons.chevronUp
                    classname={isDropdownOpen && 'tw:rotate-180'}
                  />
                )
              }
              state={selectedcount > 0 ? 'enabled' : 'disabled'}
              disabled={selectedcount === 0}
              classname="tw:lg:w-[240px] tw:w-full tw:whitespace-nowrap"
              onClick={handleDropdownToggle}
            />

            <div
              ref={downloadOptionsRef}
              className={cn(
                'tw:absolute tw:right-0 tw:bottom-full tw:mb-3 tw:w-full tw:min-w-[270px] tw:origin-bottom tw:space-y-3 tw:overflow-hidden tw:rounded-lg tw:bg-white tw:p-3 tw:shadow-[-1px_-1px_4px_4px_rgba(0,0,0,0.1)] tw:transition-all tw:duration-300 tw:ease-in-out',
                isDropdownOpen
                  ? 'tw:max-h-[200px] tw:opacity-100'
                  : 'tw:max-h-0 tw:opacity-0',
              )}
              style={{
                transform: isDropdownOpen
                  ? 'translateY(0) '
                  : 'translateY(10px) ',
              }}
            >
              {renderDownloadButton('PDF')}
              {renderDownloadButton('CSV')}
            </div>
          </div>

          {/* Pay button - only shown if payable */}
          {ispayable && (
            <Button
              label="Pay total"
              variant="tertiary"
              disabled={selectedcount < 1}
              classname="tw:lg:min-w-[240px] tw:min-w-[calc(50%-6px)]"
            />
          )}
        </div>
      </div>

      {/* Mobile download panel */}
      <div
        className={cn(
          'tw:fixed tw:bottom-0 tw:left-0 tw:z-40 tw:w-full tw:transform',
          'tw:translate-y-full tw:transition-all tw:duration-500',
          'tw:bg-white tw:p-4 tw:shadow-[0_0_36px_0_rgba(0,0,0,0.1)] tw:lg:hidden',
          isMobileOpen
            ? 'tw:translate-y-0 tw:opacity-100'
            : 'tw:translate-y-full tw:opacity-0',
        )}
      >
        <div className="tw:space-y-4">
          <div className="tw:mb-4 tw:flex tw:items-center tw:justify-between">
            <Typography
              content="Download invoice"
              domtype="h4"
              classname="tw:font-medium"
            />

            <button className="close-bottom-panel" onClick={handleMobileClose}>
              <Icons.x classname="tw:h-5 tw:w-5" />
            </button>
          </div>
          {renderDownloadButton('PDF')}
          {renderDownloadButton('CSV')}
        </div>
      </div>
    </div>
  );
};

export default DocumentActionsPanel;
