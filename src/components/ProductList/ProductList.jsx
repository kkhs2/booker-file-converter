import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import ProductCard from '../ProductCard/ProductCard';
import ProductFilters from '../ProductFilters/ProductFilters';
import { ProductListButton } from './components/ProductListButton';
import BannerNavigation from '../BannerNavigation/BannerNavigation';
import Icons from '../Icons/Icons';
import { useState } from 'preact/hooks';
import { createPortal } from 'preact/compat';
import Pagination from '../Pagination/Pagination';
import Button from '../Button/Button';
import ProductWithAlternative from '../ProductWithAlternative/ProductWithAlternative';
import { OrderListButton } from './components/OrderListButton';
import Tag from '../Tag/Tag';
import { Default as ProductFiltersArgs } from '../ProductFilters/ProductFilters.stories';
import GroupToggle from '../GroupToggle/GroupToggle';
import {
  groupProductsByShelf,
  addShelfInfoToProducts,
} from '../../../utils/shelfGrouping';

/**
 * ProductList Component
 *
 *  @description This component renders a list of products with options to manage them.
 *
 * @param {Object} props - Component props
 * @param {string} props.name - Name of the product list
 * @param {Array} props.items - Array of product objects to be displayed
 * @param {Object} props.banner - Banner object containing title and icon
 * @param {string} props.banner.title - Title of the banner
 * @param {string} props.banner.icon - Icon to be displayed in the banner
 * @param {Object} [props.previousorder] - Optional previous order object
 * @param {Function} props.onremoveproducts - Callback function to remove selected products
 * @param {Function} props.onaddalltobasket - Callback function to add all products to the basket
 * @param {Function} props.onduplicate - Callback function to duplicate the product list
 * @param {Function} props.ondeletelist - Callback function to delete the product list
 * @param {boolean} [props.enablegrouping=true] - Whether to enable shelf grouping functionality
 * @param {'grouped' | 'ungrouped'} [props.initialgroupstate='grouped'] - Initial grouping state
 * @param {Function} [props.ongroupchange] - Callback function when grouping state changes
 * @returns {JSX.Element} Preact component - The ProductList component
 */

