import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';

/**
 * Product Servings
 *
 * @description The Product Servings component renders the product servings information.
 *
 * @param {Object} props - Component props
 * @param {object} props.data - The servings list like ['2 servings', '4 servings']
 * @param {string} props.variant - Product variant (card or pdp)
 *
 * @returns {JSX.Element} Rendered Product Servings component.
 */

export const ProductServings = ({ data, variant }) => (
  <ul className="tw:flex tw:list-outside tw:list-none tw:flex-wrap tw:items-center">
    {data?.map((item, index) => (
      <>
        <li
          key={index}
          className={cn(
            variant !== 'pdp' && 'tw:text-base tw:text-grey-600',
            variant === 'pdp' && 'tw:text-black',
          )}
        >
          {item}
        </li>

        {/* separator */}
        {index < data.length - 1 && (
          <li
            className={cn(
              variant !== 'pdp' &&
                'tw:mx-1 tw:text-base tw:text-grey-600 tw:lg:mx-2',
              variant === 'pdp' && 'tw:mx-1 tw:text-grey-600 tw:lg:mx-2',
            )}
          >
            ・
          </li>
        )}
      </>
    ))}
  </ul>
);
