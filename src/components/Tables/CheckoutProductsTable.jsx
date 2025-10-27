import { h, Fragment } from 'preact';
import Typography from '../Typography/Typography';
import { cn, formatCurrency, useMediaQuery } from '../../../utils/helpers';

/**
 * CheckoutProductsTable Component
 *
 * @description Displays products grouped by category in both desktop (table) and mobile (card) views.
 *
 * @param {Object} props - Component props
 * @param {Array} props.products - Array of grouped products to display
 * @param {string} [props.classname] - Additional classes to add to the component
 *
 * @returns {JSX.Element} Preact component - The CheckoutProductTable component
 */
const CheckoutProductsTable = ({ products, classname, ...props }) => {
  const isMobile = useMediaQuery('(max-width: 1023px)');

  // Add index to each product to display the order of the products in the table
  let globalIndex = 1;
  const formattedGroups = products.map((group) => ({
    ...group,
    products: group.products.map((product) => ({
      ...product,
      index: globalIndex++,
      id: product.id || `product-${globalIndex}`, // Ensure each product has an ID
    })),
  }));

  return (
    <div
      className={cn(
        'tw:inline-block tw:min-w-full tw:py-2 tw:align-middle',
        classname,
      )}
      {...props}
    >
      {!isMobile && (
        <table className="tw:w-full">
          <thead className="tw:bg-secondary-1000">
            <tr>
              <th
                scope="col"
                className="tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-left tw:text-base tw:font-medium"
              >
                #
              </th>
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
                className="tw:max-w-[295px] tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-left tw:text-base tw:font-medium"
              >
                Name
              </th>
              <th
                scope="col"
                className="tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-left tw:text-base tw:font-medium tw:whitespace-nowrap"
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
                className="tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-left tw:text-base tw:font-medium tw:whitespace-nowrap"
              >
                Case price
              </th>
              <th
                scope="col"
                className="tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-left tw:font-medium"
              >
                Qty
              </th>
              <th
                scope="col"
                className="tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-right tw:font-semibold"
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody className="tw:bg-white">
            {formattedGroups.map((group) => (
              <Fragment key={group.category}>
                <tr>
                  <th
                    scope="colgroup"
                    colSpan={9}
                    className="tw:border-b tw:border-secondary-1300 tw:py-2 tw:pr-3 tw:pl-4 tw:text-left tw:font-normal tw:sm:pl-3"
                  >
                    {group.category}
                  </th>
                </tr>
                {group.products.map((product) => (
                  <tr key={product.id}>
                    <td className="tw: sm:pl-3 tw:py-4 tw:pr-3 tw:pl-4 tw:text-base tw:whitespace-nowrap">
                      {product.index}
                    </td>
                    <td className="tw:w-[60px] tw:max-w-[60px] tw:min-w-[60px] tw:py-4 tw:pr-3 tw:pl-4 tw:text-base tw:whitespace-nowrap tw:sm:pl-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="tw:h-15 tw:w-15 tw:lg:h-8 tw:lg:w-8"
                      />
                    </td>
                    <td className="tw: sm:pl-3 tw:py-4 tw:pr-3 tw:pl-4 tw:text-base tw:whitespace-nowrap">
                      {product.code}
                    </td>
                    <td className="tw: sm:pl-3 tw:max-w-[295px] tw:py-4 tw:pr-3 tw:pl-4 tw:text-base">
                      {product.name}
                    </td>
                    <td className="tw:py-4 tw:pr-3 tw:pl-4 tw:text-center tw:text-base tw:whitespace-nowrap tw:sm:pl-3">
                      {product.itemsPerCase}
                    </td>
                    <td className="tw:py-4 tw:pr-3 tw:pl-4 tw:text-right tw:text-base tw:whitespace-nowrap tw:sm:pl-3">
                      {product.size}
                    </td>
                    <td className="tw:py-4 tw:pr-3 tw:pl-4 tw:text-center tw:text-base tw:whitespace-nowrap tw:sm:pl-3">
                      {formatCurrency(product.casePrice)}
                    </td>
                    <td className="tw: sm:pl-3 tw:py-4 tw:pr-3 tw:pl-4 tw:text-center tw:text-base tw:whitespace-nowrap">
                      {product.qtw}
                    </td>
                    <td className="tw:py-4 tw:pr-3 tw:pl-4 tw:text-right tw:text-base tw:whitespace-nowrap tw:sm:pl-3">
                      {formatCurrency(product.total)}
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      )}

      {isMobile && (
        <div>
          {formattedGroups.map((group) => (
            <div key={group.category} className="tw:mb-4">
              <div className="tw:mb-2">{group.category}</div>
              {group.products.map((product) => (
                <div
                  key={product.id}
                  className="tw:border-t tw:border-secondary-1300 tw:bg-white tw:px-2 tw:py-5"
                >
                  <div className="tw:mb-4 tw:flex tw:items-center tw:justify-between tw:text-xs">
                    <span>#{product.index}</span>
                    <span className="tw:ml-2">{product.code}</span>
                  </div>
                  <div className="tw:flex tw:items-center tw:gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="tw:h-15 tw:w-15 tw:shrink-0 tw:lg:h-8 tw:lg:w-8"
                    />
                    <div>
                      <Typography
                        domtype="h7"
                        classname="tw:font-semibold tw:text-[13px]"
                      >
                        {product.name}
                      </Typography>

                      <div className="tw:space-y-1">
                        <p className="tw:text-sm">
                          Items per case:{' '}
                          <span className="tw:font-medium">
                            {product.itemsPerCase}
                          </span>
                        </p>
                        <p className="tw:text-sm">
                          Size:{' '}
                          <span className="tw:font-medium">{product.size}</span>
                        </p>
                        <p className="tw:text-sm">
                          Case price:{' '}
                          <span className="tw:font-medium">
                            {formatCurrency(product.casePrice)}
                          </span>
                        </p>
                        <p className="tw:text-sm">
                          Quantity:{' '}
                          <span className="tw:font-medium">{product.qtw}</span>
                        </p>
                        <p className="tw:text-sm">
                          Total:{' '}
                          <span className="tw:font-medium">
                            {formatCurrency(product.total)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckoutProductsTable;
