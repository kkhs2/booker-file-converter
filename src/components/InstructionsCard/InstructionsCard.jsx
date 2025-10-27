import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Checkbox } from '../Form';
import Typography from '../Typography/Typography';

/**
 * InstructionsCard component
 * @param {Object} props - Component props
 * @param {string} props.name - Name of the checkbox
 * @param {string} props.title - Title of the instruction
 * @param {string} props.details - Details about the instruction
 * @param {boolean} props.hasnote - Whether the instruction has an optional note
 * @param {function} props.onupdatenote - Callback function to update the note
 * @param {boolean} [props.initialchecked=false] - Initial checked state of the checkbox
 * @param {string} [props.initialnote=''] - Initial note value
 * @returns {JSX.Element} InstructionsCard component
 */
const InstructionsCard = ({
  name,
  title,
  details,
  hasnote,
  onupdatenote,
  initialchecked = false,
  initialnote = '',
}) => {
  const [isChecked, setIsChecked] = useState(initialchecked);
  const [note, setNote] = useState(initialnote);

  useEffect(() => {
    // Reset note if checkbox is unchecked and hasnote is true
    if (!isChecked && hasnote) {
      setNote('');
      if (onupdatenote) {
        onupdatenote('');
      }
    }
  }, [isChecked, hasnote, onupdatenote]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleNoteChange = (event) => {
    const newNote = event.target.value;
    setNote(newNote);
    if (onupdatenote) {
      onupdatenote(newNote);
    }
  };

  return (
    <div className="tw:mb-4 tw:rounded tw:bg-white tw:p-4">
      <div className="tw:flex tw:flex-col tw:justify-between tw:space-x-3 tw:max-lg:space-y-2 tw:lg:flex-row tw:lg:items-center">
        <div className="tw:flex tw:items-center tw:space-x-2">
          <Checkbox
            id={`instruction-checkbox-${name}`}
            name={name}
            checked={isChecked}
            onChange={handleCheckboxChange}
            aria-label={title}
          />
          <Typography
            htmlFor={`instruction-checkbox-${name}`}
            classname="tw:font-semibold tw:cursor-pointer tw:text-lg"
            domtype="label"
          >
            {title}
          </Typography>
        </div>
        <Typography classname="tw:text-[13px] tw:lg:text-base tw:max-lg:ml-7">
          {details}
        </Typography>
      </div>

      {hasnote && isChecked && (
        <div className="tw:mt-3">
          <textarea
            id={`instruction-note-${name}`}
            name={`${name}-note`}
            placeholder="Add a note (optional)"
            value={note}
            onChange={handleNoteChange}
            className="tw:w-full tw:rounded-lg tw:border tw:border-secondary-1300 tw:bg-white tw:p-4"
          />
        </div>
      )}
    </div>
  );
};

export default InstructionsCard;
