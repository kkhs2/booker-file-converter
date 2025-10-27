/**
 * PaymentUnsuccessful Component
 *
 * This component displays a message indicating that a payment was unsuccessful,
 * along with additional information and actions the user can take to resolve the issue.
 *
 * @param {Object} props - The component props.
 * @param {string} props.code - The error code associated with the payment failure.
 * @param {string} props.message - The error message providing details about the payment failure.
 *
 * @returns {JSX.Element} The rendered PaymentUnsuccessful component.
 */

import { h, Fragment } from 'preact';
import Button from '../../Button/Button';
import CalloutCard from '../../CalloutCard/CalloutCard';
import Icons from '../../Icons/Icons';
import PageHeading from '../../PageHeading/PageHeading';
import Typography from '../../Typography/Typography';

export const PaymentUnsuccessful = ({ code, message }) => {
  return (
    <div>
      <PageHeading
        title="Payment was unsuccessful"
        textcolor="black"
        classname="tw:!pb-0"
      />

      <div className="tw-container-full tw:mt-6 tw:px-5 tw:lg:px-16">
        <CalloutCard type="error">
          <strong>Code {code}:</strong> {message}
        </CalloutCard>

        <div className="tw:mt-8 tw:overflow-hidden tw:rounded-[20px] tw:bg-white tw:lg:mt-16">
          <div className="tw:flex tw:items-center tw:gap-4 tw:bg-red-1000 tw:px-10 tw:py-6 tw:text-white">
            <Icons.alertCircle classname="tw:lg:w-16 tw:lg:h-16 tw:w-12 tw:h-12 tw:shrink-0" />
            <Typography
              content="There was a problem with your payment"
              domtype="h5"
              classname="tw:font-medium"
            />
          </div>

          <div className="tw:space-y-6 tw:px-6 tw:pt-5 tw:pb-6 tw:lg:space-y-10 tw:lg:px-10 tw:lg:pt-8 tw:lg:pb-10">
            <div>
              <Typography
                content="Why has my payment failed?"
                domtype="h7"
                classname="tw:font-medium"
              />
              <p className="tw:mt-3 tw:lg:mt-4">
                There was not enough money available on the card to cover the
                total payment.
              </p>
            </div>

            <div>
              <Typography
                content="What can I do to resolve this?"
                domtype="h7"
                classname="tw:font-medium"
              />
              <p className="tw:mt-3 tw:lg:mt-4">
                Add sufficient funds to the payment card used, that will cover
                the total amount to pay.
              </p>
            </div>

            <div>
              <Typography
                content="Get in touch if you need further help"
                domtype="h7"
                classname="tw:font-medium"
              />
              <ul className="tw:mt-3 tw:list-disc tw:pl-5 tw:lg:mt-4">
                <li>
                  Call our Website Support Desk on{' '}
                  <strong>0345 602 3108</strong> (Lines are open 7am to 7 pm, 7
                  days a week)
                </li>
                <li>
                  Email us on <strong> upport@booker.co.uk</strong>
                </li>
                <li>Contact your local branch</li>
              </ul>
            </div>

            <div className="tw:border-b tw:border-dotted tw:border-black/20"></div>

            <div className="tw:flex tw:items-center tw:justify-end tw:gap-3 tw:max-lg:flex-col-reverse tw:max-lg:items-stretch">
              <Button
                label="Back to my account"
                variant="secondary"
                href="javscript:void(0)"
              />

              <Button
                label="Try to pay again"
                variant="tertiary"
                href="javscript:void(0)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
