import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';
import Tag from '../Tag/Tag';
import Typography from '../Typography/Typography';

/**
 * Next Delivery Component
 *
 * @description A component that displays a Next Delivery with status messages, estimated delivery times,
 * issue alerts, tags, and CTA buttons. It dynamically adjusts its appearance based on the `issue` state.
 *
 * @param {Object} props - Component props
 * @param {Object | false} props.tag - Displays a tag message with optional styling.
 * @param {string} props.tag.text - The text for tag.
 * @param {string} props.tag.style - Additional styling for tag e.g. background color.
 * @param {Object | false} props.message - Displays a main status message with optional icons.
 * @param {string} props.message.text - The main status text inside the message.
 * @param {JSX.Element | null} props.message.iconleft - Optional icon displayed to the left of the message text.
 * @param {JSX.Element | null} props.message.iconright - Optional icon displayed to the right of the message text.
 * @param {string | undefined} props.message.textsize - Custom Tailwind class for controlling text size.
 * @param {Object | false} props.issuemessage - Displays an alert message when there is a delivery issue.
 * @param {string} props.issuemessage.text - The issue message text.
 * @param {JSX.Element | null} props.issuemessage.iconleft - Optional icon displayed to the left of the issue message.
 * @param {string} props.issuemessage.message - Additional details about the delivery issue.
 * @param {boolean} props.issue - If `true`, changes the styling to indicate a delivery issue.
 * @param {string} props.timetilldelivery - The estimated time remaining for delivery.
 * @param {string} props.estimateddelivery - The expected arrival date and time of the package.
 * @param {Array} props.ctas - List of CTA (Call-to-Action) buttons for user interaction.
 * @param {string} props.ctas[].label - The label of the CTA button.
 * @param {JSX.Element | null} props.ctas[].iconleft - Optional icon displayed to the left of the CTA button label.
 * @param {string} props.ctas[].href - The URL the CTA button should navigate to.
 * @param {"primary" | "secondary" | "tertiary"} [props.ctas[].variant="tertiary"] - The variant style of the CTA button.
 * @param {string} props.ctamessage - A small text message displayed above the CTA buttons.
 * @param {Object | false} props.changeorder - Displays information on option to change order
 * @param {string} props.changeorder.text - The text for change order information.
 * @param {JSX.Element | null} props.message.icon - Optional icon displayed to the left of the message text.
 * @param {string} props.classname - Additional Tailwind classes for custom styling.
 * @returns {JSX.Element} - The Next Delivery component.
 */

