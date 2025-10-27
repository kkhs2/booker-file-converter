import { h, Fragment } from 'preact';

/**
 * QuoteSimple component
 *
 * @description Renders quote with an image of the author and content below
 * @param {Object} props - The props of the component
 * @param {string} props.quote - The quote to be displayed
 * @param {string} props.author - The author of the quote
 * @param {string} props.location - The location of the author
 * @param {string} props.image - The image of the author
 * @param {string} props.imagebackground - The background image
 * @returns {JSX.Element} - The QuoteSimple component
 */

export const QuoteSimple = ({
  quote,
  author,
  location,
  image,
  imagebackground,
}) => {
  return (
    <div className="tw:relative tw:flex tw:flex-col tw:items-center tw:justify-between tw:rounded-[20px] tw:bg-white tw:pb-6">
      <div className="tw:relative tw:h-[286px] tw:w-full tw:overflow-hidden tw:rounded-t-[20px]">
        <img
          src={image}
          alt={`${author}'s quote`}
          className="tw:absolute tw:z-[10] tw:h-[360px] tw:w-full tw:rounded-xl tw:object-contain tw:lg:h-[363px]"
        />
        <div
          className="tw:absolute tw:top-0 tw:z-0 tw:h-full tw:w-full tw:bg-cover"
          style={{ backgroundImage: `url(${imagebackground})` }}
        />
      </div>

      <div className="tw:relative tw:z-[2] tw:mx-auto tw:mt-[-90px] tw:h-[326px] tw:w-[260px] tw:space-y-4 tw:lg:mt-[-110px] tw:lg:h-[348px] tw:lg:w-[298px] tw:lg:space-y-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="302"
          height="354"
          viewBox="0 0 302 354"
          fill="none"
          className="tw:absolute tw:top-0 tw:left-0 tw:z-10 tw:hidden tw:lg:block"
        >
          <mask
            id="path-1-outside-1_2435_15350"
            maskUnits="userSpaceOnUse"
            x="0"
            y="-0.116211"
            width="302"
            height="354"
            fill="black"
          >
            <rect fill="white" y="-0.116211" width="302" height="354" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M288 1.88379C294.627 1.88379 300 7.25637 300 13.8838V324.884C300 331.511 294.627 336.884 288 336.884H44.02L29 349.996V336.884H14C7.37259 336.884 2 331.511 2 324.884V13.8838C2 7.25637 7.37259 1.88379 14 1.88379H288Z"
            />
          </mask>
          <path
            d="M44.02 336.884L43.0335 335.754L43.4574 335.384H44.02V336.884ZM29 349.996L29.9865 351.126L27.5 353.297V349.996H29ZM29 336.884V335.384H30.5V336.884H29ZM298.5 13.8838C298.5 8.0848 293.799 3.38379 288 3.38379V0.383789C295.456 0.383789 301.5 6.42795 301.5 13.8838H298.5ZM298.5 324.884V13.8838H301.5V324.884H298.5ZM288 335.384C293.799 335.384 298.5 330.683 298.5 324.884H301.5C301.5 332.34 295.456 338.384 288 338.384V335.384ZM44.02 335.384H288V338.384H44.02V335.384ZM28.0135 348.866L43.0335 335.754L45.0065 338.014L29.9865 351.126L28.0135 348.866ZM30.5 336.884V349.996H27.5V336.884H30.5ZM14 335.384H29V338.384H14V335.384ZM3.5 324.884C3.5 330.683 8.20102 335.384 14 335.384V338.384C6.54416 338.384 0.5 332.34 0.5 324.884H3.5ZM3.5 13.8838V324.884H0.5V13.8838H3.5ZM14 3.38379C8.20102 3.38379 3.5 8.0848 3.5 13.8838H0.5C0.5 6.42794 6.54416 0.383789 14 0.383789V3.38379ZM288 3.38379H14V0.383789H288V3.38379Z"
            fill="#FF480C"
            mask="url(#path-1-outside-1_2435_15350)"
          />
        </svg>

        <svg
          width="262"
          height="333"
          viewBox="0 0 264 333"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="tw:absolute tw:top-0 tw:left-0 tw:z-10 tw:block tw:lg:hidden"
        >
          <mask
            id="path-1-outside-1_2539_12397"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="264"
            height="333"
            fill="black"
          >
            <rect fill="white" width="264" height="333" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M250 2C256.627 2 262 7.37258 262 14V299C262 305.627 256.627 311 250 311H53.6143L33 328.996V311H14C7.37257 311 2 305.627 2 299V14C2 7.37258 7.37257 2 14 2H250Z"
            />
          </mask>
          <path
            d="M53.6143 311L52.6279 309.87L53.0517 309.5H53.6143V311ZM33 328.996L33.9865 330.126L31.5 332.297V328.996H33ZM33 311V309.5H34.5V311H33ZM260.5 14C260.5 8.201 255.799 3.5 250 3.5V0.5C257.456 0.5 263.5 6.54415 263.5 14H260.5ZM260.5 299V14H263.5V299H260.5ZM250 309.5C255.799 309.5 260.5 304.799 260.5 299H263.5C263.5 306.456 257.456 312.5 250 312.5V309.5ZM53.6143 309.5H250V312.5H53.6143V309.5ZM32.0135 327.866L52.6279 309.87L54.6008 312.13L33.9865 330.126L32.0135 327.866ZM34.5 311V328.996H31.5V311H34.5ZM14 309.5H33V312.5H14V309.5ZM3.5 299C3.5 304.799 8.201 309.5 14 309.5V312.5C6.54414 312.5 0.5 306.456 0.5 299H3.5ZM3.5 14V299H0.5V14H3.5ZM14 3.5C8.201 3.5 3.5 8.20101 3.5 14H0.5C0.5 6.54416 6.54414 0.5 14 0.5V3.5ZM250 3.5H14V0.5H250V3.5Z"
            fill="#FF480C"
            mask="url(#path-1-outside-1_2539_12397)"
          />
        </svg>

        <p className="tw:px-4.5 tw:pt-[112px] tw:text-lg tw:font-[400] tw:lg:px-6 tw:lg:pt-[132px] tw:lg:text-xl">
          <svg
            width="21"
            height="19"
            viewBox="0 0 21 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="tw:mr-2 tw:inline tw:flex-shrink-0"
          >
            <path
              d="M21 4.58592C19.7037 5.054 18.7099 5.77741 18.0185 6.75613C17.3704 7.73485 17.0463 8.90507 17.0463 10.2668H21V18.8838H12.8981V10.2668C12.8981 9.07528 13.1142 7.9689 13.5463 6.94762C13.9784 5.92634 14.5617 5.03273 15.2963 4.26677C16.0309 3.45826 16.8735 2.77741 17.8241 2.22422C18.8179 1.67102 19.8765 1.22422 21 0.883789V4.58592ZM8.10185 4.58592C6.80556 5.054 5.81173 5.77741 5.12037 6.75613C4.47222 7.73485 4.14815 8.90507 4.14815 10.2668H8.10185V18.8838H0V10.2668C0 9.07528 0.216049 7.9689 0.648148 6.94762C1.08025 5.92634 1.66358 5.03273 2.39815 4.26677C3.13272 3.45826 3.97531 2.77741 4.92593 2.22422C5.91975 1.67102 6.9784 1.22422 8.10185 0.883789V4.58592Z"
              fill="#FF480C"
            />
          </svg>
          {quote}
        </p>

        <div className="tw:mx-4.5 tw:flex tw:flex-col tw:lg:mx-6">
          <span className="tw:text-[11px] tw:lg:text-sm">{author}</span>
          <span className="tw:text-[11px] tw:font-light tw:lg:text-sm">
            {location}
          </span>
        </div>
      </div>
    </div>
  );
};
