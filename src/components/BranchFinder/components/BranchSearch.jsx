import { cn } from '../../../../utils/helpers';
import Icons from '../../Icons/Icons';

export const BranchSearch = ({
  onsearchchange,
  onuselocation,
  searchclassname,
  mylocationclassname,
}) => {
  return (
    <>
      <div
        className={cn(
          'tw:flex tw:max-h-12 tw:w-full tw:flex-grow tw:items-center tw:justify-between tw:rounded-full tw:border tw:border-black/20 tw:bg-white-1000 tw:px-3 tw:py-4 tw:transition-all',
          searchclassname,
        )}
      >
        <div className="tw:flex tw:w-full tw:items-center tw:gap-2">
          <button onClick={onsearchchange} className="tw:cursor-pointer">
            <Icons.search classname="tw:h-5 tw:w-5 tw:text-primary" />
          </button>
          <input
            type="search"
            className="tw:w-full tw:text-lg tw:placeholder-black-1000 tw:outline-none tw:focus:ring-0 tw:[&::-webkit-search-cancel-button]:hidden tw:[&::-webkit-search-cancel-button]:appearance-none"
            placeholder="Search by postcode or area"
            onChange={onsearchchange}
          />
        </div>
      </div>

      <button
        className={cn(
          'tw:mt-4.5 tw:mb-3 tw:ml-4 tw:cursor-pointer tw:underline tw:decoration-dotted tw:underline-offset-4 tw:transition-opacity tw:hover:opacity-80',
          mylocationclassname,
        )}
        onClick={onuselocation}
      >
        Or use my location
      </button>
    </>
  );
};
