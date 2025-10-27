import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import Icons from '../Icons/Icons';
import Tag from '../Tag/Tag';

/**
 * Product Delivery Info
 *
 * @description Renders the delivery information of a product.
 *
 * @param {Object} props - Component props
 * @param {object} props.data - The delivery list options like 'chilled-delivery', 'ambient-delivery', 'grocery-delivery', 'fresh-delivery'.
 * @param {string} props.classname - Additional classes to add to the component
 *
 * @returns {JSX.Element} Rendered Product Delivery Info component.
 */
export const ProductDeliveryInfo = ({ data, classname }) => {
  const options = {
    'chilled-delivery': {
      id: 'chilled-delivery',
      label: 'Chilled delivery',
      icon: <Icons.chilled />,
      variant: 'muted',
    },
    'ambient-delivery': {
      id: 'ambient-delivery',
      label: 'Ambient delivery',
      icon: <Icons.ambient />,
      variant: 'muted',
    },
    'grocery-delivery': {
      id: 'grocery-delivery',
      label: 'Grocery delivery',
      icon: <Icons.groceriesDelivery />,
      variant: 'muted',
    },
    'fresh-delivery': {
      id: 'fresh-delivery',
      label: 'Fresh delivery',
      icon: <Icons.freshDelivery />,
      variant: 'muted',
    },
  };

  const option = options[data];

  return (
    <Tag
      key={option.id}
      label={option.label}
      variant={option.variant}
      icon={option.icon}
      classname={cn('tw:px-2', classname)}
    />
  );
};
