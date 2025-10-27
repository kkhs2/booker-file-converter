/**
 * Storybook configuration for the TrackDeliveries component
 * This defines how the TrackDeliveries component will appear in Storybook and what controls/options are available.
 */

// Import the TrackDeliveries component
import TrackDeliveries from './TrackDeliveries';

// Define the story configuration
export default {
  title: 'Components/Track Deliveries',
  component: TrackDeliveries,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        transform: (source, storyContext) => {
          // Get the story args
          const { args } = storyContext;
          if (!args) return source;

          // Convert args to JSX props string
          const props = Object.entries(args)
            .map(([key, value]) => {
              if (typeof value === 'boolean') {
                return value ? key : null;
              }
              if (typeof value === 'string') {
                return `${key}="${value}"`;
              }
              return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<TrackDeliveries\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
This component displays delivery tracking information with a QR code, track tag ID, and action buttons.

## Features
- QR code display with "SCAN ME" label
- Track tag ID display
- Print QR Code button
- Generate new TrackTag button
- Copy tracking URL functionality
- Responsive design for mobile and desktop

## Usage
The component accepts props for customizing the track tag ID, QR code URL, and tracking URL.
        `,
      },
    },
    layout: 'padded',
  },
  argTypes: {
    tracktagid: {
      control: 'text',
      description: 'The tracking ID for the delivery',
      defaultValue: 'TFG 191 8452',
    },
    qrcodeurl: {
      control: 'text',
      description: 'URL for the QR code image',
    },
    trackingurl: {
      control: 'text',
      description: 'URL for the tracking page',
      defaultValue: 'www.booker.co.uk/track-tag',
    },
    onprint: {
      action: 'print',
      description: 'Callback function for print action',
    },
    ongeneratetag: {
      action: 'generate tag',
      description: 'Callback function for generating a new TrackTag',
    },
    allowgeneratetag: {
      control: 'boolean',
      description: 'Enable or disable the Generate new TrackTag button',
      defaultValue: true,
    },
    classname: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

// Default story
export const Default = {
  args: {
    tracktagid: 'TFG 191 8452',
    trackingurl: 'www.booker.co.uk/track-tag',
    qrcodeurl: './images/qrcode.png',
    onprint: () => console.log('Print QR Code clicked'),
    ongeneratetag: () => console.log('Generate new TrackTag clicked'),
    allowgeneratetag: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'The default TrackDeliveries component with standard tracking information.',
      },
    },
  },
};

export const NoGenerateTag = {
  args: {
    tracktagid: 'TFG 191 8452',
    trackingurl: 'www.booker.co.uk/track-tag',
    qrcodeurl: './images/qrcode.png',
    onprint: () => console.log('Print QR Code clicked'),
    ongeneratetag: () => console.log('Generate new TrackTag clicked'),
    allowgeneratetag: false,
  },
};
