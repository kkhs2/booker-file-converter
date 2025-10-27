/**
 * @description StarRating component renders a star-based rating input with customizable labels.
 *
 * @param {Object} props - Component props.
 * @param {number} [props.value=0] - The current rating value (0-5).
 * @param {function} [props.onchange] - Callback fired when the rating changes.
 * @param {number} [props.maxrating=5] - Maximum number of stars to display.
 * @param {string} [props.label=''] - Label text to display above the rating.
 * @param {Array<string>} [props.ratinglabels] - Array of labels for each rating value.
 * @param {boolean} [props.disabled=false] - Whether the rating is disabled.
 * @param {boolean} [props.readonly=false] - Whether the rating is read-only.
 * @param {string} [props.classname=''] - Additional class names for the root element.
 *
 * @returns {JSX.Element} The rendered StarRating component.
 */

import { h } from 'preact';
import { useState } from 'preact/hooks';
import { cn } from '../../../utils/helpers';
import Typography from '../Typography/Typography';
import Icons from '../Icons/Icons';

const StarRating = ({
  value = 0,
  onchange,
  maxrating = 5,
  label = '',
  ratinglabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
  disabled = false,
  readonly = false,
  classname = '',
}) => {
  const [hoverValue, setHoverValue] = useState(0);

  const handleStarClick = (rating) => {
    if (disabled || readonly) return;
    if (onchange) {
      onchange(rating);
    }
  };

  const handleStarHover = (rating) => {
    if (disabled || readonly) return;
    setHoverValue(rating);
  };

  const handleMouseLeave = () => {
    if (disabled || readonly) return;
    setHoverValue(0);
  };

  const currentRating = hoverValue || value;
  const displayLabel = ratinglabels[currentRating] || '';

  return (
    <div className={cn('tw:flex tw:flex-col tw:gap-3', classname)}>
      {label && <Typography>{label}</Typography>}

      <div className="tw:flex tw:flex-col tw:gap-2">
        <div
          className="tw:flex tw:items-center tw:gap-2"
          onMouseLeave={handleMouseLeave}
        >
          {Array.from({ length: maxrating }, (_, index) => {
            const starValue = index + 1;
            const isFilled = starValue <= currentRating;

            return (
              <button
                key={starValue}
                type="button"
                onClick={() => handleStarClick(starValue)}
                onMouseEnter={() => handleStarHover(starValue)}
                disabled={disabled}
                className={cn(
                  'tw:cursor-pointer tw:border-none tw:bg-transparent tw:p-0 tw:transition-all tw:duration-150',
                  !disabled && !readonly && 'tw:hover:scale-110',
                  disabled && 'tw:cursor-not-allowed tw:opacity-50',
                  readonly && 'tw:cursor-default',
                )}
                aria-label={`Rate ${starValue} star${starValue !== 1 ? 's' : ''}`}
              >
                <Icons.ratingStar
                  className="tw:h-10 tw:w-10 tw:transition-colors tw:duration-150"
                  fill={isFilled ? '#FC4C02' : '#ECE8E1'}
                />
              </button>
            );
          })}
        </div>

        <Typography className="tw:h-[1.25rem] tw:text-[11px] tw:text-grey-600">
          {displayLabel}
        </Typography>
      </div>
    </div>
  );
};

export default StarRating;
