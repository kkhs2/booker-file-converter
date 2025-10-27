import { h, Fragment } from 'preact';
import Button from '../Button/Button';

/**
 * FilterButtons component for selecting FAQ topics.
 * @param {Array<string>} topics - List of topic strings.
 * @param {Array<string>} value - Currently selected topics.
 * @param {Function} onchange - Callback when selection changes.
 */
const FilterButtons = ({ topics, value = [], onchange }) => {
  // Controlled: value is selected keys, onchange is callback
  const handleClick = (item) => {
    let newSelected;
    if (value.includes(item.key)) {
      newSelected = value.filter((i) => i !== item.key);
    } else {
      newSelected = [...value, item.key];
    }
    if (onchange) onchange(newSelected);
  };

  return (
    <div className="tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:gap-3">
      {topics.map((topic) => (
        <Button
          variant={value.includes(topic.key) ? 'tertiary' : 'secondary'}
          onclick={() => handleClick(topic)}
          key={topic.key}
          label={topic.label}
        />
      ))}
    </div>
  );
};

export default FilterButtons;
