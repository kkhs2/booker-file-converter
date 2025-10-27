import { useState } from 'preact/hooks';
import Typography from '../../Typography/Typography';
import Icons from '../../Icons/Icons';
import Button from '../../Button/Button';
import { Input } from '../../Form';

export const ForgotPasswordForm = ({ onSubmit }) => {
  const [isCustomerNumberNoticeOpen, setIsCustomerNumberNoticeOpen] =
    useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    onSubmit();
  };

  return (
    <div className="tw:space-y-8 tw:md:space-y-10">
      <Typography
        domtype="h4"
        content="Forgotten your password"
        classname="tw:text-primary tw:leading-[120%] tw:pr-2"
      />

      <Typography
        content={
          'Please enter your 9-digit customer number associated with your booker.co.uk account.\n\nWe will then send a link to your registered e-mail address where you can create a new password.'
        }
      ></Typography>

      {isSubmitted && (
        <div className="tw:flex tw:rounded-xl tw:bg-primary-50 tw:p-3 tw:md:p-6">
          <Icons.alertCircle classname="tw:w-5 tw:h-5 tw:text-red-700 tw:mr-3 tw:flex-shrink-0" />

          <Typography
            content="If the customer number you entered is associated with a customer account in our records, you will receive an e-mail with instructions for resetting your password. If you don't receive this email please check your junk mail folder or contact Website Support for further assistance."
            classname="tw:text-base tw:leading-[140%] tw:font-medium"
          />
        </div>
      )}

      {!isSubmitted && (
        <form
          className="tw:flex tw:flex-col tw:space-y-6 tw:md:space-y-8"
          noValidate
          onSubmit={handleSubmit}
        >
          <div>
            <Input name="customer-number" label="Customer number" required />

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

          <Button
            label="Next"
            variant="tertiary"
            type="submit"
            classname="tw:mt-2 tw:md:mt-0"
          />
        </form>
      )}
    </div>
  );
};
