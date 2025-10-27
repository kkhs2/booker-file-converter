import { h, Fragment } from 'preact';
import { cn, useMediaQuery } from '../../../utils/helpers';
import Icons from '../Icons/Icons';
import Typography from '../Typography/Typography';

/**
 * Mobile Delivery Card Component
 * Renders a compact horizontal delivery card for mobile layout
 */
const MobileDeliveryCard = ({ delivery }) => {
  if (!delivery || delivery.status === 'empty') {
    return null;
  }

  const cardBaseClasses =
    'tw:h-[76px] tw:w-full tw:rounded-xl tw:p-3 tw:flex tw:items-center tw:gap-4';

  switch (delivery.status) {
    case 'arrived':
      return (
        <div className={cn(cardBaseClasses, 'tw:bg-secondary-1100')}>
          <Icons.checkCircle className="tw:h-8 tw:w-8 tw:shrink-0 tw:text-primary" />
          <div className="tw:flex-1">
            <Typography classname="tw:text-[13px] tw:font-medium tw:text-black tw:leading-[1.4] tw:whitespace-nowrap">
              Arrived at {delivery.time}
            </Typography>
          </div>
          <div className="tw:flex tw:shrink-0 tw:items-center tw:justify-center">
            <Icons.graphicDelivery className="tw:h-[52px] tw:w-[52px]" />
          </div>
        </div>
      );

    case 'ontheway':
      return (
        <div
          className={cn(
            cardBaseClasses,
            'tw:border tw:border-primary tw:bg-primary',
          )}
        >
          <Icons.truck className="tw:h-8 tw:w-8 tw:shrink-0 tw:text-white" />
          <div className="tw:flex-1">
            <Typography classname="tw:text-lg tw:font-medium tw:text-white tw:leading-[1.2] tw:whitespace-nowrap">
              We're on our way ...
            </Typography>
            <div className="tw:flex tw:items-baseline tw:gap-1">
              <Typography classname="tw:text-[13px] tw:font-medium tw:text-white tw:leading-[1.4] tw:whitespace-nowrap">
                Est. arrival:
              </Typography>
              <Typography classname="tw:text-base tw:font-bold tw:text-white tw:leading-none tw:whitespace-nowrap">
                {delivery.time}
              </Typography>
            </div>
          </div>
          <div className="tw:flex tw:shrink-0 tw:items-center tw:justify-center">
            <Icons.graphicDelivery className="tw:h-[52px] tw:w-[52px]" />
          </div>
        </div>
      );

    case 'estimated':
      return (
        <div
          className={cn(
            cardBaseClasses,
            'tw:border tw:border-black tw:bg-white',
          )}
        >
          <Icons.clock className="tw:h-8 tw:w-8 tw:shrink-0 tw:text-black" />
          <div className="tw:flex-1">
            <div className="tw:flex tw:items-baseline tw:gap-1">
              <Typography classname="tw:text-[13px] tw:font-medium tw:text-black tw:leading-[1.4] tw:whitespace-nowrap">
                Est. arrival:
              </Typography>
              <Typography classname="tw:text-base tw:font-bold tw:text-black tw:leading-none tw:whitespace-nowrap">
                {delivery.time}
              </Typography>
            </div>
          </div>
          <div className="tw:flex tw:shrink-0 tw:items-center tw:justify-center">
            <Icons.graphicDelivery className="tw:h-[52px] tw:w-[52px]" />
          </div>
        </div>
      );

    case 'issue':
      return (
        <div
          className={cn(
            cardBaseClasses,
            'tw:border tw:border-red-700 tw:bg-primary-50',
          )}
        >
          <Icons.alertCircle className="tw:h-8 tw:w-8 tw:shrink-0 tw:text-red-700" />
          <div className="tw:flex-1">
            <Typography classname="tw:text-[13px] tw:font-medium tw:text-red-700 tw:leading-[1.4] tw:w-full">
              Problem with your delivery
            </Typography>
            <Typography classname="tw:text-[13px] tw:font-bold tw:text-red-700 tw:leading-[1.25] tw:h-[18px] tw:w-full">
              Please contact your delivery branch.
            </Typography>
          </div>
        </div>
      );

    case 'waiting':
      return (
        <div
          className={cn(
            cardBaseClasses,
            'tw:border tw:border-secondary-1100 tw:bg-white',
          )}
        >
          <Icons.clock className="tw:h-8 tw:w-8 tw:shrink-0 tw:text-black-300" />
          <div className="tw:flex-1">
            <Typography classname="tw:text-[13px] tw:font-medium tw:text-grey-600 tw:leading-[1.4] tw:whitespace-nowrap">
              Awaiting est. arrival time...
            </Typography>
          </div>
          <div className="tw:flex tw:shrink-0 tw:items-center tw:justify-center">
            <Icons.graphicDelivery className="tw:h-[52px] tw:w-[52px]" />
          </div>
        </div>
      );

    default:
      return null;
  }
};

