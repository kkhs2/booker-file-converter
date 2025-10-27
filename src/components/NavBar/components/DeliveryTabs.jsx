import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import Icons from '../../Icons/Icons';
import { cn } from '../../../../utils/helpers';

/**
 * DeliveryTabs Component
 *
 * @description Displays delivery options with tabs for collection and delivery methods
 *
 * @param {Object} props - Component props
 * @param {string} [props.initialactiveitem='collect'] - Initial active tab ('collect' or 'delivery')
 * @param {string} props.collectlabel - Label for collection tab
 * @param {string} props.deliverylabel - Label for delivery tab
 * @param {string} props.collectlocation - Collection location name
 * @param {string} props.collectprice - Price for collection
 * @param {string} props.deliveryprice - Price for delivery
 * @param {number} props.collectcount - Number of items for collection
 * @param {number} props.deliverycount - Number of items for delivery
 * @param {string} props.deliverylocation - Delivery location name
 * @param {Function} props.onlocationchange - Callback when location change button is clicked
 * @param {boolean} [props.nodelivery=false] - If true, don't toggle to the delivery tab
 * @param {boolean} [props.nocollect=false] - If true, don't toggle to the collect tab
 * @param {boolean} [props.browse=false] - If true, shows the browse tab
 * @param {boolean} [props.nodeliverytoggle=false] - If true, shows delivery as simple link without toggle functionality
 * @param {boolean} [props.nocollecttoggle=false] - If true, shows collect as simple link without toggle functionality
 * @param {Function} props.onclickcollectaction - Callback when collect action is clicked
 * @param {Function} props.onclickdeliveryaction - Callback when delivery action is clicked
 * @param {Function} props.onbrowseaction - Callback when the browse tab is selected
 * @param {string} [props.classname] - Additional classes to add to the component
 * @param {boolean} [props.hasnotification] - Whether there is a notification or not
 * @param {boolean} [props.nobasket=false] - If true, hides the basket icon
 * @param {Function} [props.ontabchange] - Callback when the active tab changes
 * @returns {JSX.Element} DeliveryTabs component
 */

