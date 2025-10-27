import { h, Fragment } from 'preact';
import { createElement } from 'preact';
import { cn } from '../../../utils/helpers';

/**
 * Typography Component
 *
 * @description A flexible typography component that renders text content with customisable HTML elements
 * and styling options.
 *
 * @param {Object} props - The component props
 * @param {string} props.domtype - HTML element to use (e.g. 'p', 'h1', 'span', etc)
 * @param {string} props.mobilefontsize - Text size for mobile (e.g. 'text-6xl', 'text-base', etc)
 * @param {string} props.desktopfontsize - Text size for desktop (e.g. 'text-6xl', 'text-base', etc)
 * @param {string} props.weight - Font weight class to apply (e.g. 'font-light', 'font-normal', etc)
 * @param {JSX.Element | null} props.content - Text content or child elements to render inside the typography element
 * @param {string} props.classname - Additional classes to add to the component
 * @returns {JSX.Element} - The Typography component
 */

const headingStyles = [
  {
    domType: 'h1',
    mobileSize: '48px',
    desktopSize: '88px',
    classes: 'tw:text-7xl tw:lg:text-9xl',
  },
  {
    domType: 'h2',
    mobileSize: '40px',
    desktopSize: '60px',
    classes: 'tw:text-6xl tw:lg:text-8xl',
  },
  {
    domType: 'h3',
    mobileSize: '28px',
    desktopSize: '48px',
    classes: 'tw:text-4xl tw:lg:text-7xl',
  },
  {
    domType: 'h4',
    mobileSize: '24px',
    desktopSize: '40px',
    classes: 'tw:text-3xl tw:lg:text-6xl',
  },
  {
    domType: 'h5',
    mobileSize: '20px',
    desktopSize: '32px',
    classes: 'tw:text-2xl tw:lg:text-5xl',
  },
  {
    domType: 'h6',
    mobileSize: '16px',
    desktopSize: '24px',
    classes: 'tw:text-xl tw:lg:text-3xl',
  },
  {
    domType: 'h7',
    mobileSize: '16px',
    desktopSize: '18px',
    classes: 'tw:text-lg tw:lg:text-xl',
  },
];

const Typography = ({
  domtype = 'p',
  mobilefontsize,
  desktopfontsize,
  weight,
  content,
  children,
  classname,
  ...props
}) => {
  /**
   * Gets any additional CSS classes passed as props and weight class if provided
   * @returns {string} Combined CSS classes from props and weight, or empty string if none provided
   */
  const getBaseClasses = () => {
    const variantClass =
      mobilefontsize && desktopfontsize
        ? `${mobilefontsize} ${desktopfontsize}`
        : mobilefontsize || desktopfontsize || '';

    // Add default classes for headings
    const defaultClasses =
      headingStyles.find((style) => style.domType === domtype)?.classes || '';

    return cn(weight, defaultClasses, variantClass, classname);
  };

  /**
   * Converts text with `\n` into an array of JSX elements with `<br>`.
   */
  const renderContent = (text) => {
    if (typeof text === 'string') {
      return text.split('\n').map((line, index) => (
        <Fragment key={index}>
          {line}
          <br />
        </Fragment>
      ));
    }
    return text;
  };

  return createElement(
    domtype,
    {
      class: getBaseClasses(),
      ...props,
    },
    renderContent(content) || children,
  );
};

export default Typography;
