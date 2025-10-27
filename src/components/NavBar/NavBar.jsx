import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import { useState, useEffect, useCallback } from 'preact/hooks';
import Icons from '../Icons/Icons';
import Logo from '../Logo';

import { useMediaQuery } from '../../../utils/helpers';
import { InternalNav } from './components/InternalNav';

// Extracted components for better organization
import { DesktopMenu } from './components/DesktopMenu';
import { MobileMenu } from './components/MobileMenu';
import { SearchBar } from './components/SearchBar';
import { MobileSearch } from './components/MobileSearch';
import { PopupMenu } from './components/PopupMenu';
import { DeliveryTabs } from './components/DeliveryTabs';
import { useClickOutside } from '../../../utils';

/**
 * NavBar Component
 * @param {Object} props - The component props
 * @param {Array} props.menuitems - The list of menu items to display
 * @param {Array} props.searchresultslist - The list of search results
 * @param {Object} props.user - The user object with user details if logged in
 * @param {string} props.classname - Additional classes to add to the component
 * @param {Array} props.internalmenuitems - The list of internal menu items if user is logged in
 * @param {string} props.searchterms - The search terms to display in the search bar
 * @param {boolean} props.searchwithlist - The state of the search with list feature
 * @param {function} props.onsearchwithlist - The function to call when the search with list button is clicked
 * @param {Array} props.favorites - The list of favorite items
 * @param {Array} props.accountmenuitems - The list of account menu items
 * @param {Object} props.deliverytab - The delivery tab details
 * @param {number} props.topOffset - The offset of the top of the navbar
 * @param {function} props.onsearchinputchange - The function to call when the search input changes
 * @param {function} props.onsearchsubmit - The function to call when the search is submitted
 * @param {function} props.onsuggestionselect - The function to call when a suggestion is selected
 * @param {Object} [props.promotionsbanner] - Optional promotional banner properties
 * @param {String} [props.promotionsbanner.externalimage] - The external promotional banner image
 * @param {String} [props.promotionsbanner.externalimagemobile] - The mobile version of the external promotional banner image
 * @param {String} [props.promotionsbanner.externalurl] - The URL to navigate to when the promotional banner is clicked
 * @param {boolean} [props.hasnotification] - Whether there is a notification or not
 * @param {boolean} [props.logourl] - The URL to navigate to when the logo is clicked
 * @param {boolean} [props.hideinternalnav] - Whether to hide the internal navigation or not
 * @param {string} [props.logourl] - The URL to navigate to when the logo is clicked
 * @param {bool} [props.barcode] - Whether to display the barcode in the search bar or not
 * @param {function} [props.onbarcodeclick] - The function to call when the barcode button is clicked
 * @param {Object} [props.scannedProduct] - The barcode scanned product details
 * @returns {JSX.Element} - The NavBar component
 * */

