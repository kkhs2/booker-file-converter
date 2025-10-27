/**
 * CountDownTimer Component
 *
 * Displays a countdown timer that counts down from a given date.
 * Shows the remaining time in hours, minutes, and seconds format.
 *
 * @param {Object} props - Component props
 * @param {Date|string} props.targetDate - The target date to count down to
 * @param {string} props.classname - Additional CSS classes
 * @param {function} props.onComplete - Callback function when countdown reaches zero
 *
 * @returns {JSX.Element} - The CountDownTimer component
 */

import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { cn } from '../../../utils/helpers';

const CountDownTimer = ({ targetDate, classname, onComplete, ...props }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate);
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          hours,
          minutes,
          seconds,
          isExpired: false,
        });
      } else {
        setTimeLeft({
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });

        if (onComplete && typeof onComplete === 'function') {
          onComplete();
        }
      }
    };

    calculateTimeLeft();

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const formatTime = (value, unit) => {
    if (value === 0) return null;
    return `${value}${unit}`;
  };

  const timeDisplay = () => {
    const parts = [
      formatTime(timeLeft.hours, 'h'),
      formatTime(timeLeft.minutes, 'min'),
      formatTime(timeLeft.seconds, 's'),
    ].filter(Boolean);

    if (parts.length === 0) {
      return 'expired';
    }

    return parts.join(' ');
  };

  return (
    <div
      className={cn(
        'tw:inline-flex tw:items-center tw:justify-center tw:rounded-lg tw:border tw:border-grey-300 tw:bg-white-1000 tw:px-4 tw:py-2',
        classname,
      )}
      {...props}
    >
      <span
        className={cn(
          'tw:text-base tw:leading-none tw:font-medium tw:whitespace-nowrap tw:text-black-1000',
          timeLeft.isExpired && 'tw:text-red-500',
        )}
      >
        {!timeLeft.isExpired ? `ends in ` : 'expired'}
        <span className="tw:font-semibold">{timeDisplay()}</span>
      </span>
    </div>
  );
};

export default CountDownTimer;