/**
 * Individual Delivery Card Component
 * Renders a single delivery card with status-specific styling
 */
const DeliveryCard = ({ delivery }) => {
  if (!delivery || delivery.status === 'empty') {
    return <div className="tw:min-h-36 tw:w-full tw:rounded-xl tw:bg-white" />;
  }

  const cardBaseClasses =
    'tw:min-h-36 tw:w-full tw:rounded-xl tw:p-3 tw:flex tw:flex-col tw:gap-4';

  switch (delivery.status) {
    case 'arrived':
      return (
        <div className={cn(cardBaseClasses, 'tw:bg-secondary-1100')}>
          <div className="tw:flex tw:items-start tw:gap-2">
            <Icons.checkCircle className="tw:h-6 tw:w-6 tw:text-primary" />
            <div className="tw:flex-1">
              <Typography classname="tw:text-base tw:font-medium tw:text-black tw:leading-[1.4]">
                Arrived at {delivery.time}
              </Typography>
            </div>
          </div>
          <div className="tw:mt-auto tw:flex tw:justify-end">
            <Icons.graphicDelivery className="tw:h-16 tw:w-16" />
          </div>
        </div>
      );

    case 'ontheway':
      return (
        <div
          className={cn(
            cardBaseClasses,
            'tw:border tw:border-primary tw:bg-primary',
          )}
        >
          <div className="tw:flex tw:items-start tw:gap-3">
            <Icons.truck className="tw:h-6 tw:w-6 tw:text-white" />
            <div className="tw:flex-1">
              <Typography classname="tw:text-base tw:font-medium tw:text-white tw:leading-[1.4]">
                Est. arrival
              </Typography>
              <Typography classname="tw:text-base tw:font-bold tw:text-white tw:leading-none">
                {delivery.time}
              </Typography>
            </div>
          </div>
          <div className="tw:mt-auto tw:flex tw:items-start tw:justify-between tw:gap-1">
            <Typography classname="tw:text-lg tw:font-medium tw:text-balance tw:text-white tw:leading-[1.2]">
              We're on our way...
            </Typography>
            <Icons.graphicDelivery className="tw:h-16 tw:w-16 tw:shrink-0" />
          </div>
        </div>
      );

    case 'estimated':
      return (
        <div
          className={cn(
            cardBaseClasses,
            'tw:border tw:border-black tw:bg-white',
            'tw:shadow-[4px_4px_10px_-24px_rgba(0,0,0,0.03)]',
          )}
        >
          <div className="tw:flex tw:items-start tw:gap-3">
            <Icons.clock className="tw:h-6 tw:w-6 tw:text-black" />
            <div className="tw:flex-1">
              <Typography classname="tw:text-base tw:font-medium tw:text-black tw:leading-[1.4]">
                Est. arrival
              </Typography>
              <Typography classname="tw:text-base tw:font-bold tw:text-black tw:leading-none">
                {delivery.time}
              </Typography>
            </div>
          </div>
          <div className="tw:mt-auto tw:flex tw:justify-end">
            <Icons.graphicDelivery className="tw:h-16 tw:w-16" />
          </div>
        </div>
      );

    case 'issue':
      return (
        <div
          className={cn(
            cardBaseClasses,
            'tw:border tw:border-red-700 tw:bg-primary-50',
          )}
        >
          <div className="tw:flex tw:items-start tw:gap-2">
            <Icons.alertCircle className="tw:h-6 tw:w-6 tw:shrink-0 tw:text-red-700" />
            <Typography classname="tw:text-base tw:font-medium tw:text-red-700 tw:leading-[1.4]">
              Problem with your delivery
            </Typography>
          </div>
          <div className="tw:mt-auto tw:flex tw:justify-center">
            <Typography classname="tw:text-base tw:font-bold tw:text-red-700 tw:text-center tw:leading-[1.25]">
              Please contact your local delivery branch.
            </Typography>
          </div>
        </div>
      );

    case 'waiting':
      return (
        <div
          className={cn(
            cardBaseClasses,
            'tw:border tw:border-secondary-1100 tw:bg-white',
          )}
        >
          <div className="tw:flex tw:items-start tw:gap-3">
            <Icons.clock className="tw:h-6 tw:w-6 tw:text-black" />
            <div className="tw:flex-1">
              <Typography classname="tw:text-base tw:font-medium tw:text-grey-600 tw:leading-[1.4]">
                Awaiting est. arrival time...
              </Typography>
            </div>
          </div>
          <div className="tw:mt-auto tw:flex tw:justify-end">
            <Icons.graphicDelivery className="tw:h-16 tw:w-16" />
          </div>
        </div>
      );

    default:
      return (
        <div className="tw:min-h-36 tw:w-full tw:rounded-xl tw:bg-white" />
      );
  }
};

