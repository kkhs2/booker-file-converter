import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';

/**
 * Stepper Component
 *
 * @description Displays a horizontal stepper with steps indicating the progress of a process.
 *
 * @param {Object} props - Component props
 * @param {Array} props.steps - Array of step objects, each containing a label, id, and completed status
 * @param {string} props.steps.label - The label of the step
 * @param {number} props.steps.id - The unique identifier of the step
 * @param {boolean} props.steps.completed - Indicates if the step is completed
 * @param {string} [props.classname] - Additional classes to add to the component
 * @returns {JSX.Element} Preact component - The StandardBanner component
 */

const Stepper = ({ steps, classname, ...props }) => (
  <div
    className={cn(
      'tw:flex tw:snap-x tw:snap-mandatory tw:flex-row tw:items-center tw:gap-10 tw:overflow-x-auto tw:pb-2 tw:whitespace-nowrap tw:max-lg:max-w-[100svw] tw:max-lg:px-5 tw:lg:gap-5',
      classname,
    )}
    {...props}
  >
    {steps.map((step, index) => (
      <Fragment key={step.id}>
        <div
          className="tw:flex tw:items-center tw:space-x-2 tw:py-2 tw:lg:space-x-3"
          key={index}
        >
          <span
            className={cn(
              'tw:flex tw:h-[43px] tw:w-[43px] tw:items-center tw:justify-center tw:rounded-full tw:text-[13px] tw:lg:text-base',
              step.completed
                ? 'tw:bg-tertiary-500 tw:font-bold tw:text-black'
                : 'tw:bg-grey-1100 tw:text-grey-500',
            )}
          >
            {step.id}
          </span>
          <span
            className={cn(
              'tw:text-lg tw:lg:text-xl',
              step.completed
                ? 'tw:font-semibold tw:text-black'
                : 'tw:text-grey-500',
            )}
          >
            {step.label}
          </span>
        </div>
        {index < steps.length - 1 && (
          <div
            aria-hidden="true"
            className={cn(
              'tw:flex tw:h-px tw:w-10 tw:max-lg:hidden',
              step.completed
                ? 'tw:bg-black'
                : 'tw:border-t tw:border-dotted tw:border-grey-500',
            )}
          />
        )}
      </Fragment>
    ))}
  </div>
);

export default Stepper;
