// Import js-beautify for formatting
import { useState, useEffect } from 'preact/hooks';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class strings using Tailwind CSS class merging
 * @param {...string} inputs - Class strings to merge
 * @returns {string} - The merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Hook for checking media query matches
 * @param {string} query - Media query string to match
 * @returns {boolean} - Whether the media query matches
 */

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    const updateMatch = () => {
      setMatches(matchMedia.matches);
    };

    matchMedia.addEventListener('change', updateMatch);
    return () => {
      matchMedia.removeEventListener('change', updateMatch);
    };
  }, [query]);

  return matches;
}

/**
 * Parses an HTML string into an array of elements
 * @param {string} htmlString - The HTML string to parse
 * @returns {Array} - An array of elements
 */
export const parseHtmlToElements = (htmlString) => {
  if (!htmlString) return '';

  const div = document.createElement('div');
  div.innerHTML = htmlString;

  return Array.from(div.childNodes).map((node, index) => {
    if (node.nodeType === 3) {
      // Text node
      return node.textContent;
    }
    const Element = node.tagName.toLowerCase();
    const attributes = Array.from(node.attributes).reduce(
      (acc, attr) => {
        // Convert 'class' to 'className' but keep the classes as-is
        if (attr.name === 'class') {
          return {
            ...acc,
            className: attr.value,
          };
        }
        return {
          ...acc,
          [attr.name]: attr.value,
        };
      },
      { key: index },
    );

    return (
      <Element {...attributes}>{parseHtmlToElements(node.innerHTML)}</Element>
    );
  });
};

/**
 * Formats a timestamp into a human-readable string like "tomorrow at 9pm"
 * @param {number|string|Date} timestamp - The timestamp to format (can be a Date object, timestamp number, or ISO string)
 * @returns {string} - Formatted date string
 */
export const formatRelativeTime = (timestamp) => {
  // Convert input to Date object
  const date = new Date(timestamp);

  // Get current date for comparison
  const now = new Date();

  // Set both dates to midnight for day comparison
  const todayMidnight = new Date(now);
  todayMidnight.setHours(0, 0, 0, 0);

  const dateMidnight = new Date(date);
  dateMidnight.setHours(0, 0, 0, 0);

  // Calculate difference in days
  const diffDays = Math.round(
    (dateMidnight - todayMidnight) / (1000 * 60 * 60 * 24),
  );

  // Format the time
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format time string
  const timeString =
    minutes === 0
      ? `${hours}${ampm}`
      : `${hours}:${minutes.toString().padStart(2, '0')}${ampm}`;

  // Determine day description
  let dayString;
  if (diffDays === 0) {
    dayString = 'today';
  } else if (diffDays === 1) {
    dayString = 'tomorrow';
  } else if (diffDays === -1) {
    dayString = 'yesterday';
  } else if (diffDays > 1 && diffDays < 7) {
    // Get day name for dates within a week
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    dayString = days[date.getDay()];
  } else {
    // Format as date for dates further away
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    dayString = `${day} ${month}`;
  }

  return `${dayString} at ${timeString}`;
};

/**
 * Formats a number into a currency string
 * @param {number} amount - The number to format
 * @param {string} currency - The currency code (e.g. 'USD', 'EUR')
 * @returns {string} - The formatted currency string
 */
export function formatCurrency(amount, currency = 'GBP', options) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    ...options,
  }).format(amount);
}

/**
 * Creates a debounced version of a function
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {Function} - The debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Creates a throttled version of a function
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit between function calls in milliseconds
 * @returns {Function} - The throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};
