import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import PromotionsBanner from '../../PromotionsBanner/PromotionsBanner';
import { SearchSuggestions } from './SearchSuggestions';
import Button from '../../Button/Button';
import Icons from '../../Icons/Icons';
import ProductCard from '../../ProductCard/ProductCard';
import { SearchWithList } from './SearchWithList';
import SearchInput from "../../Form/SearchInput";
import useScanner from "../../../../hooks/useScanner";

/**
 * Mobile Search Component
 *
 * @description The Mobile Search component displays the search input field and search suggestions.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isSearchOpen - The state of the search input field
 * @param {string} props.searchValue - The value of the search input field
 * @param {function} props.handleSearchInputChange - The function to handle search input changes
 * @param {function} props.setIsSearchOpen - The function to set the search input field state
 * @param {Array} props.searchterms - The list of search terms to display
 * @param {boolean} props.searchwithlist - The state of the search with list feature
 * @param {function} props.onsearchwithlist - The function to call when the search with list button is clicked
 * @param {object} props.user - The user object
 * @param {boolean} props.isMobile - The mobile breakpoint state
 * @param {Array} props.searchResults - The search results to display
 * @param {number} props.topOffset - The offset of the top of the navbar
 * @param {Object} [props.promotionsbanner] - Optional promotional banner properties
 * @param {String} [props.promotionsbanner.externalimage] - The external promotional banner image
 * @param {String} [props.promotionsbanner.externalimagemobile] - The mobile version of the external promotional banner image
 * @param {String} [props.promotionsbanner.externalurl] - The URL to navigate to when the promotional banner is clicked
 * @param {boolean} props.barcode - The state of the barcode feature
 * @param {function} props.onbarcodeclick - The function to call when the barcode button is clicked
 * @param {function} [props.onsearchsubmit] - The function to handle search submission
 *
 * @returns {JSX.Element} - The Mobile Search component
 * */

