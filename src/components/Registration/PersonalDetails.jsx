import { h, Fragment } from 'preact';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import { Input, Checkbox, Select, ErrorMessage } from '../Form';
import { useState } from 'preact/hooks';
import Icons from '../Icons/Icons';

/**
 * PersonalDetails Component
 *
 * @description A component that displays a personal section with a form for business registration.
 *
 * @param {Object} props - Component props
 * @param {string} [props.classname] - Additional classes to add to the component
 * @param {Object} [props.onsubmit] - Function to call on form submission
 * @param {Object} [props.formerror] - Error object for form validation
 * @returns {JSX.Element} Preact component - The PersonalDetails component
 * */

export const PersonalDetails = ({ onsubmit, ...props }) => {
  const [title, setTitle] = useState(null);

  return (
    <div className="tw:space-y-6 tw:lg:space-y-8">
      <div className="tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:lg:p-10">
        <p className="tw:text-13 tw:lg:text-lg">
          <span>You entered customer number: 829998777</span>
          <a
            href="#"
            className="tw:border-b tw:border-dotted tw:text-sm tw:font-medium tw:lg:ml-3 tw:lg:text-lg"
          >
            This is not my customer number
          </a>
        </p>
        <Typography domtype="h5" classname="tw:text-primary tw:mt-2">
          Complete your registration
        </Typography>
      </div>

      <div
        className="tw:flex tw:gap-10 tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:lg:p-10"
        {...props}
      >
        <div className="tw:w-full tw:lg:w-1/2">
          {props.formerror && (
            <ErrorMessage message="The fields below are required to complete your registration" />
          )}

          {/* form */}
          <form className="tw:space-y-6 tw:lg:space-y-10">
            <div className="tw:space-y-6 tw:lg:space-y-8">
              <Select
                label="Title"
                placeholder="Choose title"
                options={[
                  { label: 'Mr', value: 'Mr' },
                  { label: 'Mrs', value: 'Mrs' },
                  { label: 'Miss', value: 'Miss' },
                  { label: 'Ms', value: 'Ms' },
                ]}
                value={title}
                onchange={setTitle}
                classname="tw:max-w-[160px]"
                required
                error={props.formerror?.fields?.includes('title')}
              />

              <Input
                label="First name"
                placeholder="First name"
                required
                error={props.formerror?.fields?.includes('first-name')}
              />

              <Input
                label="Last name"
                placeholder="Last name"
                required
                error={props.formerror?.fields?.includes('last-name')}
              />

              <Input
                label="Mobile number"
                type="tel"
                placeholder="Mobile number"
                error={props.formerror?.fields?.includes('phone-number')}
              />

              <Input label="Email" type="email" placeholder="Email" />

              <Input
                label="Re-enter email"
                type="email"
                placeholder="Re-enter email"
              />
            </div>

            <div className="tw:rounded-xl tw:bg-secondary-1000 tw:p-4">
              <p className="tw:mb-3 tw:text-lg">
                To create a safe password use:
              </p>

              <ul className="text-base tw:list-disc tw:pl-5">
                <li>Minimum of 8 characters</li>
                <li>one UPPERCASE letter</li>
                <li>one lowercase letter</li>
                <li>At least one number or one special character</li>
              </ul>
            </div>

            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="Create a new password"
              required
            />

            <Input
              name="confirmPassword"
              type="password"
              label="Confirm password"
              placeholder="Confirm new password"
              required
            />

            <div className="tw:space-y-4 tw:lg:space-y-6">
              <p className="tw:text-13 tw:lg:text-base">
                Make sure you read our terms and conditions because you are
                agreeing to these by creating a Booker account. It is also worth
                reading our privacy & cookies policy so you understand how we
                collect and use your personal data.
              </p>

              <Checkbox
                label="I agree to your T&C’s and website T&C’s."
                name="tc"
                classname="tw:text-13 tw:lg:text-base"
              />
              <Checkbox
                label="I agree to Booker's Privacy Policy."
                name="policy"
                classname="tw:text-13 tw:lg:text-base"
              />
            </div>
          </form>
        </div>

        <div className="tw:hidden tw:w-1/2 tw:lg:block">
          <img
            src="./images/registration/banner2.png"
            alt="Business Image"
            className="tw:h-full tw:w-full tw:rounded-[20px] tw:object-cover tw:object-center"
          />
        </div>
      </div>

      <div className="tw:flex tw:w-full tw:flex-col-reverse tw:items-center tw:justify-end tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:lg:flex-row tw:lg:p-10">
        <Button
          variant="tertiary"
          label="Register"
          onclick={(e) => {
            e.preventDefault();
            onsubmit(1);
          }}
          classname="tw:max-lg:w-full tw:px-13"
        />
      </div>
    </div>
  );
};
