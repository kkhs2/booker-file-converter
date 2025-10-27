import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import Typography from '../Typography/Typography';
import Carousel from '../Carousel/Carousel';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';
import Tag from '../Tag/Tag';
import { cn, useMediaQuery } from '../../../utils/helpers';

/**
 * RailSection Component
 *
 * @description Renders a RailSection with a title and a grid of children
 *
 * @param {Object} props - The component props
 * @param {string} props.title - The title of the section
 * @param {string} props.titleclassname - Additional classes to add to the title
 * @param {string} props.description - The description of the section
 * @param {string} props.descriptionclassname - Additional classes to add to the description
 * @param {string} props.navigationclassname - Additional classes to add to the navigation
 * @param {string} props.tag - The tag of the section
 * @param {string} props.cta - The cta of the section
 * @param {string} props.href - The href of the section
 * @param {ReactNode} props.children - The children to display in the section
 * @param {'carousel' | 'grid' | 'list'} props.desktopstyle - The style of the section, either 'carousel', 'list' or 'grid' on desktop
 * @param {number} props.desktopgridcols - Number of columns in the grid for desktop
 * @param {string} props.desktopgridclassname - Additional classes to add to the grid for desktop
 * @param {boolean} props.shownavigation - Whether to show navigation controls
 * @param {Object} props.carouseloptions - Carousel options
 * @param {Object} props.tradeclub - Trade Club tag
 * @param {string} props.classname - Additional classes to add to the component
 * @param {string} props.aligncontent - Vertical alignment of slide content: 'top', 'bottom', 'stretch'
 *
 * @returns {JSX.Element} - The RailSection component
 */

const RailSection = ({
  title,
  titleclassname,
  description,
  descriptionclassname,
  navigationclassname,
  tag,
  cta,
  href,
  children,
  desktopstyle = 'carousel',
  desktopgridcols = 4,
  desktopgridclassname,
  shownavigation = true,
  carouseloptions,
  classname,
  tradeclub,
  aligncontent,
  ...props
}) => {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [navigationHandlers, setNavigationHandlers] = useState({
    onPrev: null,
    onNext: null,
    showNavigation: true,
  });

  // so we use a fixed mapping of allowed grid column classes.
  // This ensures Tailwind includes these styles in the final build.
  const gridClass =
    {
      1: 'tw:grid-cols-1',
      2: 'tw:grid-cols-2',
      3: 'tw:grid-cols-3',
      4: 'tw:grid-cols-4',
      5: 'tw:grid-cols-5',
      6: 'tw:grid-cols-6',
      7: 'tw:grid-cols-7',
      8: 'tw:grid-cols-8',
      9: 'tw:grid-cols-9',
      10: 'tw:grid-cols-10',
      11: 'tw:grid-cols-11',
      12: 'tw:grid-cols-12',
    }[desktopgridcols] || 'tw:grid-cols-1'; // Default to 1 column

  const navigationButtons = shownavigation &&
    navigationHandlers.showNavigation && (
      <div
        className={cn(
          'tw:hidden tw:items-center tw:justify-between tw:space-x-3 tw:lg:mr-16 tw:lg:flex',
          navigationclassname,
        )}
      >
        <Button
          onClick={navigationHandlers.onPrev}
          variant="secondary"
          iconright={<Icons.chevronLeft classname="tw:h-4 tw:w-4" />}
          state={isBeginning ? 'disabled' : 'enabled'}
        />
        <Button
          onClick={navigationHandlers.onNext}
          variant="secondary"
          iconright={<Icons.chevronRight classname="tw:h-4 tw:w-4" />}
          state={isEnd ? 'disabled' : 'enabled'}
        />
      </div>
    );

  return (
    <div className={cn('tw:relative', classname)} {...props}>
      {title || tag || description || cta || shownavigation ? (
        <div className="tw:mb-5 tw:lg:mb-8">
          <div className="tw:flex tw:flex-col tw:justify-between tw:lg:flex-row tw:lg:items-center">
            <header className={cn('tw:max-lg:px-5', titleclassname)}>
              <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:lg:justify-start tw:lg:gap-4">
                {title && (
                  <Typography
                    domtype="h4"
                    content={title}
                    classname="tw:lg:order-2"
                  />
                )}
                {tag && (
                  <Tag
                    label={tag}
                    icon={null}
                    classname="tw:uppercase tw:text-lg tw:lg:text-xl tw:py-1 tw:px-1 tw:rounded-lg tw:lg:order-1"
                  />
                )}
                {tradeclub && (
                  <div className="tw:rounded-lg tw:bg-blue-600 tw:p-2">
                    <Icons.localBar />
                  </div>
                )}
              </div>

              {description && (
                <Typography
                  classname={cn(
                    'tw:text-13 tw:lg:text-lg tw:xl:max-w-[840px] tw:text-pretty',
                    cta ? 'tw:mt-2 tw:lg:mt-3' : 'tw:mt-5 tw:lg:mt-3',
                    descriptionclassname,
                  )}
                >
                  {description}
                </Typography>
              )}
            </header>

            {((shownavigation && desktopstyle === 'carousel') || cta) && (
              <div className="tw:flex tw:items-center tw:justify-between tw:space-x-3 tw:lg:gap-3">
                {cta && (
                  <Button
                    label={cta}
                    href={href}
                    variant="secondary"
                    classname="tw:mt-5 tw:lg:mt-0 tw:mx-5 tw:lg:mx-0"
                  />
                )}
                {shownavigation && desktopstyle && navigationButtons}
              </div>
            )}
          </div>
        </div>
      ) : null}

      {isMobile ? (
        <Carousel
          items={children}
          options={carouseloptions}
          externalnavigation={setNavigationHandlers}
          aligncontent={aligncontent}
          onslidechange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        />
      ) : desktopstyle === 'grid' ? (
        <div
          className={cn(
            'tw:mt-8 tw:grid tw:gap-4',
            gridClass,
            desktopgridclassname,
          )}
        >
          {children}
        </div>
      ) : desktopstyle === 'list' ? (
        <div className="tw:flex tw:flex-col tw:space-y-3">{children}</div>
      ) : (
        <Carousel
          title={title}
          items={children}
          options={carouseloptions}
          externalnavigation={setNavigationHandlers}
          aligncontent={aligncontent}
          onslidechange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        />
      )}
    </div>
  );
};

export default RailSection;
