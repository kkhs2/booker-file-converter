import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import Typography from '../Typography/Typography';
import Icons from '../Icons/Icons';

/**
 * InformationCard Component
 *
 * @description A versatile card component that displays information such as title, cost, progress, and status.
 * It supports multiple variants (default, behind, on-track) and can include icons, progress bars, and additional details.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - The title of the InformationCard
 * @param {string} props.accentcolor - The accent color for the card background and border
 * @param {string} props.cost - The cost displayed on the InformationCard
 * @param {string} props.costsubtitle - The subtitle for the cost value
 * @param {string} props.costwithvat - The cost including VAT displayed on the InformationCard
 * @param {string} props.costdescription - The description for the cost value
 * @param {'default' | 'behind' | 'on-track'} props.variant - The variant of the InformationCard (default, behind, on-track)
 * @param {number} props.progress - The progress percentage for the InformationCard
 * @param {string} props.costtospend - The cost to spend displayed on the InformationCard
 * @param {string} props.costtospendsubtitle - The subtitle for the cost to spend value
 * @param {function} props.icon - A function that renders the icon component
 * @param {boolean} [props.inactive=false] - Whether the InformationCard is inactive
 * @param {string} props.classname - Additional classes to add to the component
 * @returns {JSX.Element} Preact component - The InformationCard component
 */

const InformationCard = ({
  title,
  accentcolor,
  cost,
  costsubtitle,
  costwithvat,
  costdescription,
  variant = 'default',
  progress,
  costtospend,
  costtospendsubtitle,
  icon,
  inactive = false,
  classname,
}) => {
  return (
    <div
      className={cn(
        `tw:w-[335px] tw:rounded-[20px] tw:rounded-r-[23px] tw:pl-2 tw:shadow-[16px_32px_56px_-24px_rgba(0,0,0,0.10)] tw:lg:h-[220px] tw:lg:w-[427px]`,
        variant === 'default' && icon && 'tw:h-[153px]',
        variant === 'default' && !icon && 'tw:h-[153px] tw:md:min-w-[316px]',
        variant === 'behind' && 'tw:h-[220px]',
        variant === 'on-track' && 'tw:h-[153px] tw:lg:h-[220px]',
        classname,
      )}
      style={{
        backgroundColor: accentcolor,
      }}
    >
      <div
        className={cn(
          'tw:flex tw:h-full tw:rounded-r-[20px] tw:bg-white tw:px-3 tw:py-4 tw:max-lg:flex-col tw:lg:space-x-4 tw:lg:px-4 tw:lg:py-3',
          inactive && 'tw:bg-beige-1000',
        )}
      >
        <div className="tw:flex tw:h-full tw:w-full tw:flex-col tw:justify-between tw:lg:py-3">
          <div className="tw:flex tw:justify-between tw:space-x-2 tw:lg:space-x-8">
            <Typography content={title} domtype="h7" />

            {variant === 'on-track' && (
              <Icons.checkCircle2 classname="tw:lg:h-22 tw:w-14 tw:lg:w-22 tw:h-14 tw:flex-shrink-0  tw:text-blue-600" />
            )}
          </div>

          <div
            className={cn(
              variant === 'on-track' && 'tw:max-lg:mt-4',
              variant === 'default' &&
                !!icon &&
                'tw:flex tw:items-center tw:justify-between',
            )}
          >
            <div
              className={cn(
                variant === 'default' &&
                  !!icon &&
                  'tw:flex tw:w-full tw:items-center tw:justify-between',
              )}
            >
              <div
                className={cn(
                  'tw:flex',
                  variant === 'default' && 'tw:flex-col',
                  (variant === 'behind' || variant === 'on-track') &&
                    'tw:items-center tw:justify-between',
                )}
              >
                <div className="tw:flex tw:items-baseline tw:space-x-2">
                  <Typography
                    content={cost}
                    domtype="h6"
                    classname={cn(
                      'tw:font-bold',
                      inactive && 'tw:text-primary',
                    )}
                  />
                  {costsubtitle && <p>{costsubtitle}</p>}
                </div>

                {variant === 'behind' && (
                  <p className="tw:font-medium tw:lg:hidden">You’re behind</p>
                )}

                {variant === 'on-track' && (
                  <p className="tw:font-medium">You’re on track!</p>
                )}

                {variant === 'default' && (
                  <p
                    className={cn(
                      'tw:mt-3 tw:text-grey-600 tw:lg:mt-4',
                      inactive && 'tw:text-black',
                    )}
                  >
                    {costwithvat ? `${costwithvat} incl VAT` : costdescription}
                  </p>
                )}
              </div>

              {variant === 'behind' && (
                <div className="tw:mt-4 tw:h-4 tw:w-full tw:rounded-full tw:bg-[#ECE8E1] tw:p-0.75 tw:max-lg:mb-4 tw:lg:mt-6">
                  <div
                    className="tw:h-full tw:rounded-full"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: accentcolor,
                    }}
                  ></div>
                </div>
              )}
            </div>

            {variant === 'default' && icon && (
              <div>
                {icon({
                  classname:
                    'tw:lg:h-[84px] tw:lg:w-[82px] tw:w-[60px] tw:h-[62px]',
                })}
              </div>
            )}
          </div>

          {variant === 'on-track' && (
            <div className="tw:mt-4 tw:h-4 tw:w-full tw:flex-shrink-0 tw:rounded-full tw:bg-[#ECE8E1] tw:p-0.75 tw:max-lg:mb-4 tw:lg:mt-6">
              <div
                className="tw:h-full tw:w-full tw:rounded-full"
                style={{
                  backgroundColor: accentcolor,
                }}
              ></div>
            </div>
          )}
        </div>

        {variant === 'behind' && (
          <div className="tw:flex tw:flex-shrink-0 tw:items-center tw:justify-between tw:rounded-xl tw:bg-secondary-1000 tw:p-2 tw:max-lg:space-x-2 tw:lg:w-[142px] tw:lg:flex-col tw:lg:space-y-3">
            <div className="tw:flex tw:items-center tw:max-lg:space-x-2 tw:lg:flex-col tw:lg:space-y-3">
              <Icons.alertCircle className="tw:h-10 tw:w-10 tw:flex-shrink-0 tw:lg:h-14 tw:lg:w-14" />
              <p className="tw:text-base tw:leading-[125%] tw:lg:text-center">
                Almost there!
                <br />
                Spend an extra
              </p>
            </div>

            <div className="tw:text-right tw:lg:text-center">
              <Typography
                content={costtospend}
                domtype="h7"
                classname="tw:text-primary tw:font-bold"
              />

              <p className="tw:text-sm tw:lg:mt-4 tw:lg:text-base">
                {costtospendsubtitle}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InformationCard;
