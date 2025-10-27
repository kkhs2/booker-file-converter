import { h, Fragment } from 'preact';
import Button from '../../Button/Button';
import Icons from '../../Icons/Icons';
import { cn } from '../../../../utils/helpers';

/**
 * Popup Menu Component
 *
 * @description A popup menu component that displays a list of items in a modal

 * @param {Object} props - Component props
 * @param {boolean} props.isPopupVisible - The state of the popup menu
 * @param {function} props.togglePopup - The function to toggle the popup menu
 * @param {Array} props.activePopupContent - The content to display in the popup menu
 * @returns {JSX.Element} - The PopupMenu component
 */

export const PopupMenu = ({
  isPopupVisible,
  togglePopup,
  activePopupContent,
}) => (
  <Fragment>
    <div
      className={cn(
        'tw:bg-opacity-50 tw:fixed tw:inset-0 tw:z-60 tw:bg-black-300 tw:transition-opacity tw:duration-500',
        isPopupVisible
          ? 'tw:visible tw:opacity-100'
          : 'tw:invisible tw:opacity-0',
      )}
      onClick={() => togglePopup(false)}
      aria-hidden={!isPopupVisible}
    />
    <div
      className={cn(
        'tw-container tw:fixed tw:top-22 tw:left-1/2 tw:z-[60] tw:w-full tw:-translate-x-1/2 tw:transform',
        isPopupVisible
          ? 'tw:visible tw:scale-100 tw:opacity-100'
          : 'tw:invisible tw:scale-90 tw:opacity-0',
      )}
      aria-hidden={!isPopupVisible}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-menu-title"
    >
      <div className="tw-hide-scrollbar tw:relative tw:overflow-y-auto tw:rounded-[20px] tw:bg-secondary-1000 tw:py-8 tw:shadow-lg tw:transition-opacity tw:duration-500 tw:xl:max-h-[80svh]">
        {isPopupVisible && (
          <Button
            variant="secondary"
            size="small"
            iconleft={<Icons.x classname="tw:h-4 tw:w-4" />}
            onClick={() => togglePopup(false)}
            classname="tw:absolute tw:top-2 tw:right-2"
            aria-label="Close menu"
          />
        )}
        <div className="tw:flex tw:gap-8">
          {activePopupContent?.map((section, index) => (
            <div key={index}>
              <div
                className="tw:mb-2 tw:cursor-default tw:px-6 tw:pt-8 tw:text-xl tw:font-bold tw:lg:px-8 tw:lg:pt-0 tw:lg:pb-6"
                id={`popup-section-${index}`}
              >
                {section.title}
              </div>
              <ul
                className="tw:mb-6 tw:flex-col tw:flex-wrap tw:pl-4 tw:lg:mb-0"
                role="menu"
                aria-labelledby={`popup-section-${index}`}
              >
                {section.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="tw:px-6 tw:py-3 tw:text-lg tw:font-normal tw:lg:w-[224px] tw:lg:rounded-full tw:lg:p-4 tw:lg:hover:bg-black-100"
                    role="menuitem"
                  >
                    <a
                      href={item.href}
                      className="tw:flex tw:cursor-pointer tw:items-center tw:justify-between tw:text-black-1000"
                    >
                      <span>{item.label}</span>
                      <Icons.chevronRight classname="tw:h-5 tw:w-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Fragment>
);
