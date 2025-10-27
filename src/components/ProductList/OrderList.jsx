/**
 * OrderList component renders a list of orders with filtering, pagination, and responsive design.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.title - The title to display in the banner navigation.
 * @param {Array} props.orders - The list of orders to display.
 * @param {Function} props.onorderclick - Callback function triggered when an order is clicked.
 *
 * @returns {JSX.Element} The rendered OrderList component.
 */

import { h, Fragment } from 'preact';
import BannerNavigation from '../BannerNavigation/BannerNavigation';
import Pagination from '../Pagination/Pagination';
import { OrderListButton } from './components/OrderListButton';
import Icons from '../Icons/Icons';
import { FilterDropdown } from '../ProductFilters/components/FilterDropdown';
import { useState } from 'preact/hooks';
import { OrderListTable } from './components/OrderListTable';
import { OrderListMobileCards } from './components/OrderListMobileCards';

export const OrderList = ({ title, orders, onorderclick }) => {
  const [filterBy, setFilterBy] = useState('last-3-months');

  return (
    <div className="tw:pb-25">
      <BannerNavigation title={title} icon=" ">
        <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-3 tw:lg:gap-4">
          <OrderListButton
            label="Previous orders"
            active
            href="javascript:void()"
          />
          <OrderListButton label="Frequently bought" href="javascript:void()" />
          <OrderListButton
            label="All previously bought"
            href="javascript:void()"
          />
          <OrderListButton
            label="Search with a List"
            href="javascript:void()"
            icon={
              <Icons.chevronRight classname="tw:rotate-90 tw:ml-2 tw:w-4 tw:h-4  " />
            }
            iconposition="right"
            onclick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('openSearchWithList'));
            }}
          />
          <OrderListButton
            label="Scanner"
            href="?path=/story/pages-scanner--default"
          />
          <OrderListButton
            label="My lists"
            icon={
              <Icons.arrowLeft classname="tw:rotate-[135deg] tw:h-5 tw:w-5 tw:text-primary" />
            }
            href="javascript:void()"
          />
        </div>
      </BannerNavigation>

      <div className="tw:mt-10 tw:mb-8 tw:p-3">
        <FilterDropdown
          variant="single"
          itemvariant="plain"
          value={filterBy}
          options={{
            label: 'Sort by',
            items: [
              { label: 'Last 3 months', value: 'last-3-months' },
              { label: 'Last 6 months', value: 'last-6-months' },
              { label: 'Last 12 months', value: 'last-12-months' },
              { label: '2024', value: '2024' },
              { label: '2023', value: '2023' },
            ],
          }}
          onchange={(value) => setFilterBy(value)}
        />
      </div>

      <OrderListTable orders={orders} onviewdetails={onorderclick} />
      <OrderListMobileCards orders={orders} onviewdetails={onorderclick} />

      <div className="tw:full tw:mt-10 tw:flex tw:justify-end">
        <Pagination currentpage={1} totalitems="100" itemsperpage="10" />
      </div>
    </div>
  );
};
