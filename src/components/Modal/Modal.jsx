/**
 * Modal component that displays a dialog with a title, description, and optional children and buttons.
 * Includes transition effects and body scroll locking when opened.
 *
 * @param {Object} props - The props for the Modal component.
 * @param {string} props.title - The title of the modal.
 * @param {string} [props.description] - Optional description text for the modal.
 * @param {React.ReactNode} [props.children] - Optional children elements to render inside the modal.
 * @param {Function} [props.buttonscomponent] - Optional function to render custom buttons in the modal.
 * @param {boolean} props.isopen - Determines whether the modal is open or closed.
 * @param {Function} props.onclose - Callback function to handle closing the modal.
 * @param {string} [props.classname] - Optional additional classname(s) for the modal container.
 * @param {string} [props.variant] - Optional variant for the modal, can be 'default', 'error', or 'productList'.
 * @param {boolean} [props.showclosebutton=false] - Optional. If true, shows the close button
 *
 * @returns {JSX.Element|null} The rendered Modal component or null if not open.
 */

import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import { useEffect, useState } from 'preact/hooks';
import Typography from '../Typography/Typography';
import Icons from '../Icons/Icons';

export const Modal = ({
  title,
  description,
  children,
  buttonscomponent,
  isopen,
  onclose,
  classname,
  variant = 'default',
  showclosebutton = true,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle transition effect and body scroll lock when modal opens/closes
  useEffect(() => {
    if (isopen) {
      // Small delay to ensure DOM is ready before starting transition
      setTimeout(() => setIsVisible(true), 10);

      // Prevent scrolling on body
      document.body.style.overflow = 'hidden';
      // For iOS Safari
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      setIsVisible(false);

      // Re-enable scrolling when modal is closed
      if (document.body.style.position === 'fixed') {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        document.body.style.overflow = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      } else {
        document.body.style.overflow = '';
      }
    }

    // Cleanup function to ensure scroll is re-enabled if component unmounts
    return () => {
      if (document.body.style.position === 'fixed') {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        document.body.style.overflow = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      } else {
        document.body.style.overflow = '';
      }
    };
  }, [isopen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (e) => {
      if (isopen && e.key === 'Escape') {
        onclose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isopen]);

  if (!isopen) return null;

  return (
    <div
      className={cn(
        'tw:fixed tw:top-0 tw:right-0 tw:bottom-0 tw:left-0 tw:z-51 tw:flex tw:items-end tw:bg-black/50 tw:transition-opacity tw:duration-300 tw:lg:items-center tw:lg:justify-center',
        isVisible ? 'tw:opacity-100' : 'tw:opacity-0',
        variant === 'productList' && 'tw:lg:items-end',
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) onclose();
      }}
      {...props}
    >
      <div
        className={cn(
          'tw:space-y-4 tw:overflow-hidden tw:rounded-[20px] tw:bg-secondary-1000 tw:shadow-[24px_24px_36px_-32px_rgba(0,0,0,0.24)] tw:transition-all tw:duration-300 tw:max-lg:w-full tw:lg:min-w-[568px]',
          isVisible && 'tw:scale-100 tw:opacity-100',
          !isVisible && 'tw:scale-95 tw:opacity-0',
          variant === 'error' && 'tw:lg:max-w-[568px]',
          variant === 'productList' &&
            'tw:w-full tw:rounded-none tw:lg:rounded-t-[20px] tw:lg:rounded-br-none tw:lg:rounded-bl-none',
          classname,
        )}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {variant === 'error' ? (
          <div className="tw:flex tw:items-center tw:justify-between tw:bg-red-1000 tw:p-4">
            <div className="tw:flex tw:items-center tw:gap-3">
              <Icons.alertCircle classname="tw:h-16 tw:w-16 tw:text-white" />
              <Typography
                domtype="h5"
                classname="tw:text-white tw:font-semibold"
              >
                {title}
              </Typography>
            </div>
            <button
              onClick={onclose}
              className="tw:rounded tw:p-1"
              aria-label="Close modal"
            >
              <Icons.x classname="tw:h-6 tw:w-6 tw:text-white tw:cursor-pointer" />
            </button>
          </div>
        ) : variant === 'productList' ? (
          <div className="tw:flex tw:items-center tw:justify-between tw:px-6 tw:pt-6">
            <Typography domtype="h5" classname="tw:text-primary">
              {title}
            </Typography>
            {showclosebutton && (
              <button
                onClick={onclose}
                className="tw:absolute tw:top-4 tw:right-4 tw:cursor-pointer tw:p-1"
                aria-label="Close modal"
              >
                <Icons.x classname="tw:h-6 tw:w-6 tw:text-black" />
              </button>
            )}
          </div>
        ) : (
          <div className="tw:relative tw:flex tw:items-start tw:justify-between tw:px-6 tw:pt-6 tw:lg:px-10 tw:lg:pt-10">
            <Typography domtype="h5" classname="tw:text-primary tw:flex-1">
              {title}
            </Typography>
            {showclosebutton && (
              <button
                onClick={onclose}
                className="tw:absolute tw:top-3 tw:right-3 tw:cursor-pointer tw:p-1"
                aria-label="Close modal"
              >
                <Icons.x classname="tw:h-6 tw:w-6 tw:text-black" />
              </button>
            )}
          </div>
        )}

        <div
          className={cn(
            'tw:space-y-5',
            variant === 'error' && 'tw:p-6',
            variant === 'default' && 'tw:px-6 tw:pb-10 tw:lg:px-10',
            variant === 'productList' && 'tw:px-6 tw:pt-5 tw:pb-0',
          )}
        >
          {description && <p className="tw:text-base">{description}</p>}

          {children}

          {buttonscomponent && (
            <div
              className={cn(
                'tw:flex tw:justify-end tw:gap-3 tw:border-t tw:border-dotted tw:border-secondary-1300 tw:pt-5 tw:max-lg:flex-col-reverse tw:lg:gap-2',
                variant === 'error' &&
                  'tw:border-t tw:border-dashed tw:border-secondary-1300 tw:pt-5',
                variant === 'productList' &&
                  'tw:border-t tw:border-dashed tw:border-secondary-1300 tw:pt-5',
              )}
            >
              {buttonscomponent()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
