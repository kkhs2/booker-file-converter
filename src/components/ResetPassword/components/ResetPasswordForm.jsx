import { h, Fragment } from 'preact';
import Typography from '../../Typography/Typography';
import Button from '../../Button/Button';
import { Input, ErrorMessage } from '../../Form';

export const ResetPasswordForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit();
  };

  return (
    <div className="tw:space-y-8 tw:md:space-y-10">
      <Typography
        domtype="h4"
        content="Reset your password"
        classname="tw:text-primary tw:leading-[120%] tw:pr-2"
      />
      <form
        className="tw:flex tw:flex-col tw:space-y-6 tw:md:space-y-8"
        noValidate
        onSubmit={handleSubmit}
      >
        <ErrorMessage message="This is an error message" />
        <div className="tw:flex tw:rounded-xl tw:bg-secondary-1000 tw:px-3 tw:py-4 tw:md:px-4 tw:md:py-6">
          <div>
            <Typography
              content="To create a safe password use:"
              classname="tw:text-base tw:font-bold tw:mb-2"
            />

            <ul className="tw:list-disc tw:pl-5">
              <li>Minimum of 8 characters</li>
              <li>one UPPERCASE letter</li>
              <li>one lowercase letter</li>
              <li>At least one number or one special character</li>
            </ul>
          </div>
        </div>

        <Input name="password" type="password" label="New Password" required />

        <Input
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          required
        />

        <Button
          label="Save new password"
          variant="tertiary"
          type="submit"
          classname="tw:mt-2 tw:md:mt-0"
        />
      </form>
    </div>
  );
};
