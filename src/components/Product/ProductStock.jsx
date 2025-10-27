import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import Icons from '../Icons/Icons';

const STATUS_CONFIG = {
  inStock: {
    icon: 'dot',
    iconColor: 'tw:bg-tertiary-500',
    label: 'In Stock',
    showBranchLink: false,
  },
  lowStock: {
    icon: 'dot',
    iconColor: 'tw:bg-orange-500',
    label: 'Low Stock',
    showBranchLink: true,
  },
  outOfStock: {
    icon: 'dot',
    iconColor: 'tw:bg-red-500',
    label: 'Out of Stock',
    showBranchLink: true,
  },
  partialStock: {
    icon: 'info',
    label: 'Some items are out of stock.',
    sublabel: 'Check your order detail for available substutes.',
    showBranchLink: false,
  },
  custom: {
    icon: 'none',
    label: 'Custom Stock',
    labelClass: 'tw:font-medium tw:text-grey-500',
    showBranchLink: false,
  },
};

/**
 * Product Stock
 *
 * @description The Product Stock component renders the product stock status message.
 *
 * @param {Object} props - Component props
 * @param {"inStock" | "lowStock" | "outOfStock" | "partialStock" | "custom" | undefined} props.status - Status of the product stock
 * @param {boolean} [props.supressbranchlink] - Flag to suppress the branch link
 * @param {string} [props.classname] - Additional CSS classes for the container
 * @param {string} [props.contentclassname] - Additional CSS classes for the content container
 * @param {Function} props.onclick - Function to call when the branch link is clicked
 *
 * @returns {JSX.Element} - ProductStock component
 */

export const ProductStock = ({
  status,
  supressbranchlink = false,
  classname,
  contentclassname,
  onclick = () => {},
}) => {
  const config = STATUS_CONFIG[status];

  if (!config) {
    return null;
  }

  const renderIcon = () => {
    if (config.icon === 'dot') {
      return (
        <span
          className={cn(
            'tw:h-2.5 tw:w-2.5 tw:flex-shrink-0 tw:rounded-full',
            config.iconColor,
          )}
        />
      );
    }
    if (config.icon === 'info') {
      return <Icons.info className="tw:h-4 tw:w-4 tw:flex-shrink-0" />;
    }
    return null;
  };

  return (
    <div
      className={cn(
        'tw:flex tw:items-start tw:gap-x-2',
        status === 'partialStock' && 'tw:items-start',
        classname,
      )}
    >
      <div
        className={cn(
          'tw:flex tw:flex-wrap tw:gap-x-2',
          config.sublabel && 'tw:flex-col',
          contentclassname,
        )}
      >
        <div className="tw:flex tw:items-center tw:gap-x-1.5">
          {renderIcon()}

          <span
            className={cn(
              'tw:text-base tw:whitespace-nowrap',
              config.labelClass,
            )}
          >
            {config.label}
          </span>
        </div>

        {config.sublabel && (
          <span className="tw:text-[11px]">{config.sublabel}</span>
        )}

        {config.showBranchLink && !supressbranchlink && (
          <button
            onClick={onclick}
            className="tw:cursor-pointer tw:border-b tw:border-dotted tw:text-left tw:text-base tw:font-light tw:whitespace-nowrap"
          >
            Find it in another branch
          </button>
        )}
      </div>
    </div>
  );
};
