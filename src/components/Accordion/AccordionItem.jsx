import { useState, useId } from 'preact/hooks';
import Icons from '../Icons/Icons';

/**
 * An individual accordion item component.
 * Handles both controlled and uncontrolled state for expand/collapse functionality.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string|React.ReactNode} props.question - The accordion item header/question text
 * @param {string|React.ReactNode} props.answer - The accordion item content/answer
 * @param {boolean} [props.isopen] - If provided, controls the open state externally (controlled mode)
 * @param {Function} [props.ontoggle] - Callback function when the accordion is toggled, receives index parameter
 * @param {number} [props.index] - Index of this accordion item in a parent accordion group
 * @returns {JSX.Element} - Rendered accordion item component
 */
const AccordionItem = ({
  question,
  answer,
  isopen: controlledIsOpen,
  ontoggle,
  index,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  // Generate unique IDs for accessibility
  const uniqueId = useId();
  const headingId = `accordion-heading-${uniqueId}`;
  const contentId = `accordion-content-${uniqueId}`;

  const toggleOpen = () => {
    if (isControlled) {
      ontoggle && ontoggle(index);
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleOpen();
    }
  };

  return (
    <div className="tw:border-b tw:border-black tw:last:border-b-0">
      <h3 id={headingId}>
        <button
          onClick={toggleOpen}
          onKeyDown={handleKeyDown}
          className="tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:justify-between tw:px-0 tw:py-3 tw:text-left tw:lg:py-6"
          aria-expanded={isOpen}
          aria-controls={contentId}
        >
          <span className="tw:text-lg tw:font-medium tw:text-black">
            {question}
          </span>
          <span className="tw:ml-4 tw:shrink-0 tw:text-black">
            {isOpen ? (
              <Icons.minus classname="tw:w-4 tw:h-4" />
            ) : (
              <Icons.plus classname="tw:h-4 tw:w-4" stroke="black" />
            )}
          </span>
        </button>
      </h3>
      <div
        id={contentId}
        role="region"
        aria-labelledby={headingId}
        hidden={!isOpen}
        className={`tw:overflow-hidden tw:transition-all tw:duration-300 tw:ease-in-out ${
          isOpen ? 'tw:max-h-screen tw:opacity-100' : 'tw:max-h-0 tw:opacity-0'
        }`}
      >
        <div className="tw:p-3 tw:text-black">{answer}</div>
      </div>
    </div>
  );
};

export default AccordionItem;
