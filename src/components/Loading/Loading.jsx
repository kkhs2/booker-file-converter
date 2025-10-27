/**
 * Loading Component
 *
 * A responsive loading spinner with customizable text
 *
 * @param {Object} props - Component props
 * @param {string} [props.text] - Loading text to display below the spinner
 * @param {string} [props.classname] - Additional CSS classes
 * @returns {JSX.Element} The Loading component
 */

import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';

const Loading = ({ text = 'Loading...', classname, ...props }) => {
  return (
    <div
      className={cn(
        'tw:flex tw:h-full tw:w-full tw:flex-col tw:items-center tw:justify-center tw:gap-6 tw:rounded-xl tw:bg-secondary-1000',
        classname,
      )}
      {...props}
    >
      <div className="tw:h-12 tw:w-12 tw:animate-spin tw:rounded-full tw:border-14 tw:border-secondary-1300 tw:border-t-primary tw:lg:h-20 tw:lg:w-20"></div>

      {text && (
        <div className="tw:text-center tw:text-[13px] tw:leading-[1.4] tw:lg:text-lg">
          {text.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Loading;
