/**
 * Storybook configuration for the RichContent component
 * This defines how the RichContent component will appear in Storybook and what controls/options are available.
 */

// Import the component
import { convertPropsToString } from '../../../utils/storybookHelpers';
import RichContent from './RichContent';

// Define the story configuration
export default {
  // The title under which the RichContent component will appear in Storybook's navigation
  title: 'Components/Rich Content',

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the component
  argTypes: {
    title: {
      control: 'text',
      description:
        'The text to display as a headline in the RichContent component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    titlesize: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'The font size of the title',
      table: {
        type: { summary: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'" },
        defaultValue: { summary: 'h3' },
      },
    },
    description: {
      control: 'text',
      description:
        'The text to display as description in the RichContent component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    mediatype: {
      control: 'select',
      options: ['image', 'video'],
      description: 'The type of media to display in the RichContent component',
      table: {
        type: { summary: "'image' | 'video'" },
        defaultValue: { summary: 'image' },
      },
    },
    mediasrc: {
      control: 'text',
      description:
        'The source URL of the media to display in the RichContent component. For Youtube and Vimeo videos, paste the page URL.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    isvideoexternal: {
      control: 'boolean',
      description:
        'Whether the video source is an external embed or a link to a video file',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    videothumbnail: {
      control: 'text',
      description:
        'The source URL of the video thumbnail to display in the RichContent component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    backgroundimage: {
      control: 'text',
      description:
        'The source URL of the background image to display in the RichContent component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    layout: {
      control: 'select',
      options: ['default', 'reverse'],
      description: 'The layout of the RichContent component',
      table: {
        type: { summary: "'default' | 'reverse'" },
        defaultValue: { summary: 'default' },
      },
    },
    onplay: {
      control: false,
      description: 'Callback function when video starts playing',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: '() => {}' },
      },
    },
  },

  // Added to override default story height if needed for this component
  parameters: {
    docs: {
      story: {
        height: '300px',
      },
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const props = convertPropsToString(args);

          return `<RichContent\n ${props}\n />`;
        },
      },
      description: {
        component: `
The Rich Content component is used to display copy along with an image or a video.

### Design Figma References
- [Rich Content UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=2764-24575&m=dev)
      `,
      },
    },
  },
};

/**
 * Reusable render method.
 * The args object provides dynamic values for different stories.
 */
const Render = (args) => (
  <div className="tw-container">
    <div className="tw:mx-auto tw:max-w-[1312px]">
      <RichContent {...args} />
    </div>
  </div>
);

/**
 * Default story.
 * Demonstrates basic usage with default settings.
 */

export const Default = {
  args: {
    title: 'Free range, grass fed, sustainable meat',
    description:
      'The UK boasts exceptional beef, pork, and lamb breeds, perfected in the 18th and 19th centuries for rich flavour and marbling. At Booker, we aim to bring heritage breeds back to your table. By choosing these meats, you support fair prices for farmers and traditional farming practices—no rush, no artificial additives, just sensible farming.',
    mediasrc: './images/steaks.jpg',
  },
  render: Render,
};

/**
 * Reverse Layout story.
 * Demonstrates component with reverse layout - image on the right.
 */
export const ReverseLayout = {
  args: {
    title: 'Free range, grass fed, sustainable meat',
    description:
      'The UK boasts exceptional beef, pork, and lamb breeds, perfected in the 18th and 19th centuries for rich flavour and marbling. At Booker, we aim to bring heritage breeds back to your table. By choosing these meats, you support fair prices for farmers and traditional farming practices—no rush, no artificial additives, just sensible farming.',
    mediatype: 'image',
    mediasrc: './images/steaks.jpg',
    layout: 'reverse',
  },
  // Added to override default story height and styling if needed for this component
  parameters: {
    docs: {
      story: {
        height: '600px',
      },
    },
  },

  render: Render,
};

/**
 * Alternate Layout story.
 * Demonstrates component with alternate layout, longer title and smaller title size.
 */
