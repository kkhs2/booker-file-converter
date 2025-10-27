import { h, Fragment } from 'preact';
import Typography from '../Typography/Typography';

/**
 * NutritionCard component for displaying nutritional information
 * @param {Object} props - Component properties
 * @param {string} props.title - Title of the nutrition card
 * @param {string} props.valueLine1 - First line of nutritional value
 * @param {string} props.valueLine2 - Second line of nutritional value (optional)
 * @param {string} props.percentage - Percentage value to display
 * @param {string} [props.backgroundcolour='#C8C2A8'] - Background colour in hex format
 */
export const NutritionCard = ({
  title,
  valueLine1,
  valueLine2,
  percentage,
  backgroundcolour = '#C8C2A8',
}) => {
  return (
    <div
      className="tw:flex tw:min-w-[112px] tw:flex-col tw:items-center tw:justify-between tw:rounded-t-[20px] tw:p-4"
      style={{ backgroundColor: backgroundcolour }}
    >
      <div className="tw:space-y-4">
        <Typography>{title}</Typography>
        <Typography classname="tw:text-center">
          {valueLine1}
          {valueLine2 && <br />}
          {valueLine2}
        </Typography>
      </div>
      <span className="tw:mt-3 tw:flex tw:w-full tw:items-center tw:justify-center tw:rounded-[100px] tw:bg-white tw:p-3 tw:text-center">
        <Typography domtype="h7">{percentage}</Typography>
      </span>
    </div>
  );
};

export default NutritionCard;
