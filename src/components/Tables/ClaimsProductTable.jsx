import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { forwardRef, useImperativeHandle } from 'preact/compat';
import Typography from '../Typography/Typography';
import { cn, formatCurrency, useMediaQuery } from '../../../utils/helpers';
import { Checkbox } from '../Form';
import { Input } from '../Form/Input';
import { Select } from '../Form/Select';
import SearchInput from '../Form/SearchInput';
import Icons from '../Icons/Icons';
import CalloutCard from '../CalloutCard/CalloutCard';

/**
 * ClaimInfo Component
 *
 * @description Displays the details of a submitted claim
 *
 * @param {Object} props - Component props
 * @param {string} props.reason - The reason for the claim
 * @param {string} props.description - The description of the claim
 * @param {string} props.image - The filename of the uploaded image
 *
 * @returns {JSX.Element} Preact component - The ClaimInfo component
 */
const ClaimInfo = ({ reason, description, image }) => {
  return (
    <div className="tw:rounded-xl tw:bg-secondary-1100 tw:p-3 tw:lg:rounded-[20px] tw:lg:p-6">
      <div className="tw:mb-4 tw:flex tw:flex-col tw:justify-between tw:max-lg:space-y-3 tw:lg:flex-row tw:lg:items-center">
        <div className="tw:flex tw:gap-2 tw:lg:items-center">
          <Icons.info classname="tw:h-5 tw:w-5 tw:shrink-0 tw:max-lg:mt-1" />
          <Typography classname="tw:font-medium tw:text-lg">
            Claim: {reason}
          </Typography>
        </div>
        {image && (
          <div className="tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:bg-secondary-1200 tw:px-3 tw:py-1">
            <Icons.image classname="tw:h-4 tw:w-4" />
            <span className="tw:text-lg tw:font-medium">{image}</span>
          </div>
        )}
      </div>
      <div className="tw:rounded tw:bg-secondary-1100">
        <Typography classname="tw:mb-2 tw:font-medium">Damaged</Typography>

        <div className="tw:rounded-lg tw:bg-white tw:p-3">
          <Typography>{description}</Typography>
        </div>
      </div>
    </div>
  );
};

/**
 * ClaimForm Component
 *
 * @description A form for submitting claims about products
 *
 * @param {Object} props - Component props
 * @param {Object} props.product - The product being claimed
 * @param {Function} props.onSubmit - Function to call when the claim is submitted
 *
 * @returns {JSX.Element} Preact component - The ClaimForm component
 */
