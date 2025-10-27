/**
 * Menu Card Component
 *
 * @description A card component used to display link with an image and label
 *
 * @param {Object} props - The component props
 * @param {string} props.image - The image URL
 * @param {string} props.imageaspectratio - The aspect ratio for the image
 * @param {string} props.url - The URL to navigate to
 * @param {boolean} props.externalurl - Whether the URL is external — optional
 * @param {string} props.label - The label text
 * @param {string} props.labelposition - Position of the label: "overlay" (default) or "below"
 * @param {string} props.classname - The component classes
 * @returns {JSX.Element} - The MenuCard component
 */

import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import Icons from '../Icons/Icons';
import Button from '../Button/Button';

const MenuCard = ({
  image,
  imageaspectratio = 'tw:aspect-square',
  url,
  externalurl,
  label,
  labelposition = 'overlay',
  classname,
  ...props
}) => {
  const isLabelBelow = labelposition === 'below';

  return (
    <div
      className={cn(
        'tw:group tw:relative tw:w-full tw:cursor-pointer tw:overflow-hidden',
        isLabelBelow ? 'tw:flex tw:flex-col' : 'tw:h-full',
        classname,
      )}
      {...props}
    >
      <a
        href={url}
        className={cn(
          'tw:relative tw:block tw:w-full',
          isLabelBelow ? '' : 'tw:h-full',
        )}
        target={props.externalurl ? '_blank' : '_self'}
        rel={props.externalurl ? 'noreferrer' : undefined}
        aria-label={label}
      >
        <div
          className={cn(
            imageaspectratio,
            !isLabelBelow && 'tw:h-full',
            'tw:relative tw:w-full tw:overflow-hidden tw:rounded-xl',
          )}
        >
          <img
            src={image}
            alt={label}
            className="tw:absolute tw:z-0 tw:h-full tw:w-full tw:object-cover tw:object-center"
          />

          {!isLabelBelow && (
            <div className="tw:absolute tw:right-2 tw:bottom-2 tw:left-2 tw:z-10 tw:flex tw:items-center tw:justify-between tw:rounded-xl tw:bg-white-1000 tw:px-4 tw:py-2 tw:text-lg">
              <span>{label}</span>

              <Button
                variant="secondary"
                iconright={<Icons.chevronRight classname="tw:h-4 tw:w-4" />}
                classname="tw:h-8 tw:w-8 tw:!p-0 tw:shrink-0"
              />
            </div>
          )}
        </div>

        {isLabelBelow && (
          <div className="tw:mt-4 tw:mb-2 tw:flex tw:items-center tw:justify-between tw:rounded-xl tw:bg-white-1000 tw:px-2 tw:text-lg tw:lg:mt-6">
            <span>{label}</span>

            <Button
              variant="secondary"
              iconright={<Icons.chevronRight classname="tw:h-4 tw:w-4" />}
              classname="tw:h-8 tw:w-8 tw:!p-0 tw:shrink-0"
            />
          </div>
        )}
      </a>
    </div>
  );
};

export default MenuCard;
