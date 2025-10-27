import { h, Fragment } from 'preact';
import { cn } from '../../../../utils/helpers';
import Icons from '../../Icons/Icons';
import { ProductStock } from '../../Product/ProductStock';
import Tag from '../../Tag/Tag';
import Typography from '../../Typography/Typography';

/**
 * BranchCard component displays information about a branch, including its title, distance, address,
 * schedule, tags, and product stock status. It also provides interactivity for clicking on the card
 * or viewing more details.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title of the branch.
 * @param {string} props.distance - The distance to the branch.
 * @param {string} props.address - The address of the branch.
 * @param {string} props.schedule - The schedule or operating hours of the branch.
 * @param {Array<{label: string, positive: boolean}>} [props.tags] - An array of tags associated with the branch.
 * @param {string} [props.productstock] - The stock status of a product at the branch.
 * @param {boolean} [props.active] - Indicates if the branch card is active.
 * @param {Function} [props.onclick] - Callback function triggered when the card is clicked.
 * @param {Function} [props.ondetailsclick] - Callback function triggered when the "See details" button is clicked.
 *
 * @returns {JSX.Element} The rendered BranchCard component.
 */

export const BranchCard = ({
  title,
  distance,
  address,
  schedule,
  tags,
  productstock,
  active,
  onclick,
  ondetailsclick,
}) => {
  return (
    <div
      className={cn(
        'tw:cursor-pointer tw:rounded-[20px] tw:border tw:border-transparent tw:bg-secondary-1000 tw:p-6 tw:transition-colors tw:hover:border-black',
        active && 'tw:border-primary tw:bg-primary-50',
      )}
      onClick={onclick}
    >
      <div className="tw:mb-1 tw:flex tw:items-center tw:justify-between">
        <Typography domtype="h7" classname="tw:font-bold">
          {title}
        </Typography>
        <p className="tw:text-base tw:text-grey-600">{distance}</p>
      </div>
      <p className="tw:max-w-[148px]">{address}</p>

      <div className="tw:mt-6 tw:flex tw:items-center">
        <Icons.clock className="tw:mr-2 tw:h-4 tw:w-4 tw:text-primary" />
        <p>{schedule}</p>
      </div>

      <div className="tw:mt-4 tw:mb-8 tw:max-w-[120px] tw:flex-col tw:gap-2 tw:lg:max-w-full tw:lg:flex-row">
        {tags?.map((tag, index) => (
          <Tag
            key={index}
            label={tag.label}
            icon={
              tag.positive ? (
                <Icons.checkMark classname="tw:text-green-500 tw:w-3 tw:h-3 tw:shrink-0" />
              ) : (
                <Icons.x classname="tw:text-red-700 tw:w-3 tw:h-3 tw:shrink-0" />
              )
            }
            variant="inverse"
            classname="tw:mr-2 tw:mb-2 tw:border-none"
          />
        ))}
      </div>

      <div className="tw:flex tw:items-center tw:justify-between">
        <button
          className="tw:inline-flex tw:cursor-pointer tw:items-center tw:space-x-2 tw:font-medium tw:transition-opacity tw:hover:opacity-80"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            ondetailsclick?.();
          }}
        >
          <span>See details</span>
          <Icons.arrowLeft classname="tw:rotate-180" />
        </button>

        {productstock && <ProductStock status={productstock} />}
      </div>
    </div>
  );
};
