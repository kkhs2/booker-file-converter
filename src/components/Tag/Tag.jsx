import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import { useState, useRef, useEffect } from 'preact/hooks';

/**
 * Tags Component
 * Renders a customizable Tags with various styles, states, and optional icons.
 *
 * @param {Object} props - Component props
 * @param {string} props.label - Text displayed on the tag
 * @param {"primary" | "secondary" | "tertiary" | "muted" | "lightPrimary" | "inverse" | "club"} props.variant - Visual style of the tag
 * @param {string} props.size - Button size ('small', 'default', 'responsive', 'tip)
 * @param {JSX.Element | null} props.iconleft - Icon displayed to the left of the label
 * @param {JSX.Element | null} props.iconright - Icon displayed to the right of the label
 * @param {boolean} props.tip - Flag if tip type
 * @param {string} props.tooltiplabel - Text to display in the tooltip
 * @param {string} props.classname - Additional classes to add to the component
 * @returns {JSX.Element} - The Tag component
 */

const Tag = ({
  label = '',
  variant = 'default',
  size = 'default',
  icon,
  iconleft = null,
  iconright = null,
  tip = null,
  classname,
  tooltiplabel = '',
  ...props
}) => {
  // Tailwind CSS Classes
  const CLASSES = {
    base: 'tw:relative tw:inline-block tw:no-underline tw:inline-flex tw:items-center tw:rounded-[120px] tw:focus:outline-hidden tw:transition-all tw:leading-none tw:text-black-1000 tw:cursor-default',
    sizes: {
      small: 'tw:py-1 tw:px-3 tw:text-base',
      default: 'tw:px-3 tw:py-2 tw:w-max tw:text-base',
      responsive: 'tw:p-2 tw:text-sm tw:sm:px-3 tw:sm:w-max tw:sm:text-base',
      tip: 'tw:p-2 tw:text-base',
    },
    variants: {
      default: 'tw:bg-primary-500 tw:text-white',
      primary: 'tw:bg-yellow-700 tw:text-black',
      secondary: 'tw:bg-secondary-1100 tw:text-black',
      tertiary: 'tw:bg-grey-600 tw:text-black',
      muted: 'tw:bg-transparent tw:text-grey-600',
      lightPrimary: 'tw:bg-primary-100 tw:text-black',
      inverse: 'tw:bg-white tw:text-black tw:border tw:border-black',
      club: 'tw:text-white tw:bg-blue-600',
      quaternary: 'tw:bg-primary-600 tw:text-white',
      'inverse-transparent':
        'tw:bg-transparent tw:text-black tw:border tw:border-black',
    },
    iconSize: {
      default: 'tw:p-2',
    },
    tip: 'tw:border tw:border-[1.5px] tw:rounded-[120px] tw:font-medium',
    text: {
      base: 'tw:px-1 tw:font-semibold',
      secondary: 'tw:px-0 tw:font-normal',
      quaternary: 'tw:px-2 tw:font-medium',
      muted: 'tw:font-light',
      lightPrimary: 'tw:font-normal',
      club: 'tw:font-normal',
      'inverse-transparent': 'tw:px-2 tw:font-medium tw:py-3',
    },
  };

  // Determine the classes to apply based on the props
  const sizeClass = label ? CLASSES.sizes[size] : CLASSES.iconSize[size];
  const variantClass = CLASSES.variants[variant];
  const baseClasses =
    `${CLASSES.base} ${sizeClass} ${variantClass} ${tip ? CLASSES.tip : ''} ${classname ? ` ${classname}` : ''}`.trim();
  1;

  const [open, setOpen] = useState(false);
  const tagRef = useRef(null);
  // Detect touch device
  const isTouch = typeof window !== 'undefined' && 'ontouchstart' in window;
  // Close tooltip on outside click (for mobile)
  useEffect(() => {
    if (!open || !isTouch) return;

    const handleClick = (e) => {
      if (tagRef.current && !tagRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, isTouch]);

  return (
    <div
      ref={tagRef}
      className={cn(baseClasses, classname)}
      {...props}
      onMouseEnter={() => tooltiplabel && !isTouch && setOpen(true)}
      onMouseLeave={() => tooltiplabel && !isTouch && setOpen(false)}
      onClick={() => tooltiplabel && isTouch && setOpen((v) => !v)}
      tabIndex={tooltiplabel ? 0 : undefined}
      aria-label={label}
    >
      {icon && <span className="tw:text-inherit">{icon}</span>}
      <span>
        {label && (
          <span className={cn(CLASSES.text.base, CLASSES.text[variant])}>
            {label}
          </span>
        )}
        {props.date && <span>{props.date}</span>}
      </span>
      {/* Tooltip */}
      {tooltiplabel && open && (
        <div className="font-inter tw:absolute tw:top-auto tw:bottom-[calc(100%+4px)] tw:left-0 tw:z-10 tw:rounded-lg tw:bg-white tw:px-3 tw:py-2 tw:text-[14px] tw:leading-[1.25] tw:font-medium tw:whitespace-nowrap tw:text-black tw:shadow-[6px_10px_24px_rgba(0,0,0,0.3)]">
          {tooltiplabel}
        </div>
      )}
    </div>
  );
};

export default Tag;
