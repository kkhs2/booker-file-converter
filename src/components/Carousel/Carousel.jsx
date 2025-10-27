import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/grid';

import { h, Fragment } from 'preact';
import { useRef, useEffect, useState } from 'preact/hooks';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Grid, FreeMode } from 'swiper/modules';
import { cn } from '../../../utils/helpers';
import Icons from '../Icons/Icons';
import Button from '../Button/Button';

const defaultSwiperOptions = {
  slidesOffsetBefore: 20,
  slidesOffsetAfter: 20,
  spaceBetween: 12,
  slidesPerView: 1.25,
  freeMode: true,
  breakpoints: {
    768: {
      slidesPerView: 2.6,
    },
    1024: {
      slidesPerView: 4,
      freeMode: false,
    },
    1312: {
      slidesPerView: 4,
      freeMode: false,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
    },
  },
};

/**
 * Carousel Component
 *
 * @description A carousel component that displays a list of items in a horizontal slider
 *
 * @param {Object} props - Component props
 * @param {Array} props.items - Array of items to display in the carousel
 * @param {Object} props.options - Custom Swiper settings
 * @param {string} props.title - The heading of the carousel
 * @param {string} props.description - Description of the carousel
 * @param {boolean} props.shownavigation - Show navigation buttons
 * @param {boolean} props.titleclassname - Additional classes to add to the title
 * @param {function} props.externalnavigation - External navigation handlers
 * @param {function} props.onslidechange - Callback function to handle slide changes
 * @param {string} props.classname - Additional classes to add to the component
 * @param {string} props.aligncontent - Vertical alignment of slide content: 'top', 'bottom', 'stretch'
 *
 * @returns {JSX.Element} - The Carousel component
 */

const Carousel = ({
  items,
  options,
  title,
  description,
  shownavigation = true,
  titleclassname,
  externalnavigation,
  onslidechange,
  classname,
  aligncontent = 'stretch',
  ...props
}) => {
  const swiperOptions = { ...defaultSwiperOptions, ...options };
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

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

  const getCurrentBreakpointSettings = () => {
    // Sort breakpoints in descending order
    const breakpoints = Object.entries(swiperOptions.breakpoints).sort(
      ([a], [b]) => Number(b) - Number(a),
    );

    for (const [breakpoint, settings] of breakpoints) {
      if (window.matchMedia(`(min-width: ${breakpoint}px)`).matches) {
        return settings;
      }
    }

    // If no breakpoints match, return base settings
    return {
      slidesPerView: swiperOptions.slidesPerView,
    };
  };

  const getAlignmentClasses = (alignment) => {
    switch (alignment) {
      case 'top':
        return 'tw:items-start';
      case 'bottom':
        return 'tw:items-end';
      case 'stretch':
      default:
        return 'tw:items-stretch';
    }
  };

  useEffect(() => {
    if (externalnavigation) {
      const currentBreakpointSettings = getCurrentBreakpointSettings();

      externalnavigation({
        onPrev: handlePrev,
        onNext: handleNext,
        showNavigation: items.length > currentBreakpointSettings.slidesPerView,
      });
    }
  }, []);

  return (
    <div {...props}>
      {/* Only show default navigation if no external navigation provided */}
      {shownavigation && !externalnavigation && (
        <div className="tw:mb-6 tw:flex tw:items-center tw:justify-end tw:lg:mb-12">
          <div className="tw:mr-5 tw:hidden tw:max-w-32 tw:items-center tw:justify-between tw:space-x-3 tw:md:flex tw:xl:mr-0">
            <Button
              onClick={handlePrev}
              variant="secondary"
              iconright={<Icons.chevronLeft classname="tw:h-4 tw:w-4" />}
              state={isBeginning ? 'disabled' : 'enabled'}
            />
            <Button
              onClick={handleNext}
              variant="secondary"
              iconright={<Icons.chevronRight classname="tw:h-4 tw:w-4" />}
              state={isEnd ? 'disabled' : 'enabled'}
            />
          </div>
        </div>
      )}

      <Swiper
        ref={swiperRef}
        className={cn(
          'tw:swiper tw:relative tw:-my-5 tw:overflow-hidden tw:lg:-my-10',
          classname,
        )}
        wrapperClass={cn(
          'swiper-wrapper tw:py-5 tw:lg:py-10',
          getAlignmentClasses(aligncontent),
        )}
        {...swiperOptions}
        modules={[Navigation, A11y, Grid, FreeMode]}
        onSlideChange={() => {
          if (swiperRef.current?.swiper) {
            setIsBeginning(swiperRef.current.swiper.isBeginning);
            setIsEnd(swiperRef.current.swiper.isEnd);
            if (onslidechange) {
              onslidechange(swiperRef.current.swiper);
            }
          }
        }}
        onReachBeginning={() => {
          setIsBeginning(true);
        }}
        onReachEnd={() => {
          setIsEnd(true);
        }}
        onPrev={handlePrev}
        onNext={handleNext}
      >
        {!items.length ? (
          <div className="tw:flex-1">{items}</div>
        ) : (
          items.map((item, index) => (
            <SwiperSlide
              key={index}
              className="tw:!flex tw:!h-auto tw:!flex-col tw:justify-end"
            >
              <div className="tw:flex-1">{item}</div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default Carousel;
