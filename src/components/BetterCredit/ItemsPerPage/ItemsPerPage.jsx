/**
 * ItemsPerPage Component
 *
 * A component that displays a dropdown to select the number of items per page
 * and shows the total number of items if there are multiple pages.
 *
 * @param {Object} props - The component props.
 * @param {number} props.value - The current number of items per page.
 * @param {Array<{ label: string, value: number }>} props.options - The options for the dropdown, each containing a label and value.
 * @param {Function} props.onchange - Callback function triggered when the selected value changes.
 * @param {number} props.totalitems - The total number of items to paginate.
 *
 * @returns {JSX.Element|null} The rendered component or null if there is only one page.
 */

import { h, Fragment } from 'preact';
import { Select } from '../../Form';

export const ItemsPerPage = ({ value, options, onchange, totalitems }) => {
  const totalPages = Math.ceil(totalitems / value);

  const handleChange = (value) => {
    onchange(value);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="tw:flex tw:items-center tw:justify-between tw:gap-3 tw:max-lg:text-base">
      <p className="tw:font-bold">Showing</p>

      <Select
        options={options}
        value={value}
        onchange={handleChange}
        classname="tw:w-auto"
      />

      <p className="tw:inline-block">
        of <span className="tw:font-bold">{totalitems}</span> total paid
        invoices
      </p>
    </div>
  );
};

export default ItemsPerPage;