const NavBar = ({
  menuitems = [],
  searchresultslist = [],
  user,
  classname,
  internalmenuitems = [],
  searchterms,
  searchwithlist,
  onsearchwithlist,
  favorites = [],
  accountmenuitems = [],
  deliverytab,
  topOffset = 0,
  onsearchinputchange,
  onsearchsubmit,
  onsuggestionselect,
  promotionsbanner,
  brandbanner,
  hasnotification,
  hideinternalnav = false,
  stickyinternalnav = false,
  logourl = '/',
  barcode,
  onbarcodeclick,
  scannedProduct = null,
  ...props
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeLevel2Index, setActiveLevel2Index] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [isSearchSuggestionsVisible, setIsSearchSuggestionsVisible] =
    useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [activePopupContent, setActivePopupContent] = useState(null);

  const isMobile = useMediaQuery('(max-width: 1023px)');

  const navRef = useClickOutside(() => {
    setIsSearchSuggestionsVisible(false);
  }, isSearchSuggestionsVisible);

  const filterSearchResults = useCallback(
    (query) => {
      if (!query) {
        setSearchResults([]);
        return;
      }

      const filteredResults = searchresultslist.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()),
      );

      // Highlight search results in the product name
      const highlightedResults = filteredResults.map((result) => {
        const regex = new RegExp(`(${query})`, 'gi');
        const highlightedName = result.name.replace(
          regex,
          "<span class='tw:font-bold'>$1</span>",
        );
        return { ...result, highlightedName };
      });

      setSearchResults(highlightedResults);
    },
    [searchresultslist],
  );

  // Update search results on search value change
  useEffect(() => {
    setIsSearchSuggestionsVisible(Boolean(searchValue));
    filterSearchResults(searchValue);
  }, [searchValue, filterSearchResults]);

  // Close menu when search is open
  useEffect(() => {
    if (isSearchOpen) {
      setIsMenuOpen(false);
      setActiveLevel2Index(null); // Reset to level 0
    }
  }, [isSearchOpen]);

  // Block page scroll when mobile menu is open
  useEffect(() => {
    if ((isMobile && isMenuOpen) || isSearchOpen) {
      const originalOverflow = document.body.style.overflow;

      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobile, isMenuOpen, isSearchOpen]);

  // Listen for custom event to close mobile search
  useEffect(() => {
    const handleCloseMobileSearch = (event) => {
      if (event.detail?.source === 'MobileScanner') {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('closeMobileSearch', handleCloseMobileSearch);

    return () => {
      document.removeEventListener(
        'closeMobileSearch',
        handleCloseMobileSearch,
      );
    };
  }, []);

  const handleLevel1Click = (index, item) => {
    if (item.subMenu?.length) {
      setActiveLevel2Index(index);
    }
  };

  const handleBackClick = () => {
    setActiveLevel2Index(null);
  };

  const handleSearchInputChange = async (event) => {
    setSearchValue(event.target.value || '');

    if (typeof onsearchinputchange === 'function') {
      onsearchinputchange(event);
    }
  };

  // Handle search submission with consistent parameter passing
  const handleSearchSubmit = (value) => {
    setIsSearchSuggestionsVisible(false);
    if (typeof onsearchsubmit === 'function') {
      onsearchsubmit(value || searchValue);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion) => {
    setIsSearchSuggestionsVisible(false);
    if (typeof onsuggestionselect === 'function') {
      onsuggestionselect(suggestion);
    }
  };

  const handleSearchFocus = () => {
    if (searchValue) {
      setIsSearchSuggestionsVisible(true);
    }
  };

  const togglePopup = (show, content = null) => {
    setIsPopupVisible(show);
    setActivePopupContent(content);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setActiveLevel2Index(null);
  };

  const showMobileInternalMenu = () => {
    setIsMenuOpen(true);
    setActiveLevel2Index(2);
  };

  const showMobileAccountSwitcher = () => {
    setIsMenuOpen(true);
    setActiveLevel2Index(3);
  };

  const clearSearch = () => {
    setSearchValue('');
  };

  // Combine menu items for mobile view when user is logged in
  const menuItemsList =
    user && isMobile ? [...menuitems, ...(internalmenuitems || [])] : menuitems;

  return (
    <div className="tw:relative tw:w-full tw:bg-secondary-1000 tw:max-lg:mb-4">
      <nav
        ref={navRef}
        className={cn(
          'tw:fixed tw:top-0 tw:right-0 tw:left-0 tw:z-51 tw:bg-secondary-1000',
          classname,
          hasnotification && 'tw:mt-[49px] tw:lg:mt-[45px]',
        )}
        style={{ top: `${topOffset}px` }}
        aria-label="Main navigation"
        {...props}
      >
        <div className="tw-container tw:flex tw:items-center tw:justify-between tw:py-4 tw:lg:justify-normal tw:lg:py-6">
          {/* Logo */}
          <a href={logourl}>
            <Logo
              classname="tw:h-[18px] tw:w-[108px] tw:text-primary tw:lg:mr-8 tw:lg:h-[30px] tw:lg:w-[177px]"
              aria-label="Company Logo"
            />
          </a>

          {/* Desktop Search */}
          <SearchBar
            searchValue={searchValue}
            onsearchchange={handleSearchInputChange}
            onsearchsubmit={handleSearchSubmit}
            onsuggestionclick={handleSuggestionSelect}
            onsearchfocus={handleSearchFocus}
            clearSearch={clearSearch}
            searchterms={searchterms}
            searchwithlist={searchwithlist}
            onsearchwithlist={onsearchwithlist}
            issearchsuggestionsvisible={isSearchSuggestionsVisible}
            searchResults={searchResults}
            promotionsbanner={promotionsbanner}
            brandbanner={brandbanner}
          />

          <div className="tw:flex tw:gap-4 tw:lg:ml-auto">
            <button
              className="tw:p-1 tw:lg:hidden"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
            >
              <Icons.search classname="tw:h-[20px] tw:w-[20px] tw:cursor-pointer" />
            </button>
            <button
              className="tw:p-1 tw:lg:hidden"
              onClick={handleCloseMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <Icons.x classname="tw:h-5 tw:w-5 tw:cursor-pointer" />
              ) : (
                <Icons.menu classname="tw:h-5 tw:w-5 tw:cursor-pointer" />
              )}
            </button>

            {/* Desktop Menu */}
            <DesktopMenu
              menuitems={menuitems}
              user={user}
              togglePopup={togglePopup}
            />
          </div>

          {/* Mobile Menu */}
          <MobileMenu
            isMenuOpen={isMenuOpen}
            activeLevel2Index={activeLevel2Index}
            menuItemsList={menuItemsList}
            handleLevel1Click={handleLevel1Click}
            handleBackClick={handleBackClick}
            user={user}
            showMobileInternalMenu={showMobileInternalMenu}
            favorites={favorites}
            accountmenuitems={accountmenuitems}
            showMobileAccountSwitcher={showMobileAccountSwitcher}
            topOffset={topOffset}
            hasnotification={hasnotification}
            searchwithlist={searchwithlist}
            onsearchwithlist={onsearchwithlist}
            setIsSearchOpen={setIsSearchOpen}
          />

          {/* Popup Menu */}
          <PopupMenu
            isPopupVisible={isPopupVisible}
            togglePopup={togglePopup}
            activePopupContent={activePopupContent}
          />

          {/* Mobile Search Screen */}
          <MobileSearch
            isSearchOpen={isSearchOpen}
            searchValue={searchValue}
            handleSearchInputChange={handleSearchInputChange}
            setIsSearchOpen={setIsSearchOpen}
            searchterms={searchterms}
            searchwithlist={searchwithlist}
            onsearchwithlist={onsearchwithlist}
            isMobile={isMobile}
            searchResults={searchResults}
            topOffset={hasnotification ? topOffset + 49 : topOffset}
            promotionsbanner={promotionsbanner}
            barcode={barcode}
            onbarcodeclick={onbarcodeclick}
            // scannedProduct={scannedProduct}
          />
        </div>
      </nav>
      {/* Internal Nav for Desktop */}
      {user && internalmenuitems && !isMobile && !hideinternalnav && (
        <InternalNav
          menuitems={internalmenuitems}
          favorites={favorites}
          deliverytab={deliverytab}
          hasnotification={hasnotification}
          sticky={stickyinternalnav}
          classname={classname}
        />
      )}

      {/* Delivery tabs */}
      {user && deliverytab && isMobile && !hideinternalnav && (
        <div>
          <DeliveryTabs {...deliverytab} hasnotification={hasnotification} />
        </div>
      )}
    </div>
  );
};

export default NavBar;
