import { h, Fragment } from 'preact';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';
import { useState } from 'preact/hooks';
import { Input, Checkbox, Select } from '../Form';

/**
 * BusinessSection Component
 *
 * @description A component that displays a business section with a form for business registration.
 *
 * @param {Object} props - Component props
 * @param {string} [props.classname] - Additional classes to add to the component
 * @param {function} props.onsubmit - Function to call when the form is submitted
 * @returns {JSX.Element} Preact component - The BusinessSection component
 */

export const BusinessSection = ({ onsubmit, ...props }) => {
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [showTobaccoFields, setShowTobaccoFields] = useState(false);
  // Economic Operator ID and Facility ID state
  const [economicOperatorIdPrefix, setEconomicOperatorIdPrefix] =
    useState(null);
  const [facilityIdPrefix, setFacilityIdPrefix] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);

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
          Tell us about your business
        </Typography>

        <p className="tw:mt-4 tw:text-[13px] tw:lg:mt-6 tw:lg:text-lg">
          Booker is a <span className="tw:font-semibold">trade only</span>{' '}
          supplier and is not open to the general public. To complete your
          registration, you will need to bring 2 proofs of business to your
          local branch.
        </p>
      </div>

      <div
        className="tw:flex tw:gap-10 tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:lg:p-10"
        {...props}
      >
        <div className="tw:w-full tw:lg:w-1/2">
          {/* form */}
          <form className="tw:space-y-6 tw:lg:space-y-10">
            <div className="tw:space-y-6 tw:lg:space-y-8">
              <Input
                label="What is your type of business?"
                name="businessType"
                iconleft={<Icons.search />}
                dropdownlabel="Select your business type"
                suggestions={[
                  { label: 'Business', value: 'Business' },
                  { label: 'Individual', value: 'Individual' },
                  { label: 'Sole Trader', value: 'Sole Trader' },
                  { label: 'Partnership', value: 'Partnership' },
                  { label: 'Limited Company', value: 'Limited Company' },
                  {
                    label: 'Public Limited Company',
                    value: 'Public Limited Company',
                  },
                  {
                    label: 'Limited Liability Partnership',
                    value: 'Limited Liability Partnership',
                  },
                  { label: 'Charity', value: 'Charity' },
                  { label: 'Trust', value: 'Trust' },
                  { label: 'Other', value: 'Other' },
                ]}
                onSelect={(selected) => console.log('Selected:', selected)}
                onchange={(e) => console.log('Input changed:', e.target.value)}
                required
              />

              <Input
                label="Legal business name"
                name="legalBusinessName"
                required
              />

              <div>
                <Input
                  label="Address, Postcode, City"
                  name="postcode"
                  iconleft={<Icons.search />}
                  onSelect={(selected) => console.log('Selected:', selected)}
                  onchange={(e) =>
                    console.log('Input changed:', e.target.value)
                  }
                  dropdownlabel="Select your address"
                  suggestions={[
                    {
                      label: '2 Leighton Place London NW5 2QL',
                      value: '2 Leighton Place London NW5 2QL',
                    },
                    {
                      label: '2 Leighton Place London NW5 2QL',
                      value: '2 Leighton Place London NW5 2QL',
                    },
                    {
                      label: '2 Leighton Place London NW5 2QL',
                      value: '2 Leighton Place London NW5 2QL',
                    },
                    {
                      label: '2 Leighton Place London NW5 2QL',
                      value: '2 Leighton Place London NW5 2QL',
                    },
                    {
                      label: '2 Leighton Place London NW5 2QL',
                      value: '2 Leighton Place London NW5 2QL',
                    },
                    {
                      label: '2 Leighton Place London NW5 2QL',
                      value: '2 Leighton Place London NW5 2QL',
                    },
                    {
                      label: '2 Leighton Place London NW5 2QL',
                      value: '2 Leighton Place London NW5 2QL',
                    },
                    {
                      label: '2 Leighton Place London NW5 2QL',
                      value: '2 Leighton Place London NW5 2QL',
                    },
                    {
                      label: '2 Leighton Place London NW5 2QL',
                      value: '2 Leighton Place London NW5 2QL',
                    },
                    {
                      label: '2 Leighton Place London NW5 2QL',
                      value: '2 Leighton Place London NW5 2QL',
                    },
                  ]}
                  required
                />

                <button
                  type="button"
                  className="tw:mt-3 tw:cursor-pointer"
                  onClick={(e) =>
                    setShowAddressFields((prev) => !prev) && e.preventDefault()
                  }
                >
                  Enter address manually
                </button>
              </div>

              {showAddressFields && (
                <div className="tw:space-y-6 tw:lg:space-y-8">
                  <Input label="Unit/Flat number" name="flatNumber" />

                  <Input label="Building Name" name="buildingName" />

                  <Input label="Property Number" name="propertyNumber" />

                  <Input label="Street" name="street1" required />

                  <Input label="Street (line 2)" name="street2" />

                  <Input label="Street (line 3)" name="street3" />

                  <Input label="Town/City" name="townCity" required />

                  <Input label="County" name="county" />
                </div>
              )}

              <div className="tw:space-y-6 tw:lg:space-y-8">
                <Input label="VAT number (optional)" name="vatNumber" />
                <Input label="Charity number (optional)" name="charityNumber" />
                <Input
                  label="Company registration number"
                  name="companyNumber"
                  icononclick={() => setShowModal(true)}
                />

                <Checkbox
                  label="I am the legal owner of the business"
                  name="legalOwner"
                  classname="tw:text-13 tw:lg:text-lg"
                />

                <Checkbox
                  label="I have recently taken control of an existing business"
                  name="existingBusiness"
                  classname="tw:text-13 tw:lg:text-lg"
                />

                <Checkbox
                  label="My business sells tobacco products"
                  name="tobaccoProducts"
                  onchange={(e) => setShowTobaccoFields(e.target.checked)}
                  classname="tw:text-13 tw:lg:text-lg"
                />

                {showTobaccoFields && (
                  <div>
                    <div className="tw:mb-6 tw:flex tw:flex-col tw:items-center tw:gap-4 tw:space-y-2 tw:lg:flex-row tw:lg:space-y-0">
                      <div className="tw:w-full tw:flex-shrink-0 tw:lg:w-1/2">
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
                      <div className="tw:w-full tw:flex-shrink-0 tw:lg:w-1/2">
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
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="tw:hidden tw:w-1/2 tw:lg:block">
          <img
            src="./images/registration/banner1.png"
            alt="Business Image"
            className="tw:h-full tw:w-full tw:rounded-[20px] tw:object-cover tw:object-center"
          />
        </div>

        {showModal && (
          <div className="tw:fixed tw:top-0 tw:right-0 tw:bottom-0 tw:left-0 tw:z-50 tw:flex tw:items-end tw:bg-black/50 tw:lg:items-center tw:lg:justify-center">
            <div className="tw:w-full tw:max-w-[598px] tw:rounded-[20px] tw:bg-secondary-1000 tw:p-6 tw:max-lg:rounded-b-none tw:lg:p-10">
              <div className="tw:flex tw:items-center tw:justify-between">
                <Typography
                  domtype="h5"
                  classname="tw:text-primary tw:pr-3 tw:lg:pr-6"
                >
                  Company registration number
                </Typography>

                <button onclick={() => setShowModal(false)}>
                  <Icons.x classname=" tw:h-8 tw:w-8 tw:cursor-pointer" />
                </button>
              </div>
              <p className="tw:mt-6">
                The company registration number is a unique identifier assigned
                to a company when it is registered with the relevant
                authorities. It is used to track the company's legal status and
                compliance with regulations.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="tw:flex tw:w-full tw:flex-col tw:items-center tw:justify-end tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:lg:flex-row tw:lg:p-10">
        <Button
          variant="tertiary"
          label="Continue"
          onclick={(e) => {
            e.preventDefault();
            onsubmit(1);
          }}
          classname="tw:border tw:border-transparent tw:px-13 tw:max-md:w-full"
        />
      </div>
    </div>
  );
};
