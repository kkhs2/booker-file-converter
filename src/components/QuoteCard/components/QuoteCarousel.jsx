import { h, Fragment } from 'preact';
import Carousel from '../../Carousel/Carousel';

/**
 * QuoteCarousel Component
 *
 * @description Renders a QuoteCarousel with a title and a grid of quote cards
 *
 * @param {Object} props - The component props
 * @param {string} props.title - The title of the section
 * @param {ReactNode} props.children - The children to display in the section
 * @returns {JSX.Element} - The QuoteCarousel component
 */

const QuoteCarousel = ({ title, children }) => {
  return (
    <div className="tw:relative tw:mx-auto tw:mb-[135px] tw:max-w-[1312px] tw:lg:mb-0">
      <h4 className="tw:absolute tw:top-[95%] tw:z-10 tw:w-full tw:max-w-[300px] tw:pl-8 tw:text-left tw:text-[48px] tw:leading-[95%] tw:font-light tw:text-primary-500 tw:lg:bottom-[-52px] tw:lg:max-w-full tw:lg:pl-0 tw:lg:text-center tw:lg:text-[76px] tw:xl:text-[88px]">
        {title}
      </h4>

      <Carousel
        items={children}
        shownavigation={false}
        options={{
          slidesOffsetBefore: 20,
          slidesOffsetAfter: 20,
          spaceBetween: 0,
          slidesPerView: 1.14,
          breakpoints: {
            431: {
              slidesPerView: 1.5,
            },
            630: {
              slidesPerView: 1.8,
            },

            768: {
              slidesPerView: 2.5,
            },

            910: {
              slidesPerView: 2.7,
            },

            1023: {
              slidesPerView: 2.3,
            },

            1100: {
              slidesPerView: 2.45,
            },

            1240: {
              slidesPerView: 2.9,
            },

            1290: {
              slidesPerView: 3,
            },

            1312: {
              slidesPerView: 3,
              slidesOffsetBefore: 0,
              slidesOffsetAfter: 0,
              spaceBetween: 32,
            },
          },
        }}
      />
    </div>
  );
};
export default QuoteCarousel;
