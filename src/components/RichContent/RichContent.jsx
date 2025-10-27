import { h, Fragment } from 'preact';
import { useRef, useState, useEffect } from 'preact/hooks';
import { cn } from '../../../utils/helpers';
import Icons from '../Icons/Icons';
import Typography from '../Typography/Typography';

/**
 * RichContent Component
 *
 * The RichContent component is used to display rich content with a title, description, and media.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - The text to display as a headline in the RichContent component
 * @param {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'} props.titlesize - The font size of the title
 * @param {string} props.description - The text to display in the RichContent component as description
 * @param {'image' | 'video'} props.mediatype - The type of media to display in the RichContent component
 * @param {string} props.mediasrc - The source URL of the media to display in the RichContent component
 * @param {boolean} props.isvideoexternal - Whether the video source is external or not
 * @param {string} props.videothumbnail - The source URL of the video thumbnail to display in the RichContent component
 * @param {string} props.backgroundimage - The source URL of the background image to display in the RichContent component
 * @param {'default' | 'reverse' | 'alternate'} props.layout - The layout of the RichContent component
 * @param {function} props.onplay - Callback function when video starts playing
 * @param {string} props.classname - Additional classes to add to the component
 * @returns {JSX.Element} Preact component - The RichContent component
 */

const constructEmbedUrl = (src) => {
  if (src.includes('youtube.com')) {
    const urlParams = new URLSearchParams(src.split('?')[1]);
    const youtubeId = urlParams.get('v');
    return `https://www.youtube.com/embed/${youtubeId}`;
  } else if (src.includes('vimeo.com')) {
    const vimeoId = src.split('/').pop();
    return `https://player.vimeo.com/video/${vimeoId}`;
  }
  return src;
};

