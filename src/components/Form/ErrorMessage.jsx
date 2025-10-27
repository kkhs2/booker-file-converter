import { h } from 'preact';
import Typography from '../../components/Typography/Typography';
import Icons from '../../components/Icons/Icons';

/**
 * ErrorMessage Component
 *
 * @description A reusable error message component for displaying form errors
 *
 * @param {Object} props - Component props
 * @param {string} [props.message="The fields below are required to complete your registration."] - Error message to display
 * @param {string} [props.classname] - Additional classes to add to the component
 * @param {React.ReactNode} [props.children] - Child elements to render instead of the message
 * @returns {JSX.Element} Preact component - The ErrorMessage component
 * */

export const ErrorMessage = ({
  message = 'The fields below are required to complete your registration.',
  classname = '',
  children,
  ...props
}) => {
  return (
    <div
      className={`tw:mb-4 tw:flex tw:rounded-xl tw:bg-primary-50 tw:p-3 tw:md:p-6 ${classname}`}
      {...props}
    >
      <Icons.alertCircle classname="tw:w-5 tw:h-5 tw:text-red-700 tw:mr-3 tw:flex-shrink-0" />
      <div className="tw:flex-1">
        {children ? (
          children
        ) : (
          <Typography
            content={message}
            classname="tw:text-base tw:leading-[140%] tw:font-medium"
          />
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
