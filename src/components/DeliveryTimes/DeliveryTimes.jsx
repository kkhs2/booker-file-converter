import { h, Fragment } from 'preact';
import { cn, formatRelativeTime } from '../../../utils/helpers';
import { useState, useEffect } from 'preact/hooks';
import Icons from '../Icons/Icons';

/**
 * Create a countdown timer based on a deadline
 * @param {string} deadline - ISO date string for the countdown target
 * @returns {string} Formatted countdown string (e.g. "1d 4h 32m 12s")
 */
const useCountdown = (deadline) => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const difference = new Date(deadline) - new Date();

      if (difference <= 0) {
        setCountdown('Expired');
        return;
      }

      const time = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };

      const parts = [];
      if (time.days > 0) parts.push(`${time.days}d`);
      parts.push(`${time.hours}h`);
      parts.push(`${time.minutes}m`);
      parts.push(`${time.seconds}s`);

      setCountdown(parts.join(' '));
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  return countdown;
};

/**
 * Formats a date to show weekday and day number
 * @param {string} date - ISO date string to format
 * @returns {string} Formatted date (e.g. "Mon 15")
 */
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
  });
};

/**
 * Desktop version of delivery info display
 */
const DesktopDeliveryInfo = ({
  type,
  deadline,
  icon,
  countdownType = 'timer',
  useCountdownHook = useCountdown,
}) => {
  const formattedDeadline = formatDate(deadline);
  const countdown = useCountdownHook(deadline);
  const isAmbient = type.toLowerCase() === 'ambient';

  return (
    <div className="tw:hidden tw:items-center tw:gap-2 tw:lg:flex tw:lg:flex-row">
      {typeof icon === 'function' ? icon() : icon}
      <div className="tw:flex tw:items-center tw:gap-2 tw:font-bold tw:lg:font-normal">
        <Icons.truck classname="tw:h-3.5 tw:w-3.5 tw:flex-shrink-0" />
        <span>{formattedDeadline}</span>
      </div>
      <div className="tw:text-gray-600">∙</div>
      <span className="tw:font-bold">{type}</span>
      <div className="tw:text-gray-600">∙</div>
      <span>
        {countdownType === 'timer' ? 'Order in ' : 'Order by '}
        <span className="tw:inline-block tw:min-w-[100px] tw:font-bold">
          {countdownType === 'timer' ? countdown : formatRelativeTime(deadline)}
        </span>
      </span>
    </div>
  );
};

/**
 * Mobile version of delivery info display
 */
const MobileDeliveryInfo = ({
  type,
  deadline,
  icon,
  countdownType = 'timer',
  useCountdownHook = useCountdown,
}) => {
  const formattedDeadline = formatDate(deadline);
  const countdown = useCountdownHook(deadline);
  const isAmbient = type.toLowerCase() === 'ambient';
  const countdownText =
    countdownType === 'timer'
      ? `Order in ${countdown}`
      : `Order by ${formatRelativeTime(deadline)}`;

  return (
    <div className="tw:flex tw:flex-col tw:gap-2 tw:lg:hidden">
      <div className="tw:flex tw:items-start tw:justify-between">
        <div className="tw:flex tw:items-start tw:gap-2">
          {typeof icon === 'function' ? icon() : icon}
          <div>
            <p className="tw:text-[13px] tw:font-bold">{type}</p>
            <p className="tw:text-sm">{countdownText}</p>
          </div>
        </div>
        <div className="tw:flex tw:items-center tw:gap-2 tw:font-bold tw:lg:font-normal">
          <Icons.truck classname="tw:h-4 tw:w-4 tw:flex-shrink-0" />
          <p className="tw:text-[13px]">{formattedDeadline}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * Order Times Component
 *
 * @description Displays the order times for ambient and chilled products
 *
 * @param {Object} props - Component props
 * @param {Array} props.items - Array of items with type and deadline
 * @param {string} props.info - Information text for the expandable section
 * @param {Array} props.infolist - Bullet points for delivery groups
 * @param {string} props.classname - Additional classes to add to the component
 *
 * @returns {JSX.Element} Preact component - The DeliveryTimes component
 */
const DeliveryTimes = ({ items, info, infolist, classname, ...props }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        'tw:mt-4 tw:rounded-[20px] tw:bg-grey-1100 tw:px-4 tw:py-4 tw:md:px-6 tw:lg:py-2',
        classname,
      )}
      {...props}
    >
      <div className="tw:flex tw:flex-col tw:justify-between tw:lg:flex-row tw:lg:items-center">
        <div className="tw:flex tw:flex-col tw:gap-3 tw:text-base tw:lg:flex-row tw:lg:gap-10">
          {/* Ambient product info */}
          {items.map((item, index) => (
            <Fragment key={index}>
              <DesktopDeliveryInfo {...item} />
              <MobileDeliveryInfo {...item} />
            </Fragment>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="tw:mt-3 tw:cursor-pointer tw:self-end tw:lg:mt-0 tw:lg:self-center"
          aria-expanded={expanded}
          aria-label="Show delivery information"
        >
          <Icons.info
            classname="tw:w-5 tw:h-5 tw:flex-shrink-0"
            stroke="black"
          />
        </button>
      </div>

      {expanded && (
        <div className="tw:mt-3 tw:rounded-xl tw:bg-white tw:p-3 tw:text-[13px] tw:leading-[140%] tw:lg:mb-4 tw:lg:p-4 tw:lg:text-base">
          {info && <p>{info}</p>}
          {infolist && (
            <ul className="tw:mt-2 tw:list-disc tw:pl-4 tw:text-[13px] tw:lg:text-base">
              {infolist.map((item, index) => (
                <li key={index} className="tw:mb-1">
                  {item.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default DeliveryTimes;
