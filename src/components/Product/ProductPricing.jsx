import { h, Fragment } from 'preact';
import { cn, formatCurrency } from '../../../utils/helpers';
import Icons from '../Icons/Icons';
/**
 * Product Pricing
 *
 * @description The Product Pricing component renders the product pricing information.
 *
 * @param {Object} props - Component props
 * @param {string} props.price - Price of the product
 * @param {string} props.pricewithvat - Price of the product with VAT
 * @param {string} props.priceperunit - Price per unit of the product
 * @param {string} props.pricerpp - Price RPP of the product
 * @param {string} props.pricepor - Price POR of the product
 *
 * @returns  {JSX.Element} - ProductPricing component
 */

function PriceItem({ data }) {
  return data ? (
    <span className="tw:flex tw:items-center tw:gap-1 tw:text-lg">
      {data.value} {data.locked && <Icons.lock />}
    </span>
  ) : null;
}

export const ProductPricing = ({
  price,
  pricewithvat,
  priceperunit,
  pricerpp,
  pricepor,
  ...props
}) => {
  return price && price !== '0' ? (
    <div
      className={cn('tw:flex tw:w-full tw:justify-between', props.className)}
    >
      <div
        className="tw:flex tw:flex-col tw:items-end tw:justify-end"
        data-position="left"
      >
        {pricerpp && <PriceItem data={pricerpp} />}
        {pricepor && <PriceItem data={pricepor} />}
        {priceperunit && <PriceItem data={priceperunit} />}
      </div>

      <div className="tw:flex tw:flex-col tw:items-end tw:justify-end">
        <p className="tw:text-right tw:text-3xl tw:font-semibold">
          {formatCurrency(price)}
        </p>
        <span className="tw:text-right tw:text-lg">
          {pricewithvat ? `${formatCurrency(pricewithvat)} incl VAT` : 'no VAT'}
        </span>
      </div>
    </div>
  ) : null;
};
