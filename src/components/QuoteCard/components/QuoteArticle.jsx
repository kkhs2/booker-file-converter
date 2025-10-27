import { h, Fragment } from 'preact';
import Icons from '../../Icons/Icons';
import Button from '../../Button/Button';

/**
 * QuoteArticle
 *
 * @description The QuoteArticle component renders a quote card with quote, author information, image, and optionally a related article.
 * @param {Object} props - The component props
 * @param {string} props.quote - The quote text to display
 * @param {string} props.author - The name of the quote's author
 * @param {string} props.location - The location or position of the author
 * @param {string} props.image - The URL of the author's image
 * @param {Object} [props.article] - Optional object containing article information
 * @param {string} props.article.description - The description of the related article
 * @param {string} props.article.href - The URL link to the full article
 *
 * @returns {JSX.Element} A quote card component with quote, author information, image, and optionally a related article
 */

export const QuoteArticle = ({
  quote,
  author,
  location,
  image,
  article = null,
}) => {
  return (
    <div className="tw:relative tw:flex tw:w-[337px] tw:flex-col tw:items-end tw:lg:ml-[176px] tw:lg:h-[769px] tw:lg:w-[914px] tw:lg:flex-row">
      {/* quote section */}
      <div className="tw:lg:absolute tw:lg:top-20 tw:lg:right-8 tw:lg:z-10">
        <div className="tw:relative tw:z-0 tw:flex tw:h-[239px] tw:max-w-[333px] tw:lg:h-[348px] tw:lg:max-w-[570px]">
          <div className="tw:p-6 tw:pb-14 tw:lg:pt-12 tw:lg:pr-3 tw:lg:pb-14 tw:lg:pl-[82px]">
            <p className="tw:line-clamp-5 tw:text-2xl tw:leading-[120%] tw:font-medium tw:text-primary tw:lg:text-5xl">
              {quote}
            </p>

            <div className="tw:mt-6 tw:flex tw:flex-col tw:text-sm">
              <span className="tw:font-medium">{author}</span>
              <span>{location}</span>
            </div>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="574"
            height="354"
            viewBox="0 0 574 354"
            fill="none"
            className="tw:absolute tw:top-0 tw:z-[-1] tw:hidden tw:transform tw:lg:block"
          >
            <mask
              id="path-1-outside-1_2435_15233"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="574"
              height="354"
              fill="black"
            >
              <rect fill="white" width="574" height="354" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M560 2C566.627 2 572 7.37259 572 14V325C572 331.627 566.627 337 560 337H101.02L86 350.112V337H14C7.37256 337 2 331.627 2 325V14C2 7.37259 7.37262 2 14 2H560Z"
              />
            </mask>
            <path
              d="M101.02 337L100.034 335.87L100.457 335.5H101.02V337ZM86 350.112L86.9865 351.242L84.5 353.413V350.112H86ZM86 337V335.5H87.5V337H86ZM570.5 14C570.5 8.20102 565.799 3.5 560 3.5V0.5C567.456 0.5 573.5 6.54416 573.5 14H570.5ZM570.5 325V14H573.5V325H570.5ZM560 335.5C565.799 335.5 570.5 330.799 570.5 325H573.5C573.5 332.456 567.456 338.5 560 338.5V335.5ZM101.02 335.5H560V338.5H101.02V335.5ZM85.0135 348.982L100.034 335.87L102.006 338.13L86.9865 351.242L85.0135 348.982ZM87.5 337V350.112H84.5V337H87.5ZM14 335.5H86V338.5H14V335.5ZM3.5 325C3.5 330.799 8.20099 335.5 14 335.5V338.5C6.54413 338.5 0.5 332.456 0.5 325H3.5ZM3.5 14V325H0.5V14H3.5ZM14 3.5C8.20105 3.5 3.5 8.20102 3.5 14H0.5C0.5 6.54416 6.54419 0.5 14 0.5V3.5ZM560 3.5H14V0.5H560V3.5Z"
              fill="#FF480C"
              mask="url(#path-1-outside-1_2435_15233)"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="337"
            height="245"
            viewBox="0 0 337 245"
            fill="none"
            className="tw:absolute tw:top-0 tw:z-[-1] tw:block tw:transform tw:lg:hidden"
          >
            <mask
              id="path-1-outside-1_2539_12116"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="337"
              height="245"
              fill="black"
            >
              <rect fill="white" width="337" height="245" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M323 2C329.627 2 335 7.37259 335 14V216C335 222.627 329.627 228 323 228H101.02L86 241.112V228H14C7.37259 228 2 222.627 2 216V14C2 7.37258 7.37259 2 14 2H323Z"
              />
            </mask>
            <path
              d="M101.02 228L100.034 226.87L100.457 226.5H101.02V228ZM86 241.112L86.9865 242.242L84.5 244.413V241.112H86ZM86 228V226.5H87.5V228H86ZM333.5 14C333.5 8.20101 328.799 3.5 323 3.5V0.5C330.456 0.5 336.5 6.54416 336.5 14H333.5ZM333.5 216V14H336.5V216H333.5ZM323 226.5C328.799 226.5 333.5 221.799 333.5 216H336.5C336.5 223.456 330.456 229.5 323 229.5V226.5ZM101.02 226.5H323V229.5H101.02V226.5ZM85.0135 239.982L100.034 226.87L102.006 229.13L86.9865 242.242L85.0135 239.982ZM87.5 228V241.112H84.5V228H87.5ZM14 226.5H86V229.5H14V226.5ZM3.5 216C3.5 221.799 8.20102 226.5 14 226.5V229.5C6.54416 229.5 0.5 223.456 0.5 216H3.5ZM3.5 14V216H0.5V14H3.5ZM14 3.5C8.20102 3.5 3.5 8.20101 3.5 14H0.5C0.5 6.54416 6.54416 0.5 14 0.5V3.5ZM323 3.5H14V0.5H323V3.5Z"
              fill="#FF480C"
              mask="url(#path-1-outside-1_2539_12116)"
            />
          </svg>
        </div>
      </div>

      <img
        src={image}
        alt={`${author}'s quote`}
        className="tw:z-10 tw:mt-[-48px] tw:rounded-lg tw:object-cover tw:lg:absolute tw:lg:bottom-0 tw:lg:left-0 tw:lg:z-[2] tw:lg:mt-auto tw:lg:ml-[-176px] tw:lg:w-[585px] tw:lg:max-w-[535px]"
      />

      {/* article section - only render if article is provided */}
      {article && (
        <div className="tw:bottom-0 tw:flex tw:w-full tw:flex-col tw:items-start tw:justify-end tw:gap-4 tw:rounded-[20px] tw:lg:absolute tw:lg:top-0 tw:lg:z-0 tw:lg:mt-auto tw:lg:h-[506px] tw:lg:w-[914px] tw:lg:items-end tw:lg:bg-white tw:lg:p-8">
          <div className="tw:flex tw:w-full tw:flex-row-reverse tw:items-start tw:justify-between tw:gap-4 tw:lg:flex-col tw:lg:items-end">
            <Icons.percentage classname="tw:flex-shirnk-0 tw:h-16 tw:w-16" />
            <p className="tw:max-w-[255px] tw:text-lg tw:lg:max-w-[350px] tw:lg:text-right">
              {article.description}
            </p>
          </div>

          <Button
            href={article.href}
            variant="tertiary"
            size="small"
            label="Read the article"
          />
        </div>
      )}
    </div>
  );
};
