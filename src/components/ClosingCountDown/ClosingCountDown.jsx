/**
 * ClosingCountDown Component
 *
 * Displays a countdown timer in a three-box layout showing Days, Hours, and Minutes
 * until a specific closing date. Updates every minute.
 *
 * @param {Object} props - Component props
 * @param {Date|string} props.targetDate - The target date to count down to
 * @param {string} props.classname - Additional CSS classes
 *
 * @returns {JSX.Element} - The ClosingCountDown component
 */

import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { cn } from '../../../utils/helpers';
const ClosingCountDown = ({ targetDate, classname, ...props }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate);
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );

        setTimeLeft({
          days,
          hours,
          minutes,
          isExpired: false,
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          isExpired: true,
        });
      }
    };

    calculateTimeLeft();

    // Set up interval to update every minute (60000ms)
    const timer = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Tailwind CSS Classes
  const CLASSES = {
    container: 'tw:flex tw:items-center tw:gap-4',
    timeUnit: 'tw:flex tw:flex-col tw:gap-2',
    label:
      'tw:text-sm tw:lg:text-base tw:font-medium tw:text-black-800 tw:tracking-wide',
    valueBox:
      'tw:bg-transparent tw:border-2 tw:border-black-1000 tw:rounded-xl tw:p-4 tw:flex tw:items-center tw:justify-center',
    value:
      'tw:text-[18px] tw:lg:text-[24px] tw:font-bold tw:text-black-1000 tw:leading-none',
  };

  if (timeLeft.isExpired) {
    return false;
  }

  return (
    <div className={cn(CLASSES.container, classname)} {...props}>
      <div className={CLASSES.timeUnit}>
        <span className={CLASSES.label}>Days</span>
        <div className={CLASSES.valueBox}>
          <span className={CLASSES.value}>
            {timeLeft.days.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className={CLASSES.timeUnit}>
        <span className={CLASSES.label}>Hours</span>
        <div className={CLASSES.valueBox}>
          <span className={CLASSES.value}>
            {timeLeft.hours.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className={CLASSES.timeUnit}>
        <span className={CLASSES.label}>Mins</span>
        <div className={CLASSES.valueBox}>
          <span className={CLASSES.value}>
            {timeLeft.minutes.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClosingCountDown;
