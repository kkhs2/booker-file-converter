import { h, Fragment } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import AccordionItem from './AccordionItem';
import Typography from '../Typography/Typography';

/**
 * Accordion component for displaying collapsible panels.
 *
 * @description This component allows users to expand and collapse panels to view content.
 *
 * @param {Array} items - The items to display in the accordion.
 * @param {string} [title] - Optional title to display above the accordion.
 * @param {string} [description] - Optional description to display under the title.
 * @param {boolean} allowmultiple - Whether multiple panels can be open at once.
 * @param {number|null} defaultopenindex - The index of the panel that should be open by default.
 * @returns {JSX.Element} The rendered accordion component.
 */
const Accordion = ({
  items,
  allowmultiple = false,
  defaultopenindex = null,
  title = null,
  description = null,
}) => {
  // State to manage which panels are open
  const [openPanels, setOpenPanels] = useState(
    defaultopenindex !== null
      ? allowmultiple
        ? [defaultopenindex]
        : new Set([defaultopenindex])
      : allowmultiple
        ? []
        : new Set(),
  );

  const accordionRef = useRef(null);
  const itemsRef = useRef([]);

  // Handle toggle item
  const handleToggleItem = (index) => {
    if (allowmultiple) {
      setOpenPanels((current) => {
        const newOpenPanels = [...current];
        const position = newOpenPanels.indexOf(index);

        if (position !== -1) {
          newOpenPanels.splice(position, 1);
        } else {
          newOpenPanels.push(index);
        }

        return newOpenPanels;
      });
    } else {
      setOpenPanels((current) => {
        const newOpenPanels = new Set(current);
        if (newOpenPanels.has(index)) {
          newOpenPanels.delete(index);
        } else {
          newOpenPanels.clear();
          newOpenPanels.add(index);
        }
        return newOpenPanels;
      });
    }
  };

  // Check if an item is open
  const isItemOpen = (index) => {
    return allowmultiple ? openPanels.includes(index) : openPanels.has(index);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (![38, 40, 36, 35].includes(e.keyCode)) return;

    e.preventDefault();

    const buttons = Array.from(
      accordionRef.current.querySelectorAll('[aria-controls]'),
    );

    const currentIndex = buttons.findIndex(
      (button) => document.activeElement === button,
    );

    let nextIndex;

    switch (e.keyCode) {
      case 38: // Up arrow
        nextIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
        break;
      case 40: // Down arrow
        nextIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
        break;
      case 36: // Home
        nextIndex = 0;
        break;
      case 35: // End
        nextIndex = buttons.length - 1;
        break;
      default:
        return;
    }

    buttons[nextIndex].focus();
  };

  // Set up keyboard event listener
  useEffect(() => {
    const ref = accordionRef.current;
    if (ref) {
      ref.addEventListener('keydown', handleKeyDown);
      return () => {
        ref.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, []);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div
      ref={accordionRef}
      className="tw:w-full"
      role="region"
      aria-label="Accordion"
    >
      {(title || description) && (
        <div className="tw:mb-4 tw:space-y-2">
          {title && <Typography domtype="h4" content={title} />}

          {description && (
            <Typography
              domtype="p"
              classname="tw:text-13 tw:lg:text-lg tw:xl:max-w-[840px] tw:text-pretty"
              content={description}
            />
          )}
        </div>
      )}
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          ref={(el) => (itemsRef.current[index] = el)}
          question={item.question}
          answer={item.answer}
          index={index}
          isOpen={isItemOpen(index)}
          onToggle={handleToggleItem}
        />
      ))}
    </div>
  );
};

export default Accordion;
