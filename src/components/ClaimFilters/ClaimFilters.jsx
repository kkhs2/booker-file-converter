import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { cn } from '../../../utils/helpers';
import SearchInput from '../Form/SearchInput';
import { Select } from '../Form';

/**
 * ClaimFilters Component
 *
 * @description A component that provides filtering and search functionality for claims.
 *
 * @param {Object} props - Component props
 * @param {string} [props.initialSearch] - Initial search value
 * @param {Object} [props.initialClaimDate] - Initial claim date filter value
 * @param {Object} [props.initialInvoiceDate] - Initial invoice date filter value
 * @param {Function} [props.onsearch] - Callback when search is performed
 * @param {Function} [props.onclaimdatechange] - Callback when claim date filter changes
 * @param {Function} [props.oninvoicedatechange] - Callback when invoice date filter changes
 * @param {string} [props.classname] - Additional classes to add to the component
 * @param {boolean} [props.showClaimDateFilter] - Whether to show the claim date filter
 * @param {Array} [props.claimDateOptions] - Options for claim date filter dropdown
 * @param {Array} [props.invoiceDateOptions] - Options for invoice date filter dropdown
 *
 * @returns {JSX.Element} Preact component - The ClaimFilters component
 */
const ClaimFilters = ({
  initialSearch = '',
  initialClaimDate = null,
  initialInvoiceDate = null,
  onsearch = () => {},
  onclaimdatechange = () => {},
  oninvoicedatechange = () => {},
  classname = '',
  showClaimDateFilter = true,
  claimDateOptions = [
    { value: 'last-30-days', label: 'Last 30 days' },
    { value: 'last-60-days', label: 'Last 60 days' },
    { value: 'last-90-days', label: 'Last 90 days' },
    { value: 'this-year', label: 'This year' },
    { value: 'last-year', label: 'Last year' },
  ],
  invoiceDateOptions = [
    { value: 'last-30-days', label: 'Last 30 days' },
    { value: 'last-60-days', label: 'Last 60 days' },
    { value: 'last-90-days', label: 'Last 90 days' },
    { value: 'this-year', label: 'This year' },
    { value: 'last-year', label: 'Last year' },
  ],
}) => {
  const [searchValue, setSearchValue] = useState(initialSearch);
  const [claimDate, setClaimDate] = useState(initialClaimDate);
  const [invoiceDate, setInvoiceDate] = useState(initialInvoiceDate);

  // Update state when initial values change
  useEffect(() => {
    setSearchValue(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    setClaimDate(initialClaimDate);
  }, [initialClaimDate]);

  useEffect(() => {
    setInvoiceDate(initialInvoiceDate);
  }, [initialInvoiceDate]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    onsearch(e.target.value);
  };

  const handleClaimDateChange = (value) => {
    setClaimDate(value);
    onclaimdatechange(value);
  };

  const handleInvoiceDateChange = (value) => {
    setInvoiceDate(value);
    oninvoicedatechange(value);
  };

  return (
    <div
      className={cn(
        'tw:flex tw:w-full tw:flex-col tw:gap-2 tw:rounded-[20px] tw:bg-white tw:p-4 tw:px-6 tw:lg:flex-row tw:lg:gap-4',
        classname,
      )}
    >
      <div
        className={cn(
          'tw:mb-2 tw:flex-1 tw:lg:mb-0',
          !showClaimDateFilter && 'tw:lg:min-w-[300px] tw:lg:flex-auto',
        )}
      >
        <SearchInput
          value={searchValue}
          onInput={handleSearch}
          placeholder="Search invoice or claim number"
          classname="tw:lg:max-w-[427px]"
        />
      </div>

      {showClaimDateFilter && (
        <div className="tw:mb-2 tw:w-full tw:lg:mb-0 tw:lg:w-[250px]">
          <Select
            options={claimDateOptions}
            value={claimDate}
            onchange={handleClaimDateChange}
            placeholder="Claim date"
            label="Claim date"
          />
        </div>
      )}

      <div className="tw:w-full tw:lg:w-[250px]">
        <Select
          options={invoiceDateOptions}
          value={invoiceDate}
          onchange={handleInvoiceDateChange}
          placeholder="Invoice date"
          label="Invoice date"
        />
      </div>
    </div>
  );
};

export default ClaimFilters;
