import { h, Fragment } from 'preact';
import { cn, useMediaQuery } from '../../../utils/helpers';

/**
 * Breadcrumbs Component
 *
 * @description Renders a navigational breadcrumb trail with truncation support.
 *
 * @param {Object} props - Component props
 * @param {Array} props.items - Array of breadcrumb items, each with `label` and optional `href`
 * @param {string} props.separator - Character/string between items (default: "/")
 * @param {number} props.maxitemsdesktop - Max number of breadcrumb items before truncating on desktop
 * @param {number} props.maxitemsmobile - Max number of breadcrumb items before truncating on mobile
 * @param {Object|Function} props.leadingicon - Optional icon to render at the beginning
 * @param {string} props.leadingiconhref - Optional URL for the leading icon
 * @param {string} props.classname - Additional CSS classes
 *
 * @returns {JSX.Element} Preact component
 */

const Breadcrumbs = ({
  items = [],
  separator = '/',
  maxitemsdesktop = 4,
  maxitemsmobile = 3,
  leadingicon,
  leadingiconhref,
  classname,
  ...props
}) => {
  // Add media query hook for responsive behavior
  const isMobile = useMediaQuery('(max-width: 1023px)');

  /**
   * Truncates the breadcrumb items based on screen size
   */
  const truncateItems = (items) => {
    const currentMaxItems = isMobile ? maxitemsmobile : maxitemsdesktop;
    if (items.length <= currentMaxItems) return items;

    const start = items.slice(0, 1);
    const end = items.slice(-1);
    return [...start, { label: '...', truncated: true }, ...end];
  };

  const visibleItems = truncateItems(items);

  /**
   * Renders individual breadcrumb item with proper styling and separator
   */
  const renderItem = (item, index) => {
    const isLast = index === visibleItems.length - 1;
    const key = `${item.label}-${index}`;

    return (
      <li
        key={key}
        className="tw:flex tw:min-w-0 tw:flex-shrink tw:items-center"
      >
        {item.truncated ? (
          /**
           * Render ellipsis for truncated items
           */
          <span
            className="tw:flex-shrink-0 tw:px-2 tw:text-base tw:font-normal tw:text-gray-500 tw:select-none"
            aria-hidden="true"
          >
            ...
          </span>
        ) : item.href ? (
          /**
           * Render as link if href is provided
           */
          <a
            href={item.href}
            className="tw:min-w-0 tw:flex-shrink tw:truncate tw:text-base tw:font-normal tw:text-black tw:hover:underline"
            title={item.label}
          >
            {item.label}
          </a>
        ) : (
          /**
           * Render as plain text if no href
           */
          <span
            className="tw:min-w-0 tw:flex-shrink tw:truncate tw:text-base tw:font-bold tw:text-black"
            title={item.label}
          >
            {item.label}
          </span>
        )}
        {!isLast && (
          /** * Add separator between items, except for the last one */
          <span
            aria-hidden="true"
            className="tw:mx-3 tw:flex-shrink-0 tw:text-grey-600"
          >
            {typeof separator === 'function' ? separator() : separator}
          </span>
        )}
      </li>
    );
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('tw:flex tw:w-full tw:text-sm', classname)}
      {...props}
    >
      {/* Breadcrumb list */}
      <ol className="tw:flex tw:w-full tw:min-w-0 tw:items-center">
        {leadingicon && (
          /**
           * Render leading icon with optional href
           */
          <li className="tw:mr-4 tw:flex tw:flex-shrink-0 tw:items-center">
            {/* If leadingiconhref is provided, render a link */}
            {leadingiconhref ? (
              <a href={leadingiconhref} className="tw:text-black">
                {typeof leadingicon === 'function'
                  ? leadingicon()
                  : leadingicon}
              </a>
            ) : typeof leadingicon === 'function' ? (
              leadingicon()
            ) : (
              leadingicon
            )}
          </li>
        )}
        {/* Render breadcrumb items */}
        {visibleItems.map((item, index) => renderItem(item, index))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
