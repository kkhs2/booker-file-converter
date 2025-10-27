import { h, Fragment } from 'preact';
import { ProductActions } from './ProductActions';
import Typography from '../Typography/Typography';
import { formatCurrency } from '../../../utils/helpers';

/**
 * Product Alternative Card
 *
 * @description The ProductAlternativeCard component renders an alternative product card used in the product comparison section.
 *
 * @param {Object} props - Component props
 * @param {string} props.name - Product name
 * @param {string} props.image - Product image URL
 * @param {string} props.id - Product ID
 * @param {string} props.price - Product price
 * @param {string} props.priceperitem - Product price per item
 * @param {string} props.savings - Product savings information
 * @param {string} props.packsize - Product pack size information
 * @param {string} props.quantitypercase - Product quantity per case
 * @param {string} props.quantitytotal - Product total quantity
 *
 * @returns {JSX.Element} Rendered Product Alternative Card component
 */

export const ProductAlternativeCard = ({
  name,
  image,
  id,
  price,
  priceperitem,
  savings,
  packsize,
  quantitypercase,
  quantitytotal,
}) => {
  return (
    <div className="tw:flex tw:flex-col tw:rounded-[20px] tw:bg-white">
      <div className="tw:p-4">
        <span className="tw:block tw:w-full tw:pr-2 tw:text-right tw:text-sm tw:font-semibold">
          {id}
        </span>

        <img
          src={image}
          alt={name}
          className="tw:mx-auto tw:h-auto tw:w-[200px] tw:lg:h-[200px]"
        />

        <Typography domtype="h6" classname="tw:my-6 tw:text-black">
          {name}
        </Typography>

        <ProductActions
          onadtocart={() => console.log('Add to cart')}
          onaddtowishlist={() => console.log('Add to wishlist')}
          onincreasequantity={() => console.log('Increase quantity')}
          wishlist={{
            lists: [
              {
                id: '123456',
                name: 'My Wishlist',
                selected: true,
                count: 2,
              },
              {
                id: '123457',
                name: 'My Other Wishlist',
                selected: false,
                count: 121,
              },
            ],
          }}
          quantity={0}
        />
      </div>

      {/* details list */}

      <div>
        <ul className="tw:divide-y tw:divide-dotted tw:divide-black tw:px-4">
          <li className="tw:py-6">{formatCurrency(price)}</li>
          <li className="tw:py-6">{formatCurrency(priceperitem)}</li>
          <li className="tw:py-6">{savings}</li>
          <li className="tw:py-6">{packsize}</li>
          <li className="tw:py-6">{quantitypercase}</li>
          <li className="tw:py-6">{quantitytotal}</li>
        </ul>
      </div>
    </div>
  );
};
