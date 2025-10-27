import { h, Fragment } from 'preact';
import Typography from '../Typography/Typography';
import Icons from '../Icons/Icons';
import Tag from '../Tag/Tag';
import Button from '../Button/Button';

/**
 * BranchActivationSection Component
 *
 * @description A component that displays a section for branch activation with information about required documents and branch details.
 *
 * @param {function} props.onsubmit - Function to call when the form is submitted
 * @return {JSX.Element} Preact component - The BranchActivationSection component
 * */

export const BranchActivationSection = ({ onsubmit }) => {
  return (
    <div className="tw:space-y-6 tw:lg:space-y-8">
      <div className="tw:flex tw:gap-10 tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:lg:p-10">
        <div>
          <Typography
            domtype="h5"
            classname="tw:text-primary tw:mt-2 tw:mb-6 tw:leading-[120%]"
          >
            Visit your branch to complete registration
          </Typography>
          <p>
            Please visit your delivery branch in order to complete an ID
            verification and
            <br />
            activate your account.
          </p>
        </div>
      </div>

      <div className="tw:mt-10.5 tw:flex tw:w-full tw:flex-col tw:gap-10 tw:lg:flex-row">
        <div className="tw:w-full tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:lg:p-10">
          <Typography domtype="h7" classname="tw:font-semibold">
            You must bring:
          </Typography>

          <div className="tw:mx-auto tw:mt-8">
            {/* Identity Proof Section */}
            <div className="tw:mb-8">
              <div className="tw:mb-6 tw:flex tw:items-center">
                <div className="tw:flex tw:h-[35px] tw:w-[35px] tw:flex-shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:bg-teal-400 tw:text-sm tw:font-bold tw:text-black tw:lg:h-[42px] tw:lg:w-[43px]">
                  1
                </div>
                <h4 className="tw:ml-4 tw:text-base tw:font-medium tw:lg:text-lg">
                  Proof of identity (1 from this list)
                </h4>
              </div>

              <div className="tw:ml-5 tw:border-l tw:border-secondary-1300 tw:py-2 tw:pl-8.5">
                <ul className="tw:space-y-3">
                  <li className="tw:text-sm tw:lg:text-lg">Driver's license</li>
                  <li className="tw:text-sm tw:lg:text-lg">Passport</li>
                </ul>
              </div>
            </div>

            {/* Business Proof Section */}
            <div className="tw:mb-8">
              <div className="tw:mb-6 tw:flex tw:items-center">
                <div className="tw:flex tw:h-[35px] tw:w-[35px] tw:flex-shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:bg-teal-400 tw:text-sm tw:font-bold tw:text-black tw:lg:h-[42px] tw:lg:w-[43px]">
                  2
                </div>
                <h4 className="tw:ml-4 tw:text-base tw:font-medium tw:lg:text-lg">
                  Proof of business (2 from this list)
                </h4>
              </div>

              <div className="tw:ml-5 tw:border-l tw:border-secondary-1300 tw:py-2 tw:pl-8.5">
                <ul className="tw:space-y-3">
                  <li className="tw:text-sm tw:lg:text-lg">
                    Utility Bill (Gas, Electric, Water)
                  </li>
                  <li className="tw:text-sm tw:lg:text-lg">
                    Letter Headed Paper VAT number (if applicable)
                  </li>
                  <li className="tw:text-sm tw:lg:text-lg">
                    Public Liability Insurance Certificate
                  </li>
                  <li className="tw:text-sm tw:lg:text-lg">
                    Building/Contents Insurance Certificate
                  </li>
                  <li className="tw:text-sm tw:lg:text-lg">
                    Trade Invoice from another supplier
                  </li>
                  <li className="tw:text-sm tw:lg:text-lg">
                    Business Permit of Licence
                  </li>
                  <li className="tw:text-sm tw:lg:text-lg">
                    Business Bank Statement
                  </li>
                  <li className="tw:text-sm tw:lg:text-lg">
                    Food Hygiene Certificate (if applicable)
                  </li>
                  <li className="tw:text-sm tw:lg:text-lg">
                    Registered Charity No. Certificate (if applicable)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="tw:w-full tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:lg:p-10">
          <Typography domtype="h7" classname="tw:font-semibold">
            Your branch
          </Typography>

          <Typography
            domtype="h5"
            classname="tw:text-primary tw:lg:mt-10 tw:mt-4 tw:mb-2"
          >
            St. Pancras
          </Typography>

          <p>106 Camley Street, London, N1C 4PF</p>

          <Button
            label="Browse this branch"
            variant="tertiary"
            classname="tw:mt-10 tw:w-full"
            href="#"
          />

          <div className="tw:mt-6 tw:rounded-[20px] tw:bg-secondary-1000 tw:px-3 tw:py-5 tw:pt-5 tw:lg:space-y-10 tw:lg:p-6 tw:lg:px-4">
            <div>
              <Typography
                domtype="h7"
                classname="tw:font-semibold tw:mb-3 tw:block"
              >
                Opening hours
              </Typography>
              <ul className="tw:mx-0 tw:list-none tw:space-y-6 tw:text-lg">
                <li className="tw:flex tw:items-center tw:justify-between">
                  <span>Monday</span> <span>09:00 - 17:00</span>
                </li>
                <li className="tw:flex tw:items-center tw:justify-between">
                  <span>Tuesdays</span> <span>09:00 - 15:00</span>
                </li>
                <li className="tw:flex tw:items-center tw:justify-between">
                  <span>Wednesdays</span> <span>09:00 - 17:00</span>
                </li>
                <li className="tw:flex tw:items-center tw:justify-between">
                  <span>Thursdays</span> <span>Closed</span>
                </li>
                <li className="tw:flex tw:items-center tw:justify-between">
                  <span>Fridays</span> <span>09:00 - 17:00</span>
                </li>
                <li className="tw:flex tw:items-center tw:justify-between">
                  <span>Saturdays</span> <span>09:00 - 17:00</span>
                </li>
                <li className="tw:flex tw:items-center tw:justify-between">
                  <span>Sundays</span> <span>09:00 - 17:00</span>
                </li>
              </ul>
            </div>

            <div>
              <Typography
                domtype="h7"
                classname="tw:font-semibold tw:mb-3 tw:block"
              >
                Get in touch
              </Typography>

              <p>
                Branch{' '}
                <span className="tw:underline tw:decoration-dotted">
                  01473 259059
                </span>
              </p>
              <p>
                Butchery{' '}
                <span className="tw:underline tw:decoration-dotted">
                  01473 259060
                </span>
              </p>
            </div>

            <div>
              <Typography
                domtype="h7"
                classname="tw:font-semibold tw:mb-3 tw:block"
              >
                Product ranges
              </Typography>

              <div className="tw:mb-4 tw:max-w-[120px] tw:flex-col tw:gap-2 tw:lg:max-w-full tw:lg:flex-row">
                <Tag
                  label="No tabacco"
                  icon={
                    <Icons.x classname="tw:text-red-700 tw:w-3 tw:h-3 tw:shrink-0" />
                  }
                  variant="inverse"
                  classname="tw:mr-2 tw:mb-2 tw:border-none"
                />
                <Tag
                  label="No fish"
                  icon={
                    <Icons.x classname="tw:text-red-700 tw:w-3 tw:h-3 tw:shrink-0" />
                  }
                  variant="inverse"
                  classname="tw:mr-2 tw:mb-2 tw:border-none"
                />
                <Tag
                  label="Butchery"
                  icon={
                    <Icons.checkMark classname="tw:text-green-500 tw:w-3 tw:h-3 tw:shrink-0" />
                  }
                  variant="inverse"
                  classname="tw:mr-2 tw:mb-2 tw:border-none"
                />
                <Tag
                  label="Click & Collect"
                  icon={
                    <Icons.checkMark classname="tw:text-green-500 tw:w-3 tw:h-3 tw:shrink-0" />
                  }
                  variant="inverse"
                  classname="tw:mr-2 tw:mb-2 tw:border-none"
                />
              </div>
            </div>

            <div>
              <Typography
                domtype="h7"
                classname="tw:font-semibold tw:mb-3 tw:block"
              >
                Facilities
              </Typography>

              <ul className="tw:list-inside tw:list-disc">
                <li>Free coffee</li>
                <li>Toilets</li>
                <li>Free parking</li>
              </ul>
            </div>

            <p>
              Booker memberships are given on a case-by-case basis. Contact us
              to see if you're eligible.
            </p>
          </div>
        </div>
      </div>

      <div className="tw:flex tw:justify-start tw:rounded-[20px] tw:bg-white tw:p-6 tw:px-5 tw:py-6 tw:lg:p-10">
        <Button
          iconleft={<Icons.arrowLeft />}
          variant="secondary"
          label="Previous: Choose your branch"
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
