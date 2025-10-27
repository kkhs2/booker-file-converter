/**
 * Storybook configuration for the Navigation Card component
 * This defines how the Navigation Card component will appear in Storybook and what controls/options are available.
 */

// Import the NavigationCard component
import NavigationCard from './NavigationCard';
// Import the Icons component for examples
import Icons from '../Icons/Icons';
import Button from '../Button/Button';

// Define the story configuration
export default {
  title: 'Cards/Navigation Card',
  component: NavigationCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          // Function to convert JSX elements into string format
          const serializeJSX = (jsxElement) => {
            if (
              !jsxElement ||
              typeof jsxElement !== 'object' ||
              !jsxElement.type
            ) {
              return null;
            }

            let componentName =
              jsxElement.type?.displayName ||
              jsxElement.type?.name ||
              jsxElement.type ||
              'UnknownComponent';

            // Check if it's a native HTML element (e.g., "img", "div") by ensuring it's all lowercase
            const isNativeElement =
              typeof componentName === 'string' &&
              /^[a-z]+$/.test(componentName);

            // Check if it's an Icons component and add the "Icons." namespace
            const isIcon = Icons && Object.keys(Icons).includes(componentName);
            if (isIcon) {
              componentName = `Icons.${componentName}`;
            }

            // Format props correctly
            const props = jsxElement.props
              ? Object.entries(jsxElement.props)
                  .map(([propKey, propValue]) => {
                    if (typeof propValue === 'string') {
                      return `${propKey}="${propValue}"`;
                    }
                    if (typeof propValue === 'object' && propValue !== null) {
                      if ('type' in propValue) {
                        return `${propKey}={${serializeJSX(propValue)}}`;
                      }
                      return `${propKey}={${JSON.stringify(propValue)}}`;
                    }
                    return `${propKey}={${propValue}}`;
                  })
                  .join(' ')
              : '';

            return isNativeElement
              ? `<${componentName} ${props} />`
              : `<${componentName} ${props} />`;
          };

          // Function to clean and format props
          const cleanObject = (obj) => {
            if (Array.isArray(obj)) {
              return obj.map(cleanObject);
            }
            if (obj && typeof obj === 'object') {
              const cleaned = {};
              for (const [key, value] of Object.entries(obj)) {
                if (key.startsWith('__')) continue;

                // Handle function props (Icons, Buttons, Elements, Images)
                if (
                  key === 'elementleft' ||
                  key === 'elementright' ||
                  key === 'onclick'
                ) {
                  const resolvedValue =
                    typeof value === 'function' ? value() : value;

                  if (
                    resolvedValue &&
                    typeof resolvedValue === 'object' &&
                    'type' in resolvedValue
                  ) {
                    cleaned[key] = serializeJSX(resolvedValue);
                    continue;
                  }
                }

                cleaned[key] = cleanObject(value);
              }
              return cleaned;
            }
            return obj;
          };

          // Convert args to JSX props string
          const props = Object.entries(cleanObject(args))
            .map(([key, value]) => {
              if (typeof value === 'boolean') {
                return value ? key : null;
              }
              if (typeof value === 'string') {
                return `${key}="${value}"`;
              }
              return `${key}={${value}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<NavigationCard\n  ${props}\n/>`;
        },
      },

      description: {
        component: `
This component implements various navigation card styles as defined in the design system.

### Design Figma References
- [Navigation Card UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=3121-71988&m=dev)
        `,
      },
    },
  },

  // Define controls (props) for the NavigationCard component
  argTypes: {
    // Label of Card
    label: {
      control: 'text',
      description: 'Text displayed on the navigation card',
      table: {
        defaultValue: {
          summary: '',
        },
      },
    },

    // Layout variant
    variant: {
      control: { type: 'select' },
      options: ['default', 'square'],
      description:
        "Layout variant; 'square' applies only on desktop (mobile remains default)",
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },

    // Background style for card
    background: {
      control: 'text',
      description: 'Background style for card',
      table: {
        defaultValue: {
          summary: 'keyline',
        },
      },
    },

    // Visual style
    background: {
      control: { type: 'select' },
      options: ['keyline', 'white', 'orange'],
      description: 'The visual style of the navigation Card',
      table: {
        defaultValue: {
          summary: 'keyline',
        },
      },
    },

    // Link functionality
    href: {
      control: 'text',
      description: 'Optional URL to make the navigationCard function as a link',
      table: {
        defaultValue: {
          summary: null,
        },
      },
    },

    // Icon on the left
    elementleft: {
      control: 'HTMLElement',
      description: 'Element for the left side',
      table: {
        type: { summary: 'HTMLElement' },
        defaultValue: { summary: null },
      },
    },

    // Icon on the right
    elementright: {
      control: 'HTMLElement',
      description: 'Element for the right side',
      table: {
        type: { summary: 'HTMLElement' },
        defaultValue: { summary: null },
      },
    },
  },
};

