import { h, Fragment } from 'preact';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';
import { useState } from 'preact/hooks';

/**
 * ProductWishlist
 *
 * @description The ProductWishlist component renders the product wishlist.
 *
 * @param {Object} props - Component props
 * @param {Array} props.lists - list of wish lists
 * @param {Function} props.onaddtowishlist - function to add item to wishlist
 *
 * @returns {JSX.Element} ProductWishlist component
 */

export const ProductWishlist = ({ id, lists, onaddtowishlist }) => {
  const [createList, setCreateList] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [wishlist, setWishlist] = useState(lists);

  const handleCreateList = () => {
    if (newListName.trim()) {
      setWishlist([...wishlist, { name: newListName, selected: true }]);
      setNewListName('');
      setCreateList(false);
    }
  };

  return (
    <div className="tw:absolute tw:bottom-[62px] tw:z-[99] tw:ml-1 tw:flex tw:max-h-[40svh] tw:w-full tw:max-w-[250px] tw:flex-col tw:overflow-y-auto tw:rounded-lg tw:bg-white tw:shadow-[-1px_-1px_4px_4px_rgba(0,0,0,0.02),_6px_10px_24px_0px_rgba(0,0,0,0.30)] tw:max-lg:max-h-[27svh]">
      {wishlist.map((list) => (
        <button
          key={list}
          onClick={() => onaddtowishlist(id, list)}
          className="tw:full tw:flex tw:cursor-pointer tw:items-center tw:justify-between tw:px-3 tw:py-4 tw:text-left tw:text-lg tw:break-all tw:transition-colors tw:duration-200 tw:first:rounded-t-lg tw:hover:bg-beige-500"
        >
          {list.name}

          <div>
            {list.count && !list.selected && (
              <span className="tw:flex tw:items-center tw:rounded-full tw:bg-beige-1000 tw:p-2 tw:text-xs">
                {list.count}
              </span>
            )}

            {list.selected && (
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
          />
          <Button
            onclick={handleCreateList}
            iconleft={
              <Icons.checkMark className="tw:h-4 tw:w-4 tw:flex-shrink-0" />
            }
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
  );
};
