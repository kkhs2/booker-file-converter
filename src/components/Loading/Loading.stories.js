import Loading from './Loading';

export default {
  title: 'Components/Loading',
  component: Loading,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        transform: (source, storyContext) => {
          // Get the story args
          const { args } = storyContext;
          if (!args) return source;

          // Convert args to JSX props string
          const props = Object.entries(args)

            .map(([key, value]) => {
              // Handle special cases
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

          return `<Loading\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
This component implements a loading spinner with customizable text as defined in the design system.

### Design Figma References
- [Loading UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=7336-112055&m=dev)
        `,
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Loading text to display below the spinner',
    },
    classname: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

// Default loading state
export const Default = {
  args: {
    text: 'Loading...',
  },
};

// Loading with custom text
export const CustomText = {
  args: {
    text: 'Loading your secure payment form.\nThis will only take a moment...',
  },
};

// Loading without text
export const NoText = {
  args: {
    text: '',
  },
};

// Loading with long text
export const LongText = {
  args: {
    text: 'Please wait while we process your request.\nThis may take a few moments to complete.\nThank you for your patience.',
  },
};
