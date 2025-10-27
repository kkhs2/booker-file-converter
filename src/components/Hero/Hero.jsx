/**
 * Hero Component
 *
 * @description Renders a customizable hero module with multiple sections and CTA buttons.
 *
 * The hero can contain one or more sections with a title, subtitle and CTA buttons.
 * Each section can have a different visual style and layout.
 * The hero can also contain a background image or a video.
 *
 * @param {Object} props - Component props
 * @param {Array} props.sections - Array of sections to display in the hero
 * @param {Object} props.swipersettings - Custom Swiper settings
 * @param {string} props.classname - Additional classes to add to the component
 * @returns {JSX.Element} - The Hero component
 */

import { h, Fragment } from 'preact';
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

import Button from '../Button/Button';
import Icons from '../Icons/Icons';
import { cn, parseHtmlToElements } from '../../../utils/helpers';

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
  section:
    'tw:rounded-[20px] tw:overflow-hidden tw:relative tw:h-full tw:bg-primary tw:h-[520px]',
  innerContainer:
    'tw:p-5 tw:py-5 tw:md:pl-[108px] tw:md:pr-20 tw:flex tw:justify-start tw:h-full tw:w-full tw:items-end tw:md:items-center',
  ctaWrapper:
    'tw:flex tw:flex-col tw:sm:flex-row tw:space-y-3 tw:sm:space-y-0 tw:sm:space-x-4 tw:mt-3 tw:md:mt-12',
  title: 'tw:text-7xl tw:lg:text-9xl tw:mb-3 tw:lg:mb-6 tw:md:text-balance',
  subtitle: 'tw:text-lg tw:md:text-xl tw:text-pretty',
  contentWrapper:
    'tw:relative tw:w-full tw:lg:w-1/2 tw:w-[80%] tw:max-w-xl tw:flex tw:flex-col tw:justify-center',
  slider: {
    nav: 'tw:hidden tw:bg-white tw:rounded-full tw:w-9 tw:h-9 tw:md:flex tw:items-center tw:justify-center tw:absolute tw:top-1/2 tw:z-10 tw:cursor-pointer tw:transition tw:duration-300 tw:ease-in-out tw:bg-opacity-50 tw:hover:bg-opacity-100 tw:shadow tw:hover:bg-tertiary-500 tw:-mt-4',
  },
};

