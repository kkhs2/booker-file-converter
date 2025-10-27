import { h, Fragment } from 'preact';
import Icons from '../../Icons/Icons';
import { useState, useRef, useEffect } from 'preact/hooks';
import Button from '../../Button/Button';
import { Modal } from '../../Modal/Modal';

/**
 * Search With List Component
 * @description The SearchWithList component allows users to add items to a list and search them all at once.
 * Can be opened via button clicks, by setting openModal prop, or by dispatching a custom 'openSearchWithList' event.
 * @param {Object} props - The props object.
 * @param {boolean} props.isMobile - The mobile breakpoint state.
 * @param {Array} props.searchterms - The initial list of search terms.
 * @param {Function} props.onsearchwithlist - The function to call when the search button is clicked.
 * @param {boolean} props.openModal - External trigger to open the modal.
 * @param {Function} props.onModalStateChange - Callback when modal state changes (opened/closed).
 * @returns {JSX.Element} - The SearchWithList component
 *
 * @example
 * // To open from another component via prop:
 * <SearchWithList openModal={true} onModalStateChange={(isOpen) => setIsModalOpen(isOpen)} />
 *
 * // To open from another component via event:
 * window.dispatchEvent(new CustomEvent('openSearchWithList', {
 *   detail: { searchTerms: ['apple', 'banana'] } // optional
 * }));
 * */ export const SearchWithList = ({
  isMobile,
  searchterms = [],
  onsearchwithlist,
  openModal = false,
  onModalStateChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(searchterms);

  const inputRef = useRef();

  // focus on input when modal is opened
  const handleOpenModal = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current.focus(), []);
  };

  // Listen for custom event to open modal from external components
  useEffect(() => {
    const handleOpenSearchWithListEvent = (event) => {
      // Extract search terms from event detail if provided
      const { searchTerms } = event.detail || {};

      // If search terms are provided in the event, update items
      if (searchTerms && Array.isArray(searchTerms)) {
        setItems(searchTerms);
      }

      // Open the modal
      setIsOpen(true);
      // Focus input after modal opens
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    };

    // Add event listener for the custom event
    window.addEventListener(
      'openSearchWithList',
      handleOpenSearchWithListEvent,
    );

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener(
        'openSearchWithList',
        handleOpenSearchWithListEvent,
      );
    };
  }, []); // Empty dependency array since we're using setState directly

  // Handle external openModal prop
  useEffect(() => {
    if (openModal && !isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, [openModal, isOpen]);

  // Notify parent when modal state changes
  useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(isOpen);
    }
  }, [isOpen, onModalStateChange]);

  const handleAddItem = (value) => {
    if (!value || !isOpen) return;

    setItems([...items, value]);
    inputRef.current.value = '';
    inputRef.current.focus();
  };

  const handleCancel = () => {
    setIsOpen(false);
    setItems(searchterms);
  };

  return (
    <>
      {/* Temporary move search with list in nav */}
      {/* {!isMobile && (
        <button
          className="tw:inline-flex tw:w-full tw:cursor-pointer tw:items-center tw:gap-2"
          onClick={handleOpenModal}
          aria-label="Search with a list"
        >
          <span>Search with a list</span>

          <Icons.chevronRight classname="tw:h-4 tw:w-4 tw:rotate-90" />
        </button>
      )} */}

      {isMobile && (
        <button
          className="tw:mx-4 tw:flex tw:cursor-pointer tw:items-center tw:gap-2 tw:decoration-dotted tw:decoration-1"
          onClick={handleOpenModal}
        >
          <Icons.list classname="tw:h-4 tw:w-4" />
          Search with a list
        </button>
      )}

      <Modal
        isopen={isOpen}
        title="Search with a list"
        description="
              Add one item per line, or separate by comma, then search the lot
              when you're ready to shop."
        buttonscomponent={() => (
          <>
            <Button
              label="Cancel"
              variant="secondary"
              onclick={() => handleCancel()}
              classname="tw:px-16"
            />
            <Button
              label="Search"
              variant="primary"
              onclick={() => {
                onsearchwithlist(items);
                setIsOpen(false);
              }}
              classname="tw:px-16"
              state={items.length === 0 ? 'disabled' : 'enabled'}
            />
          </>
        )}
        onclose={handleCancel}
      >
        <div className="tw:my-6 tw:flex tw:h-[35svh] tw:flex-col tw:gap-x-3 tw:space-y-3 tw:rounded-lg tw:border-[1.5px] tw:border-black-1000 tw:bg-white tw:px-4 tw:py-2">
          <form
            className="tw:w-full"
            onSubmit={(e) => {
              e.preventDefault();

              // get the value from the input
              const value = inputRef.current.value;

              handleAddItem(value);
            }}
          >
            <input
              ref={inputRef}
              type="text"
              className="tw:flex tw:w-full tw:items-center tw:gap-4 tw:border-b tw:border-dashed tw:border-black tw:pt-6 tw:pb-4 tw:focus:outline-0"
              onBlur={(e) => {
                if (!e.relatedTarget) handleAddItem(e.target.value); // Prevent onBlur when pressing Escape
              }}
              placeholder="e.g flour, plastic boxes, heinz beans"
            />
          </form>

          <div className="tw:flex tw:h-[400px] tw:w-full tw:flex-col tw:gap-y-3 tw:overflow-y-auto">
            {Object.values(items).map((item, index) => (
              <div
                key={index}
                className="tw:flex tw:w-full tw:items-center tw:gap-4 tw:border-b tw:border-dashed tw:border-black tw:pt-6 tw:pb-4"
              >
                <p className="tw:w-full">{item}</p>
                <button
                  onClick={() => {
                    const newItems = items.filter((_, i) => i !== index);
                    setItems(newItems);
                  }}
                >
                  <Icons.x classname="tw:w-4 tw:h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};
