import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';

/**
 * ControlPanel Component
 *
 * @description A component that provides a control panel with customizable elements.
 *
 * @param {Object} props - Component props
 * @param {string} props.classname - Additional classes to add to the component
 * @param {string} props.image - The background image for the component
 * @param {JSX.Element} props.elementleft - The left element of the component
 * @param {JSX.Element} props.elementright - The right element of the component
 *
 * @returns {JSX.Element} Preact component - The ControlPanel component
 */

const ControlPanel = ({
  image,
  elementleft,
  elementright,
  classname,
  ...props
}) => {
  return (
    <div
      className={cn(
        'tw:relative tw:mx-5 tw:rounded-[20px] tw:lg:mx-0 tw:lg:rounded-none',
        classname,
      )}
      {...props}
    >
      <div className="tw:relative tw:flex tw:flex-col tw:items-start tw:justify-between tw:gap-4 tw:md:flex-row tw:lg:px-16 tw:lg:py-14">
        {/* Desktop background */}
        <div
          className="tw:absolute tw:inset-0 tw:hidden tw:bg-cover tw:bg-center tw:lg:block"
          style={{
            backgroundImage: image ? `url(${image})` : 'none',
          }}
        />
        {elementleft && (
          <div
            className="!tw:lg:bg-none tw:relative tw:z-1 tw:w-full tw:rounded-[20px] tw:bg-cover tw:bg-center tw:px-3 tw:pt-20 tw:pb-3 tw:lg:rounded-none tw:lg:p-0"
            style={{
              backgroundImage: image ? `url(${image})` : 'none',
              '@media (min-width: 1024px)': {
                backgroundImage: 'none',
              },
            }}
          >
            {typeof elementleft === 'function' ? elementleft() : elementleft}
          </div>
        )}
        {elementright && (
          <div className="tw:relative tw:z-1 tw:w-full tw:lg:w-[427px] tw:lg:p-0">
            {typeof elementright === 'function' ? elementright() : elementright}
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
