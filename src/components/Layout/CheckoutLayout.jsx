/**
 * CheckoutLayout Component
 *
 * @description  A layout component designed for checkout pages. It arranges the main content
 * and a sidebar. The sidebar becomes sticky based on scroll position on larger screens.
 * On mobile screens (<= 1024px), the layout stacks vertically and the sidebar
 * does not become sticky.
 *
 * It uses Intersection Observers to track sentinel elements at the top and bottom
 * of the main content area to determine when the sidebar should stick.
 *
 * @param {object} props - The component props.
 * @param {preact.ComponentChildren} props.children - The main content elements to be displayed in the primary area of the layout.
 * @param {preact.ComponentChildren} props.sidebar - The content elements to be displayed in the sidebar area.
 * @param {boolean} [props.reverse=false] - If true, the sidebar appears below the main content on larger screens.
 * @param {string} [props.classname] - Additional class name for the main content area.
 * @returns {preact.VNode} The rendered checkout layout structure.
 */
import { h, Fragment } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { cn } from '../../../utils/helpers';

const CheckoutLayout = ({ children, sidebar, reverse, classname }) => {
  const summaryCardRef = useRef(null); // Ref for the summary card/sidebar content

  const [sidebarHeight, setSidebarHeight] = useState(null);

  useEffect(() => {
    const summaryCardEl = summaryCardRef.current;
    if (summaryCardEl) {
      setSidebarHeight(summaryCardEl.offsetHeight);
    }
  }, [summaryCardRef]);

  const isCheckoutNav =
    typeof window !== 'undefined' && !!document.querySelector('#checkout-nav');

  return (
    <div
      className={cn(
        'tw:flex tw:w-full tw:gap-8 tw:max-lg:space-y-8 tw:xl:flex-row',
        reverse ? 'tw:flex-col-reverse' : 'tw:flex-col',
      )}
    >
      {/* Main content area */}
      <div
        className={cn(
          'tw:w-full tw:min-w-0 tw:shrink tw:space-y-6 tw:xl:max-w-[1140px] tw:xl:space-y-16',
          classname,
        )}
      >
        {children}
      </div>

      {/* Sidebar container */}
      <div
        className={cn(
          'tw:w-full tw:shrink-0 tw:lg:sticky tw:xl:max-w-[428px]',
          isCheckoutNav ? 'tw:lg:top-[100px]' : 'tw:lg:top-[140px]',
        )}
        style={{ height: sidebarHeight ? `${sidebarHeight}px` : 'auto' }}
      >
        <div ref={summaryCardRef}>{sidebar}</div>
      </div>
    </div>
  );
};

export default CheckoutLayout;
