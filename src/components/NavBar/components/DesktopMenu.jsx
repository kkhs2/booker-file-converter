import { h, Fragment } from 'preact';
import { AccountControl } from './AccountControl';
import LoginButton from '../../Login/LoginButton';

/**
 * Desktop Menu Component
 *
 * @description The DesktopMenu component displays the navigation menu for desktop users.
 *
 * @param {Object} props - The props object.
 * @param {Array} props.menuitems - The list of menu items to display.
 * @param {Object} props.user - The user object.
 * @param {Function} props.togglePopup - The function to toggle the popup menu.
 * @returns {JSX.Element} - The DesktopMenu component
 * */

export const DesktopMenu = ({ menuitems, user, togglePopup }) => (
  <div className="tw:ml-3 tw:hidden tw:items-center tw:justify-center tw:gap-8 tw:lg:flex">
    <div className="tw:flex tw:flex-1 tw:flex-col tw:justify-between tw:gap-x-6 tw:text-xl tw:font-medium tw:transition-transform tw:duration-500 tw:lg:mt-0 tw:lg:flex-row">
      {menuitems.map((item, index) => (
        <div
          key={index}
          className="tw:flex tw:items-center tw:justify-between tw:px-6 tw:py-3 tw:text-xl tw:lg:p-0"
          onClick={() =>
            item.subMenu?.length && togglePopup(true, item.subMenu)
          }
        >
          {item.subMenu?.length ? (
            <span
              className={`tw:cursor-pointer tw:text-lg tw:font-normal tw:text-black-1000 tw:decoration-primary tw:underline-offset-8 tw:lg:whitespace-nowrap tw:lg:hover:underline ${item.active ? 'tw:underline' : ''}`}
            >
              {item.label}
            </span>
          ) : (
            <a
              href={item.href || '#'}
              className={`tw:cursor-pointer tw:text-lg tw:font-normal tw:text-black-1000 tw:decoration-primary tw:underline-offset-8 tw:lg:whitespace-nowrap tw:lg:hover:underline ${item.active ? 'tw:underline' : ''}`}
            >
              {item.label}
            </a>
          )}
        </div>
      ))}
    </div>

    {user ? <AccountControl user={user} /> : <LoginButton />}
  </div>
);
