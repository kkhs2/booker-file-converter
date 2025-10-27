import { h, Fragment } from 'preact';
import { cn, useMediaQuery } from '../../../utils/helpers';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';

/**
 * VoucherCard Component
 *
 *  @description A component that displays a voucher card with an image, title, expiration text, and buttons.
 *
 * @param {Object} props - Component props
 * @param {string} props.image - The background image for the card
 * @param {string} props.title - The title of the voucher
 * @param {string} props.expirationtext - The expiration text for the voucher
 * @param {boolean} props.expiressoon - Flag indicating if the voucher expires soon
 * @param {function} props.icon - A function that returns an icon component
 * @param {string} props.termsurl - The URL for the terms and conditions
 * @param {string} props.productsurl - The URL for the products
 * @returns {JSX.Element} Preact component - The VoucherCard component
 */

const VoucherCard = ({
  image,
  title,
  expirationtext,
  expiressoon,
  icon,
  termsurl,
  productsurl,
}) => {
  // Add media query hook for responsive behavior
  const isMobile = useMediaQuery('(max-width: 1023px)');

  return (
    <div
      className="tw:flex tw:h-[232px] tw:flex-col tw:justify-end tw:rounded-[20px] tw:bg-no-repeat tw:p-2 tw:shadow-[16px_32px_56px_-24px_rgba(0,0,0,0.10)] tw:lg:h-[268px] tw:lg:p-3"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div
        className="tw:relative tw:flex tw:rounded-[20px] tw:bg-cover tw:bg-center tw:bg-no-repeat tw:px-4 tw:py-3 tw:lg:p-6"
        style={{
          backgroundImage: !isMobile
            ? `url('./images/voucher/ticket-bg-dt.png')`
            : `url('./images/voucher/ticket-bg-mb.png')`,
        }}
      >
        <div className="tw:flex tw:flex-col tw:justify-between tw:pr-4 tw:pl-2 tw:max-lg:pr-4 tw:max-lg:pl-3">
          <Typography
            content={title}
            domtype="h7"
            classname="tw:font-medium tw:leading-[120%]"
          />

          <div className="tw:flex tw:gap-2 tw:max-lg:flex-col-reverse">
            <Button
              label="Terms"
              href={termsurl}
              variant="secondary"
              size="small"
              classname="tw:px-2"
            />
            <Button
              label="View products"
              href={productsurl}
              variant="tertiary"
              size="small"
              classname="tw:px-2"
            />
          </div>
        </div>

        <div className="tw:flex tw:flex-col tw:items-center tw:border-l-2 tw:border-dotted tw:border-secondary-1300 tw:px-3 tw:lg:pl-6">
          {icon && icon()}

          <p
            className={cn(
              'tw:mt-8 tw:min-w-[65px] tw:text-center tw:text-base tw:!leading-[17px]',
              expiressoon && 'tw:font-bold tw:text-primary',
            )}
          >
            {expirationtext}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoucherCard;
