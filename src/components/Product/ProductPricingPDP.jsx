import { h, Fragment } from 'preact';
import Typography from '../Typography/Typography';
import { cn } from '../../../utils/helpers';
import Icons from '../Icons/Icons';

/**
 * Product Pricing PDP
 *
 * @description The Product Pricing PDP component renders the product pricing information specifically for PDP pages.
 *
 * @param {Object} props - Component props
 * @param {string} props.price - Main price of the product
 * @param {string} props.pricewithvat - Price of the product with VAT
 * @param {string} props.priceperitem - Price per item
 * @param {string} props.pricerpp - Recommended retail price
 * @param {string} props.pricepor - Price POR
 * @param {string} props.classname - Additional classes
 *
 * @returns {JSX.Element} The rendered ProductPricingPDP component
 */
export const ProductPricingPDP = ({
  price,
  pricewithvat,
  priceperitem,
  pricerpp,
  pricepor,
  midascode,
  classname,
}) => {
  return (
    <div
      className={cn(
        'tw:flex tw:gap-0 tw:rounded-lg tw:bg-secondary-1000 tw:px-3 tw:py-4 tw:max-lg:justify-between tw:md:flex-wrap tw:md:px-3 tw:md:py-6 tw:lg:items-center tw:lg:gap-6',
        classname,
      )}
    >
      <span className="tw:px-0 tw:text-3xl tw:font-semibold tw:lg:px-4 tw:lg:text-6xl">
        {price}
      </span>

      <div className="tw:space-y-3 tw:lg:flex tw:lg:flex-wrap tw:lg:items-start tw:lg:gap-y-4">
        <div className="tw:flex tw:items-center tw:gap-y-4 tw:lg:items-start">
          {/* price with vat */}
          <div className="tw:flex tw:flex-col tw:px-0 tw:max-lg:gap-1 tw:md:px-4 tw:lg:gap-2">
            <Typography domtype="h7">{pricewithvat}</Typography>
            <p className="tw:text-sm tw:font-light tw:lg:text-base">
              incl 20% VAT
            </p>
          </div>

          {/* price per item - desktop */}
          <div className="tw:hidden tw:flex-col tw:items-center tw:px-0 tw:text-sm tw:max-lg:gap-1 tw:md:px-4 tw:md:text-base tw:lg:flex tw:lg:gap-2">
            <Typography domtype="h7">{priceperitem}</Typography>
            <p className="tw:text-sm tw:font-light tw:lg:text-base">per item</p>
          </div>
        </div>

        {/* RPP and POR */}
        <div className="tw:flex tw:flex-col tw:items-start tw:gap-2 tw:border-dotted tw:border-secondary-1300 tw:pl-4 tw:text-sm tw:max-md:border-t tw:max-md:pt-3 tw:max-sm:pl-0 tw:sm:border-l tw:md:text-base tw:xl:pl-10">
          {pricerpp && (
            <Typography classname="tw:flex tw:items-center tw:gap-1">
              {pricerpp.value} RPP{' '}
              {pricerpp.locked && <Icons.lock classname="tw:w-3 tw:h-3" />}
            </Typography>
          )}
          {pricepor && (
            <Typography classname="tw:flex tw:items-center tw:gap-1">
              {pricepor.value} POR{' '}
              {pricepor.locked && <Icons.lock classname="tw:w-3 tw:h-3" />}
            </Typography>
          )}
          {midascode && (
            <Typography classname="tw:flex tw:items-center tw:gap-1">
              Midas code: {midascode}
            </Typography>
          )}
        </div>
      </div>

      {/* price per item - mobile */}
      <div className="tw:flex tw:flex-col tw:items-start tw:gap-1 tw:px-0 tw:text-sm tw:md:px-4 tw:md:text-base tw:lg:hidden">
        <Typography domtype="h7">{priceperitem}</Typography>
        <p className="tw:text-sm tw:font-light">per item</p>
      </div>
    </div>
  );
};
