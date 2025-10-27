/**
 * Article card Component
 *
 * A component that displays an article card
 *
 * @param {Object} props - Component props
 * @param {string} props.image - Image source for the article
 * @param {string} props.imageclassname - Additional CSS classes for the image
 * @param {string} props.title - Title of the article
 * @param {string} props.url - URL to navigate to when clicked
 * @param {string} props.cta - Call to action text
 * @param {string} props.description - Description of the article
 * @param {"wide" | "narrow"} props.size - Size of the article card
 * @param {"inspiration" | "recipe" | "insights"} props.category - Category of the article
 * @param {string} props.classname - Additional CSS classes
 * @returns {JSX.Element} - The Article card component
 */

// Main Component
import { h, Fragment } from 'preact';
import { cn } from '../../../utils/helpers';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';

const ArticleCard = ({
  image,
  imageclassname,
  title,
  url,
  cta,
  description,
  size = 'wide',
  category = 'inspiration',
  classname,
  ...props
}) => {
  return (
    <div
      className={cn(
        'tw:max-w-xl tw:space-y-4',
        classname,
        size === 'wide' && 'tw:w-full',
        size === 'narrow' && 'tw:max-w-[320px]',
      )}
      {...props}
    >
      <div
        className={cn(
          'tw:max-h-[417px] tw:w-full tw:overflow-hidden tw:rounded-2xl',
          imageclassname,
        )}
      >
        <img
          src={image}
          alt={title}
          className={cn(
            'tw:w-full tw:rounded-2xl tw:object-cover tw:object-center',
            imageclassname,
          )}
        />
      </div>

      <div className="tw:relative tw:rounded-2xl tw:border tw:border-black tw:px-4 tw:py-6">
        <Typography
          domtype="h6"
          classname="tw:mb-3 tw:leading-tight tw:font-semibold"
        >
          {title}
        </Typography>

        <Typography classNam="tw:mb-6 tw:text-balance">
          {description}
        </Typography>
        <div className="tw:flex tw:items-end tw:justify-between">
          <Button variant="tertiary" size="small" href={url} label={cta} />

          <div className="tw:m-4 tw:h-12 tw:w-12">
            {category === 'inspiration' && (
              <svg
                width="64"
                height="65"
                viewBox="0 0 64 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_3948_12271)">
                  <mask id="path-2-inside-1_3948_12271" fill="white">
                    <path d="M0 8C0 3.58172 3.58172 0 8 0H56C60.4183 0 64 3.58172 64 8V56.8637C64 61.2819 60.4183 64.8637 56 64.8637H8C3.58172 64.8637 0 61.2819 0 56.8637V8Z" />
                  </mask>
                  <path
                    d="M8 1.5H56V-1.5H8V1.5ZM62.5 8V56.8637H65.5V8H62.5ZM56 63.3637H8V66.3637H56V63.3637ZM1.5 56.8637V8H-1.5V56.8637H1.5ZM8 63.3637C4.41015 63.3637 1.5 60.4535 1.5 56.8637H-1.5C-1.5 62.1104 2.7533 66.3637 8 66.3637V63.3637ZM62.5 56.8637C62.5 60.4535 59.5899 63.3637 56 63.3637V66.3637C61.2467 66.3637 65.5 62.1104 65.5 56.8637H62.5ZM56 1.5C59.5899 1.5 62.5 4.41015 62.5 8H65.5C65.5 2.75329 61.2467 -1.5 56 -1.5V1.5ZM8 -1.5C2.7533 -1.5 -1.5 2.75329 -1.5 8H1.5C1.5 4.41015 4.41015 1.5 8 1.5V-1.5Z"
                    fill="black"
                    mask="url(#path-2-inside-1_3948_12271)"
                  />
                  <path
                    d="M28.6923 14.7577C28.6923 22.4956 22.4355 28.7653 14.7212 28.7653C7.00685 28.7653 0.75 22.4956 0.75 14.7577C0.75 7.01969 7.00685 0.75 14.7212 0.75C22.4355 0.75 28.6923 7.01969 28.6923 14.7577Z"
                    fill="#FF480C"
                    stroke="black"
                    stroke-width="1.5"
                  />
                  <path
                    d="M63.0966 50.2424C63.0966 57.9804 56.8398 64.25 49.1255 64.25C41.4112 64.25 35.1543 57.9804 35.1543 50.2424C35.1543 42.5044 41.4112 36.2347 49.1255 36.2347C56.8398 36.2347 63.0966 42.5044 63.0966 50.2424Z"
                    fill="#FF480C"
                    stroke="black"
                    stroke-width="1.5"
                  />
                  <path
                    d="M43.3367 0L0.331055 60.3571"
                    stroke="black"
                    stroke-width="1.5"
                  />
                  <path
                    d="M63.847 4.64282L20.8413 64.6683"
                    stroke="black"
                    stroke-width="1.5"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3948_12271">
                    <path
                      d="M0 8C0 3.58172 3.58172 0 8 0H56C60.4183 0 64 3.58172 64 8V57C64 61.4183 60.4183 65 56 65H8C3.58172 65 0 61.4183 0 57V8Z"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
            )}
            {category === 'recipe' && (
              <svg
                width="64"
                height="65"
                viewBox="0 0 64 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_3948_12314)">
                  <mask id="path-2-inside-1_3948_12314" fill="white">
                    <path d="M0 6C0 2.68629 2.68629 0 6 0H58C61.3137 0 64 2.68629 64 6V58.8637C64 62.1774 61.3137 64.8637 58 64.8637H6C2.68629 64.8637 0 62.1774 0 58.8637V6Z" />
                  </mask>
                  <path
                    d="M6 1.5H58V-1.5H6V1.5ZM62.5 6V58.8637H65.5V6H62.5ZM58 63.3637H6V66.3637H58V63.3637ZM1.5 58.8637V6H-1.5V58.8637H1.5ZM6 63.3637C3.51472 63.3637 1.5 61.3489 1.5 58.8637H-1.5C-1.5 63.0058 1.85786 66.3637 6 66.3637V63.3637ZM62.5 58.8637C62.5 61.3489 60.4853 63.3637 58 63.3637V66.3637C62.1421 66.3637 65.5 63.0058 65.5 58.8637H62.5ZM58 1.5C60.4853 1.5 62.5 3.51472 62.5 6H65.5C65.5 1.85786 62.1421 -1.5 58 -1.5V1.5ZM6 -1.5C1.85787 -1.5 -1.5 1.85786 -1.5 6H1.5C1.5 3.51472 3.51472 1.5 6 1.5V-1.5Z"
                    fill="black"
                    mask="url(#path-2-inside-1_3948_12314)"
                  />
                  <path
                    d="M52.8418 3.81381C52.8418 31.5157 30.4409 53.9694 2.81199 53.9694C-24.8169 53.9694 -47.2178 31.5157 -47.2178 3.81381C-47.2178 -23.8881 -24.8169 -46.3418 2.81199 -46.3418C30.4409 -46.3418 52.8418 -23.8881 52.8418 3.81381Z"
                    stroke="#FF440C"
                    stroke-width="1.5"
                  />
                  <path
                    d="M27.6997 10.6123C27.6997 11.8482 26.7008 12.847 25.4724 12.847C24.2441 12.847 23.2451 11.8482 23.2451 10.6123C23.2451 9.37632 24.2441 8.37756 25.4724 8.37756C26.7008 8.37756 27.6997 9.37632 27.6997 10.6123Z"
                    fill="#FF440C"
                    stroke="black"
                    stroke-width="1.5"
                  />
                  <path
                    d="M27.3692 27.5255C27.3692 28.7614 26.3702 29.7602 25.1419 29.7602C23.9135 29.7602 22.9146 28.7614 22.9146 27.5255C22.9146 26.2895 23.9135 25.2908 25.1419 25.2908C26.3702 25.2908 27.3692 26.2895 27.3692 27.5255Z"
                    fill="#FF440C"
                    stroke="black"
                    stroke-width="1.5"
                  />
                  <path
                    d="M38.2857 18.903C38.2857 20.139 37.2867 21.1377 36.0584 21.1377C34.83 21.1377 33.8311 20.139 33.8311 18.903C33.8311 17.6671 34.83 16.6683 36.0584 16.6683C37.2867 16.6683 38.2857 17.6671 38.2857 18.903Z"
                    fill="#FF440C"
                    stroke="black"
                    stroke-width="1.5"
                  />
                  <path
                    d="M15.1292 33.8265C15.1292 35.0247 14.0949 36.0612 12.7365 36.0612C11.3781 36.0612 10.3438 35.0247 10.3438 33.8265C10.3438 32.6283 11.3781 31.5918 12.7365 31.5918C14.0949 31.5918 15.1292 32.6283 15.1292 33.8265Z"
                    fill="#FF440C"
                    stroke="black"
                    stroke-width="1.5"
                  />
                  <path
                    d="M14.7984 18.5715C14.7984 19.8074 13.7994 20.8062 12.5711 20.8062C11.3427 20.8062 10.3438 19.8074 10.3438 18.5715C10.3438 17.3355 11.3427 16.3368 12.5711 16.3368C13.7994 16.3368 14.7984 17.3355 14.7984 18.5715Z"
                    fill="#FF440C"
                    stroke="black"
                    stroke-width="1.5"
                  />
                  <path
                    d="M63.0968 3.81379C63.0968 37.1936 36.1045 64.25 2.81182 64.25C-30.4809 64.25 -57.4731 37.1936 -57.4731 3.81379C-57.4731 -29.566 -30.4809 -56.6224 2.81182 -56.6224C36.1045 -56.6224 63.0968 -29.566 63.0968 3.81379Z"
                    stroke="#FF440C"
                    stroke-width="1.5"
                  />
                  <mask id="path-11-inside-2_3948_12314" fill="white">
                    <path d="M0 8C0 3.58172 3.58172 0 8 0H56C60.4183 0 64 3.58172 64 8V56.8637C64 61.2819 60.4183 64.8637 56 64.8637H8C3.58172 64.8637 0 61.2819 0 56.8637V8Z" />
                  </mask>
                  <path
                    d="M8 1.5H56V-1.5H8V1.5ZM62.5 8V56.8637H65.5V8H62.5ZM56 63.3637H8V66.3637H56V63.3637ZM1.5 56.8637V8H-1.5V56.8637H1.5ZM8 63.3637C4.41015 63.3637 1.5 60.4535 1.5 56.8637H-1.5C-1.5 62.1104 2.7533 66.3637 8 66.3637V63.3637ZM62.5 56.8637C62.5 60.4535 59.5899 63.3637 56 63.3637V66.3637C61.2467 66.3637 65.5 62.1104 65.5 56.8637H62.5ZM56 1.5C59.5899 1.5 62.5 4.41015 62.5 8H65.5C65.5 2.75329 61.2467 -1.5 56 -1.5V1.5ZM8 -1.5C2.7533 -1.5 -1.5 2.75329 -1.5 8H1.5C1.5 4.41015 4.41015 1.5 8 1.5V-1.5Z"
                    fill="black"
                    mask="url(#path-11-inside-2_3948_12314)"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3948_12314">
                    <path
                      d="M0 8C0 3.58172 3.58172 0 8 0H56C60.4183 0 64 3.58172 64 8V57C64 61.4183 60.4183 65 56 65H8C3.58172 65 0 61.4183 0 57V8Z"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
            )}
            {category === 'insights' && (
              <svg
                width="64"
                height="65"
                viewBox="0 0 64 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_3948_12543)">
                  <mask id="path-1-inside-1_3948_12543" fill="white">
                    <path d="M0 8C0 3.58172 3.58172 0 8 0H56C60.4183 0 64 3.58172 64 8V57C64 61.4183 60.4183 65 56 65H8C3.58172 65 0 61.4183 0 57V8Z" />
                  </mask>
                  <mask id="path-3-inside-2_3948_12543" fill="white">
                    <path d="M0 8C0 3.58172 3.58172 0 8 0H56C60.4183 0 64 3.58172 64 8V56.8637C64 61.2819 60.4183 64.8637 56 64.8637H8C3.58172 64.8637 0 61.2819 0 56.8637V8Z" />
                  </mask>
                  <path
                    d="M8 1.5H56V-1.5H8V1.5ZM62.5 8V56.8637H65.5V8H62.5ZM56 63.3637H8V66.3637H56V63.3637ZM1.5 56.8637V8H-1.5V56.8637H1.5ZM8 63.3637C4.41015 63.3637 1.5 60.4535 1.5 56.8637H-1.5C-1.5 62.1104 2.7533 66.3637 8 66.3637V63.3637ZM62.5 56.8637C62.5 60.4535 59.5899 63.3637 56 63.3637V66.3637C61.2467 66.3637 65.5 62.1104 65.5 56.8637H62.5ZM56 1.5C59.5899 1.5 62.5 4.41015 62.5 8H65.5C65.5 2.75329 61.2467 -1.5 56 -1.5V1.5ZM8 -1.5C2.7533 -1.5 -1.5 2.75329 -1.5 8H1.5C1.5 4.41015 4.41015 1.5 8 1.5V-1.5Z"
                    fill="black"
                    mask="url(#path-3-inside-2_3948_12543)"
                  />
                  <rect
                    y="1.06197"
                    width="44.9377"
                    height="44.9377"
                    transform="matrix(0.706231 0.707981 -0.706231 0.707981 0.704588 0.264583)"
                    stroke="#FF440C"
                    stroke-width="1.5"
                  />
                  <rect
                    y="1.06197"
                    width="44.9377"
                    height="44.9377"
                    transform="matrix(0.706231 0.707981 -0.706231 0.707981 65.6348 0.264583)"
                    fill="#FF440C"
                    stroke="black"
                    stroke-width="1.5"
                  />
                  <mask id="path-7-inside-3_3948_12543" fill="white">
                    <path d="M0 6C0 2.68629 2.68629 0 6 0H58C61.3137 0 64 2.68629 64 6V58.8637C64 62.1774 61.3137 64.8637 58 64.8637H6C2.68629 64.8637 0 62.1774 0 58.8637V6Z" />
                  </mask>
                  <path
                    d="M6 1.5H58V-1.5H6V1.5ZM62.5 6V58.8637H65.5V6H62.5ZM58 63.3637H6V66.3637H58V63.3637ZM1.5 58.8637V6H-1.5V58.8637H1.5ZM6 63.3637C3.51472 63.3637 1.5 61.3489 1.5 58.8637H-1.5C-1.5 63.0058 1.85786 66.3637 6 66.3637V63.3637ZM62.5 58.8637C62.5 61.3489 60.4853 63.3637 58 63.3637V66.3637C62.1421 66.3637 65.5 63.0058 65.5 58.8637H62.5ZM58 1.5C60.4853 1.5 62.5 3.51472 62.5 6H65.5C65.5 1.85786 62.1421 -1.5 58 -1.5V1.5ZM6 -1.5C1.85787 -1.5 -1.5 1.85786 -1.5 6H1.5C1.5 3.51472 3.51472 1.5 6 1.5V-1.5Z"
                    fill="black"
                    mask="url(#path-7-inside-3_3948_12543)"
                  />
                </g>
                <path
                  d="M8 1.5H56V-1.5H8V1.5ZM62.5 8V57H65.5V8H62.5ZM56 63.5H8V66.5H56V63.5ZM1.5 57V8H-1.5V57H1.5ZM8 63.5C4.41015 63.5 1.5 60.5899 1.5 57H-1.5C-1.5 62.2467 2.75329 66.5 8 66.5V63.5ZM62.5 57C62.5 60.5899 59.5899 63.5 56 63.5V66.5C61.2467 66.5 65.5 62.2467 65.5 57H62.5ZM56 1.5C59.5899 1.5 62.5 4.41015 62.5 8H65.5C65.5 2.75329 61.2467 -1.5 56 -1.5V1.5ZM8 -1.5C2.7533 -1.5 -1.5 2.75329 -1.5 8H1.5C1.5 4.41015 4.41015 1.5 8 1.5V-1.5Z"
                  fill="black"
                  mask="url(#path-1-inside-1_3948_12543)"
                />
                <defs>
                  <clipPath id="clip0_3948_12543">
                    <path
                      d="M0 8C0 3.58172 3.58172 0 8 0H56C60.4183 0 64 3.58172 64 8V57C64 61.4183 60.4183 65 56 65H8C3.58172 65 0 61.4183 0 57V8Z"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
