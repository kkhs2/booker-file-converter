/**
 * Storybook configuration for the AccountCard component
 * This defines how the AccountCard component will appear in Storybook and what controls/options are available.
 */

// Import the component
import { convertPropsToString } from '../../../utils/storybookHelpers';
import Icons from '../Icons/Icons';
import AccountCard from './AccountCard';

// Define the story configuration
export default {
  // The title under which the AccountCard component will appear in Storybook's navigation
  title: 'Cards/Account Card',

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the component
  argTypes: {},

  // Added to override default story height if needed for this component
  parameters: {
    docs: {
      story: {
        height: '300px',
      },
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          const props = convertPropsToString(args);

          return `<AccountCard\n ${props}\n />`;
        },
      },
      description: {
        component: `
  The Account Card component is a visual representation of progress in a spending or saving context. It displays the current progress as a percentage of the total steps.
            
  ### Design Figma References
  - [Account Card UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=4798-28858&m=dev)
  `,
      },
    },
  },
};

const colors = ['#26176F', '#B6284B', '#FF8000', '#06C167'];

/**
 * Template for rendering the AccountCard component.
 * The args object provides dynamic values for different stories.
 */
const Template = (args) => AccountCard(args);

/**
 * Default story.
 * Demonstrates basic usage with default settings.
 */
export const Default = Template.bind({});
Default.args = {
  title: 'Total On Trade savings',
  accentcolor: '#26176F',
  cost: '£657.24',
  costwithvat: '£896.24',
  image: './images/beverage-card-bg.jpg',
  icon: Icons.glass,
};

export const Food = Template.bind({});
Food.args = {
  ...Default.args,
  accentcolor: colors[1],
  image: './images/fast-food-card-bg.png',
  icon: Icons.fastFood,
};

export const Burger = Template.bind({});
Burger.args = {
  ...Default.args,
  accentcolor: colors[2],
  image: './images/burger-card-bg.jpg',
  icon: Icons.takeAway,
};

export const Fries = Template.bind({});
Fries.args = {
  ...Default.args,
  accentcolor: colors[3],
  image: './images/fries-card-bg.jpg',
  icon: (props) => <img src="./images/uber-eats-logo.png" {...props} />,
};

/**
 * All variations story.
 * Demonstrates different component configurations in a single view.
 */
export const AllVariations = {
  render: () => {
    const configs = [Default.args, Food.args, Burger.args, Fries.args];

    return (
      <div className="tw:container tw:flex tw:flex-col tw:gap-8">
        {configs.map((config, index) => (
          <div key={index} className="tw:space-y-8">
            <Template {...config} />
          </div>
        ))}
      </div>
    );
  },
};
