import { h, Fragment } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import { cn, useMediaQuery } from '../../../utils/helpers';
import { ProductPricing } from '../Product';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';
import Typography from '../Typography/Typography';

/**
 * ProductCardPresell Component
 * @description A product card component designed for pre-sell functionality with configurable drop buttons that support quantity controls
 * @param {Object} props - Component props
 * @param {string} [props.classname] - Additional CSS classes
 * @param {string} props.name - Product name
 * @param {string} props.image - Product image URL
 * @param {string} props.id - Product ID
 * @param {string} props.caseinfo - Case information (e.g., "Case of 4 x 2L")
 * @param {string} props.presellinfo - Pre-sell information (e.g., "Pre-order only")
 * @param {string} props.additionalinfo - Additional product information (e.g., "WIGIG Make 45.7% POR")
 * @param {string} props.ordergroup - Order group (e.g., "Groceries")
 * @param {string} props.price - Main price (e.g., "£5.49")
 * @param {string} props.pricewithvat - Price with VAT (e.g., "£51.99 incl VAT")
 * @param {string} props.priceperunit - Price per unit
 * @param {Object} props.pricerpp - Recommended retail price object with value
 * @param {Object} props.pricepor - Price per order object with value
 * @param {Array} props.drops - Array of drop objects with id, label, date, quantity, and enabled status
 * @param {boolean} [props.ordereddisabled] - When true, shows drops as "Ordered" with quantities and disables all interactions
 * @param {function} props.onaddtodrop - Callback when adding/updating quantity for a specific drop (dropId, quantity)
 * @param {function} [props.onswiperinstance] - Callback when swiper instance is ready (swiper)
 * @param {function} [props.onsliderchange] - Callback when slider position changes (activeIndex)
 * @returns {JSX.Element} The ProductCardPresell component
 */
