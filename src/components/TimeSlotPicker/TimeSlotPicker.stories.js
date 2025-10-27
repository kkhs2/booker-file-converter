import TimeSlotPicker from './TimeSlotPicker';

export default {
  title: 'Components/Time Slot Picker',
  component: TimeSlotPicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Displays available time slots in a weekly grid view.
        Each slot can be clicked to select or deselect it. The component also provides
        buttons to navigate to the previous or next week.`,
      },
    },
    layout: 'centered',
  },
  argTypes: {
    monthrange: { control: 'text', description: 'Displayed month range' },
    days: { control: 'object', description: 'Array of day labels' },
    timelabels: { control: 'object', description: 'Array of time labels' },
    slots: {
      control: 'object',
      description:
        '2D array of slot availability objects ({ isAvailable: boolean })',
    },
    onpreviousweek: {
      action: 'previousWeekClicked',
      description: 'Callback for previous week button',
    },
    onnextweek: {
      action: 'nextWeekClicked',
      description: 'Callback for next week button',
    },
    onslotselect: {
      action: 'slotSelected',
      description: 'Callback when an available slot is clicked',
    },
  },
};

// Helper function to create a slot object
const slot = (isAvailable) => ({ isAvailable });

const exampleSlots = [
  // 09:00 - 10:00
  [
    slot(true),
    slot(true),
    slot(true),
    slot(true),
    slot(false),
    slot(false),
    slot(false),
  ],
  // 10:00 - 11:00
  [
    slot(true),
    slot(true),
    slot(true),
    slot(true),
    slot(false),
    slot(false),
    slot(false),
  ],
  // 11:00 - 12:00
  [
    slot(false),
    slot(true),
    slot(true),
    slot(true),
    slot(false),
    slot(false),
    slot(false),
  ],
  // 12:00 - 13:00
  [
    slot(true),
    slot(true),
    slot(false),
    slot(true),
    slot(false),
    slot(false),
    slot(true),
  ],
  // 14:00 - 15:00
  [
    slot(false),
    slot(true),
    slot(true),
    slot(true),
    slot(true),
    slot(false),
    slot(true),
  ],
  // 15:00 - 16:00
  [
    slot(true),
    slot(true),
    slot(true),
    slot(true),
    slot(true),
    slot(false),
    slot(true),
  ],
  // 16:00 - 17:00
  [
    slot(false),
    slot(false),
    slot(true),
    slot(true),
    slot(true),
    slot(false),
    slot(false),
  ],
];

export const Default = {
  args: {
    monthrange: 'March - April',
    days: ['Tomorrow', 'Tue 30', 'Wed 31', 'Thu 1', 'Fri 2', 'Sat 3', 'Mon 5'],
    timelabels: [
      '09:00 - 10:00',
      '10:00 - 11:00',
      '11:00 - 12:00',
      '12:00 - 13:00',
      '14:00 - 15:00',
      '15:00 - 16:00',
      '16:00 - 17:00',
    ],
    slots: exampleSlots,
  },
};

export const Empty = {
  args: {
    monthrange: 'May - June',
    days: ['Mon 1', 'Tue 2', 'Wed 3', 'Thu 4', 'Fri 5', 'Sat 6', 'Sun 7'],
    timelabels: ['09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00'],
    // Intentionally providing empty slots to test default generation
    slots: [],
  },
};
