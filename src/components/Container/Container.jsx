import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';

/**
 * Container Component
 *
 * @description A container component that holds page content with configurable width, spacing, and background options.
 *
 * @param {Object} props - Component props
 * @param {('full'|'contained'|'overflow')} [props.variant='contained'] - Layout variant
 *   - 'full': Full width of the screen with content centered
 *   - 'contained': Content centered and contained within max width
 *   - 'overflow': Allows content to overflow beyond container boundaries
 * @param {string} [props.background] - Background color for the container (if provided, vertical margin is added)
 * @param {boolean} [props.rail=false] - When true, adds left padding for rail components
 * @param {('none'|'small'|'default')} [props.spacing='default'] - Vertical margin size
 * @param {string} [props.classname] - Additional classes to add to the component
 * @param {import("preact").ComponentChildren} props.children - Content to display inside the container
 *
 * @returns {JSX.Element} Preact component - The Container component
 */
const Container = ({
  variant = 'contained',
  background,
  rail = false,
  spacing = 'default',
  classname,
  children,
  ...props
}) => {
  // Base styling
  const baseClasses = 'tw:relative tw:w-full';

  // Width variant styling
  const widthClasses =
    variant === 'contained'
      ? 'tw:mx-auto tw:max-w-[1728px] tw:px-5 tw:xl:px-16'
      : variant === 'overflow'
        ? 'tw:mx-auto tw:max-w-[1728px] tw:lg:!px-0 tw:overflow-visible tw-rail-container'
        : 'tw:mx-auto tw:max-w-[1728px]';

  // Spacing variant configuration
  const spacingClasses = {
    none: 'tw:my-0 tw:lg:my-0',
    small: 'tw:my-6 tw:lg:my-[54px]',
    default: 'tw:my-12 tw:lg:my-[100px]',
  }[spacing];

  const bgColorClasses = background
    ? `${background} tw:py-12 tw:lg:py-[100px]`
    : '';

  // Rail mode styling
  const railClasses = rail
    ? 'tw:content-center tw:px-5 tw:lg:px-16 tw:max-lg:overflow-visible tw:max-lg:px-0'
    : '';

  // Overflow behavior based on variant
  const overflowClasses = variant === 'overflow' && 'tw:overflow-visible';

  return (
    <div
      className={cn(
        baseClasses,
        widthClasses,
        spacingClasses,
        bgColorClasses,
        railClasses,
        overflowClasses,
        classname,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
