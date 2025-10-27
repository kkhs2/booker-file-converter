/**
 * Component that renders a product with one or more alternative products.
 * In 'grid' mode, it displays the main product alongside the first alternative from the `alternativeproducts` array.
 * In 'list' mode, it displays the main product followed by a list of all products from the `alternativeproducts` array.
 *
 * @param {Object} props - The props for the component.
 * @param {'grid' | 'list'} [props.mode='grid'] - The display mode. Defaults to 'grid'.
 * @param {Object} props.product - The main product data.
 * @param {Object[]} [props.alternativeproducts=[]] - An array of alternative products.
 * @param {boolean} [props.showremovebutton=false] - Whether to show the "Remove from cart" button (only in list mode).
 * @param {Function} [props.onremove] - Callback function when "Remove from cart" is clicked.
 * @returns {JSX.Element} The rendered ProductWithAlternative component.
 */

import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import ProductCard from '../ProductCard/ProductCard';

const ProductWithAlternative = ({
  mode = 'grid',
  product,
  alternativeproducts = [],
  showremovebutton = false,
  onremove,
}) => {
  let effectiveAlternatives = [];
  if (alternativeproducts && alternativeproducts.length > 0) {
    effectiveAlternatives = alternativeproducts.filter(Boolean);
  }

  const hasAlternatives = effectiveAlternatives.length > 0;

  // Determine which product is unavailable
  const isMainProductUnavailable =
    product?.availability?.status === 'outOfStock';
  const isAlternativeUnavailable =
    effectiveAlternatives[0]?.availability?.status === 'outOfStock';

  const mainProductGridClasses = [
    mode === 'grid' &&
      hasAlternatives &&
      'tw:lg:rounded-br-none tw:lg:rounded-tr-none tw:lg:w-1/2 tw:max-lg:rounded-b-none',
    mode === 'grid' && !hasAlternatives && 'tw:w-full',
  ];

  const alternativeProductGridClasses = [
    mode === 'grid' &&
      hasAlternatives &&
      'tw:lg:rounded-bl-none tw:lg:rounded-tl-none tw:lg:w-1/2',
    mode === 'grid' && hasAlternatives && 'tw:max-lg:rounded-t-none',
  ];

  return (
    <div
      className={cn(
        'tw:rounded-[20px] tw:border-[1.5px] tw:border-black/30 tw:p-2',
        mode === 'grid' &&
          'tw:flex tw:flex-col tw:lg:col-span-2 tw:lg:flex-row',
      )}
    >
      {/* Main Product */}
      {product && (
        <div
          className={cn(
            'tw:relative tw:flex tw:flex-col',
            ...mainProductGridClasses,
          )}
        >
          {/* Remove button for unavailable main product */}
          {showremovebutton && mode === 'list' && isMainProductUnavailable && (
            <div className="tw:absolute tw:right-4 tw:bottom-2 tw:z-10">
              <button
                onClick={() =>
                  onremove && onremove(effectiveAlternatives[0]?.id)
                }
                className="tw:cursor-pointer tw:px-3 tw:py-2 tw:text-lg tw:underline tw:decoration-dotted tw:underline-offset-4"
              >
                Remove from basket
              </button>
            </div>
          )}
          <ProductCard
            {...product}
            mode={mode}
            classname={cn(
              'tw:h-full',
              mode === 'list' && hasAlternatives && 'tw:rounded-b-none',
            )}
          />
        </div>
      )}

      {/* Alternatives Section */}
      {mode === 'grid' && hasAlternatives && effectiveAlternatives[0] && (
        <div
          className={cn(
            'tw:relative tw:flex tw:flex-col',
            ...alternativeProductGridClasses,
          )}
        >
          {/* Remove button for unavailable alternative product */}
          {showremovebutton && mode === 'list' && isAlternativeUnavailable && (
            <div className="tw:absolute tw:right-4 tw:bottom-2 tw:z-10">
              <button
                onClick={() =>
                  onremove && onremove(effectiveAlternatives[0]?.id)
                }
                className="tw:cursor-pointer tw:px-3 tw:py-2 tw:text-lg tw:underline tw:decoration-dotted tw:underline-offset-4"
              >
                Remove from basket
              </button>
            </div>
          )}
          <ProductCard
            {...effectiveAlternatives[0]}
            mode={mode}
            classname="tw:h-full"
          />
        </div>
      )}

      {mode === 'list' &&
        hasAlternatives &&
        effectiveAlternatives.map((altProd, index) => (
          <div key={altProd.id || `alt-${index}`} className="tw:relative">
            {/* Remove button for unavailable alternative products in list mode */}
            {showremovebutton &&
              altProd?.availability?.status === 'outOfStock' && (
                <div className="tw:absolute tw:right-4 tw:bottom-2 tw:z-10">
                  <button
                    onClick={() =>
                      onremove && onremove(effectiveAlternatives[0]?.id)
                    }
                    className="tw:cursor-pointer tw:px-3 tw:py-2 tw:text-lg tw:underline tw:decoration-dotted tw:underline-offset-4"
                  >
                    Remove from basket
                  </button>
                </div>
              )}
            <ProductCard
              {...altProd}
              mode={mode}
              classname={cn(
                'tw:rounded-t-none',
                index < effectiveAlternatives.length - 1 && 'tw:rounded-b-none',
              )}
            />
          </div>
        ))}
    </div>
  );
};

export default ProductWithAlternative;
