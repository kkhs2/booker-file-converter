import { h, Fragment } from 'preact';
import {
  QuoteStacked,
  QuoteGraphic,
  QuoteArticle,
  QuoteSimple,
} from './components';

/**
 * Quote Card Component
 *
 * Component used to display a testimonial or quote.
 *
 * @param {Object} props - Component props
 * @param {'graphic'| 'single' | 'simple' | 'stacked'} props.variant - The variant of the quote card
 * @param {string} props.position - The position of card if variant is 'graphic'
 * @param {string} props.image - The image to display with the quote
 * @param {string} props.imagemobile - The mobile image to display with the quote
 * @param {string} props.imagebackground - The background image to display with the quote
 * @param {string} props.quote - The quote text
 * @param {string} props.author - The author of the quote
 * @param {string} props.location - The location of the author
 * @param {string} [props.icon] - An optional icon to display with the quote
 * @param {Object} [props.article] - The article object
 * @param {string} [props.classname] - Additional classes to add to the component
 *
 * @returns {JSX.Element} Preact component - The QuoteCard component
 */

const QuoteCard = ({
  variant,
  position,
  image,
  imagemobile,
  imagebackground,
  quote,
  author,
  location,
  icon,
  article,
  classname,
  ...props
}) => {
  return (
    <div {...props} className={classname}>
      {variant === 'graphic' && (
        <QuoteGraphic
          quote={quote}
          author={author}
          location={location}
          position={position}
          image={image}
          imagemobile={imagemobile}
        />
      )}
      {variant === 'stacked' && (
        <QuoteStacked
          quote={quote}
          author={author}
          location={location}
          image={image}
        />
      )}
      {variant === 'article' && (
        <QuoteArticle
          quote={quote}
          author={author}
          location={location}
          article={article}
          image={image}
        />
      )}
      {variant === 'simple' && (
        <QuoteSimple
          quote={quote}
          author={author}
          location={location}
          article={article}
          image={image}
          imagebackground={imagebackground}
        />
      )}
    </div>
  );
};

export default QuoteCard;