/**
 * Template for rendering the NavigationCard component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => NavigationCard(args);

/**
 * Icon & Button Default
 */
export const IconButtonDefault = Template.bind({});
IconButtonDefault.args = {
  label: 'Navigation label goes here.',
  elementleft: () => <Icons.percentage />,
  elementright: () => (
    <Button
      variant="secondary"
      size="small"
      iconright={
        <Icons.chevronRightThick classname="tw:h-[12px] tw:w-[12px]" />
      }
      classname="tw:h-[36px] tw:w-[36px]"
    />
  ),
  onclick: () => {
    console.log(`Click event`);
  },
};

/**
 * Icon & Button White Background
 */
export const IconButtonWhite = Template.bind({});
IconButtonWhite.args = {
  label: 'Navigation label goes here.',
  background: 'white',
  elementleft: () => <Icons.percentage />,
  elementright: () => (
    <Button
      variant="secondary"
      size="small"
      iconright={
        <Icons.chevronRightThick classname="tw:h-[12px] tw:w-[12px]" />
      }
      classname="tw:h-[36px] tw:w-[36px]"
    />
  ),
  href: 'https://github.com/',
};

/**
 * Icon & Button Orange Background
 */
export const IconButtonOrange = Template.bind({});
IconButtonOrange.args = {
  label: 'Navigation label goes here.',
  background: 'orange',
  elementleft: () => <Icons.whitePercentage />,
  elementright: () => (
    <Button
      variant="inverse"
      size="small"
      iconright={
        <Icons.chevronRightThick classname="tw:h-[12px] tw:w-[12px]" />
      }
      classname="tw:h-[36px] tw:w-[36px]"
    />
  ),
};

/**
 * Image Default
 */
export const imageDefault = Template.bind({});
imageDefault.args = {
  label: 'Navigation label goes here.',
  elementleft: './images/courvoisier.png',
  classname: 'tw:p-2 tw:pr-4 tw:lg:p-2 tw:lg:pr-4',
};

/**
 * Image white background
 */
export const imageWhite = Template.bind({});
imageWhite.args = {
  label: 'Navigation label goes here.',
  background: 'white',
  elementleft: './images/courvoisier.png',
  classname: 'tw:p-2 tw:pr-4 tw:lg:p-2 tw:lg:pr-4',
};

/**
 * Image orange background
 */
export const imageOrange = Template.bind({});
imageOrange.args = {
  label: 'Navigation label goes here.',
  background: 'orange',
  elementleft: './images/courvoisier.png',
  classname: 'tw:p-2 tw:pr-4 tw:lg:p-2 tw:lg:pr-4',
};

/**
 * Icon Default
 */
export const IconDefault = Template.bind({});
IconDefault.args = {
  label: 'Navigation label goes here.',
  elementright: () => (
    <Button
      variant="secondary"
      size="small"
      iconright={
        <Icons.chevronRightThick classname="tw:h-[12px] tw:w-[12px]" />
      }
      classname="tw:h-[36px] tw:w-[36px]"
    />
  ),
  onclick: () => {
    console.log(`Click event`);
  },
};

/**
 * Icon White
 */
export const IconWhite = Template.bind({});
IconWhite.args = {
  label: 'Navigation label goes here.',
  background: 'white',
  elementright: () => (
    <Button
      variant="secondary"
      size="small"
      iconright={
        <Icons.chevronRightThick classname="tw:h-[12px] tw:w-[12px]" />
      }
      classname="tw:h-[36px] tw:w-[36px]"
    />
  ),
  onclick: () => {
    console.log(`Click event`);
  },
};

