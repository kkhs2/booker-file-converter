import { h } from 'preact';
import { useState, useCallback, useEffect, useRef } from 'preact/hooks';
import { cn } from '../../../utils/helpers';

/**
 * Toggle component
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.labelleft='On'] - The label for the left (or first) option.
 * @param {string} [props.labelright='Off'] - The label for the right (or second) option.
 * @param {'left' | 'right'} [props.initialstate='left'] - The initial selected state of the toggle.
 * @param {Function} [props.onchange] - Callback function when the toggle state changes. Receives the new state ('left' or 'right') as an argument.
 * @param {boolean} [props.disabled=false] - Whether the toggle is disabled.
 * @param {string} [props.classname] - Additional class names for styling the toggle container.
 * @returns {JSX.Element} The rendered Toggle component.
 */
export const Toggle = ({
  labelleft = 'On',
  labelright = 'Off',
  initialstate = 'left',
  onchange,
  classname,
  ...props
}) => {
  const [isActiveLeft, setIsActiveLeft] = useState(initialstate === 'left');
  const [sliderStyle, setSliderStyle] = useState({
    width: '0px',
    transform: 'translateX(0px)',
  });

  const leftLabelRef = useRef(null);
  const rightLabelRef = useRef(null);
  const containerRef = useRef(null);

  const handleToggle = useCallback(() => {
    const newState = !isActiveLeft ? 'left' : 'right';
    setIsActiveLeft(!isActiveLeft);
    if (onchange) {
      onchange(newState);
    }
  }, [isActiveLeft, onchange]);

  const sharedTextClasses = 'tw:px-4 tw:py-[12px] tw:z-10';
  const activeTextClasses = 'tw:text-white';
  const inactiveTextClasses = 'tw:text-black';

  useEffect(() => {
    if (leftLabelRef.current && rightLabelRef.current && containerRef.current) {
      const leftTypographyElement = leftLabelRef.current;
      const rightTypographyElement = rightLabelRef.current;

      const leftWidth = leftTypographyElement.offsetWidth;
      const rightWidth = rightTypographyElement.offsetWidth;

      const computedStyle = getComputedStyle(containerRef.current);
      const containerPaddingLeft = parseFloat(computedStyle.paddingLeft) || 0;

      if (isActiveLeft) {
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
  }, [isActiveLeft, labelleft, labelright]);

  return (
    <div className="tw:inline-flex tw:w-auto tw:rounded-full tw:border tw:border-grey-1100 tw:p-[2px]">
      <div
        ref={containerRef}
        className={cn(
          'tw:relative tw:inline-flex tw:cursor-pointer tw:items-center tw:rounded-full tw:bg-white tw:select-none',
          classname,
        )}
        onClick={handleToggle}
        role="switch"
        aria-checked={isActiveLeft ? 'true' : 'false'}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
        {...props}
      >
        <span
          className={cn(
            'tw:absolute tw:top-0 tw:bottom-0 tw:my-auto tw:h-full tw:rounded-full tw:bg-black tw:px-4 tw:transition-all tw:duration-300 tw:ease-in-out',
          )}
          style={sliderStyle}
        />
        <p
          ref={leftLabelRef}
          className={cn(
            sharedTextClasses,
            isActiveLeft ? activeTextClasses : inactiveTextClasses,
            'tw:transition-colors tw:duration-300 tw:ease-in-out',
          )}
        >
          {labelleft}
        </p>
        <p
          ref={rightLabelRef}
          className={cn(
            sharedTextClasses,
            !isActiveLeft ? activeTextClasses : inactiveTextClasses,
            'tw:transition-colors tw:duration-300 tw:ease-in-out',
          )}
        >
          {labelright}
        </p>
      </div>
    </div>
  );
};

export default Toggle;
