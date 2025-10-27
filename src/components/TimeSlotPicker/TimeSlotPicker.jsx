import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { cn } from '../../../utils/helpers';
import Icons from '../Icons/Icons';
import Button from '../Button/Button';

/**
 * Time Slot Picker Component
 * @description Displays available time slots in a weekly grid view.
 * @param {Object} props - The props object.
 * @param {string} props.monthrange - The displayed month range (e.g., "March - April").
 * @param {Array<string>} props.days - Array of day labels for the columns (e.g., ["Tomorrow", "Tue 30", ...]).
 * @param {Array<string>} props.timelabels - Array of time labels for the rows (e.g., ["09:00 - 10:00", ...]).
 * @param {Array<Array<Object>>} props.slots - A 2D array representing the grid slots. Each object should have an `isAvailable` boolean property.
 * @param {Function} props.onpreviousweek - Callback for the "Previous 7 days" button.
 * @param {Function} props.onnextweek - Callback for the "Next 7 days" button.
 * @param {Function} props.onslotselect - Callback when an available slot is clicked, passing the selected slot object { dayIndex, timeIndex } or null if deselected.
 * @returns {JSX.Element} - The TimeSlotPicker component.
 */
export const TimeSlotPicker = ({
  monthrange,
  days,
  timelabels = [],
  slots = [],
  onpreviousweek = () => console.log('Previous week clicked'),
  onnextweek = () => console.log('Next week clicked'),
  onslotselect = (selectedSlot) => console.log(`Slot selected:`, selectedSlot),
}) => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const numTimes = timelabels.length;
  const numDays = days.length;
  const finalSlots =
    slots.length === numTimes && slots.every((row) => row.length === numDays)
      ? slots
      : Array(numTimes)
          .fill(null)
          .map(() => Array(numDays).fill({ isAvailable: true }));

  const handleSlotClick = (dayIndex, timeIndex) => {
    const clickedSlot = { dayIndex, timeIndex };
    let newSelectedSlot = null;

    if (
      selectedSlot &&
      selectedSlot.dayIndex === dayIndex &&
      selectedSlot.timeIndex === timeIndex
    ) {
      newSelectedSlot = null;
    } else {
      newSelectedSlot = clickedSlot;
    }

    setSelectedSlot(newSelectedSlot);
    onslotselect(newSelectedSlot);
  };

  return (
    <div className="tw:rounded-lg tw:bg-white tw:p-3 tw:lg:p-4">
      <div className="tw:flex tw:flex-col tw:max-lg:space-y-5 tw:lg:flex-row tw:lg:items-center tw:lg:justify-between">
        <div className="tw:flex tw:items-center tw:gap-2">
          <Icons.calendar />
          <h2 className="tw:text-xl tw:font-semibold tw:text-neutral-800">
            {monthrange}
          </h2>
        </div>

        <div className="tw:flex tw:items-center tw:gap-2">
          <Button
            variant="secondary"
            size="small"
            label="Previous 7 days"
            iconleft={<Icons.chevronLeft classname="tw:h-4 tw:w-4" />}
            onclick={onpreviousweek}
            state="disabled"
          />
          <Button
            variant="secondary"
            size="small"
            label="Next 7 days"
            iconright={<Icons.chevronRight classname="tw:h-4 tw:w-4" />}
            onclick={onnextweek}
          />
        </div>
      </div>

      <div className="tw:mt-4 tw:max-w-[820px] tw:overflow-x-auto tw:lg:mt-6">
        {/* Grid */}
        <div
          className="tw:grid tw:gap-2"
          style={{ gridTemplateColumns: `auto repeat(${numDays}, 1fr)` }}
        >
          <div />

          {/* Day Headers */}
          {days.map((day, index) => (
            <div
              key={index}
              className="tw:py-3 tw:text-center tw:text-lg tw:font-medium tw:text-neutral-700 tw:lg:py-4 tw:lg:text-xl"
            >
              {day}
            </div>
          ))}

          {/* Time Labels and Slots */}
          {timelabels.map((time, timeIndex) => (
            <Fragment key={timeIndex}>
              <div className="tw:flex tw:items-center tw:justify-end tw:pr-3 tw:text-[13px] tw:font-medium tw:whitespace-nowrap tw:text-neutral-600 tw:lg:text-lg">
                {time}
              </div>

              {/* Slots for this time */}
              {finalSlots[timeIndex].map((slot, dayIndex) => {
                const isSelected =
                  selectedSlot &&
                  selectedSlot.dayIndex === dayIndex &&
                  selectedSlot.timeIndex === timeIndex;
                return (
                  <button
                    key={`${dayIndex}-${timeIndex}`}
                    onClick={() =>
                      slot.isAvailable && handleSlotClick(dayIndex, timeIndex)
                    }
                    disabled={!slot.isAvailable}
                    className={cn(
                      'tw:flex tw:h-[38px] tw:w-[82px] tw:shrink-0 tw:items-center tw:justify-center tw:rounded tw:border tw:transition-colors tw:lg:h-[46px] tw:lg:w-[92px]',
                      {
                        'tw:cursor-pointer tw:border-neutral-100 tw:bg-neutral-100 tw:hover:bg-green-100':
                          slot.isAvailable && !isSelected,
                        'tw:cursor-not-allowed tw:border-primary-100 tw:bg-primary-100':
                          !slot.isAvailable,
                        'tw:cursor-pointer tw:border-green-400 tw:bg-green-100 tw:hover:bg-green-100':
                          slot.isAvailable && isSelected,
                      },
                    )}
                    aria-label={
                      slot.isAvailable
                        ? `Select slot for ${days[dayIndex]} at ${time}`
                        : `Slot unavailable for ${days[dayIndex]} at ${time}`
                    }
                    aria-pressed={isSelected}
                  >
                    {!slot.isAvailable && (
                      <Icons.x classname="tw:h-5 tw:w-5 tw:text-red-600" />
                    )}

                    {slot.isAvailable && isSelected && (
                      <Icons.checkMark classname="tw:h-5 tw:w-5 tw:text-green-600" />
                    )}
                  </button>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeSlotPicker;
