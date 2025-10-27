import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';
import { cn } from '../../../utils/helpers';

/**
 * AddToWishlist Component
 *
 * @description The AddToWishlist component renders a button to add multiple products to wishlists.
 *
 * @param {Object} props - Component props
 * @param {Array} props.productids - Array of product IDs to add to wishlist
 * @param {Array} props.wishlists - Array of wishlist objects with name, count, and selected properties
 * @param {Function} props.onaddtowishlist - Callback function when items are added to wishlist
 * @param {Function} props.oncreatenewlist - Callback function when a new list is created
 * @param {string} props.classname - Additional CSS classes
 *
 * @returns {JSX.Element} AddToWishlist component
 */

export const AddToWishlist = ({
  productids = [],
  wishlists = [],
  onaddtowishlist,
  oncreatenewlist,
  classname,
}) => {
  const componentRef = useRef();
  const [showWishlistDropdown, setShowWishlistDropdown] = useState(false);
  const [wishlistData, setWishlistData] = useState(wishlists);
  const [createList, setCreateList] = useState(false);
  const [newListName, setNewListName] = useState('');

  // Close wishlist dropdown when clicked outside the component area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setShowWishlistDropdown(false);
        setCreateList(false);
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        setShowWishlistDropdown(false);
        setCreateList(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [componentRef]);

  // Handle adding products to a specific wishlist
  const handleAddToWishlist = (wishlist) => {
    if (onaddtowishlist && productids.length > 0) {
      onaddtowishlist(productids, wishlist);
    }
    setShowWishlistDropdown(false);
  };

  // Handle creating a new wishlist
  const handleCreateList = () => {
    if (newListName.trim()) {
      const newWishlist = {
        name: newListName,
        count: 0,
        selected: false,
      };
      setWishlistData([...wishlistData, newWishlist]);
      setNewListName('');
      setCreateList(false);

      // Call the external handler if provided
      if (oncreatenewlist) {
        oncreatenewlist(newWishlist);
      }

      // Add products to the new list
      handleAddToWishlist(newWishlist);
    }
  };

  return (
    <div ref={componentRef} className={cn('tw:relative', classname)}>
      <Button
        label="Add items to list"
        variant="secondary"
        iconleft={() => <Icons.heart classname="tw:w-4 tw:h-4" />}
        onclick={() => setShowWishlistDropdown(!showWishlistDropdown)}
        classname="tw:w-full tw:max-w-[200px]"
      />

      {showWishlistDropdown && (
        <div className="tw:absolute tw:top-[calc(100%+8px)] tw:z-[99] tw:flex tw:max-h-[40svh] tw:w-full tw:max-w-[250px] tw:flex-col tw:overflow-y-auto tw:rounded-lg tw:bg-white tw:shadow-[-1px_-1px_4px_4px_rgba(0,0,0,0.02),_6px_10px_24px_0px_rgba(0,0,0,0.30)] tw:max-lg:max-h-[27svh]">
          {wishlistData.map((wishlist, index) => (
            <button
              key={`${wishlist.name}-${index}`}
              onClick={() => handleAddToWishlist(wishlist)}
              className="tw:full tw:flex tw:cursor-pointer tw:items-center tw:justify-between tw:px-3 tw:py-4 tw:text-left tw:text-lg tw:break-all tw:transition-colors tw:duration-200 tw:first:rounded-t-lg tw:hover:bg-beige-500"
            >
              {wishlist.name}

              <div>
                {wishlist.count && !wishlist.selected && (
                  <span className="tw:flex tw:items-center tw:rounded-full tw:bg-beige-1000 tw:p-2 tw:text-xs">
                    {wishlist.count}
                  </span>
                )}

                {wishlist.selected && (
                  <Icons.checkMark className="tw:ml-2 tw:h-4 tw:w-4 tw:flex-shrink-0 tw:text-black" />
                )}
              </div>
            </button>
          ))}

          <button className="tw:flex tw:cursor-pointer tw:items-center tw:px-3 tw:py-4 tw:text-lg tw:transition-colors tw:duration-200 tw:hover:bg-beige-500">
            Manage lists
          </button>

          {createList ? (
            <div className="tw:flex tw:items-center tw:space-x-2 tw:px-3 tw:py-2">
              <input
                type="text"
                placeholder="Enter list name"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                className="tw:w-full tw:rounded-lg tw:border tw:border-black-1000 tw:px-3 tw:py-2 tw:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateList();
                  }
                }}
              />
              <Button
                onclick={handleCreateList}
                iconleft={() => (
                  <Icons.checkMark className="tw:h-4 tw:w-4 tw:flex-shrink-0" />
                )}
                type="submit"
                size="small"
                variant="tertiary"
              />
            </div>
          ) : (
            <>
              <hr className="tw:border-t tw:border-dotted tw:border-black" />
              <button
                className="tw:flex tw:cursor-pointer tw:items-center tw:rounded-b-lg tw:px-3 tw:py-4 tw:text-lg tw:transition-colors tw:duration-200 tw:hover:bg-beige-500"
                onClick={() => setCreateList(true)}
              >
                <Icons.plus className="tw:mr-2 tw:h-5 tw:w-5 tw:flex-shrink-0" />
                Create new list
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AddToWishlist;
