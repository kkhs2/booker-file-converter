import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Typography from '../Typography/Typography';
import { cn, formatCurrency, useMediaQuery } from '../../../utils/helpers';
import { ProductStock } from '../Product/ProductStock';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';

/**
 * Helper function to determine stock status
 *
 * @param {Object} product - The product object
 * @returns {string} Stock status for ProductStock component
 */
const getStockStatus = (product) => {
  if (product.isLowStock) {
    return 'lowStock';
  }
  return 'inStock';
};

/**
 * QuantityInput Component
 *
 * @description Input field for adjusting product quantity, inspired by ProductActions
 *
 * @param {Object} props - Component props
 * @param {number} props.value - Current quantity value
 * @param {Function} props.onChange - Function to call when quantity changes
 * @param {number} props.min - Minimum allowed quantity
 * @param {number} props.max - Maximum allowed quantity
 * @param {boolean} props.disabled - Whether the input is disabled
 *
 * @returns {JSX.Element} Preact component - The QuantityInput component
 */
const QuantityInput = ({ value, onChange, min = 0, max, disabled }) => {
  const [isDirty, setIsDirty] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const updateQuantity = (newValue) => {
    const numValue = parseInt(newValue, 10);

    if (isNaN(numValue)) {
      setLocalValue(0);
      onChange(0);
      return;
    }

    const limitedValue = Math.max(min, Math.min(numValue, max));
    setLocalValue(limitedValue);
    onChange(limitedValue);
  };

  const handleIncrement = () => {
    if (!disabled && (!max || localValue < max)) {
      updateQuantity(localValue + 1);
    }
  };

  const handleDecrement = () => {
    if (!disabled && localValue > min) {
      updateQuantity(localValue - 1);
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setIsDirty(true);

    if (inputValue === '' || isNaN(parseInt(inputValue, 10))) {
      setLocalValue(null);
    } else {
      setLocalValue(parseInt(inputValue, 10));
    }
  };

  const handleInputBlur = (e) => {
    const inputValue = e.target.value;

    if (inputValue === '' || localValue === null) {
      updateQuantity(min);
    } else if (localValue > max) {
      updateQuantity(max);
    } else if (localValue < min) {
      updateQuantity(min);
    } else {
      onChange(localValue);
    }

    setIsDirty(false);
  };

  if (localValue > 0 || isDirty) {
    return (
      <div className="tw:flex tw:w-full tw:max-w-[140px] tw:overflow-hidden tw:rounded-[120px] tw:border tw:border-black-1000">
        <Button
          type="button"
          iconleft={() => (
            <Icons.minus classname="tw:w-4 tw:h-4" stroke="currentColor" />
          )}
          variant="tertiary"
          disabled={disabled || localValue <= min}
          onclick={handleDecrement}
          classname="tw:py-[10px] tw:px-2"
        />
        <input
          type="number"
          value={localValue || ''}
          className="tw:-mx-[2px] tw:w-full tw:[appearance:textfield] tw:border-none tw:py-2 tw:text-center tw:outline-none tw:[&::-webkit-inner-spin-button]:appearance-none tw:[&::-webkit-outer-spin-button]:appearance-none"
          onFocus={() => setIsDirty(true)}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          min={min}
          max={max}
          disabled={disabled}
        />
        <Button
          type="button"
          iconleft={() => (
            <Icons.plus classname="tw:w-4 tw:h-4" stroke="currentColor" />
          )}
          variant="tertiary"
          disabled={disabled || (max && localValue >= max)}
          onclick={handleIncrement}
          classname="tw:py-[10px] tw:px-2"
        />
      </div>
    );
  }

  return (
    <Button
      onclick={() => updateQuantity(1)}
      label="Add"
      variant="tertiary"
      iconleft={() => (
        <Icons.plus classname="tw:w-4 tw:h-4" stroke="currentColor" />
      )}
      classname="tw:max-w-[140px]"
      disabled={disabled}
    />
  );
};

/**
 * ProductRow Component
 *
 * @description A row in the product table with quantity controls
 *
 * @param {Object} props - Component props
 * @param {Object} props.product - The product to display (with qty property)
 * @param {Function} props.onQuantityChange - Function to handle quantity changes
 * @param {boolean} props.readonly - Whether the row is in readonly mode
 *
 * @returns {JSX.Element} Preact component - The ProductRow component
 */
const ProductRow = ({ product, onQuantityChange, readonly }) => {
  const handleQuantityChange = (newQuantity) => {
    onQuantityChange(product.code, newQuantity);
  };

  return (
    <tr key={product.code}>
      <td className="tw:w-[60px] tw:max-w-[60px] tw:min-w-[60px] tw:py-4 tw:pr-3 tw:pl-4 tw:text-base tw:whitespace-nowrap tw:sm:pl-3">
        <img
          src={product.image}
          alt={product.name}
          className="tw:h-15 tw:w-15 tw:lg:h-8 tw:lg:w-8"
        />
      </td>
      <td className="tw:py-4 tw:pr-3 tw:pl-4 tw:text-base tw:whitespace-nowrap tw:sm:pl-3">
        {product.code}
      </td>
      <td className="tw:py-4 tw:pr-3 tw:pl-4 tw:text-base tw:sm:pl-3">
        <div>
          <Typography>{product.name}</Typography>
        </div>
      </td>
      <td className="tw:py-4 tw:pr-3 tw:pl-4 tw:text-right tw:text-base tw:whitespace-nowrap tw:sm:pl-3">
        {product.itemsPerCase}
      </td>
      <td className="tw:py-4 tw:pr-3 tw:pl-4 tw:text-right tw:text-base tw:whitespace-nowrap tw:sm:pl-3">
        {product.size}
      </td>
      <td className="tw:py-4 tw:pr-3 tw:pl-4 tw:text-center tw:text-base tw:whitespace-nowrap tw:sm:pl-3">
        {formatCurrency(product.wsp)}
      </td>
      <td className="tw:py-4 tw:pr-3 tw:pl-4 tw:text-center tw:text-base tw:whitespace-nowrap tw:sm:pl-3">
        {formatCurrency(product.rrp)}
      </td>
      <td className="tw:py-4 tw:pr-3 tw:pl-4 tw:text-center tw:text-base tw:whitespace-nowrap tw:sm:pl-3">
        {product.por}%
      </td>
      <td className="tw:py-4 tw:pr-3 tw:pl-4 tw:text-center tw:text-base tw:whitespace-nowrap tw:sm:pl-3">
        {product.vat}%
      </td>
      <td className="tw:py-4 tw:pr-3 tw:pl-4 tw:text-center tw:text-base tw:whitespace-nowrap tw:sm:pl-3">
        {readonly ? (
          <span>{product.qty}</span>
        ) : (
          <QuantityInput
            value={product.qty || 0}
            onChange={handleQuantityChange}
            min={0}
            max={999}
          />
        )}
      </td>
      <td className="tw:py-4 tw:pr-3 tw:pl-4 tw:text-right tw:text-base tw:whitespace-nowrap tw:sm:pl-3">
        <div className="tw:flex tw:flex-col tw:items-end">
          <ProductStock
            status={getStockStatus(product)}
            contentclassname="tw:flex tw:flex-col tw:items-end"
          />
        </div>
      </td>
    </tr>
  );
};

/**
 * MobileProductCard Component
 *
 * @description A card in the mobile view with quantity controls
 *
 * @param {Object} props - Component props
 * @param {Object} props.product - The product to display (with qty property)
 * @param {Function} props.onQuantityChange - Function to handle quantity changes
 * @param {boolean} props.readonly - Whether the card is in readonly mode
 *
 * @returns {JSX.Element} Preact component - The MobileProductCard component
 */
const MobileProductCard = ({ product, onQuantityChange, readonly }) => {
  const handleQuantityChange = (newQuantity) => {
    onQuantityChange(product.code, newQuantity);
  };

  return (
    <div className="tw:border-b tw:border-gray-200 tw:px-2 tw:py-5 tw:lg:px-4">
      <div className="tw:mb-4 tw:flex tw:justify-end">
        <span className="tw:text-[11px] tw:font-medium">{product.code}</span>
      </div>

      <div className="tw:flex tw:items-start tw:gap-4">
        <img
          src={product.image}
          alt={product.name}
          className="tw:h-15 tw:w-15 tw:shrink-0"
        />
        <div className="tw:flex-1 tw:space-y-2">
          <Typography domtype="h7" classname="tw:font-medium tw:text-[13px]">
            {product.name}
          </Typography>

          <div className="tw:space-y-2 tw:text-sm">
            <p>
              Items p/case:{' '}
              <span className="tw:font-medium">{product.itemsPerCase}</span>
            </p>
            <p>
              Size: <span className="tw:font-medium">{product.size}</span>
            </p>
            <p>
              WSP:{' '}
              <span className="tw:font-medium">
                {formatCurrency(product.wsp)}
              </span>
            </p>
            <p>
              RRP:{' '}
              <span className="tw:font-medium">
                {formatCurrency(product.rrp)}
              </span>
            </p>
            <p>
              POR: <span className="tw:font-medium">{product.por}%</span>
            </p>
            <p>
              VAT: <span className="tw:font-medium">{product.vat}%</span>
            </p>
          </div>

          <div className="tw:mt-3 tw:flex tw:items-center tw:gap-2">
            <label className="tw:mb-1 tw:block tw:text-sm">Quantity:</label>
            {readonly ? (
              <span>{product.qty}</span>
            ) : (
              <QuantityInput
                value={product.qty || 0}
                onChange={handleQuantityChange}
                min={0}
                max={999}
              />
            )}
          </div>

          <div className="tw:flex tw:gap-2">
            <span className="tw:text-sm">Stock:</span>
            <ProductStock status={getStockStatus(product)} />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * RepOrderProductList Component
 *
 * @description Displays products for rep ordering in both desktop (table) and mobile (card) views.
 * Includes quantity controls for ordering products.
 *
 * @param {Object} props - Component props
 * @param {Array} props.products - Array of products to display (with qty property)
 * @param {string} [props.classname] - Additional classes to add to the component
 * @param {Function} [props.onQuantityChange] - Callback function when quantity changes
 *
 * @returns {JSX.Element} Preact component - The RepOrderProductList component
 */
const RepOrderProductList = ({
  products,
  classname,
  readonly = false,
  onQuantityChange,
  ...props
}) => {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const [localProducts, setLocalProducts] = useState(products);

  // Handle quantity changes
  const handleQuantityChange = (productCode, newQuantity) => {
    const updatedProducts = localProducts.map((product) =>
      product.code === productCode ? { ...product, qty: newQuantity } : product,
    );
    setLocalProducts(updatedProducts);

    if (onQuantityChange) {
      const updatedProduct = updatedProducts.find(
        (p) => p.code === productCode,
      );
      onQuantityChange(
        productCode,
        newQuantity,
        updatedProduct,
        updatedProducts,
      );
    }
  };

  let globalIndex = 1;
  const formattedProducts = localProducts.map((product) => ({
    ...product,
    index: globalIndex++,
    id: product.id || product.code,
    qty: product.qty || 0,
  }));

  useEffect(() => {
    setLocalProducts(
      products.map((product) => ({
        ...product,
        qty: product.qty || 0,
      })),
    );
  }, [products]);

  return (
    <div
      className={cn(
        'tw:inline-block tw:min-w-full tw:rounded-lg tw:bg-white tw:p-4 tw:align-middle',
        classname,
      )}
      {...props}
    >
      {!isMobile && (
        <table className="tw:w-full">
          <thead className="tw:bg-secondary-1000">
            <tr>
              <th className="tw:w-[60px] tw:max-w-[60px] tw:min-w-[60px] tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-left tw:font-medium">
                <span className="tw:sr-only">Image</span>
              </th>
              <th
                scope="col"
                className="tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-left tw:text-base tw:font-medium"
              >
                Code
              </th>
              <th
                scope="col"
                className="tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-left tw:text-base tw:font-medium"
              >
                Name
              </th>
              <th
                scope="col"
                className="tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-right tw:text-base tw:font-medium tw:whitespace-nowrap"
              >
                Items p/case
              </th>
              <th
                scope="col"
                className="tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-right tw:font-medium"
              >
                Size
              </th>
              <th
                scope="col"
                className="tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-center tw:text-base tw:font-medium"
              >
                WSP
              </th>
              <th
                scope="col"
                className="tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-center tw:text-base tw:font-medium"
              >
                RRP
              </th>
              <th
                scope="col"
                className="tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-center tw:font-medium"
              >
                POR
              </th>
              <th
                scope="col"
                className="tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-center tw:font-medium"
              >
                VAT
              </th>
              <th
                scope="col"
                className="tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-center tw:font-medium"
              >
                Qty
              </th>
              <th
                scope="col"
                className="tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-right tw:font-semibold"
              >
                Stock
              </th>
            </tr>
          </thead>
          <tbody className="tw:divide-y tw:divide-dashed tw:divide-secondary-1300 tw:bg-white">
            {formattedProducts.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onQuantityChange={handleQuantityChange}
                readonly={readonly}
              />
            ))}
          </tbody>
        </table>
      )}

      {isMobile && (
        <div>
          {formattedProducts.map((product) => (
            <MobileProductCard
              key={product.id}
              product={product}
              onQuantityChange={handleQuantityChange}
              readonly={readonly}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RepOrderProductList;
