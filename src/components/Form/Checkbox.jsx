/**
 * Checkbox component renders a styled checkbox input with a label.
 *
 * @param {Object} props - The props for the Checkbox component.
 * @param {string} props.label - The label text displayed next to the checkbox.
 * @param {string} props.variant - The variant of the checkbox, can be 'default' or 'reverse'.
 * @param {string} [props.error] - Error message to display below the checkbox.
 * @param {Object} props.props - Additional props to be passed to the checkbox input element.
 * @param {string} props.classname - Additional class name for the checkbox.
 *
 * @returns {JSX.Element} The rendered Checkbox component.
 */
import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import Icons from '../Icons/Icons';
import Typography from '../Typography/Typography';

export const Checkbox = ({
  label = '',
  variant,
  error,
  classname,
  ...props
}) => {
  // Check if label has content (string or JSX element)
  const hasLabel =
    label && (typeof label === 'string' ? label.length > 0 : true);

  return (
    <div className={cn('tw:flex tw:flex-col', classname)}>
      <label
        className={cn(
          'tw:flex tw:cursor-pointer tw:items-center tw:py-1 tw:text-black tw:select-none',
        )}
      >
        <div className="tw:relative">
          <input type="checkbox" className="tw:peer tw:sr-only" {...props} />

          <div
            className={cn(
              'tw:flex tw:h-5 tw:w-5 tw:items-center tw:justify-center tw:rounded-[5px] tw:bg-grey-1100 tw:p-0.5 tw:text-grey-1100 tw:peer-checked:bg-primary tw:peer-checked:text-white',
              variant === 'secondary' && 'tw:bg-white tw:text-white',
              variant === 'reverse' &&
                'tw:bg-white tw:text-white tw:peer-checked:bg-white tw:peer-checked:text-primary',
              hasLabel && 'tw:mr-2.5',
              props.disabled &&
                'tw:cursor-not-allowed tw:bg-grey-300 tw:peer-checked:bg-grey-500',
            )}
          >
            <Icons.checkMark classname="tw:h-4 tw:w-4 tw:flex-shrink-0 tw:text-inherit" />
          </div>
        </div>

        {hasLabel &&
          (typeof label === 'string' ? (
            <Typography>{label}</Typography>
          ) : (
            <div className="tw:text-inherit">{label}</div>
          ))}
      </label>

      {error && (
        <Typography className="tw:mt-1 tw:rounded-lg tw:bg-red-50 tw:p-2 tw:text-[13px] tw:text-black tw:lg:text-base">
          {error}
        </Typography>
      )}
    </div>
  );
};
