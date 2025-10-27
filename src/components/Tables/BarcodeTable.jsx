/**
 * @component BarcodeTable
 * @description A table component that displays barcode information for products, including stock levels, pricing, and order history.
 *
 * @param {Object} props - Component props
 * @param {Array} props.categories - Array of categories to display
 * @param {string} props.categories[].categoryName - The name of the product category to display
 * @param {Array} props.categories[].items - Array of product items to display in the table
 * @param {string} props.categories[].items[].type - Type of item ('product' or 'unrecognized')
 * @param {string} [props.categories[].items[].barcode] - Barcode value for the product
 * @param {string} [props.categories[].items[].productCode] - Unique product code
 * @param {string} [props.categories[].items[].description] - Product description
 * @param {string} [props.categories[].items[].stockLevel] - Stock level indicator ('good', 'low', or other)
 * @param {string} [props.categories[].items[].packSize] - Size of product pack
 * @param {string} [props.categories[].items[].wsp] - Wholesale price
 * @param {string} [props.categories[].items[].rsp] - Retail sale price
 * @param {string} [props.categories[].items[].vat] - VAT information
 * @param {Array<number|null>} [props.categories[].items[].qtyOrderedPrevWks] - Array of quantities ordered in previous weeks
 * @param {number|null} [props.categories[].items[].qtyInTrolley] - Current quantity in trolley
 * @param {string} [props.categories[].items[].message] - Message for unrecognized items
 *
 * @returns {JSX.Element} A table displaying barcode and product information
 */
import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import Icons from '../Icons/Icons';
import Typography from '../Typography/Typography';

const StockLevelIndicator = ({ level }) => {
  let baseClasses =
    'tw:p-2 tw:rounded tw:text-normal tw:capitalize tw:inline-block tw:min-w-[50px] tw:text-center';
  let colorClasses = '';
  let displayLevel = level;

  switch (level?.toLowerCase()) {
    case 'good':
      colorClasses = 'tw:bg-green-100 tw:text-black';
      break;
    case 'low':
      colorClasses = 'tw:bg-orange-500 tw:text-black';
      break;
    default:
      colorClasses = 'tw:bg-gray-300 tw:text-black';
      displayLevel = level || 'N/A';
      break;
  }
  return <span className={cn(baseClasses, colorClasses)}>{displayLevel}</span>;
};

