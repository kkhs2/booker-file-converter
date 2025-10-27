import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';

/**
 * Quick links Component
 *
 * Renders a customizable Quick links section.
 *
 * @param {Object} content - Component props
 * @param {string} props.classname - Additional CSS classes
 * @returns {JSX.Element} - The QuickLinks component
 */

const QuickLinks = ({ content = [], classname, ...props }) => {
  return (
    <div
      {...props}
      className={cn(
        'tw:flex tw:flex-col tw:gap-6 tw:rounded-[20px] tw:bg-secondary-1100 tw:px-4 tw:py-5 tw:sm:flex-row tw:md:w-full tw:md:gap-8 tw:md:p-6',
        classname,
      )}
    >
      {content.map((section, index) => (
        <div
          key={index}
          className="tw:flex tw:flex-1 tw:flex-col tw:gap-4 tw:md:gap-6"
        >
          <h2 className="tw:text-xl tw:leading-[1.2] tw:font-medium tw:lg:text-3xl">
            {section.title}
          </h2>
          <div className="tw:flex tw:flex-col tw:gap-3">
            {section.cards.map((card, cardIndex) => (
              <Fragment key={cardIndex}>{card()}</Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickLinks;
