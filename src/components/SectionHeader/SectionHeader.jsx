/**
 * Renders a header for a section, optionally including a title, save button, and sort dropdown.
 *
 * @description The SectionHeader component is designed to provide a consistent header layout for various sections of an application. It allows for the inclusion of a title, a save button, and a sort dropdown, making it versatile for different use cases.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - Content to be rendered within the header, typically a title or heading elements.
 * @param {boolean} [props.showsavebutton=false] - Determines if the save button should be displayed.
 * @param {Function} [props.onsaveclick=()=>{}] - Callback function executed when the save button is clicked.
 * @param {string} [props.savebuttonlabel='Save for later'] - Text label for the save button.
 * @param {boolean} [props.showsortdropdown=false] - Determines if the sort dropdown should be displayed.
 * @param {object} [props.sortoptions={}] - Configuration object for the sort dropdown. Expected to have an `items` property for the `FilterDropdown` component.
 * @param {*} props.sortvalue - The currently selected value in the sort dropdown.
 * @param {Function} [props.onsortchange=()=>{}] - Callback function executed when the sort dropdown value changes.
 * @param {string} [props.classname=''] - Additional CSS classes to apply to the header element.
 * @returns {React.ReactElement} The rendered section header component.
 */
import { h, Fragment } from 'preact';
import { FilterDropdown } from '../ProductFilters/components/FilterDropdown';

const SectionHeader = ({
  children,
  showsavebutton = false,
  onsaveclick = () => {},
  savebuttonlabel = 'Save for later',
  showsortdropdown = false,
  sortoptions = {},
  sortvalue,
  onsortchange = () => {},
  classname = '',
}) => {
  return (
    <header
      className={`tw:flex tw:flex-col tw:max-lg:space-y-4 tw:lg:flex-row tw:lg:items-center tw:lg:justify-between ${classname}`}
    >
      <div className="tw:flex tw:items-center tw:gap-2">{children}</div>

      <div className="tw:flex tw:items-center tw:gap-6 tw:max-lg:flex-row-reverse">
        {showsavebutton && (
          <button
            onClick={onsaveclick}
            className="tw:shrink-0 tw:cursor-pointer tw:appearance-none tw:underline tw:decoration-dotted"
          >
            {savebuttonlabel}
          </button>
        )}

        {showsortdropdown && sortoptions.items && (
          <FilterDropdown
            variant="single"
            itemvariant="plain"
            value={sortvalue}
            options={sortoptions}
            onchange={onsortchange}
          />
        )}
      </div>
    </header>
  );
};

export default SectionHeader;
