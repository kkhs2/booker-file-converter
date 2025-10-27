/**
 * FeatureProduct Component
 *
 * This component renders a feature card alongside a product card.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.fixedcardwith - Whether the card width is fixed
 * @param {Object} featurecardprops - Props for the FeatureCard component
 * @param {Object} productcardprops - Props for the ProductCard component
 * @param {string} props.classname - Additional classes to add to the component
 * @returns {JSX.Element} React component - The FeatureProduct component
 */

// Main Component
import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import FeatureCard from '../FeatureCard/FeatureCard';
import ProductCard from '../ProductCard/ProductCard';

const FeatureProduct = ({
  fixedcardwith = true,
  featurecardprops,
  productcardprops,
  classname,
  ...props
}) => {
  const isProductListMode = productcardprops.mode === 'list';

  return (
    <div
      className={cn(
        'tw:grid tw:grid-cols-1 tw:grid-rows-1 tw:overflow-hidden tw:rounded-[20px] tw:border tw:md:grid-cols-2',
        !isProductListMode &&
          fixedcardwith &&
          'tw:max-w-[640px] tw:md:w-[640px]',
        isProductListMode && 'tw:max-w-[1312px] tw:md:flex',
        classname,
      )}
      {...props}
    >
      <div
        className={cn(
          'tw:px-1 tw:md:px-0',
          isProductListMode &&
            'tw:flex-shrink-0 tw:md:h-[194px] tw:md:w-[264px]',
        )}
      >
        <FeatureCard {...featurecardprops} />
      </div>

      <div className="tw:w-full tw:p-3 tw:pt-0 tw:md:p-2 tw:md:pl-1">
        <ProductCard
          classname="tw:rounded-t-none tw:md:rounded-t-[20px]"
          isfeaturedproduct
          {...productcardprops}
        />
      </div>
    </div>
  );
};

export default FeatureProduct;
