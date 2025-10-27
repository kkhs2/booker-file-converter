import React from 'react';
import Accordion from './Accordion';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    items: { control: 'object' },
    title: { control: 'text' },
    description: { control: 'text' },
    allowmultiple: { control: 'boolean' },
    defaultopenindex: { control: 'number' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Accessible accordion component with keyboard navigation support. Users can navigate between accordion items using arrow keys, Home, and End keys. Enter or Space key toggles the accordion items.',
      },
      source: {
        transform: (source, storyContext) => {
          // Get the story args
          const { args } = storyContext;
          if (!args) return source;

          // Convert args to JSX props string
          const props = Object.entries(args)
            .map(([key, value]) => {
              // Handle special cases
              if (typeof value === 'boolean') {
                return value ? key : null;
              }
              if (typeof value === 'string') {
                return `${key}="${value}"`;
              }
              return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<Accordion\n  ${props}\n/>`;
        },
      },
    },
  },
};

const Template = (args) => <Accordion {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      question: 'When I order, who will do my shopping for me?',
      answer:
        'Our dedicated team of personal shoppers will carefully select your items based on your order specifications.',
    },
    {
      question: 'How do I print a list of products from the website?',
      answer:
        'You can usually find a "Print" or "Export" option in your order history or basket page. Alternatively, use your browser\'s print function (Ctrl+P or Cmd+P).',
    },
    {
      question: 'What is Spend & Save?',
      answer:
        'Spend & Save is our loyalty program where you earn points or discounts based on how much you spend with us over a certain period.',
    },
    {
      question:
        'Where can I find your Safety Data Sheets to help us comply with COSHH requirements?',
      answer:
        'Safety Data Sheets (SDS) for relevant products are typically available on the product detail page or through a dedicated "Safety Information" section on our website. Please contact customer support if you cannot locate a specific SDS.',
    },
    {
      question: 'I have a survey invitation',
      answer:
        'Thank you for participating! Please click the link provided in your invitation email or notification to access the survey.',
    },
    {
      question: 'Do you export to other countries?',
      answer:
        'Currently, we primarily serve the domestic market. Please check our shipping policy page or contact customer service for the most up-to-date information on international shipping capabilities.',
    },
  ],
  allowmultiple: false,
  defaultopenindex: null,
};

export const WithFirstItemOpen = Template.bind({});
WithFirstItemOpen.args = {
  ...Default.args,
  defaultopenindex: 0,
};

export const SingleItem = Template.bind({});
SingleItem.args = {
  items: [
    {
      question: 'What is the meaning of life?',
      answer: '42',
    },
  ],
};

export const WithHeader = Template.bind({});
WithHeader.args = {
  ...Default.args,
  title: 'Frequently Asked Questions',
  description:
    'Below are answers to common questions about ordering, delivery and our services.',
};

export const WithTitleOnly = Template.bind({});
WithTitleOnly.args = {
  ...Default.args,
  title: 'Help & Support',
};
