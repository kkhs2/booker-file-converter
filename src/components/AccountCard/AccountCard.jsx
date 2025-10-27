import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import Typography from '../Typography/Typography';
import { Checkbox } from '../Form';

/**
 * AccountCard component displays a card with account details including title, cost, VAT, and an icon/image.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title of the account card.
 * @param {string} props.accentcolor - The accent color for the card background and border.
 * @param {string} props.cost - The cost displayed on the card.
 * @param {string} props.costwithvat - The cost including VAT displayed on the card.
 * @param {function} props.icon - A function that renders the icon component.
 * @param {string} props.image - The URL of the background image for the card.
 * @param {string} [props.variant='default'] - The variant of the card (default or reverse or with-percentage).
 * @param {number} [props.percentage] - The percentage displayed on the card (for variant 'with-percentage').
 * @param {boolean} [props.inactive] - Whether the card is inactive.
 * @param {boolean} [props.withcheckbox] - Whether to display a checkbox on the card.
 * @param {boolean} [props.checkboxactive] - Whether the checkbox is checked.
 * @param {string} props.classname - Additional classes to add to the component
 * @returns {JSX.Element} The rendered AccountCard component.
 */

const AccountCard = ({
  title,
  variant = 'default',
  accentcolor,
  cost,
  costwithvat,
  icon,
  image,
  percentage,
  inactive,
  withcheckbox,
  checkboxactive,
  classname,
}) => {
  return (
    <div
      className={cn(
        `tw:relative tw:flex tw:h-[153px] tw:w-[335px] tw:overflow-hidden tw:rounded-[20px] tw:bg-primary tw:text-white tw:shadow-[16px_32px_56px_-24px_rgba(0,0,0,0.10)] tw:lg:h-[220px] tw:lg:w-[427px]`,
        variant === 'reverse' && 'tw:text-black',
        variant === 'with-percentage' && 'tw:md:min-w-[316px]',
        inactive && 'tw:bg-beige-1000 tw:text-black',
        classname,
      )}
      style={{
        backgroundColor: variant !== 'with-percentage' && accentcolor,
      }}
    >
      <div className="tw:relative tw:z-10 tw:flex tw:flex-1 tw:flex-col tw:justify-between tw:p-4 tw:lg:min-w-0 tw:lg:p-6 tw:lg:pr-0">
        <Typography
          content={title}
          domtype="h7"
          classname="tw:leading-[120%] tw:max-lg:max-w-[180px]"
        />

        <div>
          <Typography
            content={cost}
            domtype="h4"
            classname={cn('tw:font-medium', inactive && 'tw:text-primary')}
          />
          <p className="tw:mt-3 tw:lg:mt-3">{costwithvat} incl VAT</p>
        </div>
      </div>

      <div
        className={cn(
          'tw:absolute tw:top-0 tw:right-0 tw:flex tw:h-[158px] tw:w-[158px] tw:items-center tw:justify-center tw:lg:relative tw:lg:h-[174px] tw:lg:w-[174px]',
          variant === 'with-percentage' && 'tw:items-start tw:justify-start',
        )}
      >
        <div
          className={cn(
            'tw:absolute tw:top-0 tw:left-0 tw:h-full tw:w-full tw:bg-secondary-2000 tw:bg-cover',
            inactive && 'tw:bg-[#E1DDD6]',
          )}
          style={{
            backgroundImage: variant !== 'with-percentage' && `url(${image})`,
          }}
        ></div>
        <div
          className={cn(
            'tw:absolute tw:top-0 tw:left-0 tw:h-full tw:w-full tw:border-[76px] tw:border-t-transparent tw:border-r-transparent tw:border-b-primary tw:border-l-primary tw:lg:border-[87px]',
            inactive && 'tw:border-b-beige-1000 tw:border-l-beige-1000',
            variant === 'with-percentage' && 'tw:right-0 tw:left-auto',
          )}
          style={{
            borderBottomColor: variant !== 'with-percentage' && accentcolor,
            borderLeftColor: variant !== 'with-percentage' && accentcolor,
          }}
        ></div>
        <div className="tw:relative tw:h-[116px] tw:w-[116px] tw:lg:mx-auto tw:lg:h-[132px] tw:lg:w-[132px]">
          {variant === 'with-percentage' && (
            <p className="tw:text-[100px] tw:leading-none tw:font-bold tw:-tracking-[16px] tw:text-white">
              {percentage}%
            </p>
          )}
          {variant !== 'with-percentage' &&
            icon({ classname: 'tw:max-w-full tw:max-h-full tw:text-white' })}
        </div>
      </div>

      {withcheckbox && (
        <div className="tw:absolute tw:right-4 tw:bottom-4">
          <Checkbox variant="reverse" checked={checkboxactive} disabled />
        </div>
      )}
    </div>
  );
};

export default AccountCard;
