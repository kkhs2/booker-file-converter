import { h, Fragment } from 'preact';
import Typography from '../../Typography/Typography';
import Button from '../../Button/Button';

export const ResetPasswordFormSuccess = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="tw:space-y-8 tw:md:space-y-10">
      <Typography
        domtype="h4"
        content="Success!"
        classname="tw:text-primary tw:leading-[120%] tw:pr-2"
      />

      <Typography
        content={
          "You've just created a new password. You can now log into Booker.com"
        }
      ></Typography>

      <Button
        label="Log In"
        variant="tertiary"
        type="button"
        onClick={(e) => handleSubmit(e)}
        classname="tw:mt-2 tw:md:mt-0 tw:w-full"
      />
    </div>
  );
};
