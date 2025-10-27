/**
 * Storybook configuration for the Button component
 * This defines how the Button component will appear in Storybook and what controls/options are available.
 */

// Import the Button component
import Button from './Button';
// Import the Icons component for examples
import Icons from '../Icons/Icons';

// Define the story configuration
export default {
  title: 'Components/Button',
  component: Button,
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
              // Handle special cases
              if (key === 'iconleft' || key === 'iconright') {
                const iconType =
                  key === 'iconleft' ? 'chevronLeft' : 'chevronRight';
                return `${key}={<Icons.${iconType} classname="tw:w-4 tw:h-4" />}`;
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

          return `<Button\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
This component implements various button styles as defined in the design system.

### Design Figma References
- [Button UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=19-1223&m=dev)
        `,
      },
    },
  },

  // Define controls (props) for the Button component
  argTypes: {
    // Text content
    label: {
      control: 'text',
      description: 'Text displayed on the button',
      table: {
        defaultValue: {
          summary: '',
        },
      },
    },

    // Visual style
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: 'The visual style of the button',
      table: {
        defaultValue: {
          summary: 'primary',
        },
      },
    },

    // Size options
    size: {
      control: { type: 'select' },
      options: ['small', 'default', 'responsive'],
      description: 'Size of the button',
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },

    // State options
    state: {
      control: { type: 'select' },
      options: ['enabled', 'disabled'],
      description: 'Current state of the button',
      table: {
        defaultValue: {
          summary: 'enabled',
        },
      },
    },

    // Link functionality
    href: {
      control: 'text',
      description: 'Optional URL to make the button function as a link',
      table: {
        defaultValue: {
          summary: null,
        },
      },
    },

    // Icon on the left
    iconleft: {
      control: { type: 'select' },
      options: ['none', 'chevronLeft', 'chevronRight'],
      mapping: {
        none: null,
        chevronLeft: <Icons.chevronLeft classname="tw:h-[16px] tw:w-[16px]" />,
        chevronRight: (
          <Icons.chevronRight classname="tw:h-[16px] tw:w-[16px]" />
        ),
      },
      description: 'Icon component to display on the left of the label',
    },

    // Icon on the right
    iconright: {
      control: { type: 'select' },
      options: ['none', 'chevronRight', 'chevronLeft'],
      mapping: {
        none: null,
        chevronRight: (
          <Icons.chevronRight classname="tw:h-[16px] tw:w-[16px]" />
        ),
        chevronLeft: <Icons.chevronLeft classname="tw:h-[16px] tw:w-[16px]" />,
      },
      description: 'Icon component to display on the right of the label',
    },
  },
};

/**
 * Template for rendering the Button component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => Button(args);

/**
 * Primary button story.
 * Demonstrates the default primary button in enabled state.
 */
export const PrimaryEnabled = Template.bind({});
PrimaryEnabled.args = {
  label: 'Primary',
  iconleft: 'chevronLeft',
  iconright: 'chevronRight',
};

/**
 * Primary button story in disabled state.
 * Demonstrates a disabled primary button.
 */
export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
  label: 'Primary',
  state: 'disabled',
  iconleft: 'chevronLeft',
  iconright: 'chevronRight',
};

/**
 * Primary small button story.
 * Demonstrates the small primary button in enabled state.
 */
export const PrimarySmallEnabled = Template.bind({});
PrimarySmallEnabled.args = {
  label: 'Primary',
  size: 'small',
  iconleft: 'chevronLeft',
  iconright: 'chevronRight',
};

/**
 * Primary responsive button story.
 * Demonstrates the responsive primary button in enabled state.
 */
export const PrimaryResponsiveEnabled = Template.bind({});
PrimaryResponsiveEnabled.args = {
  label: 'Primary',
  size: 'responsive',
  iconleft: 'chevronLeft',
  iconright: 'chevronRight',
};

/**
 * Secondary button story.
 * Demonstrates the secondary button in enabled state.
 */
export const SecondaryEnabled = Template.bind({});
SecondaryEnabled.args = {
  label: 'Secondary',
  variant: 'secondary',
  iconleft: 'chevronLeft',
  iconright: 'chevronRight',
};

/**
 * Secondary button story in disabled state.
 * Demonstrates a disabled secondary button.
 */
export const SecondaryDisabled = Template.bind({});
SecondaryDisabled.args = {
  label: 'Secondary',
  variant: 'secondary',
  state: 'disabled',
  iconleft: 'chevronLeft',
  iconright: 'chevronRight',
};

