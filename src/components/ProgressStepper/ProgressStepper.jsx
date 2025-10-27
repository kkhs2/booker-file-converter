import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import Icons from '../Icons/Icons';

/**
 * ProgressStepper Component
 *
 * @description A component that displays a progress stepper with customizable steps and progress indicators.
 *
 * @param {Object} props - Component props
 * @param {Array} props.steps - Array of step objects. Each object should contain:
 *   - {string} label - The label for the step
 *   - {boolean} checked - Indicates if the step is completed
 *   - {boolean} active - Indicates if the step is currently active
 * @param {string} [props.classname] - Additional classes to add to the component
 * @returns {JSX.Element} Preact component - The ProgressStepper component
 */

const ProgressStepper = ({ steps, classname, ...props }) => {
  const isLarge = steps.length > 3;

  return (
    <div
      className={cn(
        'tw:flex tw:flex-row tw:lg:max-w-full tw:lg:snap-none tw:lg:flex-col tw:lg:gap-0 tw:lg:space-y-3 tw:lg:overflow-x-hidden tw:lg:whitespace-normal',
        isLarge
          ? 'tw:max-w-[100svw] tw:snap-x tw:snap-mandatory tw:overflow-x-auto tw:whitespace-nowrap'
          : 'tw:max-lg:w-full',
        classname,
      )}
      {...props}
    >
      {steps.map((step, index) => (
        <div
          key={index}
          className={cn(
            'tw:flex tw:items-center tw:px-3 tw:pt-3 tw:pb-4 tw:text-base tw:text-grey-500 tw:lg:shrink-0 tw:lg:px-2 tw:lg:py-2 tw:lg:text-lg',
            isLarge
              ? 'tw:shrink-0 tw:snap-start'
              : 'tw:flex-1 tw:max-lg:justify-center',
            'tw:border-b tw:border-grey-500 tw:lg:w-[300px] tw:lg:min-w-0 tw:lg:border-b-0',
            step.checked &&
              'tw:border-b tw:border-primary-500 tw:text-primary-500',
            step.active &&
              'tw:border-primary-black tw:border-b-2 tw:text-black',
          )}
        >
          {step.checked && (
            <Icons.checkMark className="tw:mr-2 tw:h-5 tw:w-5 tw:text-primary tw:lg:mr-4" />
          )}

          {step.active && (
            <Icons.minus className="tw:mr-2 tw:hidden tw:h-5 tw:w-5 tw:text-black tw:lg:mr-4 tw:lg:block" />
          )}
          {!step.checked && !step.active && (
            <Icons.minus className="tw:mr-2 tw:hidden tw:h-5 tw:w-5 tw:text-secondary-1300 tw:lg:mr-4 tw:lg:block" />
          )}

          {step.label}
        </div>
      ))}
    </div>
  );
};

export default ProgressStepper;
