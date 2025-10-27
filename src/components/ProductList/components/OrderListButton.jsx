/**
 * OrderListButton component renders a styled button with an optional icon and label.
 * It supports an active state and a customizable link.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.label - The text label to display inside the button.
 * @param {boolean} props.active - Determines if the button is in an active state.
 * @param {string} [props.href] - The URL the button should link to.
 * @param {JSX.Element} [props.icon] - An optional icon to display inside the button.
 * @param {string} [props.iconposition] - The position of the icon inside the button ('left' or 'right').
 * @param {Function} [props.onclick] - An optional function to call when the button is clicked.
 * @returns {JSX.Element} The rendered OrderListButton component.
 */

import { h, Fragment } from 'preact';
import Typography from '../../Typography/Typography';
import { cn } from '../../../../utils/helpers';

export const OrderListButton = ({
  label,
  active,
  href,
  icon,
  iconposition = 'left',
  onclick,
}) => {
  return (
    <a
      href={href}
      className={cn(
        'tw:flex tw:cursor-pointer tw:items-center tw:space-x-2 tw:rounded-[20px] tw:bg-white tw:px-4 tw:py-3 tw:shadow-[4px_4px_10px_-4px_rgba(0,0,0,0.1)] tw:transition-colors tw:hover:bg-primary-700 tw:hover:text-white',
        active && 'tw:bg-primary-700 tw:text-white',
      )}
      {...(onclick ? { onclick } : {})}
    >
      {iconposition === 'left' && icon}

      <Typography
        domtype="h7"
        content={label}
        classname="tw:font-medium tw:leading-[120%]"
      />

      {iconposition === 'right' && icon}
    </a>
  );
};
