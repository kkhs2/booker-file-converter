import Container from './Container';
import Typography from '../Typography/Typography';
import RailSection from '../RailSection/RailSection';
import { PRODUCT_CARDS } from '../ProductCard/ProductCard.stories';
import { sources } from 'webpack';

export default {
  title: 'Components/Container',
  component: Container,
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

          return `<Container\n  ${props}\n/>`;
        },
      },

      description: {
        component: `

The Container component provides a way to hold and organize page content with configurable width, spacing, and background settings.

## Features
- Three width variants: full-width, contained (max-width: 1728px), or overflow (allows content to overflow beyond boundaries)
- Configurable vertical spacing (none, small, default, or large)
- Optional background color with automatic margin for better spacing
- Support for "rail" mode allowing RailSection components to extend beyond container

## Usage
Use this component to maintain consistent layout patterns throughout the application while accommodating various content types and page designs.

## Example
       
    <Container variant="contained" spacing="default">
      <SomeComponent />
    </Container>
       
      `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'full', 'overflow'],
      description: 'Container width variant',
      table: {
        defaultValue: { summary: 'contained' },
      },
    },
    background: {
      control: 'text',
      description:
        'Background color (tailwind color class name "tw:bg-" prefix)',
    },
    rail: {
      control: 'boolean',
      description: 'Allow RailSection components to extend beyond container',
      table: {
        defaultValue: { summary: false },
      },
    },
    spacing: {
      control: 'select',
      options: ['none', 'small', 'default', 'large'],
      description: 'Vertical margin size',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
  },
};

// Basic demo component for Container examples
const DemoContent = ({ children }) => (
  <div
    className={`tw:flex tw:h-[200px] tw:items-center tw:justify-center tw:rounded-2xl tw:border tw:border-dashed tw:border-primary-500 tw:bg-secondary-1100 tw:p-4`}
  >
    {children ? children : <Typography>Container Content</Typography>}
  </div>
);

export const Default = {
  args: {
    variant: 'contained',
    spacing: 'default',
    rail: false,
  },
  render: (args) => (
    <Container {...args}>
      <DemoContent />
    </Container>
  ),
};

export const WithBackground = {
  args: {
    variant: 'contained',
    background: 'tw:bg-secondary-1100',
    spacing: 'default',
  },
  render: (args) => (
    <Container {...args}>
      <DemoContent />
    </Container>
  ),
};

export const FullWidth = {
  args: {
    variant: 'full',
    spacing: 'default',
  },
  render: (args) => (
    <Container {...args}>
      <DemoContent />
    </Container>
  ),
};

export const OverflowVariant = {
  args: {
    variant: 'overflow',
    spacing: 'default',
  },
  render: (args) => (
    <Container {...args}>
      <DemoContent>
        <Typography classname="tw:text-center">
          This container allows content to overflow beyond boundaries
        </Typography>
      </DemoContent>
    </Container>
  ),
};

export const WithRailSection = {
  args: {
    variant: 'contained',
    rail: true,
    spacing: 'default',
  },
  render: (args) => {
    return (
      <Container {...args}>
        <Typography domtype="h4" classname="tw:mb-8">
          Container with Rail Section
        </Typography>

        <RailSection
          title="Products"
          description="This rail section can extend beyond the container boundaries"
          shownavigation={true}
          carouseloptions={{
            slidesOffsetBefore: 20,
            slidesOffsetAfter: 20,
            spaceBetween: 16,
            breakpoints: {
              1024: {
                slidesPerView: 4,
              },
              1312: {
                slidesPerView: 4,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
              },
            },
          }}
        >
          {PRODUCT_CARDS}
        </RailSection>
      </Container>
    );
  },
};

export const SpacingVariants = {
  render: () => (
    <>
      <Container
        spacing="none"
        background="tw:bg-secondary-1100"
        classname="tw:mb-4"
      >
        <Typography classname="tw:text-center">
          <DemoContent>
            <Typography classname="tw:text-center">spacing="none"</Typography>
          </DemoContent>
        </Typography>
      </Container>

      <Container
        spacing="small"
        background="tw:bg-secondary-1100"
        classname="tw:mb-4"
      >
        <DemoContent>
          <Typography classname="tw:text-center">spacing="small"</Typography>
        </DemoContent>
      </Container>

      <Container
        spacing="default"
        background="tw:bg-secondary-1100"
        classname="tw:mb-4"
      >
        <DemoContent>
          <Typography classname="tw:text-center">spacing="default"</Typography>
        </DemoContent>
      </Container>
    </>
  ),
};
