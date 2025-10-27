import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import Typography from '../../components/Typography/Typography';
import { AccountToggle } from './AccountToggle';

/**
 * AccountRail component renders a section with a title, description, toggle switch, and optional children.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.title - The title to display in the rail.
 * @param {string} props.description - The description text to display below the title.
 * @param {string} props.togglevalue - The initial value of the toggle switch.
 * @param {Array<Object>} props.toggleitems - The items for the toggle switch, each containing a label and value.
 * @param {Function} props.ontogglechange - Callback function triggered when the toggle value changes.
 * @param {React.ReactNode} [props.children] - Optional children elements to render below the toggle switch.
 *
 * @returns {JSX.Element} The rendered AccountRail component.
 */

export const AccountRail = ({
  title,
  description,
  togglevalue,
  toggleitems,
  ontogglechange,
  children,
}) => {
  const [toggleValue, setToggleValue] = useState(togglevalue);

  const handleToggleChange = (value) => {
    setToggleValue(value);
    ontogglechange(value);
  };

  return (
    <div className="tw:max-lg:px-5">
      <div className="tw:flex tw:items-start tw:justify-between tw:max-lg:mb-5 tw:max-lg:flex-col">
        <div className="tw:mb-5 tw:space-y-3 tw:lg:mb-8">
          <Typography domtype="h4" content={title} classname="tw:font-medium" />
          <p>{description}</p>
        </div>

        <AccountToggle
          items={toggleitems}
          value={toggleValue}
          onclick={handleToggleChange}
        />
      </div>

      {children}
    </div>
  );
};
