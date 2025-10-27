import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { cn, useMediaQuery } from '../../../utils/helpers';
import { ProductPricing, ProductActions } from '../Product';
import Typography from '../Typography/Typography';

/**
 * ProductCardAllocations Component
 * @description A product card component specifically designed for allocation management with locked/unlocked variants
 * @param {Object} props - Component props
 * @param {string} [props.classname] - Additional CSS classes
 * @param {string} props.name - Product name
 * @param {string} props.image - Product image URL
 * @param {string} props.id - Product ID
 * @param {string} props.caseinfo - Case information (e.g., "Case of 4 x 2L")
 * @param {string} props.destination - Destination information (e.g., "CORE")
 * @param {string} props.ordergroup - Order group (e.g., "Groceries")
 * @param {string} props.offertext - Offer text (e.g., "Any 2 for £2.95")
 * @param {string} props.price - Main price (e.g., "£5.49")
 * @param {string} props.pricewithvat - Price with VAT (e.g., "£51.99 incl VAT")
 * @param {string} props.priceperunit - Price per unit
 * @param {Object} props.pricerpp - Recommended retail price object with value
 * @param {Object} props.pricepor - Price per order object with value
 * @param {number} props.allocated - Number of items allocated
 * @param {number} props.ordered - Number of items ordered (only for unlocked variant)
 * @param {boolean} props.locked - Whether the allocation is locked
 * @param {function} props.onallocationchange - Callback when allocation quantity changes
 * @param {function} props.onaddtocart - Callback for adding to cart
 * @param {number} props.maxquantity - Maximum quantity allowed
 * @returns {JSX.Element} The ProductCardAllocations component
 */
