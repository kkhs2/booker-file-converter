// Main Component
import { h, Fragment } from 'preact';
import { cn, useMediaQuery } from '../../../utils/helpers';
import { useEffect, useState } from 'preact/hooks';
import Icons from '../Icons/Icons';

import {
  ProductServings,
  ProductPricing,
  ProductActions,
  ProductAddNote,
  ProductStock,
  ProductOffer,
  ProductTags,
  ProductStorageInfo,
  ProductDeliveryInfo,
  ProductDietaryInfo,
} from '../Product';
import Button from '../Button/Button';

/**
 * Product Card Component
 *
 * @description A component that displays a product card with all the necessary information. It can be displayed in grid or list mode.
 *
 * @param {Object} props - Component props
 * @param {string} props.classname - Additional classes to add to the component
 * @param {string} props.name - Name of the product
 * @param {string} props.image - URL of the product image
 * @param {string} props.id - Unique identifier for the product
 * @param {Array} props.tags - List of product tags
 * @param {number} props.cardindex - Index of the product in the grid
 * @param {Object} props.offer - Details about any offer for the product
 * @param {string} props.availability - Availability status of the product
 * @param {string} props.url - URL to the product page
 * @param {'grid' | 'list'} props.mode - Display mode ('grid' or 'list')
 * @param {'default' | 'large'} props.mobileimagesize - Size of the product image
 * @param {boolean} props.selectable - Indicates if the product can be selected
 * @param {Object} props.hasmessage - Message information related to the product
 * @param {boolean} props.isfeaturedproduct - Indicates if the product is a featured product
 * @param {number} props.maxquantity - Maximum quantity allowed for the product
 * @param {boolean} props.showmaxquantity - Flag to show the maximum quantity of the product
 * @param {boolean} props.branchonly - Indicates if the product is only available at a branch
 * @param {function} props.onfindanotherbranchclick - Callback for finding another branch
 * @param {boolean} props.loggedout - Indicates if the user is logged out
 * @param {function} props.onaddtocart - Callback for adding the product to the cart
 * @param {function} props.onaddtowishlist - Callback for adding the product to the wishlist
 * @param {function} props.onbecomeamember - Callback for becoming a member
 * @param {function} props.onsavenote - Callback for saving a note on the product
 * @param {string} props.previouslyOrdered - Previously ordered information
 * @param {boolean} props.scannerresult - Indicates if the product is a result from a scanner
 * @param {number} props.quantity - Current quantity of the product
 * @param {Object} props.butchersnote - Information about the butcher's note
 * @param {Object} props.wishlist - Wishlist information
 * @param {boolean} props.addedtowishlist - Indicates if the product has been added to the wishlist
 * @param {Object} props.servings - Serving information for the product
 * @param {Object} props.storageinfo - Storage information for the product
 * @param {Object} props.deliveryinfo - Delivery information for the product
 * @param {Object} props.dietaryinfo - Dietary information for the product
 * @param {string} props.price - Price of the Product
 * @param {string} props.pricewithvat - Price of the Product with VAT
 * @param {string} props.priceperunit - Price per unit of the Product
 * @param {string} props.pricerpp - Recommended retail price of the Product
 * @param {string} props.pricepor - Price per order of the Product
 * @returns {JSX.Element} Preact component - The ProductCard component
 */

