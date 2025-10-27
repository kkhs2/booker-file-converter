import { h, Fragment } from 'preact';
import Button from '../../Button/Button';
import Icons from '../../Icons/Icons';
import PromotionsBanner from '../../PromotionsBanner/PromotionsBanner';
import { formatCurrency } from '../../../../utils/helpers';
import Typography from '../../Typography/Typography';

/**
 * Search Suggestions Component
 *
 * @description Displays a list of search suggestions with images, names, prices, and RRP.
 *
 * @param {Object} props
 * @param {Array} props.suggestions - Array of search suggestions to display
 * @param {String} props.searchvalue - The search term used to generate the suggestions
 * @param {Function} props.onsearchsubmit - Function to handle search submission
 * @param {Function} props.onsuggestionclick - Function to handle suggestion click
 * @param {Object} [props.promotionsbanner] - Optional promotional banner properties
 * @param {String} [props.promotionsbanner.externalimage] - The external promotional banner image
 * @param {String} [props.promotionsbanner.externalimagemobile] - The mobile version of the external promotional banner image
 * @param {String} [props.promotionsbanner.externalurl] - The URL to navigate to when the promotional banner is clicked
 * @param {Object} [props.brandbanner] - Optional brand banner properties
 * @param {String} [props.brandbanner.image] - The external brand banner image
 * @param {String} [props.brandbanner.name] - The name of the brand
 * @param {String} [props.brandbanner.action] - The action to perform when the brand banner is clicked
 * @returns {JSX.Element} - The Search Suggestions component
 * */

export const SearchSuggestions = ({
  suggestions,
  searchvalue,
  onsearchsubmit,
  onsuggestionclick,
  promotionsbanner,
  brandbanner,
}) => (
  <div className="tw:h-full">
    <ul className="tw:max-h-[calc(100svh-260px)] tw:overflow-y-auto tw:py-2 tw:lg:max-h-[400px]">
      <>
        {brandbanner && (
          <li
            key="brand-banner"
            className="tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:gap-2 tw:rounded-[20px] tw:bg-secondary-1000 tw:p-3 tw:transition-colors tw:hover:bg-grey-100"
            onClick={() => brandbanner.action()}
          >
            <div className="tw:flex tw:w-full tw:items-center">
              <img
                src={brandbanner.image}
                alt={brandbanner.name}
                className="tw:h-15 tw:w-15 tw:rounded-xl tw:object-contain"
              />

              <div className="tw:ml-4">
                <Typography domtype="h6" classname="tw:font-medium">
                  {brandbanner.name}
                </Typography>
                <p>View all productss</p>
              </div>
            </div>

            <Button
              variant="secondary"
              classname="tw:h-6 tw:w-6"
              iconleft={<Icons.chevronRight classname="tw:h-4 tw:w-4" />}
              onClick={() => brandbanner.action()}
            />
          </li>
        )}
      </>
      {suggestions &&
        suggestions.map((suggestion, index) => (
          <>
            <li
              key={index}
              className="tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:gap-2 tw:py-3 tw:pr-2 tw:pl-2 tw:text-primary tw:transition-colors tw:hover:bg-grey-100 tw:lg:pl-2"
              onClick={() => onsuggestionclick(suggestion)}
            >
              <div className="tw:hover:bg-grey-10 tw:space-between tw:flex tw:w-full tw:cursor-pointer tw:items-start tw:gap-4 tw:transition-colors tw:lg:px-4">
                <div className="tw:flex tw:flex-1 tw:items-center">
                  <div className="tw:relative tw:h-12 tw:w-12 tw:flex-shrink-0">
                    <img
                      src={suggestion.image}
                      alt={suggestion.name}
                      className="tw:h-full tw:w-full tw:object-contain"
                    />
                  </div>
                  <div className="tw:ml-4 tw:flex-1">
                    <h3
                      className="tw:text-base tw:text-balance tw:text-black"
                      dangerouslySetInnerHTML={{
                        __html: suggestion.highlightedName,
                      }}
                    ></h3>
                    {suggestion.pkg && (
                      <p className="tw:text-sm tw:text-grey-600">
                        {suggestion.pkg}
                      </p>
                    )}
                  </div>
                </div>
                <div className="tw:flex-shrink-0 tw:text-right">
                  <p className="tw:text-lg tw:text-black">
                    {formatCurrency(suggestion.price)}
                  </p>
                  {suggestion.rrp && (
                    <p className="tw:text-sm tw:text-grey-600">
                      RRP: {formatCurrency(suggestion.rrp)}
                    </p>
                  )}
                </div>
              </div>
            </li>
          </>
        ))}
    </ul>

    <div className="tw-border-top-dotted">
      <div className="tw:flex tw:items-center tw:gap-2 tw:py-4 tw:pr-2 tw:pl-2 tw:text-primary tw:lg:pl-4">
        <div className="tw:flex tw:w-full tw:items-center tw:gap-4">
          <Icons.search classname="tw:h-5 tw:w-5" />
          <span className="tw:text-black-1000">
            {searchvalue
              ? `Search all results for '${searchvalue}'`
              : 'Search all results'}
          </span>
        </div>

        <Button
          variant="secondary"
          size="responsive"
          classname="tw:h-6 tw:w-6"
          iconleft={<Icons.chevronRight classname="tw:h-4 tw:w-4" />}
          onclick={() => {
            if (onsearchsubmit) onsearchsubmit(searchvalue);
          }}
        />
      </div>{' '}
      <div className="tw:p-2">
        {promotionsbanner && promotionsbanner.externalimage && (
          <PromotionsBanner
            externalimage={promotionsbanner.externalimage}
            externalimagemobile={promotionsbanner.externalimagemobile}
            externalurl={promotionsbanner.externalurl}
          />
        )}
      </div>
    </div>
  </div>
);