export const MobileSearch = ({
  isSearchOpen,
  searchValue,
  handleSearchInputChange,
  setIsSearchOpen,
  searchterms,
  searchwithlist,
  onsearchwithlist,
  isMobile,
  searchResults,
  topOffset,
  promotionsbanner,
  barcode,
  onbarcodeclick,
  scannedProduct,
  onsearchsubmit,
}) => {
  const [showMobileSuggestions, setShowMobileSuggestions] = useState(false);
  const [scannedCode, setScannedCode] = useState(null);

  const {startScan, stopScan} = useScanner({
    licenseKey: '',
    onScanSuccess: (decodedText) => {
      console.log(`Scanned: ${decodedText}`);
      setScannedCode(decodedText);
    },
  });

  const CLASSES = {
    blackBar:
      'tw:mx-auto tw:mt-4 tw:mb-2 tw:w-[139px] tw:h-[5px] tw:bg-black-1000',
  };

  return (
    <div
      className={`tw:fixed tw:right-0 tw:z-51 tw:h-full tw:w-full tw:transform tw:bg-secondary-1000 tw:transition-transform tw:duration-500 ${isSearchOpen ? 'tw:translate-x-0' : 'tw:translate-x-full'}`}
      style={{top: `${topOffset}px`}}
      aria-hidden={!isSearchOpen}
    >
      <div className="tw:relative tw:flex tw:items-center tw:justify-between tw:gap-2 tw:p-3 tw:py-4">
        <SearchInput
          value={searchValue}
          onChange={handleSearchInputChange}
          onInput={handleSearchInputChange}
          aria-label="Search products"
          onFocus={() => setShowMobileSuggestions(true)}
          barcode={barcode}
          onbarcodeclick={onbarcodeclick}
          placeholder="Search ..."
          classname="tw-search-input tw:flex-1 tw:rounded-3xl tw:border tw:border-white-1000 tw:bg-white-1000 tw:p-2 tw:pl-10 tw:focus:ring-0 tw:focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (onsearchsubmit) onsearchsubmit(searchValue);
            }
          }}
        />
        {/* Old version using input field (causes barcode button to render outside search box */}
        {/*<input*/}
        {/*  type="search"*/}
        {/*  className="tw-search-input tw:flex-1 tw:rounded-3xl tw:border tw:border-white-1000 tw:bg-white-1000 tw:p-2 tw:pl-10 tw:focus:ring-0 tw:focus:outline-none"*/}
        {/*  placeholder="Search..."*/}
        {/*  value={searchValue}*/}
        {/*  onChange={handleSearchInputChange}*/}
        {/*  onInput={handleSearchInputChange}*/}
        {/*  onFocus={() => setShowMobileSuggestions(true)}*/}
        {/*  aria-label="Search products"*/}
        {/*/>*/}
        {/*{barcode && (*/}
        {/*  <button*/}
        {/*    className="tw:ml-auto tw:cursor-pointer"*/}
        {/*    onClick={onbarcodeclick}*/}
        {/*  >*/}
        {/*    <Icons.barcode classname="tw:h-4 tw:w-4" />*/}
        {/*  </button>*/}
        {/*)}*/}
        <Button
          label="Cancel"
          variant="secondary"
          size="small"
          onClick={() => {
            setIsSearchOpen(false);
            setShowMobileSuggestions(false);
          }}
          classname="tw:border-none"
        />
      </div>

      <div className="tw:relative tw:flex">
        <div id="barcode-picker" className="tw:max-w-[320px]"/>
      </div>

      {scannedProduct && (
        <div id="barcode-result" className="tw:max-w-[320px]">
          <ProductCard
            id={scannedProduct.ID}
            name={scannedProduct.Name}
            image={scannedProduct.Image}
            url={scannedProduct.Url}

            // Pricing
            price={scannedProduct.Price}
            pricewithvat={scannedProduct.PriceWithVAT}
            priceperunit={scannedProduct.PricePerUnit}
            pricerpp={scannedProduct.PriceRPP}
            pricepor={scannedProduct.PricePOR}

            // Product tags and info
            tags={scannedProduct.Tags}
            dietaryinfo={scannedProduct.DietaryInfo}
            servings={scannedProduct.Servings}
            storageinfo={scannedProduct.StorageInfo?.[0] ?? null}
            deliveryinfo={scannedProduct.DeliveryInfo}
            butchersnote={scannedProduct.ButchersNote}

            // Availability and stock
            availability={scannedProduct.Availability}

            // Card state and controls
            mode={scannedProduct.Mode ?? 'grid'}
            mobileimagesize="default"
            quantity={scannedProduct.Quantity ?? 1}
            maxquantity={999}

            // Special states
            offer={scannedProduct.Offer}
            hasmessage={scannedProduct.HasMessage}
            selectable={scannedProduct.Selectable}
            wishlist={scannedProduct.WishList}
            addedtowishlist={scannedProduct.AddedToWishList ?? false}

            // Display flags
            isfeaturedproduct={false}
            loggedout={scannedProduct.LoggedOut ?? false}>
          </ProductCard>
        </div>
      )}

      <div className="tw:relative tw:flex tw:h-[calc(100svh-84px)] tw:flex-col tw:justify-between">
        {isMobile && searchwithlist && (
          <SearchWithList
            isMobile={isMobile}
            searchterms={searchterms}
            onsearchwithlist={onsearchwithlist}
          />
        )}
        <div className="tw:p-4">
          <Icons.graphicsSearch classname="tw:h-[97.5px]} tw:w-[96.5px]" />

          <p className="tw:mt-4 tw:text-6xl tw:font-medium tw:text-balance tw:text-primary">
            Search Booker by product name, code or by scanning a bar code...
          </p>
        </div>

        <div className="tw:p-2">
          <PromotionsBanner
            externalimage={
              (promotionsbanner && promotionsbanner.externalimage) ||
              './images/Brand=Heinz.png'
            }
            externalimagemobile={
              promotionsbanner && promotionsbanner.externalimagemobile
            }
            externalurl={
              (promotionsbanner && promotionsbanner.externalurl) ||
              'https://www.booker.co.uk'
            }
          />
          <div className={CLASSES.blackBar}></div>
        </div>

        <div
          className={`tw:absolute tw:left-0 tw:h-full tw:w-full tw:transform tw:bg-secondary-1000 tw:transition-transform tw:duration-500 ${showMobileSuggestions ? 'tw:translate-y-0' : 'tw:top-full tw:translate-y-100'}`}
          aria-hidden={!showMobileSuggestions}
        >
          <SearchSuggestions
            suggestions={searchResults}
            searchvalue={searchValue}
            promotionsbanner={promotionsbanner}
            onsearchsubmit={onsearchsubmit}
          />
        </div>
      </div>
    </div>
  );
};