const ProductCard = ({ classname, ...props }) => {
  const {
    name,
    image,
    id,
    tags,
    cardindex,
    offer,
    availability = {},
    url,
    mode = 'grid',
    mobileimagesize = 'default',
    selectable,
    hasmessage,
    isfeaturedproduct = false,
    maxquantity = 999,
    showmaxquantity = false,
    branchonly = false,
    onfindanotherbranchclick = () => {},
    loggedout,
    onaddtocart = () => {},
    onaddtowishlist = () => {},
    onbecomeamember = () => {},
    onsavenote = () => {},
    previouslyOrdered,
    scannerresult = false,
  } = props;

  const [displayMode, setDisplayMode] = useState(mode || 'grid');
  const [internalQuantity, setInternalQuantity] = useState(props.quantity || 0);
  const [showButcherNote, setShowButcherNote] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const isUnavailable =
    availability &&
    availability.status === 'outOfStock' &&
    availability.alternativeaction;

  const [isChecked, setIsChecked] = useState(
    selectable ? selectable.isselected : false,
  );

  // Update display mode when screen size changes because on mobile we want to display as grid
  useEffect(() => {
    if (isMobile) {
      setDisplayMode('grid');
    } else {
      setDisplayMode(props.mode || 'grid');
    }
  }, [isMobile, props.mode]);

  useEffect(() => {
    setInternalQuantity(props.quantity || 0);
  }, [props.quantity]);

  const handleAddToCart = (qty, id) => {
    // Check if quantity is going from 0 to 1 to show butcher note
    if (internalQuantity === 0 && qty === 1) {
      setShowButcherNote(true);
    }

    setInternalQuantity(qty);

    onaddtocart({
      id,
      quantity: qty,
    });
  };

  return (
    <div
      className={cn(
        'tw:@container tw:relative tw:flex tw:flex-col tw:justify-between tw:rounded-[20px] tw:border-[1.5px] tw:border-transparent tw:bg-white tw:p-4 tw:shadow-[16px_2px_30px_-14px_rgba(0,0,0,0.20)] tw:transition-all tw:duration-300 tw:hover:shadow-[16px_2px_30px_-14px_rgba(0,0,0,0.30)]',

        classname,

        // if is grid mode
        displayMode === 'list' &&
          'tw:flex-row tw:items-stretch tw:px-4 tw:py-4 tw:lg:gap-5',

        displayMode === 'grid' && 'tw:h-full tw:pt-2 tw:pb-4 tw:lg:pb-6',

        // if is selectable and is selected
        selectable && isChecked && 'tw:border-[1.5px] tw:border-primary-500',

        // if it has a message
        hasmessage &&
          hasmessage.type === 'warning' &&
          'tw:border-[1.5px] tw:border-primary-700',
        hasmessage &&
          hasmessage.type === 'info' &&
          'tw:border-[1.5px] tw:border-blue-500',

        // if it has a message and is in list mode we need to add margin bottom
        hasmessage &&
          hasmessage.type &&
          displayMode === 'list' &&
          'tw:mb-12 tw:pb-17',

        // if is unavailable and has an alternative url
        isUnavailable && 'tw:bg-beige-1000',
        isUnavailable &&
          mode === 'grid' &&
          'tw:min-h-[420px] tw:lg:min-h-[690px]',
      )}
    >
      <div className={cn(displayMode === 'list' && 'tw:lg:w-5/8 tw:xl:w-5/6')}>
        <div
          className={cn(
            'tw:mb-2 tw:flex tw:items-center',
            displayMode === 'list' && 'tw:items-start',
            displayMode === 'grid' && 'tw:justify-between',
          )}
        >
          {selectable && (
            <label
              className={cn(
                'tw:flex tw:cursor-pointer tw:items-center tw:pt-2',
                displayMode === 'list' && 'tw:absolute tw:lg:pt-0',
              )}
            >
              <div className="tw:relative">
                <input
                  type="checkbox"
                  className="tw:sr-only"
                  checked={isChecked}
                  onChange={() => {
                    setIsChecked(!isChecked);
                    selectable.onSelected(id);
                  }}
                />
                <div
                  className={`tw:h-2 tw:w-2 tw:rounded-md tw:p-3 tw:transition-colors tw:duration-200 ${
                    isChecked ? 'tw:bg-primary-500' : 'tw:bg-grey-200'
                  }`}
                >
                  {isChecked && (
                    <div className="tw:absolute tw:inset-0 tw:flex tw:items-center tw:justify-center">
                      <Icons.checkMark classname="tw:h-4 tw:w-4 tw:text-white" />
                    </div>
                  )}
                </div>
              </div>
            </label>
          )}

          {!selectable && (
            <div
              className={cn(
                'tw:flex tw:items-center tw:gap-1',
                displayMode === 'grid' && 'tw:-ml-2',
              )}
            >
              {/* Card index badge */}
              {typeof cardindex !== 'undefined' && (
                <span
                  className={cn(
                    'tw:pointer-events-none tw:flex tw:h-6 tw:w-6 tw:items-center tw:justify-center tw:rounded-full tw:bg-secondary-1000 tw:text-xs tw:font-bold tw:text-black tw:lg:text-2xs',
                    displayMode === 'list' && 'tw:absolute tw:top-4 tw:left-4',
                  )}
                >
                  {cardindex}
                </span>
              )}
              {/* Tags */}
              {displayMode === 'grid' && tags && (
                <div>
                  <ProductTags tags={tags} />
                </div>
              )}
            </div>
          )}

          {/* product id */}
          {displayMode === 'grid' && (
            <span className="tw:flex-shrink-0 tw:py-2 tw:text-sm tw:leading-none tw:font-semibold">
              {id}
            </span>
          )}
        </div>

        <div
          className={cn(
            'tw:flex tw:flex-row tw:items-center tw:justify-start',
            displayMode === 'list' &&
              'tw:flex-row tw:items-center tw:justify-start',
            isMobile &&
              mobileimagesize === 'default' &&
              !isfeaturedproduct &&
              'tw:!flex-row tw:!items-start tw:!justify-start',

            displayMode === 'grid' &&
              'tw:flex-col tw:items-center tw:justify-between',

            isfeaturedproduct && displayMode === 'list' && 'tw:items-start',
            isfeaturedproduct &&
              displayMode === 'grid' &&
              'tw:flex-row tw:items-center tw:lg:flex-col',
          )}
        >
          {/* product image */}
          <div
            className={cn(
              'tw:mb-0 tw:flex tw:shrink-0 tw:justify-center tw:lg:mb-6',
              displayMode === 'list' &&
                'tw:mt-2 tw:mr-4 tw:h-[135px] tw:w-[135px] tw:flex-shrink-0 tw:flex-row tw:justify-center',
              displayMode === 'list' && selectable && 'tw:ml-[52px]',

              displayMode === 'grid' && 'tw:mr-4 tw:w-[100px] tw:lg:w-[200px]',

              mobileimagesize === 'large' && !isMobile && 'tw:w-[200px]',

              isfeaturedproduct && displayMode === 'list' && 'tw:mt-0',
              isfeaturedproduct &&
                displayMode === 'grid' &&
                'tw:m-0 tw:h-[114px] tw:flex-shrink-0 tw:pr-1 tw:md:pr-0 tw:lg:mt-2 tw:lg:mb-0 tw:lg:h-[200px]',
            )}
          >
            <img
              src={image}
              alt={name}
              className={cn(
                displayMode === 'list' && 'tw:h-[135px] tw:w-[135px]',
                displayMode === 'grid' &&
                  'tw:h-auto tw:w-[200px] tw:lg:h-[200px] tw:lg:w-[200px]',
                isfeaturedproduct && 'tw:h-[114px] tw:w-[100px]',
              )}
            />
          </div>

          <div
            className={cn(
              !isfeaturedproduct &&
                'tw:w-full tw:min-w-0 tw:@max-[820px]:max-w-[450px]',
              isfeaturedproduct && 'tw:w-full',
            )}
          >
            {displayMode === 'list' && !isUnavailable && (
              <div className="tw:mb-2 tw:flex tw:items-center">
                <span className="tw:flex-shrink-0 tw:pr-2 tw:text-sm tw:font-semibold">
                  {id}
                </span>
                {tags && (
                  <div>
                    <ProductTags tags={tags} />
                  </div>
                )}
              </div>
            )}

            {/* product name */}
            <h3
              className={cn(
                'tw:lg:text-lx tw:mb-3 tw:text-lg tw:leading-6 tw:font-medium tw:text-grey-800',
                isUnavailable && 'tw:relative tw:z-20 tw:text-grey-600',
              )}
            >
              <a
                href={url}
                className="tw:line-clamp-2"
                title={name}
                aria-label={`View product details for ${name}`}
              >
                {name}
              </a>
            </h3>

            {/* product sizes */}
            {props.servings && (
              <div className="tw:mb-3">
                <ProductServings data={props.servings} />
              </div>
            )}

            <div
              className={cn(
                'tw:mb-4 tw:flex tw:flex-col tw:flex-wrap tw:items-start tw:gap-2 tw:lg:flex-row',
                displayMode === 'list' && 'tw:mb-0 tw:items-center',
                displayMode === 'grid' && 'tw:justify-between',
              )}
            >
              {(props.storageinfo || props.deliveryinfo) && !isUnavailable && (
                <div
                  className={cn(
                    'tw:flex',
                    displayMode === 'list' && 'tw:flex-row',
                    displayMode === 'grid' && 'tw:flex-col',
                  )}
                >
                  {/* product storage info */}
                  {props.storageinfo && (
                    <div
                      className={cn(
                        'tw:flex tw:flex-col tw:gap-1',
                        displayMode === 'list' &&
                          'tw:flex-row tw:flex-wrap tw:items-center tw:justify-start',
                      )}
                    >
                      <ProductStorageInfo data={props.storageinfo} />
                    </div>
                  )}

                  {/* product delivery info */}
                  {props.deliveryinfo && (
                    <div
                      className={cn(
                        'tw:flex tw:flex-col tw:gap-1',
                        displayMode === 'list' &&
                          'tw:flex-row tw:flex-wrap tw:items-center tw:justify-start',
                      )}
                    >
                      <ProductDeliveryInfo data={props.deliveryinfo} />
                    </div>
                  )}
                </div>
              )}

              {/* product dietary info */}
              {props.dietaryinfo && !isUnavailable && (
                <ProductDietaryInfo data={props.dietaryinfo} />
              )}

              {scannerresult && (
                <ProductPricing
                  scannerresult={scannerresult}
                  className={
                    scannerresult &&
                    'tw:*:[&>p]:text-xl tw:**:[&>span]:!text-base'
                  }
                  price={props.price}
                  pricewithvat={props.pricewithvat}
                  priceperunit={props.priceperunit}
                  pricerpp={props.pricerpp}
                  pricepor={props.pricepor}
                />
              )}
            </div>
          </div>
        </div>
        {displayMode === 'grid' && offer && !isUnavailable && (
          <ProductOffer data={offer} mode="grid" />
        )}
      </div>

      {/* product bottom section */}
      <div
        className={cn(
          displayMode === 'list' &&
            'tw:flex tw:w-full tw:justify-end tw:space-x-4 tw:lg:w-7/12 tw:lg:space-x-[24px] tw:@max-[820px]:space-x-[18px]',
          displayMode === 'list' && isfeaturedproduct && 'tw:xl:space-x-[40px]',
          displayMode === 'grid' && 'tw:space-y-3',
        )}
      >
        {displayMode === 'list' && (
          <div className="tw:flex tw:w-full tw:flex-col tw:items-end tw:justify-between">
            {offer && (
              <div>
                <ProductOffer data={offer} mode="list" />
              </div>
            )}

            {(previouslyOrdered || availability) && (
              <div className="tw:flex tw:w-full tw:flex-col tw:items-end">
                {previouslyOrdered && (
                  <div className="tw:mb-2 tw:space-x-2 tw:rounded-full tw:bg-secondary-1100 tw:px-2 tw:py-1 tw:text-sm">
                    <span>Previously ordered</span>
                    <strong className="tw:font-semibold">
                      {previouslyOrdered}
                    </strong>
                  </div>
                )}
                {availability && (
                  <ProductStock
                    status={availability.status}
                    onclick={() =>
                      onfindanotherbranchclick({
                        image: props.image,
                        name: props.name,
                      })
                    }
                  />
                )}
              </div>
            )}
          </div>
        )}

        <div
          className={cn(
            !scannerresult && 'tw:space-y-4',

            displayMode === 'list' &&
              'tw:flex tw:w-full tw:max-w-[226px] tw:shrink-0 tw:flex-col tw:items-stretch tw:justify-between',
          )}
        >
          {isUnavailable && (
            <div
              className={cn(
                displayMode === 'grid' &&
                  'tw:relative tw:z-10 tw:flex tw:h-full tw:w-full tw:items-center tw:lg:absolute tw:lg:top-[60%] tw:lg:left-[50%] tw:lg:-translate-x-1/2 tw:lg:-translate-y-1/2 tw:lg:transform tw:lg:px-4',
                displayMode === 'list' && 'tw:w-full',
              )}
            >
              <Button
                label={availability.alternativelabel}
                variant="inverse"
                classname="tw:w-full"
                onclick={availability.alternativeaction}
                iconright={<Icons.chevronRight classname="tw:h-4 tw:w-4" />}
              />
            </div>
          )}

          {displayMode === 'grid' && !isUnavailable && props.price !== null && (
            <hr className="tw:border-t tw:border-dotted tw:border-[rgba(0,0,0,0.4)]" />
          )}

          {/* product pricing */}
          {!isUnavailable &&
            !scannerresult &&
            props.price !== null &&
            props.price !== 0 &&
            props.price !== '0' && (
              <ProductPricing
                className={displayMode === 'grid' && 'tw:mt-6'}
                price={props.price}
                pricewithvat={props.pricewithvat}
                priceperunit={props.priceperunit}
                pricerpp={props.pricerpp}
                pricepor={props.pricepor}
              />
            )}

          {/* product add note */}
          {props.butchersnote && !isUnavailable && internalQuantity >= 1 && (
            <div>
              <ProductAddNote
                {...props.butchersnote}
                onsave={onsavenote}
                autoShow={
                  showButcherNote ||
                  (internalQuantity >= 1 && !props.butchersnote.hasnote)
                }
              />
            </div>
          )}

          {displayMode === 'grid' && (previouslyOrdered || availability) && (
            <div
              className={cn(
                scannerresult
                  ? 'tw:mb-4 tw:py-3'
                  : 'tw:relative tw:z-49 tw:pt-5 tw:pb-3',
              )}
            >
              {previouslyOrdered && (
                <div className="tw:mb-3 tw:w-fit tw:space-x-2 tw:rounded-full tw:bg-secondary-1100 tw:px-2 tw:py-1 tw:text-sm">
                  <span>Previously ordered</span>
                  <strong className="tw:font-semibold">
                    {previouslyOrdered}
                  </strong>
                </div>
              )}

              {availability && (
                <ProductStock
                  classname={
                    availability.status === 'outOfStock' &&
                    'tw:justify-center tw:lg:justify-start'
                  }
                  status={availability.status}
                  onclick={() =>
                    onfindanotherbranchclick({
                      image: props.image,
                      name: props.name,
                    })
                  }
                />
              )}
            </div>
          )}

          {loggedout ? (
            <Button
              label="Become a member"
              variant="tertiary"
              size="default"
              classname="tw:w-full"
              onclick={() => onbecomeamember()}
            />
          ) : branchonly ? (
            <Button
              label="Available to purchase in branch"
              variant="tertiary"
              state="disabled"
              size="default"
              classname="tw:w-full "
            />
          ) : (
            <>
              {availability && availability.outofstocknotice && (
                <Button
                  label={availability.outofstocknotice}
                  variant="tertiary"
                  state="disabled"
                  size="default"
                  classname="tw:w-full"
                />
              )}

              {availability && availability.status === 'inStock' && (
                <ProductActions
                  id={id}
                  onaddtocart={handleAddToCart}
                  onaddtowishlist={onaddtowishlist}
                  wishlist={props.wishlist}
                  quantity={internalQuantity}
                  isonwishlist={props.addedtowishlist}
                  maxquantity={maxquantity}
                  showmaxquantity={showmaxquantity}
                />
              )}
            </>
          )}
        </div>
      </div>

      {hasmessage && (
        <div
          className={cn(
            'tw:-mx-4 tw:-mb-6 tw:rounded-b-[18px] tw:text-white',
            hasmessage.type === 'warning' && 'tw:bg-primary-700',
            hasmessage.type === 'info' && 'tw:bg-blue-500',

            displayMode === 'list' &&
              'tw:absolute tw:bottom-0 tw:left-0 tw:mx-0 tw:mb-0 tw:w-full',
          )}
        >
          <div className="tw:h-[16px] tw:w-full tw:rounded-b-[20px] tw:bg-white tw:px-2"></div>
          <div className="tw:flex tw:w-full tw:items-start tw:gap-2.5 tw:px-4 tw:py-3">
            <Icons.info classname="tw:mt-1 tw:mr-2 tw:h-4 tw:w-4 tw:flex-shrink-0 tw:text-white" />
            <p className="tw:text-base tw:leading-tight tw:underline tw:decoration-dotted tw:underline-offset-[3px]">
              {hasmessage.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
