import ClosingCountDown from './ClosingCountDown';

export default {
  title: 'Components/Closing Count Down',
  component: ClosingCountDown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A countdown timer component that displays days, hours, and minutes remaining until a specific closing date. Updates every minute.',
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
  },
};

export const Default = {
  args: {
    targetDate: new Date(2025, 11, 31, 23, 59, 59),
  },
};
