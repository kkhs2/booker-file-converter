/**
 * PhoneNumberInput component renders a phone number input field with a country selector dropdown.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.value=''] - The current value of the phone number input.
 * @param {function} props.onchange - Callback fired when the phone number input value changes.
 * @param {string} [props.placeholder='Contact number'] - Placeholder text for the input field.
 * @param {boolean} [props.disabled=false] - Whether the input and selector are disabled.
 * @param {boolean} [props.error=false] - Whether to display the input in an error state.
 * @param {string} [props.classname=''] - Additional class names for the root element.
 * @param {string} props.country.code - The country code (e.g., 'US').
 * @param {string} props.country.name - The country name (e.g., 'United States').
 * @param {string} props.country.dialcode - The country dial code (e.g., '+1').
 * @param {...Object} props - Additional props passed to the input element.
 *
 * * @returns {JSX.Element} The rendered PhoneNumberInput component.
 */

import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { countries } from '../../../utils/countries';
import { cn } from '../../../utils/helpers';
import { Input } from './Input';
import Icons from '../Icons/Icons';

const PhoneNumberInput = ({
  value = '',
  country = countries[223], // Default to UK
  onchange,
  placeholder = 'Contact number',
  disabled = false,
  error = '',
  classname = '',
  ...props
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(country);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  const handlePhoneChange = (e) => {
    if (onchange) {
      onchange(e.target.value);
    }
  };

  return (
    <div className={cn('tw:relative', classname)}>
      <div
        className={cn(
          'tw:flex tw:w-full tw:items-center tw:gap-2 tw:bg-white',
          error && 'tw:border-red-500',
          disabled && 'tw:cursor-not-allowed tw:bg-gray-50',
        )}
      >
        <div className="tw:relative">
          <button
            type="button"
            onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
            disabled={disabled}
            className={cn(
              'tw:flex tw:items-center tw:space-x-1 tw:rounded-lg tw:border tw:border-secondary-1300 tw:p-3 tw:py-[13px] tw:lg:pr-6',
              disabled ? 'tw:cursor-not-allowed' : 'tw:cursor-pointer',
            )}
          >
            <img
              alt={selectedCountry.name}
              src={`https://purecatamphetamine.github.io/country-flag-icons/1x1/${selectedCountry.code}.svg`}
              className="tw:h-4 tw:w-4"
              aria-hidden="true"
            />
            <span className="tw:font-medium">{selectedCountry.dialcode}</span>
            <Icons.chevronUp
              className={cn(
                'tw:h-4 tw:w-4 tw:shrink-0 tw:duration-200',
                !isDropdownOpen && 'tw:rotate-180',
              )}
            />
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="tw:absolute tw:top-full tw:left-0 tw:z-50 tw:mt-1 tw:max-h-60 tw:w-80 tw:overflow-y-auto tw:rounded-lg tw:border tw:border-secondary-1300 tw:bg-white tw:shadow-lg">
              {countries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  className="tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:px-3 tw:py-2 tw:transition-colors tw:duration-150 tw:hover:bg-gray-50"
                >
                  <img
                    alt={country.name}
                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code}.svg`}
                    className="tw:mr-3 tw:h-4 tw:w-4 tw:rounded-sm"
                  />
                  <span className="tw:mr-2">{country.dialcode}</span>
                  <span className="tw:text-md">{country.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="tw:min-w-0 tw:flex-1">
          <Input
            type="tel"
            value={value}
            onchange={handlePhoneChange}
            label={placeholder}
            disabled={disabled}
            classname="tw:w-full tw:pr-3"
            {...props}
          />
        </div>
      </div>

      {isDropdownOpen && (
        <div
          className="tw:fixed tw:inset-0 tw:z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}

      {error && (
        <p className="tw:mt-1 tw:rounded-lg tw:bg-red-50 tw:p-2 tw:text-[13px] tw:text-black tw:lg:text-base">
          {error}
        </p>
      )}
    </div>
  );
};

export default PhoneNumberInput;