export const DeliveryTabs = ({
  initialactiveitem,
  collectlabel,
  deliverylabel,
  collectlocation,
  collectprice,
  deliveryprice,
  collectcount = 0,
  deliverycount,
  onlocationchange,
  nodelivery = false,
  nocollect = false,
  nodeliverytoggle = false,
  nocollecttoggle = false,
  browse = false,
  onclickcollectaction,
  onclickdeliveryaction,
  onbrowseaction,
  hasnotification,
  nobasket,
  ontabchange,
}) => {
  const instanceId = Math.random().toString(36);
  const hasCollectInformation = collectlabel && collectlocation && collectprice;
  const hasDeliveryInformation = deliverylabel && deliveryprice;

  // Determine the default active item based on props
  let defaultActiveItem = 'collect'; // Default to collect
  if (nocollect && !nodelivery) {
    defaultActiveItem = 'delivery';
  } else if (nodelivery && !nocollect) {
    defaultActiveItem = 'collect';
  } else if (initialactiveitem) {
    defaultActiveItem = initialactiveitem;
  } else if (browse) {
    defaultActiveItem = 'delivery';
  } else if (!hasCollectInformation && hasDeliveryInformation) {
    defaultActiveItem = 'delivery';
  } else if (!nocollecttoggle) {
    defaultActiveItem = 'collect';
  } else if (!nodeliverytoggle) {
    defaultActiveItem = 'delivery';
  }

  const [activeItem, setActiveItem] = useState(defaultActiveItem);

  const handleTabChange = (tab) => {
    // Only allow tab change if both options are available
    if (!nodelivery && !nocollect && !nocollecttoggle && !nodeliverytoggle) {
      if (ontabchange) {
        ontabchange(tab);
      }

      // If browse mode and user selects the collect tab, trigger onbrowseaction
      if (browse && tab === 'collect' && onbrowseaction) {
        onbrowseaction();
      }
      setActiveItem(tab);
    }
  };

  // If nodelivery is true, force activeItem to 'collect' if not in browse mode
  // If nocollect is true, force activeItem to 'delivery' if not in browse mode
  // This ensures the single visible tab is always "active"
  let currentActiveItem = activeItem;
  if (nodelivery && !nocollect && !browse && !nocollecttoggle) {
    currentActiveItem = 'collect';
  } else if (nocollect && !nodelivery && !browse && !nodeliverytoggle) {
    currentActiveItem = 'delivery';
  }

  return (
    <div
      className={cn(
        'tw:group:min-h-[54px] tw:relative tw:flex tw:min-h-[58px] tw:items-center tw:justify-between tw:gap-2 tw:overflow-hidden tw:rounded-[120px] tw:border tw:border-black-200 tw:bg-white tw:p-1 tw:lg:min-h-[52px]',
        nodelivery &&
          !nocollect &&
          'tw:group tw:w-auto tw:justify-end tw:border-0 tw:bg-transparent',
        nocollect &&
          !nodelivery &&
          'tw:group tw:w-auto tw:justify-end tw:border-0 tw:bg-transparent',
        nodeliverytoggle && 'tw:border-0 tw:bg-transparent tw:lg:w-[404px]',
        nocollecttoggle && 'tw:border-0 tw:bg-transparent',
        hasnotification && 'tw:mt-[109px] tw:lg:mt-0',
        !hasnotification && 'tw:mt-[60px] tw:lg:mt-0',
      )}
    >
      {nodeliverytoggle && !nocollect && !browse && (
        <>
          <div
            className={cn(
              'tw:relative tw:flex',
              currentActiveItem === 'collect' && 'tw:w-full',
            )}
          >
            <button
              className={cn(
                'tw:w-full tw:shrink-0 tw:cursor-pointer tw:rounded-[40px] tw:px-4 tw:py-0 tw:text-base',
                'tw:underline tw:decoration-dotted tw:decoration-1 tw:underline-offset-[4px] tw:transition-all tw:duration-100 tw:ease-in-out',
              )}
              onClick={() => onclickdeliveryaction && onclickdeliveryaction()}
            >
              {deliverylabel}
            </button>
          </div>

          <div className={cn('tw:relative tw:flex')}>
            <div
              className={cn(
                'tw:group:min-h-[54px] tw:absolute tw:top-0 tw:left-0 tw:flex tw:min-h-[58px] tw:w-full tw:items-center tw:justify-center tw:gap-x-2 tw:rounded-[40px] tw:bg-black tw:px-6 tw:py-0 tw:text-base tw:text-white tw:max-lg:flex-col-reverse tw:lg:min-h-[52px]',
                'tw:visible tw:relative tw:origin-left tw:scale-x-100 tw:transform tw:opacity-100 tw:transition-all tw:duration-100 tw:ease-in-out tw:max-lg:flex-col-reverse',
              )}
            >
              <button
                className="tw:flex tw:cursor-pointer tw:items-center tw:text-base tw:transition-colors tw:duration-200"
                onClick={() => onlocationchange()}
                aria-label="Change location"
                title={`Change location to ${collectlocation}`}
              >
                <span className="tw:flex tw:items-center tw:space-x-1 tw:text-white tw:lg:max-w-full">
                  <span className="tw:max-w-[199px] tw:truncate tw:text-ellipsis tw:underline tw:decoration-dotted tw:decoration-1 tw:underline-offset-[4px]">
                    {collectlocation}
                  </span>
                </span>

                <Icons.chevronRight classname="tw:rotate-90 tw:w-3 tw:h-3 tw:transition-transform tw:duration-200" />
              </button>

              {!nobasket ? (
                <button
                  onClick={() => onclickcollectaction()}
                  className="tw:flex tw:cursor-pointer tw:items-center tw:space-x-2 tw:rounded-[40px] tw:px-2 tw:text-white tw:transition-colors tw:duration-200 tw:hover:bg-secondary-1000 tw:hover:text-black tw:lg:py-1"
                >
                  <span className="tw:font-bold">{collectprice}</span>

                  <span className="tw:flex tw:items-center tw:justify-center tw:rounded-full tw:bg-primary tw:px-2 tw:py-1 tw:text-[11px] tw:font-bold tw:text-white">
                    {collectcount}
                  </span>
                </button>
              ) : (
                <span className="tw:block tw:h-7.5"></span>
              )}
            </div>
          </div>
        </>
      )}

      {nocollecttoggle && !nocollect && !browse && (
        <>
          <div className={cn('tw:relative')}>
            <button
              className={cn(
                'tw:w-full tw:shrink-0 tw:cursor-pointer tw:rounded-[40px] tw:px-4 tw:py-0 tw:text-base',
                'tw:underline tw:decoration-dotted tw:decoration-1 tw:underline-offset-[4px] tw:transition-all tw:duration-100 tw:ease-in-out',
              )}
              onClick={() => onclickcollectaction && onclickcollectaction()}
            >
              {collectlabel}
            </button>
          </div>

          <div
            className={cn(
              'tw:group:min-h-[54px] tw:visible tw:relative tw:top-0 tw:left-0 tw:flex tw:min-h-[58px] tw:origin-right tw:scale-x-100 tw:transform tw:items-center tw:justify-center tw:space-x-2 tw:rounded-[40px] tw:bg-black tw:px-6 tw:py-0 tw:text-base tw:text-white tw:opacity-100 tw:transition-all tw:duration-100 tw:ease-in-out tw:max-lg:flex-col-reverse tw:lg:min-h-[52px]',
            )}
          >
            <div className="tw:flex tw:items-center tw:space-x-1">
              <Icons.truck classname="tw:h-4 tw:w-4 " />
              <span>{deliverylabel}</span>
            </div>
            <button
              onClick={() => onclickcollectaction()}
              className="tw:flex tw:cursor-pointer tw:items-center tw:space-x-2 tw:rounded-[40px] tw:px-2 tw:text-white tw:transition-colors tw:duration-200 tw:hover:bg-secondary-1000 tw:hover:text-black tw:lg:py-1"
            >
              <span className="tw:font-bold">{deliveryprice}</span>
              <span className="tw:flex tw:items-center tw:justify-center tw:rounded-full tw:bg-primary tw:px-2 tw:py-1 tw:text-[11px] tw:font-bold tw:text-white">
                {deliverycount}
              </span>
            </button>
          </div>
        </>
      )}

      {nodelivery &&
        !nocollect &&
        !browse &&
        !nodeliverytoggle &&
        !nocollecttoggle && (
          // Only Collect option
          <div className="tw:relative tw:flex tw:items-center">
            <div
              className={cn(
                'tw:group:min-h-[54px] tw:flex tw:min-h-[58px] tw:w-full tw:items-center tw:justify-center tw:space-x-2 tw:rounded-[40px] tw:bg-black tw:px-6 tw:py-0 tw:text-base tw:text-white tw:lg:min-h-[52px]',
              )}
            >
              <button
                className="tw:flex tw:cursor-pointer tw:items-center tw:text-base tw:transition-colors tw:duration-200"
                onClick={() => onlocationchange && onlocationchange()}
                aria-label="Change location"
                title={`Change location to ${collectlocation}`}
              >
                <span className="tw:flex tw:items-center tw:space-x-1 tw:text-white tw:lg:max-w-full">
                  <Icons.cart
                    classname="tw:mr-2 tw:h-4 tw:w-4 tw:text-white"
                    uniqueId={`${instanceId}-3`}
                  />
                  <span className="tw:max-w-[99px] tw:truncate tw:text-ellipsis tw:underline tw:decoration-dotted tw:decoration-1 tw:underline-offset-[4px]">
                    {collectlocation}
                  </span>
                </span>
                <Icons.chevronRight classname="tw:rotate-90 tw:w-3 tw:h-3 tw:transition-transform tw:duration-200" />
              </button>

              {!nobasket ? (
                <button
                  onClick={() => onclickcollectaction && onclickcollectaction()}
                  className="tw:flex tw:cursor-pointer tw:items-center tw:space-x-2 tw:rounded-[40px] tw:px-2 tw:text-white tw:transition-colors tw:duration-200 tw:hover:bg-secondary-1000 tw:hover:text-black tw:lg:py-1"
                >
                  <span className="tw:font-bold">{collectprice}</span>
                  <span className="tw:flex tw:items-center tw:justify-center tw:rounded-full tw:bg-primary tw:px-2 tw:py-1 tw:text-[11px] tw:font-bold tw:text-white">
                    {collectcount}
                  </span>
                </button>
              ) : (
                <span className="tw:block tw:h-7.5"></span>
              )}
            </div>
          </div>
        )}

      {nocollect &&
        !nodelivery &&
        !browse &&
        !nodeliverytoggle &&
        !nocollecttoggle && (
          // Only Delivery option
          <div className="tw:relative tw:flex tw:items-center">
            <div
              className={cn(
                'tw:group:min-h-[54px] tw:flex tw:min-h-[58px] tw:w-full tw:items-center tw:justify-center tw:space-x-2 tw:rounded-[40px] tw:bg-black tw:px-6 tw:py-0 tw:text-base tw:text-white tw:lg:min-h-[52px]',
              )}
            >
              <Icons.truck classname="tw:h-4 tw:w-4 tw:hidden tw:lg:block group-hover:tw:text-black" />
              <span>{deliverylabel}</span>
              <button
                onClick={() => onclickdeliveryaction && onclickdeliveryaction()}
                className="tw:group tw:flex tw:cursor-pointer tw:items-center tw:space-x-2 tw:rounded-[40px] tw:px-2 tw:text-white tw:transition-colors tw:duration-200 tw:hover:bg-secondary-1000 tw:hover:text-black tw:lg:py-1"
              >
                <span className="tw:font-bold">{deliveryprice}</span>
                <span className="tw:flex tw:items-center tw:justify-center tw:rounded-full tw:bg-primary tw:px-2 tw:py-1 tw:text-[11px] tw:font-bold tw:text-white">
                  {deliverycount}
                </span>
              </button>
            </div>
          </div>
        )}

      {!nodelivery && !nocollect && !nodeliverytoggle && !nocollecttoggle && (
        <>
          {hasCollectInformation && !browse && (
            <div
              className={cn(
                'tw:relative tw:flex tw:flex-grow',
                currentActiveItem === 'collect' && 'tw:w-full',
                currentActiveItem === 'delivery' && 'tw:shrink-0',
              )}
            >
              <button
                className={cn(
                  'tw:flex tw:w-full tw:shrink-0 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-[40px] tw:px-4 tw:py-0 tw:text-base tw:transition-all tw:duration-100 tw:ease-in-out',
                  currentActiveItem === 'collect'
                    ? 'tw:invisible tw:absolute tw:opacity-0'
                    : 'tw:visible tw:relative tw:opacity-100',
                )}
                onClick={() => handleTabChange('collect')}
              >
                <Icons.cart
                  classname="tw:mr-2 tw:h-4 tw:w-4"
                  uniqueId={`${instanceId}-1`}
                />
                {collectlabel}
              </button>

              <div
                className={cn(
                  'tw:group:min-h-[54px] tw:absolute tw:top-0 tw:left-0 tw:flex tw:min-h-[58px] tw:w-full tw:items-center tw:justify-center tw:rounded-[40px] tw:bg-black tw:px-6 tw:py-0 tw:text-base tw:text-white tw:max-lg:flex-col-reverse tw:lg:min-h-[52px] tw:lg:space-x-2',
                  'tw:transform tw:transition-all tw:duration-100 tw:ease-in-out',
                  currentActiveItem === 'collect'
                    ? 'tw:visible tw:relative tw:origin-left tw:scale-x-100 tw:opacity-100'
                    : 'tw:invisible tw:origin-left tw:scale-x-0 tw:opacity-0',
                )}
              >
                <button
                  className="tw:flex tw:cursor-pointer tw:items-center tw:justify-start tw:text-base tw:transition-colors tw:duration-200 tw:lg:max-w-full"
                  onClick={() => onlocationchange()}
                  aria-label="Change location"
                  title={`Change location to ${collectlocation}`}
                >
                  <Icons.cart
                    classname="tw:mr-2 tw:h-4 tw:w-4 tw:text-white"
                    uniqueId={`${instanceId}-2`}
                  />
                  <span className="tw:max-w-[99px] tw:truncate tw:text-ellipsis tw:underline tw:decoration-dotted tw:decoration-1 tw:underline-offset-[4px]">
                    {collectlocation}
                  </span>
                  <Icons.chevronRight classname="tw:rotate-90 tw:w-3 tw:h-3 tw:transition-transform tw:duration-200" />
                </button>

                {!nobasket ? (
                  <button
                    onClick={() => onclickcollectaction()}
                    className="tw:flex tw:cursor-pointer tw:items-center tw:space-x-2 tw:rounded-[40px] tw:px-2 tw:text-white tw:transition-colors tw:duration-200 tw:hover:bg-secondary-1000 tw:hover:text-black tw:lg:py-1"
                  >
                    <span className="tw:font-bold">{collectprice}</span>

                    <span className="tw:flex tw:items-center tw:justify-center tw:rounded-full tw:bg-primary tw:px-2 tw:py-1 tw:text-[11px] tw:font-bold tw:text-white">
                      {collectcount}
                    </span>
                  </button>
                ) : (
                  <span className="tw:block tw:h-7.5"></span>
                )}
              </div>
            </div>
          )}

          {hasCollectInformation && browse && (
            <div
              className={cn(
                'tw:relative tw:flex',
                currentActiveItem === 'delivery' && 'tw:shrink-0 tw:flex-grow',
              )}
            >
              <button
                className={cn(
                  'tw:w-full tw:shrink-0 tw:cursor-pointer tw:rounded-[40px] tw:px-4 tw:py-0 tw:text-base',
                  'tw:transition-all tw:duration-100 tw:ease-in-out',
                  currentActiveItem === 'collect'
                    ? 'tw:invisible tw:absolute tw:opacity-0'
                    : 'tw:visible tw:relative tw:opacity-100',
                )}
                onClick={() => handleTabChange('collect')}
              >
                {collectlabel}
              </button>
              <div
                className={cn(
                  'tw:group:min-h-[54px] tw:absolute tw:top-0 tw:left-0 tw:flex tw:min-h-[58px] tw:w-full tw:items-center tw:justify-center tw:space-x-2 tw:rounded-[40px] tw:bg-black tw:px-6 tw:py-0 tw:text-base tw:text-white tw:lg:min-h-[52px]',
                  'tw:min-w-max tw:transform tw:transition-all tw:duration-100 tw:ease-in-out',
                  currentActiveItem === 'collect'
                    ? 'tw:visible tw:relative tw:origin-left tw:scale-x-100 tw:opacity-100'
                    : 'tw:invisible tw:origin-left tw:scale-x-0 tw:opacity-0',
                )}
              >
                <span className="tw:shrink-0">
                  Browse{' '}
                  <span className="tw:hidden tw:lg:inline-block">range in</span>{' '}
                </span>

                <button
                  className="tw:flex tw:cursor-pointer tw:items-center tw:text-base tw:transition-colors tw:duration-200"
                  onClick={() => onlocationchange()}
                  aria-label="Change location"
                  title={`Change location to ${collectlocation}`}
                >
                  <span className="tw:flex tw:items-center tw:space-x-1 tw:text-white tw:lg:max-w-full">
                    <span className="tw:max-w-[99px] tw:truncate tw:text-ellipsis tw:underline tw:decoration-dotted tw:decoration-1 tw:underline-offset-[4px]">
                      {collectlocation}
                    </span>
                  </span>

                  <Icons.chevronRight classname="tw:rotate-90 tw:w-3 tw:h-3 tw:transition-transform tw:duration-200" />
                </button>
              </div>
            </div>
          )}

          {hasDeliveryInformation && (
            <div
              className={cn(
                'tw:relative',
                currentActiveItem === 'delivery' && 'tw:w-full',
                currentActiveItem === 'collect' && 'tw:shrink-0',
              )}
            >
              <button
                className={cn(
                  'tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-[40px] tw:px-4 tw:py-0 tw:text-base tw:transition-all tw:duration-100 tw:ease-in-out',
                  currentActiveItem === 'delivery'
                    ? 'tw:invisible tw:absolute tw:opacity-0'
                    : 'tw:visible tw:relative tw:opacity-100',
                )}
                onClick={() => handleTabChange('delivery')}
              >
                <Icons.truck classname="tw:mr-2 tw:h-4 tw:w-4" />
                {deliverylabel}
              </button>

              <div
                className={cn(
                  'tw:group:min-h-[54px] tw:absolute tw:top-0 tw:left-0 tw:flex tw:min-h-[58px] tw:items-center tw:justify-center tw:rounded-[40px] tw:bg-black tw:px-6 tw:py-0 tw:text-base tw:text-white tw:max-lg:flex-col-reverse tw:lg:min-h-[52px] tw:lg:space-x-2',
                  'tw:transform tw:transition-all tw:duration-100 tw:ease-in-out',
                  currentActiveItem === 'delivery'
                    ? 'tw:visible tw:relative tw:origin-right tw:scale-x-100 tw:opacity-100'
                    : 'tw:invisible tw:origin-right tw:scale-x-0 tw:opacity-0',
                )}
              >
                <span className="tw:flex tw:items-center tw:space-x-1">
                  <Icons.truck classname="tw:h-4 tw:w-4 tw:mr-2 " />
                  <span>{deliverylabel}</span>
                </span>

                <button
                  onClick={() => onclickdeliveryaction()}
                  className="tw:group tw:flex tw:cursor-pointer tw:items-center tw:space-x-2 tw:rounded-[40px] tw:px-2 tw:text-white tw:transition-colors tw:duration-200 tw:hover:bg-secondary-1000 tw:hover:text-black tw:lg:py-1"
                >
                  <span className="tw:font-bold">{deliveryprice}</span>

                  <span className="tw:flex tw:items-center tw:justify-center tw:rounded-full tw:bg-primary tw:px-2 tw:py-1 tw:text-[11px] tw:font-bold tw:text-white">
                    {deliverycount}
                  </span>
                </button>
              </div>
            </div>
          )}

          {!hasDeliveryInformation && browse && (
            <div
              className={cn(
                'tw:relative',
                currentActiveItem === 'collect' && 'tw:shrink-0 tw:flex-grow',
                currentActiveItem === 'delivery' && 'tw:w-full tw:max-w-fit',
              )}
            >
              <button
                className={cn(
                  'tw:w-full tw:cursor-pointer tw:rounded-[40px] tw:px-4 tw:py-0 tw:text-base',
                  'tw:transition-all tw:duration-100 tw:ease-in-out',
                  currentActiveItem === 'delivery'
                    ? 'tw:invisible tw:absolute tw:opacity-0'
                    : 'tw:visible tw:relative tw:opacity-100',
                )}
                onClick={() => handleTabChange('delivery')}
              >
                {deliverylabel}
              </button>
              <div
                className={cn(
                  'tw:group:min-h-[54px] tw:absolute tw:top-0 tw:-left-1 tw:flex tw:min-h-[58px] tw:items-center tw:justify-center tw:space-x-2 tw:rounded-[40px] tw:bg-black tw:px-6 tw:py-[13.5px] tw:text-base tw:text-white tw:lg:min-h-[52px]',
                  'tw:transform tw:transition-all tw:duration-100 tw:ease-in-out',
                  currentActiveItem === 'delivery'
                    ? 'tw:visible tw:relative tw:origin-right tw:scale-x-100 tw:opacity-100'
                    : 'tw:invisible tw:origin-right tw:scale-x-0 tw:opacity-0',
                )}
              >
                <Icons.checkMark
                  classname="tw:h-4 tw:w-4 tw:text-white tw:hidden tw:lg:block"
                  stroke="white"
                />
                <span className="tw:flex tw:space-x-1">
                  <span>Shop online</span>
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
