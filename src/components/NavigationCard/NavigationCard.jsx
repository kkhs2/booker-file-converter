import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';

/**
 * Navigation Card Component
 *
 * @description Renders a customizable navigation card with various styles, states, and optional left/right elements.
 *
 * @param {Object} props - Component props
 * @param {string} [props.label=''] - Text displayed as the card label
 * @param {string} [props.text=''] - Optional supporting text displayed below the label
 * @param {'keyline'|'white'|'orange'|'yellow'} [props.background='keyline'] - Background style variant
 * @param {'default'|'square'} [props.variant='default'] - Layout variant; 'square' applies only on desktop
 * @param {string} [props.href] - URL to navigate to when clicked (renders as anchor tag)
 * @param {JSX.Element|string|(() => JSX.Element)|null} [props.elementleft=null] - Left element; function, JSX element, or image URL
 * @param {JSX.Element|(() => JSX.Element)|null} [props.elementright=null] - Right element; function or JSX element
 * @param {(event: MouseEvent, href?: string) => void} [props.onclick] - Click handler; receives event and href
 * @param {string} [props.classname=''] - Additional CSS classes for the root element
 * @param {string} [props.textclassname] - Additional CSS classes for the text container
 * @returns {JSX.Element} The NavigationCard component
 */

const NavigationCard = ({
  label = '',
  text = '',
  background = 'keyline',
  variant = 'default',
  href,
  elementleft = null,
  elementright = null,
  onclick,
  classname = '',
  textclassname,
  ...props
}) => {
  // Tailwind CSS Classes
  const CLASSES = {
    base: 'tw:no-underline tw:inline-flex tw:items-center tw:justify-between tw:rounded-[20px] tw:focus:outline-hidden tw:transition-all tw:leading-[1.2] tw:font-normal tw:p-3 tw:lg:p-4 tw:text-lg tw:break-normal tw:lg:text-xl tw:group tw:gap-4 tw:w-full',
    backgrounds: {
      keyline:
        'tw:text-black-1000 tw:cursor-pointer tw:hover:bg-beige-1000 tw:outline tw:outline-black-1000',
      white:
        'tw:text-black-1000 tw:cursor-pointer tw:hover:bg-beige-1000 tw:bg-white tw:shadow-[4px_4px_10px_-10px_rgba(0,0,0,0.3)]',
      orange:
        'tw:text-black-1000 tw:cursor-pointer tw:hover:bg-beige-1000 tw:bg-primary tw:hover:bg-primary-600',
      yellow: 'tw:bg-yellow-700 tw:hover:bg-yellow-800 tw:text-black-1000',
    },
    variants: {
      default: '',

      square:
        'tw:lg:aspect-square tw:lg:flex-col tw:lg:items-center tw:lg:justify-between tw:lg:gap-2 tw:lg:p-2 tw:lg:pb-3 tw:lg:max-w-none',
    },
    iconSize: 'tw:p-3 tw:lg:p-4',
  };

  // Common props for both navigationCard and link
  const navigationCardProps = {
    className: cn(
      CLASSES.base,
      CLASSES.backgrounds[background],
      variant && CLASSES.variants[variant],
      classname,
    ),
    role: 'navigationCard',
    ...props,
  };

  const Element = href ? 'a' : 'div';

  const handleClick = (event) => {
    if (onclick) {
      onclick(event, href); // Pass event & href as argument
    }
  };

  const renderElementLeft = () =>
    // check if the element is a function or an image
    typeof elementleft === 'function' ? (
      elementleft()
    ) : (
      <div
        className={cn(
          'tw:overflow-hidden tw:rounded-xl',
          variant === 'square' &&
            'tw:lg:flex tw:lg:min-h-0 tw:lg:w-full tw:lg:min-w-0 tw:lg:flex-1 tw:lg:items-center tw:lg:justify-center',
        )}
      >
        <img
          src={elementleft}
          alt={label}
          className={cn(
            'tw:h-[52px] tw:w-[52px] tw:rounded-xl',
            variant === 'square' &&
              'tw:w-full tw:max-lg:max-h-[52px] tw:max-lg:max-w-[52px] tw:lg:h-auto tw:lg:rounded-2xl tw:lg:object-cover',
          )}
        />
      </div>
    );

  return (
    <Element {...navigationCardProps} href={href} onclick={handleClick}>
      <div
        className={cn(
          'tw:flex tw:items-center tw:gap-4 tw:text-black',
          background === 'orange' && 'tw:text-white',
          variant === 'square' &&
            'tw:lg:flex tw:lg:w-full tw:lg:flex-1 tw:lg:flex-col tw:lg:items-center tw:lg:justify-between tw:lg:gap-0 tw:lg:text-center',
          textclassname,
        )}
      >
        {elementleft && renderElementLeft()}
        <div
          className={cn(
            'tw:flex tw:flex-col tw:gap-x-1',
            variant === 'square' && 'tw:lg:mt-2 tw:lg:flex-shrink-0',
          )}
        >
          {label && (
            <span
              className={cn(
                'tw:leading-[1.2]',
                variant === 'square' && 'tw:lg:text-center tw:lg:text-lg',
              )}
            >
              {label}
            </span>
          )}
          {text && (
            <span className="tw:text-base tw:leading-[1.2]">{text}</span>
          )}
        </div>
      </div>

      <div className={cn(variant === 'square' && 'tw:lg:hidden')}>
        {typeof elementright === 'function' ? elementright() : elementright}
      </div>
    </Element>
  );
};

export default NavigationCard;
