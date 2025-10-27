/**
 * ContentCarousel Component
 *
 * @description A carousel component for content editors to add standard or promo banners in a carousel format.
 * Renders StandardBanner and PromotionsBanner components in a carousel layout.
 *
 * @param {Object} props - Component props
 * @param {Array} props.sections - Array of StandardBanner or PromotionsBanner components to display in the carousel
 * @param {Object} props.swipersettings - Custom Swiper settings
 * @param {string} props.classname - Additional classes to add to the component
 * @returns {JSX.Element} - The ContentCarousel component
 */

import { useEffect, useRef, useCallback } from 'preact/hooks';
import Swiper from 'swiper';
import {
  Navigation,
  Pagination,
  EffectFade,
  Autoplay,
  A11y,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import Icons from '../Icons/Icons';
import { cn } from '../../../utils/helpers';

export const DEFAULT_SWIPER_SETTINGS = {
  modules: [Navigation, Pagination, EffectFade, Autoplay, A11y],
  a11y: true,
  autoplay: {
    delay: 3000,
    pauseOnMouseEnter: true,
    disableOnInteraction: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  loop: true,
  slidesPerView: 1,
  observer: true,
  observeParents: true,
};

const CLASSES = {
  slider: {
    nav: 'tw:hidden tw:bg-white tw:rounded-full tw:w-6 tw:h-6 tw:md:flex tw:items-center tw:justify-center tw:absolute tw:top-1/2 tw:z-10 tw:cursor-pointer tw:transition tw:duration-300 tw:ease-in-out tw:bg-opacity-50 tw:hover:bg-opacity-100 tw:shadow tw:hover:bg-tertiary-500 tw:-mt-4',
  },
};

const ContentCarousel = ({
  sections,
  swipersettings = DEFAULT_SWIPER_SETTINGS,
  classname,
  ...props
}) => {
  const swiperRef = useRef(null);
  const swiperInstance = useRef(null);

  const initSwiper = useCallback(() => {
    if (!swiperRef.current || sections.length <= 1) return;

    swiperInstance.current = new Swiper(swiperRef.current, {
      ...swipersettings,
      pagination: {
        el: '.swiper-pagination',
        bulletClass:
          'tw:w-2.5 tw:h-2.5 tw:rounded-full tw:mr-2 tw:bg-white/20 tw:relative tw:overflow-hidden',
        bulletActiveClass: 'tw:!w-8 tw:overflow-hidden tw:h-2 tw-active-bullet',
        renderBullet: (index, className) => {
          return `<button class="${className}" aria-label="Go to slide ${index + 1}">
            <span class="tw:absolute tw:inset-0 tw:bg-primary-1000">
              <span class="tw:absolute tw:inset-0 tw-animate-slide-right"></span>
            </span>
          </button>`;
        },
      },
    });
  }, [sections.length, swipersettings]);

  useEffect(() => {
    initSwiper();

    return () => {
      if (swiperInstance.current) {
        swiperInstance.current.destroy(true, true);
        swiperInstance.current = null;
      }
    };
  }, [initSwiper]);

  if (sections.length > 1) {
    return (
      <div {...props} role="region" aria-label="Content carousel">
        <div className="swiper" ref={swiperRef}>
          <div className="swiper-wrapper">
            {sections.map((section, index) => (
              <div
                key={`banner-${index}`}
                className="swiper-slide tw:min-h-fit"
              >
                {section}
              </div>
            ))}
          </div>

          <div className="swiper-pagination tw:pointer-events-none tw:!top-1 tw:!left-5 tw:!text-left tw:md:!top-auto tw:md:!bottom-2 tw:md:!text-center tw:lg:!left-0" />

          <button
            className={`swiper-button-prev tw:left-2 ${CLASSES.slider.nav}`}
            aria-label="Previous slide"
          >
            <Icons.chevronLeft classname="tw:h-4 tw:w-4" />
          </button>
          <button
            className={`swiper-button-next tw:right-2 ${CLASSES.slider.nav}`}
            aria-label="Next slide"
          >
            <Icons.chevronRight classname="tw:h-4 tw:w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(classname)}
      {...props}
      role="region"
      aria-label="Content section"
    >
      {sections[0]}
    </div>
  );
};

export default ContentCarousel;
