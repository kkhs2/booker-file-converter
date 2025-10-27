import { h, Fragment } from 'preact';
import RailSection from '../../RailSection/RailSection';

/**
 * The QuoteRailSection component
 *
 * @description A section that displays a list of quotes in a horizontal slider
 *
 * @param {object} props The props of the component
 * @param {JSX.Element} props.children The quote cards to be displayed
 * @returns {JSX.Element} - The QuoteRailSection component
 */
export const QuoteRailSection = ({ children, ...props }) => {
  return (
    <div
      className="tw:overflow-hidden tw:bg-primary-500 tw:py-12 tw:lg:py-10"
      {...props}
    >
      <div className="tw:relative tw:mx-auto tw:max-w-[1600px] tw:rounded-[20px] tw:lg:py-[60px] tw:xl:border tw:xl:border-white">
        <RailSection
          classname="tw:min-lg:px-20"
          shownavigation={false}
          carouseloptions={{
            spaceBetween: 32,
            slidesOffsetBefore: 20,
            slidesOffsetAfter: 20,
            breakpoints: {
              470: {
                slidesPerView: 1.7,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
              1312: {
                slidesPerView: 3,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
              },
            },
          }}
        >
          {children}
        </RailSection>

        <QuoteDecorationLeft />
        <QuoteDecorationRight />
      </div>
    </div>
  );
};

/**
 * Left quote decoration SVG
 */
const QuoteDecorationLeft = () => (
  <svg
    width="142"
    height="123"
    viewBox="0 0 142 123"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="tw:absolute tw:top-[100px] tw:-left-7 tw:z-0 tw:hidden tw:xl:block"
  >
    <path
      d="M140.456 27.1509L140.786 27.0313V26.6809V2V1.32504L140.14 1.52169C132.655 3.8013 125.601 6.79388 118.977 10.4998L118.977 10.4998L118.969 10.5046C112.621 14.2171 106.994 18.7868 102.089 24.2129C97.1748 29.3642 93.2746 35.3719 90.3871 42.2316C87.4934 49.106 86.049 56.5484 86.049 64.5532V122V122.5H86.549H140.286H140.786V122V64.5532V64.0532H140.286H114.564C114.642 55.2739 116.769 47.7401 120.924 41.4302C125.442 35.0043 131.943 30.2408 140.456 27.1509ZM54.9074 27.1509L55.2368 27.0313V26.6809V2V1.32504L54.5911 1.52169C47.1065 3.8013 40.0517 6.79388 33.4278 10.4998L33.4278 10.4998L33.4195 10.5046C27.0724 14.2171 21.4453 18.7869 16.5397 24.2129C11.6259 29.3642 7.72561 35.3719 4.83811 42.2316C1.9444 49.106 0.5 56.5484 0.5 64.5532V122V122.5H1H54.7368H55.2368V122V64.5532V64.0532H54.7368H29.0154C29.093 55.274 31.2196 47.7402 35.375 41.4303C39.8931 35.0043 46.3939 30.2408 54.9074 27.1509Z"
      fill="#FF480C"
      stroke="white"
    />
  </svg>
);

/**
 * Right quote decoration SVG
 */
const QuoteDecorationRight = () => (
  <svg
    width="142"
    height="123"
    viewBox="0 0 142 123"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="tw:absolute tw:-right-6 tw:bottom-[130px] tw:z-0 tw:hidden tw:rotate-180 tw:xl:block"
  >
    <path
      d="M140.456 27.1509L140.786 27.0313V26.6809V2V1.32504L140.14 1.52169C132.655 3.8013 125.601 6.79388 118.977 10.4998L118.977 10.4998L118.969 10.5046C112.621 14.2171 106.994 18.7868 102.089 24.2129C97.1748 29.3642 93.2746 35.3719 90.3871 42.2316C87.4934 49.106 86.049 56.5484 86.049 64.5532V122V122.5H86.549H140.286H140.786V122V64.5532V64.0532H140.286H114.564C114.642 55.2739 116.769 47.7401 120.924 41.4302C125.442 35.0043 131.943 30.2408 140.456 27.1509ZM54.9074 27.1509L55.2368 27.0313V26.6809V2V1.32504L54.5911 1.52169C47.1065 3.8013 40.0517 6.79388 33.4278 10.4998L33.4278 10.4998L33.4195 10.5046C27.0724 14.2171 21.4453 18.7869 16.5397 24.2129C11.6259 29.3642 7.72561 35.3719 4.83811 42.2316C1.9444 49.106 0.5 56.5484 0.5 64.5532V122V122.5H1H54.7368H55.2368V122V64.5532V64.0532H54.7368H29.0154C29.093 55.274 31.2196 47.7402 35.375 41.4303C39.8931 35.0043 46.3939 30.2408 54.9074 27.1509Z"
      fill="#FF480C"
      stroke="white"
    />
  </svg>
);