const ProductCardAllocations = ({
  classname,
  name,
  image,
  id,
  caseinfo,
  destination,
  ordergroup,
  offertext,
  price,
  pricewithvat,
  priceperunit,
  pricerpp,
  pricepor,
  allocated = 1,
  ordered,
  locked = false,
  onallocationchange = () => {},
  onaddtocart = () => {},
  maxquantity = 999,
  ...props
}) => {
  const [allocationQuantity, setAllocationQuantity] = useState(allocated);
  const isMobile = useMediaQuery('(max-width: 1023px)');

  useEffect(() => {
    setAllocationQuantity(allocated);
  }, [allocated]);

  const handleQuantityChange = (newQuantity) => {
    if (!locked) {
      const qty = Math.max(allocated, Math.min(maxquantity, newQuantity));
      setAllocationQuantity(qty);
      onallocationchange(qty);
      return qty;
    }
  };

  const handleAddToCart = (qty, productId) => {
    const appliedQty = handleQuantityChange(qty) || qty;
    onaddtocart(appliedQty, productId);
  };

  return (
    <div
      className={cn(
        'tw:relative tw:flex tw:rounded-[20px] tw:border-[1.5px] tw:border-transparent tw:bg-white tw:p-4 tw:shadow-[16px_2px_30px_-14px_rgba(0,0,0,0.20)] tw:transition-all tw:duration-300 tw:hover:shadow-[16px_2px_30px_-14px_rgba(0,0,0,0.30)]',
        isMobile
          ? 'tw:flex-col tw:gap-4'
          : 'tw:items-center tw:justify-between',
        classname,
      )}
      {...props}
    >
      {/* Product Information Section */}
      <div className="tw:flex tw:items-center tw:gap-4">
        {/* Product Image */}
        <div className="tw:flex tw:shrink-0">
          <img
            src={image}
            alt={name}
            className="tw:h-[70px] tw:w-[70px] tw:rounded-lg tw:object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="tw:flex tw:flex-1 tw:flex-col">
          {/* Product Name */}
          <Typography
            domtype="h7"
            classname="tw:mb-3 tw:line-clamp-2 tw:leading-6 tw:font-medium tw:text-black-800"
          >
            {name}
          </Typography>

          {/* Case Information */}
          {caseinfo && (
            <p className="tw:mb-1 tw:text-sm tw:text-grey-600 tw:lg:text-base">
              {caseinfo}
            </p>
          )}

          {/* Destination and Offer */}
          <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-sm tw:text-grey-600 tw:lg:text-base">
            {destination && <span>Destination: {destination}</span>}
            {offertext && (
              <span className="tw:text-sm tw:text-grey-600 tw:lg:text-base">
                {offertext}
              </span>
            )}
          </div>

          {/* Order Group */}
          {ordergroup && (
            <p className="tw:mt-1 tw:text-sm tw:text-grey-600 tw:lg:text-base">
              Order group: {ordergroup}
            </p>
          )}

          {!isMobile && id && (
            <span className="tw:mt-3 tw:text-sm tw:font-semibold tw:lg:text-base">
              {id}
            </span>
          )}

          {/* Product ID and Pricing on Mobile */}
          {isMobile && (
            <div className="tw:mt-3">
              {id && (
                <p className="tw:mb-2 tw:text-sm tw:font-semibold">{id}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Desktop: Price and Allocation Section */}
      {!isMobile && (
        <div className="tw:flex tw:min-w-[340px] tw:shrink-0 tw:flex-col tw:items-end tw:gap-3">
          {/* Pricing Information */}
          <ProductPricing
            price={price}
            pricewithvat={pricewithvat}
            priceperunit={priceperunit}
            pricerpp={pricerpp}
            pricepor={pricepor}
            className="tw:w-full tw:justify-end tw:space-x-8 tw:*:data-[position=left]:items-start"
          />
          {/* Allocation Controls */}
          {locked ? (
            <div className="tw:flex tw:w-full tw:flex-col tw:items-end tw:gap-2">
              <div className="tw:text-base tw:text-grey-900">
                Allocated: <span className="tw:font-bold">{allocated}</span>
              </div>
              {typeof ordered !== 'undefined' && (
                <div className="tw:text-base tw:text-grey-900">
                  Ordered: <span className="tw:font-bold">{ordered}</span>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="tw:flex tw:w-full tw:items-center tw:gap-6">
                <span className="tw:shrink-0 tw:text-base">
                  Allocated: <span className="tw:font-medium">{allocated}</span>
                </span>
                <div className="tw:w-full">
                  <ProductActions
                    id={id}
                    onaddtocart={handleAddToCart}
                    minquantity={allocated}
                    quantity={allocationQuantity}
                    maxquantity={maxquantity}
                    ctasize="default"
                    showwishlist={false}
                    className="tw:w-full tw:justify-end tw:space-x-8 tw:*:data-[position=left]:items-start"
                  />
                </div>
              </div>
              {/* Ordered Information */}
              {typeof ordered !== 'undefined' && (
                <div className="tw:flex tw:items-center tw:gap-2 tw:text-sm tw:text-grey-600">
                  <span>Ordered:</span>
                  <span className="tw:font-medium">{ordered}</span>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Mobile: Allocation Controls Section */}
      {isMobile && (
        <div className="tw:flex tw:w-full tw:flex-col tw:gap-3 tw:border-t tw:border-dashed tw:border-secondary-1300 tw:pt-5">
          <ProductPricing
            price={price}
            pricewithvat={pricewithvat}
            priceperunit={priceperunit}
            pricerpp={pricerpp}
            pricepor={pricepor}
            className="tw:w-full tw:justify-between tw:space-x-8 tw:*:data-[position=left]:items-start"
          />
          {locked ? (
            <div className="tw:flex tw:w-full tw:flex-col tw:items-end tw:gap-2">
              <div className="tw:text-base tw:text-grey-900">
                Allocated: <span className="tw:font-bold">{allocated}</span>
              </div>
              {typeof ordered !== 'undefined' && (
                <div className="tw:text-base tw:text-grey-900">
                  Ordered: <span className="tw:font-bold">{ordered}</span>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Allocation Controls */}
              <div className="tw:flex tw:w-full tw:flex-col tw:items-end tw:max-lg:space-y-4 tw:lg:flex-row tw:lg:items-center tw:lg:justify-between">
                <span className="tw:text-base tw:font-medium">
                  Allocated: <span className="tw:font-bold">{allocated}</span>
                </span>
                <div className="tw:flex-1 tw:max-lg:w-full tw:lg:ml-4">
                  <ProductActions
                    id={id}
                    onaddtocart={handleAddToCart}
                    minquantity={allocated}
                    quantity={allocationQuantity}
                    maxquantity={maxquantity}
                    ctasize="default"
                    showwishlist={false}
                  />
                </div>
              </div>

              {/* Ordered Information */}
              {typeof ordered !== 'undefined' && (
                <div className="tw:flex tw:w-full tw:items-center tw:justify-between tw:text-base tw:text-grey-600">
                  <span>Ordered:</span>
                  <span className="tw:font-medium tw:text-grey-800">
                    {ordered}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductCardAllocations;
