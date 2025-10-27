/**
 * Footer Component
 *
 * @description Renders a customizable footer with sections, social links, and a copyright notice.
 * Includes collapsible sections for mobile views and a "Back to Top" button.
 *
 * @param {Object} props - Component props
 * @param {Array<Array<Object>>} props.sections - Array of arrays representing footer columns. Each inner array contains section objects. Each section object contains:
 *   @property {string} title - The section title
 *   @property {Array} links - Array of link objects with `label` and `href`
 * @param {Array} props.sociallinks - Array of objects for social media links. Each link contains:
 *   @property {string} href - The URL of the social media platform
 *   @property {HTMLElement|string} icon - The icon representation for the platform
 * @param {string} props.copyright - The copyright text displayed at the bottom of the footer
 * @param {string} props.classname - Additional classes to add to the component
 * @returns {JSX.Element} - The Footer component
 */

// Import dependencies
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import Icons from '../Icons/Icons';
import Button from '../Button/Button';
import Logo from '../Logo';
import { cn } from '../../../utils/helpers';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const FooterSection = ({ section }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="footer-list tw:flex tw:items-baseline tw:justify-between tw:lg:items-start">
      <div className="tw:w-full">
        <h3
          onClick={toggleSection}
          className={`tw:text-${isOpen ? 'grey-500' : 'white-1000'} tw:cursor-pointer tw:pb-6 tw:text-lg tw:leading-none tw:transition-colors tw:duration-300 tw:ease-in-out tw:lg:pointer-events-none tw:lg:cursor-default tw:lg:pt-4 tw:lg:text-3xl tw:lg:leading-[120%] tw:lg:font-medium`}
        >
          {section.title}
        </h3>
        <ul
          className={`tw:overflow-hidden ${isOpen ? 'tw:mt-4 tw:mb-7 tw:max-h-96' : 'tw:max-h-0'} tw:flex tw:flex-col tw:gap-2 tw:transition-all tw:duration-500 tw:ease-in-out tw:lg:block tw:lg:max-h-none`}
        >
          {section.links.map((link) => (
            <li className="tw:py-2">
              <a
                href={link.href}
                className="tw-underline-fade tw:text-lg tw:leading-none tw:text-white-1000"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div
        onClick={toggleSection}
        className={`footer-toggle tw:transform tw:cursor-pointer tw:transition-transform tw:duration-300 tw:ease-in-out tw:lg:hidden ${isOpen ? 'tw:rotate-180' : 'tw:rotate-90'}`}
      >
        {isOpen ? (
          <div className="footer-close">{Icons.minus({ className: '' })}</div>
        ) : (
          <div className="footer-open">{Icons.plus({ className: '' })}</div>
        )}
      </div>
    </div>
  );
};

const Footer = ({ sections, sociallinks, copyright, classname, ...props }) => {
  return (
    <footer className={cn('tw:bg-black-1000 tw:pt-14', classname)}>
      <div
        className="tw-container-full tw:flex tw:flex-col tw:gap-12 tw:px-5 tw:pb-10 tw:text-white-1000 tw:lg:gap-10 tw:xl:px-0"
        {...props}
      >
        <div>
          <Logo
            classname="tw:h-[18px] tw:text-white tw:lg:h-[24px]"
            aria-label="Company Logo"
          />
        </div>
        <div className="tw:grid tw:grid-cols-1 tw:gap-7 tw:lg:grid-cols-4 tw:lg:gap-8">
          {sections &&
            sections.map(
              (column, index) =>
                column.length > 0 && (
                  <div
                    key={index}
                    className="tw:flex tw:flex-col tw:gap-7 tw:font-light tw:lg:col-span-1 tw:lg:row-span-2 tw:lg:gap-6 tw:lg:font-medium"
                  >
                    {column.map((section, sectionIndex) => (
                      <FooterSection
                        key={`${index}-${sectionIndex}`}
                        section={section}
                      />
                    ))}
                  </div>
                ),
            )}
        </div>
        <div className="tw:flex tw:flex-col tw:justify-between tw:gap-6 tw:lg:flex-row tw:lg:items-center">
          <div className="tw:flex tw:items-center tw:space-x-7">
            {sociallinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="tw:flex tw:h-6 tw:items-center"
              >
                {social.icon()}
              </a>
            ))}
          </div>
          <div className="tw:flex tw:items-center tw:justify-between tw:gap-[21px]">
            <p className="tw:text-sm tw:text-grey-500">{copyright}</p>
            {sections && sections.length > 0 && (
              <Button
                label="Back to top"
                variant="inverse"
                size="responsive"
                state="enabled"
                iconright={Icons.footerArrow({
                  classname: 'tw:w-3 tw:h-3 tw:h-4 tw:lg:w-4',
                })}
                onClick={scrollToTop}
              />
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
