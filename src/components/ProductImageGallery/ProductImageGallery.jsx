import { h, Fragment } from 'preact';
import { useState, useRef } from 'preact/hooks';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Zoom } from 'swiper/modules';
import Icons from '../Icons/Icons';
import { cn } from '../../../utils/helpers';

/**
 * ProductImageGallery Component
 *
 *  @description The ProductImageGallery component renders a gallery of product images with zoom and thumbnail functionality.
 *
 * @param {Object} props - Component props
 * @param {string} [props.classname] - Additional classes to add to the component
 * @param {Array} props.images - Array of image URLs to display in the gallery
 * @returns {JSX.Element} Preact component - The ProductImageGallery component
 */

const ProductImageGallery = ({ images, classname, ...props }) => {
  const swiperRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className={cn('tw:w-full tw:lg:max-w-[537px]', classname)} {...props}>
      <Swiper
        ref={swiperRef}
        zoom={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Zoom, Navigation, Thumbs]}
        className="tw:mb-6 tw:w-full tw:rounded-[20px] tw:p-6 tw:lg:h-[537px]"
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="tw:aspect-1/1 tw:w-full tw:rounded-[20px] tw:bg-white tw:lg:h-[537px]"
          >
            <div className="swiper-zoom-container tw:relative tw:cursor-move">
              <img
                src={image}
                className="tw:h-full tw:w-full tw:rounded-[20px] tw:object-cover"
              />
            </div>
            <button
              className="tw:absolute tw:right-4 tw:bottom-4 tw:cursor-pointer tw:p-3"
              onClick={() => {
                swiperRef.current.swiper.zoom.toggle();
              }}
            >
              <Icons.magnifier className="tw:h-6 tw:w-6" />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={12}
        slidesPerView={5.2}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="tw:w-full tw:lg:max-w-[537px]"
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="tw:h-[88px] tw:w-[88px] tw:rounded-[20px] tw:bg-white"
          >
            <img src={image} className="tw:rounded-xl" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageGallery;
