/**
 * CustomerFeedback component renders a feedback form for collecting customer insights.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {function} [props.onsubmit] - Callback fired when the form is submitted.
 * @param {string} [props.classname=''] - Additional class names for the root element.
 * @param {boolean} [props.disabled=false] - Whether the form is disabled.
 * @param {Object} [props.initialvalues] - Initial form values.
 * @param {string} [props.initialvalues.contactName=''] - Initial contact name.
 * @param {string} [props.initialvalues.contactNumber=''] - Initial contact number.
 * @param {string} [props.initialvalues.email=''] - Initial email address.
 * @param {string} [props.initialvalues.businessType=''] - Initial business type.
 * @param {string} [props.initialvalues.feedback=''] - Initial feedback text.
 * @param {Object} [props.initialvalues.country] - Initial selected country.
 * @param {Array} [props.businesstypeoptions] - Array of business type options for the select dropdown.
 * @param {string} props.businesstypeoptions[].value - Option value.
 * @param {string} props.businesstypeoptions[].label - Option label.
 * @param {string} props.recaptchasitekey - Google reCAPTCHA site key for verification.
 *
 * * @returns {JSX.Element} The rendered CustomerFeedback component.
 */

import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import ReCAPTCHA from 'react-google-recaptcha';
import { cn } from '../../../utils/helpers';
import { PhoneNumberInput, Input, Select, TextArea } from '../Form';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import Icons from '../Icons/Icons';

const defaultBusinessTypeOptions = [
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'bar', label: 'Bar/Pub' },
  { value: 'cafe', label: 'Cafe' },
  { value: 'retail', label: 'Retail' },
  { value: 'other', label: 'Other' },
];

const CustomerFeedback = ({
  onsubmit,
  onclose = () => {},
  disabled = false,
  submitted = false,
  businesstypeoptions = defaultBusinessTypeOptions,
  recaptchasitekey = 'add-site-key',
  classname = '',
  initialvalues = {
    contactName: '',
    contactNumber: '',
    email: '',
    businessType: '',
    feedback: '',
    country: {
      code: 'GB',
      name: 'United Kingdom',
      dialcode: '+44',
    },
  },
}) => {
  const [formData, setFormData] = useState(initialvalues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(submitted);

  const handleInputChange = (field) => (value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleSelectChange = (field) => (value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.businessType) {
      newErrors.businessType = 'Business type is required';
    }

    if (!formData.feedback.trim()) {
      newErrors.feedback = 'Feedback is required';
    } else if (formData.feedback.length > 400) {
      newErrors.feedback = 'Feedback must be 400 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (onsubmit) {
        await onsubmit({
          ...formData,
          recaptchaToken: recaptchaValue,
        });
        console.log('asdasda');
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const maxCharacters = 400;

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);

    if (value && errors.recaptcha) {
      setErrors((prev) => ({
        ...prev,
        recaptcha: '',
      }));
    }
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaValue(null);
    setErrors((prev) => ({
      ...prev,
      recaptcha: 'reCAPTCHA has expired, please verify again',
    }));
  };

  return (
    <div className="tw:relative tw:flex tw:h-full tw:w-full tw:translate-x-full tw:justify-end tw:overflow-auto tw:transition-all tw:duration-1000 tw:group-[.open]:translate-x-0">
      <div
        className={cn(
          'tw:max-w-md tw:overflow-auto tw:bg-white tw:p-6',
          classname,
        )}
      >
        <div className="tw:flex tw:justify-end">
          <button
            className="tw:cursor-pointer tw:transition-opacity tw:hover:opacity-50"
            onClick={() => {
              onclose();
            }}
          >
            <Icons.x
              fill="black"
              classname="tw:w-5 tw:h-5 tw:md:w-6 tw:md:h-6"
            />
          </button>
        </div>

        <div className="tw:my-6 tw:lg:my-8">
          <Typography
            domtype="h4"
            classname="tw:text-primary tw:mb-4 tw:lg:mb-6 tw:leading-[120%]"
          >
            {isSubmitted ? 'Thanks for your feedback!' : 'Customer feedback'}
          </Typography>
          {isSubmitted ? (
            <div className="tw:space-y-4">
              <Typography>
                We appreciate you taking the time to provide your thoughts!
              </Typography>
              <Typography>
                Your feedback is invaluable in enhancing our products, services,
                and your overall experience.
              </Typography>
            </div>
          ) : (
            <Typography>
              Thank you for taking a moment to share your feedback! Your
              insights help us improve our products, service, and your overall
              experience.
            </Typography>
          )}
        </div>

        {!isSubmitted && (
          <form
            onSubmit={handleSubmit}
            className="tw:space-y-6 tw:lg:space-y-8"
          >
            <Typography className="tw:mb-6 tw:text-sm tw:text-gray-500">
              All fields are required.
            </Typography>
            <div>
              <Input
                type="text"
                label="Contact Name"
                value={formData.contactName}
                onInput={(e) =>
                  handleInputChange('contactName')(e.target.value)
                }
                disabled={disabled || isSubmitting}
                error={errors.contactName}
                classname="tw:w-full"
              />
            </div>

            <div>
              <PhoneNumberInput
                value={formData.contactNumber}
                onchange={handleInputChange('contactNumber')}
                country={formData.country}
                disabled={disabled || isSubmitting}
                error={errors.contactNumber}
                classname="tw:w-full"
              />
            </div>

            <div>
              <Input
                type="email"
                label="Email address"
                value={formData.email}
                onInput={(e) => handleInputChange('email')(e.target.value)}
                disabled={disabled || isSubmitting}
                error={errors.email}
                classname="tw:w-full"
              />
            </div>

            <div>
              <Select
                options={businesstypeoptions}
                value={formData.businessType}
                onchange={handleSelectChange('businessType')}
                placeholder="Business type"
                disabled={disabled || isSubmitting}
                error={errors.businessType}
                classname="tw:w-full"
              />
            </div>

            <TextArea
              value={formData.feedback}
              onchange={(e) => handleInputChange('feedback')(e.target.value)}
              label="Your feedback"
              disabled={disabled || isSubmitting}
              rows={6}
              maxlength={maxCharacters}
              showcharactercount={true}
              error={errors.feedback}
              classname="tw:w-full"
            />

            <div>
              <ReCAPTCHA
                sitekey={recaptchasitekey}
                onChange={handleRecaptchaChange}
                onExpired={handleRecaptchaExpired}
                className="tw:mt-4"
              />
            </div>

            <div className="tw:pt-4">
              <Button
                label={isSubmitting ? 'Submitting...' : 'Submit'}
                variant="tertiary"
                size="default"
                classname="tw:w-full"
                type="submit"
              />
            </div>
          </form>
        )}

        {isSubmitted && (
          <Button
            label="Continue shopping"
            variant="tertiary"
            size="default"
            classname="tw:w-full"
            type="button"
            onClick={() => {
              onclose();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerFeedback;
