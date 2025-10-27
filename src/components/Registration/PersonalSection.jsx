import { h, Fragment } from 'preact';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';
import { Input, Checkbox, Select } from '../Form';
import { useState } from 'preact/hooks';

/**
 * PersonalSection Component
 *
 * @description A component that displays a personal section with a form for business registration.
 *
 * @param {Object} props - Component props
 * @param {string} [props.classname] - Additional classes to add to the component
 * @returns {JSX.Element} Preact component - The PersonalSection component
 * */

export const PersonalSection = ({ onsubmit, ...props }) => {
  const [title, setTitle] = useState(null);
  return (
    <div className="tw:space-y-6 tw:lg:space-y-8">
      <div className="tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:lg:p-10">
        <p className="tw:text-13 tw:lg:text-lg">
          Already have an account with us?{' '}
          <a href="#" className="tw:text-sm tw:font-semibold tw:lg:text-lg">
            Log in here
          </a>
        </p>
        <Typography domtype="h5" classname="tw:text-primary tw:mt-2">
          Tell us about you
        </Typography>
      </div>

      <div
        className="tw:flex tw:gap-10 tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:lg:p-10"
        {...props}
      >
        <div className="tw:w-full tw:lg:w-1/2">
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
              />

              <Input label="First name" placeholder="First name" />

              <Input label="Last name" placeholder="Last name" />

              <Input
                label="Mobile number"
                type="tel"
                placeholder="Mobile number"
              />

              <Input label="Email" type="email" placeholder="Email" />

              <Input
                label="Re-enter email"
                type="email"
                placeholder="Re-enter email"
              />
            </div>

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

            <div className="tw:space-y-4 tw:lg:space-y-6">
              <p className="">Your marketing preferences</p>
              <p className="tw:text-13 tw:lg:text-base">
                Our customers love to hear about our special offers, events,
                hints and tips and selected money off vouchers by email, text,
                phone and post. If you{' '}
                <span className="tw:font-semibold">prefer not to</span> receive
                these exclusive deals from us please tick here
              </p>

              <div className="tw:grid tw:grid-cols-2 tw:grid-rows-2 tw:items-center tw:gap-4 tw:lg:flex tw:lg:gap-6">
                <Checkbox
                  label="Email"
                  name="email_pref"
                  classname="tw:text-13 tw:lg:text-base"
                />
                <Checkbox
                  label="Text"
                  name="text_pref"
                  classname="tw:text-13 tw:lg:text-base"
                />
                <Checkbox
                  label="Phone"
                  name="phone_pref"
                  classname="tw:text-13 tw:lg:text-base"
                />
                <Checkbox
                  label="Post"
                  name="post_pref"
                  classname="tw:text-13 tw:lg:text-base"
                />
              </div>
            </div>

            <div className="tw:space-y-4 tw:lg:space-y-6">
              <p>Don't miss out</p>
              <Checkbox
                label="Receive promotional offers from Tesco Group or other selected parties."
                name="promo_pref"
                classname="tw:text-13 tw:lg:text-base tw:mb-4 tw:lg:mb-5"
              />
              <p className="tw:text-13 tw:lg:text-base">
                Remember, you can opt out at any time by managing your
                preferences in your account. If you’ve already signed up to
                receive offers and promotions from Tesco Bank or Tesco Mobile,
                you’ll need to contact them directly to opt out.
              </p>
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

      <div className="tw:flex tw:w-full tw:flex-col-reverse tw:items-center tw:justify-between tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:lg:flex-row tw:lg:p-10">
        <Button
          variant="secondary"
          label="Previous: Your business"
          iconleft={<Icons.arrowLeft />}
          onclick={(e) => {
            e.preventDefault();
            onsubmit(0);
          }}
          classname="tw:max-lg:w-full tw:px-4 tw:pr-6 tw:max-lg:mt-4"
        />
        <Button
          variant="tertiary"
          label="Continue"
          onclick={(e) => {
            e.preventDefault();
            onsubmit(2);
          }}
          classname="tw:max-lg:w-full tw:px-13"
        />
      </div>
    </div>
  );
};
