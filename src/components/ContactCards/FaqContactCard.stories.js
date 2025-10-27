import FaqContactCard from './FaqContactCard';
import Typography from '../Typography/Typography';
import Icons from '../Icons/Icons';

export default {
  title: 'Cards/Faq Contact Card',
  tags: ['autodocs'],
  component: FaqContactCard,
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#FAF9F5',
        },
      ],
    },
  },
};

export const LinkVariant = {
  render: () => (
    <div className="tw:w-[400px]">
      <FaqContactCard
        title="Find a branch"
        variant="link"
        href="/find-a-branch"
        label="Find nearby branch"
        icon={<Icons.frown />}
      >
        <Typography>
          Go to the Find a Branch to get more details on how to get in touch
          directly.
        </Typography>
      </FaqContactCard>
    </div>
  ),
};

export const EmailVariant = {
  render: () => (
    <div className="tw:w-[400px]">
      <FaqContactCard
        title="Report a problem"
        variant="email"
        href="support@booker.com"
        icon={<Icons.frown />}
      >
        <Typography>
          Contact your local store directly. For a Booker generic complaint, use
          the email below.
        </Typography>
      </FaqContactCard>
    </div>
  ),
};

export const NoIcon = {
  render: () => (
    <div className="tw:w-[400px]">
      <FaqContactCard
        title="Customer Support"
        variant="link"
        href="/customer-support"
        label="View help center"
      >
        <Typography>
          Get help with your account, orders, and delivery options.
        </Typography>
      </FaqContactCard>
    </div>
  ),
};

export const CustomWidth = {
  render: () => (
    <div className="tw:w-[600px]">
      <FaqContactCard
        title="Contact us"
        variant="email"
        href="contact@booker.com"
        label="Send us an email"
        classname="tw:bg-secondary-100"
      >
        <Typography>
          Our customer service team is available Monday to Friday, 9am to 5pm.
        </Typography>
      </FaqContactCard>
    </div>
  ),
};
