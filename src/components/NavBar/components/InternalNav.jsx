import { h, Fragment } from 'preact';
import { createPortal } from 'preact/compat';
import { cn } from '../../../../utils/helpers';
import Icons from '../../Icons/Icons';
import { useState, useEffect, useRef } from 'preact/hooks';
import { useClickOutside } from '../../../../utils';
import { DeliveryTabs } from './DeliveryTabs';
import Button from '../../Button/Button';

/**
 * InternalNav
 * @description Displays the internal navigation menu and delivery options.
 * @param {Object} props - The props object.
 * @param {Array} props.menuitems - The menu items to display.
 * @param {Array} props.favorites - The user\'s favorite items.
 * @param {Object} props.deliverytab - The delivery tab details.
 * @param {boolean} props.hasnotification - Whether there is a notification or not.
 * @param {boolean} props.sticky - Whether the navigation should be sticky.
 * @param {string} props.classname - Additional classes to add to the component.
 * @returns {JSX.Element} - The InternalNav component
 * */

export const InternalNav = ({
  menuitems,
  favorites,
  deliverytab,
  hasnotification,
  sticky,
  classname,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useClickOutside(() => {
    setShowDropdown(false);
  }, showDropdown);

  const portalContainerRef = useRef(null);
  const triggerRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const portalDiv = document.createElement('div');
    document.body.appendChild(portalDiv);
    portalContainerRef.current = portalDiv;

    return () => {
      if (portalContainerRef.current) {
        document.body.removeChild(portalContainerRef.current);
        portalContainerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (showDropdown) {
      document.body.classList.add('tw-no-body-scroll');
    } else {
      document.body.classList.remove('tw-no-body-scroll');
    }
    // Cleanup function to remove the class if the component unmounts while dropdown is open
    return () => {
      document.body.classList.remove('tw-no-body-scroll');
    };
  }, [showDropdown]);

  const toggleDropdown = () => {
    const newShowState = !showDropdown;
    if (newShowState && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setShowDropdown(newShowState);
  };

  return (
    <>
      <div
        className={cn(
          'tw:-mt-1',
          hasnotification && !sticky && 'tw:mt-35',
          hasnotification && sticky && 'tw:mt-10',
          sticky &&
            'tw:fixed tw:right-0 tw:left-0 tw:z-50 tw:w-full tw:bg-secondary-1000 tw:pb-2',
          classname,
        )}
      >
        <div className={cn(sticky && 'tw-container')}>
          <nav className="tw:relative tw:flex tw:items-center tw:justify-between tw:rounded-[20px] tw:bg-white tw:py-4 tw:pr-6 tw:pl-3 tw:shadow-[4px_4px_10px_0_rgba(0,0,0,0.03)]">
            <ul className="tw:flex tw:items-center tw:gap-5 tw:px-4">
              {menuitems.map((item) => (
                <li
                  className="tw:flex tw:items-center tw:justify-between tw:px-6 tw:py-3 tw:text-xl tw:lg:p-0"
                  key={item.label}
                >
                  {item.subMenu?.length ? (
                    <div
                      ref={triggerRef}
                      className="tw-underline-fade tw-underline-fade-primary tw:relative tw:flex tw:cursor-pointer tw:items-center tw:p-0"
                      onClick={toggleDropdown}
                    >
                      <span
                        className={`tw:text-lg tw:font-normal tw:text-black-1000 tw:lg:whitespace-nowrap ${item.active ? 'tw:underline' : ''}`}
                      >
                        {item.label}
                      </span>

                      <Icons.chevronRight classname="tw:rotate-90 tw:ml-2 tw:w-4 tw:h-4 tw:text-black " />

                      {showDropdown &&
                        portalContainerRef.current &&
                        createPortal(
                          <div
                            className="tw:z-[999] tw:max-h-[510px] tw:w-[320px] tw:overflow-y-scroll tw:rounded-lg tw:bg-white tw:pt-3"
                            style={{
                              position: 'absolute',
                              top: `${dropdownPosition.top + 8}px`,
                              left: `${dropdownPosition.left}px`,
                              boxShadow:
                                '-1px -1px 4px 4px rgba(0, 0, 0, 0.02), 6px 10px 24px 0px rgba(0, 0, 0, 0.30)',
                            }}
                            ref={dropdownRef}
                          >
                            {/* user account details */}
                            <div>
                              <span
                                className="tw:flex tw:cursor-pointer tw:items-center tw:justify-between tw:p-3 tw:text-base tw:text-black tw:hover:bg-grey-200"
                                onClick={() => {
                                  setShowDropdown(false);
                                  window.dispatchEvent(
                                    new CustomEvent('openSearchWithList'),
                                  );
                                }}
                              >
                                Search with list
                              </span>
                              {item.subMenu[0]?.items.map((subItem) => (
                                <Fragment key={subItem.label}>
                                  <a
                                    href={subItem.href || '#'}
                                    className="tw:flex tw:items-center tw:justify-between tw:p-3 tw:hover:bg-grey-200"
                                  >
                                    <span className="tw:text-base tw:text-black">
                                      {subItem.label}
                                    </span>
                                  </a>
                                </Fragment>
                              ))}
                            </div>

                            <div>
                              {/* favorites */}
                              <div className="tw:mt-4 tw:mb-2 tw:flex tw:items-center tw:justify-between tw:border-b tw:border-grey-200 tw:px-3 tw:pb-3">
                                <span className="tw:text-base tw:font-bold tw:text-grey-900">
                                  Favorites
                                </span>
                              </div>
                              <a
                                className="tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:justify-between tw:p-3 tw:px-3 tw:py-2 tw:hover:bg-grey-200"
                                href="/favorites"
                              >
                                <span className="tw:text-base tw:text-black">
                                  Manage my lists
                                </span>
                              </a>
                            </div>

                            <div>
                              {favorites.map((favorite) => (
                                <a
                                  href={favorite.id}
                                  key={favorite.id} // Added key here
                                  className="tw:flex tw:items-center tw:justify-between tw:p-3 tw:hover:bg-grey-200"
                                >
                                  <span className="tw:text-base tw:text-black">
                                    {favorite.label}
                                  </span>

                                  {favorite.count ? (
                                    <span className="tw:flex tw:min-w-6 tw:items-center tw:justify-center tw:rounded-full tw:bg-beige-1000 tw:p-1.5 tw:text-xs">
                                      {favorite.count}
                                    </span>
                                  ) : null}
                                </a>
                              ))}
                            </div>
                            <div className="tw:sticky tw:bottom-0 tw:w-full tw:bg-white">
                              <div className="tw:flex tw:flex-col tw:items-stretch tw:px-2 tw:py-4 tw:shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)]">
                                <Button
                                  label="Create new wishlist"
                                  variant="secondary"
                                  iconleft={
                                    <Icons.plus
                                      classname="tw:h-4 tw:w-4"
                                      stroke="black"
                                    />
                                  }
                                  onclick={() =>
                                    console.log('Create new wishlist')
                                  }
                                  classname="tw:w-full"
                                />
                              </div>
                            </div>
                          </div>,
                          portalContainerRef.current,
                        )}
                    </div>
                  ) : (
                    <a
                      href={item.href || '#'}
                      className={cn(
                        'tw:cursor-pointer tw:p-0 tw:text-lg tw:font-normal tw:text-black-1000 tw:lg:whitespace-nowrap',
                        item.active
                          ? 'tw:underline tw:decoration-primary tw:underline-offset-[12px]'
                          : 'tw-underline-fade tw-underline-fade-primary',
                      )}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            <DeliveryTabs {...deliverytab} />
          </nav>
        </div>
      </div>
      {/* Spacer div to push content below when navbar is fixed */}
      {sticky && (
        <div
          className={cn('tw:h-[94px]', hasnotification && 'tw:h-[138px]')}
          aria-hidden="true"
        />
      )}
    </>
  );
};
