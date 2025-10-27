/**
 * Invoice Table Component
 *
 * @description Renders a customisable data table with sorting, selection, and status indicators.
 *
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of row objects to display in the table
 * @param {Array} props.columns - Array of column definitions with field, label, and optional formatting
 * @param {boolean} props.isscrollable - Whether table is horizontally scrollable
 * @param {string} props.fakespacing - Optional spacing class for bottom margin
 * @param {Function} props.onrowselect - Callback when rows are selected
 * @param {Function} props.onsort - Callback when column is sorted
 * @param {Function} props.onclearsearch - Callback when search is cleared
 * @param {Function} props.oninvoiceclick - Callback when invoice number is clicked
 * @param {Object} props.defaultsort - Default sort configuration { field: string, order: 'asc' | 'desc' }
 * @param {string} props.classname - Additional CSS classes
 *
 * @returns {JSX.Element} Preact component
 */

// Imports
import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { cn } from '../../../utils/helpers';
import Icons from '../Icons/Icons';
import { Checkbox } from '../Form';
import Chip from '../BetterCredit/Chip/Chip';
import Message from '../BetterCredit/Message/Message';

const InvoiceTable = ({
  data = [],
  columns = [],
  isscrollable = true,
  fakespacing,
  onrowselect,
  onsort,
  onclearsearch,
  oninvoiceclick,
  defaultsort,
  classname,
  ...props
}) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortField, setSortField] = useState(defaultsort?.field || null);
  const [sortOrder, setSortOrder] = useState(defaultsort?.order || 'asc');
  const [sortedData, setSortedData] = useState(data);
  const [visibleColumns, setVisibleColumns] = useState(columns);

  // Helper function to get a unique identifier for each row
  const getRowId = (row) => {
    // Try to use invoiceNo first if available
    if (row.invoiceNo !== undefined) return row.invoiceNo;
    // Fall back to id if available
    if (row.id !== undefined) return row.id;
    // As a last resort, stringify the row to create a unique identifier
    return JSON.stringify(row);
  };

  // Update useEffect to also reset selections when data changes
  useEffect(() => {
    setSortedData(data);
    setSelectedIds([]); // Reset selected rows
    if (onrowselect) {
      onrowselect?.([]); // Notify parent that selections have been cleared
    }
  }, [data]);

  // Update visible columns when data or columns change
  useEffect(() => {
    if (data.length === 0) {
      setVisibleColumns(columns);
      return;
    }

    // Filter columns that have at least one non-empty value
    const columnsWithData = columns.filter((column) => {
      return data.some((row) => {
        const value = row[column.field];
        // Check if value exists and is not empty/null/undefined
        return (
          value !== null &&
          value !== undefined &&
          value !== '' &&
          String(value).trim() !== ''
        );
      });
    });

    setVisibleColumns(columnsWithData);
  }, [data, columns]);

  // Apply default sort when data changes or component mounts
  useEffect(() => {
    if (defaultsort?.field && data.length > 0) {
      handleSort(defaultsort.field, defaultsort.order || 'asc', true);
    }
  }, [data, defaultsort]);

  // Tailwind classes for styling
  const CLASSES = {
    header: {
      sort: {
        asc: 'tw:inline-block tw:ml-2',
        desc: 'tw:inline-block tw:ml-2',
      },
    },
    body: {
      cell: {
        base: 'tw:border-t tw:border-beige-1000 tw:px-3 tw:py-2.5 tw:align-middle',
        truncate:
          'tw:whitespace-nowrap tw:overflow-hidden tw:text-ellipsis tw:max-w-full',
      },
    },
    column: 'tw:text-base tw:border-l tw:border-beige-1000',
  };

  // Sorting handler
  const handleSort = (field, order = null, isDefaultSort = false) => {
    const newOrder =
      order || (sortField === field && sortOrder === 'asc' ? 'desc' : 'asc');

    if (!isDefaultSort) {
      setSortField(field);
      setSortOrder(newOrder);
    }

    if (onsort && !isDefaultSort) {
      onsort?.(field, newOrder);
      return;
    }

    // Local sorting if no callback provided or if it's a default sort
    const newSortedData = [...data].sort((a, b) => {
      // Handle dates
      if (field === 'date') {
        const dateA = new Date(a[field]);
        const dateB = new Date(b[field]);
        return newOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }

      // Extract numbers from strings
      const numericRegex = /[-+]?\d*\.?\d+/g;
      const aMatch = String(a[field]).match(numericRegex);
      const bMatch = String(b[field]).match(numericRegex);

      if (aMatch && bMatch) {
        const aNum = parseFloat(aMatch[0]);
        const bNum = parseFloat(bMatch[0]);
        return newOrder === 'asc' ? aNum - bNum : bNum - aNum;
      }

      // Default string comparison
      const aStr = String(a[field]).toLowerCase();
      const bStr = String(b[field]).toLowerCase();
      return newOrder === 'asc'
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });

    setSortedData(newSortedData);
  };

  // Update HeaderCheckbox to use the new ID format
  const HeaderCheckbox = () => {
    const selectableRows = data.filter((row) => !row.isLocked);
    const allSelected =
      selectableRows.length > 0 &&
      selectableRows.every((row) => selectedIds.includes(getRowId(row)));

    return (
      <Checkbox
        variant="secondary"
        checked={allSelected}
        onChange={(e) => {
          const isSelectingAll = e.target.checked;
          const newSelectedIds = isSelectingAll
            ? selectableRows.map((row) => getRowId(row))
            : [];
          setSelectedIds(newSelectedIds);
          onrowselect?.(
            data.filter((row) => newSelectedIds.includes(getRowId(row))),
          );
        }}
      />
    );
  };

  // Update RowCheckbox to use the new ID format
  const RowCheckbox = ({ row, isSelected }) => {
    const rowId = getRowId(row);

    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
      const rowElement = document.querySelector(`tr[data-row-id="${rowId}"]`);
      if (!rowElement) return;

      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);

      rowElement.addEventListener('mouseenter', handleMouseEnter);
      rowElement.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        rowElement.removeEventListener('mouseenter', handleMouseEnter);
        rowElement.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, [rowId]);

    const handleChange = (e) => {
      e.stopPropagation();
      const checked = e.target.checked;

      const newSelectedIds = checked
        ? [...selectedIds, rowId]
        : selectedIds.filter((id) => id !== rowId);

      setSelectedIds(newSelectedIds);

      const selectedRows = data.filter((row) =>
        newSelectedIds.includes(getRowId(row)),
      );
      onrowselect?.(selectedRows);
    };

    return (
      <Checkbox
        variant={isHovered ? 'secondary' : 'default'}
        checked={isSelected}
        onChange={handleChange}
      />
    );
  };

  // Cell renderer
  const renderCell = (row, column, colIndex) => {
    const value = row[column.field];
    const isBold =
      selectedIds.includes(getRowId(row)) &&
      (column.field === 'gross' || column.field === 'balance');
    const isRed = column.field === 'dueIn' && row.status === 'Overdue';
    const isLastColumn = colIndex === visibleColumns.length - 1;
    const isLastRow = getRowId(row) === selectedIds[selectedIds.length - 1];

    if (column.component === 'Chip') {
      return (
        <td className={cn('tw:border-t tw:px-3 tw:py-2', CLASSES.column)}>
          <Chip
            status={value.replace(/\s+/g, '').toLowerCase()}
            label={value}
          />
        </td>
      );
    }

    // Check if this is an invoice number field that should be clickable
    const isInvoiceNumber =
      column.field === 'invoiceNo' || column.field === 'invoiceNumber';
    const shouldBeClickable = isInvoiceNumber && oninvoiceclick;

    return (
      <td
        className={cn(
          CLASSES.body.cell.base,
          CLASSES.column,
          isBold ? 'tw:font-bold' : '',
          isRed ? 'tw:font-bold tw:text-red-700' : '',
          CLASSES.body.cell.truncate,
          isLastRow && isLastColumn ? 'tw:rounded-br-lg' : '',
        )}
        title={value}
      >
        {shouldBeClickable ? (
          <button
            onClick={() => oninvoiceclick(row, value)}
            className="hover:tw:text-primary-600 hover:tw:underline-offset-4 tw:m-0 tw:w-full tw:cursor-pointer tw:border-none tw:bg-transparent tw:p-0 tw:text-left tw:text-primary tw:underline tw:underline-offset-2 tw:transition-all tw:duration-200"
            title={`Click to view invoice ${value}`}
          >
            {value}
          </button>
        ) : (
          value
        )}
      </td>
    );
  };

  // Empty state component
  const renderEmptyState = () => (
    <tr>
      <td
        colSpan={visibleColumns.length + 1}
        className="tw:rounded-lg tw:bg-white tw:p-6 tw:text-center"
      >
        <Message
          title="No invoices found"
          message="Try double checking your invoice number."
          hasactionbutton={true}
          buttontext="Clear search"
          buttonicon={<Icons.x classname="tw:w-3 tw:h-3" />}
          onbuttonclick={onclearsearch}
          classname="tw:md:flex-row tw:justify-center tw:max-w-[calc(100dvw-4rem)] tw:md:w-full tw:lg:w-full tw:gap-6 tw:md:gap-6 tw:lg:gap-6"
        />
      </td>
    </tr>
  );

  return (
    <div
      role="region"
      aria-label="Data table"
      className={cn(
        'tw:-mx-4 tw:flex tw:w-screen tw:px-4 tw:whitespace-nowrap tw:md:-mx-0 tw:md:w-full tw:md:px-0',
        data.length
          ? isscrollable
            ? 'tw:overflow-x-auto'
            : ''
          : 'tw:overflow-hidden',
        classname,
      )}
      {...props}
    >
      {/* Main table structure */}
      <table
        className={cn(
          'tw:w-full tw:min-w-full tw:border-separate tw:border-spacing-0 tw:overflow-hidden tw:rounded-xl tw:border tw:border-beige-1000 tw:bg-secondary-1100',
          'tw:lg:table-fixed',
        )}
      >
        {/* Column widths */}
        <colgroup>
          <col style={{ width: '44px' }} />
          {visibleColumns.map((col, i) => (
            <col
              key={i}
              style={{ width: col.maxChars ? `${col.maxChars}ch` : 'auto' }}
            />
          ))}
        </colgroup>

        {/* Table header */}
        <thead>
          <tr>
            <th className="tw:flex tw:p-3">
              <HeaderCheckbox />
            </th>
            {visibleColumns.map((column) => {
              const isSorted = sortField === column.field;
              return (
                <th
                  key={column.field}
                  className={cn(
                    'sort-header tw:cursor-pointer tw:p-4 tw:text-left tw:text-sm tw:font-semibold tw:text-black',
                    CLASSES.column,
                    CLASSES.body.cell.truncate,
                  )}
                  onClick={() => handleSort(column.field, null, false)}
                  data-field={column.field}
                >
                  <div className="tw:flex tw:items-center">
                    <span>{column.label}</span>
                    <span
                      className={cn(
                        CLASSES.header.sort[sortOrder],
                        isSorted &&
                          `stroke-${isSorted ? '#00539F' : '#2F2F2F'}`,
                      )}
                    >
                      {sortOrder === 'asc' && isSorted ? (
                        <Icons.arrowLeft classname="tw:rotate-90 tw:h-3 tw:w-3 tw:text-primary" />
                      ) : (
                        <Icons.arrowLeft classname="tw:-rotate-90 tw:h-3 tw:w-3 tw:text-primary" />
                      )}
                    </span>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {sortedData.length
            ? sortedData.map((row, index) => {
                const isLastRow = index === sortedData.length - 1;
                const isSelected = selectedIds.includes(getRowId(row));

                return (
                  <tr
                    data-row-id={getRowId(row)}
                    key={getRowId(row)}
                    className={cn(
                      'tw:border-t-0 tw:border-r tw:border-b tw:border-l tw:border-beige-1000',
                      'tw:[&:not(.selected)]:bg-white tw:[&:not(.selected)]:hover:bg-secondary-1100',
                      isSelected ? 'selected' : '',
                      isLastRow
                        ? 'tw:clip-border-box tw:rounded-br-xl tw:rounded-bl-xl tw:border-t-1'
                        : '',
                    )}
                  >
                    <td
                      className={cn(
                        CLASSES.body.cell.base,

                        row.isLocked ? '' : 'tw:flex',
                      )}
                    >
                      {row.isLocked ? (
                        <span className="tw:flex tw:cursor-not-allowed tw:justify-center">
                          {<Icons.padlock classname="tw:text-primary" />}
                        </span>
                      ) : (
                        <RowCheckbox row={row} isSelected={isSelected} />
                      )}
                    </td>
                    {visibleColumns.map((column, colIndex) =>
                      renderCell({ ...row }, column, colIndex),
                    )}
                  </tr>
                );
              })
            : renderEmptyState()}
        </tbody>
      </table>

      {/* Fake spacing */}
      {fakespacing && (
        <div
          className={cn('tw:relative tw:h-1 tw:flex-shrink-0', fakespacing)}
        />
      )}
    </div>
  );
};

export default InvoiceTable;
