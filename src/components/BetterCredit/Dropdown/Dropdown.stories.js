/**
 * Storybook configuration for the Dropdown component
 * This defines how the Dropdown component will appear in Storybook and what controls/options are available.
 */

// Imports
import Dropdown from "./Dropdown";

// Define the story configuration
export default {
  // The title under which the Dropdown component will appear in Storybook's navigation
  title: "Components/Dropdown",

  // The component to be displayed in Storybook
  component: Dropdown,

  // Tags used by Storybook for organisational purposes
  tags: ["autodocs"],

  parameters: {
    docs: {
      story: {
        height: "250px"
      },
      source: {
        transform: (source, storyContext) => {
          // Get the story args
          const { args } = storyContext;
          if (!args) return source;

          // Convert args to JSX props string
          const props = Object.entries(args)
            .map(([key, value]) => {
              if (typeof value === "boolean") {
                return `${key}={${value}}`;
              }
              if (typeof value === "string") {
                return `${key}="${value}"`;
              }
              return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join("\n  ");

          return props.length ? `<Dropdown\n  ${props}\n/>` : " ";
        }
      },
      description: {
        component: `
This component implements various dropdown styles as defined in the design system.

### Design Figma References
- [Dropdown States](https://www.figma.com/design/4CYXSDK05Qj3HboIUnqX60/Booker-Better-Credit?node-id=4397-10789&t=ony3rNaUmHkbqBIr-4)
- [Dropdown List States](https://www.figma.com/design/4CYXSDK05Qj3HboIUnqX60/Booker-Better-Credit?node-id=4416-30751&t=ony3rNaUmHkbqBIr-4)
- [Dropdown Opened](https://www.figma.com/design/4CYXSDK05Qj3HboIUnqX60/Booker-Better-Credit?node-id=4416-30757&t=ony3rNaUmHkbqBIr-4)
        `
      }
    }
  },

  // Define controls (props) for the Dropdown component
  argTypes: {
    // Label text
    label: {
      control: "text",
      description: "Label text for the dropdown",
      table: {
        defaultValue: { summary: "Select an option" }
      }
    },

    // Options array
    options: {
      control: "object",
      description: "Array of options to display in the dropdown",
      table: {
        defaultValue: { summary: "[]" }
      }
    },

    // State control
    state: {
      control: { type: "select" },
      options: ["active", "inactive"],
      description: "State of the dropdown",
      table: {
        defaultValue: { summary: "active" }
      }
    },

    // Selected value
    selectedvalue: {
      control: "text",
      description: "Default selected value of the dropdown",
      table: {
        defaultValue: { summary: null }
      }
    },

    // Dropdown type
    type: {
      control: { type: "select" },
      options: ["default", "date"],
      description: "Type of dropdown",
      table: {
        defaultValue: { summary: "default" }
      }
    },

    // Bold label
    bold: {
      control: "boolean",
      description: "Make the dropdown label bold",
      table: {
        defaultValue: { summary: false }
      }
    },

    // Previous account year (for date type)
    prevaccountyear: {
      control: "text",
      description: "Label for previous account year (date type only)",
      if: { arg: "type", eq: "date" }
    },

    // Current account year (for date type)
    currentaccountyear: {
      control: "text",
      description: "Label for current account year (date type only)",
      if: { arg: "type", eq: "date" }
    },

    // Callback function when dropdown value changes
    onchange: {
      action: "onchange",
      description: "Callback function when dropdown value changes"
    }
  }
};

/**
 * Template for rendering the Dropdown component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => <Dropdown {...args} />;

/**
 * Default dropdown story.
 * Demonstrates a standard dropdown with simple text options.
 */
export const Default = Template.bind({});
Default.args = {
  label: "Status",
  options: ["Active", "Inactive", "Pending"]
};

/**
 * Inactive dropdown story.
 * Demonstrates a dropdown in an inactive/disabled state.
 */
export const InactiveDropdown = Template.bind({});
InactiveDropdown.args = {
  label: "Inactive Dropdown",
  options: ["Option 1", "Option 2", "Option 3"],
  state: "inactive"
};

/**
 * Type dropdown story.
 * Demonstrates a dropdown with different billing types.
 */
export const TypeDropdown = Template.bind({});
TypeDropdown.args = {
  label: "Type",
  options: ["Overdue", "Central Billing", "Direct delivered"]
};

/**
 * Branch dropdown story.
 * Demonstrates a dropdown with branch-related options and HTML content.
 */
export const BranchDropdown = Template.bind({});
BranchDropdown.args = {
  label: "Branch",
  options: [
    "Overdue",
    <>
      In Branch <br />
      (Branch name)
    </>
  ]
};

/**
 * Number dropdown story.
 * Demonstrates a dropdown with numeric options.
 */
export const NumberDropdown = Template.bind({});
NumberDropdown.args = {
  label: "Number",
  options: [10, 20, 30]
};

/**
 * Number without dropdown story.
 * Demonstrates a dropdown with numeric options but no label set, this ensures the first option being selected.
 */
export const PaginationDropdown = Template.bind({});
PaginationDropdown.args = {
  label: "",
  options: [10, 20, 30],
  selectedvalue: 10
};

/**
 * Date range dropdown story.
 * Demonstrates a date-picker dropdown with account year selection.
 */
export const DateRangeDropdown = Template.bind({});
DateRangeDropdown.args = {
  label: "Date",
  type: "date",
  prevaccountyear: "Account year 2023 - 2024",
  currentaccountyear: "Account year 2024 - 2025"
};
DateRangeDropdown.parameters = {
  docs: {
    story: {
      height: "600px"
    }
  }
};

/**
 * Bold label dropdown story.
 * Demonstrates a dropdown with bold label styling.
 */
export const BoldLabel = Template.bind({});
BoldLabel.args = {
  label: "Bold Label",
  options: ["Option 1", "Option 2", "Option 3"],
  bold: true
};

/**
 * Dropdown with upward opening behavior when near viewport bottom.
 * This story demonstrates how the dropdown adjusts its opening direction
 * based on available viewport space.
 */
export const UpwardOpeningDropdown = {
  render: () => (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <div style={{ position: "absolute", bottom: "20px" }}>
        <Dropdown label="Bottom Dropdown" options={["Option 1", "Option 2", "Option 3", "Option 4", "Option 5", "Option 6"]} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "This dropdown is positioned at the bottom of the viewport. When opened, it will automatically adjust to open upwards if there is insufficient space below."
      },
      story: {
        height: "400px"
      },
      source: `hi`
    }
  }
};

/**
 * All dropdowns story.
 * Demonstrates all dropdowns in a single view.
 */
export const AllDropdowns = {
  render: () => {
    const configs = [Default.args, InactiveDropdown.args, TypeDropdown.args, BranchDropdown.args, NumberDropdown.args, PaginationDropdown.args, DateRangeDropdown.args, BoldLabel.args];

    return (
      <div className="tw:flex tw:flex-col tw:gap-4">
        {configs.map((config, idx) => (
          <Dropdown key={idx} {...config} />
        ))}
      </div>
    );
  }
};
