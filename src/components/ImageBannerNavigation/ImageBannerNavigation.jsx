import { h, Fragment } from 'preact';
import { useMediaQuery } from '../../../utils/helpers';
import { cn } from '../../../utils/helpers';
import RailSection from '../RailSection/RailSection';
import Typography from '../Typography/Typography';

/**
 * Image Banner Navigation Component
 *
 * Renders a customisable Image Banner Navigation section with a background image,
 * banner title, banner description, and navigation cards.
 *
 * @param {Object} props - Component props
 * @param {string} props.imagedesktop - The desktop image for the component
 * @param {string} props.imagemobile - The mobile image for the component
 * @param {string} props.bannertitle - The title of the banner
 * @param {string} props.bannerdescription - The description of the banner
 * @param {string} props.cardstitle - The title of the cards
 * @param {Array} props.featurednavigationcards - The featured navigation cards to display in the component
 * @param {Array} props.navigationcards - The navigation cards to display in the component
 * @param {number} props.desktopcolumns - Number of columns on desktop view (default: 3)
 * @param {boolean} props.mobilecarousel - Whether to show carousel on mobile
 * @param {number} props.mobilerows - Number of rows to show on mobile before scrolling
 * @param {string} props.classname - Additional classes to add to the component
 *
 * @returns {JSX.Element} - The ImageBannerNavigation component
 */
const ImageBannerNavigation = ({
  imagedesktop,
  imagemobile,
  bannertitle,
  bannerdescription,
  cardstitle,
  featurednavigationcards = [],
  navigationcards = [],
  desktopcolumns = 3,
  mobilecarousel = false,
  mobilerows = 2,
  classname,
  ...props
}) => {
  const isMobile = useMediaQuery('(max-width: 1023px)');

  // Carousel options
  const carouselOptions = {
    slidesOffsetBefore: 20,
    slidesOffsetAfter: 20,
    spaceBetween: 12,
    observer: true,
    observeParents: true,
    slidesPerView: 1.2,
    grid: {
      rows: mobilerows || 2,
      fill: 'row',
    },
    breakpoints: {
      1024: {
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        gap: 16,
        freeMode: false,
        autoHeight: true,
        slidesPerView: 2,
        grid: {
          rows: 1,
          fill: 'column',
        },
      },
    },
  };

  // so we use a fixed mapping of allowed grid column classes.
  // This ensures Tailwind includes these styles in the final build.
  const gridClass =
    {
      1: 'tw:lg:grid-cols-1',
      2: 'tw:lg:grid-cols-2',
      3: 'tw:lg:grid-cols-3',
      4: 'tw:lg:grid-cols-4',
      5: 'tw:lg:grid-cols-5',
      6: 'tw:lg:grid-cols-6',
      7: 'tw:lg:grid-cols-7',
      8: 'tw:lg:grid-cols-8',
      9: 'tw:lg:grid-cols-9',
      10: 'tw:lg:grid-cols-10',
      11: 'tw:lg:grid-cols-11',
      12: 'tw:lg:grid-cols-12',
    }[desktopcolumns] || 'tw:lg:grid-cols-1'; // Default to 1 column

  return (
    <div
      className={cn('tw:relative tw:w-full tw:rounded-[20px]', classname)}
      {...props}
    >
      {/* Background Image */}
      <div
        className={cn(
          'tw:relative tw:flex tw:h-[284px] tw:w-full tw:items-end tw:rounded-[20px] tw:p-4 tw:lg:h-[368px] tw:lg:items-center tw:lg:px-18 tw:lg:pt-16 tw:lg:pb-30',
          mobilecarousel ? 'tw:mx-5 tw:w-[calc(100%-40px)] tw:lg:mx-0' : '',
        )}
      >
        {/* Header Content */}
        <div className="tw:absolute tw:z-2 tw:space-y-4 tw:lg:space-y-6">
          <Typography
            domtype="h2"
            classname="tw:text-white"
            content={bannertitle}
          />

          <p className="tw:max-w-[90%] tw:text-lg tw:leading-tight tw:text-white tw:lg:max-w-[537px] tw:lg:text-xl">
            {bannerdescription}
          </p>
        </div>

        <div
          className="tw:absolute tw:inset-0 tw:z-1 tw:rounded-[20px]"
          style={{
            background:
              'linear-gradient(264deg, rgba(0, 0, 0, 0.00) 25.73%, rgba(0, 0, 0, 0.30) 93.63%)',
          }}
        ></div>
        <picture className="tw:absolute tw:inset-0 tw:z-0 tw:rounded-[20px]">
          <source media="(min-width: 768px)" srcSet={imagedesktop} />
          <img
            src={imagemobile}
            alt="Image Main Banner Navigation"
            className="tw:h-full tw:w-full tw:rounded-[20px] tw:object-cover"
          />
        </picture>
      </div>

      {/* Content Container */}
      <div
        className={cn(
          'tw:relative tw:z-1 tw:mt-10 tw:space-y-5 tw:rounded-3xl tw:bg-secondary-1000 tw:lg:mx-18 tw:lg:mt-[-100px] tw:lg:space-y-6 tw:lg:p-6 tw:lg:shadow-[4px_4px_40px_-24px_rgba(0,0,0,0.3)]',
          featurednavigationcards.length > 0 ? 'tw:mt-10' : 'tw:mt-6',
        )}
      >
        {cardstitle && (
          <Typography
            domtype="h6"
            content={cardstitle}
            classname="tw:text-3xl"
          />
        )}
        <div className="tw:space-y-10">
          {/* Featured Navigation Cards (first row) */}
          {featurednavigationcards.length > 0 && (
            <div className="tw:col-span-full tw:grid tw:grid-cols-1 tw:gap-3 tw:md:grid-cols-2 tw:lg:gap-4">
              {featurednavigationcards.map((card, index) => (
                <Fragment key={index}>
                  {typeof card === 'function' ? card() : card}
                </Fragment>
              ))}
            </div>
          )}

          {/* Regular Navigation Cards */}
          {navigationcards.length > 0 &&
            (isMobile && mobilecarousel ? (
              <RailSection
                carouseloptions={carouselOptions}
                shownavigation={false}
                classname="tw:!overflow-visible tw:lg:!overflow-hidden"
              >
                {navigationcards.map((card, index) => (
                  <Fragment key={index}>
                    {typeof card === 'function' ? card() : card}
                  </Fragment>
                ))}
              </RailSection>
            ) : (
              <div
                className={cn(
                  'tw:grid tw:grid-cols-1 tw:items-stretch tw:gap-3 tw:lg:gap-4',
                  gridClass,
                )}
              >
                {navigationcards.map((card, index) => (
                  <Fragment key={index}>
                    {typeof card === 'function' ? card() : card}
                  </Fragment>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ImageBannerNavigation;
