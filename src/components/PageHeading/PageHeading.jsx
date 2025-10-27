import { h, Fragment } from 'preact';
import Typography from '../Typography/Typography';
import { cn } from '../../../utils/helpers';

/**
 * PageHeading Component
 *
 * @description Displays a standard page heading section with an optional button and optional children content (like a CalloutCard).
 *
 * @param {Object} props - Component props
 * @param {string} props.title - The main heading text.
 * @param {string} [props.textcolor] - The text color for the heading. Can be 'primary', 'black', or 'white'. Defaults to 'primary'.
 * @param {string} [props.domtype] - The HTML element type for the heading (default is 'h2').
 * @param {JSX.Element} [props.tag] - Optional tag element to display alongside the title.
 * @param {JSX.Element[]} [props.cta] - Optional list of call-to-action elements.
 * @param {JSX.Element} [props.children] - Optional children elements to render below the heading and button.
 * @param {string} [props.classname] - Additional CSS classes for the container.
 * @param {string} [props.childrenclassname] - Additional CSS classes for the children container.
 * @returns {JSX.Element} The rendered PageHeading component.
 */
const PageHeading = ({
  title,
  domtype = 'h2',
  textcolor = 'primary',
  cta = [],
  tag = null,
  children,
  childrenclassname = '',
  classname,
}) => {
  return (
    <div className={cn('tw:px-0 tw:py-8', classname)}>
      {tag && (
        <div className="tw:mb-4 tw:flex tw:items-center tw:px-5 tw:lg:px-16">
          {tag}
        </div>
      )}
      <div className="tw:flex tw:flex-col tw:items-start tw:px-5 tw:lg:flex-row tw:lg:items-center tw:lg:justify-between tw:xl:px-16">
        <Typography
          domtype={domtype}
          classname={cn(
            textcolor === 'black'
              ? 'tw:text-black'
              : textcolor === 'white'
                ? 'tw:text-white'
                : 'tw:text-primary-500',
          )}
        >
          {title}
        </Typography>
        {cta.length > 0 && (
          <div className="tw:flex tw:flex-col tw:justify-stretch tw:gap-2 tw:max-lg:mt-6 tw:max-lg:w-full tw:max-lg:space-y-2 tw:max-lg:*:w-full tw:lg:flex-row tw:lg:items-center">
            {cta.map((item) => item)}
          </div>
        )}
      </div>

      {children && (
        <div
          className={cn(
            'tw:mt-5 tw:px-5 tw:lg:mt-5 tw:lg:space-y-6 tw:xl:px-16',
            childrenclassname,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeading;
