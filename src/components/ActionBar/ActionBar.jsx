import { h, Fragment } from 'preact';

/**
 * ActionBar component for displaying actions at the bottom of a page
 * Provides a sticky bar on mobile with title and action buttons
 */
const ActionBar = ({ title, children, classname }) => {
  return (
    <div
      className={`tw:fixed tw:right-0 tw:bottom-0 tw:left-0 tw:z-40 tw:rounded-t-[20px] tw:bg-white tw:p-4 tw:md:static tw:lg:rounded-[20px] ${classname}`}
    >
      <div className="tw:flex tw:flex-col tw:gap-4 tw:lg:mx-auto tw:lg:flex-row tw:lg:items-center tw:lg:justify-between">
        {title ? (
          <div className="tw:mb-4 tw:text-lg tw:font-medium tw:md:mb-0">
            {title}
          </div>
        ) : (
          <div className="tw:hidden tw:md:block"></div>
        )}
        <div className="tw:flex tw:w-full tw:flex-col tw:gap-3 tw:md:ml-auto tw:md:w-auto tw:md:flex-row tw:md:justify-end">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
