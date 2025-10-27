/**
 * Status Component
 *
 * @description Renders a status card with customisable labels, counts and visual states.
 *
 * @param {Object} props - Component props
 * @param {string} props.label - The label displayed on the status card
 * @param {string} props.count - The numeric count displayed below the label
 * @param {string} props.type - The status type (overdue, pending, available)
 * @param {string} props.classname - Additional CSS classes
 *
 * @returns {JSX.Element} Preact component
 */

// Imports
import { h, Fragment } from 'preact';
import { cn } from '../../../../utils/helpers';
import Typography from '../../Typography/Typography';

const Status = ({
  label = '',
  count = 0,
  type = 'available',
  classname,
  ...props
}) => {
  // Tailwind classes for styling
  const CLASSES = {
    // Status type variations with coloured borders
    types: {
      overdue: 'tw:border-l-4 tw:border-red-700',
      pending: 'tw:border-l-4 tw:border-orange-500',
      available: 'tw:border-l-4 tw:border-tertiary-500',
    },
  };

  return (
    <div
      role="status"
      aria-label={`${label} status: ${count}`}
      className={cn(
        'tw:inline-flex tw:flex-col tw:items-start tw:justify-center tw:rounded-[2px] tw:bg-white tw:px-3 tw:py-2 tw:text-black',
        CLASSES.types[type],
        classname,
      )}
      {...props}
    >
      <div
        className="tw:mb-1 tw:text-sm tw:leading-snug tw:whitespace-nowrap tw:lg:text-sm"
        aria-label="Status label"
      >
        {label}
      </div>
      <Typography
        domtype="h7"
        content={`${count}`}
        classname={`${type === 'overdue' ? 'tw:font-bold ' : ''}tw:text-xl tw:lg:text-3xl`}
        aria-label="Status count"
      />
    </div>
  );
};

export default Status;
