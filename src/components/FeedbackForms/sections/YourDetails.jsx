import { useState } from 'preact/hooks';
import Typography from '../../Typography/Typography';
import Button from '../../Button/Button';
import { Input, Checkbox } from '../../Form';
import Radio from '../../Form/Radio';
import PhoneNumberInput from '../../Form/PhoneNumberInput';
import ReCAPTCHA from 'react-google-recaptcha';
import Icons from '../../Icons/Icons';

export const YourDetails = ({
  onsubmit,
  oncancel,
  recaptchasitekey = 'your-recaptcha-site-key',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    contactPreference: '',
    agreeToTerms: false,
    recaptcha: null,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const handleRadioChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      contactPreference: value,
    }));
    // Clear error when user selects an option
    if (errors.contactPreference) {
      setErrors((prev) => ({
        ...prev,
        contactPreference: null,
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      agreeToTerms: e.target.checked,
    }));
    // Clear error when user checks the box
    if (errors.agreeToTerms) {
      setErrors((prev) => ({
        ...prev,
        agreeToTerms: null,
      }));
    }
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));
    // Clear error when user starts typing
    if (errors.phone) {
      setErrors((prev) => ({
        ...prev,
        phone: null,
      }));
    }
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    // Contact preference is required
    if (!formData.contactPreference) {
      newErrors.contactPreference =
        'Please select whether you would like to be contacted';
    }

    // Phone validation if provided (basic check for minimum length)
    if (formData.phone.trim() && formData.phone.trim().length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Terms agreement is required
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms =
        'You must agree to the terms and conditions to continue';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onsubmit(formData);
    }
  };

  const handleRecaptchaChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      recaptcha: value,
    }));
    setErrors((prev) => ({
      ...prev,
      recaptcha: null, // Clear any previous error
    }));
  };

  const handleRecaptchaExpired = () => {
    setFormData((prev) => ({
      ...prev,
      recaptcha: null,
    }));
    setErrors((prev) => ({
      ...prev,
      recaptcha: 'reCAPTCHA has expired, please verify again',
    }));
  };

  return (
    <div className="tw:space-y-6 tw:lg:space-y-8">
      <div className="tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:lg:p-10">
        <Typography domtype="h5" classname="tw:text-primary tw:mt-2">
          Help us improve!
        </Typography>

        <Typography className="tw:mt-4 tw:text-[13px] tw:lg:mt-6 tw:lg:text-lg">
          We're always looking for ways to make your shopping experience better.
          By completing the short form below, your insights can help us improve
          our products, service, and your overall experience.
        </Typography>
      </div>

      <div className="tw:flex tw:gap-10 tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:lg:p-10">
        <div className="tw:w-full tw:space-y-6 tw:lg:w-1/2">
          <Typography className="tw:text-sm tw:text-gray-600">
            All fields are required unless marked optional.
          </Typography>{' '}
          <div className="tw:space-y-6 tw:lg:space-y-8">
            <Typography className="tw:text-lg">
              Would you be happy for us to contact you to follow up on your
              feedback?
            </Typography>

            <div className="tw:space-y-2">
              <div className="tw:flex tw:max-w-xs tw:gap-2">
                <Radio
                  name="contactPreference"
                  id="contact-yes"
                  value="yes"
                  checked={formData.contactPreference === 'yes'}
                  onchange={() => handleRadioChange('yes')}
                  label="Yes"
                />
                <Radio
                  name="contactPreference"
                  id="contact-no"
                  value="no"
                  checked={formData.contactPreference === 'no'}
                  onchange={() => handleRadioChange('no')}
                  label="No"
                />
              </div>
              {errors.contactPreference && (
                <Typography className="tw:mt-1 tw:rounded-lg tw:bg-red-50 tw:p-2 tw:text-[13px] tw:text-black tw:lg:text-base">
                  {errors.contactPreference}
                </Typography>
              )}
            </div>

            <Typography className="tw:text-lg">
              If yes, please provide your preferred contact details
            </Typography>

            {errors.contactInfo && (
              <div className="tw:rounded tw:border tw:border-red-200 tw:bg-red-50 tw:p-3">
                <Typography className="tw:mt-1 tw:rounded-lg tw:bg-red-50 tw:p-2 tw:text-[13px] tw:text-black tw:lg:text-base">
                  {errors.contactInfo}
                </Typography>
              </div>
            )}

            <div className="tw:space-y-1">
              <Input
                type="text"
                label="Contact name (optional)"
                value={formData.name}
                onInput={handleInputChange('name')}
                classname="tw:w-full"
              />
            </div>

            <div className="tw:space-y-1">
              <Input
                type="email"
                label="Email address (optional)"
                value={formData.email}
                onInput={handleInputChange('email')}
                classname="tw:w-full"
              />
            </div>

            <div className="tw:relative tw:w-full tw:space-y-1">
              <PhoneNumberInput
                value={formData.phone}
                onchange={handlePhoneChange}
                placeholder="Contact number (optional)"
                classname="tw:w-full"
                error={errors.phone}
              />
            </div>

            <div className="tw:space-y-2">
              <div className="tw:flex tw:items-center tw:gap-2">
                <Checkbox
                  checked={formData.agreeToTerms}
                  onchange={handleCheckboxChange}
                />
                <Typography classname="tw:text-sm tw:lg:text-base">
                  By ticking this box I agree to your{' '}
                  <a
                    href="/terms-and-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tw:pb-2 tw:font-medium tw:underline tw:decoration-dotted tw:decoration-1 tw:underline-offset-4"
                  >
                    T&Cs
                  </a>{' '}
                  and{' '}
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tw:pb-2 tw:font-medium tw:underline tw:decoration-dotted tw:decoration-1 tw:underline-offset-4"
                  >
                    privacy policy
                  </a>
                </Typography>
              </div>
              {errors.agreeToTerms && (
                <Typography className="tw:mt-1 tw:rounded-lg tw:bg-red-50 tw:p-2 tw:text-[13px] tw:text-black tw:lg:text-base">
                  {errors.agreeToTerms}
                </Typography>
              )}
            </div>

            <div className="tw:space-y-2">
              <ReCAPTCHA
                sitekey={recaptchasitekey}
                onChange={handleRecaptchaChange}
                onExpired={handleRecaptchaExpired}
                className="tw:mt-4"
              />
            </div>
          </div>
        </div>

        <div className="tw:hidden tw:w-1/2 tw:lg:block">
          <img
            src="./images/feedback-bg.png"
            alt="Feedback Background"
            className="tw:h-full tw:w-full tw:rounded-[20px] tw:object-cover tw:object-center"
          />
        </div>
      </div>

      <div className="tw:flex tw:w-full tw:flex-col-reverse tw:items-center tw:justify-between tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:max-lg:space-y-4 tw:max-lg:space-y-reverse tw:lg:flex-row tw:lg:p-10">
        <Button
          variant="secondary"
          label="Previous: Your thoughts"
          onclick={(e) => {
            e.preventDefault();
            oncancel();
          }}
          iconleft={<Icons.arrowLeft className="tw:h-5 tw:w-5" />}
          classname="tw:lg:px-13 tw:max-md:w-full"
        />
        <Button
          variant="tertiary"
          label="Submit"
          onclick={handleSubmit}
          classname="tw:border tw:border-transparent tw:px-13 tw:max-md:w-full"
        />
      </div>
    </div>
  );
};
