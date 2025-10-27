/**
 * ContactForm - Reusable contact form component with validation and reCAPTCHA
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} [props.onsubmit] - Callback function called when form is submitted with form data
 * @param {Function} [props.oncancel] - Callback function called when cancel button is clicked
 * @param {string} [props.recaptchasitekey] - Google reCAPTCHA site key for form verification
 * @param {Object} [props.initialdata] - Initial form data
 * @param {boolean} [props.showtermsandconditions] - Whether to show terms and conditions checkbox (default: true)
 * @param {string} [props.termsurl] - URL for terms and conditions (default: "/terms-and-conditions")
 * @param {string} [props.privacyurl] - URL for privacy policy (default: "/privacy-policy")
 * @param {number} [props.messagemaxlength] - Maximum length for message field (default: 400)
 * @param {boolean} [props.showselectfield] - Whether to show select field (default: false)
 * @param {string} [props.selectfieldlabel] - Label for select field (default: "Select an option")
 * @param {Array} [props.selectfieldoptions] - Options for select field (default: [])
 * @param {string} [props.selectfieldplaceholder] - Placeholder for select field (default: "Please select")
 * @param {boolean} [props.selectfieldrequired] - Whether select field is required (default: false)
 * @param {string} [props.title] - Title of the form (default: "Contact us")
 * @param {string} [props.description] - Description text for the form
 * @param {string} [props.cancellabel] - Label for cancel button (default: "Cancel")
 * @param {string} [props.submitlabel] - Label for submit button (default: "Submit")
 * @param {JSX.Element} [props.children] - Optional children elements to render inside the form
 *
 *
 * @returns {JSX.Element} A reusable contact form with validation and reCAPTCHA
 */
import { useState, useCallback } from 'preact/hooks';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import { Input, PhoneNumberInput, TextArea, Checkbox, Select } from './index';
import Recaptcha from 'react-google-recaptcha';
import { cn, useMediaQuery } from '../../../utils/helpers';

const DEFAULT_FORM_FIELDS = {
  customerNumber: '',
  businessName: '',
  postcode: '',
  termsAccepted: false,
  contactName: '',
  contactNumber: '',
  email: '',
  message: '',
  selectField: '',
};