/**
 * DeliveryTracker Component
 * Displays a weekly delivery tracking interface with responsive layouts:
 * - Desktop: Column-based with AM/PM time slots for each day
 * - Mobile: Vertical stacked list of delivery cards grouped by day
 *
 * @param {Object} props - Component props
 * @param {Array} props.deliveries - Array of delivery objects for each day
 * Each object should contain:
 * - day: string (e.g., 'Sunday', 'Monday', etc.)
 * - am: object (optional, delivery object for AM slot) - Desktop only
 * - pm: object (optional, delivery object for PM slot) - Desktop only
 * - cards: array (optional, array of delivery objects) - Mobile format
 * Each delivery object can contain:
 * - status: string (e.g., 'arrived', 'ontheway', 'estimated', 'waiting', 'issue', 'empty')
 * - time: string (optional, e.g., '12:12pm')
 * - message: string (optional, e.g., 'Arrived at', 'Estimated arrival')
 * @param {string} props.weekcommencing - Week commencing date (e.g., '11/05/2025')
 * @param {string} props.classname - Additional CSS classes
 * @returns {JSX.Element} - The DeliveryTracker component
 */

const DeliveryTracker = ({
  deliveries,
  weekcommencing,
  classname = '',
  ...props
}) => {
  const isMobile = useMediaQuery('(max-width: 1313px)');
  // Function to convert AM/PM format to mobile cards format
  const convertToMobileFormat = (dayData) => {
    const cards = [];
    if (dayData.am) cards.push(dayData.am);
    if (dayData.pm) cards.push(dayData.pm);
    return {
      day: dayData.day,
      cards: dayData.cards || cards,
    };
  };

  const mobileDeliveries = deliveries.map(convertToMobileFormat);

  return (
    <Fragment>
      {/* Desktop Layout */}

      {isMobile ? (
        <div
          className={cn('tw:flex tw:flex-col tw:gap-6 tw:py-0', classname)}
          {...props}
        >
          {weekcommencing && (
            <div className="tw:flex tw:w-full tw:items-center tw:gap-3">
              <Typography classname="tw:text-base tw:font-medium tw:text-black tw:leading-[1.2] tw:flex-1">
                Your upcoming deliveries for the week commencing:
              </Typography>
              <div className="tw:flex tw:shrink-0 tw:items-center tw:justify-center tw:rounded-lg tw:border tw:border-black tw:px-3 tw:py-2">
                <Typography classname="tw:text-base tw:font-bold tw:text-black tw:text-center tw:whitespace-nowrap tw:leading-[1.2]">
                  {weekcommencing}
                </Typography>
              </div>
            </div>
          )}

          {/* Days container - Mobile Stacked Layout */}
          <div className="tw:flex tw:flex-col tw:gap-3">
            {mobileDeliveries.map((dayData, index) => {
              if (!dayData.cards || dayData.cards.length === 0) {
                return (
                  <div
                    key={index}
                    className="tw:h-[76px] tw:rounded-xl tw:bg-white tw:shadow-[4px_4px_10px_-24px_rgba(0,0,0,0.03)]"
                  >
                    <div className="tw:flex tw:h-[76px] tw:flex-col tw:gap-3 tw:p-3">
                      <div className="tw:relative tw:flex tw:w-full tw:items-center tw:justify-center tw:pb-2">
                        <div className="tw:absolute tw:right-0 tw:bottom-[-2px] tw:left-0 tw:border-b tw:border-dotted tw:border-white" />
                        <Typography
                          domtype="h7"
                          classname="tw:text-base tw:font-bold tw:text-black tw:leading-[1.2] tw:text-left tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:flex-1"
                        >
                          {dayData.day}
                        </Typography>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className="tw:rounded-xl tw:bg-white tw:shadow-[4px_4px_10px_-24px_rgba(0,0,0,0.03)]"
                >
                  <div className="tw:flex tw:flex-col tw:gap-3 tw:p-3">
                    <div className="tw:relative tw:flex tw:w-full tw:items-center tw:justify-center tw:pb-2">
                      <div className="tw:absolute tw:right-0 tw:bottom-[-2px] tw:left-0 tw:border-b tw:border-dotted tw:border-white" />
                      <Typography
                        domtype="h7"
                        classname="tw:text-base tw:font-bold tw:text-black tw:leading-[1.2] tw:text-left tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:flex-1"
                      >
                        {dayData.day}
                      </Typography>
                    </div>

                    {dayData.cards.map((delivery, cardIndex) => (
                      <Fragment key={cardIndex}>
                        <MobileDeliveryCard delivery={delivery} />

                        {cardIndex < dayData.cards.length - 1 && (
                          <div className="tw:relative tw:h-0">
                            <div className="tw:absolute tw:top-[-1px] tw:right-0 tw:bottom-0 tw:left-0 tw:border tw:border-b tw:border-dotted tw:border-secondary-1100" />
                          </div>
                        )}
                      </Fragment>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          className={cn('tw:flex tw:flex-col tw:gap-10 tw:p-16', classname)}
          {...props}
        >
          {/* Header with week commencing date */}
          {weekcommencing && (
            <div className="tw:flex tw:items-center tw:gap-4">
              <Typography classname="tw:text-lg tw:font-medium tw:text-black tw:leading-[1.2] tw:whitespace-nowrap">
                Your upcoming deliveries for the week commencing:
              </Typography>
              <div className="tw:flex tw:items-center tw:justify-center tw:rounded-lg tw:border tw:border-black tw:px-3 tw:py-2">
                <Typography classname="tw:text-lg tw:font-bold tw:text-black tw:text-center tw:whitespace-nowrap tw:leading-[1.2]">
                  {weekcommencing}
                </Typography>
              </div>
            </div>
          )}

          {/* Days container - Desktop Column Layout */}
          <div className="tw:flex tw:gap-2 tw:rounded-[20px]">
            {deliveries.map((dayData, index) => (
              <div
                key={index}
                className="tw:w-[calc((100%-48px)/7)] tw:min-w-0 tw:rounded-xl tw:bg-white tw:shadow-[4px_4px_10px_-24px_rgba(0,0,0,0.03)]"
              >
                <div className="tw:flex tw:flex-col tw:gap-4 tw:p-4">
                  <div className="tw:relative tw:w-full">
                    <div className="tw:absolute tw:right-0 tw:bottom-[-2px] tw:left-0 tw:border-b tw:border-dotted tw:border-secondary-1100" />
                    <div className="tw:flex tw:items-center tw:justify-center tw:pb-4">
                      <Typography
                        domtype="h7"
                        classname="tw:text-lg tw:font-bold tw:text-black tw:leading-[1.2] tw:text-center tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap"
                      >
                        {dayData.day}
                      </Typography>
                    </div>
                  </div>

                  <DeliveryCard delivery={dayData.am} />

                  <div className="tw:relative tw:h-0">
                    <div className="tw:absolute tw:top-[-1px] tw:right-0 tw:bottom-0 tw:left-0 tw:border-b tw:border-dotted tw:border-secondary-1100" />
                  </div>

                  <DeliveryCard delivery={dayData.pm} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DeliveryTracker;
