import { h, Fragment } from 'preact';
import { ResetPasswordOverlay } from './components/ResetPasswordOverlay';
import { useEffect } from 'preact/hooks';
import { useOverlay } from '../../../hooks/useOverlay';

/**
 * ResetPassword Component
 *
 *  @description  A component that displays the reset password overlay
 *
 * @param {Object} props - Component props
 * @param {boolean} props.open - Flag to control the visibility of the overlay
 * @returns {JSX.Element} Preact component - The ResetPassword component
 */

const ResetPassword = ({ open }) => {
  const { showOverlay, hideOverlay, portalNode } = useOverlay();

  useEffect(() => {
    if (open) {
      showOverlay(ResetPasswordOverlay, {
        onClose: hideOverlay,
        closeOnClickOutside: false,
      });
    }
  }, [open]);

  return <>{portalNode}</>;
};

export default ResetPassword;
