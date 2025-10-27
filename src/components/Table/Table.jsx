import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';

/**
 * @component Table
 * @description A generic, reusable table component with customizable headers, rows, and styling
 *
 * @param {Object} props - Component props
 * @param {Array} props.headers - Array of header objects with label and optionally alignment
 * @param {Array} props.data - Array of row data objects, values can be strings or React components
 * @param {number} [props.rows=5] - Number of rows to display (can be customized)
 * @param {string} [props.classname] - Additional CSS classes for the table container
 * @param {Function} [props.onrowclick] - Callback function when a row is clicked
 * @param {string} [props.emptymessage='No data available'] - Message to show when no data is provided
 * @param {boolean} [props.showheader=true] - Whether to show the table header
 *
 * @returns {JSX.Element} A customizable table component
 */

// render cell content
const renderCellContent = (content) => {
  if (content === null || content === undefined) {
    return '';
  }

  if (typeof content === 'object' && (content.type || content.props)) {
    return content;
  }

  if (typeof content === 'function') {
    return content();
  }

  return content.toString();
};

const Table = ({
  headers = [],
  data = [],
  rows = 5,
  classname,
  onrowclick,
  emptymessage = 'No data available',
  showheader = true,
  ...props
}) => {
  const displayData = data.slice(0, rows);

  const tableData =
    displayData.length > 0
      ? displayData
      : Array(rows)
          .fill(null)
          .map((_, index) => {
            const row = {};
            headers.forEach((header, headerIndex) => {
              row[header.key || `col_${headerIndex}`] = 'Table cell';
            });
            return row;
          });

  const tableHeaders =
    headers.length > 0
      ? headers
      : Array(5)
          .fill(null)
          .map((_, index) => ({
            key: `col_${index}`,
            label: 'Table header',
            align: 'left',
          }));

  if (tableData.length === 0) {
    return (
      <div className={cn('tw:p-8 tw:text-center', classname)}>
        {emptymessage}
      </div>
    );
  }

  const tableContent = (
    <table
      className={cn('tw:w-full tw:border-collapse tw:text-grey-800')}
      {...props}
    >
      {showheader && (
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <th
                key={header.key || index}
                className={cn(
                  'tw:bg-beige-1000 tw:p-4 tw:font-medium tw:first:rounded-l-xl tw:last:rounded-r-xl',
                  {
                    'tw:text-left': header.align === 'left' || !header.align,
                    'tw:text-center': header.align === 'center',
                    'tw:text-right': header.align === 'right',
                  },
                )}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="tw:bg-secondary-1000"
            onClick={
              typeof onrowclick === 'function'
                ? () => onrowclick(row, rowIndex)
                : undefined
            }
          >
            {tableHeaders.map((header, cellIndex) => (
              <td
                key={header.key || cellIndex}
                className={cn('tw:border-b tw:border-secondary-1300 tw:p-4', {
                  'tw:text-left': header.align === 'left' || !header.align,
                  'tw:text-center': header.align === 'center',
                  'tw:text-right': header.align === 'right',
                })}
              >
                {renderCellContent(row[header.key || `col_${cellIndex}`])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className={cn('tw:w-full tw:overflow-x-auto', classname)}>
      {tableContent}
    </div>
  );
};

export default Table;
