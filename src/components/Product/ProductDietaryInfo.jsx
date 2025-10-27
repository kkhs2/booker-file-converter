import { h, Fragment } from 'preact';
import Tag from '../Tag/Tag';
import Icons from '../Icons/Icons';

/**
 * Product Dietary Info
 *
 * @description The Product Dietary Info component renders the product dietary information.
 *
 * @param {Object} props - Component props
 * @param {object} props.data - The dietary list like ['vegetarian', 'vegan'].
 *
 * @returns {JSX.Element} Rendered Product Dietary Info component.
 */

export const ProductDietaryInfo = ({ data }) => {
  const renderIcon = (icon) => {
    switch (icon) {
      case 'vegetarian':
        return <Icons.dietaryVegetarian />;
      case 'halal':
        return <Icons.dietaryHalal />;
      case 'vegan':
        return <Icons.dietaryVegan />;
      case 'gluten-free':
        return <Icons.dietaryGlutenFree />;
      case 'dairy-free':
        return <Icons.dietaryDairyFree />;
      case 'kosher':
        return <Icons.dietaryKosher className="tw:h-5 tw:w-5" />;
      default:
        return null;
    }
  };

  const tooltipLabelMap = {
    vegetarian: 'Vegetarian',
    halal: 'Halal',
    vegan: 'Vegan',
    'gluten-free': 'Gluten Free',
    'dairy-free': 'Dairy Free',
    kosher: 'Kosher',
  };

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="tw:flex tw:flex-wrap tw:gap-2">
      {data.map((item) => (
        <Tag
          key={item}
          variant="secondary"
          size="responsive"
          classname="tw:flex-shrink-0 tw:p-[3px] tw:hover:bg-black tw:hover:text-white tw:w-7 tw:h-7 tw:items-center tw:justify-center"
          icon={renderIcon(item)}
          tooltiplabel={tooltipLabelMap[item]}
        />
      ))}
    </div>
  );
};