export const ContactForm = ({
  onsubmit,
  oncancel,
  recaptchasitekey,
  initialdata = {},
  showtermsandconditions = true,
  termsurl = '/terms-and-conditions',
  privacyurl = '/privacy-policy',
  messagemaxlength = 400,
  // Select field configuration
  showselectfield = false,
  selectfieldlabel = 'Select an option',
  selectfieldoptions = [],
  selectfieldplaceholder = 'Please select',
  selectfieldrequired = false,
  title = 'Contact us',
  description = '',
  cancellabel = 'Cancel',
  submitlabel = 'Submit',
  hiderightcontentmobile = false,
  children,
}) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const hideOnMobile = hiderightcontentmobile && isMobile;

  const [formData, setFormData] = useState({
    ...DEFAULT_FORM_FIELDS,
    ...initialdata,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [errors, setErrors] = useState({});

  // Validation logic
  const validateField = useCallback((field, value, options = {}) => {
    const {
      required = false,
      isEmail = false,
      minLength = 0,
      maxLength = Infinity,
      pattern = null,
    } = options;

    let error = '';

    if (!error && required && (!value || !value.toString().trim())) {
      error = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }

    if (
      !error &&
      value &&
      minLength > 0 &&
      value.toString().length < minLength
    ) {
      error = `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${minLength} characters long`;
    }

    if (
      !error &&
      value &&
      maxLength < Infinity &&
      value.toString().length > maxLength
    ) {
      error = `${field.charAt(0).toUpperCase() + field.slice(1)} must be no more than ${maxLength} characters long`;
    }

    if (
      !error &&
      value &&
      isEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      error = 'Please enter a valid email address';
    }

    if (!error && value && pattern && !pattern.test(value)) {
      error = `${field.charAt(0).toUpperCase() + field.slice(1)} format is invalid`;
    }

    return error;
  }, []);

  const validateForm = useCallback(
    (formData, fieldConfigs) => {
      const newErrors = {};

      Object.keys(fieldConfigs).forEach((field) => {
        const config = fieldConfigs[field];
        const value = formData[field];
        const error = validateField(field, value, config);

        if (error) {
          newErrors[field] = error;
        }
      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [validateField],
  );

  const clearFieldError = useCallback((field) => {
    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
  }, []);

  const setFieldError = useCallback((field, error) => {
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  }, []);

  const defaultFieldConfigs = {
    contactName: { required: true, minLength: 1 },
    contactNumber: { required: true, minLength: 1 },
    email: { required: true, isEmail: true },
    message: { required: true, minLength: 1 },
    businessName: { required: true, minLength: 1 },
    postcode: { required: true, minLength: 1 },
    termsAccepted: { required: true },
    selectField: {
      required: selectfieldrequired,
      minLength: selectfieldrequired ? 1 : 0,
    },
  };

  const handleInputChange = useCallback(
    (field) => (e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      if (errors[field]) {
        clearFieldError(field);
      }
    },
    [errors, clearFieldError],
  );

  const handleCheckboxChange = useCallback(
    (field) => (e) => {
      const checked = e.target.checked;
      setFormData((prev) => ({
        ...prev,
        [field]: checked,
      }));

      if (errors[field]) {
        clearFieldError(field);
      }
    },
    [errors, clearFieldError],
  );

  const handlePhoneChange = useCallback(
    (value) => {
      setFormData((prev) => ({
        ...prev,
        contactNumber: value,
      }));

      if (errors.contactNumber) {
        clearFieldError('contactNumber');
      }
    },
    [errors, clearFieldError],
  );

  const handleSelectChange = useCallback(
    (option) => {
      setFormData((prev) => ({
        ...prev,
        selectField: option ? option.value : '',
      }));

      if (errors.selectField) {
        clearFieldError('selectField');
      }
    },
    [errors, clearFieldError],
  );

  const getSelectLabel = useCallback(
    (value) => {
      const option = selectfieldoptions.find((opt) => opt.value === value);
      return option ? option.label : '';
    },
    [selectfieldoptions],
  );

  const handleRecaptchaChange = useCallback(
    (value) => {
      setRecaptchaValue(value);

      if (value && errors.recaptcha) {
        clearFieldError('recaptcha');
      }
    },
    [errors, clearFieldError],
  );

  const handleRecaptchaExpired = useCallback(() => {
    setRecaptchaValue(null);
    setFieldError('recaptcha', 'reCAPTCHA has expired, please verify again');
  }, [setFieldError]);

  const handleSubmit = useCallback(
    async (e) => {
      if (e) {
        e.preventDefault();
      }

      // Add reCAPTCHA validation if required
      const validationConfigs = { ...defaultFieldConfigs };
      if (recaptchaValue !== null && !recaptchaValue) {
        setFieldError(
          'recaptcha',
          'Please complete the reCAPTCHA verification',
        );
        return false;
      }

      if (!validateForm(formData, validationConfigs)) {
        return false;
      }

      setIsSubmitting(true);

      try {
        if (onsubmit) {
          await onsubmit({
            ...formData,
            recaptchaValue,
          });
        }
        return true;
      } catch (error) {
        console.error('Error submitting form:', error);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      formData,
      recaptchaValue,
      validateForm,
      onsubmit,
      defaultFieldConfigs,
      setFieldError,
    ],
  );

  return (
    <div className="tw:space-y-6 tw:lg:space-y-8">
      <div className="tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:lg:p-10">
        <Typography domtype="h5" classname="tw:text-primary tw:mt-2">
          {title}
        </Typography>

        <Typography
          className="tw:mt-4 tw:text-[13px] tw:lg:mt-6 tw:lg:text-lg"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        ></Typography>
      </div>
      <div className="tw:space-y-6">
        <div className="tw:flex tw:flex-col-reverse tw:gap-8 tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:lg:flex-row tw:lg:gap-10 tw:lg:p-10">
          <div className="tw:w-full tw:lg:w-1/2">
            <form
              onSubmit={handleSubmit}
              className="tw:space-y-5 tw:lg:space-y-8"
            >
              <Typography className="tw:text-sm tw:text-gray-600">
                All fields are required unless marked optional.
              </Typography>
              <div>
                <Input
                  label="Customer number"
                  type="text"
                  name="customerNumber"
                  value={formData.customerNumber}
                  onInput={handleInputChange('customerNumber')}
                  placeholder="Customer number (Optional)"
                  disabled={isSubmitting}
                  error={
                    errors.customerNumber &&
                    'Please provide your customer number.'
                  }
                />
              </div>

              <div>
                <Input
                  label="Business name"
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onInput={handleInputChange('businessName')}
                  placeholder="Business name"
                  disabled={isSubmitting}
                  error={
                    errors.businessName && 'Please provide your business name.'
                  }
                  required
                />
              </div>

              <div>
                <Input
                  label="Postcode"
                  type="text"
                  name="postcode"
                  value={formData.postcode}
                  onInput={handleInputChange('postcode')}
                  placeholder="Postcode"
                  disabled={isSubmitting}
                  error={errors.postcode && 'Please provide your postcode.'}
                  required
                />
              </div>

              <div>
                <Input
                  label="Contact name"
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onInput={handleInputChange('contactName')}
                  placeholder="Contact name"
                  disabled={isSubmitting}
                  error={
                    errors.contactName && 'Please provide your contact name.'
                  }
                  required
                />
              </div>

              <div>
                <PhoneNumberInput
                  label="Contact number"
                  value={formData.contactNumber}
                  onchange={handlePhoneChange}
                  placeholder="Contact number"
                  disabled={isSubmitting}
                  error={
                    errors.contactNumber &&
                    'Please provide your contact number.'
                  }
                  required
                />
              </div>

              <div>
                <Input
                  label="Email address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onInput={handleInputChange('email')}
                  placeholder="Email address"
                  disabled={isSubmitting}
                  error={errors.email && 'Please provide your email address.'}
                  required
                />
              </div>

              {showselectfield && (
                <div>
                  <Select
                    label={selectfieldlabel}
                    name="selectField"
                    value={
                      formData.selectField
                        ? {
                            value: formData.selectField,
                            label: getSelectLabel(formData.selectField),
                          }
                        : null
                    }
                    onchange={handleSelectChange}
                    disabled={isSubmitting}
                    error={errors.selectField}
                    required={selectfieldrequired}
                    options={selectfieldoptions}
                    placeholder={selectfieldplaceholder}
                  />
                </div>
              )}

              <div>
                <TextArea
                  label="Message"
                  name="message"
                  value={formData.message}
                  onchange={handleInputChange('message')}
                  placeholder="Message"
                  disabled={isSubmitting}
                  maxlength={messagemaxlength}
                  rows={5}
                  showcharactercount={true}
                  error={errors.message}
                  required
                />
              </div>

              {showtermsandconditions && (
                <div>
                  <div className="tw:flex tw:items-center tw:gap-2">
                    <Checkbox
                      checked={formData.termsAccepted}
                      onchange={handleCheckboxChange('termsAccepted')}
                      name="termsAccepted"
                      disabled={isSubmitting}
                    />
                    <Typography classname="tw:text-sm tw:lg:text-base">
                      By ticking this box I agree to your{' '}
                      <a
                        href={termsurl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tw:pb-2 tw:font-medium tw:underline tw:decoration-dotted tw:decoration-1 tw:underline-offset-4"
                      >
                        T&Cs
                      </a>{' '}
                      and{' '}
                      <a
                        href={privacyurl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tw:pb-2 tw:font-medium tw:underline tw:decoration-dotted tw:decoration-1 tw:underline-offset-4"
                      >
                        privacy policy
                      </a>
                    </Typography>
                  </div>
                  {errors.termsAccepted && (
                    <Typography className="tw:mt-1 tw:rounded-lg tw:bg-red-50 tw:p-2 tw:text-[13px] tw:text-black tw:lg:text-base">
                      Please confirm you agree to our T&Cs and privacy policy.
                    </Typography>
                  )}
                </div>
              )}

              {recaptchasitekey && (
                <div className="tw:mt-4">
                  <Recaptcha
                    sitekey={recaptchasitekey}
                    onChange={handleRecaptchaChange}
                    onExpired={handleRecaptchaExpired}
                  />
                  {errors.recaptcha && (
                    <Typography className="tw:mt-1 tw:rounded-lg tw:bg-red-50 tw:p-2 tw:text-[13px] tw:text-black tw:lg:text-base">
                      {errors.recaptcha}
                    </Typography>
                  )}
                </div>
              )}
            </form>
          </div>
          {!hideOnMobile && (
            <div
              className={cn(
                'tw:flex tw:flex-col tw:justify-between tw:rounded-[20px] tw:p-4 tw:lg:w-1/2 tw:lg:p-8',
                hiderightcontentmobile
                  ? 'tw:bg-transparent'
                  : 'tw:bg-secondary-1000',
              )}
            >
              {children}
            </div>
          )}
        </div>

        <div className="tw:flex tw:w-full tw:flex-col-reverse tw:items-center tw:justify-between tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:max-lg:space-y-4 tw:max-lg:space-y-reverse tw:lg:flex-row tw:lg:p-10">
          {oncancel && (
            <Button
              variant="secondary"
              label={cancellabel}
              onclick={oncancel}
              classname="tw:px-13 tw:max-md:w-full"
              type="button"
            />
          )}

          <Button
            variant="tertiary"
            label={isSubmitting ? 'Submitting...' : submitlabel}
            onclick={handleSubmit}
            classname="tw:border tw:border-transparent tw:px-13 tw:max-md:w-full"
            disabled={isSubmitting}
            type="submit"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
