import { h, Fragment } from 'preact';
import Button from '../Button/Button';
import { cn } from '../../../utils/helpers';

/**
 * Promotions Banner Component
 *
 * @description Banners can include a title, subtitle, image, and call-to-action button.
 *
 * @param {Object} props - The component props
 * @param {'fullwidth' | 'grouped' | 'navigation'} props.layout - The layout context of the banner
 * @param {'orange' | 'white'} props.backgroundstyle - The background color style when no background
 * @param {'style1' | 'style2'} props.contentboxstyle - The style of the text content boximage is used
 * @param {String} props.title - The main title of the banner
 * @param {String} props.subtitle - The subtitle of the banner
 * @param {Array} props.cta - Array of CTA buttons to display in the banner
 * @param {String} props.footnote - Optional footnote to display below the CTA buttons
 * @param {String} props.image - The URL of the image or video asset used in the banner
 * @param {"background" | "inline"} props.imageplacement - Whether image is used as background or displayed inline
 * @param {boolean} props.imageonleft - Indicates if the content columns should be flipped
 * @param {String} props.badgesrc - The URL of the badge image asset used in the banner
 * @param {String} props.externalimage - External image URL for desktop
 * @param {String} props.externalimagelist - External image URL for when the is displayed in lists
 * @param {String} props.externalimagemobile - External image URL for mobile devices
 * @param {String} props.externalurl - URL to navigate to when the external banner is clicked
 * @param {"list" | "grid"} props.viewmode - The view mode of the banner, either "list" or "grid"
 * @param {String} props.classname - Additional classes to add to the component
 * @returns {JSX.Element} - The PromotionsBanner component
 */

