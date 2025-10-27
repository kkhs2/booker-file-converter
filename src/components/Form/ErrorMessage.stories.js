import { h } from 'preact';
import { ErrorMessage } from './ErrorMessage';
import Typography from '../../components/Typography/Typography';

export default {
  title: 'Form/ErrorMessage',
  component: ErrorMessage,
  argTypes: {
    message: { control: 'text' },
    classname: { control: 'text' },
  },
};

const Template = (args) => <ErrorMessage {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: 'The fields below are required to complete your registration.',
};

export const CustomMessage = Template.bind({});
CustomMessage.args = {
  message: 'Please fix the errors in your form and try again.',
};

export const WithCustomClassName = Template.bind({});
WithCustomClassName.args = {
  message: 'There was a problem with your submission.',
  classname: 'tw:border tw:border-red-300',
};

export const WithChildren = () => (
  <ErrorMessage>
    <div>
      <Typography
        content="The following fields have errors:"
        classname="tw:text-base tw:font-medium tw:mb-2"
      />
      <ul className="tw:list-disc tw:pl-5">
        <li>First name is required</li>
        <li>Email format is invalid</li>
        <li>Password must be at least 8 characters</li>
      </ul>
    </div>
  </ErrorMessage>
);

export const ComplexChildren = () => (
  <ErrorMessage>
    <div className="tw:space-y-4">
      <Typography
        content="We couldn't process your registration"
        classname="tw:text-base tw:font-bold"
      />
      <p>Please correct the following issues:</p>
      <ul className="tw:list-disc tw:pl-5">
        <li>Email address is already in use</li>
        <li>Phone number format is invalid</li>
      </ul>
      <div className="tw:mt-2">
        <a href="#" className="tw:text-primary tw:underline">
          Need help?
        </a>
      </div>
    </div>
  </ErrorMessage>
);
