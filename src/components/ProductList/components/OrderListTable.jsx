/**
 * OrderListTable component renders a table displaying a list of orders.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.orders - An array of order objects to display in the table.
 * @param {string} props.orders[].id - The unique identifier for the order.
 * @param {string} props.orders[].date - The date of the order.
 * @param {string} props.orders[].type - The type of the order.
 * @param {string} props.orders[].orderno - The order number.
 * @param {string} [props.orders[].ref] - An optional reference for the order.
 * @param {Array<string>} [props.orders[].tags] - An optional array of tags associated with the order.
 * @param {Function} props.onviewdetails - Callback function triggered when the "View Details" button is clicked.
 *
 * @returns {JSX.Element} A table displaying the list of orders with their details.
 */

import { h, Fragment } from 'preact';
import Button from '../../Button/Button';
import Tag from '../../Tag/Tag';
import Icons from '../../Icons/Icons';

export const OrderListTable = ({ orders, onviewdetails }) => {
  return (
    <table className="tw:table-flexible tw:w-full tw:border-collapse tw:overflow-hidden tw:rounded-[20px] tw:leading-none tw:max-lg:hidden">
      <tbody>
        {orders?.map((order, index) => (
          <tr
            key={order?.id ?? index}
            className="tw:border-b-2 tw:border-secondary-1000 tw:bg-white"
          >
            <td className="tw:p-6 tw:pr-2">
              <div className="tw:max-w-[176px]">
                <p className="tw:space-x-1">
                  <span className="tw:font-light">Date:</span>
                  <strong>{order.date}</strong>
                </p>
              </div>
            </td>
            <td className="tw:px-2 tw:py-6">
              <div className="tw:max-w-[176px]">
                <p className="tw:space-x-1">
                  <span className="tw:font-light">Type:</span>
                  <strong>{order.type}</strong>
                </p>
              </div>
            </td>
            <td className="tw:px-2 tw:py-6">
              <div className="tw:max-w-[176px]">
                <p className="tw:space-x-1">
                  <span className="tw:font-light">Order No.</span>
                  <strong>{order.orderno}</strong>
                </p>
              </div>
            </td>
            <td className="tw:px-2 tw:py-6">
              <div className="tw:max-w-[176px]">
                {order.ref && (
                  <p className="tw:space-x-1">
                    <span className="tw:font-light">Ref:</span>
                    <strong>{order.ref}</strong>
                  </p>
                )}
              </div>
            </td>

            <td className="tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:p-2">
              {order.tags?.map((tag) => (
                <Tag
                  key={tag}
                  label={tag}
                  variant="lightPrimary"
                  icon={null}
                  classname="tw:text-nowrap"
                />
              ))}
              <Button
                variant="inverse"
                iconleft={<Icons.chevronRight classname="tw:w-4 tw:h-4" />}
                onClick={() => {
                  console.log('View order details', order.id);
                  onviewdetails(order.id);
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
