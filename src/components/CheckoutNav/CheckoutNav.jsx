import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import Logo from '../Logo';
import Button from '../Button/Button';

/**
 * CheckoutNav Component
 *
 * @description Navigation component for the checkout flow with configurable back to shop functionality
 *
 * @param {Object} props - Component props
 * @param {string} [props.classname] - Additional classes to add to the component
 * @param {string} [props.backtoshopurl] - URL for the "Back to shop" button. If provided, uses an anchor tag instead of button
 * @param {function} [props.handlebacktoshop] - Click handler for the "Back to shop" button (used when backtoshopurl is not provided)
 * @returns {JSX.Element} Preact component - The CheckoutNav component
 */

const CheckoutNav = ({
  backtoshopurl,
  handlebacktoshop,
  classname,
  ...props
}) => {
  return (
    <div id="checkout-nav">
      <nav
        className={cn(
          `tw:fixed tw:top-0 tw:right-0 tw:left-0 tw:z-50 tw:bg-secondary-1000 tw:shadow-[4px_4px_10px_0px_rgba(0,0,0,0.03)]`,
          classname,
        )}
        aria-label="Checkout navigation"
        {...props}
      >
        <div className="tw-container tw:flex tw:w-full tw:items-center tw:justify-between tw:py-4 tw:lg:py-6">
          {/* Logo */}
          <a href="#home">
            <Logo
              classname="tw:h-[18px] tw:w-[108px] tw:text-primary tw:lg:mr-8 tw:lg:h-[30px] tw:lg:w-[177px]"
              aria-label="Company Logo"
            />
          </a>

          {backtoshopurl ? (
            <Button
              label="Back to shop"
              variant="secondary"
              href={backtoshopurl}
              as="a"
            />
          ) : (
            <Button
              label="Back to shop"
              variant="secondary"
              onclick={handlebacktoshop}
            />
          )}
        </div>
      </nav>
    </div>
  );
};

export default CheckoutNav;
