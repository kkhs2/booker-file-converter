import { h, Fragment } from 'preact';
import { cn, useMediaQuery } from '../../../utils/helpers';
import Icons from '../Icons/Icons';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';

/**
 * CreditAccountProgress Component
 *
 * @description A component that displays progress steps for credit account application process.
 * Shows different layouts for desktop (horizontal) and mobile (vertical) views with contextual content.
 * Includes a left-hand content area that changes based on the overall status.
 *
 * @param {Object} props - Component props
 * @param {Array} props.steps - Array of step objects. Each object should contain:
 *   - {string} label - The label for the step
 *   - {string} status - The status of the step ('completed', 'pending')
 *   - {string} stepId - The step identifier to display (e.g., '1', '2', '3', '—')
 *   - {string} id - Unique identifier for the step (optional, auto-generated if not provided)
 * @param {string} [props.status='not-started'] - Overall status of the application ('not-started', 'in-progress', 'completed', 'credit-increase-requested' )
 * @param {Object} [props.content] - Custom content for different states
 * @param {string} [props.terms] - Terms to display in the overview
 * @param {string} [props.creditlimit] - Credit limit amount to display in the overview
 * @param {JSX.Element} [props.button] - Optional Button component to display in the content area
 * @param {string} [props.title] - Title for the component
 * @param {string} [props.message] - Message to display in the component
 * @param {string} [props.classname] - Additional classes to add to the component
 * @returns {JSX.Element} Preact component - The CreditAccountProgress component
 */

