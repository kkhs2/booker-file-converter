import { h, Fragment } from 'preact';
import Typography from '../Typography/Typography';
import Icons from '../Icons/Icons';
import { cn } from '../../../utils/helpers';

/**
 * FAQ Rail Card Component
 *
 * @description Renders a card component for FAQs with title, content, and a "Continue reading" link
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Title of the FAQ rail card
 * @param {string} props.href - URL for the "Continue reading" link
 * @param {string} props.classname - Additional CSS classes
 * @param {import("preact").ComponentChildren} props.children - Content to display underneath the title
 *
 * @returns {JSX.Element} - The FAQ Rail Card component
 */

const FaqRailCard = ({ title, href, classname, children, ...props }) => {
  return (
    <div
      className={cn(
        'tw:relative tw:w-full tw:rounded-[20px] tw:bg-secondary-1100 tw:p-6 tw:lg:p-10',
        classname,
      )}
      {...props}
    >
      {/* Comment bubble icon in top right */}
      <div className="tw:absolute tw:top-6 tw:right-6 tw:lg:top-10 tw:lg:right-10">
        <Icons.message classname="tw:w-5 tw:h-5" />
      </div>

      <div className="tw:flex tw:w-full tw:flex-col tw:gap-4">
        {/* Title */}
        <Typography domtype="h5" classname="tw:leading-[120%]">
          {title}
        </Typography>

        {/* Content */}
        {children && (
          <Typography domtype="p" classname="tw:text-black">
            {children}
          </Typography>
        )}

        {/* Continue reading link */}
        <a
          href={href}
          className="tw:mt-2 tw:flex tw:items-center tw:space-x-1 tw:font-medium"
        >
          <span>Continue reading</span>
          <Icons.chevronRight classname="tw:w-4 tw:h-4" />
        </a>
      </div>
    </div>
  );
};

export default FaqRailCard;
