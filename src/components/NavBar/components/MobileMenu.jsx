import { h, Fragment } from 'preact';
import Button from '../../Button/Button';
import Icons from '../../Icons/Icons';
import { AccountControl } from './AccountControl';
import LoginButton from '../../Login/LoginButton';

/**
 * Mobile Menu Component

 * @description A mobile menu component that displays a list of items in a modal
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isMenuOpen - The state of the mobile menu
 * @param {number} props.activeLevel2Index - The index of the active level 2 menu
 * @param {Array} props.menuItemsList - The list of menu items to display
 * @param {function} props.handleLevel1Click - The function to handle level 1 menu item clicks
 * @param {function} props.handleBackClick - The function to handle back button clicks
 * @param {Object} props.user - The user object
 * @param {function} props.showMobileInternalMenu - The function to show the internal menu
 * @param {Array} props.favorites - The list of favorite items
 * @param {number} props.topOffset - The offset of the top of the navbar
 * @param {boolean} props.hasnotification - Whether there is a notification or not
 * @param {boolean} props.searchwithlist - The state of the search with list feature
 * @param {function} props.onsearchwithlist - The function to call when the search with list button is clicked
 * @param {function} props.setIsSearchOpen - The function to set the mobile search open state
 * @returns {JSX.Element} - The Mobile Menu component
 * */

