import { h, Fragment } from 'preact';
import Icons from '../Icons/Icons';
import Tag from '../Tag/Tag';

/**
 * Product Tag
 *
 * @description The ProductTag component renders the product tag.
 *
 * @param {Object} props - Component props
 * @param {
 *  'new' | 'bestseller' | 'delivery' | 'trending' | 'marketplace' | 'sponsored' | 'online-exclusive' | 'recent-order' | 'previous-order' | 'custom'
 * }  props.tags - The type of the product tag.
 *
 * @returns {JSX.Element} The rendered ProductTag component.
 */

export const ProductTags = ({ tags }) => {
  const tagType = [
    { label: 'New', type: 'new', variant: 'default' },
    { label: 'Bestseller', type: 'bestseller', variant: 'lightPrimary' },
    {
      label: 'Already in a delivery',
      type: 'delivery',
      icon: <Icons.truck className="tw:flex-shrink-0" />,
      variant: 'secondary',
    },
    { label: 'Trending', type: 'trending', variant: 'lightPrimary' },
    { label: 'Marketplace', type: 'marketplace', variant: 'lightPrimary' },
    { label: 'Sponsored', type: 'sponsored', variant: 'lightPrimary' },
    {
      label: 'Online Exclusive',
      type: 'online-exclusive',
      variant: 'lightPrimary',
    },
    {
      label: 'Recent Order',
      type: 'recent-order',
      icon: <Icons.rotateCCW className="tw:flex-shrink-0" />,
      variant: 'secondary',
    },
    {
      label: 'Previous Order',
      type: 'previous-order',
      variant: 'secondary',
    },
  ];

  return (
    <div className="tw:flex tw:gap-1">
      {tags.map((tag) => {
        const tagData = tagType.find((t) => t.type === tag);

        return (
          <Tag
            key={tag}
            label={tagData?.label || String(tag)}
            variant={tagData?.variant || 'lightPrimary'}
            icon={tagData?.icon ?? null}
            size="small"
            classname="tw:px-3 tw:whitespace-nowrap tw:text-sm"
          />
        );
      })}
    </div>
  );
};
