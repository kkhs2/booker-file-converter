/**
 * CustomerRating component renders a feedback form for collecting customer insights.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {function} [props.onsubmit] - Callback fired when the form is submitted.
 * @param {string} [props.classname=''] - Additional class names for the root element.
 * @param {Object} [props.initialvalues] - Initial form values.
 * @param {string} [props.initialvalues.rating=''] - Initial rating.
 * @param {string} [props.initialvalues.feedback=''] - Initial feedback.
 *
 * * @returns {JSX.Element} The rendered CustomerRating component.
 */

import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { cn } from '../../../utils/helpers';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import Icons from '../Icons/Icons';
import { TextArea } from '../Form';

const CustomerRating = ({
  onsubmit,
  onclose = () => {},
  submitted = false,
  classname = '',
  initialvalues = {
    rating: '',
    feedback: '',
  },
}) => {
  const [formData, setFormData] = useState(initialvalues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(submitted);
  const [errors, setErrors] = useState({});

  const disabled = false;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.rating) {
      newErrors.rating = 'Please select a rating';
    }

    if (!formData.feedback.trim()) {
      newErrors.feedback = 'Please provide your feedback';
    } else if (formData.feedback.length > maxCharacters) {
      newErrors.feedback = `Feedback must be ${maxCharacters} characters or less`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (onsubmit) {
        await onsubmit({
          ...formData,
        });
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const maxCharacters = 400;

  return (
    <div className="tw:relative tw:flex tw:h-full tw:w-full tw:translate-x-full tw:justify-end tw:overflow-auto tw:transition-all tw:duration-1000 tw:group-[.open]:translate-x-0">
      <div
        className={cn(
          'tw:h-screen tw:max-w-md tw:overflow-auto tw:bg-white tw:p-6',
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

        <div className="tw:my-6 tw:lg:my-8">
          <Typography
            domtype="h4"
            classname="tw:text-primary tw:mb-4 tw:lg:mb-6 tw:leading-[120%]"
          >
            {isSubmitted ? 'Thanks for your feedback!' : 'Help us improve!'}
          </Typography>
          {isSubmitted ? (
            <div className="tw:space-y-4">
              <Typography>
                We appreciate you taking the time to provide your thoughts!
              </Typography>
              <Typography>
                Your feedback is invaluable in enhancing our products, services,
                and your overall experience.
              </Typography>
            </div>
          ) : (
            <Typography>
              Thank you for your order. would you mind telling us how your
              experience was?
            </Typography>
          )}
        </div>

        {!isSubmitted && (
          <form
            onSubmit={handleSubmit}
            className="tw:space-y-6 tw:lg:space-y-8"
          >
            <div>
              <div className="tw:mb-6">
                <div className="tw:flex tw:justify-between tw:gap-2">
                  {[
                    { value: 'poor', icon: Icons.ratingPoor, label: 'Poor' },
                    {
                      value: 'not-good',
                      icon: Icons.ratingNotGood,
                      label: 'Not good',
                    },
                    { value: 'fair', icon: Icons.ratingFair, label: 'Fair' },
                    { value: 'good', icon: Icons.ratingGood, label: 'Good' },
                    {
                      value: 'excellent',
                      icon: Icons.ratingExcellent,
                      label: 'Excellent',
                    },
                  ].map((rating) => {
                    const IconComponent = rating.icon;
                    const isSelected = formData.rating === rating.value;
                    return (
                      <div
                        key={rating.value}
                        className="tw:flex tw:flex-col tw:items-center tw:gap-2"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, rating: rating.value })
                          }
                          disabled={disabled || isSubmitting}
                          className={cn(
                            'tw:cursor-pointer tw:rounded-full tw:transition-all tw:duration-200 tw:focus:ring-0 tw:focus:outline-none',
                            (disabled || isSubmitting) &&
                              'tw:cursor-not-allowed tw:opacity-50',
                          )}
                        >
                          <IconComponent
                            accentcolor={isSelected ? 'white' : '#FC4C02'}
                            bgcolor={isSelected ? '#FC4C02' : 'white'}
                            classname={cn(
                              'tw:w-12 tw:h-12 tw:lg:w-16 tw:lg:h-16',
                              {
                                'tw:text-primary': isSelected,
                                'tw:text-black': !isSelected,
                              },
                            )}
                          />
                        </button>
                        <Typography className="tw:text-center tw:text-sm tw:text-grey-600">
                          {rating.label}
                        </Typography>
                      </div>
                    );
                  })}
                </div>
              </div>
              <TextArea
                label="Your feedback"
                value={formData.feedback}
                onInput={(e) =>
                  setFormData({ ...formData, feedback: e.target.value })
                }
                rows={4}
                maxlength={maxCharacters}
                showcharactercount
                error={errors.feedback}
                classname="tw:w-full"
              />
            </div>
            <div className="tw:space-y-4 tw:pt-4">
              <Button
                label={isSubmitting ? 'Submitting...' : 'Submit'}
                variant="tertiary"
                size="default"
                state={disabled || isSubmitting ? 'disabled' : 'enabled'}
                classname="tw:w-full"
                type="submit"
              />

              <Button
                label="Maybe later"
                variant="secondary"
                type="button"
                classname="tw:w-full"
                onclick={onclose}
              />
            </div>
          </form>
        )}

        {isSubmitted && (
          <Button
            label="Continue shopping"
            variant="tertiary"
            size="default"
            classname="tw:w-full"
            type="button"
            onclick={() => {
              onclose();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerRating;