const NextDelivery = ({
  tag,
  message = false,
  issuemessage = false,
  timetilldelivery,
  estimateddelivery = false,
  ctas = [],
  ctamessage,
  issue = false,
  changeorder = false,
  classname,
  ...props
}) => {
  return (
    <div
      className={cn(
        'tw:relative tw:flex tw:flex-col tw:justify-between tw:overflow-hidden tw:rounded-2xl tw:bg-primary-500 tw:p-3 tw:lg:max-w-[427px]',
        issue == true &&
          'tw:bg-secondary-1000 tw:shadow-[16px_32px_56px_-24px_rgba(0,0,0,0.10)]',
        estimateddelivery == false && issue == false && 'tw:max-w-[343px]',
        classname,
        props.border && 'tw:border tw:border-black',
      )}
      {...props}
    >
      <div
        className={cn(
          'tw:px-2 tw:py-2 tw:pb-5 tw:lg:pb-10',
          issue == true && 'tw:pb-4 tw:lg:pb-6',
          estimateddelivery == false && issue == false && 'tw:pb-0 tw:lg:pb-0',
        )}
      >
        {message && (
          <div
            className={cn(
              'tw:mr-2 tw:mb-5 tw:flex tw:items-center tw:gap-3 tw:text-white tw:lg:mb-8',
              message.iconright && 'tw:justify-between',
              estimateddelivery == false &&
                issue == false &&
                'tw:mb-6 tw:items-start tw:lg:mb-10',
            )}
          >
            {/* If Icon left */}
            {message.iconleft && message.iconleft()}

            {/* Heading of Next Delivery card */}
            <Typography
              domtype="h6"
              className={cn(
                'tw:text-xl tw:font-medium tw:whitespace-nowrap tw:text-white tw:lg:text-3xl',
                message.textsize && `${message.textsize}`,
              )}
              content={message.text}
            />

            {timetilldelivery && (
              <span className="tw:rounded-lg tw:px-3 tw:py-2 tw:leading-[1.2] tw:outline tw:outline-white">
                {' '}
                <Typography
                  domtype="h6"
                  classname={cn(
                    'tw:font-bold tw:text-white tw:text-xl tw:lg:text-3xl tw:whitespace-nowrap',
                  )}
                  content={timetilldelivery}
                />
              </span>
            )}

            {/* If Icon right */}
            {message.iconright && message.iconright()}
          </div>
        )}

        {/* Messaging if there is a delivery issue */}
        {issuemessage && (
          <div>
            <div
              className={cn(
                'tw:mr-2 tw:mb-5 tw:flex tw:items-center tw:gap-3 tw:text-white tw:lg:mb-8',
                issue == true && 'tw:mb-4 tw:lg:mb-6',
              )}
            >
              {issuemessage.iconleft && issuemessage.iconleft()}
              <Typography
                domtype="h5"
                className={cn(
                  'tw:text-2xl tw:leading-[1.2] tw:font-medium tw:break-words tw:text-primary tw:lg:text-5xl',
                  issue == true && 'tw:text-3xl',
                )}
                content={issuemessage.text}
              />
            </div>
            <div className="tw:mx-2">
              <p class="tw:text-lg tw:leading-[1.4]">{issuemessage.message}</p>
            </div>
          </div>
        )}

        {/* Tag element */}
        {tag && (
          <div className="tw:mx-2 tw:mb-3 tw:lg:mb-4">
            <Tag
              label={tag.text}
              size="small"
              variant="quaternary"
              icon={<Icons.clock />}
              className={cn(
                'tw:align-center tw:inline-flex tw:cursor-default tw:items-center tw:rounded-[120px] tw:py-1.5 tw:pr-1 tw:pl-3 tw:text-base tw:leading-none tw:text-white tw:no-underline tw:transition-all tw:focus:outline-hidden',
                tag && tag.style && `${tag.style}`,
              )}
            />
          </div>
        )}

        {/* Estimated time of delivery element */}
        {estimateddelivery && (
          <div className="tw:flex">
            <Typography
              domtype="h7"
              classname={cn(
                'tw:font-bold tw:text-white tw:mx-2 tw:text-lg tw:lg:text-xl tw:whitespace-nowrap',
              )}
              content={estimateddelivery}
            />
          </div>
        )}
      </div>

      {/* CTA buttons */}
      <div className="tw:flex tw:flex-col tw:gap-3 tw:rounded-xl tw:bg-white tw:p-3">
        {ctamessage && (
          <span className="tw:px-3 tw:py-1 tw:text-base tw:leading-[1.25]">
            {ctamessage}
          </span>
        )}

        {/* If there has been a change to order e.g. substitution */}
        {changeorder && changeorder.tag && (
          <span className="tw:flex tw:items-center tw:gap-2 tw:rounded-[120px] tw:bg-beige-1000 tw:px-3 tw:py-1.5 tw:pb-1 tw:text-base tw:leading-[1.25] tw:font-medium tw:lg:mb-1">
            {changeorder.tag.icon()}
            {changeorder.tag.message}
          </span>
        )}
        {ctas.map((button, index) => (
          <Button
            key={index}
            variant={button.variant || 'tertiary'}
            href={button.href}
            label={button.label}
            iconleft={button.iconleft}
          />
        ))}

        {changeorder && (
          <div className="tw:mt-1 tw:flex tw:items-center tw:gap-1 tw:px-1 tw:lg:px-3">
            {changeorder.icon()}{' '}
            <span className="tw:text-base tw:leading-[1.25] tw:whitespace-nowrap">
              {changeorder.text}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NextDelivery;
