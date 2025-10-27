/**
 * Storybook configuration for the Typography component
 * This defines how the Typography component will appear in Storybook and what controls/options are available.
 */

import Typography from './Typography';

export default {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const props = Object.entries(args)
            .map(([key, value]) => {
              if (typeof value === 'string') {
                return `${key}="${value}"`;
              }
              return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<Typography\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
This component implements the typography styles defined in the Figma design system.

### Design Figma References
- [Typography UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=11-454&m=dev)

### Usage Guidelines
- Use appropriate semantic HTML elements (h1-h5 for headings)
- Follow the defined type scale for consistent visual hierarchy
- Maintain responsive behavior between mobile and desktop breakpoints
        `,
      },
    },
  },

  argTypes: {
    // DOM Type
    domtype: {
      control: 'select',
      options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'span', 'div'],
      description: 'HTML element type',
      defaultValue: 'p',
    },

    // Mobile Font Size
    mobilefontsize: {
      control: 'select',
      options: [
        'tw:text-9xl', // 88px
        'tw:text-8xl', // 60px
        'tw:text-7xl', // 48px
        'tw:text-6xl', // 40px
        'tw:text-5xl', // 32px
        'tw:text-4xl', // 28px
        'tw:text-3xl', // 24px
        'tw:text-2xl', // 20px
        'tw:text-xl', // 18px
        'tw:text-lg', // 16px
        'tw:text-base', // 14px
        'tw:text-13', // 13px
        'tw:text-sm', // 12px
        'tw:text-2xs', // 11px
        'tw:text-xs', // 10px
      ],
      description: 'Text size for mobile devices',
      defaultValue: 'tw:text-base',
    },

    // Desktop Font Size
    desktopfontsize: {
      control: 'select',
      options: [
        'tw:lg:text-9xl', // 88px
        'tw:lg:text-8xl', // 60px
        'tw:lg:text-7xl', // 48px
        'tw:lg:text-6xl', // 40px
        'tw:lg:text-5xl', // 32px
        'tw:lg:text-4xl', // 28px
        'tw:lg:text-3xl', // 24px
        'tw:lg:text-2xl', // 20px
        'tw:lg:text-xl', // 18px
        'tw:lg:text-lg', // 16px
        'tw:lg:text-base', // 14px
        'tw:lg:text-13', // 13px
        'tw:lg:text-sm', // 12px
        'tw:lg:text-2xs', // 11px
        'tw:lg:text-xs', // 10px
      ],
      description: 'Text size for desktop devices',
      defaultValue: 'tw:lg:text-lg',
    },

    // Weight
    weight: {
      control: 'select',
      options: [
        'tw:font-light',
        'tw:font-normal',
        'tw:font-medium',
        'tw:font-semibold',
        'tw:font-bold',
      ],
      description: 'Font weight',
      defaultValue: 'tw:font-normal',
    },

    // Content
    content: {
      control: 'text',
      description: 'Text content to display',
      table: {
        type: {
          summary: 'string|VNode',
        },
      },
    },

    // Class Name
    classname: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

const Template = (args) => <Typography {...args} />;

export const TypographyGuidelines = () => {
  const createSection = (title, styles) => (
    <div className="tw:flex tw:flex-col tw:gap-6">
      <h2 className="tw:border-b tw:pb-2 tw:text-xl tw:font-bold">{title}</h2>
      {styles.map(({ name, mobileSize, desktopSize, classes }) => (
        <div
          key={name}
          className="tw:grid tw:grid-cols-[1fr_200px_200px_300px] tw:items-center tw:gap-4"
        >
          <Typography
            content={name}
            mobilefontsize={classes.split(' ')[0]}
            desktopfontsize={classes.split(' ')[1]}
            weight="tw:font-normal"
          />
          <div className="tw:text-sm tw:text-grey-600">
            <div>Mobile: {mobileSize}</div>
            <div>Desktop: {desktopSize}</div>
          </div>
          <code className="tw:rounded tw:bg-grey-100 tw:p-1 tw:text-sm">
            {classes}
          </code>
        </div>
      ))}
    </div>
  );

  const headingStyles = [
    {
      name: 'Heading 1',
      mobileSize: '48px',
      desktopSize: '88px',
      classes: 'tw:text-7xl tw:lg:text-9xl',
    },
    {
      name: 'Heading 2',
      mobileSize: '40px',
      desktopSize: '60px',
      classes: 'tw:text-6xl tw:lg:text-8xl',
    },
    {
      name: 'Heading 3',
      mobileSize: '28px',
      desktopSize: '48px',
      classes: 'tw:text-4xl tw:lg:text-7xl',
    },
    {
      name: 'Heading 4',
      mobileSize: '24px',
      desktopSize: '40px',
      classes: 'tw:text-3xl tw:lg:text-6xl',
    },
    {
      name: 'Heading 5',
      mobileSize: '20px',
      desktopSize: '32px',
      classes: 'tw:text-2xl tw:lg:text-5xl',
    },
  ];

  const bodyStyles = [
    {
      name: 'Sub-Heading 1',
      mobileSize: '18px',
      desktopSize: '24px',
      classes: 'tw:text-xl tw:lg:text-3xl',
    },
    {
      name: 'Sub-Heading 2',
      mobileSize: '16px',
      desktopSize: '18px',
      classes: 'tw:text-lg tw:lg:text-xl',
    },
    {
      name: 'Body Large',
      mobileSize: '18px',
      desktopSize: '18px',
      classes: 'tw:text-xl tw:lg:text-xl',
    },
    {
      name: 'Body Medium',
      mobileSize: '16px',
      desktopSize: '16px',
      classes: 'tw:text-lg tw:lg:text-lg',
    },
    {
      name: 'Body Small',
      mobileSize: '13px',
      desktopSize: '14px',
      classes: 'tw:text-13 tw:lg:text-base',
    },
    {
      name: 'Button Medium',
      mobileSize: '14px',
      desktopSize: '16px',
      classes: 'tw:text-base tw:lg:text-lg',
    },
    {
      name: 'Button Small',
      mobileSize: '12px',
      desktopSize: '14px',
      classes: 'tw:text-sm tw:lg:text-base',
    },
    {
      name: 'Label Small',
      mobileSize: '12px',
      desktopSize: '14px',
      classes: 'tw:text-sm tw:lg:text-base',
    },
    {
      name: 'Label Extra Small',
      mobileSize: '11px',
      desktopSize: '12px',
      classes: 'tw:text-2xs tw:lg:text-sm',
    },
    {
      name: 'Micro',
      mobileSize: '10px',
      desktopSize: '11px',
      classes: 'tw:text-xs tw:lg:text-2xs',
    },
  ];

  return (
    <div className="tw:flex tw:flex-col tw:gap-8 tw:p-6">
      {createSection('Heading Styles', headingStyles)}
      {createSection('Body & UI Styles', bodyStyles)}
    </div>
  );
};

// Individual stories with their specific configurations
export const Heading1 = Template.bind({});
Heading1.args = {
  domtype: 'h1',
  mobilefontsize: 'tw:text-7xl',
  desktopfontsize: 'tw:lg:text-9xl',
  weight: 'tw:font-normal',
  content: 'The quick brown fox jumps over the lazy dog',
};

export const Heading2 = Template.bind({});
Heading2.args = {
  domtype: 'h2',
  mobilefontsize: 'tw:text-6xl',
  desktopfontsize: 'tw:lg:text-8xl',
  weight: 'tw:font-medium',
  content: 'The quick brown fox jumps over the lazy dog',
};

export const Heading3 = Template.bind({});
Heading3.args = {
  domtype: 'h3',
  mobilefontsize: 'tw:text-4xl',
  desktopfontsize: 'tw:lg:text-7xl',
  weight: 'tw:font-medium',
  content: 'The quick brown fox jumps over the lazy dog',
};

export const Heading4 = Template.bind({});
Heading4.args = {
  domtype: 'h4',
  mobilefontsize: 'tw:text-3xl',
  desktopfontsize: 'tw:lg:text-6xl',
  weight: 'tw:font-medium',
  content: 'The quick brown fox jumps over the lazy dog',
};

export const Heading5 = Template.bind({});
Heading5.args = {
  domtype: 'h5',
  mobilefontsize: 'tw:text-2xl',
  desktopfontsize: 'tw:lg:text-5xl',
  weight: 'tw:font-medium',
  content: 'The quick brown fox jumps over the lazy dog',
};

export const SubHeading1 = Template.bind({});
SubHeading1.args = {
  mobilefontsize: 'tw:text-xl',
  desktopfontsize: 'tw:lg:text-3xl',
  weight: 'tw:font-medium',
  content: 'The quick brown fox jumps over the lazy dog',
};

export const SubHeading2 = Template.bind({});
SubHeading2.args = {
  mobilefontsize: 'tw:text-lg',
  desktopfontsize: 'tw:lg:text-xl',
  weight: 'tw:font-medium',
  content: 'The quick brown fox jumps over the lazy dog',
};

export const BodyLarge = Template.bind({});
BodyLarge.args = {
  mobilefontsize: 'tw:text-xl',
  desktopfontsize: 'tw:lg:text-xl',
  weight: 'tw:font-normal',
  content: 'The quick brown fox jumps over the lazy dog',
};

export const BodyMedium = Template.bind({});
BodyMedium.args = {
  mobilefontsize: 'tw:text-lg',
  desktopfontsize: 'tw:lg:text-lg',
  weight: 'tw:font-normal',
  content: 'The quick brown fox jumps over the lazy dog',
};

export const BodySmall = Template.bind({});
BodySmall.args = {
  mobilefontsize: 'tw:text-sm',
  desktopfontsize: 'tw:lg:text-base',
  weight: 'tw:font-normal',
  content: 'The quick brown fox jumps over the lazy dog',
};

export const ButtonMedium = Template.bind({});
ButtonMedium.args = {
  mobilefontsize: 'tw:text-base',
  desktopfontsize: 'tw:lg:text-lg',
  weight: 'tw:font-medium',
  content: 'The quick brown fox jumps over the lazy dog',
};

export const ButtonSmall = Template.bind({});
ButtonSmall.args = {
  mobilefontsize: 'tw:text-sm',
  desktopfontsize: 'tw:lg:text-base',
  weight: 'tw:font-medium',
  content: 'The quick brown fox jumps over the lazy dog',
};

export const LabelSmall = Template.bind({});
LabelSmall.args = {
  mobilefontsize: 'tw:text-sm',
  desktopfontsize: 'tw:lg:text-base',
  weight: 'tw:font-medium',
  content: 'The quick brown fox jumps over the lazy dog',
};

export const LabelExtraSmall = Template.bind({});
LabelExtraSmall.args = {
  mobilefontsize: 'tw:text-2xs',
  desktopfontsize: 'tw:lg:text-sm',
  weight: 'tw:font-medium',
  content: 'The quick brown fox jumps over the lazy dog',
};

export const Micro = Template.bind({});
Micro.args = {
  mobilefontsize: 'tw:text-xs',
  desktopfontsize: 'tw:lg:text-2xs',
  weight: 'tw:font-normal',
  content: 'The quick brown fox jumps over the lazy dog',
};
