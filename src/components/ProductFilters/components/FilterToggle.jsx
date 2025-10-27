import { h, Fragment } from 'preact';
import { cn } from '../../../../utils/helpers';
import Icons from '../../Icons/Icons';
import { useState } from 'preact/hooks';

/**
 * FilterToggle Component
 *
 * @description
 * A toggle component used for filtering options. It supports keyboard navigation
 * and displays a tooltip when focused or hovered.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.value - The current state of the toggle (true or false)
 * @param {string} props.label - The label to display for the toggle
 * @param {string} [props.classname] - Additional classes to style the component
 * @param {string} [props.tooltip] - Tooltip text to display when hovered or focused
 * @param {boolean} [props.hidden] - Whether the component should be hidden
 * @param {Function} props.onchange - Callback function triggered when the toggle is clicked or activated via keyboard
 * @returns {JSX.Element} Preact component - The FilterToggle component
 */
export const FilterToggle = ({
  value,
  label,
  classname,
  tooltip,
  hidden,
  onchange,
  ...props
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className={cn('tw:group', hidden && 'tw:hidden')}>
      <div
        className={cn(
          'tw:flex tw:w-[204px] tw:cursor-pointer tw:items-center tw:justify-between tw:rounded-lg tw:border tw:border-black/20 tw:bg-transparent tw:p-3 tw:outline-none tw:focus:inset-ring tw:focus:inset-ring-black/20 tw:max-md:w-full',
          !!value &&
            'tw:bg-secondary-1000 tw:inset-ring tw:inset-ring-black/20',
          classname,
        )}
        tabIndex={0}
        onClick={onchange}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onchange();
          }
        }}
        {...props}
      >
        <span className="tw:font-medium">{label}</span>

        {!!value && <Icons.checkMark classname="tw:h-4 tw:w-4" />}
        {!!tooltip && !value && (
          <Icons.helpCircle
            classname="tw:h-4 tw:w-4"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
        )}
      </div>

      {tooltip && showTooltip && (
        <div className="tw:absolute tw:z-10 tw:mt-2 tw:w-[204px] tw:rounded-lg tw:bg-white tw:p-4 tw:text-base tw:shadow-[inset_-1px_-1px_4px_4px_rgba(0,0,0,0.02),6px_10px_24px_0px_rgba(0,0,0,0.30)]">
          {tooltip}
        </div>
      )}
    </div>
  );
};
