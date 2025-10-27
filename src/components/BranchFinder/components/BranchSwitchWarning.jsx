import { h, Fragment } from 'preact';
import Button from '../../Button/Button';
import Icons from '../../Icons/Icons';
import Typography from '../../Typography/Typography';

/**
 * BranchSwitchWarning Component
 *
 * This component displays a warning message when a user attempts to switch branches,
 * notifying them that their basket will be emptied. It provides options to confirm
 * or cancel the branch switch.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onconfirm - Callback function triggered when the user confirms the branch switch.
 * @param {Function} props.oncancel - Callback function triggered when the user cancels the branch switch.
 *
 * @returns {JSX.Element} The rendered BranchSwitchWarning component.
 */

export const BranchSwitchWarning = ({ onconfirm, oncancel }) => {
  return (
    <div className="tw:space-y-10">
      <div className="tw:flex tw:items-start tw:space-x-3">
        <Icons.info
          classname="tw:h-8 tw:w-8 tw:text-primary tw:flex-shrink-0"
          stroke="#ff480c"
        />

        <Typography
          domtype="h5"
          content="Switching branches will empty your basket"
          classname="tw:text-primary"
        />
      </div>

      <p>
        You have 4 items in your Collect basket, which will not be saved if you
        switch branches. This is because products and stock are different for
        each branch.
      </p>

      <div className="tw:flex tw:flex-col tw:space-y-4">
        <Button
          label="Switch and empty basket"
          variant="tertiary"
          classname="tw:group-hover:bg-black-1000 tw:group-hover:text-white-1000 tw:group-hover:border-black-1000"
          onClick={onconfirm}
        />
        <Button label="Cancel" variant="secondary" onClick={oncancel} />
      </div>
    </div>
  );
};
