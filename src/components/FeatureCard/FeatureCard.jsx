import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';

/**
 * Feature Card Component
 *
 * @description A component that displays a feature card with an image, title, tag, and CTA button
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Title of the feature
 * @param {string} props.subtitle - Subtitle of the feature
 * @param {string} props.description - Description of the feature
 * @param {string} props.image - Image source for the feature
 * @param {string} props.viewmode - View mode of the feature card, can be 'list' or 'grid'
 * @param {'small' | 'large' | 'responsive'} props.size - Size of the feature card. Default is 'small'
 * @param {string} props.tag - Tag to display on the feature card
 * @param {string} props.cta - Call-to-action text
 * @param {boolean} props.ctahidden - Whether to hide the CTA button
 * @param {string} props.href - URL for the CTA button
 * @param {Function} props.onclick - Optional click handler for the card
 * @param {boolean} props.border - Whether to show a border around the feature card
 * @param {boolean} props.shadow - Whether to show a shadow around the feature card
 * @param {boolean} props.borderinside - Whether to show a border inside the feature card
 * @param {string} props.publisheddate - Published date of the feature
 * @param {"primary" | "secondary" | "primary-inverse" | "secondary-inverse" | "feature-product"} props.variant - Variant of the CTA button
 * @param {string} props.classname - Additional classes to add to the component
 * @returns {JSX.Element} - The Feature card component
 */

