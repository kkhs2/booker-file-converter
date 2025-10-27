import { useState } from 'preact/hooks';
import StarRating from './StarRating';

export default {
  title: 'Components/Star Rating',
  component: StarRating,
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

          return `<StarRating\n  ${props}\n/>`;
        },
      },

      description: {
        component:
          'A star-based rating component that allows users to select a rating from 1 to 5 stars. Features interactive hover states and customizable labels',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 5, step: 1 },
      description: 'Current rating value (0-5)',
    },
    onchange: { action: 'rating changed' },
    maxrating: {
      control: { type: 'range', min: 3, max: 10, step: 1 },
      description: 'Maximum number of stars',
    },
    label: {
      control: 'text',
      description: 'Label text to display above the rating',
    },
    ratinglabels: {
      control: 'object',
      description: 'Array of labels for each rating value',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the rating input',
    },
    readonly: {
      control: 'boolean',
      description: 'Make the rating read-only',
    },
    classname: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

const ControlledTemplate = (args) => {
  const [rating, setRating] = useState(args.value || 0);

  const handleChange = (newRating) => {
    setRating(newRating);
    if (args.onchange) {
      args.onchange(newRating);
    }
  };

  return (
    <div className="tw:max-w-md tw:p-6">
      <StarRating {...args} value={rating} onchange={handleChange} />
      <div className="tw:mt-4 tw:text-sm tw:text-gray-600">
        Current rating: {rating}
      </div>
    </div>
  );
};

const StaticTemplate = (args) => (
  <div className="tw:max-w-md tw:p-6">
    <StarRating {...args} />
  </div>
);

export const Default = ControlledTemplate.bind({});
Default.args = {
  value: 0,
  label: 'How would you rate your experience?',
  ratinglabels: ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
};

export const WithInitialRating = ControlledTemplate.bind({});
WithInitialRating.args = {
  value: 4,
  label: 'How would you rate the value for money of our products?',
  ratinglabels: ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
};

export const CustomLabels = ControlledTemplate.bind({});
CustomLabels.args = {
  value: 2,
  label:
    'How would you rate the variety and availability of our product range?',
  ratinglabels: ['', 'Terrible', 'Not good', 'Okay', 'Good', 'Amazing'],
};

export const Disabled = StaticTemplate.bind({});
Disabled.args = {
  value: 3,
  label: 'Disabled rating',
  disabled: true,
  ratinglabels: ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
};

export const readonly = StaticTemplate.bind({});
readonly.args = {
  value: 5,
  label: 'Read-only rating',
  readonly: true,
  ratinglabels: ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
};

export const NoLabels = ControlledTemplate.bind({});
NoLabels.args = {
  value: 2,
  label: 'Rating without value labels',
  ratinglabels: [],
};

export const MultipleQuestions = () => (
  <div className="tw:max-w-2xl tw:space-y-8 tw:p-6">
    <div className="tw:space-y-6">
      <h2 className="tw:text-xl tw:font-semibold tw:text-gray-900">
        Customer Feedback Survey
      </h2>

      <StarRating
        value={2}
        label="How would you rate the variety and availability of our product range?"
        ratinglabels={['', 'Poor', 'Not good', 'Fair', 'Good', 'Excellent']}
        onchange={(rating) => console.log('Product range rating:', rating)}
      />

      <StarRating
        value={3}
        label="How would you describe about the quality of the products you've received?"
        ratinglabels={['', 'Poor', 'Not good', 'Fair', 'Good', 'Excellent']}
        onchange={(rating) => console.log('Product quality rating:', rating)}
      />

      <StarRating
        value={4}
        label="How would you rate the value for money of our products?"
        ratinglabels={['', 'Poor', 'Not good', 'Fair', 'Good', 'Excellent']}
        onchange={(rating) => console.log('Value for money rating:', rating)}
      />

      <StarRating
        value={5}
        label="How do you feel about your overall experience with us (delivery, communication, support)?"
        ratinglabels={['', 'Poor', 'Not good', 'Fair', 'Good', 'Excellent']}
        onchange={(rating) => console.log('Overall experience rating:', rating)}
      />
    </div>
  </div>
);
