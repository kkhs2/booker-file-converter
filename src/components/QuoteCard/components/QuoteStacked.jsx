import { h, Fragment } from 'preact';
import Icons from '../../Icons/Icons';

/**
 * QuoteStacked component
 *
 * @description Renders a stacked quote with an image of the author
 * @param {Object} props - The props of the component
 * @param {string} props.quote - The quote to be displayed
 * @param {string} props.author - The author of the quote
 * @param {string} props.location - The location of the author
 * @param {string} props.image - The image of the author
 * @returns {JSX.Element} - The QuoteStacked component
 */

export const QuoteStacked = ({ quote, author, location, image }) => {
  return (
    <div className="tw:flex tw:max-w-[300px] tw:flex-col tw:items-center tw:justify-center tw:lg:max-w-[384px]">
      <div className="tw:relative tw:mb-4 tw:flex tw:flex-col tw:rounded-[20px] tw:border-[1.5px] tw:border-black tw:bg-secondary-1000 tw:p-3 tw:text-sm tw:lg:p-4">
        <div className="tw:mb-3 tw:flex tw:items-center tw:gap-3 tw:lg:gap-4">
          <Icons.quoteLarge className="tw:flex-shrink-0" />
          <div className="tw:flex tw:h-full tw:w-full tw:flex-col tw:rounded-lg tw:bg-beige-1000 tw:px-3 tw:py-2.5 tw:lg:px-4">
            <span className="tw:text-lg tw:lg:text-xl">{author}</span>
            <span className="tw:text-sm tw:font-light tw:lg:text-base">
              {location}
            </span>
          </div>
        </div>

        <p className="tw:m-3 tw:text-xl tw:leading-[120%] tw:font-light tw:lg:text-3xl">
          {quote}
        </p>

        {/* quote corner */}
        <svg
          width="22"
          height="35"
          viewBox="0 0 22 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="tw:absolute tw:right-[-1.5px] tw:bottom-[-16px]"
        >
          <path
            d="M21 3V18.25V33.5L1.5 19.5"
            stroke="black"
            stroke-width="1.5"
          />
          <path d="M20.5 32L0 17.5L20.5 0V32Z" fill="#FAF9F5" />
        </svg>
      </div>

      {image && (
        <img
          src={image}
          alt={`${author}'s quote`}
          className="tw:mt-2.5 tw:h-[360px] tw:w-full tw:rounded-xl tw:object-cover tw:lg:h-[363px]"
        />
      )}
    </div>
  );
};
