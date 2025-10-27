import { h, Fragment } from 'preact';
import BannerNavigation from '../../BannerNavigation/BannerNavigation';
import Icons from '../../Icons/Icons';
import { ProductListButton } from './ProductListButton';
import { ProductListCard } from './ProductListCard';
import { Modal } from '../../Modal/Modal';
import { useState } from 'preact/hooks';
import { Input } from '../../Form/Input';
import Button from '../../Button/Button';

/**
 * ProductListCollection component renders a container for managing product lists.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the product list container.
 * @param {Array<Object>} props.productlists - An array of product list objects to be displayed.
 * @param {Function} props.oncreateList - Callback function triggered when the "Create" button is clicked in the modal.
 *
 * @returns {JSX.Element} The rendered ProductListCollection component.
 */

export const ProductListCollection = ({
  title,
  productlists,
  oncreateList,
}) => {
  const [isCreateListOpen, setIsCreateListOpen] = useState(false);

  return (
    <div className="tw:pb-25">
      <BannerNavigation
        title={title}
        icon={
          <Icons.shoppingList classname="tw:self-start tw:w-[56px] tw:md:w-[90px] tw:h-auto tw:order-1 tw:shrink-0" />
        }
      >
        <ProductListButton
          label="Create a new list"
          icon={<Icons.plus classname="tw:w-4 tw:h-4" stroke="currentColor" />}
          onClick={() => setIsCreateListOpen(true)}
        />
      </BannerNavigation>

      <div className="tw:mt-4 tw:space-y-6 tw:lg:mt-10">
        {productlists?.map((productlist) => (
          <ProductListCard {...productlist} />
        ))}
      </div>

      <Modal
        title="Create a new list"
        description="Give it a name"
        buttonscomponent={() => (
          <>
            <Button
              variant="tertiary"
              label="Create"
              classname="tw:px-16"
              onClick={() => {
                console.log('Create List');
                oncreateList();
              }}
            />
            <Button
              variant="secondary"
              label="Cancel"
              classname="tw:px-16"
              onClick={() => setIsCreateListOpen(false)}
            />
          </>
        )}
        isopen={isCreateListOpen}
        onclose={() => setIsCreateListOpen(false)}
      >
        <div className="tw:my-6">
          <Input />
        </div>
      </Modal>
    </div>
  );
};
