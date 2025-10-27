/**
 * Storybook configuration for the VideoPlayer component
 * This defines how the VideoPlayer component will appear in Storybook and what controls/options are available.
 */

// Import the component
import VideoPlayer from './VideoPlayer';

// Define the story configuration
export default {
  // The title under which the VideoPlayer component will appear in Storybook's navigation
  title: 'Components/VideoPlayer',

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the component
  argTypes: {
    // Video URL
    url: {
      control: 'text',
      description:
        'The video URL to embed (supports Vimeo, YouTube, and other platforms)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },

    // Width
    width: {
      control: 'text',
      description: 'The width of the video player (e.g., "100%", "500px", 500)',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'undefined' },
      },
    },

    // Height
    height: {
      control: 'text',
      description:
        'The height of the video player (e.g., "auto", "300px", 300)',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'undefined' },
      },
    },

    // Video title
    title: {
      control: 'text',
      description: 'The title for the video iframe (for accessibility)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Video Player' },
      },
    },

    // Autoplay
    autoplay: {
      control: 'boolean',
      description: 'Whether to autoplay the video',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },

    // Muted
    muted: {
      control: 'boolean',
      description: 'Whether to mute the video initially',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },

    // Controls
    controls: {
      control: 'boolean',
      description: 'Whether to show video controls',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },

    // Background mode
    background: {
      control: 'boolean',
      description:
        'Whether to play in background mode (hides controls, enables autoplay and loop)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },

    // Fit mode (removed)

    // onplay callback
    onplay: {
      control: false,
      description: 'Callback function when video starts playing',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: '() => {}' },
      },
    },

    // Additional classnames
    classname: {
      control: 'text',
      description: 'Additional CSS classes to apply to the component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },

  // Added to override default story height if needed for this component
  parameters: {
    docs: {
      description: {
        component: `
A responsive video player component that embeds videos from various sources with configurable aspect ratios and dimensions.

### Features
- **Responsive Design**: Automatically adapts to container width while maintaining aspect ratio
- **Flexible Sizing**: Support for fixed width, height, or both dimensions
- **Multi-Platform Support**: Supports Vimeo, YouTube, and other video platforms
- **Auto Aspect Ratio**: Auto-detects video's intrinsic ratio via Vimeo oEmbed (falls back to 16:9 if unavailable)
- **API Integration**: Uses official Vimeo Player API and YouTube IFrame Player API for reliable event handling
- **Error Handling**: Displays error messages for invalid URLs
- **Accessibility**: Proper ARIA labels and semantic markup
- **Performance**: Optimized embed parameters

### Sizing Options
- **Responsive (default)**: Uses aspect ratio for responsive behavior
- **Fixed Width**: Set width prop, height calculated from aspect ratio
- **Fixed Height**: Set height prop, aspect ratio ignored
- **Fixed Dimensions**: Set both width and height props
        `,
      },
      story: {
        height: '400px',
      },
    },
  },
};

/**
 * Template for rendering the VideoPlayer component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => VideoPlayer(args);

/**
 * Default story.
 * Demonstrates basic usage with a standard Vimeo video.
 */
export const Default = Template.bind({});
Default.args = {
  url: 'https://vimeo.com/662689318?fl=pl&fe=vl', // Sample Vimeo video
  title: 'Sample Video',
};

/**
 * Autoplay and Muted story.
 * Demonstrates autoplay functionality (muted for browser policies).
 */
export const AutoplayMuted = Template.bind({});
AutoplayMuted.args = {
  url: 'https://vimeo.com/662689318?fl=pl&fe=vl',
  autoplay: true,
  muted: true,
  title: 'Autoplay Muted Video',
};

/**
 * Background Mode story.
 * Demonstrates background video mode (no controls, autoplay, loop).
 */
export const BackgroundMode = Template.bind({});
BackgroundMode.args = {
  url: 'https://vimeo.com/662689318?fl=pl&fe=vl',
  background: true,
  title: 'Background Video',
};

/**
 * No Controls story.
 * Demonstrates video without visible controls.
 */
export const NoControls = Template.bind({});
NoControls.args = {
  url: 'https://vimeo.com/662689318?fl=pl&fe=vl',
  controls: false,
  title: 'Video Without Controls',
};

/**
 * Error State story.
 * Demonstrates error handling with an invalid URL.
 */
export const ErrorState = Template.bind({});
ErrorState.args = {
  url: 'https://invalid-url.com/video',
  title: 'Invalid Video',
};

/**
 * With Play Event story.
 * Demonstrates video with play event handling.
 */
export const WithPlayEvent = Template.bind({});
WithPlayEvent.args = {
  url: 'https://vimeo.com/662689318?fl=pl&fe=vl',
  onplay: () => alert('Video play event captured!'),
  title: 'Video with Play Event',
};

/**
 * YouTube Video story.
 * Demonstrates YouTube video embedding and play event handling.
 */
export const YoutubeVideo = Template.bind({});
YoutubeVideo.args = {
  url: 'https://www.youtube.com/watch?v=r9cbT5HzQYo',
  title: 'YouTube Video Example',
  onplay: () => alert('YouTube video play event captured!'),
};

/**
 * Responsive Grid story.
 * Demonstrates multiple videos in a responsive grid layout.
 */
export const ResponsiveGrid = {
  render: () => {
    const videos = [
      { url: 'https://vimeo.com/662689318?fl=pl&fe=vl', title: 'Video 1' },
      { url: 'https://vimeo.com/662689318?fl=pl&fe=vl', title: 'Video 2' },
      { url: 'https://vimeo.com/662689318?fl=pl&fe=vl', title: 'Video 3' },
      { url: 'https://vimeo.com/662689318?fl=pl&fe=vl', title: 'Video 4' },
    ];

    return (
      <div className="tw:grid tw:grid-cols-1 tw:gap-6 tw:md:grid-cols-2 tw:lg:grid-cols-2">
        {videos.map((video, index) => (
          <VideoPlayer key={index} url={video.url} title={video.title} />
        ))}
      </div>
    );
  },
};
