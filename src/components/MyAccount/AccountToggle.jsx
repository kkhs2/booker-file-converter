import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
/**
 * A toggle component for account-related actions, allowing users to switch between different options.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.items - An array of items to display as toggle options. Each item should have a `label` (string) and `value` (any).
 * @param {any} props.value - The currently selected value.
 * @param {Function} props.onclick - Callback function triggered when a toggle option is clicked. Receives the `value` of the clicked item as an argument.
 * @returns {JSX.Element} The rendered AccountToggle component.
 */

export const AccountToggle = ({ items, value, onclick }) => {
  return (
    <div className="tw:flex tw:w-fit tw:space-x-0.5 tw:rounded-full tw:border tw:border-black/20 tw:bg-white tw:p-1">
      {items.map((item, index) => (
        <button
          key={index}
          className={cn(
            'tw:flex tw:cursor-pointer tw:items-center tw:space-x-1 tw:rounded-full tw:p-3 tw:text-base tw:transition tw:lg:px-4 tw:lg:py-3 tw:lg:whitespace-nowrap',
            item.value === value && 'tw:bg-black-1000 tw:text-white-1000',
          )}
          onClick={() => onclick(item.value)}
        >
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};
