import PageHeading from './PageHeading';
import Button from '../Button/Button';
import CalloutCard from '../CalloutCard/CalloutCard';
import Icons from '../Icons/Icons';

export default {
  title: 'Components/Page Heading',
  component: PageHeading,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The PageHeading component displays a standard page heading section. 
It includes a title, an optional button aligned to the right, and optional children content 
(like a CalloutCard) displayed below the heading.

### Features
- Displays a main title (H2).
- Customizable heading element type (default is 'h2').
- Optionally displays a list of buttons next to the title.
- Optionally renders children content below the title section.
- Responsive layout.
`,
      },

      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const props = Object.entries(args)
            .map(([key, value]) => {
              if (key === 'children') {
                return `${key}={${value}}`;
              }
              return `${key}={${JSON.stringify(value)}}`;
            })
            .join('\n  ');

          return `<PageHeading
  ${props}
/>`;
        },
      },
    },
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: '#FAF9F5' }],
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The main heading text.',
    },
    cta: {
      control: 'object',
      description: 'Optional list of button elements (JSX).',
    },
    children: {
      control: 'object',
      description: 'Optional children elements (JSX).',
    },

    classname: {
      control: 'text',
      description: 'Additional CSS classes for the container.',
    },
    childrenclassname: {
      control: 'text',
      description: 'Additional CSS classes for the children container.',
    },
  },
};

// --- Stories ---

export const Default = {
  args: {
    title: 'Default Page Heading',
  },
};

export const WithButton = {
  args: {
    title: 'Heading With Button',
    cta: [
      <Button
        variant="secondary"
        label="Optional Button"
        onclick={() => alert('Button clicked!')}
      />,
    ],
  },
};

export const WithChildren = {
  args: {
    title: 'Heading With Children Content',
    children: (
      <CalloutCard type="info">
        <p>
          This is child content, like a CalloutCard, displayed below the
          heading. You can put any JSX element here.
        </p>
      </CalloutCard>
    ),
  },
};

export const WithButtonAndChildren = {
  args: {
    title: 'Heading With Button and Children',
    cta: [
      <Button
        variant="primary"
        label="Action Button"
        iconright={<Icons.chevronRight />}
        onclick={() => alert('Action clicked!')}
      />,
    ],
    children: (
      <CalloutCard type="warning">
        <p>
          This CalloutCard is rendered as children below the heading and button.
          It demonstrates combining both optional props.
        </p>
      </CalloutCard>
    ),
  },
};

export const CustomClass = {
  args: {
    title: 'Heading With Custom Styling',
    classname: 'tw:bg-blue-100 tw:rounded-lg',
    children: (
      <p className="tw:mt-4 tw:text-center tw:text-blue-800">
        This heading has additional background and rounded corners via
        className.
      </p>
    ),
  },
};
