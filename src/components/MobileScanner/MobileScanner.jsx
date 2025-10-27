import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { cn } from '../../../utils/helpers';
import Icons from '../Icons/Icons';
import ProductCard from '../ProductCard/ProductCard';

/**
 * MobileScanner Component
 *
 *  @description MobileScanner component for using with Scandit.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Title displayed in the scanner header
 * @param {JSX.Element} props.children - Content to display within the scanner
 * @param {Function} props.onclose - Function called when the scanner is closed
 * @param {Array} props.results - Array of product results to display in the scanner
 * @param {boolean} props.loading - Indicates if the scanner is in a loading state
 * @param {string} [props.classname] - Additional classes to add to the component
 * @param {Object} props.hidebottompanel - Whether to hide the bottom panel
 * @returns {JSX.Element} Preact component - The MobileScanner component
 */

const MobileScanner = ({
  title,
  children,
  onclose,
  results,
  loading,
  hidebottompanel = false,
  classname,
  ...props
}) => {
  const [showPanel, setShowPanel] = useState(!hidebottompanel);

  // Close mobile search when MobileScanner is mounted
  useEffect(() => {
    const closeMobileSearchEvent = new CustomEvent('closeMobileSearch', {
      detail: { source: 'MobileScanner' },
    });
    document.dispatchEvent(closeMobileSearchEvent);
  }, []);

  return (
    <div
      className={cn(
        'tw:absolute tw:left-0 tw:z-[99] tw:flex tw:h-full tw:w-full tw:flex-col tw:overflow-hidden tw:bg-transparent',
        classname,
      )}
      {...props}
    >
      {/* header */}
      <div className="tw:flex tw:items-center tw:justify-between tw:bg-secondary-1000 tw:p-4 tw:pl-5">
        <div className="tw:flex tw:items-center tw:gap-2">
          <Icons.barcode className="tw:h-5 tw:w-5 tw:text-primary" />
          <p className="tw:text-[13px]">{title}</p>
        </div>
        <button onClick={() => onclose()}>
          <span className="tw:sr-only">Close</span>
          <Icons.x className="tw:h-5 tw:w-5 tw:text-black" />
        </button>
      </div>

      <div className="tw:flex tw:h-full tw:w-full">{children}</div>

      {/* content */}
      {showPanel && (
        <div
          className="tw:fixed tw:right-0 tw:bottom-0 tw:left-0 tw:overflow-y-auto tw:bg-secondary-1000 tw:px-6 tw:py-8"
          style={{ boxShadow: '0px 0px 36px 0px rgba(0, 0, 0, 0.24)' }}
        >
          {loading && (
            <div className="tw:flex tw:items-center tw:justify-between">
              <div className="tw:flex tw:items-center tw:gap-3">
                <div className="tw:h-5 tw:w-5 tw:animate-spin tw:rounded-full tw:border-4 tw:border-secondary-1300 tw:border-t-primary"></div>
                <p>Searching...</p>
              </div>
              <button onClick={() => setShowPanel(false)}>
                <span className="tw:sr-only">Close</span>
                <Icons.x className="tw:h-5 tw:w-5 tw:text-black" />
              </button>
            </div>
          )}

          {!loading && results && results.length === 0 && (
            <div className="tw:flex tw:items-center tw:justify-between">
              <div className="tw:flex tw:items-center tw:gap-3">
                <p>
                  <strong>0</strong> item(s) found
                </p>
              </div>
              <button onClick={() => setShowPanel(false)}>
                <span className="tw:sr-only">Close</span>
                <Icons.x className="tw:h-5 tw:w-5 tw:text-black" />
              </button>
            </div>
          )}
        </div>
      )}

      {!loading && results && results.length > 0 && showPanel && (
        <div className="tw:fixed tw:right-0 tw:bottom-0 tw:left-0 tw:rounded-t-[20px] tw:bg-secondary-1000 tw:py-6 tw:pb-0">
          <div className="tw:flex tw:items-center tw:justify-between tw:bg-secondary-1000 tw:p-4 tw:pt-0 tw:pl-5">
            <div className="tw:flex tw:items-center tw:gap-2">
              <p className="tw:text-lg">
                {results.length > 1 ? (
                  <Fragment>
                    <strong>{results.length}</strong> items found
                  </Fragment>
                ) : (
                  <Fragment>
                    <strong>{results.length}</strong> item found
                  </Fragment>
                )}
              </p>
            </div>
            <button onClick={() => setShowPanel(false)}>
              <span className="tw:sr-only">Close</span>
              <Icons.x className="tw:h-5 tw:w-5 tw:text-black" />
            </button>
          </div>

          <div
            className={cn(
              'tw-hide-scrollbar tw:overflow-y-auto tw:px-5',
              results.length > 2
                ? 'tw:max-h-[53svh] tw:space-y-4'
                : 'tw:max-h-[53svh] tw:pb-4',
            )}
          >
            {results.map((result) => (
              <ProductCard key={result.id} {...result} scannerresult={true} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileScanner;
