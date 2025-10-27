import { h, Fragment } from 'preact';
import { useMediaQuery } from '../../../../utils/helpers';

/**
 * QuoteGraphic component renders a quote with its author and location.
 * It dynamically adjusts the image and content position based on the screen size and position prop.
 *
 * @param {Object} props - The component props.
 * @param {string} props.quote - The quote to be displayed.
 * @param {string} props.author - The author of the quote.
 * @param {string} props.location - The location associated with the quote.
 * @param {string} props.position='left' - The position of the content relative to the image. Can be 'left', 'center', or 'right'.

 *
 * @returns {JSX.Element} The QuoteGraphic component.
 */

export const QuoteGraphic = ({
  quote,
  author,
  location,
  position = 'left',
  image,
  imagemobile = image,
}) => {
  const isMobile = useMediaQuery('(max-width: 1023px)');

  /**
   * Renders the content of the quote, including the quote itself, author, and location.
   *
   * @returns {JSX.Element} The content of the quote.
   */
  const renderContent = () => (
    <>
      <p className="tw:mb-4 tw:text-3xl tw:leading-[120%] tw:text-primary">
        {quote}
      </p>
      <div className="tw:flex tw:flex-col tw:text-sm">
        <span>{author}</span>
        <span>{location}</span>
      </div>
    </>
  );

  return (
    <div className="tw:relative tw:h-[544px] tw:w-[300px] tw:lg:h-[585px] tw:lg:w-[416px]">
      {position === 'left' && (
        <>
          <img src={isMobile ? imagemobile : image} alt={`${author}'s quote`} />
          <div className="tw:absolute tw:top-12 tw:left-12 tw:max-w-[216px]">
            {renderContent()}
          </div>
        </>
      )}

      {position === 'center' && (
        <>
          <img src={isMobile ? imagemobile : image} alt={`${author}'s quote`} />
          <div className="tw:absolute tw:top-[18px] tw:left-12 tw:max-w-[200px] tw:lg:top-6.5">
            {renderContent()}
          </div>
        </>
      )}

      {position === 'right' && (
        <>
          <img src={isMobile ? imagemobile : image} alt={`${author}'s quote`} />
          <div className="tw:absolute tw:top-[50px] tw:right-12 tw:max-w-[216px]">
            {renderContent()}
          </div>
        </>
      )}
    </div>
  );
};