const PromotionsBanner = ({
  viewmode = 'grid',
  layout = 'fullwidth',
  backgroundstyle = 'orange',
  contentboxstyle = 'style1',
  title,
  subtitle,
  cta = [],
  footnote,
  image,
  imageplacement = 'inline',
  imageonleft = false,
  badgesrc,
  externalimage,
  externalimagemobile,
  externalimagelist,
  externalurl,
  classname,
  ...props
}) => {
  // External image banner
  if (externalimage) {
    return (
      <div
        className={cn(
          'tw:flex tw:h-full tw:w-full tw:justify-center tw:overflow-hidden tw:rounded-2xl tw:xl:mx-0',
          viewmode === 'list' && 'tw:max-h-[260px] tw:overflow-hidden',
          classname,
        )}
        {...props}
      >
        {externalurl ? (
          <a
            href={externalurl}
            target="_blank"
            rel="noreferrer"
            class="tw:w-full"
          >
            <picture>
              <source
                srcSet={externalimagemobile}
                media="(max-width: 1024px)"
              />
              <source
                srcSet={viewmode === 'grid' ? externalimage : externalimagelist}
                media="(min-width: 1025px)"
              />
              <img
                src={viewmode === 'grid' ? externalimage : externalimagelist}
                media="(min-width: 1025px)"
                alt="External Banner"
                className="tw:h-full tw:w-full tw:object-cover"
              />
            </picture>
          </a>
        ) : (
          <picture>
            <source srcSet={externalimagemobile} media="(max-width: 1024px)" />
            <source
              srcSet={viewmode === 'grid' ? externalimage : externalimagelist}
              media="(min-width: 1025px)"
            />
            <img
              src={viewmode === 'grid' ? externalimage : externalimagelist}
              media="(min-width: 1025px)"
              alt="External Banner"
              className="tw:h-full tw:w-full tw:object-cover tw:object-center"
            />
          </picture>
        )}
      </div>
    );
  }

  // If imageplacement is set to "background", set the background image style on the container
  const containerStyle =
    imageplacement === 'background' ? { backgroundImage: `url(${image})` } : {};

  return (
    <div
      className={cn(
        backgroundstyle === 'white' ? 'tw:bg-white-1000' : 'tw:bg-primary',
        'tw:relative tw:h-full tw:overflow-hidden tw:rounded-2xl tw:bg-cover tw:bg-no-repeat tw:p-4 tw:lg:p-8',
        badgesrc && layout === 'grouped' && 'tw:pt-12 tw:sm:p-8',
        layout === 'navigation' && 'tw:p-3 tw:lg:p-4',
        classname,
      )}
      style={containerStyle}
      {...props}
    >
      <div
        className={cn(
          'tw:flex tw:items-stretch tw:gap-2',
          layout !== 'navigation' && 'tw:lg:gap-8',
          backgroundstyle === 'white'
            ? 'tw:flex-col tw:sm:flex-row-reverse'
            : '',
          imageonleft
            ? 'tw:flex-col tw:sm:flex-row-reverse'
            : layout === 'grouped' && backgroundstyle === 'white'
              ? 'tw:flex-col tw:sm:flex-row'
              : 'tw:flex-col-reverse tw:sm:flex-row',
          badgesrc && 'tw:flex-row tw:items-end',
          layout === 'grouped' && 'tw:sm:items-center tw:lg:gap-6',
          layout === 'grouped' && !badgesrc && 'tw:h-full',
          layout === 'navigation' &&
            'tw:grid tw:grid-cols-[repeat(auto-fit,_minmax(0,_2fr))] tw:sm:flex tw:sm:flex-col-reverse',
        )}
      >
        <div
          className={cn(
            'tw:lg tw:flex tw:w-full tw:flex-[1_0_76.9%] tw:flex-col tw:justify-between tw:px-4 tw:py-3 tw:pr-6 tw:sm:w-1/2 tw:sm:flex-auto tw:lg:px-8 tw:lg:py-4',
            backgroundstyle === 'white' &&
              'tw:border-[1.5px] tw:border-primary-500 tw:bg-white-1000',
            'tw:space-y-5 tw:rounded-2xl tw:sm:space-y-8',
            contentboxstyle === 'style2'
              ? 'tw:bg-transparent'
              : 'tw:bg-secondary-1000',
            backgroundstyle === 'white' && 'tw:bg-white-1000',
            layout === 'grouped' &&
              'tw:justify-center tw:sm:min-h-[298px] tw:sm:max-w-[calc(55%_-_12px)] tw:sm:flex-[1_0_calc(55%_-_12px)] tw:sm:p-5 tw:sm:pr-15',
            layout === 'grouped' && !badgesrc && 'tw:flex-auto',
            layout === 'navigation' &&
              'tw:flex-[1_0_50%] tw:pr-4 tw:sm:w-full tw:sm:flex-[1_0_100%] tw:sm:space-y-4 tw:lg:px-4 tw:lg:py-3',
          )}
        >
          <div>
            <h3
              className={cn(
                'tw:mb-2 tw:text-3xl tw:leading-tight tw:md:text-balance tw:lg:text-7xl',
                backgroundstyle === 'white' && 'tw:text-primary-500',
                contentboxstyle === 'style2' && 'tw:text-white',
                layout === 'grouped' && 'tw:sm:text-5xl tw:lg:text-5xl',
                layout === 'navigation' && 'tw:text-xl tw:lg:text-3xl',
              )}
            >
              {title}
            </h3>
            <p
              className={cn(
                'tw:text-lg tw:leading-tight tw:text-pretty tw:md:text-xl',
                contentboxstyle === 'style2' && 'tw:text-white',
                layout === 'grouped' && 'tw:sm:text-lg tw:lg:text-lg',
                layout === 'navigation' && 'tw:text-13 tw:lg:text-base',
              )}
            >
              {subtitle}
            </p>
          </div>

          <div>
            {cta.map((_cta, index) => (
              <Button key={index} {..._cta} />
            ))}

            {/* Display optional foodnote text */}
            {footnote && (
              <p className="tw:mt-4 tw:text-xs tw:underline tw:decoration-dotted tw:lg:text-sm">
                <sup>*</sup>
                {footnote}
              </p>
            )}
          </div>
        </div>

        {backgroundstyle !== 'white' ? (
          <div
            className={cn(
              'tw:flex-1n tw:flex tw:h-full tw:w-full tw:rounded-2xl tw:md:w-1/2',
              badgesrc && 'tw:justify-end',
              layout === 'grouped' &&
                'tw:sm:max-w-[calc(45%_-_12px)] tw:sm:flex-[1_0_calc(45%_-_12px)] tw:sm:justify-center',
              layout === 'navigation' &&
                'tw:h-auto tw:flex-[1_0_50%] tw:sm:w-full tw:sm:flex-[1_0_100%] tw:md:w-full',
            )}
          >
            {imageplacement === 'inline' && !badgesrc && (
              <img
                src={image}
                alt="Image"
                className={cn(
                  'tw:h-full tw:max-h-[146px] tw:w-full tw:rounded-xl tw:object-cover tw:sm:max-h-[260px] tw:lg:min-h-[190px] tw:lg:rounded-[20px]',
                  layout === 'navigation' &&
                    'tw:max-h-none tw:sm:max-h-[153px]',
                  layout === 'grouped' && 'tw:max-h-[146px] tw:sm:max-h-none',
                )}
              />
            )}
            {badgesrc && (
              <img
                src={badgesrc}
                alt="Badge"
                className={cn(
                  'tw:max-w-[66px] tw:lg:max-w-[148px]',
                  layout === 'grouped' && 'tw:sm:max-w-[148px]',
                )}
              />
            )}
          </div>
        ) : (
          <div
            className={cn(
              'tw:relative tw:flex tw:w-full tw:items-center tw:justify-center tw:sm:h-[254px] tw:sm:w-1/2',
              layout === 'grouped' && 'tw:overflow-hidden',
              layout === 'navigation' &&
                'tw:flex-[1_0_50%] tw:sm:w-full tw:sm:flex-[1_0_100%]',
            )}
          >
            <img
              src={image}
              alt="Image"
              className={cn(
                'tw:bottom-0 tw:left-0 tw:h-auto tw:w-full tw:max-w-[547px]',
                layout === 'grouped' &&
                  'tw:h-auto tw:w-full tw:sm:h-full tw:sm:w-auto',
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PromotionsBanner;
