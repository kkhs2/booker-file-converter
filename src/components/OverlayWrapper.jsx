/**
 *  OverlayWrapper component
 * 
 *  This component wraps its children in a fixed overlay.
 *  It can be used to create modal-like effects.
 * 

 * @param {ReactNode} children - The content to be displayed inside the overlay
 * @returns {JSX.Element} The rendered overlay component
 */
export const OverlayWrapper = ({ children }) => {
  return (
    <div className="tw-no-body-scroll tw:fixed tw:top-0 tw:left-0 tw:z-[99] tw:flex tw:h-svh tw:w-svw tw:bg-transparent tw:transition tw:duration-1000 tw:group-[.open]:bg-black/10">
      {children}
    </div>
  );
};
