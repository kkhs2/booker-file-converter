import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Icons from '../Icons/Icons';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';

/**
 * Product Add Note
 *
 * @description The Product Add Note component renders the product add note button.
 *
 * @param {object} props - The props object.
 * @param {boolean} props.hasnote - The flag to check if a note exists.
 * @param {function} props.onsave - The function to save the note.
 * @param {string} [props.note] - The initial note text.
 * @param {boolean} [props.autoShow=false] - Flag to automatically show the modal on mount.
 * @returns {JSX.Element} Rendered Product Add Note component.
 */
export const ProductAddNote = ({ hasnote, note, autoShow, onsave }) => {
  const [isModalOpen, setIsModalOpen] = useState(autoShow || false);

  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState(note || '');

  const scrollYRef =
    typeof window !== 'undefined' ? { current: 0 } : { current: 0 };

  useEffect(() => {
    if (isModalOpen) {
      // Small delay to ensure DOM is ready before starting transition
      setTimeout(() => setIsVisible(true), 10);

      // Prevent scrolling on body
      scrollYRef.current = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollYRef.current}px`;
    } else {
      setIsVisible(false);

      // Re-enable scrolling when modal is closed
      if (document.body.style.position === 'fixed') {
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollYRef.current);
      } else {
        document.body.style.overflow = '';
      }
    }

    // Cleanup function to ensure scroll is re-enabled if component unmounts
    return () => {
      if (document.body.style.position === 'fixed') {
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollYRef.current);
      } else {
        document.body.style.overflow = '';
      }
    };
  }, [isModalOpen]);

  // Handle modal close
  const closeModal = () => {
    setIsVisible(false);
    // Wait for transition to complete before removing from DOM
    setTimeout(() => setIsModalOpen(false), 300);
  };

  // Handle save
  const handleSave = () => {
    onsave(value);
    closeModal();
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (e) => {
      if (isModalOpen && e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isModalOpen]);

  return (
    <>
      {hasnote ? (
        <button
          className="tw:inline-flex tw:cursor-pointer tw:items-center tw:gap-2 tw:rounded-md tw:bg-green-100 tw:px-3 tw:py-2 tw:text-base"
          onClick={() => setIsModalOpen(true)}
        >
          <Icons.checkMarkNote />
          Edit Butcher's note
        </button>
      ) : (
        <button
          className="tw:inline-flex tw:cursor-pointer tw:items-center tw:gap-2 tw:rounded-md tw:bg-grey-1100 tw:px-3 tw:py-2 tw:text-base"
          onClick={() => setIsModalOpen(true)}
          aria-label="Add a Butchers note"
          aria-expanded={isModalOpen}
          aria-haspopup="dialog"
        >
          <Icons.addNote />
          Add a Butchers note
        </button>
      )}
      <>
        {isModalOpen && (
          <div
            className={`tw:fixed tw:top-0 tw:right-0 tw:bottom-0 tw:left-0 tw:z-50 tw:flex tw:items-end tw:bg-black/50 tw:transition-opacity tw:duration-300 tw:lg:items-center tw:lg:justify-center ${isVisible ? 'tw:opacity-100' : 'tw:opacity-0'}`}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <div
              className={`tw:rounded-[20px] tw:bg-secondary-1000 tw:p-10 tw:shadow-[24px_24px_36px_-32px_rgba(0,0,0,0.24)] tw:transition-all tw:duration-300 ${isVisible ? 'tw:scale-100 tw:opacity-100' : 'tw:scale-95 tw:opacity-0'}`}
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
            >
              <Typography domtype="h5" classname="tw:text-primary">
                Cutting specifications
              </Typography>
              <textarea
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) {
                    handleSave();
                  }
                }}
                cols={150}
                rows={10}
                value={value}
                autoFocus
                className="tw:mt-6 tw:w-full tw:max-w-[544px] tw:rounded-lg tw:border tw:border-grey-600 tw:bg-secondary-1000 tw:px-4 tw:py-2 tw:text-base tw:focus:outline-none"
                placeholder="Add your note here..."
              ></textarea>
              <div className="tw:mt-6 tw:flex tw:w-full tw:max-w-[60%] tw:justify-end tw:space-x-2 tw:justify-self-end">
                <Button
                  label="Cancel"
                  variant="secondary"
                  onclick={closeModal}
                  classname="tw:w-1/2"
                />
                <Button
                  label="Save"
                  variant="primary"
                  onclick={handleSave}
                  classname="tw:w-1/2"
                />
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
};
