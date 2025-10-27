/**
 * TrackDeliveries Component
 *
 * Displays delivery tracking information with QR code, track tag ID, and action buttons
 *
 * @param {Object} props - Component props
 * @param {string} props.tracktagid - The tracking ID for the delivery
 * @param {string} props.qrcodeurl - URL for the QR code image
 * @param {string} props.trackingurl - URL for the tracking page
 * @param {Function} props.onprint - Callback function for print action
 * @param {Function} props.ongeneratetag - Callback function for generating a new
 * @param {string} props.classname - Additional CSS classes
 *
 * @returns {JSX.Element} - The TrackDeliveries component
 */

import { h, Fragment } from 'preact';
import { cn, useMediaQuery } from '../../../utils/helpers';
import { useState } from 'preact/hooks';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';
import Typography from '../Typography/Typography';
import { Modal } from '../Modal/Modal';

const TrackDeliveries = ({
  tracktagid,
  qrcodeurl,
  trackingurl,
  classname,
  allowgeneratetag = true,
  onprint = () => {},
  ongeneratetag = () => {},
  ...props
}) => {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const [showModal, setShowModal] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(trackingurl);
  };

  return (
    <>
      <div className={cn(classname)} {...props}>
        {/* Header */}
        <div className="tw:mb-5 tw:flex tw:flex-col tw:items-start tw:justify-between tw:max-lg:space-y-5 tw:lg:mb-8 tw:lg:flex-row">
          <div>
            <Typography domtype="h4" classname="tw:font-medium">
              Track your deliveries
            </Typography>
            <Typography domtype="h7" classname="tw:mt-3 tw:hidden tw:lg:block">
              This is your unique Tracking QR Code.
            </Typography>
          </div>
          <Button
            label="View Delivery Tracker"
            variant={isMobile ? 'secondary' : 'tertiary'}
            size="default"
          />
        </div>

        {/* Content Grid */}
        <div className="tw:grid tw:grid-cols-1 tw:gap-8 tw:rounded-[20px] tw:bg-white tw:p-4 tw:lg:grid-cols-16 tw:lg:gap-18 tw:lg:p-6">
          {/* QR Code Section */}
          <div className="tw:flex tw:h-full tw:flex-col tw:items-center tw:gap-10 tw:lg:col-span-7 tw:lg:flex-row tw:lg:items-start">
            {isMobile && (
              <div className="tw:text-center">
                <Typography
                  domtype="h7"
                  classname="tw:mb-3 tw:text-lg tw:block"
                >
                  Your TrackTag ID
                </Typography>
                <Typography domtype="h6" classname="tw:font-semibold">
                  {tracktagid}
                </Typography>
              </div>
            )}
            <div className="tw:relative tw:shrink-0 tw:self-center tw:rounded-lg tw:border tw:border-black tw:bg-white">
              <img
                src={qrcodeurl}
                alt="QR Code for delivery tracking"
                className="tw:h-[180px] tw:w-auto tw:object-contain tw:p-2 tw:lg:h-[230px]"
              />
              <div className="tw:rounded-b tw:bg-black-1000 tw:py-2.5 tw:text-center tw:text-sm tw:font-medium tw:tracking-wider tw:text-white-1000">
                SCAN ME
              </div>
            </div>

            <div className="tw:flex tw:h-full tw:w-full tw:flex-col tw:justify-between">
              {/* Track Tag ID */}
              {!isMobile && (
                <div className="tw:text-center">
                  <p className="tw:mb-3 tw:text-lg tw:lg:mb-4 tw:lg:pt-6 tw:lg:text-xl">
                    Your TrackTag ID
                  </p>
                  <Typography domtype="h6" classname="tw:font-semibold">
                    {tracktagid}
                  </Typography>
                </div>
              )}

              {/* Action Buttons */}
              <div className="tw:flex tw:w-full tw:flex-col tw:gap-3">
                <Button
                  label="Print QR Code"
                  variant="secondary"
                  onClick={() => onprint()}
                  size="default"
                  iconleft={<Icons.printer classname="tw:w-4 tw:h-4" />}
                  classname="tw:max-lg:w-full"
                />
                <Button
                  label="Generate new TrackTag"
                  variant="secondary"
                  size="default"
                  state={allowgeneratetag ? 'enabled' : 'disabled'}
                  onClick={() => setShowModal(true)}
                  classname="tw:max-lg:w-full"
                />
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="tw:space-y-6 tw:rounded-[20px] tw:bg-secondary-1000 tw:p-5 tw:lg:col-span-9 tw:lg:p-6">
            <div>
              <p className="tw:text-lg tw:leading-relaxed">
                Scan this unique QR Code to access your delivery tracking
                schedule. It provides real-time delivery statuses and estimated
                delivery times without having to log in to Booker.co.uk.
              </p>
            </div>

            <div>
              <p className="tw:mb-4 tw:text-lg tw:leading-relaxed">
                For easy access you can print and display it in your business.
                Alternatively you and your colleagues can view your deliveries
                by entering your Customer Number and TrackTag ID using the link
                below:
              </p>

              {/* Tracking URL Section */}
              <div className="tw:flex tw:flex-col tw:items-center tw:gap-6 tw:max-lg:space-y-4 tw:lg:flex-row">
                <span className="tw:text-lg tw:font-medium">{trackingurl}</span>
                <Button
                  variant="inverse"
                  onClick={handleCopyLink}
                  label="Copy link"
                  iconleft={<Icons.copy classname="tw:w-4 tw:h-4" />}
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isopen={showModal}
        onclose={() => setShowModal(false)}
        title="Are you sure you want to generate a new TrackTag?"
        description="Your existing TrackTag/QR Code will no longer be valid and will no longer work. You can only generate one new TrackTag/QR Code per day in your account."
        classname="tw:max-w-[568px]"
        buttonscomponent={() => (
          <>
            <Button
              label="Cancel"
              variant="secondary"
              onClick={() => setShowModal(false)}
            />
            <Button
              label="Yes, generate new TrackTag"
              variant="tertiary"
              onClick={ongeneratetag}
            />
          </>
        )}
      ></Modal>
    </>
  );
};

export default TrackDeliveries;
