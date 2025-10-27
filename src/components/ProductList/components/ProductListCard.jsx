import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import Button from '../../Button/Button';
import Icons from '../../Icons/Icons';
import Typography from '../../Typography/Typography';
import { Modal } from '../../Modal/Modal';
import { Input } from '../../Form/Input';
import GroupToggle from '../../GroupToggle/GroupToggle';
import {
  groupProductsByShelf,
  addShelfInfoToProducts,
} from '../../../../utils/shelfGrouping';

/**
 * ProductListCard component displays a card with product list details and actions.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title of the product list.
 * @param {number} props.productcount - The number of products in the list.
 * @param {string} props.lastUsed - The last used date of the product list.
 * @param {Array<Object>} props.products - The array of product objects, each containing an `image` property.
 * @param {Function} props.onviewproductsclick - Callback function triggered when the "View Products" button is clicked.
 * @param {Function} props.onadditemsclick - Callback function triggered when the "Add Items to List" button is clicked.
 * @param {Function} props.onrename - Callback function triggered when the "Rename" button is clicked.
 * @param {Function} props.ondelete - Callback function triggered when the "Delete" button is clicked.
 * @param {Function} props.onedit - Callback function triggered when the "Edit" button is clicked.
 * @param {Function} props.onduplicate - Callback function triggered when the "Duplicate" button is clicked.
 * @param {boolean} [props.enablegrouping=true] - Whether to enable shelf grouping functionality
 * @param {'grouped' | 'ungrouped'} [props.groupstate='grouped'] - Current grouping state
 * @param {Function} [props.ongroupchange] - Callback function when grouping state changes
 *
 * @returns {JSX.Element} The rendered ProductListCard component.
 */