const CreditAccountProgress = ({
  steps,
  status = 'not-started',
  content,
  classname,
  creditlimit,
  terms,
  title,
  message,
  button,
  ...props
}) => {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const normalizedSteps = steps.map((step, index) => ({
    ...step,
    id: step.id || `step-${index + 1}`,
  }));

  const hideSteps =
    status === 'completed' ||
    status === 'credit-increase-requested' ||
    status === 'credit-increase-approved';

  const getStepIcon = (step) => {
    switch (step.status) {
      case 'completed':
        return <Icons.checkMark classname="tw:w-4 tw:h-4 tw:text-black" />;
      case 'current':
        return (
          <span className="tw:text-sm tw:font-bold tw:text-black">
            {step.stepId}
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="tw:text-sm tw:font-normal tw:text-black">
            {step.stepId}
          </span>
        );
    }
  };

  const getStepCircleClasses = (step) => {
    const baseClasses =
      'tw:flex tw:items-center tw:justify-center tw:w-12 tw:h-12 tw:rounded-full tw:shrink-0';

    switch (step.status) {
      case 'completed':
        return cn(baseClasses, 'tw:bg-tertiary-500 ');
      case 'pending':
      default:
        return cn(baseClasses, 'tw:bg-grey-200');
    }
  };

  const getStepLabelClasses = (step) => {
    const baseClasses = 'tw:font-medium';

    switch (step.status) {
      case 'completed':
      case 'current':
        return cn(baseClasses, 'tw:text-black');
      case 'pending':
      default:
        return cn(baseClasses, 'tw:text-grey-500');
    }
  };

  const getConnectorClasses = (currentStep) => {
    const baseClasses = 'tw:flex-1 tw:h-px tw:xl:mx-2 tw:mt-5.5';

    if (currentStep.status === 'completed') {
      return cn(baseClasses, 'tw:bg-black');
    }

    return cn(baseClasses, 'tw:border-t tw:border-dotted tw:border-grey-400');
  };

  const getVerticalConnectorClasses = (currentStep) => {
    const baseClasses = 'tw:w-px tw:min-h-6 tw:my-2 tw:ml-6';

    if (currentStep.status === 'completed') {
      return cn(baseClasses, 'tw:bg-black');
    }

    return cn(baseClasses, 'tw:border-l tw:border-dotted tw:border-grey-400');
  };

  const renderLeftContent = () => {
    if (content && content[status]) {
      return content[status];
    }

    switch (status) {
      case 'not-started':
        return (
          <div className="tw:space-y-4">
            {title && (
              <Typography
                domtype="h3"
                classname="tw:font-medium tw:leading-[120%] tw:mb-2 tw:lg:mb-2"
              >
                {title}
              </Typography>
            )}
            {message && (
              <Typography classname="tw:mb-5 tw:lg:mb-6">{message}</Typography>
            )}

            {button || (
              <Button
                variant="primary"
                label="Apply for a credit account"
                classname="tw:w-full tw:lg:w-auto tw:lg:px-6 tw:py-3 tw:lg:py-4 tw:text-base tw:leading-none tw:border-none tw:lg:text-lg"
                onClick={() => console.log('Get Started Clicked')}
                iconright={<Icons.chevronRight classname="tw:w-4 tw:h-4" />}
              />
            )}
          </div>
        );
      case 'in-progress':
        return (
          <div className="tw:flex tw:flex-col tw:items-start tw:justify-between">
            <div className="tw:space-y-4">
              {title && (
                <Typography
                  domtype="h3"
                  classname="tw:font-medium tw:leading-[120%] tw:mb-2 tw:lg:mb-2"
                >
                  {title}
                </Typography>
              )}
              {message && (
                <Typography classname="tw:mb-5 tw:lg:mb-6">
                  {message}
                </Typography>
              )}
            </div>

            {button || (
              <div className="tw:inline-flex tw:w-full tw:justify-center tw:rounded-[120px] tw:bg-beige-1000 tw:px-4 tw:py-3 tw:text-base tw:leading-none tw:font-medium tw:lg:w-auto tw:lg:px-6 tw:lg:py-4 tw:lg:text-lg">
                Credit application in progress...
              </div>
            )}
          </div>
        );
      case 'completed':
        return (
          <div className="tw:space-y-4">
            {title && (
              <Typography
                domtype="h3"
                classname="tw:font-medium tw:leading-[120%] tw:mb-2 tw:lg:mb-2"
              >
                {title}
              </Typography>
            )}
            {message && (
              <Typography classname="tw:mb-5 tw:lg:mb-6">{message}</Typography>
            )}

            <div className="tw:flex tw:flex-col tw:items-start tw:lg:flex-row tw:lg:items-center tw:lg:justify-between">
              <div className="tw:flex tw:flex-col tw:gap-3 tw:lg:flex-row">
                {creditlimit && (
                  <div className="tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:bg-white tw:px-3 tw:py-3.5">
                    <Icons.user classname="tw:w-4 tw:h-4 tw:shrink-0" />
                    <span className="tw:text-[13px] tw:lg:text-base">
                      Credit limit
                    </span>

                    <span className="tw:mx-2 tw:hidden tw:h-0.5 tw:w-0.5 tw:rounded-full tw:bg-black tw:lg:block" />
                    <span className="tw:ml-auto tw:text-[13px] tw:font-medium tw:lg:text-base">
                      {creditlimit}
                    </span>
                  </div>
                )}
                {terms && (
                  <div className="tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:bg-white tw:px-3 tw:py-3.5">
                    <Icons.file classname="tw:w-4 tw:h-4 tw:shrink-0" />
                    <span className="tw:text-[13px] tw:lg:text-base">
                      Credit terms
                    </span>
                    <span className="tw:mx-2 tw:hidden tw:h-0.5 tw:w-0.5 tw:rounded-full tw:bg-black tw:lg:block" />
                    <span className="tw:ml-auto tw:text-[13px] tw:font-medium tw:lg:text-base">
                      {terms}
                    </span>
                  </div>
                )}
              </div>

              {button && <div className="tw:mt-5 tw:lg:mt-0">{button}</div>}
            </div>
          </div>
        );
      case 'credit-increase-requested':
        return (
          <div className="tw:space-y-4">
            {title && (
              <Typography
                domtype="h3"
                classname="tw:font-medium tw:leading-[120%] tw:mb-2 tw:lg:mb-2"
              >
                {title}
              </Typography>
            )}
            {message && (
              <Typography classname="tw:mb-5 tw:lg:mb-6">{message}</Typography>
            )}

            <div className="tw:flex tw:flex-col tw:items-start tw:lg:flex-row tw:lg:items-center tw:lg:justify-between">
              <div className="tw:flex tw:flex-col tw:gap-3 tw:lg:flex-row">
                {creditlimit && (
                  <div className="tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:bg-white tw:px-3 tw:py-3.5">
                    <Icons.user classname="tw:w-4 tw:h-4 tw:shrink-0" />
                    <span className="tw:text-[13px] tw:lg:text-base">
                      Credit limit
                    </span>

                    <span className="tw:mx-2 tw:hidden tw:h-0.5 tw:w-0.5 tw:rounded-full tw:bg-black tw:lg:block" />
                    <span className="tw:ml-auto tw:text-[13px] tw:font-medium tw:lg:text-base">
                      {creditlimit}
                    </span>
                  </div>
                )}
                {terms && (
                  <div className="tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:bg-white tw:px-3 tw:py-3.5">
                    <Icons.file classname="tw:w-4 tw:h-4 tw:shrink-0" />
                    <span className="tw:text-[13px] tw:lg:text-base">
                      Credit terms
                    </span>
                    <span className="tw:mx-2 tw:hidden tw:h-0.5 tw:w-0.5 tw:rounded-full tw:bg-black tw:lg:block" />
                    <span className="tw:ml-auto tw:text-[13px] tw:font-medium tw:lg:text-base">
                      {terms}
                    </span>
                  </div>
                )}
              </div>

              {button || (
                <div className="tw:mt-5 tw:inline-flex tw:w-full tw:justify-center tw:rounded-[120px] tw:bg-beige-1000 tw:px-4 tw:py-3 tw:text-base tw:leading-none tw:font-medium tw:lg:mt-0 tw:lg:w-auto tw:lg:px-6 tw:lg:py-4 tw:lg:text-lg">
                  Credit increase under review...
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderStepperContent = () => (
    <div className="tw:w-full">
      {isMobile ? (
        <div className="tw:flex tw:flex-col">
          {normalizedSteps.map((step, index) => (
            <Fragment key={step.id}>
              {index > 0 && (
                <div>
                  <div
                    className={getVerticalConnectorClasses(
                      normalizedSteps[index],
                    )}
                  />
                </div>
              )}

              <div className="tw:flex tw:items-center">
                <div className={getStepCircleClasses(step)}>
                  {getStepIcon(step, index)}
                </div>
                <div className="tw:ml-3">
                  <Typography
                    domtype="h7"
                    classname={getStepLabelClasses(step)}
                  >
                    {step.label}
                  </Typography>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      ) : (
        <div className="tw:flex tw:w-full tw:items-start tw:justify-between">
          {normalizedSteps.map((step, index) => (
            <Fragment key={step.id}>
              {index > 0 && (
                <div className={getConnectorClasses(normalizedSteps[index])} />
              )}

              <div className="tw:flex tw:max-w-[90px] tw:flex-col tw:items-center tw:justify-between tw:text-center">
                <div className={getStepCircleClasses(step)}>
                  {getStepIcon(step, index)}
                </div>
                <div className="tw:mt-4">
                  <Typography
                    domtype="h7"
                    classname={getStepLabelClasses(step)}
                  >
                    {step.label}
                  </Typography>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      className={cn(
        'tw:w-full tw:rounded-[20px] tw:bg-primary tw:p-4 tw:lg:p-8',
        classname,
      )}
      {...props}
    >
      <div className="tw:items-stretch tw:gap-8 tw:max-lg:space-y-2 tw:lg:flex">
        <div
          className={cn(
            'tw:w-full tw:rounded-[20px] tw:bg-secondary-1000 tw:px-5 tw:py-3 tw:lg:px-8 tw:lg:py-4',
            hideSteps ? 'tw:lg:max-w-full' : 'tw:lg:max-w-[500px]',
          )}
        >
          {renderLeftContent()}
        </div>

        {!hideSteps && (
          <div className="tw:flex tw:flex-1 tw:items-center tw:rounded-[20px] tw:bg-secondary-1000 tw:px-5 tw:py-4 tw:lg:px-8 tw:lg:py-4">
            {renderStepperContent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditAccountProgress;
