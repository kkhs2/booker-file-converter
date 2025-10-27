/**
 * Storybook configuration for the Notification Bar component
 * This defines how the Notification Bar component will appear in Storybook and what controls/options are available.
 */

import NotificationBar from './NotificationBar';

export default {
  title: 'Components/Notification Bar',
  component: NotificationBar,
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
              if (typeof value === 'undefined' || typeof value === 'function') {
                return null;
              }
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

          return `<NotificationBar\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
A component that displays important notifications or alerts with expandable content.

### Design Figma References
- [NotificationBar UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=2518-25990&m=dev)
        `,
      },
    },
    layout: 'fullscreen',
  },

  argTypes: {
    // Variant
    variant: {
      control: { type: 'select' },
      options: ['error', 'info'],
      description: 'The visual style of the notification',
      table: {
        defaultValue: {
          summary: 'error',
        },
      },
    },

    // Icon
    icon: {
      control: false,
      description: 'Icon component to display',
      table: {
        type: { summary: 'JSX.Element' },
        defaultValue: {
          summary: '<Icons.info />',
        },
      },
    },

    // Message
    message: {
      control: 'text',
      description: 'Main message to display',
    },

    // Expanded Text
    expandedText: {
      control: 'text',
      description: 'Additional text shown when expanded',
    },

    // OnClose Callback
    onClose: {
      control: false,
      description: 'Callback function when close button is clicked',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: '() => {}' },
      },
    },

    // Expanded by default
    expanded: {
      control: 'boolean',
      description: 'Whether the notification is expanded by default',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

/**
 * Info Notification
 */
export const Info = {
  args: {
    variant: 'info',
    message: 'Online ordering will be unavailable Thu 2 Feb',
    expandedText:
      'Site maintenance is the process of regularly checking, updating, and managing a website to ensure it runs smoothly, securely, and efficiently. Regular maintenance helps provide a better user experience, keeps the site content relevant, and prevents technical issues that could harm performance or credibility.',
  },
};

/**
 * Error Notification
 */
export const Error = {
  args: {
    variant: 'error',
    message: 'Online ordering will be unavailable Thu 2 Feb',
    expandedText:
      'Site maintenance is the process of regularly checking, updating, and managing a website to ensure it runs smoothly, securely, and efficiently. Regular maintenance helps provide a better user experience, keeps the site content relevant, and prevents technical issues that could harm performance or credibility.',
  },
};

/**
 * Notification without expanded text
 */
export const NoExpandedText = {
  args: {
    variant: 'error',
    message: 'Online ordering will be unavailable Thu 2 Feb',
  },
};

/**
 * Expanded by default
 */
export const ExpandedByDefault = {
  args: {
    ...Error.args,
    expanded: true,
  },
};

/**
 * With close handler
 */
export const WithCloseHandler = {
  args: {
    ...Error.args,
    onClose: () => alert('Notification closed!'),
  },
};

/**
 * All variations story.
 * Demonstrates different component configurations in a single view.
 */
export const AllVariations = {
  render: () => (
    <div className="tw:flex tw:flex-col tw:space-y-4 tw:p-6">
      <div>
        <h3>Info Notification</h3>
        <NotificationBar {...Info.args} />
      </div>
      <div>
        <h3>Error Notification</h3>
        <NotificationBar {...Error.args} />
      </div>
      <div>
        <h3>Notification without expanded text</h3>
        <NotificationBar {...NoExpandedText.args} />
      </div>
      <div>
        <h3>Expanded by default</h3>
        <NotificationBar {...ExpandedByDefault.args} />
      </div>
      <div>
        <h3>With close handler</h3>
        <NotificationBar {...WithCloseHandler.args} />
      </div>
    </div>
  ),
};
