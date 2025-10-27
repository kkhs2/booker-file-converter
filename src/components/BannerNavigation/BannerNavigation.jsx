import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import Typography from '../Typography/Typography';

/**
 * BannerNavigation Component
 *
 * @description This component is used to display a banner navigation. It is used to display a search result term and a count of items found. It can also display custom content passed as children.
 *
 * @param {Object} props - Component props
 * @param {string} props.searchterm - The search term used (for single search)
 * @param {number} props.itemcount - The number of items found in the search
 * @param {React.ReactNode} props.children - Custom content to display in the header
 * @param {string} props.title - Title to display when using children (optional)
 * @param {string} props.mobileimage - URL for the mobile magnifier image
 * @param {string} props.desktopimage - URL for the desktop magnifier image
 * @param {string} props.icon - Custom icon component to display instead of default
 * @param {string} props.classname - Additional classes to add to the component
 * @param {Array<string | {label: string, href?: string}>} [props.suggestions] - Optional list of alternative search suggestions
 *
 * @returns {JSX.Element} - The BannerNavigation component
 */
const BannerNavigation = ({
  searchterm,
  itemcount = 0,
  children,
  childrenclassname,
  title,
  mobileimage,
  desktopimage,
  icon,
  classname,
  suggestions = [],
  ...props
}) => {
  const hasChildren = !!children;
  const hasTitle = !!title;
  const hasSuggestions = Array.isArray(suggestions) && suggestions.length > 0;

  return (
    <div className={cn('tw:relative tw:pb-3', classname)} {...props}>
      <div
        className={cn(
          'tw:relative tw:flex tw:justify-between tw:rounded-2xl tw:bg-primary tw:px-3 tw:text-white-1000 tw:lg:px-18',
          children && 'tw:pt-3 tw:pb-3 tw:lg:pt-4 tw:lg:pb-[98px]',
          !children &&
            `tw:pb-3 tw:lg:pt-4 tw:lg:pb-4 ${icon ? 'tw:pt-3' : 'tw:pt-3'} ${desktopimage ? 'tw:lg:pr-[244px]' : ''}`,
          suggestions.length > 0 && 'tw:lg:max-h-[190px]',
        )}
      >
        {/* Magnifier Images or Icon */}
        {mobileimage || desktopimage ? (
          <div
            className={cn(
              'tw:absolute tw:top-0 tw:right-[-5px] tw:h-auto tw:w-[92px] tw:transform tw:md:top-1/2 tw:md:h-full tw:md:w-auto tw:md:-translate-y-1/2',
              desktopimage && mobileimage && 'tw:right-0',
            )}
          >
            <picture>
              {/* Mobile image source */}
              {mobileimage && (
                <source media="(max-width: 767px)" srcSet={mobileimage} />
              )}
              {/* Use desktop image as fallback, or mobile if desktop isn't provided */}
              <img
                src={desktopimage || mobileimage}
                alt=""
                className="tw:h-full tw:w-full tw:object-contain"
                aria-hidden="true"
              />
            </picture>
          </div>
        ) : icon ? (
          icon
        ) : null}

        <div className="tw:flex tw:md:pr-10">
          {hasTitle ? (
            /* Title for children content */
            <Typography
              domtype="h2"
              content={title}
              classname="tw:pt-5 tw:lg:pt-6"
            />
          ) : itemcount > 0 ? (
            /* "Results for" layout */
            <div>
              <Typography
                domtype="h7"
                content="Results for"
                classname="tw:mb-1"
              />
              <Typography
                domtype="h3"
                mobilefontsize="tw:text-3xl"
                desktopfontsize="tw:lg:text-4xl"
                content={`"${searchterm}"`}
                classname="tw:leading-[1.1] tw:md:leading-[1.2]"
              />

              {/* Item Count (for single search) */}
              <span className="tw:mt-1 tw:inline-block tw:rounded-lg tw:bg-primary-d30 tw:px-2 tw:py-1 tw:text-sm tw:lg:text-13">
                Showing <strong>{itemcount}</strong> items
              </span>

              {/* Did you mean (suggestions) */}
              {hasSuggestions && (
                <div className="tw:mt-2 tw:flex tw:flex-col tw:lg:mt-3">
                  <Typography
                    domtype="span"
                    content="Did you mean"
                    classname="tw:text-13 tw:lg:text-lg"
                  />
                  <ul className="tw:mt-1 tw:flex tw:flex-wrap tw:gap-x-2 tw:gap-y-2 tw:lg:max-w-[738px] tw:lg:gap-x-3 tw:lg:gap-y-3">
                    {suggestions.map((s, idx) => {
                      return (
                        <li key={`${s.label}-${idx}`}>
                          <a
                            href={s.href}
                            className="tw:inline-block tw:rounded-lg tw:bg-primary-d30 tw:px-2 tw:py-1 tw:text-sm tw:hover:bg-primary-d30/80 tw:lg:text-base"
                          >
                            {s.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      {hasChildren && (
        <div
          className={cn(
            'tw:relative tw:z-1 tw:mt-5 tw:lg:mx-18 tw:lg:-mt-14 tw:lg:rounded-[20px] tw:lg:bg-secondary-1000 tw:lg:p-6 tw:lg:shadow-[4px_4px_10px_-1px_rgba(0,0,0,0.1)]',
            childrenclassname,
          )}
        >
          {/* Custom content passed as children */}
          {children}
        </div>
      )}
    </div>
  );
};

export default BannerNavigation;
