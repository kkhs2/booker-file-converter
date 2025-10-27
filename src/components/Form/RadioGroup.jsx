import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { cn } from '../../../utils/helpers';
import Radio from './Radio';
import Typography from '../Typography/Typography';

/**
 * RadioGroup Component
 *
 * @description A group of radio inputs that share the same name
 * @param {Object} props - Component props
 * @param {string} props.name - Name for the radio group
 * @param {Array<{id: string, value: string, label: string, disabled?: boolean}>} props.options - Array of radio options
 * @param {string} [props.defaultvalue] - Default selected value
 * @param {function} [props.onchange] - Function called when selection changes
 * @param {string} [props.error] - Error message to display below the radio group
 * @param {string} [props.classname] - Additional classes to add to the component
 * @returns {JSX.Element} Preact component
 */
const RadioGroup = ({
  name,
  options,
  defaultvalue,
  onchange,
  error,
  classname,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultvalue || '');

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    if (onchange) {
      onchange(e.target.value);
    }
  };

  return (
    <div className={cn('tw:flex tw:flex-col tw:space-y-2', classname)}>
      {options.map((option) => (
        <Radio
          key={option.id}
          id={option.id}
          name={name}
          value={option.value}
          label={option.label}
          checked={selectedValue === option.value}
          onchange={handleChange}
          disabled={option.disabled}
        />
      ))}
      {error && (
        <Typography className="tw:mt-1 tw:rounded-lg tw:bg-red-50 tw:p-2 tw:text-[13px] tw:text-black tw:lg:text-base">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default RadioGroup;
