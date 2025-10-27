import { h, Fragment } from 'preact';
import { useState, useContext, useEffect } from 'preact/hooks';
import { createContext } from 'preact/compat';
import { cn, useMediaQuery } from '../../../utils/helpers';
import Typography from '../Typography/Typography';
import Icons from '../Icons/Icons';

const TabContext = createContext(undefined);

/**
 * TabList Component
 *
 * @description The TabList component renders the tab list.
 *
 * @param {Object} props - The component props
 * @param {JSX.Element} props.children - The children of the component
 * @param {string} [props.variant="vertical"] - The layout variant: "vertical" or "horizontal"
 *
 * @returns {JSX.Element} - The TabList component
 */
const TabList = ({ defaultOpenId, variant = 'vertical', children }) => {
  const [openTab, setOpenTab] = useState(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (defaultOpenId) {
      setOpenTab(defaultOpenId);
    }
  }, [defaultOpenId]);

  useEffect(() => {
    let timeoutId;
    const updateHeight = () => {
      const tabContent = document.getElementById('tw-tab-content');
      if (tabContent && openTab) {
        // Force a reflow to get accurate height
        const height = tabContent.getBoundingClientRect().height;
        setContentHeight(height + (variant === 'horizontal' ? 0 : 0)); // Add extra space for horizontal if needed
      } else {
        setContentHeight(0);
      }
    };

    // Initial measurement after render
    timeoutId = setTimeout(updateHeight, 50);

    // Set up ResizeObserver for dynamic content changes
    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    const tabContent = document.getElementById('tw-tab-content');
    if (tabContent) {
      resizeObserver.observe(tabContent);
    }

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [openTab, variant]);

  return (
    <TabContext.Provider value={{ openTab, setOpenTab, variant }}>
      <div
        className={cn(
          'tw:relative tw:transition-[min-height] tw:duration-300',
          variant === 'horizontal' ? 'tw:flex tw:flex-col' : '',
        )}
        style={{
          minHeight:
            variant === 'vertical' && openTab ? `${contentHeight}px` : 'auto',
          paddingBottom:
            variant === 'horizontal' && openTab
              ? `${contentHeight + 20}px`
              : '0',
        }}
      >
        {variant === 'horizontal' && (
          <div className="tw:relative tw:mb-0 tw:flex tw:border-b tw:border-secondary-1300">
            {children}
          </div>
        )}
        {variant === 'vertical' && children}
      </div>
    </TabContext.Provider>
  );
};

/**
 * Tab Component
 *
 * @description The Tab component renders a tab.
 *
 * @param {Object} props - The component props
 * @param {string} props.id - The tab id
 * @param {string} props.title - The tab title
 * @param {JSX.Element | Function} props.icon - The tab icon
 * @param {JSX.Element} props.children - The tab content
 *
 * @returns {JSX.Element} - The Tab component
 */

const Tab = ({ id, title, icon, children }) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const {
    openTab,
    setOpenTab,
    variant = 'vertical',
  } = useContext(TabContext) || {
    openTab: null,
    setOpenTab: () => {},
    variant: 'vertical',
  };
  const isOpen = openTab === id;

  const toggleTab = () => {
    if (isOpen && !isMobile && variant === 'vertical') return;
    setOpenTab(isOpen ? null : id);
  };

  return (
    <Fragment>
      {variant === 'horizontal' ? (
        // Horizontal layout
        <div className="tw:flex tw:flex-1 tw:flex-col">
          <button
            className={cn(
              'tw:flex tw:items-center tw:justify-center tw:border-b-2 tw:px-6 tw:py-4 tw:text-center tw:transition-colors tw:duration-200',
              isOpen
                ? 'tw:border-primary tw:bg-white tw:text-primary'
                : 'tw:border-transparent tw:text-black tw:hover:text-primary',
            )}
            onClick={toggleTab}
          >
            <div className="tw:flex tw:items-center">
              {typeof icon === 'function' ? icon() : icon}
              <Typography domtype="h7" classname="tw:ml-2">
                {title}
              </Typography>
            </div>
          </button>

          {/* Horizontal tab content - shown below all tabs */}
          {isOpen && (
            <div className="tw:absolute tw:top-full tw:right-0 tw:left-0 tw:z-10 tw:mt-0">
              <div
                id="tw-tab-content"
                className="tw:rounded-b-[20px] tw:bg-white tw:px-5 tw:pt-6 tw:pb-6 tw:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] tw:lg:px-8 tw:lg:pt-8 tw:lg:pb-8"
              >
                {children}
              </div>
            </div>
          )}
        </div>
      ) : (
        // Vertical layout (original)
        <div className="tw:group">
          <div
            className={cn(
              'tw:max-md:font-semibold tw:lg:max-w-[554px] tw:lg:pr-8',
              isOpen &&
                'tw:bg-white tw:shadow-[4px_4px_10px_-4px_rgba(0,0,0,0.03)]',
            )}
          >
            <button
              className={cn(
                'tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:justify-between tw:border-l-4 tw:border-transparent tw:px-6 tw:py-7 tw:text-left',
                isOpen
                  ? 'tw:border-b-0 tw:border-primary tw:bg-white tw:text-primary tw:lg:rounded-l-lg'
                  : 'tw:border-b tw:border-dotted tw:border-transparent tw:border-b-secondary-1300 tw:group-last:border-b-0',
              )}
              onClick={toggleTab}
            >
              <div className="tw:flex tw:items-center">
                {typeof icon === 'function' ? icon() : icon}
                <Typography domtype="h7" classname="tw:text-black tw:ml-4">
                  {title}
                </Typography>
              </div>

              {/* icon right just for mobile */}
              {isOpen ? (
                <Icons.minus classname="tw:w-5 tw:h-5 tw:text-black tw:block tw:lg:hidden" />
              ) : (
                <Icons.plus
                  classname="tw:w-5 tw:h-5 tw:text-black tw:block tw:lg:hidden"
                  stroke="black"
                />
              )}
            </button>
          </div>

          {/* Vertical tab content */}
          <div
            className={`${isOpen ? 'tw:h-full tw:w-full tw:rounded-[20px] tw:bg-white tw:lg:absolute tw:lg:top-0 tw:lg:left-[536px] tw:lg:w-[calc(100%-546px)]' : 'tw:max-h-0 tw:overflow-hidden tw:p-0'}`}
          >
            <div
              id={isOpen ? 'tw-tab-content' : ''}
              className="tw:rounded-[20px] tw:bg-white tw:px-5 tw:pt-4 tw:pb-6 tw:lg:px-20 tw:lg:pt-8 tw:lg:pb-10"
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export { Tab, TabList };
