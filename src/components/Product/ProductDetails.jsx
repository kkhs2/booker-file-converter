import { h, Fragment } from 'preact';
import Typography from '../Typography/Typography';
import {
  ProductTags,
  ProductServings,
  ProductStorageInfo,
  ProductDeliveryInfo,
} from './';
import Tag from '../Tag/Tag';

/**
 * Product Details Component
 *
 * @description The Product Details component renders the main product information section
 *
 * @param {Object} props - Component props
 * @param {string} props.id - Product ID
 * @param {string} props.name - Product name
 * @param {string[]} props.tags - Product tags
 * @param {string[]} props.servings - Product servings information
 * @param {string} props.storageType - Product storage type
 * @param {string} props.deliveryType - Product delivery type
 * @param {string[]} props.productTags - Product dietary/feature tags
 * @param {string} props.variant - Product variant (card or pdp)
 *
 * @returns {JSX.Element} Rendered Product Details component
 */
export const ProductDetails = ({
  id,
  name,
  tags = [],
  servings = [],
  storageType,
  deliveryType,
  productTags = [],
  variant,
}) => {
  return (
    <div className="tw:space-y- tw:w-full tw:lg:space-y-6">
      <div className="tw:flex tw:items-center tw:justify-between">
        <ProductTags tags={tags} />
        <span className="tw:text-sm tw:font-semibold tw:lg:text-base">
          {id}
        </span>
      </div>

      <Typography domtype="h4">{name}</Typography>

      <div className="tw:flex tw:flex-col tw:flex-wrap tw:max-md:space-y-3 tw:lg:flex-row tw:lg:items-center">
        <div className="tw:flex tw:items-center tw:gap-3 tw:lg:gap-4">
          <span className="tw:font-light tw:text-grey-600">Pack size</span>
          <ProductServings data={servings} variant={variant} />
        </div>
        <span className="tw:mx-1 tw:hidden tw:font-light tw:text-grey-600 tw:lg:mx-2 tw:lg:block">
          ・
        </span>
        <div className="tw:flex tw:items-center tw:gap-3 tw:lg:gap-4">
          <span className="tw:shrink-0 tw:font-light tw:text-grey-600">
            Shelf life
          </span>
          {storageType && (
            <div className="tw:flex tw:flex-wrap tw:items-start tw:gap-x-2 tw:lg:items-center">
              <ProductStorageInfo data={storageType} />
            </div>
          )}
          {deliveryType && (
            <div className="tw:flex tw:flex-wrap tw:items-start tw:gap-x-2 tw:lg:items-center">
              <ProductDeliveryInfo
                data={deliveryType}
                classname="tw:px-0 tw:lg:px-0"
              />
            </div>
          )}
        </div>
      </div>

      {productTags && (
        <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
          {productTags.map((tag, index) => (
            <Tag
              key={index}
              label={tag}
              variant="inverse"
              size="default"
              icon={null}
              classname="tw:bg-white tw:border-transparent"
            />
          ))}
        </div>
      )}
    </div>
  );
};
