import { h, Fragment } from 'preact';
import Icons from '../Icons/Icons';
import Tag from '../Tag/Tag';

/**
 * Product Storage Info
 *
 * @description Renders the storage information of a product.
 *
 * @param {Object} props - Component props
 * @param {object} props.data - The storage list like ['frozen', 'chilled'].
 *
 * @returns {JSX.Element} Rendered Product Storage Info component.
 */
export const ProductStorageInfo = ({ data }) => {
  const options = {
    frozen: {
      id: 'frozen',
      label: 'Frozen',
      icon: <Icons.frozen className="tw:h-3 tw:w-3" />,
      variant: 'secondary',
    },
    chilled: {
      id: 'chilled',
      label: 'Chilled',
      icon: <Icons.temp className="tw:h-3 tw:w-3" />,
      variant: 'secondary',
    },
  };

  const option = options[data];
  if (!data || !option) {
    return null;
  }
  return (
    <Tag
      key={option.id}
      label={option.label}
      variant={option.variant}
      icon={option.icon}
    />
  );
};
