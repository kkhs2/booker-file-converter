import { h, Fragment } from 'preact';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';

/**
 * ViewSwitcher component allows users to toggle between list and grid view modes.
 * @param {Object} props - The component props.
 * @param {string} props.viewMode - The current view mode, either 'list' or 'grid'.
 * @param {Function} props.setViewMode - Function to update the view mode.
 * @returns {JSX.Element} The rendered ViewSwitcher component.
 */
const ViewSwitcher = ({ viewMode = 'grid', setViewMode }) => {
  return (
    <div className="tw:flex tw:rounded-full tw:bg-white tw:p-1">
      <Button
        label="List"
        variant={viewMode === 'list' ? 'tertiary' : 'inverse'}
        size="small"
        iconleft={<Icons.list classname="tw:w-4 tw:h-4" />}
        onClick={() => setViewMode('list')}
      />
      <Button
        label="Grid"
        variant={viewMode === 'grid' ? 'tertiary' : 'inverse'}
        size="small"
        iconleft={<Icons.grid classname="tw:w-4 tw:h-4" />}
        onClick={() => setViewMode('grid')}
      />
    </div>
  );
};

export default ViewSwitcher;
