import { h, Fragment } from 'preact';
import { cn, useMediaQuery } from '../../../utils/helpers';
import Icons from '../Icons/Icons';
import Tag from '../Tag/Tag';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';

/**
 * AllocationsCard Component
 * @description A card component that displays allocation information including status, dates, product images, and actions
 * @param {Object} props - Component props
 * @param {string} [props.classname] - Additional CSS classes
 * @param {string} [props.title=''] - The allocation title
 * @param {string} [props.subtitle=''] - Subtitle text
 * @param {string} [props.status=''] - Status of the allocation
 * @param {string} [props.statusvariant='secondary'] - Status tag variant
 * @param {Object} [props.buyindate] - Buy-in date information
 * @param {string} [props.buyindate.label=''] - Buy-in date label
 * @param {string} [props.buyindate.value=''] - Buy-in date value
 * @param {Object} [props.instoredate] - In-store date information
 * @param {string} [props.instoredate.label=''] - In-store date label
 * @param {string} [props.instoredate.value=''] - In-store date value
 * @param {Array} [props.productimages=[]] - Array of product image URLs
 * @param {Function} [props.onbuttonclick] - Callback function for button click
 * @param {boolean} [props.disabled=false] - Whether the card is disabled
 * @param {boolean} [props.isclosed=false] - Whether the allocation is closed
 * @returns {JSX.Element} The AllocationsCard component
 */
const AllocationsCard = ({
  classname,
  title = '',
  subtitle = '',
  status = '',
  statusvariant = 'secondary',
  buyindate = {
    label: '',
    value: '',
  },
  instoredate = {
    label: '',
    value: '',
  },
  productimages = [],
  onbuttonclick,
  disabled = false,
  isclosed = false,
  ...props
}) => {
  const isMobile = useMediaQuery('(max-width: 1023px)');

  return (
    <div
      className={cn(
        'tw:relative tw:overflow-hidden tw:rounded-[20px] tw:bg-white tw:shadow-[16px_32px_56px_-24px_rgba(0,0,0,0.1)]',
        classname,
      )}
      {...props}
    >
      <div className="tw:relative tw:flex tw:h-full tw:w-full tw:flex-row tw:items-center">
        <div
          className={cn(
            'tw:relative tw:flex tw:h-full tw:w-full tw:items-center tw:justify-between',
            isMobile
              ? 'tw:flex-col-reverse tw:gap-8 tw:p-5'
              : 'tw:flex-row-reverse tw:p-8',
          )}
        >
          {/* Information Section */}
          <div
            className={cn(
              'tw:flex tw:flex-1 tw:shrink-0 tw:flex-col tw:items-start tw:justify-start tw:gap-4',
              isMobile ? 'tw:order-2 tw:w-full' : 'tw:order-2',
            )}
          >
            {/* Status Tag */}
            <div className="tw:relative tw:flex tw:shrink-0 tw:flex-row tw:items-start tw:justify-start">
              <Tag label={status} variant={statusvariant} size="small" />
            </div>

            {/* Title and Subtitle */}
            <div className="tw:flex tw:w-full tw:flex-col tw:items-start tw:justify-start tw:gap-2">
              <Typography
                domtype="h5"
                classname="tw:text-5xl tw:font-medium tw:leading-[1.2]"
              >
                {title}
              </Typography>
              <Typography classname="tw:text-lg tw:font-normal tw:leading-[1.4]">
                {subtitle}
              </Typography>
            </div>

            {/* Dates Section */}
            <div
              className={cn(
                'tw:flex tw:w-full tw:flex-row tw:items-start tw:justify-start',
                isMobile ? 'tw:gap-4' : 'tw:gap-8',
              )}
            >
              {isclosed ? (
                /* Closed Date */
                <div className="tw:flex tw:flex-col tw:items-start tw:justify-start tw:gap-1">
                  <div className="tw:flex tw:flex-row tw:items-center tw:justify-start tw:gap-1">
                    <Icons.lock
                      classname="tw:w-4 tw:h-4 tw:shrink-0"
                      stroke="#000000"
                      fill="none"
                    />
                    <p className="tw:m-0 tw:text-lg tw:leading-[1.4] tw:font-normal">
                      Closed
                    </p>
                  </div>
                  <p className="tw:m-0 tw:text-xl tw:leading-[1.2] tw:font-medium tw:text-grey-600">
                    {buyindate.value}
                  </p>
                </div>
              ) : (
                <Fragment>
                  {/* Buy-in Date */}
                  <div className="tw:flex tw:flex-1 tw:flex-col tw:items-start tw:justify-start tw:gap-1">
                    <p className="tw:m-0 tw:text-lg tw:leading-[1.4] tw:font-normal tw:text-grey-600">
                      {buyindate.label}
                    </p>
                    <p className="tw:m-0 tw:text-xl tw:leading-[1.2] tw:font-medium">
                      {buyindate.value}
                    </p>
                  </div>

                  {/* In-store Date */}
                  <div className="tw:flex tw:flex-1 tw:flex-col tw:items-start tw:justify-start tw:gap-1">
                    <p className="tw:m-0 tw:text-lg tw:leading-[1.4] tw:font-normal tw:text-grey-600">
                      {instoredate.label}
                    </p>
                    <p className="tw:m-0 tw:text-xl tw:leading-[1.2] tw:font-medium">
                      {instoredate.value}
                    </p>
                  </div>
                </Fragment>
              )}
            </div>
          </div>

          {/* Products and Button Section */}
          <div
            className={cn(
              'tw:flex tw:flex-row tw:items-center tw:justify-start',
              isMobile
                ? 'tw:order-1 tw:w-full tw:justify-between'
                : 'tw:order-1 tw:gap-10',
            )}
          >
            {/* Product Images Rail */}
            <div className="tw:relative tw:flex tw:flex-row tw:items-center tw:justify-start tw:gap-2">
              {productimages.slice(0, isMobile ? 4 : 6).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index + 1}`}
                  className={cn(
                    'tw:rounded-lg tw:object-cover',
                    isMobile
                      ? 'tw:h-14 tw:w-14'
                      : 'tw:h-auto tw:max-h-[100px] tw:w-auto tw:max-w-[100px]',
                  )}
                />
              ))}
            </div>

            {/* Action Button */}
            <div className="tw:relative tw:flex tw:flex-row tw:items-start tw:justify-start">
              <Button
                onClick={onbuttonclick}
                state={disabled ? 'disabled' : 'enabled'}
                variant="tertiary"
                size="default"
                iconright={
                  <Icons.chevronRight
                    classname="tw:w-4 tw:h-4 tw:shrink-0"
                    stroke="#ffffff"
                    fill="none"
                  />
                }
                classname="tw:h-12 tw:w-12"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocationsCard;
