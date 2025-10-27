import { h, Fragment } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { cn } from '../../../utils/helpers';
import Loading from '../Loading/Loading';

/**
 * VideoPlayer Component
 *
 * @description A responsive video player component that embeds videos from various sources with configurable aspect ratios.
 * Supports Vimeo, YouTube, and other video platforms. For Vimeo videos, it uses the official Vimeo Player API for reliable event handling.
 * For YouTube videos, it uses the YouTube IFrame Player API. For other video sources, it falls back to postMessage event handling.
 *
 * @param {Object} props - Component props
 * @param {string} props.url - The video URL to embed (supports Vimeo, YouTube, and other platforms)
 * @param {string|number} [props.width] - The width of the video player (e.g., '100%', '500px', 500)
 * @param {string|number} [props.height] - The height of the video player (e.g., 'auto', '300px', 300)
 * @param {string} [props.title] - The title for the video iframe (for accessibility)
 * @param {boolean} [props.autoplay=false] - Whether to autoplay the video
 * @param {boolean} [props.muted=false] - Whether to mute the video initially
 * @param {boolean} [props.controls=true] - Whether to show video controls
 * @param {boolean} [props.background=false] - Whether to play in background mode (hides controls, enables autoplay and loop)
 * @param {function} [props.onplay] - Callback function when video starts playing
 * @param {string} [props.classname] - Additional classes to add to the component
 * @returns {JSX.Element} Preact component - The VideoPlayer component
 */

