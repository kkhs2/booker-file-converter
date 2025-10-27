import { h } from 'preact';
import { cn } from '../../../utils/helpers';
import Typography from '../Typography/Typography';

/**
 * Radio Component
 *
 * @description A styled radio input component with two variant styles
 * @param {Object} props - Component props
 * @param {string} props.name - Name for the radio input
 * @param {string} props.id - Unique ID for the radio input
 * @param {string} props.value - Value for the radio input
 * @param {boolean} props.checked - Whether the radio is checked
 * @param {function} props.onchange - Function to handle change events
 * @param {string} props.label - Label text for the radio
 * @param {string} [props.classname] - Additional classes to add to the component
 * @param {boolean} [props.disabled] - Whether the radio input is disabled
 * @returns {JSX.Element} Preact component
 */
const Radio = ({
  name,
  id,
  value,
  checked,
  onchange,
  label,
  classname,
  disabled = false,
}) => {
  return (
    <div className={cn('tw:w-full', classname)}>
      <label
        htmlFor={id}
        className={cn(
          'tw:flex tw:cursor-pointer tw:items-center',
          disabled && 'tw:cursor-not-allowed tw:opacity-50',
        )}
      >
        <input
          type="radio"
          name={name}
          id={id}
          value={value}
          checked={checked}
          onchange={onchange}
          disabled={disabled}
          className="tw:h-0 tw:w-0 tw:opacity-0"
        />

        <span
          className={cn(
            'tw:relative tw:mr-4 tw:flex tw:h-6 tw:w-6 tw:flex-shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:border-8 tw:border-grey-1100',
            checked && 'tw:border-primary-500',
            !checked && 'tw:border-grey-1100 tw:bg-grey-1100',
          )}
        >
          {checked && (
            <span className="tw:absolute tw:h-2 tw:w-2 tw:rounded-full"></span>
          )}
        </span>

        <Typography
          domtype="span"
          classname="tw:block tw:text-lg tw:font-medium"
        >
          {label}
        </Typography>
      </label>
    </div>
  );
};

export default Radio;
