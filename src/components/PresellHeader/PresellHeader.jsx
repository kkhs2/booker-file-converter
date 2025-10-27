import { h, Fragment } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import { cn, useMediaQuery } from '../../../utils/helpers';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';

/**
 * PresellHeader Component
 * @description A header component for presell functionality that displays a horizontal scrollable list of drops with navigation controls
 * @param {Object} props - Component props
 * @param {string} [props.classname] - Additional CSS classes
 * @param {Array} props.drops - Array of drop objects with id, label, date, additionalinfo, quantity, enabled, and selected status
 * @param {boolean} [props.showscrollcontrols=true] - Whether to show the navigation arrows and drop count
 * @param {function} [props.onswiperinstance] - Callback when swiper instance is ready (swiper)
 * @param {function} [props.onsliderchange] - Callback when slider position changes (activeIndex)
 * @returns {JSX.Element} The PresellHeader component
 */
const PresellHeader = ({
  classname,
  drops = [],
  showscrollcontrols = true,
  onswiperinstance = () => {},
  onsliderchange = () => {},
  ...props
}) => {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.swiper.isBeginning);
      setIsEnd(swiperRef.current.swiper.isEnd);
      onsliderchange(swiperRef.current.swiper.activeIndex);
    }
  };

  const goToPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const goToNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const renderDropItem = (drop) => {
    const isSelected = drop.selected || drop.quantity > 0;
    const isDisabled = drop.enabled === false;

    return (
      <div
        className={cn(
          'tw:relative tw:flex tw:h-[114px] tw:shrink-0 tw:flex-col tw:items-center tw:justify-between tw:rounded-xl tw:p-4 tw:transition-colors',
          isSelected ? 'tw:bg-beige-1000' : 'tw:bg-secondary-1000',
          isDisabled && 'tw:opacity-60',
        )}
      >
        {isSelected ? (
          <Fragment>
            {/* Drop details for selected/active drops */}
            <div className="tw:flex tw:flex-col tw:items-center tw:gap-1">
              <div className="tw:text-center tw:text-lg tw:font-medium">
                {drop.label}
              </div>
              {(drop.date || drop.additionalinfo) && (
                <div className="tw:flex tw:flex-col tw:items-center tw:gap-1 tw:text-center tw:text-sm tw:leading-none tw:text-grey-600">
                  {drop.date && <div>{drop.date}</div>}
                  {drop.additionalinfo && <div>{drop.additionalinfo}</div>}
                </div>
              )}
            </div>

            {/* Quantity display */}
            <div className="tw:text-center tw:text-base tw:font-medium">
              Qty: {drop.quantity || 0}
            </div>
          </Fragment>
        ) : (
          /* Drop name only for inactive/disabled drops */
          <div
            className={cn(
              'tw:text-center tw:text-lg tw:font-medium',
              isDisabled ? 'tw:text-grey-400' : 'tw:text-grey-400',
            )}
          >
            {drop.label}
          </div>
        )}
      </div>
    );
  };

  if (isMobile) {
    return false;
  }

  return (
    <div
      className={cn(
        'tw:relative tw:flex tw:flex-col tw:items-end tw:justify-start tw:gap-3 tw:rounded-[20px] tw:bg-white tw:py-4 tw:shadow-[16px_32px_56px_-24px_rgba(0,0,0,0.1)]',
        classname,
      )}
      {...props}
    >
      {/* Controls section */}
      {showscrollcontrols && (
        <div className="tw:flex tw:w-full tw:flex-row tw:items-center tw:gap-3 tw:px-4 tw:py-0">
          {/* Drop count */}
          <div className="tw:flex tw:flex-1 tw:flex-col tw:justify-center tw:text-lg">
            {drops.length} drops
          </div>

          {/* Navigation buttons */}
          <div className="tw:flex tw:w-[108px] tw:flex-row tw:items-center tw:gap-3">
            <Button
              iconleft={() => (
                <Icons.chevronLeft
                  classname="tw:w-4 tw:h-4"
                  stroke={isBeginning ? 'rgba(0, 0, 0, 0.2)' : 'currentColor'}
                />
              )}
              variant="secondary"
              size="small"
              state={isBeginning ? 'disabled' : 'enabled'}
              onclick={goToPrev}
              classname=" tw:rounded-full tw:h-12 tw:w-12 tw:min-w-12 tw:p-4"
            />
            <Button
              iconleft={() => (
                <Icons.chevronRight
                  classname="tw:w-4 tw:h-4"
                  stroke={isEnd ? 'rgba(0, 0, 0, 0.2)' : 'currentColor'}
                />
              )}
              variant="secondary"
              size="small"
              state={isEnd ? 'disabled' : 'enabled'}
              onclick={goToNext}
              classname=" tw:rounded-full tw:h-12 tw:w-12 tw:min-w-12 tw:p-4"
            />
          </div>
        </div>
      )}

      {/* Swiper container */}
      <div className="tw:flex tw:w-full tw:flex-row tw:items-start tw:gap-3 tw:overflow-hidden">
        <Swiper
          ref={swiperRef}
          spaceBetween={12}
          slidesPerView="auto"
          slidesOffsetBefore={20}
          slidesOffsetAfter={20}
          modules={[Navigation, FreeMode]}
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
            onswiperinstance(swiper);
          }}
          breakpoints={{
            1024: {
              slidesPerView: 5.5,
              spaceBetween: 12,
            },
          }}
          className="tw:w-full"
        >
          {drops.map((drop) => (
            <SwiperSlide key={drop.id} className="tw:shrink-0">
              {renderDropItem(drop)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PresellHeader;