const VideoPlayer = ({
  url,
  width,
  height,
  title = 'Video Player',
  autoplay = false,
  muted = false,
  controls = true,
  background = false,
  onplay = () => {},
  classname,
  ...props
}) => {
  const [embedUrl, setEmbedUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [sourceRatio, setSourceRatio] = useState(null);
  const iframeRef = useRef();

  /**
   * Extracts video ID from various Vimeo URL formats
   * @param {string} vimeoUrl - The Vimeo URL
   * @returns {string|null} - The video ID or null if invalid
   */
  const extractVimeoId = (vimeoUrl) => {
    if (!vimeoUrl) return null;

    const patterns = [
      /vimeo\.com\/(\d+)/, // https://vimeo.com/123456789
      /vimeo\.com\/album\/\d+\/video\/(\d+)/, // https://vimeo.com/album/1234/video/123456789
      /vimeo\.com\/channels\/[\w-]+\/(\d+)/, // https://vimeo.com/channels/channel-name/123456789
      /vimeo\.com\/groups\/[\w-]+\/videos\/(\d+)/, // https://vimeo.com/groups/group-name/videos/123456789
      /vimeo\.com\/ondemand\/[\w-]+\/(\d+)/, // https://vimeo.com/ondemand/movie-name/123456789
      /player\.vimeo\.com\/video\/(\d+)/, // https://player.vimeo.com/video/123456789
    ];

    for (const pattern of patterns) {
      const match = vimeoUrl.match(pattern);
      if (match) return match[1];
    }

    return null;
  };

  /**
   * Extracts video ID from various YouTube URL formats
   * @param {string} youtubeUrl - The YouTube URL
   * @returns {string|null} - The video ID or null if invalid
   */
  const extractYouTubeId = (youtubeUrl) => {
    if (!youtubeUrl) return null;

    const patterns = [
      /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/, // https://www.youtube.com/watch?v=dQw4w9WgXcQ
      /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/, // https://www.youtube.com/embed/dQw4w9WgXcQ
      /youtu\.be\/([a-zA-Z0-9_-]+)/, // https://youtu.be/dQw4w9WgXcQ
      /youtube\.com\/v\/([a-zA-Z0-9_-]+)/, // https://www.youtube.com/v/dQw4w9WgXcQ
      /youtube\.com\/.*[?&]v=([a-zA-Z0-9_-]+)/, // Various YouTube URL formats with v parameter
    ];

    for (const pattern of patterns) {
      const match = youtubeUrl.match(pattern);
      if (match) return match[1];
    }

    return null;
  };

  /**
   * Builds the Vimeo embed URL with parameters
   * @param {string} videoId - The Vimeo video ID
   * @returns {string} - The complete embed URL
   */
  const buildVimeoEmbedUrl = (videoId) => {
    const baseUrl = `https://player.vimeo.com/video/${videoId}`;
    const params = new URLSearchParams();

    // Enable API for postMessage events
    params.set('api', '1');
    // Enable all events
    params.set('events', '1');

    if (autoplay) params.set('autoplay', '1');
    if (muted) params.set('muted', '1');
    if (!controls || background) params.set('controls', '0');
    if (background) {
      params.set('background', '1');
      params.set('autoplay', '1');
      params.set('loop', '1');
      params.set('muted', '1');
    }

    // Additional parameters for better UX
    params.set('title', '0');
    params.set('byline', '0');
    params.set('portrait', '0');
    params.set('dnt', '1');

    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  /**
   * Builds the YouTube embed URL with parameters
   * @param {string} videoId - The YouTube video ID
   * @returns {string} - The complete embed URL
   */
  const buildYouTubeEmbedUrl = (videoId) => {
    const baseUrl = `https://www.youtube.com/embed/${videoId}`;
    const params = new URLSearchParams();

    // Enable API for postMessage events
    params.set('enablejsapi', '1');
    params.set('origin', window.location.origin);

    if (autoplay) params.set('autoplay', '1');
    if (muted) params.set('mute', '1');
    if (!controls || background) params.set('controls', '0');
    if (background) {
      params.set('autoplay', '1');
      params.set('loop', '1');
      params.set('mute', '1');
      params.set('playlist', videoId); // Required for loop to work
    }

    // Additional parameters for better UX
    params.set('modestbranding', '1');
    params.set('rel', '0');

    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  /**
   * Returns padding-bottom percentage from a numeric ratio (width/height)
   * @param {number|null} ratio - width/height ratio. If null, fallback to 16/9
   * @returns {string}
   */
  const getPaddingFromRatio = (ratio) => {
    const r =
      typeof ratio === 'number' && isFinite(ratio) && ratio > 0
        ? ratio
        : 16 / 9;
    return `${(1 / r) * 100}%`;
  };

  /**
   * Normalizes width/height values to CSS-compatible strings
   * @param {string|number} value - The width or height value
   * @returns {string} - The normalized CSS value
   */
  const normalizeDimension = (value) => {
    if (typeof value === 'number') {
      return `${value}px`;
    }
    return value;
  };

  /**
   * Creates the container style object based on props
   * @returns {Object} - The style object for the container
   */
  const getContainerStyle = () => {
    const style = {};

    if (width) {
      style.width = normalizeDimension(width);
    }

    if (height) {
      style.height = normalizeDimension(height);
    } else {
      // For reliable aspect ratio, use the padding-bottom technique
      // which works consistently across all browsers
      style.paddingBottom = getPaddingFromRatio(sourceRatio);
      style.height = 0;
    }

    return style;
  };

  useEffect(() => {
    if (!url) {
      setError('No video URL provided');
      setLoading(false);
      return;
    }

    const vimeoId = extractVimeoId(url);
    const youtubeId = extractYouTubeId(url);

    if (vimeoId) {
      // Handle Vimeo URLs
      const embedUrl = buildVimeoEmbedUrl(vimeoId);
      setEmbedUrl(embedUrl);
      setError('');
    } else if (youtubeId) {
      // Handle YouTube URLs
      const embedUrl = buildYouTubeEmbedUrl(youtubeId);
      setEmbedUrl(embedUrl);
      setError('');
    } else {
      // Handle other URLs - use URL as-is
      setEmbedUrl(url);
      setError('');
    }

    setLoading(false);
  }, [url, autoplay, muted, controls, background]);

  // Handle video play events using appropriate API based on video source
  useEffect(() => {
    if (!embedUrl || !onplay) return;

    const vimeoId = extractVimeoId(url);
    const youtubeId = extractYouTubeId(url);

    if (vimeoId) {
      // Handle Vimeo videos with Vimeo Player API
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.Vimeo && iframeRef.current) {
          const player = new window.Vimeo.Player(iframeRef.current);

          player.on('play', () => {
            onplay();
          });
        }
      };

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    } else if (youtubeId) {
      // Handle YouTube videos with YouTube IFrame Player API
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);

      // YouTube API callback
      const onYouTubeIframeAPIReady = () => {
        if (window.YT && iframeRef.current) {
          new window.YT.Player(iframeRef.current, {
            events: {
              onStateChange: (event) => {
                // YT.PlayerState.PLAYING = 1
                if (event.data === window.YT.PlayerState.PLAYING) {
                  onplay();
                }
              }
            }
          });
        }
      };

      // Set up the callback for when the API is ready
      if (window.YT && window.YT.loaded) {
        onYouTubeIframeAPIReady();
      } else {
        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
      }

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    } else {
      // Handle other videos with postMessage events
      const handleMessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.event === 'play' || data.event === 'playing') {
            onplay();
          }
        } catch (error) {
          // Ignore non-JSON messages
        }
      };

      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, [embedUrl, onplay, url]);

  useEffect(() => {
    if (!url) return;

    const videoId = extractVimeoId(url);
    if (!videoId) return; // Only fetch oEmbed for Vimeo videos

    let cancelled = false;
    const fetchOEmbed = async () => {
      try {
        const endpoint = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`;
        const res = await fetch(endpoint, { method: 'GET' });
        if (!res.ok) return; // silently ignore; we'll just fallback to 16:9
        const data = await res.json();
        if (!cancelled && data && data.width && data.height) {
          setSourceRatio(data.width / data.height);
        }
      } catch (error) {
        console.error('Failed to fetch Vimeo oEmbed data:', error);
      }
    };
    fetchOEmbed();
    return () => {
      cancelled = true;
    };
  }, [url]);

  // Error state
  if (error) {
    return (
      <div
        className={cn(
          'tw:flex tw:items-center tw:justify-center tw:rounded-lg tw:border tw:border-grey-300 tw:bg-grey-100 tw:p-8',
          classname,
        )}
        style={getContainerStyle()}
        {...props}
      >
        <div className="tw:text-center">
          <div className="tw:mb-2 tw:text-lg tw:font-medium tw:text-red-500">
            Video Error
          </div>
          <div className="tw:text-sm tw:text-grey-600">{error}</div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div
        className={cn(
          'tw:flex tw:animate-pulse tw:items-center tw:justify-center tw:rounded-lg tw:bg-grey-100 tw:p-8',
          classname,
        )}
        style={getContainerStyle()}
        {...props}
      >
        <Loading />
      </div>
    );
  }

  return (
    <div className={cn('tw:relative tw:w-full', classname)} {...props}>
      <div
        className="tw:relative tw:w-full tw:overflow-hidden tw:rounded-lg"
        style={getContainerStyle()}
      >
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={title}
          className="tw:absolute tw:top-0 tw:left-0 tw:h-full tw:w-full tw:border-0"
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
