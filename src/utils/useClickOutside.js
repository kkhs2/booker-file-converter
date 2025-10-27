import { useEffect, useRef } from 'preact/hooks';

/**
 * Hook that detects clicks outside of the specified element
 *
 * @param {Function} onClickOutside - Callback function to execute when a click outside is detected
 * @param {boolean} [active=true] - Whether the detection is active
 * @returns {Object} ref - Ref to attach to the element you want to detect clicks outside of
 */
export const useClickOutside = (onClickOutside, active = true) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!active) return;

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClickOutside, active]);

  return ref;
};
