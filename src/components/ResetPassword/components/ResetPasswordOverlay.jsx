import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import Icons from '../../Icons/Icons';
import { forwardRef } from 'preact/compat';
import { ResetPasswordForm } from './ResetPasswordForm';
import { ResetPasswordFormSuccess } from './ResetPasswordFormSuccess';

/**
 * ResetPasswordOverlay Component
 *
 * @description A component that displays the reset password overlay
 *
 * @param {Object} props - Component props
 * @param {function} props.onClose - Function to close the overlay
 * @param {Object} ref - Ref to the overlay element
 *
 * @returns {JSX.Element} - The ResetPasswordOverlay component
 */

export const ResetPasswordOverlay = forwardRef(({ onClose }, ref) => {
  const [step, setStep] = useState(0);

  const handleTriggerLogin = () => {
    setTimeout(() => {
      document.dispatchEvent(new CustomEvent('triggerLoginOverlayOpen'));
    }, 0);
  };

  return (
    <div className="tw:flex tw:h-full tw:w-full tw:translate-x-full tw:justify-end tw:overflow-auto tw:transition-all tw:duration-1000 tw:group-[.open]:translate-x-0">
      <div
        ref={ref}
        className="tw:h-full tw:w-full tw:overflow-auto tw:bg-white tw:p-6 tw:md:w-120 tw:md:p-10"
      >
        <div className="tw:inline-flex tw:w-full tw:items-center tw:justify-end">
          <button
            className="tw:mb-4 tw:cursor-pointer tw:transition-opacity tw:hover:opacity-50 tw:md:mb-6"
            onClick={onClose}
          >
            <Icons.x
              fill="black"
              classname="tw:w-5 tw:h-5 tw:md:w-6 tw:md:h-6"
            />
          </button>
        </div>

        {step === 0 && (
          <ResetPasswordForm onSubmit={() => setStep(1)} onClose={onClose} />
        )}
        {step === 1 && (
          <ResetPasswordFormSuccess onSubmit={() => handleTriggerLogin()} />
        )}
      </div>
    </div>
  );
});