const ClaimForm = ({ product, onSubmit }) => {
  const [formData, setFormData] = useState({
    reason: '',
    quantity: 1,
    description: '',
  });

  const handleChange = (field, value) => {
    const updatedFormData = {
      ...formData,
      [field]: value,
    };

    setFormData(updatedFormData);

    // Submit form data
    if (onSubmit) {
      const claimData = {
        ...updatedFormData,
        product: {
          id: product.id,
          code: product.code,
          name: product.name,
        },
      };

      onSubmit(claimData);
    }
  };

  return (
    <div className="tw:rounded-[20px] tw:bg-white tw:p-3 tw:lg:p-6">
      <div className="tw:mb-6 tw:grid tw:grid-cols-1 tw:gap-10 tw:md:grid-cols-2">
        <div>
          <label className="tw:mb-2 tw:block tw:text-base tw:font-medium">
            Whats wrong with the item you received?
          </label>
          <Select
            placeholder="Choose a reason"
            name="reason"
            value={formData.reason}
            onchange={(value) => handleChange('reason', value)}
            options={[
              { value: '', label: 'Choose a reason' },
              { value: 'damaged', label: 'Damaged on arrival' },
              { value: 'incorrect', label: 'Incorrect item' },
              { value: 'missing', label: 'Missing items' },
              { value: 'quality', label: 'Quality issues' },
            ]}
          />
        </div>
        <div>
          <label className="tw:mb-2 tw:block tw:text-base tw:font-medium">
            How many items were affected?
          </label>
          <div className="tw:flex tw:items-center tw:gap-2">
            <Input
              type="number"
              min="1"
              max={product.qtw}
              value={formData.quantity}
              onInput={(e) =>
                handleChange('quantity', parseInt(e.target.value, 10) || 1)
              }
              classname="tw:w-full"
            />
            <Select
              placeholder="Choose a unit"
              name="unit"
              value={formData.unit}
              onchange={(value) => handleChange('unit', value)}
              options={[
                { value: 'cases', label: 'cases' },
                { value: 'items', label: 'items' },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="tw:flex tw:flex-col tw:justify-between tw:lg:flex-row tw:lg:gap-x-10">
        <div className="tw:w-full">
          <label className="tw:mb-2 tw:block tw:text-base tw:font-medium">
            Describe the issue in more detail
          </label>
          <textarea
            className="tw:w-full tw:rounded-lg tw:border tw:border-secondary-1300 tw:p-3 tw:focus:ring-1 tw:focus:ring-secondary-1300 tw:focus:outline-none"
            rows="4"
            value={formData.description}
            onInput={(e) => handleChange('description', e.target.value)}
            placeholder="Please provide details about the issue"
          ></textarea>
        </div>

        <div className="tw:w-full tw:max-lg:mt-3">
          <label className="tw:block tw:text-base tw:font-medium tw:lg:mb-8">
            Upload a picture of the issue
          </label>
          {formData.image && (
            <div className="tw:rounded tw:border tw:border-secondary-1300 tw:bg-secondary-1100 tw:p-3">
              <div className="tw:flex tw:items-center tw:gap-2">
                <Icons.image classname="tw:h-5 tw:w-5" />
                <span>{formData.image}</span>
              </div>
            </div>
          )}

          <label className="tw:mt-3 tw:flex tw:w-full tw:max-w-[300px] tw:cursor-pointer tw:items-center tw:justify-center tw:gap-2 tw:rounded-full tw:border-2 tw:border-black tw:px-6 tw:py-3 tw:text-center">
            <Icons.upload className="tw:h-5 tw:w-5" />
            <span className="tw:text-lg">Choose image...</span>
            <input
              type="file"
              accept="image/*"
              className="tw:hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleChange('image', e.target.files[0].name);
                }
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

/**
 * ProductRow Component
 *
 * @description A row in the product table with a checkbox and expandable claim form
 *
 * @param {Object} props - Component props
 * @param {Object} props.product - The product to display
 * @param {boolean} props.isSelected - Whether the product is selected
 * @param {Function} props.onToggle - Function to toggle the selection
 * @param {Function} [props.onclaimsubmit] - Callback function when a claim is submitted
 *
 * @returns {JSX.Element} Preact component - The ProductRow component
 */
const ProductRow = ({ product, isSelected, onToggle, onclaimsubmit }) => {
  const handleClaimSubmit = (claimData) => {
    if (onclaimsubmit) {
      onclaimsubmit(claimData);
    }
  };

  return (
    <Fragment key={`product-group-${product.code}`}>
      <tr
        key={product.code}
        className={cn(
          isSelected && 'tw:bg-secondary-1100',
          product.alreadyclaimed &&
            'tw:pointer-events-none tw:cursor-not-allowed tw:opacity-50',
        )}
      >
        {!product.claim && (
          <td className="tw:w-[50px] tw:max-w-[50px] tw:min-w-[50px] tw:pl-3 tw:text-base tw:whitespace-nowrap">
            <Checkbox
              name={product.code}
              value={product.code}
              checked={isSelected}
              onChange={onToggle}
            />
          </td>
        )}

        <td className="tw:w-[60px] tw:max-w-[60px] tw:min-w-[60px] tw:py-4 tw:pr-3 tw:pl-4 tw:text-base tw:whitespace-nowrap tw:sm:pl-3">
          <img
            src={product.image}
            alt={product.name}
            className="tw:h-15 tw:w-15 tw:lg:h-8 tw:lg:w-8"
          />
        </td>
        <td className="tw: sm:pl-3 tw:py-4 tw:pr-3 tw:pl-4 tw:text-base tw:whitespace-nowrap">
          {product.code}
        </td>
        <td className="tw: sm:pl-3 tw:py-4 tw:pr-3 tw:pl-4 tw:text-base tw:whitespace-nowrap">
          {product.name}
        </td>
        <td className="tw:py-4 tw:pr-3 tw:pl-4 tw:text-right tw:text-base tw:whitespace-nowrap tw:sm:pl-3">
          {product.itemsPerCase}
        </td>
        <td className="tw:py-4 tw:pr-3 tw:pl-4 tw:text-right tw:text-base tw:whitespace-nowrap tw:sm:pl-3">
          {product.size}
        </td>
        <td className="tw:py-4 tw:pr-3 tw:pl-4 tw:text-center tw:text-base tw:whitespace-nowrap tw:sm:pl-3">
          {formatCurrency(product.casePrice)}
        </td>
        <td className="tw: sm:pl-3 tw:py-4 tw:pr-3 tw:pl-4 tw:text-center tw:text-base tw:whitespace-nowrap">
          {product.qtw}
        </td>
        <td className="tw:py-4 tw:pr-3 tw:pl-4 tw:text-right tw:text-base tw:whitespace-nowrap tw:sm:pl-3">
          {formatCurrency(product.total)}
        </td>
      </tr>

      {product.alreadyclaimed && (
        <tr key={`form-${product.code}-alreadyclaimed`} className="tw:bg-white">
          <td></td>
          <td colSpan="12" className="tw:py-2">
            <CalloutCard>This product has already been claimed.</CalloutCard>
          </td>
        </tr>
      )}

      {product.claim && (
        <tr key={`form-${product.code}`}>
          <td colSpan="9" className="tw:p-4">
            <ClaimInfo {...product.claim} />
          </td>
        </tr>
      )}

      {isSelected && (
        <tr key={`form-${product.code}`} className="tw:bg-secondary-1100">
          <td colSpan="9" className="tw:p-4">
            <ClaimForm
              product={product}
              onCancel={onToggle}
              onSubmit={handleClaimSubmit}
            />
          </td>
        </tr>
      )}
    </Fragment>
  );
};

/**
 * MobileProductCard Component
 *
 * @description A card in the mobile view with a checkbox and expandable claim form
 *
 * @param {Object} props - Component props
 * @param {Object} props.product - The product to display
 * @param {boolean} props.isSelected - Whether the product is selected
 * @param {Function} props.onToggle - Function to toggle the selection
 * @param {Function} [props.onclaimsubmit] - Callback function when a claim is submitted
 *
 * @returns {JSX.Element} Preact component - The MobileProductCard component
 */
const MobileProductCard = ({
  product,
  isSelected,
  onToggle,
  onclaimsubmit,
}) => {
  const handleClaimSubmit = (claimData) => {
    // Pass the claim data to the parent component
    if (onclaimsubmit) {
      onclaimsubmit(claimData);
    }
  };

  return (
    <Fragment key={`mobile-product-${product.id}`}>
      <div
        className={cn(
          'tw:px-2 tw:py-5 tw:lg:px-4',
          isSelected && 'tw:bg-secondary-1100',
          product.alreadyclaimed &&
            'tw:pointer-events-none tw:cursor-not-allowed tw:bg-white tw:opacity-50 tw:select-none',
        )}
      >
        <div className="tw:mb-4 tw:flex tw:items-center tw:justify-between tw:text-xs">
          <div className="tw:flex tw:w-full tw:items-center tw:justify-between">
            {!product.claim ? (
              <Checkbox
                name={product.code}
                value={product.code}
                checked={isSelected}
                onChange={onToggle}
              />
            ) : (
              <span></span>
            )}
            <span className="tw:text-[11px] tw:font-semibold">
              {product.code}
            </span>
          </div>
        </div>
        <div className="tw:flex tw:items-center tw:gap-4">
          <img
            src={product.image}
            alt={product.name}
            className="tw:h-15 tw:w-15 tw:shrink-0"
          />
          <div className="tw:space-y-2">
            <Typography
              domtype="h7"
              classname="tw:font-semibold tw:text-[13px]"
            >
              {product.name}
            </Typography>

            <div className="tw:space-y-1">
              <p className="tw:text-sm">
                Items per case:{' '}
                <span className="tw:font-medium">{product.itemsPerCase}</span>
              </p>
              <p className="tw:text-sm">
                Size: <span className="tw:font-medium">{product.size}</span>
              </p>
              <p className="tw:text-sm">
                Case price:{' '}
                <span className="tw:font-medium">
                  {formatCurrency(product.casePrice)}
                </span>
              </p>
              <p className="tw:text-sm">
                Quantity: <span className="tw:font-medium">{product.qtw}</span>
              </p>
              <p className="tw:text-sm">
                Total:{' '}
                <span className="tw:font-medium">
                  {formatCurrency(product.total)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {product.alreadyclaimed && (
        <div className="tw:mb-4 tw:px-2">
          <CalloutCard>This product has already been claimed.</CalloutCard>
        </div>
      )}

      {product.claim && (
        <div className="tw:bg-secondary-1100 tw:py-2">
          <ClaimInfo {...product.claim} />
        </div>
      )}

      {isSelected && (
        <div className="tw:mb-4 tw:bg-secondary-1100 tw:px-2 tw:py-5">
          <ClaimForm
            product={product}
            onCancel={onToggle}
            onSubmit={handleClaimSubmit}
          />
        </div>
      )}
    </Fragment>
  );
};

/**
 * ClaimsProductTable Component
 *
 * @description Displays products grouped by category in both desktop (table) and mobile (card) views.
 * Includes checkboxes that, when selected, display a claim form for the product.
 *
 * @param {Object} props - Component props
 * @param {Array} props.products - Array of grouped products to display
 * @param {string} [props.classname] - Additional classes to add to the component
 * @param {string} [props.searchPlaceholder] - Placeholder text for the search input
 * @param {Function} [props.onclaimsubmit] - Callback function when a claim is submitted
 * @param {Function} [props.onselectionchange] - Callback function when selection changes
 *
 * @returns {JSX.Element} Preact component - The ClaimsProductTable component
 */
const ClaimsProductTable = forwardRef(
  (
    {
      products,
      classname,
      searchPlaceholder = 'Search invoice or claim number',
      onclaimsubmit,
      onselectionchange,
      ...props
    },
    ref,
  ) => {
    const isMobile = useMediaQuery('(max-width: 1023px)');
    const [submittedClaims, setSubmittedClaims] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [selectedIds, setSelectedIds] = useState(new Set());

    // Toggle a product checkbox
    const toggleSelection = (id) => {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        if (onselectionchange)
          onselectionchange(next.size > 0, Array.from(next));
        return next;
      });
    };

    // Expose selection methods
    useImperativeHandle(ref, () => ({
      hasSelection: () => selectedIds.size > 0,
      clearSelection: () => {
        setSelectedIds(new Set());
        if (onselectionchange) onselectionchange(false, []);
      },
      selectAll: () => {
        // Get all visible and enabled product IDs (ignore disabled/claimed)
        const allSelectableProductIds = filteredGroups.flatMap((group) =>
          group.products
            .filter((product) => !product.claim && !product.alreadyclaimed)
            .map((product) => product.id),
        );

        // If all visible products are already selected, deselect all
        const allSelected = allSelectableProductIds.every((id) =>
          selectedIds.has(id),
        );

        if (allSelected) {
          // Deselect all selectable products
          const newSelectedIds = new Set(
            [...selectedIds].filter(
              (id) => !allSelectableProductIds.includes(id),
            ),
          );
          setSelectedIds(newSelectedIds);
          if (onselectionchange)
            onselectionchange(
              newSelectedIds.size > 0,
              Array.from(newSelectedIds),
            );
        } else {
          // Select all selectable products
          const newSelectedIds = new Set([
            ...selectedIds,
            ...allSelectableProductIds,
          ]);
          setSelectedIds(newSelectedIds);
          if (onselectionchange)
            onselectionchange(true, Array.from(newSelectedIds));
        }
      },
    }));

    // Add index to each product to display the order of the products in the table
    let globalIndex = 1;
    const formattedGroups = products.map((group) => ({
      ...group,
      products: group.products.map((product) => ({
        ...product,
        index: globalIndex++,
        id: product.id || product.code, // stable fallback ID
      })),
    }));

    // Filter products based on search text
    const handleFilterChange = (e) => {
      const value = e.target.value;
      setFilterText(value);

      if (!value.trim()) {
        setFilteredGroups(formattedGroups);
        return;
      }

      const searchTerm = value.toLowerCase();
      const filtered = formattedGroups
        .map((group) => ({
          ...group,
          products: group.products.filter(
            (product) =>
              product.name.toLowerCase().includes(searchTerm) ||
              product.code.toLowerCase().includes(searchTerm) ||
              (product.description &&
                product.description.toLowerCase().includes(searchTerm)),
          ),
        }))
        .filter((group) => group.products.length > 0);

      setFilteredGroups(filtered);
    };

    // Initialize filtered groups with all products
    useEffect(() => {
      setFilteredGroups(formattedGroups);
    }, []);

    // Handle claim submission from child components
    const handleClaimSubmit = (claimData) => {
      // Add the claim to the internal state
      setSubmittedClaims((prev) => [...prev, claimData]);

      // Pass the claim data to the parent component if callback exists
      if (onclaimsubmit) {
        onclaimsubmit(claimData, submittedClaims);
      }
    };

    return (
      <div
        className={cn(
          'tw:inline-block tw:min-w-full tw:rounded-lg tw:bg-white tw:p-4 tw:align-middle',
          classname,
        )}
        {...props}
      >
        <div className="tw:mt-2 tw:mb-4 tw:flex tw:items-center tw:justify-between">
          <div className="tw:relative tw:w-full tw:max-w-md">
            <SearchInput
              value={filterText}
              onInput={handleFilterChange}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
            />
          </div>
        </div>
        {!isMobile && (
          <table className="tw:w-full">
            <thead className="tw:bg-secondary-1000">
              <tr>
                <th
                  scope="col"
                  className="tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-left tw:text-base tw:font-medium"
                ></th>

                <th className="tw:w-[60px] tw:max-w-[60px] tw:min-w-[60px] tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-left tw:font-medium">
                  <span className="tw:sr-only">Image</span>
                </th>
                <th
                  scope="col"
                  className="tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-left tw:text-base tw:font-medium"
                >
                  Code
                </th>
                <th
                  scope="col"
                  className="tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-left tw:text-base tw:font-medium"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-right tw:text-base tw:font-medium tw:whitespace-nowrap"
                >
                  Items p/case
                </th>
                <th
                  scope="col"
                  className="tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-right tw:font-medium"
                >
                  Size
                </th>
                <th
                  scope="col"
                  className="tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-center tw:text-base tw:font-medium tw:whitespace-nowrap"
                >
                  Case price
                </th>
                <th
                  scope="col"
                  className="tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-center tw:font-medium"
                >
                  Qty
                </th>
                <th
                  scope="col"
                  className="tw:py-3.5 tw:pr-3 tw:pl-4 tw:text-right tw:font-semibold"
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="tw:divide-y tw:divide-dashed tw:divide-secondary-1300 tw:bg-white">
              {filteredGroups.map((group) => (
                <Fragment key={group.category}>
                  <tr>
                    <th
                      scope="colgroup"
                      colSpan={9}
                      className="tw:border-b tw:border-secondary-1300 tw:py-2 tw:pr-3 tw:pl-4 tw:text-left tw:font-normal tw:sm:pl-3"
                    >
                      {group.category}
                    </th>
                  </tr>
                  {group.products.map((product) => (
                    <ProductRow
                      key={product.id}
                      product={product}
                      isSelected={selectedIds.has(product.id)}
                      onToggle={() => toggleSelection(product.id)}
                      onclaimsubmit={handleClaimSubmit}
                    />
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        )}

        {isMobile && (
          <div>
            {filteredGroups.map((group) => (
              <div key={group.category} className="tw:mb-4">
                <p className="tw:border-b tw:border-secondary-1300 tw:pb-3 tw:text-sm">
                  {group.category}
                </p>
                {group.products.map((product) => (
                  <MobileProductCard
                    key={product.id}
                    product={product}
                    isSelected={selectedIds.has(product.id)}
                    onToggle={() => toggleSelection(product.id)}
                    onclaimsubmit={handleClaimSubmit}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
);

export default ClaimsProductTable;
