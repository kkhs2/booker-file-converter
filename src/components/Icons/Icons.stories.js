/**
 * Storybook configuration for the IconsComponent component
 * This defines how the IconsComponent component will appear in Storybook.
 */

import { h } from 'preact';
import Icons from './Icons';

// Define the story configuration
export default {
  // The title under which the IconsComponent component will appear in Storybook's navigation
  title: 'Components/Icons',

  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: `
This component displays all available icons from the Icons utility in a grid layout with labels.

### Usage
Icons can be imported and used individually from the Icons utility:

\`\`\`jsx
import Icons from './Icons';

// Use an icon with default props
<Icons.twitter />

// Use an icon with custom props
<Icons.twitter classname="tw:w-8 tw:h-8" fill="#000000" />
\`\`\`
        `,
      },
    },
  },
};

// Create an IconsShowcase component to display all icons
const IconsShowcase = ({ className = '', ...props }) => {
  const classes = {
    container:
      'tw:grid tw:grid-cols-2 tw:sm:grid-cols-3 tw:md:grid-cols-4 tw:lg:grid-cols-5 tw:gap-4 tw:p-4',
    iconWrapper:
      'tw:flex tw:flex-col tw:items-center tw:justify-center tw:p-4 tw:border tw:rounded-lg tw:bg-white',
    icon: 'tw:mb-2 tw:w-8 tw:h-8 tw:flex tw:items-center tw:justify-center tw:text-black',
    label: 'tw:text-sm tw:text-gray-600 tw:text-center',
  };

  // Get all icon names and functions from Icons object
  const iconEntries = Object.entries(Icons);

  return (
    <div className={`${classes.container} ${className}`} {...props}>
      {iconEntries.map(([name, IconComponent]) => (
        <div key={name} className={classes.iconWrapper}>
          <div className={classes.icon}>
            {IconComponent({
              classname: 'tw:w-full tw:h-full',
              stroke: 'currentColor',
              fill: 'none',
            })}
          </div>
          <span className={classes.label}>{name}</span>
        </div>
      ))}
    </div>
  );
};

// Template for the story
const Template = (args) => <IconsShowcase {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {};