const RichContent = ({
  title,
  titlesize = 'h3',
  description,
  mediatype = 'image',
  videothumbnail,
  backgroundimage,
  isvideoexternal = false,
  mediasrc,
  layout,
  onplay = () => {},
  classname,
  ...props
}) => {
  const titleLines = title.split('\n');
  const textLines = description.split('\n');
  const embedUrl = constructEmbedUrl(mediasrc);
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle external video play events (YouTube/Vimeo)
  useEffect(() => {
    if (!isvideoexternal) return;

    const handleMessage = (event) => {
      // Handle Vimeo events
      if (event.origin === 'https://player.vimeo.com') {
        try {
          const data = JSON.parse(event.data);
          if (data.event === 'play') {
            onplay();
          }
        } catch (e) {
          // Ignore parsing errors
        }
      }
      // Handle YouTube events
      else if (event.origin === 'https://www.youtube.com') {
        if (event.data && typeof event.data === 'string') {
          try {
            const data = JSON.parse(event.data);
            if (
              data.event === 'video-progress' &&
              data.info &&
              data.info.currentTime > 0
            ) {
              onplay();
            }
          } catch (e) {
            // Ignore parsing errors
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isvideoexternal, onplay]);

  if (mediatype === 'image' && layout !== 'alternate') {
    return (
      <div
        className={cn(
          'tw:flex tw:flex-col tw:items-center tw:rounded-[20px] tw:border tw:border-primary tw:p-3 tw:md:flex-row',
          layout === 'reverse' && 'tw:md:flex-row-reverse',
          classname,
        )}
        {...props}
      >
        <div className="tw:mb-6 tw:overflow-hidden tw:rounded-xl tw:md:mb-0 tw:lg:h-[534px] tw:lg:w-1/2 tw:xl:w-[735px] tw:xl:flex-shrink-0">
          <img
            src={mediasrc}
            alt="placeholder"
            className="tw:h-full tw:w-full tw:object-cover"
          />
        </div>

        <div className="tw:px-3 tw:pb-5 tw:md:px-8 tw:md:pb-0 tw:lg:w-1/2 tw:lg:px-16">
          {titleLines.map((line, index) => (
            <Typography
              key={index}
              domtype={titlesize}
              content={line}
              classname={'tw:text-primary tw:mb-5 tw:md:mb-8 tw:leading-[120%]'}
            />
          ))}
          {textLines.map((line, index) => (
            <Typography key={index} content={line} classname="tw:text-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (mediatype === 'video' || layout === 'alternate') {
    return (
      <div className="tw:relative tw:md:py-20">
        {backgroundimage && (
          <div className="tw:absolute tw:top-0 tw:left-0 tw:hidden tw:h-full tw:lg:block tw:lg:w-[552px]">
            <img
              src={backgroundimage}
              alt="background image"
              className="tw:h-full tw:w-full tw:rounded-[20px] tw:object-cover"
            />
          </div>
        )}
        <div className="tw:relative tw:flex tw:w-full tw:flex-col tw:items-center tw:rounded-[20px] tw:border tw:border-primary tw:p-3 tw:md:flex-row tw:md:border-0 tw:md:px-0 tw:md:py-[65px]">
          <div className="tw:absolute tw:top-0 tw:right-0 tw:hidden tw:h-full tw:w-full tw:max-w-[1086px] tw:md:flex">
            <div
              className={cn(
                'tw:min-w-[326px] tw:rounded-tl-[20px] tw:rounded-bl-[20px] tw:border tw:border-r-0 tw:border-primary',
                backgroundimage && 'tw:xl:border-white',
              )}
            ></div>
            <div className="tw:flex-1 tw:rounded-tr-[20px] tw:rounded-br-[20px] tw:border tw:border-l-0 tw:border-primary"></div>
          </div>

          <div
            className={cn(
              'tw:relative tw:mb-6 tw:w-full tw:overflow-hidden tw:rounded-2xl tw:md:mb-0 tw:md:h-[427px] tw:md:w-[759px]',
              backgroundimage &&
                'tw:md:h-[381px] tw:md:w-[695px] tw:md:shadow-[-32px_28px_52px_rgba(0,0,0,0.50)] tw:lg:ml-16',
            )}
          >
            {mediatype === 'video' && !isvideoexternal && (
              <>
                <video
                  ref={videoRef}
                  className="tw:h-full tw:w-full tw:object-cover"
                  muted
                  controls
                  onPlay={onplay}
                >
                  <source src={mediasrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {videothumbnail && !isPlaying && (
                  <div className="tw:absolute tw:top-0 tw:left-0 tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center">
                    <img
                      src={videothumbnail}
                      className="tw:absolute tw:h-full tw:w-full tw:object-cover"
                    />
                    <button
                      className="tw:relative tw:z-10 tw:cursor-pointer tw:transition-opacity tw:hover:opacity-80"
                      onClick={() => {
                        videoRef.current.play();
                        setIsPlaying(true);
                        onplay();
                      }}
                    >
                      <Icons.playButton />
                    </button>
                  </div>
                )}
              </>
            )}

            {mediatype === 'video' && isvideoexternal && (
              <iframe
                src={embedUrl}
                className="tw:h-full tw:w-full tw:object-cover"
                title="External video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullscreen
              ></iframe>
            )}

            {mediatype !== 'video' && (
              <img
                src={mediasrc}
                alt="placeholder"
                className="tw:h-full tw:w-full tw:object-cover"
              />
            )}
          </div>

          <div className="tw:w-full tw:px-3 tw:pb-5 tw:md:px-8 tw:md:pb-0 tw:lg:max-w-[553px] tw:lg:px-16 tw:lg:pr-[52px] tw:xl:w-full">
            {titleLines.map((line, index) => (
              <Typography
                key={index}
                domtype={titlesize}
                content={line}
                classname={cn(
                  'tw:text-primary tw:mb-5 tw:md:mb-8 tw:leading-[120%]',
                )}
              />
            ))}
            {textLines.map((line, index) => (
              <Typography key={index} content={line} classname="tw:text-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default RichContent;