/**
 * Icon Orange
 */
export const IconOrange = Template.bind({});
IconOrange.args = {
  label: 'Navigation label goes here.',
  background: 'orange',
  elementright: () => (
    <Button
      variant="inverse"
      size="small"
      iconright={<Icons.chevronRight classname="tw:h-4 tw:w-4" />}
      classname="tw:hover:bg-black tw:hover:text-white tw:hover:border-black"
    />
  ),
  onclick: () => {
    console.log(`Click event`);
  },
};

/**
 * Label Default
 */
export const LabelDefault = Template.bind({});
LabelDefault.args = {
  label: 'Navigation label goes here.',
  onclick: () => {
    console.log(`Click event`);
  },
};

/**
 * Square Label Default (desktop-only square)
 */
export const SquareLabelDefault = Template.bind({});
SquareLabelDefault.args = {
  label: 'Navigation label goes here.',
  variant: 'square',
  classname: 'tw:lg:w-[160px]',
};

/**
 * Label White
 */
export const LabelWhite = Template.bind({});
LabelWhite.args = {
  label: 'Navigation label goes here.',
  background: 'white',
  onclick: () => {
    console.log(`Click event`);
  },
};

/**
 * Label Orange
 */
export const LabelOrange = Template.bind({});
LabelOrange.args = {
  label: 'Navigation label goes here.',
  background: 'orange',
  onclick: () => {
    console.log(`Click event`);
  },
};

/**
 * Graphic Default
 */
export const graphicDefault = Template.bind({});
graphicDefault.args = {
  label: 'Navigation label goes here.',
  elementright: () => <Icons.gfxChevron />,
  classname: 'tw:items-start',
};

/**
 * Graphic White
 */
export const graphicWhite = Template.bind({});
graphicWhite.args = {
  label: 'Navigation label goes here.',
  background: 'white',
  elementright: () => <Icons.gfxChevron />,
  classname: 'tw:items-start',
  textclassname: 'tw:text-primary',
};

/**
 * Graphic Orange
 */
export const graphicOrange = Template.bind({});
graphicOrange.args = {
  label: 'Navigation label goes here.',
  background: 'orange',
  elementright: () => <Icons.gfxChevronWhite />,
  classname: 'tw:items-start',
};

/**
 * Square Graphic Orange (desktop-only square)
 */
export const SquareGraphicOrange = Template.bind({});
SquareGraphicOrange.args = {
  label: 'Navigation label goes here.',
  variant: 'square',
  background: 'orange',
  elementright: () => <Icons.gfxChevronWhite />,
  classname: 'tw:lg:w-[160px]',
};

/**
 * Highlight Default
 */
export const HighlightDefault = Template.bind({});
HighlightDefault.args = {
  label: 'Label.',
  background: 'orange',
  elementleft: './images/courvoisier.png',

  elementright: () => (
    <div className="tw:rounded-lg tw:bg-primary-700 tw:px-2 tw:py-1 tw:group-hover:bg-black">
      <span className="tw:inline-flex tw:text-center tw:text-lg tw:leading-[1.4] tw:font-normal tw:text-white">
        10 new products
      </span>
    </div>
  ),
  onclick: () => {
    console.log(`Click event`);
  },
  classname:
    'tw:max-w-full tw:lg:max-w-[537px] tw:font-semibold tw:text-3xl tw:p-2 tw:pr-4 tw:lg:p-2 tw:lg:pr-4',
};

/**
 * Highlight Yellow
 */
export const HighlightYellow = Template.bind({});
HighlightYellow.args = {
  label: 'Label.',
  background: 'white',
  elementleft: './images/courvoisier.png',

  elementright: () => (
    <div className="tw:rounded-lg tw:bg-secondary-1000 tw:px-2 tw:py-1">
      <span className="tw:inline-flex tw:text-center tw:text-lg tw:leading-[1.4] tw:font-normal tw:text-black">
        10 new offers
      </span>
    </div>
  ),
  onclick: () => {
    console.log(`Click event`);
  },
  classname:
    'tw:max-w-full tw:lg:max-w-[537px] tw:bg-yellow-700 tw:hover:bg-yellow-800 tw:font-semibold tw:text-3xl tw:p-2 tw:pr-4 tw:lg:p-2 tw:lg:pr-4',
};

