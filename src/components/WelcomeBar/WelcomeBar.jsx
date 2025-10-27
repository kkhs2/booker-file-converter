// Main component
import { cn } from '../../../utils/helpers';
import Typography from '../Typography/Typography';
import Icons from '../Icons/Icons';

/**
 * Welcome Bar Component
 *
 * @description A component that displays a welcome bar with customer information
 *
 * @param {Object} props - Component props
 * @param {string} [props.classname] - Additional classes to add to the component
 * @param {string} [props.image] - The background image for the component
 * @param {string} [props.customerid] - The customer ID
 * @param {string} [props.headline] - The headline of the component
 * @param {string} [props.title] - The title of the component
 * @param {string} [props.registrationinfo] - The registration info
 * @param {Object} [props.club] - The club information
 * @param {string} props.club.id - The club ID ('on-trade' | 'fast-food' | 'ubser-eats' | 'just-eat')
 * @param {string} props.club.name - The club name
 * @param {string} [props.club.image] - Optional club image URL
 * @param {"default" | "with-logo" | "club"} [props.variant='default'] - The variant of the component
 * @returns {JSX.Element} Preact component - The WelcomeBar component
 */

const WelcomeBar = ({
  variant = 'default',
  image,
  customerid,
  headline = 'Account',
  title,
  classname,
  registrationinfo,
  club,
  ...props
}) => {
  /**
   * Render the club tag
   * @param {string} club - The club type
   * @returns {JSX.Element} - The club tag
   * */
  const renderClubTag = (club) => {
    // Configuration object for club styles and icons
    const clubConfig = {
      'on-trade': {
        bgColor: 'tw:bg-blue-600',
        textColor: 'tw:text-white',
        icon: <Icons.localBar className="tw:h-5 tw:w-5 tw:shrink-0" />,
      },
      'fast-food': {
        bgColor: 'tw:bg-[#B6284B]',
        textColor: 'tw:text-white',
        icon: <Icons.fastFood className="tw:h-5 tw:w-5 tw:shrink-0" />,
      },
      'just-eat': {
        bgColor: 'tw:bg-[#FF8000]',
        textColor: 'tw:text-white',
        icon: club.image ? (
          <img
            src={club.image}
            alt={club.name}
            className="tw:h-5 tw:w-5 tw:shrink-0"
          />
        ) : null,
      },
      'uber-eats': {
        bgColor: 'tw:bg-[#06C167]',
        textColor: 'tw:text-black',
        icon: club.image ? (
          <img
            src={club.image}
            alt={club.name}
            className="tw:h-5 tw:w-5 tw:shrink-0"
          />
        ) : null,
      },
    };

    // Get configuration for current club
    const config = clubConfig[club.id];

    // If no configuration exists for this club ID, return null
    if (!config) return null;

    return (
      <div
        className={cn(
          'tw:flex tw:w-max tw:items-center tw:gap-2 tw:rounded-[120px] tw:px-3 tw:py-1.5 tw:text-[13px] tw:lg:gap-3 tw:lg:text-base',
          config.bgColor,
          config.textColor,
        )}
      >
        {config.icon}
        <span>{club.name}</span>
      </div>
    );
  };

  return (
    <div className={classname} {...props}>
      {variant === 'with-logo' && (
        <div className="tw:space-y-3 tw:lg:space-y-4">
          {image && (
            <img src={image} alt="logo" className="tw:h-10 tw:w-auto" />
          )}

          <div className="tw:flex tw:items-center tw:gap-2 tw:text-[13px] tw:lg:gap-3 tw:lg:text-base">
            <p>{title}</p>
            <span>∙</span>

            <p>Customer No. {customerid}</p>

            {registrationinfo && <p>{registrationinfo}</p>}
          </div>
        </div>
      )}

      {variant === 'default' && (
        <div className="tw:space-y-3 tw:lg:space-y-4">
          <Typography domtype="h2">{headline}</Typography>
          <div className="tw:items-center tw:gap-2 tw:space-y-1 tw:text-[13px] tw:lg:flex tw:lg:gap-3 tw:lg:space-y-0 tw:lg:text-base">
            <div className="tw:flex tw:gap-2 tw:lg:gap-3">
              <p>Customer No. {customerid}</p>
              <span>∙</span>
              <p>{title}</p>
              <span>∙</span>
            </div>
            <div>{registrationinfo && <p>{registrationinfo}</p>}</div>
          </div>
        </div>
      )}

      {variant === 'club' && (
        <div className="tw:space-y-3 tw:lg:space-y-4">
          <Typography domtype="h5">{title}</Typography>
          <div className="tw:gap-2 tw:space-y-3 tw:text-[13px] tw:lg:flex tw:lg:items-center tw:lg:gap-3 tw:lg:space-y-0 tw:lg:text-base">
            {renderClubTag(club)}
            <span className="tw:hidden tw:lg:block">∙</span>
            <p>Customer No. {customerid}</p>

            {registrationinfo && (
              <>
                <span>∙</span>
                <p>{registrationinfo}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeBar;
