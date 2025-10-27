import { h } from 'preact';
import { NutritionCard } from './NutritionCard';

export default {
  title: 'Components/NutritionCard',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A card component for displaying nutritional information with a title, two value lines, and a percentage indicator. Colours can be customized using hex values.',
      },
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

          return `<NutritionCard\n  ${props}\n/>`;
        },
      },
    },
  },
  component: NutritionCard,
  argTypes: {
    title: { control: 'text' },
    valueLine1: { control: 'text' },
    valueLine2: { control: 'text' },
    percentage: { control: 'text' },
    backgroundcolour: {
      control: 'colour',
      description: 'Background colour in hex format',
      defaultValue: '#C8C2A8',
    },
  },
};

const Template = (args) => (
  <div style={{ maxWidth: '220px' }}>
    <NutritionCard {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Energy',
  valueLine1: '102 kJ',
  valueLine2: '25 kcal',
  percentage: '1%',
};

export const Green = Template.bind({});
Green.args = {
  title: 'Fat',
  valueLine1: '0.5g',
  percentage: '<1%',
  backgroundcolour: '#74d139',
};

export const Amber = Template.bind({});
Amber.args = {
  title: 'Saturates',
  valueLine1: '1.5g',
  percentage: '8%',
  backgroundcolour: '#E7AA29',
};

export const Red = Template.bind({});
Red.args = {
  title: 'Sugars',
  valueLine1: '15g',
  percentage: '17%',
  backgroundcolour: '#F74848',
};

export const WithTwoLines = Template.bind({});
WithTwoLines.args = {
  title: 'Energy',
  valueLine1: '204 kJ',
  valueLine2: '50 kcal',
  percentage: '2%',
  backgroundcolour: '#FFA800',
};

export const NoSecondLine = Template.bind({});
NoSecondLine.args = {
  title: 'Salt',
  valueLine1: '0.04g',
  percentage: '1%',
  backgroundcolour: '#74d139',
};

export const AllVariants = () => (
  <div className="tw:flex tw:gap-4">
    <NutritionCard
      title="Energy"
      valueLine1="102 kJ"
      valueLine2="25 kcal"
      percentage="1%"
    />
    <NutritionCard
      title="Fat"
      valueLine1="0.5g"
      percentage="<1%"
      backgroundcolour="#74d139"
    />
    <NutritionCard
      title="Saturates"
      valueLine1="1.5g"
      percentage="8%"
      backgroundcolour="#E7AA29"
    />
    <NutritionCard
      title="Sugars"
      valueLine1="15g"
      percentage="17%"
      backgroundcolour="#F74848"
    />
  </div>
);
