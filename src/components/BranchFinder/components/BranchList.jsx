import { h, Fragment } from 'preact';
import { BranchCard } from './BranchCard';

/**
 * Component that renders a list of branches using the BranchCard component.
 *
 * @param {Object} props - The props for the BranchList component.
 * @param {string} props.title - The title to display above the list of branches.
 * @param {Array<Object>} props.branches - An array of branch objects to display.
 * @param {Function} props.onbranchclick - Callback function triggered when a branch is clicked.
 * @param {Function} props.onbranchdetailsclick - Callback function triggered when branch details are clicked.
 * @returns {JSX.Element} The rendered BranchList component.
 */

export const BranchList = ({
  title,
  branches,
  onbranchclick,
  onbranchdetailsclick,
}) => {
  return (
    <div>
      <p className="tw:mb-3 tw:px-4">{title}</p>

      <div className="tw:space-y-3">
        {branches.map((branch, index) => (
          <BranchCard
            key={index}
            {...branch}
            onclick={() => onbranchclick(branch)}
            ondetailsclick={() => onbranchdetailsclick(branch)}
          />
        ))}
      </div>
    </div>
  );
};
