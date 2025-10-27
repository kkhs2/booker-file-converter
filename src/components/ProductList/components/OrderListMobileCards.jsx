/**
 * Component that renders a list of orders in a mobile-friendly card format.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.orders - An array of order objects to display.
 * @param {string} props.orders[].id - The unique identifier for the order.
 * @param {string} props.orders[].date - The date of the order.
 * @param {string} props.orders[].type - The type of the order.
 * @param {string} props.orders[].orderno - The order number.
 * @param {string} [props.orders[].ref] - An optional reference for the order.
 * @param {Array<string>} [props.orders[].tags] - An optional array of tags associated with the order.
 * @param {Function} props.onviewdetails - Callback function triggered when the "View Details" button is clicked.
 *
 * @returns {JSX.Element} A list of order cards styled for mobile devices.
 */

import { h, Fragment } from 'preact';
import Button from '../../Button/Button';
import Icons from '../../Icons/Icons';
import Tag from '../../Tag/Tag';

export const OrderListMobileCards = ({ orders, onviewdetails }) => {
  return (
    <div className="tw:space-y-2 tw:lg:hidden">
      {orders?.map((order, index) => (
        <div
          key={order?.id}
          className="tw:flex tw:items-center tw:space-x-2 tw:rounded-[20px] tw:bg-white tw:py-3 tw:pl-4"
        >
          <div className="tw:flex-1 tw:space-y-3">
            <div className="tw:flex tw:w-full tw:items-center tw:justify-between">
              <span className="tw:font-light">Date:</span>
              <strong>{order.date}</strong>
            </div>

            <div className="tw:flex tw:w-full tw:items-center tw:justify-between">
              <span className="tw:font-light">Type:</span>
              <strong>{order.type}</strong>
            </div>

            <div className="tw:flex tw:w-full tw:items-center tw:justify-between">
              <span className="tw:font-light">Order No.</span>
              <strong>{order.orderno}</strong>
            </div>

            {order.ref && (
              <div className="tw:flex tw:w-full tw:items-center tw:justify-between">
                <span className="tw:font-light">Ref:</span>
                <strong>{order.ref}</strong>
              </div>
            )}

            {order.tags?.length > 0 && (
              <div className="tw:mt-4 tw:flex tw:w-full tw:flex-wrap tw:gap-3">
                {order.tags.map((tag) => (
                  <Tag
                    key={tag}
                    label={tag}
                    variant="lightPrimary"
                    icon={null}
                    classname="tw:text-nowrap"
                  />
                ))}
              </div>
            )}
          </div>

          <Button
            variant="inverse"
            iconleft={<Icons.chevronRight classname="tw:w-4 tw:h-4" />}
            onClick={() => {
              console.log('View order details', order.id);
              onviewdetails(order.id);
            }}
          />
        </div>
      ))}
    </div>
  );
};
