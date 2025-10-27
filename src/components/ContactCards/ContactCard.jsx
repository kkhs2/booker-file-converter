import { h, Fragment, cloneElement, isValidElement } from 'preact';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';
import Typography from '../Typography/Typography';
import { cn } from '../../../utils/helpers';

/**
 * Contact Card Component
 *
 * @description Renders a customisable Contact Card with various styles, states, and optional icons.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Title of the contact card
 * @param {"primary" | "secondary"} props.variant - Variant of the contact card
 * @param {"talk-to-team" | "view-faq" | "join-booker" | import("preact").VNode} props.icon - Icon to display on the contact card (string identifier or JSX component)
 * @param {string} props.href - URL for the contact card
 * @param {string} props.label - Label for the contact card
 * @param {boolean} props.railversion - Whether to use the rail version of the contact card
 * @param {string} props.classname - Additional CSS classes
 * @param {import("preact").ComponentChildren} props.children - Optional description content to display underneath the title
 *
 * @returns {JSX.Element} - The Card component
 */

const ContactCard = ({
  title,
  variant = 'primary',
  icon,
  href,
  label,
  railversion = false,
  classname,
  children,
  ...props
}) => {
  const iconClassName = railversion
    ? 'tw:w-[70px] tw:h-[70px] tw:2xl:h-[90px] tw:2xl:w-[90px]'
    : 'tw:w-[84px] tw:h-[85px] tw:2xl:h-[144px] tw:2xl:w-[146px]';
  return (
    <div
      className={cn(
        'tw:h-full tw:w-full tw:flex-1 tw:items-stretch tw:rounded-[20px] tw:border-[1.5px] tw:p-4 tw:lg:p-6',
        variant === 'secondary' && 'tw:border-0 tw:bg-primary-500',
        classname,
      )}
      {...props}
    >
      <div
        className={cn(
          'tw:flex tw:h-full tw:w-full tw:flex-row tw:flex-wrap tw:items-stretch tw:justify-between tw:lg:flex-col',
          railversion
            ? 'tw:flex-col tw:gap-4 tw:lg:flex-row tw:lg:gap-6'
            : 'tw:gap-6',
        )}
      >
        <div
          className={cn(
            'tw:flex tw:flex-col tw:justify-between tw:gap-6 tw:lg:w-full',
            railversion ? 'tw:order-1 tw:lg:order-0' : 'tw:lg:order-2',
          )}
        >
          <div className="tw:flex tw:flex-col tw:gap-3">
            <Typography
              domtype={railversion ? 'h6' : 'h5'}
              classname={cn(
                'tw:text-primary-500 tw:leading-[120%]',
                variant === 'secondary' && 'tw:text-white',
              )}
            >
              {title}
            </Typography>

            {children && (
              <div
                className={cn(
                  'tw:text-black',
                  variant === 'secondary' && 'tw:text-white/80',
                )}
              >
                {children}
              </div>
            )}
          </div>

          <Button
            variant={variant === 'secondary' ? 'primary' : 'tertiary'}
            size="small"
            iconright={
              variant === 'primary' ? (
                <Icons.chevronRight classname="tw:h-4 tw:w-4" />
              ) : null
            }
            iconleft={
              variant === 'secondary' ? (
                <Icons.user classname="tw:h-4 tw:w-4" />
              ) : null
            }
            href={href}
            label={label}
            classname="tw:w-fit tw:whitespace-nowrap"
          />
        </div>
        <div className={railversion ? 'tw:order-0 tw:lg:order-1' : ''}>
          {typeof icon === 'string' ? (
            <>
              {icon === 'talk-to-team' && (
                <Icons.talkToTeam classname={iconClassName} />
              )}
              {icon === 'view-faq' && (
                <Icons.viewFaq classname={iconClassName} />
              )}
              {icon === 'join-booker' && (
                <Icons.joinBooker classname={iconClassName} />
              )}
            </>
          ) : // Render JSX element if icon is not a string
          isValidElement(icon) ? (
            cloneElement(icon, {
              className: cn(icon.props.className, iconClassName),
            })
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
