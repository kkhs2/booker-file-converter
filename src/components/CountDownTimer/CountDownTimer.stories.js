import CountDownTimer from './CountDownTimer';

export default {
  title: 'Components/Countdown Timer',
  component: CountDownTimer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A countdown timer component that displays time remaining until a target date.',
      },
    },
  },
  argTypes: {
    targetDate: {
      control: 'date',
      description: 'The target date to count down to',
    },
    classname: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    onComplete: {
      action: 'completed',
      description: 'Callback function when countdown reaches zero',
    },
  },
};

// Helper function to create future dates
const createFutureDate = (hours = 6, minutes = 32, seconds = 13) => {
  const now = new Date();
  return new Date(
    now.getTime() +
      hours * 60 * 60 * 1000 +
      minutes * 60 * 1000 +
      seconds * 1000,
  );
};

export const Default = {
  args: {
    targetDate: createFutureDate(),
  },
};

export const ShortCountdown = {
  args: {
    targetDate: createFutureDate(0, 2, 30), // 2 minutes 30 seconds
  },
};

export const LongCountdown = {
  args: {
    targetDate: createFutureDate(24, 0, 0), // 24 hours
  },
};

export const AlmostExpired = {
  args: {
    targetDate: createFutureDate(0, 0, 10), // 10 seconds
  },
};

export const CustomStyling = {
  args: {
    targetDate: createFutureDate(),
    classname: 'tw:bg-tertiary-500 tw:border-tertiary-500 tw:text-black-1000',
  },
};

export const WithCallback = {
  args: {
    targetDate: createFutureDate(0, 0, 5), // 5 seconds
    onComplete: () => console.log('Countdown completed!'),
  },
};

// Example with past date (expired)
export const Expired = {
  args: {
    targetDate: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
  },
};