export const MobileMenu = ({
  isMenuOpen,
  activeLevel2Index,
  menuItemsList,
  handleLevel1Click,
  handleBackClick,
  user,
  showMobileInternalMenu,
  showMobileAccountSwitcher,
  favorites,
  accountmenuitems,
  topOffset,
  hasnotification,
  searchwithlist,
  onsearchwithlist,
  setIsSearchOpen,
}) => {
  const CLASSES = {
    levelOne: {
      container:
        'tw:flex tw:flex-col tw:gap-x-6 tw:text-xl tw:font-medium tw:transition-transform tw:duration-500 tw:flex-1 tw:justify-between',
      menuItem:
        'tw:flex tw:justify-between tw:items-center tw:px-6 tw:py-3 tw:text-xl',
      menuText:
        'tw:text-black-1000 tw:cursor-pointer tw:decoration-primary tw:font-normal tw:underline-offset-8 tw:text-lg tw:lg:whitespace-nowrap ',
    },
    levelTwo: {
      menuSection:
        'tw:font-bold tw:text-xl tw:mb-2 tw:pt-8 tw:cursor-default tw:px-6',
      menuItem: 'tw:px-6 tw:py-3 tw:text-lg tw:font-normal tw:w-full',
      menuText:
        'tw:text-black-1000 tw:cursor-pointer tw:flex tw:justify-between tw:items-center tw:w-full',
    },
    blackBar:
      'tw:mx-auto tw:mt-4 tw:mb-2 tw:w-[139px] tw:h-[5px] tw:bg-black-1000',
  };

  // Helper function to get the current account safely
  const getCurrentAccount = () => {
    if (
      !user ||
      !user.accounts ||
      !Array.isArray(user.accounts) ||
      user.accounts.length === 0
    ) {
      return null;
    }
    const currentAccount = user.accounts.filter((account) => account.current);
    return currentAccount.length > 0 ? currentAccount[0] : null;
  };

  const currentAccount = getCurrentAccount();

  return (
    <div
      style={{
        top: `${topOffset + (hasnotification ? 109 : 60)}px`,
        height: `calc(100% - ${topOffset + (hasnotification ? 109 : 60)}px)`,
      }}
      className={`tw:fixed tw:right-0 tw:w-full tw:transform tw:bg-secondary-1000 tw:transition-transform tw:duration-500 tw:lg:top-0 ${isMenuOpen ? 'tw:translate-x-0' : 'tw:translate-x-full'}`}
      aria-hidden={!isMenuOpen}
      aria-expanded={isMenuOpen}
    >
      {/* Level 1 Menu */}
      <div
        className={`${CLASSES.levelOne.container} ${activeLevel2Index !== null ? 'tw:-translate-x-full' : ''} tw:h-full`}
      >
        <div>
          {menuItemsList.map((item, index) => (
            <div
              key={index}
              className={CLASSES.levelOne.menuItem}
              onClick={() => {
                if (item.action) {
                  if (item.action === 'switch-account') {
                    showMobileAccountSwitcher();
                  } else if (item.action === 'my-account') {
                    showMobileInternalMenu();
                  }
                } else {
                  handleLevel1Click(index, item);
                }
              }}
            >
              <span
                className={`${CLASSES.levelOne.menuText} ${item.active ? 'tw:underline' : ''}`}
              >
                {item.label}
              </span>
              <Icons.chevronRight classname="tw:h-6 tw:w-6" />
            </div>
          ))}
        </div>
        <div className="tw:mb-8 tw:w-full tw:px-4">
          {user ? (
            <div className="tw:p-1">
              <AccountControl user={user} onclick={showMobileInternalMenu} />
            </div>
          ) : (
            <LoginButton classname="tw:w-full" />
          )}
        </div>
      </div>
      {/* Level 2 Menus */}
      {menuItemsList.map(
        (item, index) =>
          item.subMenu && (
            <div
              key={index}
              className={`tw:fixed tw:top-0 tw:right-0 tw:flex tw:h-full tw:w-full tw:transform tw:flex-col tw:overflow-y-auto tw:bg-secondary-1000 tw:transition-transform tw:duration-500 ${activeLevel2Index === index ? 'tw:translate-x-0' : 'tw:translate-x-full'}`}
              aria-hidden={activeLevel2Index !== index}
            >
              <button
                className="tw:flex tw:items-center tw:gap-2 tw:px-6 tw:py-3 tw:text-black-1000"
                onClick={handleBackClick}
                aria-label={`Return to ${item.label} menu`}
              >
                <Icons.chevronLeft classname="tw:h-6 tw:w-6" />
                <span>{item.label}</span>
              </button>
              <div>
                {item.subMenu.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    {section.title && (
                      <div
                        className={CLASSES.levelTwo.menuSection}
                        id={`section-${index}-${sectionIndex}`}
                      >
                        {section.title}
                      </div>
                    )}
                    {/* Search with list functionality for mobile */}
                    {onsearchwithlist && (
                      <div className={CLASSES.levelTwo.menuItem}>
                        <button
                          onClick={() => {
                            window.dispatchEvent(
                              new CustomEvent('openSearchWithList'),
                            );
                            setIsSearchOpen(true);
                          }}
                          className={CLASSES.levelTwo.menuText}
                        >
                          <span>Search with list</span>
                        </button>
                      </div>
                    )}
                    {section.items.map((subItem, subItemIndex) => (
                      <div
                        key={subItemIndex}
                        className={CLASSES.levelTwo.menuItem}
                      >
                        <a
                          href={subItem.href}
                          className={CLASSES.levelTwo.menuText}
                        >
                          <span>{subItem.label}</span>
                          <Icons.chevronRight classname="tw:h-6 tw:w-6" />
                        </a>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {/* Favorites list for authenticated users */}
              {user && favorites?.length > 0 && (
                <div className="tw:flex-1">
                  <div className="tw:mb-6">
                    <div className={CLASSES.levelTwo.menuSection}>Lists</div>
                    {favorites.map((favorite) => (
                      <div
                        key={favorite.id}
                        className={CLASSES.levelTwo.menuItem}
                      >
                        <a
                          href={favorite.href}
                          className={CLASSES.levelTwo.menuText}
                        >
                          <span>{favorite.label}</span>
                          {favorite.count ? (
                            <span className="tw:flex tw:min-w-6 tw:items-center tw:justify-center tw:rounded-full tw:bg-beige-1000 tw:p-1.5 tw:text-xs">
                              {favorite.count}
                            </span>
                          ) : null}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {user && (
                <div className="tw:sticky tw:right-0 tw:bottom-0 tw:left-0 tw:flex tw:w-full tw:flex-col tw:items-stretch tw:bg-secondary-1000 tw:px-2 tw:py-4 tw:shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)]">
                  <Button
                    label="Create new wishlist"
                    variant="secondary"
                    iconleft={
                      <Icons.plus classname="tw:h-4 tw:w-4" stroke="black" />
                    }
                    onclick={() => console.log('Create new wishlist')}
                    classname="tw:w-full"
                  />
                  <div className={CLASSES.blackBar} />
                </div>
              )}
            </div>
          ),
      )}

      {user && (
        <div
          className={`tw:fixed tw:top-0 tw:right-0 tw:flex tw:h-full tw:w-full tw:transform tw:flex-col tw:bg-secondary-1000 tw:transition-transform tw:duration-500 ${activeLevel2Index === 2 ? 'tw:translate-x-0' : 'tw:translate-x-full'}`}
        >
          <button
            className="tw:flex tw:items-center tw:gap-2 tw:px-6 tw:py-3 tw:text-black-1000"
            onClick={handleBackClick}
          >
            <Icons.chevronLeft classname="tw:h-6 tw:w-6" />
            <span>
              Hello {user.title ?? ''} {user.name}
            </span>
          </button>
          <div className="tw:overflow-y-auto">
            <div className="tw:mb-6">
              {accountmenuitems.map((item, index) => (
                <div key={index} className={CLASSES.levelTwo.menuItem}>
                  <a href={item.href} className={CLASSES.levelTwo.menuText}>
                    <span>{item.label}</span>
                    <Icons.chevronRight classname="tw:h-6 tw:w-6" />
                  </a>
                </div>
              ))}
              <hr className="tw:mx-6 tw:mt-3 tw:mb-3 tw:border-t tw:border-dotted" />
              <div className={CLASSES.levelTwo.menuItem}>
                <button
                  className={CLASSES.levelTwo.menuText}
                  onClick={() => console.log('Sign out')}
                >
                  <span>Sign out</span>
                  <Icons.chevronRight classname="tw:h-6 tw:w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {user && (
        <div
          className={`tw:fixed tw:top-0 tw:right-0 tw:flex tw:h-full tw:w-full tw:transform tw:flex-col tw:bg-secondary-1000 tw:transition-transform tw:duration-500 ${activeLevel2Index === 3 ? 'tw:translate-x-0' : 'tw:translate-x-full'}`}
        >
          <button
            className="tw:flex tw:items-center tw:gap-2 tw:px-6 tw:py-3 tw:text-black-1000"
            onClick={handleBackClick}
          >
            <Icons.chevronLeft classname="tw:h-6 tw:w-6" />
            <span>Switch accounts</span>
          </button>
          <div className="tw:overflow-y-auto">
            <div className="tw:mb-6">
              <div className={CLASSES.levelTwo.menuItem}>
                <div className={CLASSES.levelTwo.menuText}>
                  <span className="tw:font-bold">
                    {currentAccount ? currentAccount.name : 'Account'}
                  </span>
                  <span className="tw:text-xs tw:font-bold">
                    {currentAccount ? currentAccount.id : ''}
                  </span>
                </div>
              </div>

              <hr className="tw:mx-6 tw:mt-3 tw:mb-3 tw:border-t tw:border-dotted" />
              {user.accounts && Array.isArray(user.accounts)
                ? user.accounts.map((item) => (
                    <div key={item.id} className={CLASSES.levelTwo.menuItem}>
                      <button className={CLASSES.levelTwo.menuText}>
                        <span>{item.name}</span>
                        <span className="tw:text-xs">{item.id}</span>
                      </button>
                    </div>
                  ))
                : null}

              <div className={CLASSES.levelTwo.menuItem}>
                <a href="#" className={CLASSES.levelTwo.menuText}>
                  <span>Add or remove accounts</span>
                  <Icons.chevronRight classname="tw:h-6 tw:w-6" />
                </a>
              </div>
              <hr className="tw:mx-6 tw:mt-3 tw:mb-3 tw:border-t tw:border-dotted" />
              <div className={CLASSES.levelTwo.menuItem}>
                <button
                  className={CLASSES.levelTwo.menuText}
                  onClick={() => console.log('Sign out')}
                >
                  <span>Sign out</span>
                  <Icons.chevronRight classname="tw:h-6 tw:w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
