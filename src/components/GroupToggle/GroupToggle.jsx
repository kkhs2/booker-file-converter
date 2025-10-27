import { h } from 'preact';
import { useState, useCallback, useEffect, useRef } from 'preact/hooks';
import { cn } from '../../../utils/helpers';

/**
 * GroupToggle Component
 * @description A toggle component for switching between grouped and ungrouped views, typically used for product organization
 * @param {Object} props - Component props
 * @param {string} [props.leftlabel='Group by shelf'] - The label for the left (grouped) option
 * @param {string} [props.rightlabel='Ungrouped'] - The label for the right (ungrouped) option
 * @param {'grouped' | 'ungrouped'} [props.initialstate='grouped'] - The initial selected state of the toggle
 * @param {Function} [props.ongroupchange] - Callback function when the toggle state changes. Receives the new state ('grouped' or 'ungrouped') as an argument
 * @param {Function} [props.onstatechange] - Legacy callback function (use ongroupchange instead)
 * @param {boolean} [props.disabled=false] - Whether the toggle is disabled
 * @param {string} [props.classname] - Additional class names for styling the toggle container
 * @param {string} [props.size='md'] - Size variant of the toggle ('sm', 'md', 'lg')
 * @param {Object} [props.analytics] - Analytics tracking object
 * @param {Function} [props.analytics.onToggle] - Analytics callback for toggle events
 * @returns {JSX.Element} The GroupToggle component
 */
export const GroupToggle = ({
  leftlabel = 'Group by shelf',
  rightlabel = 'Ungrouped',
  initialstate = 'grouped',
  ongroupchange,
  onstatechange, // Legacy support
  classname,
  size = 'md',
  disabled = false,

  ...props
}) => {
  const [currentState, setCurrentState] = useState(initialstate);
  const [sliderStyle, setSliderStyle] = useState({
    width: '0px',
    transform: 'translateX(0px)',
  });

  const leftLabelRef = useRef(null);
  const rightLabelRef = useRef(null);
  const containerRef = useRef(null);

  const handleToggle = useCallback(() => {
    if (disabled) return;

    const newState = currentState === 'grouped' ? 'ungrouped' : 'grouped';
    setCurrentState(newState);

    // Call both new and legacy callback functions
    if (ongroupchange) {
      ongroupchange(newState);
    }
    if (onstatechange) {
      onstatechange(newState);
    }
  }, [currentState, ongroupchange, onstatechange, disabled]);

  const isGrouped = currentState === 'grouped';

  const sharedTextClasses =
    'tw:px-3 tw:py-[10px] tw:lg:px-4 tw:lg:py-[12px] tw:z-10 tw:transition-colors tw:duration-300 tw:ease-in-out tw:text-sm tw:lg:text-base';
  const groupedTextClasses = isGrouped ? 'tw:text-white' : 'tw:text-black';
  const ungroupedTextClasses = !isGrouped ? 'tw:text-white' : 'tw:text-black';

  useEffect(() => {
    if (leftLabelRef.current && rightLabelRef.current && containerRef.current) {
      const leftTypographyElement = leftLabelRef.current;
      const rightTypographyElement = rightLabelRef.current;

      const leftWidth = leftTypographyElement.offsetWidth;
      const rightWidth = rightTypographyElement.offsetWidth;

      const computedStyle = getComputedStyle(containerRef.current);
      const containerPaddingLeft = parseFloat(computedStyle.paddingLeft) || 0;

      if (isGrouped) {
        setSliderStyle({
          width: `${leftWidth}px`,
          transform: `translateX(${containerPaddingLeft}px)`,
        });
      } else {
        setSliderStyle({
          width: `${rightWidth}px`,
          transform: `translateX(${containerPaddingLeft + leftWidth}px)`,
        });
      }
    }
  }, [isGrouped, leftlabel, rightlabel, size]);

  const handleKeyDown = useCallback(
    (e) => {
      if (disabled) return;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle();
      }
    },
    [handleToggle, disabled],
  );

  return (
    <div className="tw:inline-flex tw:w-auto tw:rounded-full tw:border tw:border-grey-1100 tw:p-[2px]">
      <div
        ref={containerRef}
        className={cn(
          'tw:relative tw:inline-flex tw:cursor-pointer tw:items-center tw:rounded-full tw:bg-white tw:select-none',
          disabled && 'tw:cursor-not-allowed tw:opacity-50',
          classname,
        )}
        onClick={handleToggle}
        role="switch"
        aria-checked={isGrouped ? 'true' : 'false'}
        aria-label={`Toggle group view: ${isGrouped ? 'grouped' : 'ungrouped'}`}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <span
          className={cn(
            'tw:absolute tw:top-0 tw:bottom-0 tw:my-auto tw:h-full tw:rounded-full tw:bg-black tw:px-3 tw:transition-all tw:duration-300 tw:ease-in-out tw:lg:px-4',
          )}
          style={sliderStyle}
        />
        <p
          ref={leftLabelRef}
          className={cn(sharedTextClasses, groupedTextClasses)}
        >
          {leftlabel}
        </p>
        <p
          ref={rightLabelRef}
          className={cn(sharedTextClasses, ungroupedTextClasses)}
        >
          {rightlabel}
        </p>
      </div>
    </div>
  );
};

export default GroupToggle;