/**
 * Secondary small button story.
 * Demonstrates the default primary button in enabled state.
 */
export const SecondarySmallEnabled = Template.bind({});
SecondarySmallEnabled.args = {
  label: 'Secondary',
  variant: 'secondary',
  size: 'small',
  iconleft: 'chevronLeft',
  iconright: 'chevronRight',
};

/**
 * Tertiary button story.
 * Demonstrates the tertiary button in enabled state.
 */
export const TertiaryEnabled = Template.bind({});
TertiaryEnabled.args = {
  label: 'Tertiary',
  variant: 'tertiary',
  iconleft: 'chevronLeft',
  iconright: 'chevronRight',
};

/**
 * Secondary button story in disabled state.
 * Demonstrates a disabled secondary button.
 */
export const TertiaryDisabled = Template.bind({});
TertiaryDisabled.args = {
  label: 'Tertiary',
  variant: 'tertiary',
  state: 'disabled',
  iconleft: 'chevronLeft',
  iconright: 'chevronRight',
};

/**
 * Tertiary small button story.
 * Demonstrates the default primary button in enabled state.
 */
export const TertiarySmallEnabled = Template.bind({});
TertiarySmallEnabled.args = {
  label: 'Tertiary',
  variant: 'tertiary',
  size: 'small',
  iconleft: 'chevronLeft',
  iconright: 'chevronRight',
};

/**
 * Inverse button story.
 * Demonstrates the inverse button in enabled state.
 */
export const InverseEnabled = Template.bind({});
InverseEnabled.args = {
  label: 'Inverse',
  variant: 'inverse',
  iconleft: 'chevronLeft',
  iconright: 'chevronRight',
};
// Change background for this story as per designs
InverseEnabled.parameters = {
  backgrounds: {
    default: 'orange',
    values: [{ name: 'orange', value: '#FF440C' }],
  },
};

/**
 * Inverse button story in disabled state.
 * Demonstrates a disabled inverse button.
 */
export const InverseDisabled = Template.bind({});
InverseDisabled.args = {
  label: 'Inverse',
  variant: 'inverse',
  state: 'disabled',
  iconleft: 'chevronLeft',
  iconright: 'chevronRight',
};
// Change background for this story as per designs
InverseDisabled.parameters = {
  backgrounds: {
    default: 'orange',
    values: [{ name: 'orange', value: '#FF440C' }],
  },
};

/**
 * Inverse small button story.
 * Demonstrates the default primary button in enabled state.
 */
export const InverseSmallEnabled = Template.bind({});
InverseSmallEnabled.args = {
  label: 'Inverse',
  variant: 'inverse',
  size: 'small',
  iconleft: 'chevronLeft',
  iconright: 'chevronRight',
};
// Change background for this story as per designs
InverseSmallEnabled.parameters = {
  backgrounds: {
    default: 'orange',
    values: [{ name: 'orange', value: '#FF440C' }],
  },
};

/**
 * Button as Link story.
 * Demonstrates the button component functioning as a link.
 */
export const ButtonAsLink = Template.bind({});
ButtonAsLink.args = {
  label: 'Visit Google',
  href: 'https://google.com',
  iconright: 'chevronRight',
};

/**
 * Icon-only primary button story.
 * Demonstrates a button containing only an icon.
 */
export const IconOnlyPrimary = Template.bind({});
IconOnlyPrimary.args = {
  iconright: 'chevronRight',
};

/**
 * Icon-only primary small button story.
 * Demonstrates a button containing only an icon.
 */
export const IconOnlyPrimarySmall = Template.bind({});
IconOnlyPrimarySmall.args = {
  size: 'small',
  iconright: 'chevronRight',
};

/**
 * Icon-only primary disabled button story.
 * Demonstrates a button containing only an icon.
 */
export const IconOnlyPrimaryDisabled = Template.bind({});
IconOnlyPrimaryDisabled.args = {
  state: 'disabled',
  iconright: 'chevronRight',
};

/**
 * Icon-only secondary button story.
 * Demonstrates a button containing only an icon.
 */
export const IconOnlySecondary = Template.bind({});
IconOnlySecondary.args = {
  variant: 'secondary',
  iconright: 'chevronRight',
};

/**
 * Icon-only secondary disabled button story.
 * Demonstrates a button containing only an icon.
 */
export const IconOnlySecondaryDisabled = Template.bind({});
IconOnlySecondaryDisabled.args = {
  variant: 'secondary',
  state: 'disabled',
  iconright: 'chevronRight',
};

