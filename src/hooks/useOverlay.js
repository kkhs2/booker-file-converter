/**
 * @file useOverlay.js
 * @description Provides a hook for managing overlay portals in a React application without context.
 */

import { useState, useRef, useEffect } from 'preact/hooks';
import { createPortal } from 'preact/compat';
import { useClickOutside } from '../utils';
import { OverlayWrapper } from '../stories/components/OverlayWrapper';

/**
 * Custom hook to create and manage overlay portals
 * @returns {Object} The overlay methods and state
 * @returns {Function} .showOverlay - Function to show a component in an overlay
 * @returns {Function} .hideOverlay - Function to hide the current overlay
 * @returns {boolean} .isVisible - Whether an overlay is currently visible
 */
export const useOverlay = () => {
  const [portalNode, setPortalNode] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [closeOnClickOutside, setCloseOnClickOutside] = useState(true);
  const overlayRef = useRef(null);

  /**
   * Clears the portal by removing the portal DOM element and resetting the state.
   */
  const hideOverlay = () => {
    const portalContainer = document.getElementById('portal');
    if (portalContainer) {
      portalContainer.classList.remove('open');

      // Wait for animation to complete before removing the element
      setTimeout(() => {
        document.getElementById('portal')?.remove();
        setPortalNode(null);
        setIsVisible(false);
      }, 300); // Animation duration
    }
  };

  // Use click outside detection only when closeOnClickOutside is true
  useEffect(() => {
    if (closeOnClickOutside && isVisible) {
      overlayRef.current = useClickOutside(hideOverlay, isVisible);
    }
  }, [closeOnClickOutside, isVisible]);

  /**
   * Creates a portal node and appends it to the DOM if it doesn't already exist.
   * @param {ComponentType} Component - The React component to render inside the portal.
   * @param {Object} props - Props to pass to the component
   * @param {Object} options - Options for controlling overlay behavior
   * @param {boolean} [options.closeOnClickOutside=true] - Whether to close the overlay when clicking outside
   */
  const showOverlay = (Component, props = {}, options = {}) => {
    const { closeOnClickOutside: shouldCloseOnClickOutside = true } = options;

    // Update the state with the new option
    setCloseOnClickOutside(shouldCloseOnClickOutside);

    let portalContainer = document.getElementById('portal');

    if (!portalContainer) {
      const container = document.createElement('div');
      container.id = 'portal';
      document.body.appendChild(container);
      portalContainer = container;
    }

    // Create the portal with the component
    setPortalNode(
      createPortal(
        <OverlayWrapper>
          <Component
            ref={overlayRef.current}
            {...props}
            onClose={hideOverlay}
          />
        </OverlayWrapper>,
        portalContainer,
      ),
    );

    // Apply animation classes
    portalContainer.classList.add('tw:group');

    // Delay the opening of the portal to allow for the transition to take effect
    setTimeout(() => {
      portalContainer.classList.add('open');
      setIsVisible(true);
    }, 0);
  };

  // Clean up the portal when the component unmounts
  useEffect(() => {
    return () => {
      const portalContainer = document.getElementById('portal');
      if (portalContainer) {
        portalContainer.remove();
      }
    };
  }, []);

  // Return the portal node in addition to the methods
  return {
    showOverlay,
    hideOverlay,
    isVisible,
    portalNode,
  };
};