const ProductCardPresell = ({
  classname,
  name,
  image,
  id,
  caseinfo,
  presellinfo = 'Pre-order only',
  additionalinfo,
  ordergroup,
  price,
  pricewithvat,
  priceperunit,
  pricerpp,
  pricepor,
  drops = [],
  ordereddisabled = false,
  onaddtodrop = () => {},
  onswiperinstance = () => {},
  onsliderchange = () => {},
  ...props
}) => {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const [dropStates, setDropStates] = useState({});
  const swiperRef = useRef(null);

  // Initialize drop states
  useEffect(() => {
    const initialStates = {};
    drops.forEach((drop) => {
      initialStates[drop.id] = {
        quantity: drop.quantity || 0,
        ordered: drop.ordered || false,
      };
    });
    setDropStates(initialStates);
  }, [drops]);

  // Handle swiper instance callback based on screen size
  useEffect(() => {
    if (isMobile) {
      // For mobile, we don't have a swiper, so we pass null
      onswiperinstance(null);
    }
    // For desktop, the swiper instance will be passed via the onSwiper callback in the Swiper component
  }, [isMobile, onswiperinstance]);

  const handleAddToDrop = (dropId, quantity = 1) => {
    setDropStates((prev) => ({
      ...prev,
      [dropId]: {
        ...prev[dropId],
        quantity: quantity,
        ordered: quantity > 0,
      },
    }));
    onaddtodrop(dropId, quantity);
  };

  // Validate and set quantity for a specific drop
  const updateDropQuantity = (dropId, value) => {
    const numValue = parseInt(value, 10);

    if (isNaN(numValue)) {
      setDropStates((prev) => ({
        ...prev,
        [dropId]: {
          ...prev[dropId],
          quantity: 0,
          ordered: false,
        },
      }));
      onaddtodrop(dropId, 0);
      return;
    }

    const limitedValue = Math.max(0, numValue);
    setDropStates((prev) => ({
      ...prev,
      [dropId]: {
        ...prev[dropId],
        quantity: limitedValue,
        ordered: limitedValue > 0,
      },
    }));
    onaddtodrop(dropId, limitedValue);
  };

  const renderDropButton = (drop) => {
    const dropState = dropStates[drop.id] || { quantity: 0, ordered: false };
    const isEnabled = drop.enabled !== false && !ordereddisabled;

    // When in ordered disabled mode, show "Ordered" with quantity if quantity > 0
    if (ordereddisabled && dropState.quantity > 0) {
      return (
        <div
          key={drop.id}
          className={cn(
            'tw:relative tw:flex tw:w-full tw:shrink-0 tw:flex-row tw:items-center tw:justify-center tw:p-0',
            isMobile ? 'tw:h-[38px]' : 'tw:h-[38px] tw:w-[140px]',
          )}
        >
          <div
            className={cn(
              'tw:flex tw:h-full tw:w-full tw:items-center tw:justify-between tw:rounded-[120px] tw:bg-beige-1000 tw:px-4 tw:py-2 tw:text-black',
            )}
          >
            <span className="tw:text-sm tw:font-medium">Ordered</span>
            <span className="tw:text-sm tw:font-medium">
              {dropState.quantity}
            </span>
          </div>
        </div>
      );
    }

    // When in ordered disabled mode and quantity is 0, show disabled empty state
    if (ordereddisabled) {
      return (
        <div
          key={drop.id}
          className={cn(
            'tw:relative tw:flex tw:shrink-0 tw:flex-row tw:items-center tw:justify-center tw:p-0',
            isMobile ? 'tw:h-[38px] tw:w-full' : 'tw:h-[38px] tw:w-[140px]',
          )}
        >
          <div
            className={cn(
              'tw:flex tw:h-full tw:w-full tw:items-center tw:justify-between tw:rounded-[120px] tw:bg-secondary-1100 tw:px-3 tw:py-2 tw:text-black',
            )}
          ></div>
        </div>
      );
    }

    if (dropState.quantity > 0 && isEnabled) {
      return (
        <div
          key={drop.id}
          className={cn(
            'tw:relative tw:flex tw:shrink-0 tw:flex-row tw:items-start tw:justify-start tw:p-0',
            isMobile ? 'tw:h-[38px] tw:w-full' : 'tw:w-[140px]',
          )}
        >
          <form className="tw:w-full">
            <div className="tw:flex tw:h-[38px] tw:w-full tw:overflow-hidden tw:rounded-[120px] tw:border tw:border-black-1000">
              <Button
                type="button"
                iconleft={() => (
                  <Icons.minus
                    classname="tw:w-4 tw:h-4"
                    stroke="currentColor"
                  />
                )}
                variant="tertiary"
                disabled={!isEnabled || dropState.quantity === 0}
                onclick={() =>
                  updateDropQuantity(drop.id, dropState.quantity - 1)
                }
                classname="tw:border-0 tw:rounded-full tw:h-full tw:w-[38px] tw:min-w-[38px] tw:px-2 tw:py-2"
              />
              <input
                type="number"
                value={dropState.quantity}
                className="tw:h-full tw:w-full tw:min-w-0 tw:[appearance:textfield] tw:border-none tw:bg-white tw:text-center tw:text-sm tw:outline-none tw:[&::-webkit-inner-spin-button]:appearance-none tw:[&::-webkit-outer-spin-button]:appearance-none"
                onChange={(e) => {
                  if (!isEnabled) return;
                  const value = parseInt(e.target.value, 10);
                  if (!isNaN(value)) {
                    updateDropQuantity(drop.id, value);
                  } else if (e.target.value === '') {
                    updateDropQuantity(drop.id, 0);
                  }
                }}
                min="0"
              />
              <Button
                type="button"
                iconleft={() => (
                  <Icons.plus classname="tw:w-4 tw:h-4" stroke="currentColor" />
                )}
                variant="tertiary"
                onclick={() =>
                  updateDropQuantity(drop.id, dropState.quantity + 1)
                }
                classname="tw:border-0 tw:rounded-full tw:h-full tw:w-[38px] tw:min-w-[38px] tw:px-2 tw:py-2"
              />
            </div>
          </form>
        </div>
      );
    }

    // Desktop rendering for empty state
    return (
      <div
        key={drop.id}
        className={cn(
          'tw:relative tw:flex tw:shrink-0 tw:flex-row tw:items-start tw:justify-start tw:p-0',
          isMobile ? 'tw:h-[38px] tw:w-full' : 'tw:w-full tw:min-w-[140px]',
        )}
      >
        <Button
          variant="tertiary"
          size="small"
          label="Add"
          iconleft={() => (
            <Icons.plus classname="tw:w-3 tw:h-3" stroke="currentColor" />
          )}
          onclick={() => handleAddToDrop(drop.id, 1)}
          state={isEnabled ? 'enabled' : 'disabled'}
          classname={cn(
            'tw:grow  tw:w-full ',
            isEnabled ? '' : 'tw:cursor-not-allowed tw:bg-secondary-1000',
          )}
        />
      </div>
    );
  };

  if (isMobile) {
    return (
      <div
        className={cn(
          'tw:relative tw:shrink-0 tw:rounded-[20px] tw:bg-white tw:shadow-[16px_32px_56px_-24px_rgba(0,0,0,0.1)]',
          classname,
        )}
        {...props}
      >
        <div className="tw:relative tw:flex tw:flex-col-reverse tw:items-start tw:justify-start tw:overflow-clip tw:px-0 tw:pt-0 tw:pb-12">
          {/* Product Information Section */}
          <div className="tw:relative tw:order-2 tw:mb-[-48px] tw:flex tw:w-full tw:shrink-0 tw:flex-col tw:items-start tw:justify-start tw:gap-4 tw:rounded-[20px] tw:bg-white tw:p-4">
            <div className="tw:pointer-events-none tw:absolute tw:inset-0 tw:rounded-[20px] tw:border-[1.5px] tw:border-solid tw:border-white" />

            {/* Product Details */}
            <div className="tw:relative tw:flex tw:w-full tw:shrink-0 tw:flex-row tw:items-start tw:justify-start tw:gap-3 tw:p-0">
              <div className="tw:relative tw:flex tw:shrink-0 tw:grow tw:basis-0 tw:flex-row tw:items-start tw:justify-start tw:gap-3 tw:p-0">
                {/* Product Image */}
                <div className="tw:relative tw:flex tw:shrink-0 tw:flex-row tw:items-center tw:justify-center tw:gap-2 tw:px-0 tw:pt-3 tw:pb-0">
                  <div className="tw:relative tw:inline-grid tw:shrink-0 tw:grid-cols-[max-content] tw:grid-rows-[max-content] tw:place-items-start tw:leading-[0]">
                    <div
                      className="tw:mt-0 tw:ml-0 tw:size-[118px] tw:bg-contain tw:bg-center tw:bg-no-repeat tw:[grid-area:1_/_1]"
                      style={{ backgroundImage: `url('${image}')` }}
                    />
                  </div>
                </div>

                {/* Product Information */}
                <div className="tw:relative tw:flex tw:shrink-0 tw:grow tw:basis-0 tw:flex-col tw:items-start tw:justify-start tw:gap-2 tw:p-0">
                  {/* Product Name */}
                  <Typography
                    domtype="h7"
                    className="tw:line-clamp-2 tw:text-lg tw:leading-[1.2] tw:font-medium tw:text-black-800"
                  >
                    {name}
                  </Typography>

                  {/* Product Details */}
                  <div className="tw:flex tw:flex-col tw:gap-1">
                    {caseinfo && (
                      <p className="tw:text-sm tw:text-grey-600 tw:lg:text-base">
                        {caseinfo}
                      </p>
                    )}

                    {(presellinfo || additionalinfo) && (
                      <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-base tw:text-grey-600">
                        {presellinfo && <span>{presellinfo}</span>}
                        {presellinfo && additionalinfo && <span>·</span>}
                        {additionalinfo && <span>{additionalinfo}</span>}
                      </div>
                    )}

                    {ordergroup && (
                      <p className="tw:text-sm tw:text-grey-600 tw:lg:text-base">
                        Order group: {ordergroup}
                      </p>
                    )}
                  </div>

                  {/* Product ID */}
                  {id && (
                    <p className="tw:text-2xs tw:leading-none tw:font-bold tw:text-black">
                      {id}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Purchase Details */}
            <div className="tw:relative tw:flex tw:w-full tw:shrink-0 tw:flex-row tw:items-center tw:justify-end tw:gap-12 tw:px-0 tw:pt-4 tw:pb-0">
              <div className="tw:pointer-events-none tw:absolute tw:top-[-0.5px] tw:right-0 tw:bottom-0 tw:left-0 tw:border-t tw:border-dashed tw:border-secondary-1300" />
              <div className="tw:flex tw:shrink-0 tw:grow tw:basis-0 tw:flex-row tw:items-center tw:self-stretch">
                <div className="tw:relative tw:flex tw:h-full tw:shrink-0 tw:grow tw:basis-0 tw:flex-col tw:items-end tw:justify-start tw:gap-4 tw:p-0">
                  {/* Pricing */}
                  <ProductPricing
                    price={price}
                    pricewithvat={pricewithvat}
                    priceperunit={priceperunit}
                    pricerpp={pricerpp}
                    pricepor={pricepor}
                    className="tw:space-x-8 tw:*:data-[position=left]:items-start"
                  />
                  {/* Drop Actions */}
                  <div className="tw:flex tw:w-full tw:flex-row tw:gap-8">
                    {/* Drop Labels */}
                    <div className="tw:flex tw:shrink-0 tw:flex-col tw:items-center tw:justify-center tw:gap-3 tw:p-0">
                      {drops.map((drop) => {
                        const isEnabled = drop.enabled !== false;
                        return (
                          <div
                            key={`label-${drop.id}`}
                            className="tw:flex tw:h-[38px] tw:w-full tw:shrink-0 tw:flex-row tw:items-center tw:gap-3"
                          >
                            <div
                              className={cn(
                                'tw:text-sm',
                                isEnabled
                                  ? 'tw:text-black'
                                  : 'tw:text-grey-600',
                              )}
                            >
                              {drop.label}
                            </div>
                            {drop.date && (
                              <div
                                className={cn(
                                  'tw:text-2xs',
                                  isEnabled
                                    ? 'tw:text-grey-600'
                                    : 'tw:text-grey-600',
                                )}
                              >
                                {drop.date}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Drop Buttons */}
                    <div className="tw:relative tw:flex tw:shrink-0 tw:grow tw:basis-0 tw:flex-col tw:items-start tw:justify-start tw:gap-3">
                      {drops.map((drop) => (
                        <div key={drop.id} className="tw:w-full">
                          {renderDropButton(drop)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop version
  return (
    <div
      className={cn(
        'tw:relative tw:flex tw:flex-col tw:rounded-[20px] tw:border-1 tw:border-transparent tw:bg-white tw:shadow-[16px_2px_30px_-14px_rgba(0,0,0,0.20)] tw:transition-all tw:duration-300 tw:hover:shadow-[16px_2px_30px_-14px_rgba(0,0,0,0.30)]',
        classname,
      )}
      {...props}
    >
      {/* Main Product Information */}
      <div className="tw:flex tw:items-center tw:justify-between tw:p-4">
        {/* Product Information Section */}
        <div className="tw:flex tw:items-center tw:gap-4">
          {/* Product Image */}
          <div className="tw:flex tw:shrink-0">
            <img
              src={image}
              alt={name}
              className="tw:h-[118px] tw:w-[118px] tw:rounded-lg tw:object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-4">
            {/* Product Name */}
            <Typography
              domtype="h7"
              className="tw:line-clamp-2 tw:text-xl tw:leading-[1.2] tw:font-medium tw:text-grey-800"
            >
              {name}
            </Typography>

            {/* Product Information */}
            <div className="tw:flex tw:flex-col tw:gap-1">
              {caseinfo && (
                <p className="tw:text-sm tw:text-grey-600 tw:lg:text-base">
                  {caseinfo}
                </p>
              )}

              {(presellinfo || additionalinfo) && (
                <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-base tw:text-grey-600">
                  {presellinfo && <span>{presellinfo}</span>}
                  {presellinfo && additionalinfo && <span>·</span>}
                  {additionalinfo && <span>{additionalinfo}</span>}
                </div>
              )}
            </div>

            {/* Product ID */}
            {id && (
              <span className="tw:text-2xs tw:font-bold tw:text-black">
                {id}
              </span>
            )}
          </div>
        </div>

        {/* Desktop: Price Section */}
        <div className="tw:flex tw:min-w-[340px] tw:shrink-0 tw:flex-col tw:items-end tw:gap-6">
          <ProductPricing
            price={price}
            pricewithvat={pricewithvat}
            priceperunit={priceperunit}
            pricerpp={pricerpp}
            pricepor={pricepor}
            className="tw:w-[236px] tw:justify-end tw:space-x-8 tw:*:data-[position=left]:items-start"
          />
        </div>
      </div>

      {/* Drop Buttons Section */}
      <div className="tw:relative tw:flex tw:h-[70px] tw:w-full tw:shrink-0 tw:flex-row tw:items-start tw:justify-start tw:gap-3 tw:py-4">
        <div className="tw:pointer-events-none tw:absolute tw:top-[-0.5px] tw:right-0 tw:bottom-0 tw:left-0 tw:border-t tw:border-dashed tw:border-secondary-1300" />
        <div className="tw:relative tw:flex tw:shrink-0 tw:grow tw:basis-0 tw:flex-row tw:items-center tw:justify-start tw:gap-3 tw:overflow-hidden tw:p-0">
          <Swiper
            ref={swiperRef}
            spaceBetween={12}
            slidesPerView="auto"
            freeMode={true}
            slidesOffsetBefore={20}
            slidesOffsetAfter={20}
            modules={[Navigation, FreeMode]}
            onSlideChange={(swiper) => {
              onsliderchange(swiper.activeIndex);
            }}
            onSwiper={(swiper) => {
              onswiperinstance(swiper);
            }}
            className="tw:h-full tw:w-full"
            breakpoints={{
              1024: {
                slidesPerView: 5.5,
                spaceBetween: 12,
              },
            }}
          >
            {drops.map((drop) => (
              <SwiperSlide key={drop.id} className="tw:shrink-0">
                {renderDropButton(drop)}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProductCardPresell;
