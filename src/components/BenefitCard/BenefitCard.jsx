import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';

/**
 * Information Card Component
 *
 * Renders a customizable Information Card with various styles, states, and optional icons.
 *
 * @param {Object} props - Component props
 * @param {string} props.subheading - Text displayed on the Information Card
 * @param {string} props.heading - Heading text displayed on the Information Card
 * @param {string} props.bodytext - Text displayed on the Information Card
 * @param {array} props.bulletpoints - Bullet points to display on the Information Card
 * @param {JSX.Element | null} props.icon - Icon displayed to the left of the label
 * @param {string} props.classname - Additional CSS classes
 * @returns {JSX.Element} - The Benefit Card component
 */

const BenefitCard = ({
  subheading = '',
  heading = '',
  bodytext = '',
  icon = null,
  bulletpoints = [],
  classname,
  ...props
}) => {
  return (
    <div
      className={cn(
        'tw:flex tw:h-full tw:items-start tw:justify-between tw:gap-2 tw:rounded-[20px] tw:bg-white tw:p-4 tw:shadow-[4px_4px_10px_0_rgba(0,0,0,0.03)] tw:lg:justify-between tw:lg:gap-6 tw:lg:p-4',
        classname,
      )}
      {...props}
    >
      <div className="tw:flex tw:flex-col tw:gap-2">
        {heading && (
          <span className="tw:text-4xl tw:font-semibold tw:text-balance tw:text-primary tw:lg:text-7xl">
            {heading}
          </span>
        )}
        {subheading && (
          <span
            className={cn(
              'tw:text-lg tw:leading-[120%] tw:font-normal tw:text-balance tw:text-primary tw:lg:text-xl',
              heading && 'tw:text-xl tw:lg:text-3xl',
            )}
          >
            {subheading}
          </span>
        )}

        {bodytext && (
          <p className="tw:mt-1 tw:mb-2 tw:text-lg tw:leading-[140%] tw:text-balance">
            {bodytext}
          </p>
        )}
        {bulletpoints.length > 0 && (
          <ul className="tw:list-circle tw:list-disc">
            {bulletpoints.map((point, index) => (
              <li
                key={index}
                className="tw:mb-1 tw:ml-3 tw:leading-[105%] tw:marker:text-2xs"
              >
                <span className="tw:text-13 tw:text-black tw:lg:text-base">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {icon && (
        <div
          className={cn(
            'tw:flex tw:h-auto tw:w-[42px] tw:shrink-0 tw:lg:h-[90px] tw:lg:w-[90px]',
            heading && 'tw:w-[80px] tw:lg:h-[100px] tw:lg:w-[100px]',
          )}
        >
          {typeof icon === 'function' ? icon() : icon}
        </div>
      )}
    </div>
  );
};

export default BenefitCard;
