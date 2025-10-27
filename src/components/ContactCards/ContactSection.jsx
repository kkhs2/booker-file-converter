import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import Typography from '../Typography/Typography';

/**
 * Contact cards Component
 *
 * @description A component that displays a section of contact cards
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Title of the contact cards section
 * @param {string} props.description - Description of the contact cards section
 * @param {ReactNode} props.children - Contact cards to display
 * @param {string} props.classname - Additional CSS classes
 * @returns {JSX.Element} - The Contact Cards component
 */

const ContactSection = ({
  title = 'Get in touch.',
  description = 'Connect with our expert teams for help and personalised support.',
  children,
  classname,
  ...props
}) => {
  return (
    <div
      className={cn(
        'tw:rounded-[20px] tw:border-[1.5px] tw:p-5 tw:lg:p-10',
        classname,
      )}
      {...props}
    >
      <div className="tw:space-y-3 tw:lg:flex tw:lg:items-center tw:lg:justify-between tw:lg:space-y-0">
        <Typography
          className="tw:text-7xl tw:text-primary-500 tw:lg:text-9xl"
          domtype="h4"
        >
          {title}
        </Typography>
        <p className="tw:max-w-md tw:text-xl tw:lg:max-w-[420px] tw:lg:text-right tw:lg:text-3xl">
          {description}
        </p>
      </div>

      <div className="tw:mt-6 tw:flex tw:h-full tw:flex-col tw:items-center tw:gap-5 tw:lg:mt-20 tw:lg:flex-row tw:lg:flex-wrap tw:lg:items-stretch tw:lg:gap-8">
        {children}
      </div>
    </div>
  );
};

export default ContactSection;
