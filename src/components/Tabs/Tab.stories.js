/**
 *  Storybook configuration for the Tab component.
 *  This defines how the Tab component will appear in Storybook and what controls/options are available.
 
 */

import { Tab, TabList } from './Tab';
import Icons from '../Icons/Icons';

export default {
  title: 'Sections/Tab',
  component: Tab,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#FAF9F5',
        },
      ],
    },
    docs: {
      description: {
        component: `

A flexible tab component that supports icons, titles, and expandable content. Tabs can be controlled by setting a default open tab and supports both vertical and horizontal layouts.

### Features
- Supports icons on the left
- Responsive design with mobile-specific behaviors
- Animated transitions
- Optional default open tab
- Vertical and horizontal layout variants

### Design Figma References
- [Tab UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=4177-86480&m=dev)
`,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout variant for the tabs',
    },
    defaultOpenId: {
      control: 'text',
      description: 'ID of the tab to open by default',
    },
  },
};

const Template = (args) => (
  <TabList defaultOpenId={args.defaultOpenId} variant={args.variant}>
    <Tab
      id="tab1"
      title="Product Information"
      icon={<Icons.file classname="tw:w-6 tw:h-6 tw:text-black tw:mr-2" />}
    >
      <p>This is the content for tab 1. You can put any content here.</p>
      <p className="tw:mt-4">
        Multiple paragraphs and other components are supported.
      </p>
    </Tab>
    <Tab
      id="tab2"
      title="Delivery Details"
      icon={
        <Icons.ingredients classname="tw:w-6 tw:h-6 tw:text-black tw:mr-2" />
      }
    >
      <p>This is the content for tab 2.</p>
      <ul className="tw:mt-4 tw:list-inside tw:list-disc">
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
      </ul>
    </Tab>
    <Tab
      id="tab3"
      title="Customer Reviews"
      icon={<Icons.user classname="tw:w-6 tw:h-6 tw:text-black tw:mr-2" />}
    >
      <p>This is the content for tab 3.</p>
    </Tab>
  </TabList>
);

export const Default = Template.bind({});
Default.args = {
  defaultOpenId: 'tab1',
  variant: 'vertical',
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  defaultOpenId: 'tab1',
  variant: 'horizontal',
};

export const HorizontalNoDefault = Template.bind({});
HorizontalNoDefault.args = {
  variant: 'horizontal',
};

const HorizontalNoIconsTemplate = (args) => (
  <TabList defaultOpenId={args.defaultOpenId} variant={args.variant}>
    <Tab id="tab1" title="Product Information">
      <p>This is the content for tab 1. You can put any content here.</p>
      <p className="tw:mt-4">
        Multiple paragraphs and other components are supported.
      </p>
    </Tab>
    <Tab id="tab2" title="Delivery Details">
      <p>This is the content for tab 2.</p>
      <ul className="tw:mt-4 tw:list-inside tw:list-disc">
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
      </ul>
    </Tab>
    <Tab id="tab3" title="Customer Reviews">
      <p>This is the content for tab 3.</p>
      <p className="tw:mt-4">
        Here's some additional content to show how the horizontal tabs handle
        varying content heights.
      </p>
    </Tab>
  </TabList>
);

export const HorizontalNoIcons = HorizontalNoIconsTemplate.bind({});
HorizontalNoIcons.args = {
  defaultOpenId: 'tab1',
  variant: 'horizontal',
};
