import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import Typography from '../Typography/Typography';

/**
 * SpendSaveProgressBar Component
 *
 *  @description [Brief description of what the component does.]
 *
 * @param {Object} props - Component props
 * @param {number} props.steps - The number of steps in the progress bar
 * @param {number} props.progress - The current progress percentage
 * @returns {JSX.Element} Preact component - The SpendSaveProgressBar component
 */

const SpendSaveProgressBar = ({ steps = 5, progress }) => {
  const stepsArray = Array.from({ length: steps });

  return (
    <div className="tw:relative tw:mb-10 tw:flex tw:h-6 tw:w-full tw:rounded-lg tw:bg-beige-1000">
      <div
        className="tw:absolute tw:top-0 tw:left-0 tw:h-full tw:rounded-lg tw:bg-primary"
        style={{ width: `${progress}%` }}
      ></div>

      {stepsArray.map((_, index) => (
        <div
          key={index}
          style={{ width: 100 / steps + '%' }}
          className="tw:relative tw:border-r tw:border-dotted tw:border-white tw:last-of-type:border-none"
        >
          <Typography
            domtype="h7"
            content={`${index + 1}%`}
            className="tw:absolute tw:top-full tw:right-0 tw:mt-2 tw:font-bold"
          />
        </div>
      ))}
    </div>
  );
};

export default SpendSaveProgressBar;
