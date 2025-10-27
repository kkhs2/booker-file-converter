/**
 * StatusSection component renders a styled section with a title and children content.
 *
 * @param {Object} props - The props object.
 * @param {string} props.title - The title to display in the section.
 * @param {Object} [props.cta] - Optional call-to-action button properties.
 * @param {import('preact').ComponentChildren} props.children - The child elements to render inside the section.
 *
 * @returns {JSX.Element} The rendered StatusSection component.
 */

import { h, Fragment } from 'preact';
import Typography from '../../Typography/Typography';
import Button from '../../Button/Button';
import { cn } from '../../../../utils/helpers';

export const StatusSection = ({ title, children, cta, classname }) => {
  return (
    <div
      className={cn(
        'tw:flex tw:flex-col tw:gap-2 tw:rounded-xl tw:bg-secondary-1000 tw:p-4 tw:lg:flex-row tw:lg:items-center tw:lg:gap-10 tw:lg:px-6 tw:lg:py-2',
        classname,
      )}
    >
      <Typography domtype="h7">{title}</Typography>

      <div className="tw:flex tw:items-center tw:justify-between tw:sm:justify-normal tw:sm:gap-4">
        {children}
      </div>

      {cta && (
        <Button
          classname="tw:hidden tw:lg:flex tw:lg:ml-auto tw:max-lg:mt-5"
          {...cta}
        />
      )}
    </div>
  );
};

export default StatusSection;