const ProductList = ({
  banner,
  items,
  previousorder,
  ondeletelist,
  onduplicate,
  onremoveproducts,
  onaddalltobasket,
  enablegrouping = true,
  initialgroupstate = 'grouped',
  ongroupchange,
}) => {
  const [portalNode, setPortalNode] = useState(null);
  const [isListView, setIsListView] = useState(true);
  const [isRemoveProductsOpen, setIsRemoveProductsOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isGrouped, setIsGrouped] = useState(initialgroupstate === 'grouped');

  // Add shelf information to products and group them
  const productsWithShelfInfo = addShelfInfoToProducts(items || []);
  const groupedProducts = isGrouped
    ? groupProductsByShelf(productsWithShelfInfo)
    : {
        all: {
          products: productsWithShelfInfo,
          category: { name: 'All Products', icon: '📦' },
        },
      };

  const handleGroupChange = (newState) => {
    const grouped = newState === 'grouped';
    setIsGrouped(grouped);
    ongroupchange?.(newState);
  };

  const openRemoveProductsOverlay = () => {
    if (isRemoveProductsOpen) return;
    setIsRemoveProductsOpen(true);

    const portal =
      document.getElementById('remove-products-portal') ||
      document.createElement('div');
    portal.id = 'remove-products-portal';
    portal.className = 'tw:sticky tw:bottom-0 tw:left-0';
    if (!document.body.contains(portal)) {
      document.body.appendChild(portal);
    }

    setPortalNode(portal);
  };

  const closeRemoveProductsOverlay = () => {
    setIsRemoveProductsOpen(false);
    setSelectedProducts([]);
    if (portalNode) {
      document.body.removeChild(portalNode);
      setPortalNode(null);
    }
  };

  return (
    <div className="tw:pb-25">
      <BannerNavigation title={banner.title} icon={banner.icon ?? ' '}>
        {banner.variant === 'product-list' && (
          <div className="tw:flex tw:flex-wrap tw:gap-3 tw:lg:gap-4">
            <ProductListButton
              label="Remove products"
              icon={<Icons.xSquare classname="tw:w-4 tw:h-4" />}
              active={isRemoveProductsOpen}
              onClick={openRemoveProductsOverlay}
            />
            <ProductListButton
              label="Delete list"
              icon={<Icons.trash classname="tw:w-4 tw:h-4" />}
              onClick={() => {
                console.log('Delete list');
                ondeletelist();
              }}
            />
            <ProductListButton
              label="Duplicate"
              icon={<Icons.copy classname="tw:w-4 tw:h-4" />}
              onClick={() => {
                console.log('Duplicate list');
                onduplicate();
              }}
            />
            <ProductListButton
              label="Add all to basket"
              icon={<Icons.cart classname="tw:w-4 tw:h-4" />}
              onClick={() => {
                console.log('Add all to basket');
                onaddalltobasket();
              }}
            />
          </div>
        )}
        {banner.variant === 'order-list' && (
          <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-3 tw:lg:gap-4">
            <OrderListButton label="Previous orders" />
            <OrderListButton label="Frequently bought" />
            <OrderListButton label="All previously bought" />
            <OrderListButton
              label="My lists"
              icon={
                <Icons.arrowLeft classname="tw:rotate-[135deg] tw:h-5 tw:w-5 tw:text-primary" />
              }
            />
          </div>
        )}
      </BannerNavigation>

      {previousorder && (
        <div className="tw:mt-8 tw:mb-8 tw:flex tw:w-full tw:flex-col tw:items-center tw:justify-between tw:rounded-[20px] tw:bg-white tw:p-3 tw:lg:mt-10 tw:lg:flex-row tw:lg:space-x-2">
          <div className="tw:flex tw:w-full tw:flex-1 tw:items-center tw:space-x-3 tw:max-lg:mb-4">
            <a href="javascript:void()" className="tw:inline-block">
              <button className="tw:cursor-pointer tw:rounded-full tw:bg-beige-1000 tw:p-4 tw:text-black tw:transition-colors tw:hover:bg-black tw:hover:text-white tw:max-lg:my-8.5">
                <Icons.chevronLeft classname="tw:w-4 tw:h-4" />
              </button>
            </a>

            <div className="tw:flex tw:w-full tw:flex-1 tw:flex-wrap tw:items-center tw:max-lg:flex-col tw:lg:space-x-6">
              <div className="tw:tw:space-x-1 tw:max-lg:flex tw:max-lg:w-full tw:max-lg:items-center tw:max-lg:justify-between tw:max-lg:rounded-t-xl tw:max-lg:bg-beige-1000 tw:max-lg:p-3 tw:lg:ml-6">
                <span className="tw:mr-1 tw:font-light">Date:</span>
                <strong>{previousorder.date}</strong>
              </div>

              <div className="tw:tw:space-x-1 tw:max-lg:flex tw:max-lg:w-full tw:max-lg:items-center tw:max-lg:justify-between tw:max-lg:bg-beige-1000 tw:max-lg:px-3 tw:max-lg:pb-3">
                <span className="tw:mr-1 tw:font-light">Type:</span>
                <strong>{previousorder.type}</strong>
              </div>

              <div className="tw:tw:space-x-1 tw:max-lg:flex tw:max-lg:w-full tw:max-lg:items-center tw:max-lg:justify-between tw:max-lg:bg-beige-1000 tw:max-lg:px-3 tw:max-lg:pb-3">
                <span className="tw:mr-1 tw:font-light">Order No.</span>
                <strong>{previousorder.orderno}</strong>
              </div>

              <div className="tw:tw:space-x-1 tw:max-lg:flex tw:max-lg:w-full tw:max-lg:items-center tw:max-lg:justify-between tw:max-lg:rounded-b-xl tw:max-lg:bg-beige-1000 tw:max-lg:px-3 tw:max-lg:pb-3">
                {previousorder.ref && (
                  <>
                    <span className="tw:mr-1 tw:font-light">Ref:</span>
                    <strong>{previousorder.ref}</strong>
                  </>
                )}
              </div>

              {previousorder?.tags?.length > 0 && (
                <div className="tw:flex tw:flex-wrap tw:items-center tw:justify-end tw:gap-2 tw:max-lg:mt-4">
                  {previousorder.tags?.map((tag) => (
                    <Tag
                      key={tag}
                      label={tag}
                      variant="lightPrimary"
                      icon={null}
                      classname="tw:text-nowrap"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <Button
            label="Add all to basket"
            classname="tw:max-lg:w-full"
            iconleft={<Icons.cart classname="tw:h-4 tw:w-4 tw:mr-2" />}
            onClick={onaddalltobasket}
          />
        </div>
      )}

      {/* product filters */}
      <div className="tw:mt-8 tw:mb-4 tw:lg:my-10">
        <div className="tw:mb-4 tw:flex tw:items-center tw:justify-between">
          <ProductFilters {...ProductFiltersArgs.args} />
          {enablegrouping && (
            <GroupToggle
              leftlabel="Group by shelf"
              rightlabel="Ungrouped"
              initialstate={initialgroupstate}
              ongroupchange={handleGroupChange}
              classname="tw:ml-4"
            />
          )}
        </div>
      </div>

      {isGrouped ? (
        // Grouped view - show products organized by shelf categories
        <div className="tw:space-y-8">
          {Object.entries(groupedProducts).map(([categoryId, group]) => (
            <div key={categoryId} className="tw:space-y-4">
              {/* Shelf category header */}
              <div className="tw:flex tw:items-center tw:space-x-3 tw:rounded-lg tw:bg-beige-1000 tw:px-4 tw:py-2">
                <span className="tw:text-2xl">{group.category.icon}</span>
                <h3 className="tw:text-lg tw:font-medium tw:text-black">
                  {group.category.name} ({group.products.length} products)
                </h3>
              </div>

              {/* Products in this shelf category */}
              <div
                className={cn(
                  !isListView &&
                    'tw:grid tw:grid-cols-1 tw:gap-4 tw:md:grid-cols-2 tw:lg:grid-cols-4',
                  isListView && 'tw:space-y-3',
                )}
              >
                {group.products.map((product, index) => (
                  <ProductCard
                    {...product}
                    key={`${categoryId}-${product.id || product.name}-${index}`}
                    mode={isListView ? 'list' : 'grid'}
                    selectable={
                      isRemoveProductsOpen
                        ? {
                            isselected: selectedProducts.includes(product.id),
                            onSelected: (id) => {
                              if (selectedProducts.includes(id)) {
                                setSelectedProducts((prev) =>
                                  prev.filter((productId) => productId !== id),
                                );
                              } else {
                                setSelectedProducts((prev) => [...prev, id]);
                              }
                            },
                          }
                        : null
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Ungrouped view - show all products in a single grid/list
        <div
          className={cn(
            !isListView &&
              'tw:grid tw:grid-cols-1 tw:gap-4 tw:md:grid-cols-2 tw:lg:grid-cols-4',
            isListView && 'tw:space-y-3',
          )}
        >
          {productsWithShelfInfo.map((product, index) => (
            <ProductCard
              {...product}
              key={product.id || `product-${index}`}
              mode={isListView ? 'list' : 'grid'}
              selectable={
                isRemoveProductsOpen
                  ? {
                      isselected: selectedProducts.includes(product.id),
                      onSelected: (id) => {
                        if (selectedProducts.includes(id)) {
                          setSelectedProducts((prev) =>
                            prev.filter((productId) => productId !== id),
                          );
                        } else {
                          setSelectedProducts((prev) => [...prev, id]);
                        }
                      },
                    }
                  : null
              }
            />
          ))}
        </div>
      )}

      <div className="tw:full tw:mt-10 tw:flex tw:justify-end">
        <Pagination currentpage={1} totalitems="100" itemsperpage="10" />
      </div>

      {portalNode &&
        createPortal(
          <RemoveProductsOverlay
            productcount={selectedProducts.length}
            onConfirm={() => {
              console.log('Remove products', selectedProducts);
              onremoveproducts(selectedProducts);
              closeRemoveProductsOverlay();
            }}
            onCancel={() => {
              console.log('Stop removing');
              closeRemoveProductsOverlay();
            }}
          />,
          portalNode,
        )}
    </div>
  );
};

export default ProductList;

const RemoveProductsOverlay = ({ productcount, onConfirm, onCancel }) => {
  const areProductsSelected = productcount > 0;

  return (
    <div className="tw:flex tw:w-full tw:items-center tw:justify-between tw:rounded-[20px] tw:bg-white tw:p-4 tw:shadow-[4px_4px_40px_-24px_rgba(0,0,0,0.10)]">
      <p>
        {!areProductsSelected &&
          'Select at least 1 product to remove from your list'}
        {areProductsSelected &&
          `${productcount} product${productcount > 1 ? 's' : ''} selected`}
      </p>

      <div className="tw:space-x-3">
        <Button
          label="Stop removing"
          variant={areProductsSelected ? 'secondary' : 'tertiary'}
          onClick={onCancel}
        />
        {areProductsSelected && (
          <Button
            label="Remove from list"
            variant="tertiary"
            onClick={onConfirm}
          />
        )}
      </div>
    </div>
  );
};
