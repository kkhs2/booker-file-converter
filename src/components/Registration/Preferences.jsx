import { h, Fragment } from 'preact';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import { Input, Checkbox, Select } from '../Form';
import { useState } from 'preact/hooks';
import Icons from '../Icons/Icons';

/**
 * Preferences Component
 *
 * @description A component that displays user preferences options.
 *
 * @param {Object} props - Component props
 * @param {string} [props.classname] - Additional classes to add to the component
 * @returns {JSX.Element} Preact component - The Preferences component
 * */

export const Preferences = ({ onsubmit, ...props }) => {
  // Economic Operator ID and Facility ID state
  const [economicOperatorIdPrefix, setEconomicOperatorIdPrefix] =
    useState(null);
  const [facilityIdPrefix, setFacilityIdPrefix] = useState(null);

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

      <div className="tw:flex-col tw:space-y-10 tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:lg:p-10">
        <Typography domtype="h5" classname="tw:text-primary tw:mt-2">
          Tobacco Track & Trace
        </Typography>

        <div>
          <div className="tw:mb-6 tw:flex tw:flex-col tw:items-center tw:gap-4 tw:space-y-2 tw:lg:flex-row tw:lg:space-y-0">
            <div className="tw:w-full tw:lg:w-[60%]">
              <Select
                label="Economic Operator ID"
                options={[
                  { value: 'QCGDLRE', label: 'QCGDLRE' },
                  { value: 'QCUKT', label: 'QCUKT' },
                ]}
                value={economicOperatorIdPrefix}
                onchange={setEconomicOperatorIdPrefix}
              />
            </div>

            <Input name="economicOperatorID" classname="tw:w-full" />
          </div>

          <div className="tw:mb-6 tw:flex tw:flex-col tw:items-center tw:gap-4 tw:space-y-2 tw:lg:flex-row tw:lg:space-y-0">
            <div className="tw:w-full tw:lg:w-[60%]">
              <Select
                label="Facility ID"
                placeholder="Choose prefix"
                options={[
                  { value: 'QCGDRLF', label: 'QCGDRLF' },
                  { value: 'QCUKT', label: 'QCUKT' },
                ]}
                value={facilityIdPrefix}
                onchange={setFacilityIdPrefix}
              />
            </div>

            <Input name="facilityID" classname="tw:w-full" />
          </div>
        </div>

        <p className="tw:text-base">
          You can register at{' '}
          <a
            href="https://idissuer.uk-trackandtrace-dentsutracking.com/"
            className="tw:border-b tw:border-dotted tw:font-medium"
          >
            https://idissuer.uk-trackandtrace-dentsutracking.com/
          </a>
        </p>
      </div>

      <div className="tw:flex-col tw:space-y-10 tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:lg:p-10">
        <Typography domtype="h5" classname="tw:text-primary tw:mt-2">
          Marketing preferences
        </Typography>

        <p className="tw:text-base">
          Our customers love to hear about our special offers, events, hints and
          tips and selected money off vouchers by email, text, phone and post.
          Please tick below to confirm you are happy for Booker (including
          external partners) and/or third parties to contact you with exclusive
          deals. You can unsubscribe at any time by unticking the relevant
          boxes.
        </p>

        {/* Desktop */}
        <div className="tw:hidden tw:grid-cols-5 tw:gap-10 tw:lg:grid">
          <p className="tw:col-start-4 tw:text-center">Booker Group</p>
          <p className="tw:text-center">Third party</p>

          <p>Email</p>

          <div className="tw:col-span-2 tw:space-y-6">
            <Input
              label="Web login email"
              value="contact@tratorria.com"
              disabled
            />
            <Input label="Main email" value="maria@pizzaparlour.com" disabled />
            <Input
              label="Additional email"
              value="maria.bailey@gmail.com"
              disabled
            />
          </div>

          <div className="tw:flex tw:w-full tw:flex-col tw:items-center tw:justify-center tw:space-y-14">
            <Checkbox checked={true} />
            <Checkbox checked={true} />
            <Checkbox checked={true} />
          </div>

          <div className="tw:flex tw:w-full tw:flex-col tw:items-center tw:justify-center tw:space-y-14">
            <Checkbox />
            <Checkbox />
            <Checkbox />
          </div>
        </div>

        <div className="tw:hidden tw:grid-cols-5 tw:gap-10 tw:lg:grid">
          <p>SMS (Text)</p>

          <div className="tw:col-span-2 tw:space-y-6">
            <Input label="Main mobile number" value="07701234567" disabled />
            <Input
              label="Additional mobile number"
              value="07701234567"
              disabled
            />
          </div>

          <div className="tw:flex tw:w-full tw:flex-col tw:items-center tw:justify-center tw:space-y-14">
            <Checkbox />
            <Checkbox />
          </div>

          <div className="tw:flex tw:w-full tw:flex-col tw:items-center tw:justify-center tw:space-y-14">
            <Checkbox />
            <Checkbox />
          </div>
        </div>

        {/* Mobile */}
        <div className="tw:flex tw:w-full tw:flex-col tw:lg:hidden">
          <p className="tw:mb-6">Email</p>

          <Input
            label="Web login email"
            value="contact@tratorria.com"
            disabled
          />

          <div className="tw:mt-4 tw:mb-10 tw:flex tw:w-full tw:justify-between tw:px-3">
            <Checkbox checked={true} label="Booker group" />
            <Checkbox label="Third party" />
          </div>

          <Input label="Main email" value="maria@pizzaparlour.com" disabled />

          <div className="tw:mt-4 tw:mb-10 tw:flex tw:w-full tw:justify-between tw:px-3">
            <Checkbox checked={true} label="Booker group" />
            <Checkbox label="Third party" />
          </div>

          <Input
            label="Additional email"
            value="maria.bailey@gmail.com"
            disabled
          />

          <div className="tw:mt-4 tw:flex tw:w-full tw:justify-between tw:px-3">
            <Checkbox checked={true} label="Booker group" />
            <Checkbox label="Third party" />
          </div>
        </div>

        <div className="tw:flex tw:w-full tw:flex-col tw:lg:hidden">
          <p className="tw:mb-6">SMS (Text)</p>

          <Input label="Main mobile number" value="07701234567" disabled />

          <div className="tw:mt-4 tw:mb-10 tw:flex tw:w-full tw:justify-between tw:px-3">
            <Checkbox label="Booker group" />
            <Checkbox label="Third party" />
          </div>

          <Input
            label="Additional mobile number"
            value="07701234567"
            disabled
          />

          <div className="tw:mt-4 tw:mb-10 tw:flex tw:w-full tw:justify-between tw:px-3">
            <Checkbox label="Booker group" />
            <Checkbox label="Third party" />
          </div>
        </div>

        <p className="tw:text-base">
          The above preferences refer to marketing activities only. We may
          contact you via the above methods for essential account purposes.
          Symbol Group customers also have additional obligations which require
          us to send them marketing materials.
        </p>

        {/* Desktop */}
        <div className="tw:hidden tw:grid-cols-5 tw:gap-10 tw:lg:grid">
          <p>Post</p>

          <div className="tw:col-start-4 tw:flex tw:w-full tw:flex-col tw:items-center tw:justify-center tw:space-y-14">
            <Checkbox checked={true} />
          </div>

          <div className="tw:flex tw:w-full tw:flex-col tw:items-center tw:justify-center tw:space-y-14">
            <Checkbox checked={true} />
          </div>

          <p>Telephone</p>

          <div className="tw:col-start-4 tw:flex tw:w-full tw:flex-col tw:items-center tw:justify-center tw:space-y-14">
            <Checkbox checked={true} />
          </div>

          <div className="tw:flex tw:w-full tw:flex-col tw:items-center tw:justify-center tw:space-y-14">
            <Checkbox checked={true} />
          </div>

          <p>WhatsApp</p>

          <div className="tw:col-start-4 tw:flex tw:w-full tw:flex-col tw:items-center tw:justify-center tw:space-y-14">
            <Checkbox checked={true} />
          </div>

          <div className="tw:flex tw:w-full tw:flex-col tw:items-center tw:justify-center tw:space-y-14">
            <Checkbox checked={true} />
          </div>
        </div>

        {/* Mobile */}
        <div className="tw:flex tw:w-full tw:flex-col tw:lg:hidden">
          <p>Post</p>

          <div className="tw:mt-4 tw:mb-10 tw:flex tw:w-full tw:justify-between tw:px-3">
            <Checkbox checked={true} label="Booker group" />
            <Checkbox checked={true} label="Third party" />
          </div>

          <p>Telephone</p>

          <div className="tw:mt-4 tw:mb-10 tw:flex tw:w-full tw:justify-between tw:px-3">
            <Checkbox checked={true} label="Booker group" />
            <Checkbox checked={true} label="Third party" />
          </div>

          <p>WhatsApp</p>

          <div className="tw:mt-4 tw:flex tw:w-full tw:justify-between tw:px-3">
            <Checkbox checked={true} label="Booker group" />
            <Checkbox checked={true} label="Third party" />
          </div>
        </div>

        <p className="tw:text-base">
          For more information regarding help with how Booker Group companies
          uses your personal details, please see our{' '}
          <a href="" className="tw:underline">
            privacy policy.
          </a>
        </p>
      </div>

      <div className="tw:flex tw:w-full tw:flex-col-reverse tw:items-center tw:justify-between tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:lg:flex-row tw:lg:p-10">
        <Button
          variant="secondary"
          label="Previous: Your details"
          iconleft={<Icons.arrowLeft />}
          onclick={(e) => {
            e.preventDefault();
            onsubmit(0);
          }}
          classname="tw:max-lg:w-full tw:px-4 tw:pr-6 tw:max-lg:mt-4"
        />
        <Button
          variant="tertiary"
          label="Save preferences"
          onclick={(e) => {
            e.preventDefault();
            onsubmit(2);
          }}
          classname="tw:max-lg:w-full"
        />
      </div>
    </div>
  );
};
