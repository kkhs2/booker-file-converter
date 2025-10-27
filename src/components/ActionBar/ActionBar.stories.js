import ActionBar from './ActionBar';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';

export default {
  title: 'Components/Action Bar',
  component: ActionBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The ActionBar component is used to group actions related to a specific section
of content. It can be used to provide a title, and a set of buttons or other
actions.

The ActionBar component accepts a title prop which is rendered as a heading
above the actions. The component also accepts a children prop which should be
rendered as a set of actions, typically buttons.

The ActionBar component is typically used at the top of a section of content to
group related actions. It can also be used inline with content to group actions
related to a specific piece of content.
`,
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    classname: { control: 'text' },
  },
};

/**
 * Default example with multiple buttons
 */
export const Default = () => (
  <ActionBar
    title="Description"
    children={
      <>
        <Button
          variant="secondary"
          label="Clear selection"
          onclick={() => console.log('Clear selection clicked')}
          iconright={() => <Icons.chevronUp />}
        />
        <Button
          variant="tertiary"
          label="File this claim"
          onclick={() => console.log('File this claim clicked')}
        />
      </>
    }
  />
);

/**
 * Example with only one button and no title
 */
export const SingleButton = () => (
  <ActionBar
    children={
      <Button
        variant="tertiary"
        label="Submit claim"
        onclick={() => console.log('Submit claim clicked')}
      />
    }
  />
);

/**
 * Example with title only and multiple buttons
 */
export const WithTitleOnly = () => (
  <ActionBar
    title="Review your claim before submitting"
    children={
      <>
        <Button
          variant="secondary"
          label="Go back"
          onclick={() => console.log('Go back clicked')}
        />
        <Button
          variant="tertiary"
          label="Submit claim"
          onclick={() => console.log('Submit claim clicked')}
        />
      </>
    }
  />
);
