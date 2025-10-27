import { h, Fragment } from 'preact';
import Typography from '../Typography/Typography';
import Icons from '../Icons/Icons';
import Tag from '../Tag/Tag';
import Button from '../Button/Button';

/**
 * BranchConfirmation Component
 *
 * @description A component that displays a branch confirmation message with user information and local branch details.
 *
 * @param {boolean} withsubtitle - Flag to indicate if a subtitle should be displayed
 * @param {function} onsubmit - Function to call when the form is submitted
  
 * @returns {JSX.Element} Preact component - The BranchConfirmation component
 */

export const BranchConfirmation = ({ withsubtitle = true, onsubmit }) => {
  return (
    <div className="tw:space-y-6 tw:lg:space-y-8">
      <div className="tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:lg:p-10">
        <Typography domtype="h5" classname="tw:text-primary tw:mt-2">
          Registration complete
        </Typography>

        {withsubtitle && (
          <p className="tw:mt-4 tw:text-[13px] tw:lg:mt-6 tw:lg:text-lg">
            This account has been created and is active IN SAP. <br />
            <br /> Account details have been emailed to the customer for their
            information. If you have agreed to allow the customer to be able to
            place orders for delivery, please update their details in SAP.
          </p>
        )}
      </div>

      <div className="tw:rounded-[20px] tw:bg-white tw:p-3 tw:lg:p-4">
        <div className="tw:flex tw:w-full tw:items-center tw:gap-3 tw:rounded-[20px] tw:bg-primary tw:p-3 tw:text-balance tw:lg:gap-2 tw:lg:p-4">
          <Icons.checkCircle className="tw:h-5 tw:w-5 tw:shrink-0 tw:text-white" />
          <p className="tw:text-[13px] tw:text-white tw:lg:text-lg">
            Congratulations your Booker account is now fully activated.
          </p>
        </div>

        <div className="tw:mt-3 tw:flex tw:flex-col tw:items-stretch tw:gap-3 tw:space-y-3 tw:lg:flex-row tw:lg:space-y-0">
          <div className="tw:w-full tw:rounded-[20px] tw:bg-primary-50 tw:p-4 tw:lg:p-6">
            <Icons.userGraphic />

            <Typography
              domtype="h4"
              classname="tw:text-primary tw:my-4 tw:lg:mb-6"
            >
              Welcome to Booker, Maria
            </Typography>

            <div className="tw:rounded-[20px] tw:bg-white tw:p-4 tw:lg:px-6 tw:lg:py-4">
              <span>Your unique customer number</span>
              <p className="tw:mt-2 tw:text-2xl tw:lg:text-5xl">0990007877</p>
            </div>
          </div>

          <div className="tw:w-full tw:rounded-[20px] tw:bg-secondary-1000 tw:p-4 tw:lg:p-6">
            <p className="tw:mb-5 tw:text-lg tw:lg:text-xl">Your branch is:</p>
            <p className="tw:mb-1 tw:text-lg tw:font-bold tw:lg:text-xl">
              Booker St Pancras
            </p>
            <p className="tw:text-lg tw:leading-[140%]">
              106 Camley Street,
              <br />
              London, N1C 4PF
            </p>

            <p className="tw:mt-5 tw:mb-6 tw:inline-flex tw:w-full tw:items-center tw:text-black-900 tw:lg:mt-6 tw:lg:mb-4">
              <Icons.clock className="tw:mr-1 tw:inline-block tw:h-3 tw:w-3 tw:lg:h-4 tw:lg:w-4" />
              <span>Open until 5pm today</span>
            </p>

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

            <button className="tw:inline-flex tw:cursor-pointer tw:items-center tw:space-x-2 tw:transition-opacity tw:hover:opacity-80">
              <span>See details</span>
              <Icons.arrowLeft classname="tw:rotate-180" />
            </button>
          </div>
        </div>
      </div>

      <div className="tw:flex tw:w-full tw:flex-col tw:items-center tw:justify-end tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:lg:flex-row tw:lg:p-10">
        <Button
          variant="tertiary"
          label="Browse your branch"
          onclick={(e) => {
            e.preventDefault();
          }}
          classname="tw:border tw:border-transparent tw:max-md:w-full"
        />
      </div>
    </div>
  );
};
