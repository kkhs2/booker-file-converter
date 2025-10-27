import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { h, Fragment } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Pagination, Autoplay } from 'swiper/modules';
import { cn } from '../../../utils/helpers';
import Icons from '../Icons/Icons';
import Button from '../Button/Button';

const defaultSwiperOptions = {
  a11y: true,
  slidesOffsetBefore: 0,
  slidesOffsetAfter: 0,
  spaceBetween: 0,
  slidesPerView: 1,
  loop: true,
  autoHeight: false,
  autoplay: {
    delay: 3000,
    pauseOnMouseEnter: true,
    disableOnInteraction: true,
  },
};

/**
 * Advert Component
 *
 * @description A responsive advertisement component that displays images with links in a slider format.
 * Supports different image versions for grid and list views.
 *
 * @param {Object} props - Component props
 * @param {Array} props.items - Array of advertisement items to display
 * @param {string} props.items[].gridImage - Image URL for grid view
 * @param {string} props.items[].listImage - Image URL for list view
 * @param {string} props.items[].link - URL to navigate to when clicked
 * @param {string} props.items[].alt - Alt text for the image
 * @param {string} props.items[].title - Optional title for the advertisement
 * @param {Object} props.slideroptions - Custom Swiper.js configuration options
 * @param {string} props.viewmode - Current view mode: 'grid' or 'list' (default: 'grid')
 * @param {boolean} props.shownavigation - Show navigation arrows (default: true)
 * @param {boolean} props.showpagination - Show pagination dots (default: true)
 * @param {boolean} props.autoplay - Enable autoplay (default: true)
 * @param {string} props.classname - Additional CSS classes
 * @param {function} props.onslidechange - Callback function when slide changes
 * @param {function} props.onitemclick - Callback function when an item is clicked
 *
 * @returns {JSX.Element} - The Advert component
 */

const Advert = ({
  items = [],
  slideroptions = {},
  viewmode = 'grid',
  shownavigation = true,
  showpagination = true,
  autoplay = true,
  classname,
  onslidechange,
  onitemclick,
  ...props
}) => {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Merge default options with custom options
  const finalOptions = {
    ...defaultSwiperOptions,
    ...slideroptions,
    autoplay: autoplay
      ? slideroptions.autoplay || defaultSwiperOptions.autoplay
      : false,
  };

  const handlePrev = () => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    if (onslidechange) {
      onslidechange(swiper.activeIndex);
    }
  };

  const handleItemClick = (item, index) => {
    if (onitemclick) {
      onitemclick(item, index);
    }
    if (item.link) {
      window.open(item.link, '_blank', 'noopener,noreferrer');
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  const renderSlide = (item, index) => {
    const imageUrl = viewmode === 'list' ? item.listImage : item.gridImage;

    return (
      <div
        key={index}
        className={cn(
          'tw:relative tw:h-full tw:w-full tw:cursor-pointer tw:overflow-hidden',
          viewmode === 'grid' ? 'tw:aspect-[9/16]' : 'tw:max-h-[260px]',
        )}
        onClick={() => handleItemClick(item, index)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleItemClick(item, index);
          }
        }}
      >
        <div className={cn('tw:h-full tw:w-full tw:overflow-hidden')}>
          <img
            src={imageUrl}
            alt={`Advertisement ${index + 1}`}
            className="tw:h-full tw:w-full tw:object-cover tw:object-center"
            loading="lazy"
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className={cn(
        'tw:relative tw:overflow-hidden tw:rounded-[20px]',
        viewmode === 'grid'
          ? 'tw:h-full tw:w-full'
          : 'tw:max-h-[260px] tw:w-full',
        classname,
      )}
      {...props}
    >
      {shownavigation && items.length > 1 && (
        <Fragment>
          <Button
            onClick={handlePrev}
            variant="inverse"
            iconright={<Icons.chevronLeft classname="tw:h-4 tw:w-4" />}
            state={isBeginning && !finalOptions.loop ? 'disabled' : 'enabled'}
            aria-label="Previous advertisement"
            classname={
              'tw:absolute tw:top-1/2 tw:-translate-y-1/2 tw:left-4 tw:z-10 tw:hidden tw:md:block '
            }
          />

          <Button
            onClick={handleNext}
            variant="inverse"
            iconright={<Icons.chevronRight classname="tw:h-4 tw:w-4" />}
            state={isEnd && !finalOptions.loop ? 'disabled' : 'enabled'}
            aria-label="Next advertisement"
            classname={
              'tw:absolute tw:top-1/2 tw:-translate-y-1/2 tw:right-4 tw:z-10 tw:hidden tw:md:block'
            }
          />
        </Fragment>
      )}

      <Swiper
        ref={swiperRef}
        modules={[Navigation, A11y, Pagination, Autoplay]}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        pagination={
          showpagination
            ? {
                clickable: true,
                el: '.swiper-pagination',
                bulletClass:
                  'tw:w-2.5 tw:h-2.5 tw:rounded-full tw:mr-2 tw:bg-white/20 tw:relative tw:overflow-hidden tw:inline-block tw:cursor-pointer',
                bulletActiveClass:
                  'tw:!w-8 tw:overflow-hidden tw:h-2 tw-active-bullet',
                renderBullet: (index, className) => {
                  return `<button class="${className}" aria-label="Go to slide ${index + 1}">
                  <span class="tw:absolute tw:inset-0 tw:bg-primary-1000">
                    <span class="tw:absolute tw:inset-0 tw-animate-slide-right"></span>
                  </span>
                </button>`;
                },
              }
            : false
        }
        {...finalOptions}
        className={cn(
          showpagination && 'tw:pb-12',
          'tw:h-full',
          '[&_.swiper-wrapper]:tw:h-full',
        )}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="tw:h-auto">
            {renderSlide(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>

      {showpagination && items.length > 1 && (
        <div className="swiper-pagination tw:pointer-events-none tw:!top-1 tw:!left-5 tw:!text-left tw:md:!top-auto tw:md:!bottom-2 tw:md:!text-center tw:lg:!left-0" />
      )}
    </div>
  );
};

export default Advert;