const FeatureCard = ({
  title,
  subtitle,
  description,
  image,
  size = 'small',
  variant = 'primary',
  viewmode = 'grid',
  tag,
  cta,
  ctahidden = false,
  href,
  border = false,
  borderinside = false,
  shadow = false,
  onclick,
  classname,
  publisheddate,
  ...props
}) => {
  const buttonVariant =
    variant === 'primary' || variant === 'secondary' ? 'inverse' : 'tertiary';

  return (
    <div
      className={cn(
        'tw:relative tw:flex tw:flex-col tw:justify-between tw:overflow-hidden tw:rounded-xl',
        classname,
        size === 'small' && 'tw:min-h-[370px]',
        size === 'large' && 'tw:min-h-[490px]',
        size === 'responsive' && 'tw:h-full tw:w-full',
        size === 'responsive' &&
          viewmode === 'list' &&
          'tw:max-h-[260px] tw:flex-row tw:gap-4 tw:overflow-hidden',
        variant === 'primary' && 'tw:bg-primary-500',
        variant === 'primary-inverse' &&
          'tw:h-full tw:justify-start tw:bg-white',
        variant === 'primary-inverse' &&
          size === 'responsive' &&
          'tw:justify-start',
        border && variant !== 'secondary' && 'tw:border',
        variant === 'feature-product' &&
          'tw:h-full tw:min-h-auto tw:flex-col-reverse tw:rounded-b-none tw:md:flex-col tw:md:rounded-b-xl',
        shadow && 'tw:shadow-[16px_32px_56px_-24px_rgba(0,0,0,0.10)]',
      )}
      onClick={onclick}
      role={onclick ? 'button' : undefined}
      tabIndex={onclick ? 0 : undefined}
      aria-label={onclick ? title : undefined}
      {...props}
    >
      {(variant === 'primary' ||
        variant === 'primary-inverse' ||
        variant === 'feature-product') && (
        <div
          className={cn(
            'tw:h-auto tw:w-full tw:px-2 tw:pt-2',
            size === 'small' && 'tw:h-[224px]',
            size === 'large' && 'tw:h-[320px]',
            size === 'responsive' &&
              viewmode === 'grid' &&
              'tw:h-[224px] tw:lg:h-full',
            size === 'responsive' &&
              viewmode === 'list' &&
              'tw:max-h-[260px] tw:w-auto tw:overflow-hidden',
            variant === 'feature-product' &&
              `${title ? 'tw:h-[156px]' : 'tw:h-[254px]'} tw:flex-shrink-0 tw:rounded-b-none tw:md:h-full tw:md:flex-1 tw:md:rounded-b-xl tw:md:pb-2`,
          )}
        >
          <img
            src={image}
            alt={title}
            className="tw:h-full tw:w-full tw:overflow-hidden tw:rounded-t-xl tw:rounded-b-none tw:object-cover tw:md:rounded-xl"
          />
        </div>
      )}

      {(variant === 'secondary' || variant === 'secondary-inverse') && (
        <>
          <img
            src={image}
            alt={title}
            className="tw:absolute tw:z-0 tw:h-full tw:w-full tw:rounded-xl tw:object-cover"
          />
          <div />
        </>
      )}

      {variant === 'secondary' && (
        <>
          <div className="tw-inset-x-0 tw-bottom-0 tw-h-1/2 tw-feature-card-gradient tw:pointer-events-none tw:absolute tw:h-full tw:w-full"></div>

          {/* inside border */}
          {borderinside && (
            <div
              className={cn(
                'tw:z-10 tw:mx-2 tw:mt-2 tw:h-auto tw:rounded-[20px] tw:border tw:object-cover',
                size === 'small' && 'tw:h-[224px]',
                size === 'large' && 'tw:h-[320px]',
                size === 'responsive' && 'tw:h-[216px] tw:lg:h-[312px]',
              )}
              aria-hidden="true"
            ></div>
          )}
        </>
      )}
      <div
        className={cn(
          'tw:relative tw:z-10 tw:p-4 tw:pt-3 tw:lg:pt-4 tw:lg:pb-6',
          variant === 'secondary-inverse' &&
            'tw:m-2 tw:rounded-[20px] tw:bg-white tw:p-4',
          variant === 'feature-product' && 'tw:px-4 tw:pb-2 tw:lg:pb-6',
          !title && !description && !tag && ctahidden && 'tw:hidden',
          variant === 'primary-inverse' && 'tw:flex tw:h-full tw:flex-col',
        )}
      >
        <div className={cn(variant === 'primary-inverse' && 'tw:flex-1')}>
          {title && (
            <Typography
              domtype="h6"
              classname={cn(
                'tw:mb-3 tw:text-xl tw:lg:text-3xl tw:font-semibold',
                variant === 'primary' && 'tw:text-white',
                variant === 'secondary' && 'tw:text-white',
                variant === 'primary-inverse' && 'tw:text-black',
                variant === 'secondary-inverse' && 'tw:text-black',
                variant === 'feature-product' &&
                  'tw:text-black tw:mb-0 tw:pb-0',
              )}
              content={title}
            />
          )}

          {subtitle && (
            <Typography
              domtype="p"
              classname={cn(
                'tw:mb-3 tw:text-base tw:lg:text-lg tw:font-semibold',
                variant === 'primary' && 'tw:text-white',
                variant === 'secondary' && 'tw:text-white',
                variant === 'primary-inverse' && 'tw:text-black',
                variant === 'secondary-inverse' && 'tw:text-black',
                variant === 'feature-product' &&
                  'tw:text-black tw:mb-0 tw:pb-0',
              )}
              content={subtitle}
            />
          )}

          {description && (
            <Typography
              domtype="p"
              classname={cn(
                'tw:mb-3 tw:last:mb-0 tw:text-lg tw:leading-[140%]',
                variant === 'primary' && 'tw:text-white',
                variant === 'secondary' && 'tw:text-white',
                variant === 'primary-inverse' && 'tw:text-black',
                variant === 'secondary-inverse' && 'tw:text-black',
                variant === 'feature-product' &&
                  'tw:text-black tw:mb-0 tw:pb-0',
              )}
              content={description}
            />
          )}

          {tag && (typeof tag === 'function' ? tag() : tag)}

          {publisheddate && (
            <Typography
              domtype="p"
              classname={cn(
                'tw:mt-2 tw:text-[11px] tw:lg:text-sm',
                variant === 'primary' && 'tw:text-white',
                variant === 'secondary' && 'tw:text-white',
                variant === 'primary-inverse' && 'tw:text-black',
                variant === 'secondary-inverse' && 'tw:text-black',
                variant === 'feature-product' &&
                  'tw:text-black tw:mb-0 tw:pb-0',
              )}
            >
              Published:{' '}
              <span className="tw:font-semibold">{publisheddate}</span>
            </Typography>
          )}
        </div>

        {/* Call to Action Button */}
        {cta && !ctahidden && (
          <Button
            variant={buttonVariant}
            size="small"
            classname="tw:w-full tw:mt-6"
            href={href}
            label={cta}
          />
        )}
      </div>
    </div>
  );
};

export default FeatureCard;