// Asset component to render images or videos
const Asset = ({ assetPath, title }) => {
  if (!assetPath) return null;

  if (assetPath.includes('.mp4') || assetPath.includes('.mov')) {
    return (
      <video
        className="tw:absolute tw:z-0 tw:h-full tw:w-full tw:rounded-2xl tw:object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={assetPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <div
      className="tw:absolute tw:z-0 tw:h-full tw:w-full tw:rounded-2xl tw:bg-cover tw:bg-center tw:bg-no-repeat"
      style={{ backgroundImage: `url(${assetPath})` }}
      role="img"
      aria-label={title}
    />
  );
};

// Button component to render buttons
const CTAButtons = ({ buttons, classname = '' }) => (
  <div className={cn(CLASSES.ctaWrapper, classname)}>
    {buttons.map((cta, index) => (
      <Button
        key={`${cta.label}-${index}`}
        {...cta}
        classname="tw:w-full tw:lg:w-auto"
      />
    ))}
  </div>
);

const Hero = ({
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

  const renderPrimarySection = ({
    title,
    subtitle,
    CTA,
    assetPath,
    variant,
    badgePath,
  }) => (
    <div className="tw:relative tw:flex tw:h-full tw:flex-row tw:items-end tw:justify-start tw:sm:items-center">
      <Asset assetPath={assetPath} title={title} />

      <div className={CLASSES.innerContainer}>
        <div className={CLASSES.contentWrapper}>
          <h2 className={`${CLASSES.title} tw:text-white`}>
            {parseHtmlToElements(title)}
          </h2>

          {variant === 'primary' ? (
            <>
              <p
                className={`${CLASSES.subtitle} tw:leading-tight tw:text-white`}
              >
                {subtitle}
              </p>
              <CTAButtons buttons={CTA} />
            </>
          ) : (
            <div className="tw:mt-6 tw:rounded-2xl tw:p-8 tw:md:bg-secondary-1000">
              <p
                className={`${CLASSES.subtitle} tw:leading-tight tw:text-white tw:md:text-black`}
              >
                {subtitle}
              </p>
              <CTAButtons buttons={CTA} />
            </div>
          )}
        </div>

        {badgePath && (
          <div className="tw:absolute tw:right-12 tw:bottom-8 tw:z-20 tw:hidden tw:md:block">
            <img src={badgePath} alt="Badge" className="tw:max-w-[148px]" />
          </div>
        )}
      </div>
    </div>
  );

  const renderSecondarySection = ({
    flipContentColumns,
    title,
    subtitle,
    CTA,
    mobileCTAOutside,
    assetPath,
    assetPathMobile,
  }) => (
    <>
      <div className="tw:h-full tw:rounded-2xl tw:bg-primary-500">
        <div className={CLASSES.innerContainer}>
          <div
            className={`tw:flex ${flipContentColumns ? 'tw:flex-col-reverse tw:lg:flex-row-reverse' : 'tw:flex-col-reverse tw:lg:flex-row'} items-center tw:justify-between tw:gap-x-12`}
          >
            <div className="tw:mt-5 tw:flex tw:w-full tw:flex-shrink-0 tw:flex-col tw:justify-center tw:lg:mt-0 tw:lg:w-[45%]">
              <h2 className={`${CLASSES.title} tw:text-white`}>
                {parseHtmlToElements(title)}
              </h2>
              <p
                className={`${CLASSES.subtitle} tw:leading-tight tw:text-white`}
              >
                {subtitle}
              </p>
              <CTAButtons buttons={CTA} />
            </div>

            <div className="tw:w-full tw:lg:w-[55%]">
              {assetPath && (
                <img
                  src={assetPath}
                  srcSet={
                    assetPathMobile
                      ? `${assetPathMobile} 1023w, ${assetPath} 1024w`
                      : undefined
                  }
                  sizes={
                    assetPathMobile
                      ? '(max-width: 1023px) 100vw, 1024px'
                      : undefined
                  }
                  alt={title}
                  className="tw:max-h-[220px] tw:w-full tw:rounded-2xl tw:object-cover tw:lg:h-full tw:lg:max-h-[400px]"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {mobileCTAOutside && (
        <div className="tw:mt-5 tw:lg:hidden">
          <CTAButtons buttons={CTA} />
        </div>
      )}
    </>
  );

  const renderInverseSection = ({
    flipContentColumns,
    title,
    subtitle,
    CTA,
    mobileCTAOutside,
    assetPath,
    assetPathMobile,
  }) => (
    <>
      <div className="tw:h-full tw:rounded-2xl tw:border tw:border-primary tw:bg-secondary-1000">
        <div className={CLASSES.innerContainer}>
          <div
            className={`tw:flex ${flipContentColumns ? 'tw:flex-col-reverse tw:md:flex-row' : 'tw:flex-col-reverse tw:md:flex-row'} tw:relative tw:items-center tw:justify-between tw:gap-x-7`}
          >
            <div className="tw:mt-7 tw:flex tw:w-full tw:flex-shrink-0 tw:flex-col tw:justify-center tw:lg:mt-0 tw:lg:w-[46%]">
              <h2 className={`${CLASSES.title} tw:text-primary`}>
                {parseHtmlToElements(title)}
              </h2>
              <div className="tw:lg:rounded-2xl tw:lg:border tw:lg:border-primary tw:lg:p-6">
                <p className={`${CLASSES.subtitle} tw:leading-tight`}>
                  {subtitle}
                </p>
                <CTAButtons
                  buttons={CTA}
                  classname={
                    mobileCTAOutside ? 'tw:hidden tw:md:block' : 'tw:lg:mt-6'
                  }
                />
              </div>
            </div>

            <div className="tw:w-full tw:md:-mb-24 tw:md:w-[52%]">
              {assetPath && (
                <img
                  src={assetPath}
                  srcSet={
                    assetPathMobile
                      ? `${assetPathMobile} 1023w, ${assetPath} 1024w`
                      : undefined
                  }
                  sizes={
                    assetPathMobile
                      ? '(max-width: 1023px) 100vw, 1024px'
                      : undefined
                  }
                  alt={title}
                  className="tw:w-full tw:lg:max-h-[426px]"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {mobileCTAOutside && (
        <div className="tw:mt-5 tw:md:hidden">
          <CTAButtons buttons={CTA} />
        </div>
      )}
    </>
  );

  const renderSection = (section) => {
    switch (section.variant) {
      case 'primary':
      case 'tertiary':
        return renderPrimarySection(section);
      case 'secondary':
        return renderSecondarySection(section);
      case 'inverse':
        return renderInverseSection(section);
      default:
        return null;
    }
  };

  if (sections.length > 1) {
    return (
      <div {...props} role="region" aria-label="Hero slideshow">
        <div className="swiper" ref={swiperRef}>
          <div className="swiper-wrapper">
            {sections.map((section, index) => (
              <div
                key={`${section.variant}-${index}`}
                className="swiper-slide tw:!h-[620px] tw:sm:!h-[520px]"
              >
                {renderSection(section)}
              </div>
            ))}
          </div>

          <div className="swiper-pagination tw:pointer-events-none tw:!top-1 tw:!left-5 tw:!text-left tw:md:!top-auto tw:md:!bottom-2 tw:md:!text-center tw:lg:!left-0" />

          <button
            className={`swiper-button-prev tw:left-6 ${CLASSES.slider.nav}`}
            aria-label="Previous slide"
          >
            <Icons.chevronLeft classname="tw:h-3 tw:w-3" />
          </button>
          <button
            className={`swiper-button-next tw:right-6 ${CLASSES.slider.nav}`}
            aria-label="Next slide"
          >
            <Icons.chevronRight classname="tw:h-3 tw:w-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(`${CLASSES.section}`, classname)}
      {...props}
      role="region"
      aria-label="Hero section"
    >
      {renderSection(sections[0])}
    </div>
  );
};

export default Hero;
