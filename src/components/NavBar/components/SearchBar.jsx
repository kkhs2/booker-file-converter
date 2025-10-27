import { h, Fragment } from 'preact';
import { cn } from '../../../../utils/helpers';
import Icons from '../../Icons/Icons';
import { SearchWithList } from './SearchWithList';
import { SearchSuggestions } from './SearchSuggestions';

/**
 * SearchBar Component
 *
 * @description The SearchBar component allows users to search for products by name, code, or barcode.
 *
 * @param {Object} props - The props object.
 * @param {string} props.searchValue - The current search value
 * @param {function} props.onsearchchange - The function to handle search input changes
 * @param {function} props.onsearchfocus - The function to handle search input focus
 * @param {function} props.onSearchBlur - The function to handle search input blur
 * @param {function} props.clearSearch - The function to clear the search input
 * @param {Array} props.searchterms - The list of search terms for the search with list feature
 * @param {boolean} props.searchwithlist - The state of the search with list feature
 * @param {function} props.onsearchwithlist - The function to call when the search with list button is clicked
 * @param {'default' | 'with-border' | 'filtericon'} props.variant - The variant of the search bar
 * @param {boolean} props.issearchsuggestionsvisible - The state of the search suggestions visibility
 * @param {Array} props.searchResults - The search results to display
 * @param {function} props.onsearchsubmit - The function to handle search submission
 * @param {function} props.onsuggestionclick - The function to handle suggestion click
 * @param {Object} [props.promotionsbanner] - Optional promotional banner properties
 * @param {String} [props.promotionsbanner.externalimage] - The external promotional banner image
 * @param {String} [props.promotionsbanner.externalimagemobile] - The mobile version of the external promotional banner image
 * @param {String} [props.promotionsbanner.externalurl] - The URL to navigate to when the promotional banner is clicked
 * @param {string} props.classname - Additional classes to style the component
 * @returns {JSX.Element} - The SearchBar component
 * */

export const SearchBar = ({
  searchValue,
  onsearchchange,
  onsearchfocus,
  onSearchBlur,
  clearSearch,
  searchterms,
  searchwithlist,
  onsearchwithlist,
  placeholder,
  issearchsuggestionsvisible,
  searchResults,
  variant = 'default',
  onsearchsubmit,
  onsuggestionclick,
  promotionsbanner,
  brandbanner,
  classname,
}) => {
  return (
    <div
      className={cn(
        'tw:hidden tw:max-w-[416px] tw:min-w-[130px] tw:flex-grow tw:items-center tw:rounded-full tw:lg:flex',
        searchwithlist && 'tw:max-w-[590px]',
        classname,
      )}
    >
      <div
        className={cn(
          'tw:z-30 tw:flex tw:max-h-12 tw:w-full tw:flex-grow tw:items-center tw:justify-between tw:rounded-full tw:bg-white-1000 tw:px-3 tw:py-4 tw:transition-all',
          variant === 'with-border'
            ? 'tw:border tw:border-black/20 tw:focus-within:shadow-[4px_4px_10px_-5px_rgba(0,0,0,0.08)]'
            : 'tw:shadow-[4px_4px_10px_-5px_rgba(0,0,0,0.08)]',
          variant === 'filtericon' &&
            'tw:border tw:border-black/20 tw:bg-secondary-1000',
        )}
      >
        <div className="tw:flex tw:w-full tw:items-center tw:gap-2">
          <button
            onClick={
              onsearchsubmit ? () => onsearchsubmit(searchValue) : undefined
            }
            className="tw:cursor-pointer"
            aria-label="Search"
          >
            {variant === 'filtericon' ? (
              <Icons.searchFilter classname=" tw:text-primary" />
            ) : (
              <Icons.search classname="tw:h-5 tw:w-5 tw:text-primary" />
            )}
          </button>
          <input
            type="search"
            className={cn(
              'tw:w-full tw:text-lg tw:overflow-ellipsis tw:placeholder-black-1000 tw:outline-none tw:focus:ring-0 tw:[&::-webkit-search-cancel-button]:hidden tw:[&::-webkit-search-cancel-button]:appearance-none',
              variant === 'filtericon' && 'tw:bg-secondary-1000',
            )}
            placeholder={placeholder || 'Search name, code or barcode'}
            value={searchValue}
            onInput={onsearchchange}
            onFocus={onsearchfocus}
            onBlur={onSearchBlur}
            aria-label="Search products"
          />
        </div>

        {searchwithlist && (
          <div className="tw:flex-shrink-0 tw:pl-3">
            <SearchWithList
              searchterms={searchterms}
              onsearchwithlist={onsearchwithlist}
            />
          </div>
        )}

        {searchValue && !searchwithlist && (
          <button
            onClick={clearSearch}
            className="tw:rounded-full tw:p-2 tw:transition-colors tw:hover:bg-black-100"
            aria-label="Clear search"
          >
            <Icons.x classname="tw:h-4 tw:w-4 tw:text-black-1000" />
          </button>
        )}
      </div>

      {issearchsuggestionsvisible && (
        <>
          <div
            className="tw:bg-opacity-50 tw:fixed tw:inset-0 tw:z-10 tw:bg-black-300"
            onClick={clearSearch}
            aria-hidden="true"
          />
          <div className="tw:absolute tw:top-[84px] tw:isolate tw:z-50 tw:w-[760px] tw:min-w-[200px] tw:rounded-2xl tw:bg-white-1000 tw:shadow-lg">
            <SearchSuggestions
              suggestions={searchResults}
              searchvalue={searchValue}
              onsuggestionclick={onsuggestionclick}
              onsearchsubmit={onsearchsubmit}
              promotionsbanner={promotionsbanner}
              brandbanner={brandbanner}
            />
          </div>
        </>
      )}
    </div>
  );
};
