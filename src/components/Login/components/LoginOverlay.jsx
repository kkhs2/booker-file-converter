import { useState } from 'preact/hooks';
import Icons from '../../Icons/Icons';
import { LoginForm } from './LoginForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { cn } from '../../../../utils/helpers';
import { forwardRef } from 'preact/compat';

/**
 * LoginOverlay Component
 *
 * @description A component that displays a login or forgot password form
 *
 * @param {Object} props - Component props
 * @param {function} props.onClose - Function to close the overlay
 * @param {Object} ref - Ref to the overlay element
 *
 * @returns {JSX.Element} - The LoginOverlay component
 */

export const LoginOverlay = forwardRef(({ onClose }, ref) => {
  const [step, setStep] = useState(0);
  const isLoginForm = step === 0;

  return (
    <div className="tw:flex tw:h-full tw:w-full tw:translate-x-full tw:justify-end tw:overflow-auto tw:transition-all tw:duration-1000 tw:group-[.open]:translate-x-0">
      <div
        ref={ref}
        className="tw:h-full tw:w-full tw:overflow-auto tw:bg-white tw:p-6 tw:md:w-120 tw:md:p-10"
      >
        <div
          className={cn(
            'tw:inline-flex tw:w-full tw:items-center tw:justify-end',
            !isLoginForm && 'tw:justify-between',
          )}
        >
          {!isLoginForm && (
            <button
              className="tw:mb-4 tw:flex tw:cursor-pointer tw:items-center tw:space-x-2 tw:transition-opacity tw:hover:opacity-50 tw:md:mb-6"
              onClick={() => setStep(0)}
            >
              <Icons.arrowLeft classname="tw:w-4 tw:h-4" />
              <span>Back to sign in</span>
            </button>
          )}

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
          <LoginForm
            toggleForgotPassword={() => setStep(1)}
            onClose={onClose}
          />
        )}
        {step === 1 && (
          <ForgotPasswordForm
            onSubmit={() => console.log('Forgot password submit')}
          />
        )}
      </div>
    </div>
  );
});
