/**
 * Chip Component
 *
 * @description Renders a status badge with different background colours based on the status.
 * Supports custom colours and optional icons.
 *
 * @param {Object} props - Component props
 * @param {string} props.status - Determines the background colour of the badge (default: "default")
 * @param {string} props.size - Determines the size of the badge (default: "default")
 * @param {string} props.label - The text displayed inside the badge
 * @param {string} props.custombgcolour - Optional custom background colour
 * @param {string} props.customfontcolour - Optional custom text colour
 * @param {string} props.icon - Optional icon to display (as HTML/SVG)
 * @param {string} props.classname - Additional CSS classes
 *
 * @returns {JSX.Element} Preact component
 */

// Imports
import { h, Fragment } from 'preact';
import { cn } from '../../../../utils/helpers';

const Chip = ({
  status = '',
  size = 'default',
  label = '',
  custombgcolour = null,
  customfontcolour = null,
  icon = null,
  classname,
  ...props
}) => {
  // Object containing all Tailwind CSS classes for chip styling
  const CLASSES = {
    // Size variations with different padding and width rules
    size: {
      large: 'tw:pt-2 tw:pr-3 tw:pb-2 tw:pl-2 tw:w-max tw:rounded-xl tw:gap-2',
      // Default size is responsive: fixed width on small screens, flexible on larger ones
      default:
        'tw:py-1 tw:rounded-sm tw:gap-1 tw:w-max tw:px-2 tw:sm:px-0 tw:w-full tw:max-w-full tw:border',
    },

    // Status-based colour schemes
    status: {
      red: 'tw:bg-red-200 tw:border-red-200 tw:text-gray-800',
      orange: 'tw:bg-orange-200 tw:border-orange-200 tw:text-gray-800',
      green: 'tw:bg-green-50 tw:border-green-50 tw:text-gray-800',
      blue: 'tw:bg-primary-100 tw:border-primary-100 tw:text-gray-800',
      alert: 'tw:bg-red-500 tw:border-red-500 tw:text-white',
      overdue: 'tw:bg-red-500 tw:border-red-500',
      failed: 'tw:bg-red-500 tw:border-red-500',
      directdebit: 'tw:bg-orange-500 tw:border-orange-500 tw:text-black',
      onhold: 'tw:bg-orange-500 tw:border-orange-500 tw:text-black',
      available: 'tw:bg-tertiary-500 tw:border-tertiary-500 tw:text-black',
      onorder: 'tw:bg-primary-100 tw:border-primary-100 tw:text-gray-800',
      default: 'tw:bg-gray-200 tw:border-gray-200 tw:text-gray-800',
    },
  };

  // Combine all classes based on props, ensuring proper spacing
  const baseClasses = cn(
    'tw:inline-flex tw:items-center tw:justify-center tw:leading-snug tw:text-center tw:cursor-default tw:text-white',
    CLASSES.size[size],
    CLASSES.status[status.toLowerCase()],
    classname,
  );

  // Generate inline styles for custom colours if provided
  const customStyles =
    custombgcolour || customfontcolour
      ? {
          backgroundColor: custombgcolour || undefined,
          borderColor: custombgcolour || undefined, // Border matches background
          color: customfontcolour || undefined,
        }
      : {};

  return (
    // Wrapper div with ARIA role for accessibility
    <div
      role="status"
      aria-label={`${label} status`}
      className={baseClasses}
      style={customStyles}
      {...props}
    >
      {/* Optional icon rendering with aria-hidden for accessibility */}
      {icon && (
        <span className="tw:shrink-0" aria-hidden="true">
          {typeof icon === 'function' ? icon() : icon}
        </span>
      )}
      {/* Label text with size-dependent styling */}
      <span
        className={
          size === 'large' ? 'tw:text-sm tw:font-bold' : 'tw:text-[10px]'
        }
      >
        {label}
      </span>
    </div>
  );
};

export default Chip;
