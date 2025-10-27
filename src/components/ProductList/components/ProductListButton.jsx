/**
 * A button component for the Product List, which supports an icon, label, and active state styling.
 *
 * @param {Object} props - The props for the ProductListButton component.
 * @param {string} props.label - The text label displayed on the button.
 * @param {JSX.Element} [props.icon] - An optional icon to display alongside the label.
 * @param {boolean} [props.active] - Determines if the button is in an active state.
 * @param {string} [props.classname] - Additional custom class names to apply to the button.
 * @param {Object} [props.props] - Additional props to spread onto the button element.
 * @returns {JSX.Element} The rendered ProductListButton component.
 */

import { h, Fragment } from 'preact';
import { cn } from '../../../../utils/helpers';

export const ProductListButton = ({
  label,
  icon,
  active,
  classname,
  ...props
}) => {
  return (
    <button
      className={cn(
        'tw:flex tw:cursor-pointer tw:items-center tw:space-x-2 tw:rounded-full tw:px-6 tw:py-4 tw:transition-colors',
        {
          'tw:bg-primary-700 tw:text-white': active,
          'tw:bg-white tw:text-black tw:hover:text-primary-700': !active,
        },
        classname,
      )}
      {...props}
    >
      {icon}
      <span className="tw:font-semibold tw:text-nowrap">{label}</span>
    </button>
  );
};