/**
 * Icon-only tertiary button story.
 * Demonstrates a button containing only an icon.
 */
export const IconOnlyTertiary = Template.bind({});
IconOnlyTertiary.args = {
  variant: 'tertiary',
  iconright: 'chevronRight',
};

/**
 * Icon-only tertiary disabled button story.
 * Demonstrates a button containing only an icon.
 */
export const IconOnlyTertiaryDisabled = Template.bind({});
IconOnlyTertiaryDisabled.args = {
  variant: 'tertiary',
  state: 'disabled',
  iconright: 'chevronRight',
};

/**
 * Icon-only inverse button story.
 * Demonstrates a button containing only an icon.
 */
export const IconOnlyInverse = Template.bind({});
IconOnlyInverse.args = {
  variant: 'inverse',
  iconright: 'chevronRight',
};
// Change background for this story as per designs
IconOnlyInverse.parameters = {
  backgrounds: {
    default: 'orange',
    values: [{ name: 'orange', value: '#FF440C' }],
  },
};

/**
 * Icon-only inverse disabled button story.
 * Demonstrates a button containing only an icon.
 */
export const IconOnlyInverseDisabled = Template.bind({});
IconOnlyInverseDisabled.args = {
  variant: 'inverse',
  state: 'disabled',
  iconright: 'chevronRight',
};
// Change background for this story as per designs
IconOnlyInverseDisabled.parameters = {
  backgrounds: {
    default: 'orange',
    values: [{ name: 'orange', value: '#FF440C' }],
  },
};

/**
 * Stacked buttons story.
 * Demonstrates two buttons stacked vertically.
 */
export const StackedButtonsVertically = {
  render: () => {
    return (
      <div className="tw:flex tw:gap-8">
        {/* First Column */}
        <div className="tw:flex tw:flex-col tw:gap-4">
          <Button label="Primary Button" />
          <Button label="Secondary Button" variant="secondary" />
        </div>

        {/* Second Column */}
        <div className="tw:flex tw:flex-col tw:gap-3">
          <Button label="Small Primary" size="small" />
          <Button label="Small Primary" size="small" variant="secondary" />
        </div>
      </div>
    );
  },
};

/**
 * Stacked buttons story.
 * Demonstrates two buttons stacked horizontally.
 */
export const StackedButtonsHorizontally = {
  render: () => {
    return (
      <div className="tw:flex tw:flex-col tw:gap-8">
        {/* First Row */}
        <div className="tw:flex tw:flex-row tw:gap-4">
          <Button label="Primary Button" />
          <Button label="Secondary Button" variant="secondary" />
        </div>

        {/* Second Row */}
        <div className="tw:flex tw:flex-row tw:gap-3">
          <Button label="Small Primary" size="small" />
          <Button label="Small Secondary" size="small" variant="secondary" />
        </div>
      </div>
    );
  },
};

/**
 * All statuses story.
 * Demonstrates displaying all statuses in a row.
 */
export const AllButtons = {
  render: () => {
    // Add all the previously defined args here
    const statusConfigs = [
      PrimaryEnabled.args,
      PrimaryDisabled.args,
      PrimarySmallEnabled.args,
      SecondaryEnabled.args,
      SecondaryDisabled.args,
      SecondarySmallEnabled.args,
      TertiaryEnabled.args,
      TertiaryDisabled.args,
      TertiarySmallEnabled.args,
      InverseEnabled.args,
      InverseDisabled.args,
      InverseSmallEnabled.args,
      ButtonAsLink.args,
      IconOnlyPrimary.args,
      IconOnlyPrimarySmall.args,
      IconOnlyPrimaryDisabled.args,
      IconOnlySecondary.args,
      IconOnlySecondaryDisabled.args,
      IconOnlyTertiary.args,
      IconOnlyTertiaryDisabled.args,
      IconOnlyInverse.args,
      IconOnlyInverseDisabled.args,
    ];

    return (
      <div className="tw:flex tw:flex-wrap tw:items-start tw:gap-4">
        {statusConfigs.map((config, idx) => (
          <Button
            key={idx}
            {...config}
            iconleft={
              config.iconleft ? (
                <Icons.chevronLeft classname="tw:h-4 tw:w-4" />
              ) : null
            }
            iconright={
              config.iconright ? (
                <Icons.chevronRight classname="tw:h-4 tw:w-4" />
              ) : null
            }
          />
        ))}
      </div>
    );
  },
};