/**
 * Highlight Black
 */
export const HighlightBlack = Template.bind({});
HighlightBlack.args = {
  label: 'Label.',
  background: 'orange',
  elementleft: './images/courvoisier.png',
  elementright: () => (
    <div className="tw:group:hover:bg-black tw:rounded-lg tw:bg-secondary-1000 tw:px-2 tw:py-1">
      <span className="tw:inline-flex tw:text-center tw:text-lg tw:leading-[1.4] tw:font-normal tw:text-black">
        10 new offers
      </span>
    </div>
  ),
  onclick: () => {
    console.log(`Click event`);
  },
  classname:
    'tw:max-w-full tw:lg:max-w-[537px] tw:bg-black tw:hover:bg-primary tw:font-semibold tw:text-3xl tw:p-2 tw:pr-4 tw:lg:p-2 tw:lg:pr-4',
};

/**
 * Square Icon & Button Default (desktop-only square)
 */
export const SquareIconButtonDefault = Template.bind({});
SquareIconButtonDefault.args = {
  label: 'New products',
  variant: 'square',
  background: 'yellow',
  elementleft: './images/nav-card-demo.jpg',
  classname: 'tw:lg:w-[160px] tw:lg:font-semibold',
};

/**
 * Square Icon & Button Orange (desktop-only square)
 */
export const SquareIconButtonOrange = Template.bind({});
SquareIconButtonOrange.args = {
  label: 'New products asd asdas dasd as da',
  variant: 'square',
  background: 'orange',
  elementleft: './images/nav-card-demo.jpg',
  classname: 'tw:lg:w-[160px] tw:lg:font-semibold',
};

/**
 * Square Icon & Button White (desktop-only square)
 */
export const SquareIconButtonWhite = Template.bind({});
SquareIconButtonWhite.args = {
  label: 'Shop by brand',
  variant: 'square',
  background: 'white',
  elementleft: './images/nav-card-demo.jpg',
  classname: 'tw:lg:w-[160px]',
};

/**
 * Square Image Default (desktop-only square)
 */
export const SquareImageDefault = Template.bind({});
SquareImageDefault.args = {
  label: "Beer, Cider & Alcoholic RTD's",
  variant: 'square',
  elementleft: './images/nav-card-demo.jpg',
  classname: 'tw:lg:w-[160px]',
};

/**
 * All statuses story.
 * Demonstrates displaying all statuses in a row.
 */
export const AllNavigationCards = {
  render: () => {
    // Add all the previously defined args here
    const statusConfigs = [
      IconButtonDefault.args,
      IconButtonWhite.args,
      IconButtonOrange.args,
      imageDefault.args,
      imageWhite.args,
      imageOrange.args,
      IconDefault.args,
      IconWhite.args,
      IconOrange.args,
      LabelDefault.args,
      LabelWhite.args,
      LabelOrange.args,
      graphicDefault.args,
      graphicWhite.args,
      graphicOrange.args,
      HighlightDefault.args,
      HighlightYellow.args,
      HighlightBlack.args,
    ];

    return (
      <div className="tw:flex tw:max-w-md tw:flex-wrap tw:items-start tw:gap-4">
        {statusConfigs.map((config, idx) => (
          <NavigationCard key={idx} {...config} />
        ))}
      </div>
    );
  },
};

export const AllSquareNavigationCards = {
  render: () => {
    // Add all the previously defined args here
    const statusConfigs = [
      SquareIconButtonDefault.args,
      SquareIconButtonOrange.args,
      SquareIconButtonWhite.args,
      SquareImageDefault.args,
    ];

    return (
      <div className="tw:flex tw:flex-wrap tw:items-start tw:gap-4">
        {statusConfigs.map((config, idx) => (
          <NavigationCard key={idx} {...config} />
        ))}
      </div>
    );
  },
};
