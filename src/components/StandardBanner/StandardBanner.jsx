import { h, Fragment } from 'preact';
import { cn, useMediaQuery } from '../../../utils/helpers';
import Button from '../Button/Button';

/**
 * StandardBanner Component
 *
 * A flexible banner component with responsive design for displaying promotional content.
 *
 * @param {Object} props - Component props
 * @param {string} props.image - The background image for the component
 * @param {string} props.imagemobile - The mobile image for the component
 * @param {string} props.title - The title of the banner
 * @param {string} props.description - The description of the banner
 * @param {Object | Array<JSX.Element>} props.cta - deprecated Use `ctas` prop instead.
 * @param {Array<JSX.Element>} props.ctas - Array of up to 2 Button components for call-to-action
 * @param {string} props.href - The URL to navigate to when clicked
 * @param {string} props.badge - The badge to display on the banner
 * @param {'left' | 'right'} props.badgeposition - The position of the badge
 * @param {string} props.bordercolor - The color of the border
 * @param {'light' | 'dark'} props.variant - The visual style of the banner
 * @param {"large" | "small"} props.size - The size of the banner
 * @param {"regular" | "small"} props.height - The height of the banner
 * @param {boolean} props.shadow - Whether to show a shadow effect
 * @param {string} [props.classname] - Additional classes to add to the component
 * @returns {JSX.Element} Preact component - The StandardBanner component
 */
const StandardBanner = ({
  image,
  imagemobile,
  title,
  description = '',
  cta,
  ctas,
  href,
  badge,
  shadow = true,
  badgeposition = 'left',
  bordercolor,
  variant = 'light',
  size = 'large',
  classname,
  height = 'regular',
  ...props
}) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const textLines = (description || '').split('\\n');

  // Determine content text color based on variant
  const textColorClass =
    variant === 'light' ? 'tw:text-white' : 'tw:text-black';

  // Determine border style if needed
  const borderStyle = bordercolor
    ? {
        white: 'tw:border-[1.5px] tw:border-white',
        black: 'tw:border-[1.5px] tw:border-black',
      }[bordercolor]
    : '';

  // Badge positioning class
  const badgePositionClass =
    badgeposition === 'right'
      ? 'tw:absolute tw:top-4 tw:right-4 tw:max-w-[112px] tw:md:top-8 tw:md:right-8 tw:md:max-w-[158px]'
      : '';

  return (
    <div
      className={cn(
        'tw:relative tw:flex tw:h-full tw:overflow-hidden tw:rounded-[20px] tw:bg-cover tw:bg-center tw:bg-no-repeat tw:p-3 tw:md:min-w-auto tw:md:p-5',
        height === 'regular' && 'tw:min-h-[520px] tw:lg:h-[520px]',
        height === 'small' && 'tw:min-h-[400px] tw:md:py-0 tw:lg:min-h-[400px]',
        size === 'small' &&
          height === 'regular' &&
          'tw:min-h-[520px] tw:p-4 tw:md:p-5 tw:lg:h-[480px]',
        classname,
      )}
      style={{
        backgroundImage: `url(${isMobile ? imagemobile || image : image})`,
      }}
      {...props}
    >
      {/* Background gradient overlay */}
      {shadow && (
        <div
          className="tw:absolute tw:inset-0 tw:z-0 tw:h-full tw:w-full"
          style={{
            backgroundImage:
              'linear-gradient(261deg, rgba(0, 0, 0, 0) 40.25%, rgba(0, 0, 0, 0.50) 62.14%)',
          }}
        />
      )}

      {/* Inner container with optional border */}
      <div
        className={cn(
          'tw:z-10 tw:w-full tw:rounded-xl tw:p-4 tw:md:p-10 tw:lg:p-12',
          height === 'small' && 'tw:py-0',
          size === 'small' && 'tw:lg:p-10 tw:xl:p-12',
          !bordercolor && 'tw:p-0 tw:md:p-10 tw:lg:p-12',
          borderStyle,
        )}
      >
        <div
          className={cn(
            'tw:flex tw:h-full tw:flex-col tw:justify-end tw:md:justify-center tw:md:space-y-6',
          )}
        >
          {/* Content area */}
          <div>
            {/* Badge element */}
            {badge && (
              <div
                className={cn(
                  'tw:mb-4 tw:h-auto tw:max-w-[117px] tw:lg:mb-8',
                  size === 'small' && 'tw:max-w-[77px] tw:lg:mb-6',
                  badgePositionClass,
                )}
              >
                <img src={badge} alt="Badge" />
              </div>
            )}
            <div
              className={cn(
                'tw:space-y-4 tw:lg:max-w-[80%] tw:lg:space-y-6',
                textColorClass,
              )}
            >
              <h3
                className={cn(
                  'tw:text-balance',
                  size === 'small' && 'tw:text-6xl tw:lg:text-7xl',
                  size === 'large' && 'tw:text-7xl tw:lg:text-9xl',
                  textColorClass,
                )}
              >
                {title}
              </h3>

              {textLines.map((line, index) => (
                <p
                  className={cn(
                    'tw:max-w-[576px] tw:text-lg tw:leading-[120%] tw:text-pretty tw:lg:text-xl',
                    size === 'small' && 'tw:lg:max-w-[80%]',
                    textColorClass,
                  )}
                  key={index}
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Call to action button */}
            {(ctas || cta) && (
              <div className="tw:mt-3 tw:flex tw:flex-col tw:items-center tw:gap-2 tw:max-lg:items-stretch tw:lg:mt-12 tw:lg:flex-row tw:lg:gap-4">
                {ctas ? (
                  // New ctas prop - render array of Button components
                  ctas
                    .slice(0, 2)
                    .map((ctaNode, index) => (
                      <Fragment key={index}>{ctaNode}</Fragment>
                    ))
                ) : // Legacy cta prop - maintain backwards compatibility
                Array.isArray(cta) ? (
                  cta.map((ctaNode, index) => (
                    <Fragment key={index}>{ctaNode}</Fragment>
                  ))
                ) : (
                  // Single CTA object
                  <Button
                    {...cta}
                    classname={cn(
                      'tw:w-full tw:md:w-auto',
                      size === 'small' && 'tw:mt-0',
                    )}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardBanner;
