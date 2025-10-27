/**
 * Planograms component - A form interface for selecting and downloading planograms
 *
 * This component renders a slide-out panel with a form that allows users to select
 * department, category, and unit to find specific planograms for their store.
 * The form fields are conditionally rendered based on previous selections.
 *
 * @param {Object} props - Component props
 * @param {Function} props.onsubmit - Callback function called when form is submitted with form data
 * @param {Array} props.departments - Array of department options for the select dropdown
 * @param {Array} props.categories - Array of category options for the select dropdown
 * @param {Array} props.units - Array of unit options for the select dropdown
 * @param {Function} props.onclose - Callback function called when the close button is clicked
 * @param {string} [props.classname] - Additional CSS classes to apply to the main container
 *
 * @returns {JSX.Element} The rendered Planograms component
 *
 */
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { cn } from '../../../utils/helpers';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';
import Typography from '../Typography/Typography';
import { Select } from '../Form';

const Planograms = ({
  onsubmit,
  departments,
  categories,
  units,
  onclose,
  classname,
}) => {
  const [formData, setFormData] = useState({
    department: '',
    category: '',
    unit: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onsubmit) {
      onsubmit({
        ...formData,
      });
    }
  };
  const handleChange = (field) => (value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="tw:relative tw:flex tw:h-full tw:w-full tw:translate-x-full tw:justify-end tw:overflow-auto tw:transition-all tw:duration-1000 tw:group-[.open]:translate-x-0">
      <div
        className={cn(
          'tw:max-w-md tw:overflow-auto tw:bg-white tw:p-6 tw:lg:p-10',
          classname,
        )}
      >
        <div className="tw:flex tw:justify-end">
          <button
            className="tw:cursor-pointer tw:transition-opacity tw:hover:opacity-50"
            onClick={() => {
              onclose();
            }}
          >
            <Icons.x
              fill="black"
              classname="tw:w-5 tw:h-5 tw:md:w-6 tw:md:h-6"
            />
          </button>
        </div>

        <div className="tw:mt-4 tw:lg:mt-6">
          <Typography
            domtype="h4"
            classname="tw:text-primary tw:mb-4 tw:lg:mb-6 tw:leading-[120%]"
          >
            Planograms
          </Typography>

          <Typography>
            Welcome to the planogram selector. Use this form to search for
            planograms specific to your store.
          </Typography>
        </div>

        <form
          onsubmit={handleSubmit}
          className="tw:relative tw:z-30 tw:mt-8 tw:mb-40 tw:space-y-5 tw:bg-white tw:lg:space-y-6"
        >
          <Typography className="tw:text-sm tw:text-grey-600">
            All fields are required.
          </Typography>

          <Select
            label="Select a department"
            value={formData.department}
            onchange={handleChange('department')}
            options={departments}
            placeholder="Select a department"
            classname="tw:w-full"
          />

          {formData.department && (
            <Select
              label="Select a category"
              value={formData.category}
              onchange={handleChange('category')}
              options={categories}
              placeholder="Select a category"
              classname="tw:w-full"
            />
          )}

          {formData.category && (
            <Select
              label="Select a unit"
              value={formData.unit}
              onchange={handleChange('unit')}
              options={units}
              placeholder="Select a unit"
              classname="tw:w-full"
            />
          )}

          {formData.category && formData.department && formData.unit && (
            <Button
              label="Download Planogram"
              variant="tertiary"
              size="default"
              classname="tw:w-full"
              type="submit"
            />
          )}
        </form>

        <Icons.gfxChevron classname="tw:size-[80px] tw:sm:size-[100px] tw:md:size-[120px] tw:lg:size-[140px] tw:h-[80px] tw:sm:h-[100px] tw:md:h-[120px] tw:lg:h-[140px] tw:xl:h-[160px] tw:max-h-[12vh] tw:absolute tw:bottom-6 tw:right-6 tw:lg:bottom-10 tw:lg:right-10" />
      </div>
    </div>
  );
};

export default Planograms;
