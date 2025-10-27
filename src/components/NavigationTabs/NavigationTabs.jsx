/**
 * Tabs Component
 *
 * @description Renders a tabbed interface with customisable tabs and content panels.
 *
 * @param {Object} props - Component props
 * @param {Object[]} props.tabs - Array of tab objects containing:
 *   - label: Text to display
 *   - content: Content to show (HTML string or DOM element)
 *   - count: Optional numeric indicator
 * @param {number} props.initialactivetab - Index of the currently active tab
 * @param {string} props.classname - Additional CSS classes
 *
 * @returns {JSX.Element} Preact component
 */

// Imports
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { cn } from '../../../utils/helpers';
import Typography from '../Typography/Typography';

const NavigationTabs = ({
  tabs = [],
  initialactivetab = 0,
  className,
  ...props
}) => {
  // State management
  const [activeTab, setActiveTab] = useState(initialactivetab);

  // Handle tab selection
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  // Render content
  const renderContent = (content) => {
    if (typeof content === 'function') {
      return content();
    }
    return content;
  };

  return (
    <div className={cn('tabs-container', className)} {...props}>
      {/* Tab list */}
      <div
        className="tw:flex tw:space-x-1"
        role="tablist"
        aria-orientation="horizontal"
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`panel-${index}`}
            className={cn(
              'tw:relative tw:cursor-pointer tw:rounded-tl-xl tw:rounded-tr-xl tw:border tw:border-beige-1000 tw:bg-white tw:px-4 tw:py-2 tw:text-sm tw:transition-colors tw:lg:px-8 tw:lg:py-5',
              activeTab === index
                ? 'tw:border-white tw:font-medium'
                : 'tw:hover:bg-secondary-1100',
            )}
            onClick={() => handleTabClick(index)}
          >
            <Typography domtype="h7" classname="tw:text-black">
              {tab.label}
              {/* Optional count indicator */}
              {tab.count && (
                <span className="tw:ml-2 tw:text-xs">({tab.count})</span>
              )}
            </Typography>
          </button>
        ))}
      </div>

      {/* Active tab content */}
      <div
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="tw:rounded-b-xl tw:bg-white"
      >
        {renderContent(tabs[activeTab]?.content)}
      </div>
    </div>
  );
};

export default NavigationTabs;