export const AlternateLayout = {
  args: {
    title:
      '“We’re signed up to Booker’s On Trade Club and the benefits are incredible. The deals are great and run across a really strong range of top quality brands. \n We are now buying so much more through Booker since joining the On Trade club that we have increased our delivery to twice a week. Ordering is also seamless.”',
    description: 'Simon Parton, Rodeo’s Smokehouse \n Wolverhampton',
    titlesize: 'h6',
    mediatype: 'image',
    mediasrc: './images/glass.jpg',
    backgroundimage: './images/background-glass.png',
    layout: 'alternate',
  },
  // Added to override default story height and styling if needed for this component
  parameters: {
    docs: {
      story: {
        height: '600px',
      },
    },
  },

  render: Render,
};

/**
 * Video asset story.
 * Demonstrates component with different a video and a custom thumbnail.
 */
export const Video = {
  args: {
    title: 'Free range, grass fed, sustainable meat',
    description:
      'The UK boasts exceptional beef, pork, and lamb breeds, perfected in the 18th and 19th centuries for rich flavour and marbling. At Booker, we aim to bring heritage breeds back to your table. By choosing these meats, you support fair prices for farmers and traditional farming practices—no rush, no artificial additives, just sensible farming.',
    mediatype: 'video',
    mediasrc: './images/hero/steak-video.mp4',
    videothumbnail: './images/landscape-with-cow.png',
    layout: 'reverse',
  },
  // Added to override default story height and styling if needed for this component
  parameters: {
    docs: {
      story: {
        height: '600px',
      },
    },
  },
  render: Render,
};

/**
 * Video asset story.
 * Demonstrates component with a video, a custom thumbnail and a background image.
 */
export const VideoWithBackground = {
  args: {
    title: 'Free range, grass fed, sustainable meat',
    description:
      'The UK boasts exceptional beef, pork, and lamb breeds, perfected in the 18th and 19th centuries for rich flavour and marbling. At Booker, we aim to bring heritage breeds back to your table. By choosing these meats, you support fair prices for farmers and traditional farming practices—no rush, no artificial additives, just sensible farming.',
    mediatype: 'video',
    mediasrc: './images/hero/steak-video.mp4',
    videothumbnail: './images/landscape-with-cow.png',
    backgroundimage: './images/background-grass.png',
  },
  // Added to override default story height and styling if needed for this component
  parameters: {
    docs: {
      story: {
        height: '600px',
      },
    },
  },
  render: Render,
};

/**
 * Video asset story.
 * Demonstrates component with a Youtube embed.
 */
export const VideoExternal = {
  args: {
    title: 'Free range, grass fed, sustainable meat',
    description:
      'The UK boasts exceptional beef, pork, and lamb breeds, perfected in the 18th and 19th centuries for rich flavour and marbling. At Booker, we aim to bring heritage breeds back to your table. By choosing these meats, you support fair prices for farmers and traditional farming practices—no rush, no artificial additives, just sensible farming.',
    mediatype: 'video',
    mediasrc: 'https://www.youtube.com/watch?v=chJkbirzTt0',
    isvideoexternal: true,
  },
  // Added to override default story height and styling if needed for this component
  parameters: {
    docs: {
      story: {
        height: '600px',
      },
    },
  },
  render: Render,
};

/**
 * Video with Play Event story.
 * Demonstrates component with video and play event handling.
 */
export const VideoWithPlayEvent = {
  args: {
    title: 'Free range, grass fed, sustainable meat',
    description:
      'The UK boasts exceptional beef, pork, and lamb breeds, perfected in the 18th and 19th centuries for rich flavour and marbling. At Booker, we aim to bring heritage breeds back to your table. By choosing these meats, you support fair prices for farmers and traditional farming practices—no rush, no artificial additives, just sensible farming.',
    mediatype: 'video',
    mediasrc: './images/hero/steak-video.mp4',
    videothumbnail: './images/landscape-with-cow.png',
    onplay: () => alert('Video play event captured!'),
  },
  parameters: {
    docs: {
      story: {
        height: '600px',
      },
    },
  },
  render: Render,
};

/**
 * All variations story.
 * Demonstrates different component configurations in a single view.
 */
export const AllVariations = {
  render: () => {
    const configs = [
      Default.args,
      ReverseLayout.args,
      Video.args,
      VideoWithBackground.args,
      VideoExternal.args,
      AlternateLayout.args,
    ];

    return (
      <div className="tw:flex tw:flex-col tw:space-y-4 tw:p-6">
        {configs.map((config, index) => (
          <div key={index}>{RichContent(config)}</div>
        ))}
      </div>
    );
  },
};
