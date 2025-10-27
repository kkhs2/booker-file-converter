import { h, Fragment } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';
import { ProductWishlist } from './ProductWishlist';
import { cn } from '../../../utils/helpers';

/**
 * Product Actions
 *
 * @description The ProductActions component renders the product actions.
 *
 * @param {object} props - The props object.
 * @param {function} props.onaddtowishlist - The function to add to wishlist.
 * @param {function} props.onaddtocart - The function to add to cart.
 * @param {object} props.wishlist - The wishlist object.
 * @param {number} props.quantity - The quantity of the product.
 * @param {boolean} props.isonwishlist - Flag if product is on wishlist.
 * @param {"default" | "large"} props.ctasize - The size of the CTA button.
 * @param {number} props.maxquantity - The maximum quantity of the product.
 * @param {number} props.minquantity - The minimum quantity of the product.
 * @param {boolean} props.showmaxquantity - Flag to show the maximum quantity of the product.
 * @param {string} props.id - The product ID.
 * @param {boolean} props.showwishlist - Flag to show the wishlist button. Defaults to true.
 *
 * @returns {JSX.Element} Rendered Product Actions component.
 */

export const ProductActions = ({
  id,
  onaddtowishlist,
  onaddtocart,
  wishlist,
  quantity,
  isonwishlist,
  ctasize = 'default',
  maxquantity,
  minquantity = 0,
  showmaxquantity,
  showwishlist = true,
}) => {
  const productRef = useRef();
  const [isAdded, setIsAdded] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [qty, setQty] = useState(quantity || null);
  const [showWishlist, setShowWishlist] = useState(false);
  const didMount = useRef(false);

  // Ensure initial quantity respects minimum quantity
  useEffect(() => {
    if (quantity && quantity < minquantity) {
      setQty(minquantity);
    }
  }, [quantity, minquantity]);

  // Validate and set quantity
  const updateQuantity = (value) => {
    const numValue = parseInt(value, 10);

    if (isNaN(numValue)) {
      setQty(minquantity);
      return;
    }

    const limitedValue = Math.max(minquantity, Math.min(numValue, maxquantity));
    setQty(limitedValue);
  };

  // Close wishlist dropdown when clicked outside the component area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productRef.current && !productRef.current.contains(event.target)) {
        setShowWishlist(false);
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        setShowWishlist(false);
      }
    };
    document.addEventListener('keydown', handleKeyPress);

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [productRef]);

  // handle onaddtowishlist
  useEffect(() => {
    if (isAdded && onaddtowishlist) {
      onaddtowishlist(qty);
    }
  }, [isAdded]);

  // handle handleAddToCart();
  const handleAddToCart = () => {
    onaddtocart(qty, id);
  };

  useEffect(() => {
    if (didMount.current) {
      if (qty >= minquantity && qty !== null) {
        handleAddToCart();
      }
    } else {
      didMount.current = true;
    }
  }, [qty]);

  return (
    <div ref={productRef} className="tw:relative">
      {showmaxquantity && (
        <span className="tw:mb-5 tw:flex tw:items-center tw:justify-end tw:text-lg">
          <Icons.star classname="tw:size-4.5 tw:mr-1 tw:shrink-0" />
          Maximum:{' '}
          <span className="tw:ml-1 tw:font-semibold">{maxquantity}</span>
        </span>
      )}
      <div
        className={cn(
          'tw:flex tw:items-center tw:gap-3 tw:lg:flex-row',
          ctasize === 'large' &&
            'tw:flex-col tw:max-lg:space-y-2 tw:lg:flex-row',
        )}
      >
        {showwishlist && (
          <Button
            variant="secondary"
            label={ctasize === 'large' ? 'Add to Wishlist' : null}
            iconleft={
              isonwishlist
                ? () => (
                    <Icons.checkMark classname="tw:w-4 tw:h-4" stroke="#fff" />
                  )
                : () => <Icons.heart classname="tw:w-4 tw:h-4" />
            }
            onclick={() => setShowWishlist(!showWishlist)}
            state={isonwishlist ? 'active' : 'enabled'}
            classname={cn(
              ctasize === 'large' ? 'tw:w-full' : 'tw:w-12 tw:h-12',
            )}
          />
        )}

        <div className="tw:w-full">
          {qty > 0 || isDirty ? (
            <form className="tw:w-full">
              <div className="tw:flex tw:w-full tw:overflow-hidden tw:rounded-[120px] tw:border tw:border-black-1000">
                <Button
                  type="button"
                  iconleft={() => (
                    <Icons.minus
                      classname="tw:w-4 tw:h-4"
                      stroke="currentColor"
                    />
                  )}
                  variant="tertiary"
                  state={qty === minquantity ? 'disabled' : 'enabled'}
                  onclick={() => updateQuantity(qty - 1)}
                  classname="tw:py-[15px] tw:border-0"
                />
                <input
                  type="number"
                  value={qty}
                  className="tw:-mx-[2px] tw:w-full tw:[appearance:textfield] tw:border-none tw:text-center tw:outline-none tw:[&::-webkit-inner-spin-button]:appearance-none tw:[&::-webkit-outer-spin-button]:appearance-none"
                  onFocus={() => {
                    setIsDirty(true);
                  }}
                  onChange={(e) => {
                    setQty(parseInt(e.target.value, 10));
                    setIsDirty(true);
                    if (
                      e.target.value === '' ||
                      isNaN(parseInt(e.target.value, 10))
                    ) {
                      setQty(null);
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value > maxquantity) {
                      updateQuantity(maxquantity);
                    }
                    if (qty === null || qty < minquantity) {
                      setQty(minquantity);
                    }
                    setIsDirty(false);
                  }}
                  min={minquantity}
                  max={maxquantity}
                />
                <Button
                  type="button"
                  iconleft={() => (
                    <Icons.plus
                      classname="tw:w-4 tw:h-4"
                      stroke="currentColor"
                    />
                  )}
                  variant="tertiary"
                  onclick={() => updateQuantity(qty + 1)}
                  classname="tw:py-[15px] tw:border-0"
                  disabled={qty === maxquantity}
                />
              </div>
            </form>
          ) : (
            <Button
              onclick={() => {
                setQty(Math.max(1, minquantity));
              }}
              label={ctasize === 'large' ? 'Add to basket' : 'Add'}
              variant="tertiary"
              iconleft={() => (
                <Icons.plus classname="tw:w-4 tw:h-4" stroke="currentColor" />
              )}
              classname="tw:w-full tw:border-[1px]"
            />
          )}
        </div>
      </div>
      {showwishlist && showWishlist && (
        <ProductWishlist
          id={id}
          lists={wishlist.lists}
          onaddtowishlist={onaddtowishlist}
        />
      )}
    </div>
  );
};
