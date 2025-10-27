/**
 * Button Component
 *
 * Renders a customizable button with various styles, states, and optional icons.
 *
 * @param {Object} props - Component props
 * @param {string} props.label - Text displayed on the button
 * @param {string} props.variant - Visual style ('primary', 'secondary', 'tertiary', 'inverse')
 * @param {string} props.size - Button size ('small', 'default', 'large')
 * @param {string} props.state - Button state ('enabled' or 'disabled')
 * @param {string} props.href - URL to navigate to when clicked (renders as anchor tag)
 * @param {JSX.Element | null} props.iconleft - Icon displayed to the left of the label
 * @param {JSX.Element | null} props.iconright - Icon displayed to the right of the label
 * @param {string} props.classname - Additional CSS classes
 *
 * @returns {JSX.Element} - The Button component
 */

import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';

const Button = ({
  label = '',
  variant = 'primary',
  size = 'default',
  state = 'enabled',
  href,
  iconleft = null,
  iconright = null,
  classname,
  ...props
}) => {
  // Tailwind CSS Classes
  const CLASSES = {
    base: 'tw:no-underline tw:inline-flex tw:items-center tw:justify-center tw:rounded-[120px] tw:outline-hidden tw:focus:outline-hidden tw:transition-all tw:leading-none tw:font-medium tw:border-[1.5px] tw:border-transparent tw:gap-2',
    sizes: {
      small: 'tw:px-4 tw:py-2.5 tw:text-base',
      default: 'tw:px-4 tw:py-[15px] tw:text-lg',
      responsive: 'tw:px-4 tw:py-3 tw:text-base tw:sm:p-4 tw:sm:text-lg',
    },
    variants: {
      primary: {
        enabled:
          'tw:bg-tertiary-500 tw:text-black-1000 tw:cursor-pointer tw:hover:bg-black-1000 tw:hover:text-white-1000   tw:border-tertiary-500 tw:hover:border-black-1000 ',
        disabled: 'tw:bg-black-200 tw:text-black-400 tw:cursor-not-allowed',
        active:
          'tw:bg-primary tw:text-white-1000 tw:border tw:border-primary tw:border-[1.5px] tw:cursor-pointer',
      },
      secondary: {
        enabled:
          'tw:text-black tw:border tw:border-black-1000 tw:border-[1.5px] tw:cursor-pointer tw:hover:bg-black-1000  tw:hover:text-white-1000 ',
        disabled:
          'tw:opacity-40 tw:border tw:border-grey-400 tw:border-[1.5px] tw:cursor-not-allowed',
        active: 'tw:bg-primary tw:text-black-1000',
      },
      tertiary: {
        enabled:
          'tw:bg-black-1000 tw:text-white-1000 tw:cursor-pointer tw:hover:bg-tertiary-500 tw:hover:text-black-1000 tw:border-black-1000 tw:hover:border-tertiary-500',
        disabled: 'tw:bg-black-200 tw:text-black-400 tw:cursor-not-allowed',
        active:
          'tw:bg-primary tw:text-white-1000 tw:border tw:border-primary tw:border-[1.5px] tw:cursor-pointer',
      },
      inverse: {
        enabled:
          'tw:bg-white-1000 tw:text-black-1000 tw:cursor-pointer tw:hover:bg-tertiary-500 tw:hover:text-black-1000 tw:border-white-1000 tw:hover:border-tertiary-500',
        disabled: 'tw:bg-black-200 tw:text-black-400 tw:cursor-not-allowed',
        active:
          'tw:bg-primary tw:text-white-1000 tw:border tw:border-primary tw:border-[1.5px] tw:cursor-pointer',
      },
    },
    iconSize: {
      small: 'tw:p-3',
      default: 'tw:p-4',
      responsive: 'tw:p-3 tw:lg:p-4',
    },
  };

  // Determine the classes to apply based on the props
  const sizeClass = label ? CLASSES.sizes[size] : CLASSES.iconSize[size];
  const variantClass = CLASSES.variants[variant][state];
  const baseClasses = cn(
    CLASSES.base,
    sizeClass,
    variantClass,
    classname ? ` ${classname}` : '',
  );

  // Common props for both button and link
  const buttonProps = {
    className: baseClasses,
    'aria-disabled': state === 'disabled',
    role: 'button',
    ...props,
  };

  // Add disabled prop only for button element
  if (!href) {
    buttonProps.disabled = state === 'disabled';
  }

  const Element = href ? 'a' : 'button';

  return (
    <Element {...buttonProps} href={href}>
      {iconleft && typeof iconleft === 'function' ? (
        <span>{iconleft()}</span>
      ) : (
        iconleft && <span>{iconleft}</span>
      )}
      {label && <span className="tw:leading-none">{label}</span>}
      {iconright && typeof iconright === 'function' ? (
        <span>{iconright()}</span>
      ) : (
        iconright && <span>{iconright}</span>
      )}
    </Element>
  );
};

export default Button;
