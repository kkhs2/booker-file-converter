import { h, Fragment } from 'preact';
import Tag from '../Tag/Tag';
import Icons from '../Icons/Icons';
import { cn } from '../../../utils/helpers';

/**
 * Product Offer
 *
 * @description The Product Offer component renders the offer tag and discount details.
 *
 * @param {Object} props - Component props
 * @param {object} props.data - The offer data object.
 *  - label: The offer label.
 *  - date: The offer expiry date.
 *  - prevText: The previous price text.
 *  - discountText: The discount amount.
 *  - sublabel: The sublabel text.
 *  - variant: The variant of the tag (optional).
 *  - icon: The icon to display on the tag (optional).
 * @param {string} props.mode - The mode of the product card.
 *
 * @returns {JSX.Element} The rendered ProductOffer component.
 */

export const ProductOffer = ({ data, mode }) => (
  <div
    className={cn(
      'tw:mb-6 tw:space-y-3',
      mode === 'list' && 'tw:flex tw:flex-col tw:items-end',
      mode === 'grid' && 'tw:px-[2px]',
    )}
  >
    <Tag
      label={data.label}
      date={data.date}
      variant={data.variant || 'primary'}
      icon={data.icon || <Icons.tag />}
      size="small"
      classname="tw:gap-1"
    />

    {data.prevText && (
      <div className="tw:flex tw:items-center tw:gap-2 tw:px-[4px] tw:text-sm">
        <span>{data.prevText}</span>
        <span className="tw:font-semibold">{data.discountText}</span>
      </div>
    )}

    {data.sublabel && (
      <span
        className={cn(
          'tw:line-clamp-2 tw:w-full tw:max-w-[220px] tw:overflow-hidden tw:text-sm tw:underline tw:decoration-dotted tw:underline-offset-[2px]',
          mode === 'list' && 'tw:text-right',
          mode === 'grid' && 'tw:px-2',
        )}
      >
        {data.sublabel}
      </span>
    )}
  </div>
);