export const ProductListCard = ({
  title,
  productcount,
  lastUsed,
  products,
  onviewproductsclick,
  onadditemsclick,
  onrename,
  ondelete,
  onedit,
  onduplicate,
  enablegrouping = true,
  groupstate = 'grouped',
  ongroupchange,
}) => {
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);

  const [newName, setNewName] = useState('');
  const [isGrouped, setIsGrouped] = useState(groupstate === 'grouped');

  // Add shelf information to products and group them
  const productsWithShelfInfo = addShelfInfoToProducts(products || []);
  const groupedProducts = isGrouped
    ? groupProductsByShelf(productsWithShelfInfo)
    : {
        all: {
          products: productsWithShelfInfo,
          category: { name: 'All Products', icon: '📦' },
        },
      };

  const isModalOpen =
    isRenameModalOpen ||
    isDeleteModalOpen ||
    isEditModalOpen ||
    isDuplicateModalOpen;
  const handleModalClose = () => {
    setIsRenameModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsEditModalOpen(false);
    setIsDuplicateModalOpen(false);
    setNewName('');
  };

  const handleConfirm = () => {
    if (isRenameModalOpen) {
      console.log(`Renamed List to ${newName}`);
      onrename(newName);
    } else if (isDeleteModalOpen) {
      console.log('Deleted List');
      ondelete();
    } else if (isEditModalOpen) {
      console.log('Edit List');
      onedit();
    } else if (isDuplicateModalOpen) {
      console.log('Duplicate List');
      onduplicate(newName);
    }
    handleModalClose();
  };

  const handleGroupChange = (newState) => {
    setIsGrouped(newState === 'grouped');
    ongroupchange?.(newState);
  };

  return (
    <div className="tw:flex tw:w-full tw:justify-between tw:rounded-[20px] tw:bg-white tw:p-8 tw:shadow-[16px_32px_56px_-24px_rgba(0,0,0,0.10)] tw:max-lg:flex-col">
      <div className="tw:space-y-1 tw:lg:space-y-3">
        <div className="tw:flex tw:items-center tw:justify-between">
          <Typography content={title} domtype="h5" classname="tw:font-medium" />
          {enablegrouping && (
            <GroupToggle
              leftlabel="Group by shelf"
              rightlabel="Ungrouped"
              initialstate={groupstate}
              ongroupchange={handleGroupChange}
              size="sm"
            />
          )}
        </div>

        <p className="tw:text-base tw:text-grey-600">
          {productcount} products · {lastUsed}
        </p>

        <div className="tw:flex tw:items-center tw:gap-4 tw:pt-3 tw:max-lg:flex-wrap tw:lg:gap-6">
          <button
            className="tw:flex tw:cursor-pointer tw:items-center tw:space-x-2 tw:text-base tw:font-medium tw:transition-colors tw:hover:text-primary-500"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Icons.edit classname="tw:w-3 tw:h-3 tw:max-lg:hidden" />
            <span>Edit</span>
          </button>
          <button
            className="tw:flex tw:cursor-pointer tw:items-center tw:space-x-2 tw:text-base tw:font-medium tw:transition-colors tw:hover:text-primary-500"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <Icons.trash classname="tw:w-3 tw:h-3 tw:max-lg:hidden" />
            <span>Delete</span>
          </button>
          <button
            className="tw:flex tw:cursor-pointer tw:items-center tw:space-x-2 tw:text-base tw:font-medium tw:transition-colors tw:hover:text-primary-500"
            onClick={() => setIsDuplicateModalOpen(true)}
          >
            <Icons.copy classname="tw:w-3 tw:h-3 tw:max-lg:hidden" />
            <span>Duplicate</span>
          </button>
          <button
            className="tw:flex tw:cursor-pointer tw:items-center tw:space-x-2 tw:text-base tw:font-medium tw:transition-colors tw:hover:text-primary-500"
            onClick={() => setIsRenameModalOpen(true)}
          >
            <Icons.pencil classname="tw:w-3 tw:h-3 tw:max-lg:hidden" />
            <span>Rename</span>
          </button>
        </div>
      </div>

      {products?.length > 0 && (
        <div className="tw:max-lg:mt-4">
          {isGrouped ? (
            // Grouped view - show products organized by shelf categories
            <div className="tw:space-y-4">
              {Object.entries(groupedProducts)
                .slice(0, 3)
                .map(([categoryId, group]) => (
                  <div
                    key={categoryId}
                    className="tw:flex tw:items-center tw:space-x-3"
                  >
                    <div className="tw:flex tw:min-w-0 tw:items-center tw:space-x-2">
                      <span className="tw:text-lg">{group.category.icon}</span>
                      <span className="tw:truncate tw:text-sm tw:font-medium tw:text-grey-600">
                        {group.category.name} ({group.products.length})
                      </span>
                    </div>
                    <div className="tw:flex tw:flex-1 tw:space-x-1.5 tw:overflow-hidden">
                      {group.products.slice(0, 3).map((product) => (
                        <img
                          key={`${categoryId}-${product.image}`}
                          src={product.image}
                          className="tw:h-16 tw:w-16 tw:flex-shrink-0 tw:rounded-md tw:object-cover"
                        />
                      ))}
                      {group.products.length > 3 && (
                        <div className="tw:flex tw:h-16 tw:w-16 tw:flex-shrink-0 tw:items-center tw:justify-center tw:rounded-md tw:bg-grey-1100">
                          <span className="tw:text-xs tw:font-medium tw:text-grey-600">
                            +{group.products.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            // Ungrouped view - show all products in a row
            <div className="tw:flex tw:items-center tw:space-x-3">
              <div className="tw:mr-1.5 tw:flex tw:flex-1 tw:flex-shrink tw:space-x-1.5 tw:overflow-hidden">
                {productsWithShelfInfo.slice(0, 6).map((product) => (
                  <img
                    key={product.image}
                    src={product.image}
                    className="tw:h-16 tw:w-16 tw:flex-shrink-0 tw:rounded-md tw:object-cover"
                  />
                ))}
                {productsWithShelfInfo.length > 6 && (
                  <div className="tw:flex tw:h-16 tw:w-16 tw:flex-shrink-0 tw:items-center tw:justify-center tw:rounded-md tw:bg-grey-1100">
                    <span className="tw:text-xs tw:font-medium tw:text-grey-600">
                      +{productsWithShelfInfo.length - 6}
                    </span>
                  </div>
                )}
              </div>

              <Button
                variant="tertiary"
                iconright={<Icons.chevronRight classname="tw:w-4 tw:h-4" />}
                onClick={onviewproductsclick}
              />
            </div>
          )}
        </div>
      )}

      {products?.length === 0 && (
        <div className="tw:flex tw:items-end tw:justify-center tw:gap-2">
          <Button
            variant="secondary"
            label="Add items to list"
            iconleft={<Icons.heart classname="tw:h-4 tw:w-4" />}
            classname="tw:lg:px-10 tw:max-lg:w-full tw:max-lg:mt-8"
            onClick={onadditemsclick}
          />
        </div>
      )}

      <Modal
        title={
          isEditModalOpen
            ? `Edit "${title}"`
            : isRenameModalOpen
              ? `Rename "${title}"`
              : isDuplicateModalOpen
                ? `Duplicate "${title}"`
                : `Delete "${title}"`
        }
        description={
          isRenameModalOpen
            ? 'Give it a new name'
            : isDuplicateModalOpen
              ? 'Give a name to the new copy.'
              : isDeleteModalOpen && 'Are you sure? This cannot be undone.'
        }
        buttonscomponent={() => (
          <>
            <Button
              variant="tertiary"
              label={
                isEditModalOpen
                  ? 'Edit'
                  : isRenameModalOpen
                    ? 'Rename'
                    : isDuplicateModalOpen
                      ? 'Duplicate'
                      : 'Delete'
              }
              classname="tw:px-16"
              onClick={handleConfirm}
            />
            <Button
              variant="secondary"
              label="Cancel"
              classname="tw:px-16"
              onClick={handleModalClose}
            />
          </>
        )}
        isopen={isModalOpen}
        onclose={handleModalClose}
      >
        <div className="tw:my-6">
          {(isDuplicateModalOpen || isRenameModalOpen) && (
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};