const BarcodeTable = ({ categories }) => {
  const baseThClass = 'tw:px-2 tw:py-2.5 tw:font-bold tw:text-[0.9em] ';
  const baseTdClass =
    'tw:px-2 tw:py-3 tw:border-b tw:border-gray-100 tw:align-middle';
  const centeredThClass = `${baseThClass} tw:text-center`;
  const leftThClass = `${baseThClass} tw:text-left`;
  const centeredTdClass = `${baseTdClass} tw:text-center`;
  const leftTdClass = `${baseTdClass} tw:text-left`;

  const subHeaderThClass = 'tw:px-2 tw:py-1  tw:font-bold tw:text-[0.8em] ';
  const centeredSubHeaderThClass = `${subHeaderThClass} tw:text-center`;
  const emptySubHeaderThClass = `${subHeaderThClass}`;

  if (!categories || categories.length === 0) {
    return (
      <div className="tw:p-4 tw:text-center tw:text-gray-500">
        No items to display.
      </div>
    );
  }

  return (
    <div className="tw:w-full tw:overflow-x-auto">
      <table className="tw:w-full tw:border-collapse tw:font-sans tw:text-sm tw:text-gray-800">
        <thead>
          <tr>
            <th className={leftThClass}>Barcode</th>
            <th className={leftThClass}>Product Code</th>
            <th className={leftThClass}>Product Description</th>
            <th className={centeredThClass}>Stock level</th>
            <th className={leftThClass}>Pack Size</th>
            <th className={leftThClass}>WSP</th>
            <th className={leftThClass}>RSP</th>
            <th className={leftThClass}>VAT</th>
            <th className={`${centeredThClass}`} colSpan="4">
              QTY ordered prev Wks
            </th>
            <th className={centeredThClass}>QTY in Trolley</th>
          </tr>
          <tr>
            <th className={emptySubHeaderThClass}></th>
            <th className={emptySubHeaderThClass}></th>
            <th className={emptySubHeaderThClass}></th>
            <th className={emptySubHeaderThClass}></th>
            <th className={emptySubHeaderThClass}></th>
            <th className={emptySubHeaderThClass}></th>
            <th className={emptySubHeaderThClass}></th>
            <th className={emptySubHeaderThClass}></th>
            <th className={centeredSubHeaderThClass}>-4</th>
            <th className={centeredSubHeaderThClass}>-3</th>
            <th className={centeredSubHeaderThClass}>-2</th>
            <th className={centeredSubHeaderThClass}>-1</th>
            <th className={emptySubHeaderThClass}></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, categoryIndex) => (
            <Fragment key={`category-fragment-${categoryIndex}`}>
              {category.categoryName && (
                <tr
                  key={`category-header-${categoryIndex}`}
                  className="tw:bg-grey-1100"
                >
                  <td colSpan="13" className="tw:px-2.5 tw:py-3">
                    <div className="tw:inline-flex tw:items-baseline tw:gap-1">
                      <Typography variant="h7" classname="tw:font-medium">
                        {category.categoryName}
                      </Typography>
                      <span className="tw:text-sm">
                        (
                        {
                          category.items.filter(
                            (item) => item.type === 'product',
                          ).length
                        }
                        )
                      </span>
                    </div>
                  </td>
                </tr>
              )}
              {category.items.map((item, index) => {
                if (item.type === 'unrecognized') {
                  return (
                    <tr
                      key={`unrecognized-${categoryIndex}-${index}`}
                      className="tw:bg-white"
                    >
                      <td className={`${leftTdClass} tw:flex tw:items-center`}>
                        <Icons.info />
                        <span className="tw:ml-[5px] tw:font-mono">
                          {item.barcode}
                        </span>
                      </td>
                      <td className={leftTdClass} colSpan="2">
                        {item.message}
                      </td>
                      <td className={baseTdClass}></td>
                      <td className={baseTdClass}></td>
                      <td className={baseTdClass}></td>
                      <td className={baseTdClass}></td>
                      <td className={baseTdClass}></td>
                      <td className={baseTdClass} colSpan="4"></td>
                      <td className={baseTdClass}></td>
                    </tr>
                  );
                }
                // Default for product type
                return (
                  <tr
                    key={
                      item.productCode || `product-${categoryIndex}-${index}`
                    }
                    className="tw:bg-white"
                  >
                    <td className={`${centeredTdClass} tw:w-[100px]`}>
                      <img src={item.barcode} alt="barcode" />
                    </td>
                    <td className={leftTdClass}>{item.productCode}</td>
                    <td className={leftTdClass}>{item.description}</td>
                    <td className={centeredTdClass}>
                      <StockLevelIndicator level={item.stockLevel} />
                    </td>
                    <td className={leftTdClass}>{item.packSize}</td>
                    <td className={leftTdClass}>{item.wsp}</td>
                    <td className={leftTdClass}>{item.rsp}</td>
                    <td className={leftTdClass}>{item.vat}</td>
                    {(item.qtyOrderedPrevWks || [null, null, null, null]).map(
                      (qty, i) => (
                        <td key={i} className={centeredTdClass}>
                          {qty !== null ? qty : '-'}
                        </td>
                      ),
                    )}
                    <td
                      className={`${centeredTdClass} tw:text-[1.1em] tw:font-bold`}
                    >
                      {item.qtyInTrolley !== null &&
                      item.qtyInTrolley !== undefined
                        ? item.qtyInTrolley
                        : '-'}
                    </td>
                  </tr>
                );
              })}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BarcodeTable;
