import { h, Fragment } from 'preact';
import Icons from '../Icons/Icons';
import Typography from '../Typography/Typography';
import { cn } from '../../../utils/helpers';

/**
 * FAQ Contact Card Component
 *
 * @description Renders a customisable FAQ Contact Card with link or email variants, and an optional icon next to title.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Title of the FAQ contact card
 * @param {import("preact").VNode | null} props.icon - Optional icon to display next to the title
 * @param {"link" | "email"} props.variant - Whether to render a link or email contact option
 * @param {string} props.href - URL for link variant or email address for email variant
 * @param {string} props.label - Label for the contact card button/link
 * @param {string} props.classname - Additional CSS classes
 * @param {import("preact").ComponentChildren} props.children - Optional description content to display underneath the title
 *
 * @returns {JSX.Element} - The FAQ Contact Card component
 */

const FaqContactCard = ({
  title,
  icon = null,
  variant = 'link',
  href,
  label,
  classname,
  children,
  ...props
}) => {
  const isEmail = variant === 'email';
  const formattedHref = isEmail ? `mailto:${href}` : href;

  // Format for rendering email address in button label if needed
  const displayLabel = isEmail ? href : label || href;

  return (
    <div
      className={cn(
        'tw:w-full tw:rounded-[20px] tw:bg-secondary-1000 tw:p-6 tw:lg:p-10',
        classname,
      )}
      {...props}
    >
      <div className="tw:flex tw:w-full tw:flex-col tw:gap-4">
        <div className="tw:flex tw:items-center tw:gap-3">
          {icon && (
            <div className="tw:shrink-0">
              {typeof icon === 'function' ? icon() : icon}
            </div>
          )}
          <Typography domtype="h6" classname="tw:leading-[120%]">
            {title}
          </Typography>
        </div>

        {children && <div className="tw:text-black">{children}</div>}

        <a
          href={formattedHref}
          className="tw:flex tw:items-center tw:space-x-1"
        >
          {isEmail ? <Icons.mail /> : <Icons.link />}
          <span>{displayLabel}</span>
        </a>
      </div>
    </div>
  );
};

export default FaqContactCard;
