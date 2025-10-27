import { useState } from 'preact/hooks';
import Typography from '../../Typography/Typography';
import Button from '../../Button/Button';
import StarRating from '../../StarRating/StarRating';
import { TextArea } from '../../Form';

export const YourThoughtsSection = ({ onsubmit, oncancel }) => {
  const [formData, setFormData] = useState({
    productRangeRating: 0,
    productQualityRating: 0,
    productValueRating: 0,
    overallExperienceRating: 0,
    feedback: '',
  });

  const handleRatingChange = (field) => (rating) => {
    setFormData((prev) => ({
      ...prev,
      [field]: rating,
    }));
  };

  const handleFeedbackChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      feedback: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onsubmit(formData);
  };

  return (
    <div className="tw:space-y-6 tw:lg:space-y-8">
      <div className="tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:lg:p-10">
        <Typography domtype="h5" classname="tw:text-primary tw:mt-2">
          Help us improve!
        </Typography>

        <Typography className="tw:mt-4 tw:text-[13px] tw:lg:mt-6 tw:lg:text-lg">
          We're always looking for ways to make your shopping experience better.
          By completing the short form below, your insights can help us improve
          our products, service, and your overall experience.
        </Typography>
      </div>

      <div className="tw:flex tw:gap-10 tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:lg:p-10">
        <div className="tw:w-full tw:space-y-6 tw:lg:w-1/2">
          <StarRating
            value={formData.productRangeRating}
            label="How would you rate the variety and availability of our product range?"
            onchange={handleRatingChange('productRangeRating')}
          />
          <StarRating
            value={formData.productQualityRating}
            label="How would you describe about the quality of the products you've received?"
            onchange={handleRatingChange('productQualityRating')}
          />
          <StarRating
            value={formData.productValueRating}
            label="How would you rate the value for money of our products?"
            onchange={handleRatingChange('productValueRating')}
          />
          <StarRating
            value={formData.overallExperienceRating}
            label="How do you feel about your overall experience with us (delivery, communication, support)?"
            onchange={handleRatingChange('overallExperienceRating')}
          />

          <TextArea
            value={formData.feedback}
            onchange={handleFeedbackChange}
            placeholder="Your feedback"
            rows={6}
            label="Is there anything we can do better? (optional)"
            maxlength={400}
            showcharactercount={true}
          />
        </div>

        <div className="tw:hidden tw:w-1/2 tw:lg:block">
          <img
            src="./images/feedback-bg.png"
            alt="Feedback Background"
            className="tw:h-full tw:w-full tw:rounded-[20px] tw:object-cover tw:object-center"
          />
        </div>
      </div>

      <div className="tw:flex tw:w-full tw:flex-col-reverse tw:items-center tw:justify-between tw:rounded-[20px] tw:bg-white tw:px-5 tw:py-6 tw:max-lg:space-y-4 tw:max-lg:space-y-reverse tw:lg:flex-row tw:lg:p-10">
        <Button
          variant="secondary"
          label="Cancel"
          onclick={(e) => {
            e.preventDefault();
            oncancel();
          }}
          classname="tw:border tw:border-secondary-1300 tw:px-13 tw:max-md:w-full"
        />
        <Button
          variant="tertiary"
          label="Continue"
          onclick={handleSubmit}
          classname="tw:border tw:border-transparent tw:px-13 tw:max-md:w-full"
        />
      </div>
    </div>
  );
};
