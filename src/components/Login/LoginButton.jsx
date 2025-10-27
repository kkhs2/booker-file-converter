import { h, Fragment } from 'preact';
import { useEffect, useCallback } from 'preact/hooks';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';
import { useOverlay } from '../../../hooks/useOverlay';
import { LoginOverlay } from './components/LoginOverlay';
import { cn } from '../../../utils/helpers';

/**
 * Login Component
 *
 * The Login component is a button that opens the login overlay.
 *
 * @param {Object} props - Component props
 * @param {string} [props.classname] - Additional classes to add to the component
 * @returns {JSX.Element} Preact component - The Login component
 */

// Main Component

const LoginButton = ({ classname, ...props }) => {
  const { showOverlay, hideOverlay, portalNode } = useOverlay();

  const handleTriggerResetPassword = useCallback(() => {
    hideOverlay();
    showOverlay(ResetPasswordOverlay, {
      onClose: hideOverlay,
    });
  }, [showOverlay, hideOverlay]);

  const handleOpenModal = useCallback(() => {
    showOverlay(LoginOverlay, {
      onClose: hideOverlay,
      onTriggerResetPassword: handleTriggerResetPassword,
    });
  }, [showOverlay, hideOverlay, handleTriggerResetPassword]);

  useEffect(() => {
    const handleOpenLoginOverlay = () => {
      console.log(
        'triggerLoginOverlayOpen event received by LoginButton, calling handleOpenModal',
      );
      handleOpenModal();
    };

    document.addEventListener(
      'triggerLoginOverlayOpen',
      handleOpenLoginOverlay,
    );

    return () => {
      document.removeEventListener(
        'triggerLoginOverlayOpen',
        handleOpenLoginOverlay,
      );
    };
  }, [handleOpenModal]);

  return (
    <>
      <Button
        label="Sign in / Join"
        iconleft={<Icons.user classname="tw:h-4 tw:w-4" />}
        classname={cn('tw:whitespace-nowrap', classname)}
        onClick={handleOpenModal}
        {...props}
      />
      {portalNode}
    </>
  );
};

export default LoginButton;
