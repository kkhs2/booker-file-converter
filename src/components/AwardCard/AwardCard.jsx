/**
 * Awards Card Component
 *
 * Renders a Awards Card with image, title and description
 *
 * @param {Object} props - Component props
 * @param {string} props.image - Award Card Image
 * @param {string} props.title - Award Card Title
 * @param {string} props.description - Award Card Description
 * @param {string} props.classname - Additional CSS classes
 * @returns {JSX.Element} - The Award Card component
 */

import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';

const AwardsCard = ({ title, image, description, classname, ...props }) => {
  return (
    <div
      className={cn(
        'tw:flex tw:h-full tw:w-full tw:flex-1 tw:flex-shrink-0 tw:snap-start tw:flex-col tw:rounded-[20px] tw:bg-white tw:p-4 tw:shadow-[4px_4px_10px_-24px_rgba(0,0,0,0.03)]',
        classname,
      )}
      {...props}
    >
      <img
        src={image}
        alt={title}
        className="tw:mb-5 tw:h-28 tw:w-full tw:object-contain tw:lg:mb-6"
      />
      <h3 className="tw:px-2 tw:text-center tw:text-lg tw:leading-[120%] tw:font-medium tw:text-black tw:lg:text-xl">
        {title}
      </h3>
      <p className="tw:mt-2 tw:px-2 tw:pb-2 tw:text-center tw:text-13 tw:leading-[140%] tw:text-black tw:lg:text-base">
        {description}
      </p>
    </div>
  );
};

export default AwardsCard;
