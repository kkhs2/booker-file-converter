import { linkTo } from '@storybook/addon-links';
import { useState } from 'preact/hooks';
import ContactCard from '../../ContactCards/ContactCard';
import Typography from '../../Typography/Typography';
import { Input, Checkbox } from '../../Form';
import Button from '../../Button/Button';
import Icons from '../../Icons/Icons';
import Loading from '../../Loading/Loading';

export const LoginForm = ({
  toggleForgotPassword,
  onClose,
  loading = false,
}) => {
  const [formError, setFormError] = useState(null);
  const [isCustomerNumberNoticeOpen, setIsCustomerNumberNoticeOpen] =
    useState(false);
  const [isCustomerNumberValid, setIsCustomerNumberValid] = useState(false);
  const [customerNumber, setCustomerNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setFormError({
        fields: ['customer-number', 'email', 'password'],
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const mockApiCall = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 100);
    });
  };

  const checkCustomerNumber = () => {
    setIsSubmitting(true);
    mockApiCall().then((isWebRegistered) => {
      setIsSubmitting(false);
      // If customer number is registered, show email and password fields
      if (isWebRegistered) {
        setIsCustomerNumberValid(isWebRegistered);
        setIsCustomerNumberNoticeOpen(false);
      }
      // If customer number is invalid, proceed to JA Web registration
      else {
        linkTo('Pages/Registration/JA Web registration', 'Default')();
      }
    });
  };

  // Unified form submit handler
  const handleFormSubmit = (e) => {
    if (!isCustomerNumberValid) {
      e.preventDefault();
      checkCustomerNumber();
    } else {
      handleSubmit(e);
    }
  };

  return (
    <div className="tw:space-y-8 tw:md:space-y-10">
      <Typography
        domtype="h4"
        content="Log into your Booker Account"
        classname="tw:text-primary tw:leading-[120%] tw:pr-2"
      />

      <div className="tw:relative">
        <form
          className="tw:flex tw:flex-col tw:space-y-6 tw:md:space-y-8"
          noValidate
          onSubmit={handleFormSubmit}
        >
          {formError && (
            <div className="tw:flex tw:rounded-xl tw:bg-primary-50 tw:p-3 tw:md:p-6">
              <Icons.alertCircle classname="tw:w-5 tw:h-5 tw:text-red-700 tw:mr-3 tw:flex-shrink-0" />

              <Typography
                content="The customer number, e-mail address and password you have supplied do not match."
                classname="tw:text-base tw:leading-[140%] tw:font-medium"
              />
            </div>
          )}

          <div>
            <Input
              name="customer-number"
              label="Customer number"
              required
              value={customerNumber}
              onChange={(e) => setCustomerNumber(e.target.value)}
              error={formError?.fields?.includes('customer-number')}
              disabled={isCustomerNumberValid}
              iconright={
                isCustomerNumberValid ? (
                  <Icons.checkMark classname=" tw:w-4 tw:h-4" />
                ) : null
              }
            />

            <button
              type="button"
              className="tw:mt-3 tw:cursor-pointer tw:text-base tw:leading-none tw:transition tw:hover:text-primary tw:hover:opacity-70"
              onClick={() => setIsCustomerNumberNoticeOpen((prev) => !prev)}
            >
              Forgot customer number?
            </button>
          </div>

          {isCustomerNumberNoticeOpen && (
            <div className="tw:flex tw:rounded-xl tw:bg-primary-50 tw:px-3 tw:py-4 tw:md:px-4 tw:md:py-6">
              <Icons.alertCircle classname="tw:w-5 tw:h-5 tw:text-red-700 tw:mr-3 tw:flex-shrink-0" />

              <div>
                <Typography
                  content="To find your 9-digit customer number:"
                  classname="tw:text-base tw:font-bold tw:mb-2"
                />

                <Typography
                  content="1. Check your card - use first 9 digits"
                  classname="tw:text-base tw:leading-[140%]"
                />
                <Typography
                  content="2. Refer to an invoice (left side above details)"
                  classname="tw:text-base tw:leading-[140%]"
                />

                <a
                  href="#"
                  className="tw:mt-3 tw:inline-block tw:text-base tw:font-medium tw:underline tw:decoration-dotted tw:decoration-1 tw:underline-offset-[2px] tw:transition tw:hover:text-primary tw:hover:no-underline tw:hover:opacity-70"
                >
                  Click here if you need more assistance
                </a>
              </div>
            </div>
          )}

          {!isCustomerNumberValid && (
            <Button
              label="Continue"
              variant="tertiary"
              type="button"
              classname="tw:mt-2"
              onClick={checkCustomerNumber}
              disabled={isSubmitting || loading}
            />
          )}

          {isCustomerNumberValid && (
            <>
              <Input
                name="email"
                label="Email"
                hideclearbutton
                required
                error={formError?.fields?.includes('email')}
              />

              <div>
                <Input
                  name="password"
                  type="password"
                  label="Password"
                  required
                  error={formError?.fields?.includes('password')}
                />

                <button
                  type="button"
                  className="tw:mt-3 tw:cursor-pointer tw:text-base tw:leading-none tw:transition tw:hover:text-primary tw:hover:opacity-70"
                  onClick={toggleForgotPassword}
                >
                  Forgot password?
                </button>
              </div>

              <div className="tw:flex tw:flex-col tw:space-y-4">
                <Button
                  label="Log in"
                  variant="tertiary"
                  type="submit"
                  classname="tw:mt-2 tw:md:mt-0"
                  disabled={isSubmitting || loading}
                />

                <Checkbox label="Stay signed in until I log out" />
              </div>
            </>
          )}
        </form>

        {/* Loading overlay */}
        {(isSubmitting || loading) && (
          <div className="tw:bg-opacity-90 tw:absolute tw:inset-0 tw:-top-3 tw:z-10 tw:flex tw:items-center tw:justify-center tw:rounded-xl tw:bg-white">
            <Loading text="Signing you in..." />
          </div>
        )}
      </div>

      <ContactCard
        title="Join the family."
        variant="secondary"
        icon="join-booker"
        href="#"
        label="Join Booker"
      />
    </div>
  );
};
