import { h, Fragment } from 'preact';
import { cn } from '../../../../utils/helpers';
import Icons from '../../Icons/Icons';

/**
 * BranchListViewToggle component allows users to toggle between "list" and "map" views.
 *
 * @param {Object} props - The component props.
 * @param {'list' | 'map'} props.view - The current view mode, either "list" or "map".
 * @param {Function} props.onviewchange - Callback function to handle view change.
 *                                         It receives the new view mode as an argument.
 *
 * @returns {JSX.Element} The rendered toggle component.
 */

export const BranchListViewToggle = ({ view, onviewchange }) => {
  return (
    <div className="tw:my-5 tw:flex tw:w-fit tw:space-x-0.5 tw:rounded-full tw:border tw:border-black/20 tw:p-1 tw:lg:my-8">
      <button
        className={cn(
          'tw:flex tw:cursor-pointer tw:items-center tw:space-x-1 tw:rounded-full tw:px-2 tw:py-1 tw:transition',
          view === 'list' && 'tw:bg-black-1000 tw:text-white-1000',
        )}
        onClick={() => onviewchange('list')}
      >
        <Icons.list classname="w-2" />
        <span>List</span>
      </button>

      <button
        className={cn(
          'tw:flex tw:cursor-pointer tw:items-center tw:space-x-1 tw:rounded-full tw:px-2 tw:py-1 tw:transition',
          view === 'map' && 'tw:bg-black-1000 tw:text-white-1000',
        )}
        onClick={() => onviewchange('map')}
      >
        <Icons.map classname="w-2" />
        <span>Map</span>
      </button>
    </div>
  );
};
