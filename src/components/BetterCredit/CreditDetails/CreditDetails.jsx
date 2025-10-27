/**
 * CreditDetails component displays credit and debit status, credit terms, and direct debit information.
 *
 * @param {Object} props - The properties object.
 * @param {'active'|'inactive'} [props.creditstatus='active'] - The status of the credit (active or inactive).
 * @param {'active'|'inactive'} [props.debitstatus='active'] - The status of the debit (active or inactive).
 * @param {string} [props.creditcard] - The credit card information to display.
 * @param {string} [props.creditcardhref='javascript:void(0)'] - The hyperlink reference for the credit card section.
 * @param {number} [props.daysrollingextended=14] - The number of days for rolling extended credit terms.
 *
 * @returns {JSX.Element} The rendered CreditDetails component.
 */

import { h, Fragment } from 'preact';
import Icons from '../../Icons/Icons';
import { cn } from '../../../../utils/helpers';
import { _capitalize } from 'chart.js/helpers';

export const CreditDetails = ({
  creditstatus = 'active',
  debitstatus = 'active',
  creditcard,
  creditcardhref = 'javascript:void(0)',
  daysrollingextended = 14,
}) => {
  const statusCard = (status) => {
    return (
      <div
        className={cn(
          'tw:flex tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-white',
          status === 'active' ? 'tw:bg-green-500' : 'tw:bg-red-500',
        )}
      >
        {status === 'active' ? (
          <Icons.checkCircle classname="tw:w-4 tw:h-4" />
        ) : (
          <Icons.alertCircle classname="tw:w-4 tw:h-4" />
        )}
        <span className="tw:text-base tw:font-semibold">
          {_capitalize(status)}
        </span>
      </div>
    );
  };

  return (
    <div className="tw:flex tw:flex-wrap tw:items-stretch tw:justify-between tw:gap-4 tw:rounded-xl tw:bg-secondary-1000 tw:p-3 tw:max-lg:mx-5 tw:[@media(max-width:1375px)]:flex-col tw:[@media(max-width:1375px)]:items-stretch">
      {/* Credit status */}
      <div
        className={cn(
          'tw:flex tw:items-center tw:justify-between tw:rounded-lg tw:bg-white tw:p-3 tw:[@media(min-width:1560px)]:min-w-md',
          creditstatus !== 'active' && 'tw:bg-red-100 tw:text-red-700',
        )}
      >
        <div className="tw:flex tw:items-center tw:gap-3">
          <Icons.user classname="tw:w-5 tw:h-5 tw:shrink-0" />
          <p className="tw:mr-8 tw:whitespace-nowrap">Credit Status</p>
        </div>

        {statusCard(creditstatus)}
      </div>

      {/* Credit terms */}
      <div className="tw:flex tw:flex-1 tw:items-center tw:justify-between tw:rounded-lg tw:bg-white tw:px-3 tw:py-3">
        <div className="tw:flex tw:items-center tw:gap-3">
          <Icons.file classname="tw:w-5 tw:h-5 tw:shrink-0" />
          <p className="tw:whitespace-nowrap">Credit Terms</p>
        </div>
        <p className="tw:mx-4">·</p>
        <p className="tw:max-lg:text-right">
          {daysrollingextended} days Rolling Extended
        </p>
      </div>

      {/* Direct Debit */}
      <a
        href={creditcardhref}
        className={cn(
          'tw tw:flex tw:flex-1 tw:items-center tw:justify-between tw:gap-5 tw:rounded-lg tw:bg-white tw:p-3 tw:transition-colors tw:hover:bg-black/5 tw:xl:min-w-[280px] tw:xl:flex-[0_1_auto]',
          debitstatus !== 'active' && 'tw:text-red-700',
        )}
      >
        <div className="tw:flex tw:items-center tw:gap-3">
          <Icons.creditCard classname="tw:w-5 tw:h-5 tw:shrink-0" />
          <p className="tw:whitespace-nowrap tw:underline tw:decoration-dotted tw:underline-offset-5">
            Direct Debit
          </p>
          <Icons.arrowLeft classname="tw:h-5 tw:w-5 tw:rotate-[135deg]" />
        </div>

        <p className="tw:shrink-0 tw:text-base tw:max-lg:hidden">
          {creditcard}
        </p>

        {statusCard(debitstatus)}
      </a>
    </div>
  );
};

export default CreditDetails;
